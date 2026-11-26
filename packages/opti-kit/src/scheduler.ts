/**
 * OptiKit Scheduler & Concurrency Pro — Priority queues, task queues, circuit breakers,
 * semaphores, mutexes, barriers, dead-letter queues, and async call coalescing.
 */

export interface SchedulerPriorityQueue<T> {
  push(item: T, priority: number): void;
  pop(): T | undefined;
  peek(): T | undefined;
  readonly size: number;
  clear(): void;
}

/** Creates a min-heap Priority Queue (lower `priority` value dequeues first). */
export function createPriorityQueue<T>(): SchedulerPriorityQueue<T> {
  const heap: { item: T; priority: number }[] = [];
  const swap = (i: number, j: number) => {
    const tmp = heap[i];
    heap[i] = heap[j];
    heap[j] = tmp;
  };
  return {
    push(item, priority) {
      heap.push({ item, priority });
      let i = heap.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (heap[p].priority <= heap[i].priority) break;
        swap(p, i);
        i = p;
      }
    },
    pop() {
      if (heap.length === 0) return undefined;
      const top = heap[0].item;
      const last = heap.pop()!;
      if (heap.length > 0) {
        heap[0] = last;
        let i = 0;
        while (true) {
          let smallest = i;
          const l = 2 * i + 1;
          const r = 2 * i + 2;
          if (l < heap.length && heap[l].priority < heap[smallest].priority) smallest = l;
          if (r < heap.length && heap[r].priority < heap[smallest].priority) smallest = r;
          if (smallest === i) break;
          swap(i, smallest);
          i = smallest;
        }
      }
      return top;
    },
    peek: () => heap[0]?.item,
    get size() {
      return heap.length;
    },
    clear() {
      heap.length = 0;
    },
  };
}

/** Creates a concurrency-limited async Task Queue. */
export function createTaskQueue(concurrency = 4) {
  const limit = Math.max(1, concurrency);
  let active = 0;
  const queue: (() => void)[] = [];

  const next = () => {
    active--;
    const job = queue.shift();
    if (job) job();
  };

  return {
    enqueue<T>(task: () => Promise<T>): Promise<T> {
      return new Promise<T>((resolve, reject) => {
        const run = () => {
          active++;
          task().then(resolve, reject).finally(next);
        };
        if (active < limit) run();
        else queue.push(run);
      });
    },
    get pending() {
      return queue.length;
    },
    get activeCount() {
      return active;
    },
  };
}

export interface ScheduledJob {
  id: string;
  cancel: () => void;
  readonly active: boolean;
}

/** Creates a controllable job scheduler for one-off and interval tasks. */
export function createJobScheduler() {
  const jobs = new Map<string, { timer: ReturnType<typeof setTimeout>; active: boolean }>();
  let paused = false;

  return {
    scheduleOnce(id: string, delayMs: number, fn: () => void): ScheduledJob {
      this.cancel(id);
      const timer = setTimeout(() => {
        jobs.delete(id);
        if (!paused) fn();
      }, delayMs);
      jobs.set(id, { timer, active: true });
      return {
        id,
        cancel: () => this.cancel(id),
        get active() {
          return jobs.get(id)?.active ?? false;
        },
      };
    },
    scheduleInterval(id: string, intervalMs: number, fn: () => void): ScheduledJob {
      this.cancel(id);
      const timer = setInterval(() => {
        if (!paused) fn();
      }, intervalMs);
      jobs.set(id, { timer, active: true });
      return {
        id,
        cancel: () => this.cancel(id),
        get active() {
          return jobs.get(id)?.active ?? false;
        },
      };
    },
    cancel(id: string): boolean {
      const entry = jobs.get(id);
      if (!entry) return false;
      clearTimeout(entry.timer);
      clearInterval(entry.timer);
      entry.active = false;
      jobs.delete(id);
      return true;
    },
    pause() {
      paused = true;
    },
    resume() {
      paused = false;
    },
    cancelAll() {
      for (const id of Array.from(jobs.keys())) this.cancel(id);
    },
    get size() {
      return jobs.size;
    },
  };
}

/** Schedules a one-off callback and returns a cancel handle. */
export function scheduleOnce(delayMs: number, fn: () => void): () => void {
  const id = setTimeout(fn, delayMs);
  return () => clearTimeout(id);
}

