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


