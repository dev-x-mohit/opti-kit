/**
 * OptiKit FP — Data-last, curried functional programming utilities.
 * Designed for composability, pure data transformation pipelines, and full Lodash/fp parity.
 */

/**
 * Passes an initial value through a pipeline of synchronous transformation functions.
 *
 * @example
 * ```ts
 * const result = pipe(
 *   [1, 2, 3, 4],
 *   map((n: number) => n * 2),
 *   filter((n: number) => n > 4)
 * );
 * // → [6, 8]
 * ```
 */
export function pipe<T>(value: T): T;
export function pipe<T, A>(value: T, fn1: (arg: T) => A): A;
export function pipe<T, A, B>(value: T, fn1: (arg: T) => A, fn2: (arg: A) => B): B;
export function pipe<T, A, B, C>(value: T, fn1: (arg: T) => A, fn2: (arg: A) => B, fn3: (arg: B) => C): C;
export function pipe<T, A, B, C, D>(value: T, fn1: (arg: T) => A, fn2: (arg: A) => B, fn3: (arg: B) => C, fn4: (arg: C) => D): D;
export function pipe<T, A, B, C, D, E>(value: T, fn1: (arg: T) => A, fn2: (arg: A) => B, fn3: (arg: B) => C, fn4: (arg: C) => D, fn5: (arg: D) => E): E;
export function pipe(value: any, ...fns: Array<(arg: any) => any>): any {
  return fns.reduce((acc, fn) => fn(acc), value);
}

/**
 * Composes functions from left-to-right into a reusable pipeline function.
 *
 * @example
 * ```ts
 * const doubleAndFilter = flow(
 *   map((n: number) => n * 2),
 *   filter((n: number) => n > 4)
 * );
 * doubleAndFilter([1, 2, 3, 4]); // → [6, 8]
 * ```
 */
export function flow<A, B>(fn1: (a: A) => B): (a: A) => B;
export function flow<A, B, C>(fn1: (a: A) => B, fn2: (b: B) => C): (a: A) => C;
export function flow<A, B, C, D>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D): (a: A) => D;
export function flow<A, B, C, D, E>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D, fn4: (d: D) => E): (a: A) => E;
export function flow(...fns: Array<(arg: any) => any>): (initial: any) => any {
  return (initial: any) => fns.reduce((acc, fn) => fn(acc), initial);
}

/**
 * Composes functions from right-to-left.
 *
 * @example
 * ```ts
 * const addOneThenDouble = compose((n: number) => n * 2, (n: number) => n + 1);
 * addOneThenDouble(3); // → 8
 * ```
 */
export function compose(...fns: Array<(arg: any) => any>): (initial: any) => any {
  return (initial: any) => fns.reduceRight((acc, fn) => fn(acc), initial);
}

/**
 * Curries a function of any arity.
 *
 * @example
 * ```ts
 * const add3 = curry((a: number, b: number, c: number) => a + b + c);
 * add3(1)(2)(3); // → 6
 * ```
 */
export function curry(fn: (...args: any[]) => any, arity = fn.length): any {
  return function curried(...args: any[]) {
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...nextArgs: any[]) => curried(...args, ...nextArgs);
  };
}

/**
 * Identity combinator. Returns its argument unchanged.
 */
export function identity<T>(val: T): T {
  return val;
}

/**
 * Always combinator. Returns a constant value getter.
 */
export function always<T>(val: T): () => T {
  return () => val;
}

/**
 * Tap combinator. Executes a side-effect and returns the original value.
 */
export function tap<T>(sideEffect: (val: T) => void): (val: T) => T {
  return (val: T) => {
    sideEffect(val);
    return val;
  };
}

/**
 * When combinator. Runs a transformation if the predicate is true, otherwise returns original.
 */
export function when<T, R>(predicate: (val: T) => boolean, fn: (val: T) => R): (val: T) => T | R {
  return (val: T) => predicate(val) ? fn(val) : val;
}

/**
 * Unless combinator. Runs a transformation if the predicate is false, otherwise returns original.
 */
export function unless<T, R>(predicate: (val: T) => boolean, fn: (val: T) => R): (val: T) => T | R {
  return (val: T) => !predicate(val) ? fn(val) : val;
}

// ==================== Data-Last Array Functions ====================

/**
 * Data-last map.
 *
 * @example
 * ```ts
 * map((x: number) => x * 2)([1, 2, 3]);
 * // → [2, 4, 6]
 * ```
 */
export function map<T, R>(fn: (item: T, index: number) => R): (arr: readonly T[]) => R[] {
  return (arr) => arr.map(fn);
}

/**
 * Data-last filter.
 *
 * @example
 * ```ts
 * filter((x: number) => x % 2 === 0)([1, 2, 3, 4]);
 * // → [2, 4]
 * ```
 */