/** Schedules a recurring interval callback and returns a cancel handle. */
export function scheduleInterval(intervalMs: number, fn: () => void): () => void {
  const id = setInterval(fn, intervalMs);
  return () => clearInterval(id);
}

/** Cancels a job by ID on a scheduler instance. */
export function cancelJob(scheduler: ReturnType<typeof createJobScheduler>, id: string): boolean {
  return scheduler.cancel(id);
}

/** Pauses a scheduler instance. */
export function pauseScheduler(scheduler: ReturnType<typeof createJobScheduler>): void {
  scheduler.pause();
}

/** Resumes a scheduler instance. */
export function resumeScheduler(scheduler: ReturnType<typeof createJobScheduler>): void {
  scheduler.resume();
}

/** Creates a Dead-Letter Queue (DLQ) for capturing and replaying failed payloads. */
export function createDeadLetterQueue<T>() {
  const entries: { payload: T; error: unknown; timestamp: number }[] = [];
  return {
    push(payload: T, error: unknown) {
      entries.push({ payload, error, timestamp: Date.now() });
    },
    drain(): { payload: T; error: unknown; timestamp: number }[] {
      return entries.splice(0, entries.length);
    },
    peekAll() {
      return [...entries];
    },
    get size() {
      return entries.length;
    },
    clear() {
      entries.length = 0;
    },
  };
}

export type CircuitState = 'closed' | 'open' | 'half-open';

/** Creates a Circuit Breaker protecting async calls from cascading failures. */
export function createCircuitBreaker(options: {
  failureThreshold?: number;
  resetTimeoutMs?: number;
} = {}) {
  const threshold = options.failureThreshold ?? 5;
  const resetMs = options.resetTimeoutMs ?? 30_000;
  let state: CircuitState = 'closed';
  let failures = 0;
  let openedAt = 0;

  return {
    get state(): CircuitState {
      if (state === 'open' && Date.now() - openedAt >= resetMs) {
        return 'half-open';
      }
      return state;
    },
    async execute<T>(fn: () => Promise<T>): Promise<T> {
      const curr = this.state;
      if (curr === 'open') {
        throw new Error('Circuit breaker is OPEN');
      }
      try {
        const res = await fn();
        failures = 0;
        state = 'closed';
        return res;
      } catch (err) {
        failures++;
        if (failures >= threshold || curr === 'half-open') {
          state = 'open';
          openedAt = Date.now();
        }
        throw err;
      }
    },
    reset() {
      state = 'closed';
      failures = 0;
      openedAt = 0;
    },
  };
}

/** Creates a Bulkhead isolator limiting concurrent executions and queue depth. */
export function createBulkhead(maxConcurrent: number, maxQueue = Infinity) {
  let active = 0;
  const waiting: (() => void)[] = [];
  return {
    async execute<T>(fn: () => Promise<T>): Promise<T> {
      if (active >= maxConcurrent) {
        if (waiting.length >= maxQueue) throw new Error('Bulkhead queue full');
        await new Promise<void>((res) => waiting.push(res));
      }
      active++;
      try {
        return await fn();
      } finally {
        active--;
        waiting.shift()?.();
      }
    },
  };
}

/** Creates a counting Semaphore for async resource pooling. */
export function createSemaphore(permits: number) {
  let available = Math.max(1, permits);
  const waiters: (() => void)[] = [];
  return {
    async acquire(): Promise<() => void> {
      if (available > 0) {
        available--;
      } else {
        await new Promise<void>((res) => waiters.push(res));
      }
      let released = false;
      return () => {
        if (released) return;
        released = true;
        const next = waiters.shift();
        if (next) next();
        else available++;
      };
    },
    get available() {
      return available;
    },
  };
}

/** Creates a binary Mutex lock for mutual exclusion. */
export function createMutex() {
  const sem = createSemaphore(1);
  return {
    acquire: () => sem.acquire(),
    async runExclusive<T>(fn: () => Promise<T>): Promise<T> {
      const release = await sem.acquire();
      try {
        return await fn();
      } finally {
        release();
      }
    },
  };
}

