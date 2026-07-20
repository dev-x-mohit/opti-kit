/**
 * Returns a promise that resolves after a specified duration in milliseconds.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates a debounced function that delays invoking the passed function until after `ms`
 * milliseconds have elapsed since the last time the debounced function was invoked.
 * Supports custom options for invoking on the leading and/or trailing edges.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number,
  options?: { leading?: boolean; trailing?: boolean }
): (...args: Parameters<T>) => void {
  let timeoutId: any;
  const leading = !!options?.leading;
  const trailing = options?.trailing !== false;

  return function (this: any, ...args: Parameters<T>) {
    const invoke = () => {
      timeoutId = null;
      if (trailing) {
        fn.apply(this, args);
      }
    };

    const callNow = leading && !timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(invoke, ms);

    if (callNow) {
      fn.apply(this, args);
    }
  };
}

/**
 * Creates a throttled function that only invokes the passed function at most once per every
 * `ms` milliseconds. Supports leading and trailing execution.
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  ms: number,
  options?: { leading?: boolean; trailing?: boolean }
): (...args: Parameters<T>) => void {
  let timeoutId: any;
  let lastCall = 0;
  const leading = options?.leading !== false;
  const trailing = options?.trailing !== false;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (!lastCall && !leading) {
      lastCall = now;
    }

    const remaining = ms - (now - lastCall);

    const invoke = () => {
      lastCall = trailing ? Date.now() : 0;
      timeoutId = null;
      fn.apply(this, args);
    };

    if (remaining <= 0 || remaining > ms) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCall = now;
      fn.apply(this, args);
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(invoke, remaining);
    }
  };
}

/**
 * Restricts a function call to only execute once. Subsequent calls return the first result.
 */
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  } as any;
}

/**
 * Retries a promise-returning function a specified number of times with a delay between failures.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 500
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 1) {
      throw error;
    }
    await delay(delayMs);
    return retry(fn, retries - 1, delayMs);
  }
}


/**
 * Returns a promise that rejects if the provided promise does not resolve within the specified timeout.
 */
export function timeout<T>(promise: Promise<T>, ms: number, fallbackError = new Error("Timeout")): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(fallbackError), ms);
    promise
      .then((val) => {
        clearTimeout(timer);
        resolve(val);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Creates a deferred object containing a promise and its resolve/reject methods.
 */
export function defer<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

/**
 * Executes an array of async functions in sequence.
 */
export async function sequence<T>(tasks: (() => Promise<T>)[]): Promise<T[]> {
  const results: T[] = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}

/**
 * Wraps an async function and returns a tuple [error, result], safely catching errors.
 */
export async function tryCatchAsync<T, E = Error>(
  promise: Promise<T>
): Promise<[E | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}

/**
 * Maps over an array concurrently.
 */
export async function pMap<T, R>(
  iterable: Iterable<T>,
  mapper: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const promises = Array.from(iterable).map((item, i) => mapper(item, i));
  return Promise.all(promises);
}

/**
 * Filters an array concurrently.
 */
export async function pFilter<T>(
  iterable: Iterable<T>,
  filterer: (item: T, index: number) => Promise<boolean>
): Promise<T[]> {
  const arr = Array.from(iterable);
  const results = await pMap(arr, filterer);
  return arr.filter((_, i) => results[i]);
}

/**
 * Asynchronously checks if every element satisfies the condition (sequential execution).
 */
export async function everyAsync<T>(
  iterable: Iterable<T>,
  predicate: (item: T, index: number) => Promise<boolean>
): Promise<boolean> {
  let i = 0;
  for (const item of iterable) {
    if (!(await predicate(item, i++))) return false;
  }
  return true;
}

/**
 * Asynchronously checks if some element satisfies the condition (sequential execution).
 */
export async function someAsync<T>(
  iterable: Iterable<T>,
  predicate: (item: T, index: number) => Promise<boolean>
): Promise<boolean> {
  let i = 0;
  for (const item of iterable) {
    if (await predicate(item, i++)) return true;
  }
  return false;
}

/**
 * Asynchronously reduces an iterable in order.
 */
export async function pReduce<T, R>(
  iterable: Iterable<T>,
  reducer: (acc: R, item: T, index: number) => Promise<R>,
  initialValue: R
): Promise<R> {
  let acc = initialValue;
  let i = 0;
  for (const item of iterable) {
    acc = await reducer(acc, item, i++);
  }
  return acc;
}

/**
 * Resolves an object whose values are promises into an object with resolved values.
 */
export async function pProps<T extends Record<string, Promise<any>>>(
  obj: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
  const keys = Object.keys(obj);
  const promises = keys.map((key) => obj[key]);
  const results = await Promise.all(promises);
  const resolvedObj = {} as { [K in keyof T]: Awaited<T[K]> };
  for (let i = 0; i < keys.length; i++) {
    (resolvedObj as any)[keys[i]] = results[i];
  }
  return resolvedObj;
}

/**
 * Waits until a predicate function evaluates to true or times out.
 */
export async function waitUntil(
  predicate: () => boolean | Promise<boolean>,
  options?: { timeoutMs?: number; intervalMs?: number }
): Promise<void> {
  const timeoutMs = options?.timeoutMs ?? 5000;
  const intervalMs = options?.intervalMs ?? 50;
  const start = Date.now();

  while (true) {
    if (await predicate()) return;
    if (Date.now() - start >= timeoutMs) {
      throw new Error("waitUntil timed out");
    }
    await delay(intervalMs);
  }
}

/**
 * Alias for delay - returns a promise that resolves after `ms` milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return delay(ms);
}

/**
 * Runs an array of promise-returning functions with a specified concurrency limit.
 */
export async function asyncPool<T, R>(
  concurrency: number,
  iterable: Iterable<T>,
  iteratorFn: (item: T) => Promise<R>
): Promise<R[]> {
  const ret: Promise<R>[] = [];
  const executing: Promise<any>[] = [];
  for (const item of iterable) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);

    if (concurrency <= iterable.constructor.name.length) {
      const e: Promise<any> = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

/**
 * Retries an async function with exponential backoff on failure.
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options?: { retries?: number; initialDelayMs?: number; backoffFactor?: number }
): Promise<T> {
  const retries = options?.retries ?? 3;
  let currentDelay = options?.initialDelayMs ?? 100;
  const factor = options?.backoffFactor ?? 2;

  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries) throw err;
      attempt++;
      await delay(currentDelay);
      currentDelay *= factor;
    }
  }
}

