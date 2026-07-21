/**
 * Creates a function that returns its first argument.
 */
export function identity<T>(val: T): T {
  return val;
}

/**
 * Creates a function that invokes the provided function with its arguments reversed.
 */
export function flip<T extends (...args: any[]) => any>(fn: T) {
  return function (...args: Parameters<T>): ReturnType<T> {
    return fn(...args.reverse());
  };
}

/**
 * Invokes an interceptor function with a value, and then returns the value.
 */
export function tap<T>(val: T, interceptor: (val: T) => void): T {
  interceptor(val);
  return val;
}


/**
 * Creates a function that memoizes the result of a given function.
 * By default, the first argument is used as the cache key.
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  resolver?: (...args: Parameters<T>) => any
) {
  const cache = new Map<any, ReturnType<T>>();
  const memoized = function (...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : args[0];
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
  memoized.cache = cache;
  return memoized;
}

/**
 * Performs left-to-right function composition.
 */
export function pipe(...fns: Array<(...args: any[]) => any>) {
  return function (initialValue: any) {
    return fns.reduce((acc, fn) => fn(acc), initialValue);
  };
}

/**
 * Performs right-to-left function composition.
 */
export function compose(...fns: Array<(...args: any[]) => any>) {
  return function (initialValue: any) {
    return fns.reduceRight((acc, fn) => fn(acc), initialValue);
  };
}

/**
 * Creates a curried function.
 */
export function curry(fn: (...args: any[]) => any, arity = fn.length) {

  return function curried(this: any, ...args: any[]): any {
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    return (...nextArgs: any[]) => curried.apply(this, args.concat(nextArgs));
  };
}

/**
 * Creates a function that invokes fn with partials prepended to the arguments it receives.
 */
export function partial(fn: (...args: any[]) => any, ...partials: any[]) {
  return function (this: any, ...args: any[]) {
    return fn.apply(this, partials.concat(args));
  };
}

/**
 * A no-operation function that does nothing.
 */
export function noop(): void {}

/**
 * Creates a function that always returns the same value.
 */
export function constant<T>(val: T): () => T {
  return () => val;
}

/**
 * Creates a function that negates the result of a predicate.
 */
export function not<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => boolean {
  return function (...args: Parameters<T>): boolean {
    return !fn(...args);
  };
}

/**
 * Trampoline for stack-safe recursion.
 * Wraps a function that returns either a value or a thunk (function returning the next step).
 */
export function trampoline<T>(fn: (...args: any[]) => T | (() => T)): (...args: any[]) => T {
  return function (...args: any[]): T {
    let result: any = fn(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };
}

/**
 * Applies multiple functions to the same arguments and returns an array of results.
 */
export function juxt<T extends any[]>(
  ...fns: Array<(...args: T) => any>
): (...args: T) => any[] {
  return function (...args: T): any[] {
    return fns.map((fn) => fn(...args));
  };
}

/**
 * Creates a function that is restricted to being called only once.
 * Subsequent calls return the result of the first invocation.
 */
export function onceFn<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  } as T;
}