/** Creates a reusable synchronization Barrier for `parties` async participants. */
export function createBarrier(parties: number) {
  let waiting: (() => void)[] = [];
  return {
    wait(): Promise<void> {
      return new Promise((resolve) => {
        waiting.push(resolve);
        if (waiting.length >= parties) {
          const batch = waiting;
          waiting = [];
          for (const r of batch) r();
        }
      });
    },
  };
}

/** Creates a CountDownLatch that resolves once `countDown()` is called `count` times. */
export function createCountDownLatch(count: number) {
  let remaining = Math.max(0, count);
  const waiters: (() => void)[] = [];
  return {
    countDown() {
      if (remaining > 0) remaining--;
      if (remaining === 0) {
        while (waiters.length > 0) waiters.shift()!();
      }
    },
    await(): Promise<void> {
      if (remaining === 0) return Promise.resolve();
      return new Promise((res) => waiters.push(res));
    },
    get count() {
      return remaining;
    },
  };
}

/** Creates a deferred promise with externally exposed `resolve` and `reject`. */
export function deferPromise<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

/** Wraps a promise with a timeout rejection after `ms` milliseconds. */
export function withTimeout<T>(promise: Promise<T>, ms: number, message = 'Operation timed out'): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

/** Creates a promise that resolves after `ms` unless cancelled. */
export function timeoutPromise(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Wraps an async factory with cancellation support via AbortController-like handle. */
export function cancellablePromise<T>(
  executor: (isCancelled: () => boolean) => Promise<T>
): { promise: Promise<T>; cancel: () => void } {
  let cancelled = false;
  const promise = executor(() => cancelled);
  return {
    promise,
    cancel: () => {
      cancelled = true;
    },
  };
}

/** Coalesces concurrent calls with the same key into a single shared in-flight Promise. */
export function coalesceCalls<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  keyFn: (...args: Args) => string = (...a) => JSON.stringify(a)
): (...args: Args) => Promise<R> {
  const inflight = new Map<string, Promise<R>>();
  return (...args: Args) => {
    const key = keyFn(...args);
    const existing = inflight.get(key);
    if (existing) return existing;
    const p = fn(...args).finally(() => inflight.delete(key));
    inflight.set(key, p);
    return p;
  };
}

/** Batches individual async calls made within `windowMs` into a single bulk invocation. */
export function batchCalls<T, R>(
  batchFn: (items: T[]) => Promise<R[]>,
  windowMs = 10
): (item: T) => Promise<R> {
  let pending: { item: T; resolve: (r: R) => void; reject: (e: unknown) => void }[] = [];
  let timer: ReturnType<typeof setTimeout> | null = null;

  const flush = async () => {
    const current = pending;
    pending = [];
    timer = null;
    try {
      const results = await batchFn(current.map((c) => c.item));
      current.forEach((c, idx) => c.resolve(results[idx]));
    } catch (err) {
      current.forEach((c) => c.reject(err));
    }
  };

  return (item: T) =>
    new Promise<R>((resolve, reject) => {
      pending.push({ item, resolve, reject });
      if (!timer) timer = setTimeout(flush, windowMs);
    });
}

/** Debounces an async function, resolving all callers in the window with the latest result. */
export function debounceAsync<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  waitMs: number
): (...args: Args) => Promise<R> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let waiters: { resolve: (r: R) => void; reject: (e: unknown) => void }[] = [];
  return (...args: Args) =>
    new Promise<R>((resolve, reject) => {
      waiters.push({ resolve, reject });
      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        const currentWaiters = waiters;
        waiters = [];
        timer = null;
        try {
          const res = await fn(...args);
          currentWaiters.forEach((w) => w.resolve(res));
        } catch (err) {
          currentWaiters.forEach((w) => w.reject(err));
        }
      }, waitMs);
    });
}

/** Throttles an async function so it executes at most once per `intervalMs`. */
export function throttleAsync<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  intervalMs: number
): (...args: Args) => Promise<R> {
  let lastRun = 0;
  let lastPromise: Promise<R> | null = null;
  return (...args: Args) => {
    const now = Date.now();
    if (lastPromise && now - lastRun < intervalMs) {
      return lastPromise;
    }
    lastRun = now;
    lastPromise = fn(...args);
    return lastPromise;
  };
}
