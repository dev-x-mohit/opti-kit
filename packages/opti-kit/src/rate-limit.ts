/**
 * OptiKit Rate Limiter — Deterministic concurrency control, Token Bucket,
 * Leaky Bucket, Sliding Window logs, and async function rate-limiting.
 */

export interface TokenBucketOptions {
  /** Maximum number of tokens the bucket can hold. */
  capacity: number;
  /** Number of tokens added per second. */
  refillRate: number;
  /** Initial tokens in the bucket (defaults to capacity). */
  initialTokens?: number;
}

/**
 * Token Bucket algorithm implementation for rate limiting bursts while enforcing average throughput.
 *
 * @example
 * ```ts
 * const bucket = new TokenBucket({ capacity: 10, refillRate: 2 });
 * if (bucket.tryConsume(1)) {
 *   // Token granted!
 * }
 * ```
 */
export class TokenBucket {
  private capacity: number;
  private refillRate: number;
  private tokens: number;
  private lastRefillTimestamp: number;

  constructor(options: TokenBucketOptions) {
    this.capacity = Math.max(1, options.capacity);
    this.refillRate = Math.max(0.001, options.refillRate);
    this.tokens = options.initialTokens !== undefined ? Math.min(options.initialTokens, this.capacity) : this.capacity;
    this.lastRefillTimestamp = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const elapsedSec = (now - this.lastRefillTimestamp) / 1000;
    const tokensToAdd = elapsedSec * this.refillRate;

    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
      this.lastRefillTimestamp = now;
    }
  }

  /**
   * Returns current available tokens.
   */
  public getTokens(): number {
    this.refill();
    return this.tokens;
  }

  /**
   * Attempts to consume specified amount of tokens. Returns true if granted.
   */
  public tryConsume(tokens = 1): boolean {
    this.refill();
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }

  /**
   * Waits asynchronously until enough tokens are available and consumes them.
   */
  public async consume(tokens = 1): Promise<void> {
    while (!this.tryConsume(tokens)) {
      const needed = tokens - this.tokens;
      const waitMs = Math.ceil((needed / this.refillRate) * 1000);
      await new Promise(resolve => setTimeout(resolve, Math.max(10, waitMs)));
    }
  }

  /**
   * Calculates estimated milliseconds until the requested number of tokens will be available.
   */
  public timeUntilTokens(tokens = 1): number {
    this.refill();
    if (this.tokens >= tokens) return 0;
    const needed = tokens - this.tokens;
    return Math.ceil((needed / this.refillRate) * 1000);
  }
}

export interface LeakyBucketOptions {
  /** Maximum volume before overflowing. */
  capacity: number;
  /** Rate at which bucket leaks (drops per second). */
  leakRatePerSec: number;
}

/**
 * Leaky Bucket algorithm for smoothing out traffic bursts into a steady output rate.
 */
export class LeakyBucket {
  private capacity: number;
  private leakRatePerSec: number;
  private water = 0;
  private lastLeakTimestamp: number;

  constructor(options: LeakyBucketOptions) {
    this.capacity = options.capacity;
    this.leakRatePerSec = options.leakRatePerSec;
    this.lastLeakTimestamp = Date.now();
  }

  private leak(): void {
    const now = Date.now();
    const elapsedSec = (now - this.lastLeakTimestamp) / 1000;
    const leaked = elapsedSec * this.leakRatePerSec;
    this.water = Math.max(0, this.water - leaked);
    this.lastLeakTimestamp = now;
  }

  /**
   * Returns the current water level.
   */
  public getWaterLevel(): number {
    this.leak();
    return this.water;
  }

  /**
   * Attempts to add drops. Returns true if bucket did not overflow.
   */
  public tryAdd(drops = 1): boolean {
    this.leak();
    if (this.water + drops <= this.capacity) {
      this.water += drops;
      return true;
    }
    return false;
  }
}

