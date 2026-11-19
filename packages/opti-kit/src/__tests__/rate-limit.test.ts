import { describe, it, expect, vi } from 'vitest';
import {
  TokenBucket,
  LeakyBucket,
  SlidingWindowRateLimiter,
  rateLimit,
  ExponentialBackoff
} from '../rate-limit';

describe('Rate Limiter and Concurrency Control', () => {
  it('should consume tokens and calculate wait time with TokenBucket', () => {
    const bucket = new TokenBucket({ capacity: 5, refillRate: 5 });
    expect(bucket.getTokens()).toBe(5);

    expect(bucket.tryConsume(3)).toBe(true);
    expect(bucket.getTokens()).toBeLessThanOrEqual(2.05);

    expect(bucket.tryConsume(3)).toBe(false);
    expect(bucket.timeUntilTokens(3)).toBeGreaterThan(0);
  });

  it('should handle water overflow with LeakyBucket', () => {
    const bucket = new LeakyBucket({ capacity: 3, leakRatePerSec: 10 });
    expect(bucket.tryAdd(2)).toBe(true);
    expect(bucket.tryAdd(1)).toBe(true);
    // Bucket is now full (3 drops)
    expect(bucket.tryAdd(1)).toBe(false);
  });

  it('should enforce sliding window rate limiting per key', () => {
    const limiter = new SlidingWindowRateLimiter();
    const key = 'user:123';

    expect(limiter.isAllowed(key, 2, 1000)).toBe(true);
    expect(limiter.isAllowed(key, 2, 1000)).toBe(true);
    expect(limiter.isAllowed(key, 2, 1000)).toBe(false);

    expect(limiter.getRemaining(key, 2, 1000)).toBe(0);

    limiter.reset(key);
    expect(limiter.isAllowed(key, 2, 1000)).toBe(true);
  });

  it('should rate limit async function calls sequentially', async () => {
    let callCount = 0;
    const testFn = async (val: number) => {
      callCount++;
      return val * 2;
    };

    const throttled = rateLimit(testFn, { limit: 2, intervalMs: 50 });

    const [r1, r2, r3] = await Promise.all([
      throttled(1),
      throttled(2),
      throttled(3)
    ]);

    expect(r1).toBe(2);
    expect(r2).toBe(4);
    expect(r3).toBe(6);
    expect(callCount).toBe(3);
  });

  it('should calculate exponential backoff with jitter', () => {
    const backoff = new ExponentialBackoff({ initialDelayMs: 100, factor: 2, maxDelayMs: 1000, jitter: false });
    expect(backoff.getDelay(0)).toBe(100);
    expect(backoff.getDelay(1)).toBe(200);
    expect(backoff.getDelay(2)).toBe(400);
    expect(backoff.getDelay(5)).toBe(1000); // capped at maxDelayMs
  });
});
