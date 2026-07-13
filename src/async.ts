/**
 * Returns a promise that resolves after a specified duration in milliseconds.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates a debounced function that delays invoking the passed function until after `ms`
 * milliseconds have elapsed since the last time the debounced function was invoked.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: any;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

/**
 * Creates a throttled function that only invokes the passed function at most once per every
 * `ms` milliseconds.
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= ms) {
      lastCall = now;
      fn.apply(this, args);
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
    if (retries <= 0) {
      throw error;
    }
    await delay(delayMs);
    return retry(fn, retries - 1, delayMs);
  }
}