/**
 * In-memory Sliding Window Log rate limiter for tracking key-based request limits (e.g., per IP or user ID).
 *
 * @example
 * ```ts
 * const limiter = new SlidingWindowRateLimiter();
 * if (limiter.isAllowed('user_123', 5, 60000)) {
 *   // Allow max 5 requests per 60 seconds
 * }
 * ```
 */
export class SlidingWindowRateLimiter {
  private logMap = new Map<string, number[]>();

  /**
   * Checks if an action is allowed under the rate limit window and records it.
   */
  public isAllowed(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;

    let timestamps = this.logMap.get(key) || [];
    timestamps = timestamps.filter(ts => ts > windowStart);

    if (timestamps.length < limit) {
      timestamps.push(now);
      this.logMap.set(key, timestamps);
      return true;
    }

    this.logMap.set(key, timestamps);
    return false;
  }

  /**
   * Returns remaining requests allowed in the current window.
   */
  public getRemaining(key: string, limit: number, windowMs: number): number {
    const now = Date.now();
    const windowStart = now - windowMs;
    const timestamps = (this.logMap.get(key) || []).filter(ts => ts > windowStart);
    return Math.max(0, limit - timestamps.length);
  }

  /**
   * Resets rate limit for a specific key.
   */
  public reset(key: string): void {
    this.logMap.delete(key);
  }

  /**
   * Clears all stored rate limit history.
   */
  public clear(): void {
    this.logMap.clear();
  }
}

export interface RateLimitOptions {
  /** Maximum number of invocations allowed in the interval. */
  limit: number;
  /** Sliding interval window in milliseconds. */
  intervalMs: number;
}

/**
 * Wraps an async function with rate limiting. Calls exceeding the limit are queued
 * and executed sequentially as the rate window slides.
 *
 * @example
 * ```ts
 * const fetchUser = rateLimit(async (id: string) => api.getUser(id), { limit: 5, intervalMs: 1000 });
 * ```
 */
export function rateLimit<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: RateLimitOptions
): (...args: TArgs) => Promise<TReturn> {
  const { limit, intervalMs } = options;
  const queue: Array<() => void> = [];
  const timestamps: number[] = [];
  let isProcessing = false;

  const processQueue = () => {
    if (isProcessing || queue.length === 0) return;
    isProcessing = true;

    const now = Date.now();
    const windowStart = now - intervalMs;

    while (timestamps.length > 0 && timestamps[0] <= windowStart) {
      timestamps.shift();
    }

    if (timestamps.length < limit) {
      timestamps.push(now);
      const next = queue.shift();
      isProcessing = false;
      if (next) next();
      if (queue.length > 0) processQueue();
    } else {
      const waitTime = Math.max(10, timestamps[0] + intervalMs - now);
      setTimeout(() => {
        isProcessing = false;
        processQueue();
      }, waitTime);
    }
  };

  return (...args: TArgs): Promise<TReturn> => {
    return new Promise<TReturn>((resolve, reject) => {
      queue.push(() => {
        fn(...args).then(resolve, reject);
      });
      processQueue();
    });
  };
}

export interface ExponentialBackoffOptions {
  initialDelayMs?: number;
  maxDelayMs?: number;
  factor?: number;
  jitter?: boolean;
}

/**
 * Calculates exponential backoff delay with optional random jitter.
 */
export class ExponentialBackoff {
  private initialDelayMs: number;
  private maxDelayMs: number;
  private factor: number;
  private jitter: boolean;

  constructor(options: ExponentialBackoffOptions = {}) {
    this.initialDelayMs = options.initialDelayMs || 100;
    this.maxDelayMs = options.maxDelayMs || 10000;
    this.factor = options.factor || 2;
    this.jitter = options.jitter ?? true;
  }

  public getDelay(attempt: number): number {
    const rawDelay = this.initialDelayMs * Math.pow(this.factor, attempt);
    const cappedDelay = Math.min(this.maxDelayMs, rawDelay);

    if (!this.jitter) {
      return Math.round(cappedDelay);
    }

    const randomFactor = 0.5 + Math.random() * 0.5;
    return Math.round(cappedDelay * randomFactor);
  }
}
