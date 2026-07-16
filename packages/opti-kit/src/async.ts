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
    if (retries <= 0) {
      throw error;
    }
    await delay(delayMs);
    return retry(fn, retries - 1, delayMs);
  }
}