export function filter<T>(predicate: (item: T, index: number) => boolean): (arr: readonly T[]) => T[] {
  return (arr) => arr.filter(predicate);
}

/**
 * Data-last reduce.
 *
 * @example
 * ```ts
 * reduce((acc: number, n: number) => acc + n, 0)([1, 2, 3]);
 * // → 6
 * ```
 */
export function reduce<T, R>(reducer: (acc: R, item: T, index: number) => R, initial: R): (arr: readonly T[]) => R {
  return (arr) => arr.reduce(reducer, initial);
}

/**
 * Data-last find.
 */
export function find<T>(predicate: (item: T, index: number) => boolean): (arr: readonly T[]) => T | undefined {
  return (arr) => arr.find(predicate);
}

/**
 * Data-last some.
 */
export function some<T>(predicate: (item: T) => boolean): (arr: readonly T[]) => boolean {
  return (arr) => arr.some(predicate);
}

/**
 * Data-last every.
 */
export function every<T>(predicate: (item: T) => boolean): (arr: readonly T[]) => boolean {
  return (arr) => arr.every(predicate);
}

/**
 * Data-last take (takes the first n elements).
 */
export function take<T>(count: number): (arr: readonly T[]) => T[] {
  return (arr) => arr.slice(0, Math.max(0, count));
}

/**
 * Data-last drop (drops the first n elements).
 */
export function drop<T>(count: number): (arr: readonly T[]) => T[] {
  return (arr) => arr.slice(Math.max(0, count));
}

/**
 * Data-last compact (filters out falsy values).
 */
export function compact<T>(): (arr: readonly (T | null | undefined | false | 0 | '')[]) => T[] {
  return (arr) => arr.filter(Boolean) as T[];
}

/**
 * Data-last sortBy.
 */
export function sortBy<T>(keyFn: (item: T) => any, order: 'asc' | 'desc' = 'asc'): (arr: readonly T[]) => T[] {
  return (arr) => {
    return [...arr].sort((a, b) => {
      const valA = keyFn(a);
      const valB = keyFn(b);
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };
}

/**
 * Data-last groupBy.
 */
export function groupBy<T, K extends string | number>(keyFn: (item: T) => K): (arr: readonly T[]) => Record<K, T[]> {
  return (arr) => {
    const result = {} as Record<K, T[]>;
    for (const item of arr) {
      const key = keyFn(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
    }
    return result;
  };
}

// ==================== Data-Last Object Functions ====================

/**
 * Data-last property accessor.
 *
 * @example
 * ```ts
 * prop('name')({ name: 'Bob', age: 30 });
 * // → 'Bob'
 * ```
 */
export function prop<T, K extends keyof T>(key: K): (obj: T) => T[K] {
  return (obj) => obj[key];
}

/**
 * Data-last nested path accessor.
 *
 * @example
 * ```ts
 * path(['user', 'address', 'city'])({ user: { address: { city: 'Tokyo' } } });
 * // → 'Tokyo'
 * ```
 */
export function path(keys: readonly (string | number)[]): (obj: any) => any {
  return (obj) => {
    let curr = obj;
    for (const k of keys) {
      if (curr === null || curr === undefined) return undefined;
      curr = curr[k];
    }
    return curr;
  };
}

/**
 * Data-last pick. Picks specified keys from an object.
 */
export function pick<T extends Record<string, any>, K extends keyof T>(keys: readonly K[]): (obj: T) => Pick<T, K> {
  return (obj) => {
    const result = {} as Pick<T, K>;
    for (const k of keys) {
      if (k in obj) {
        result[k] = obj[k];
      }
    }
    return result;
  };
}

/**
 * Data-last omit. Omits specified keys from an object.
 */
export function omit<T extends Record<string, any>, K extends keyof T>(keys: readonly K[]): (obj: T) => Omit<T, K> {
  const keySet = new Set<any>(keys);
  return (obj) => {
    const result = {} as any;
    for (const k of Object.keys(obj)) {
      if (!keySet.has(k)) {
        result[k] = obj[k];
      }
    }
    return result;
  };
}

/**
 * Data-last assoc. Associates a key/value pair into an object immutably.
 */
export function assoc<T extends Record<string, any>, K extends string, V>(key: K, value: V): (obj: T) => T & Record<K, V> {
  return (obj) => ({
    ...obj,
    [key]: value
  });
}

/**
 * Data-last dissoc. Removes a key from an object immutably.
 */
export function dissoc<T extends Record<string, any>, K extends keyof T>(key: K): (obj: T) => Omit<T, K> {
  return (obj) => {
    const copy = { ...obj };
    delete copy[key];
    return copy;
  };
}
