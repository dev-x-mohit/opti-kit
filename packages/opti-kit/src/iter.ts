/**
 * Generator that yields values from start to end (exclusive) with a given step.
 */
export function* range(start: number, end: number, step = 1): IterableIterator<number> {
  if (step > 0) {
    for (let i = start; i < end; i += step) yield i;
  } else {
    for (let i = start; i > end; i += step) yield i;
  }
}

/**
 * Maps over an iterable lazily.
 */
export function* map<T, U>(iterable: Iterable<T>, mapper: (item: T, index: number) => U): IterableIterator<U> {
  let i = 0;
  for (const item of iterable) {
    yield mapper(item, i++);
  }
}

/**
 * Filters an iterable lazily.
 */
export function* filter<T>(iterable: Iterable<T>, predicate: (item: T, index: number) => boolean): IterableIterator<T> {
  let i = 0;
  for (const item of iterable) {
    if (predicate(item, i++)) {
      yield item;
    }
  }
}

/**
 * Takes the first n elements from an iterable lazily.
 */
export function* take<T>(iterable: Iterable<T>, n: number): IterableIterator<T> {
  if (n <= 0) return;
  let i = 0;
  for (const item of iterable) {
    yield item;
    if (++i >= n) break;
  }
}

/**
 * Drops the first n elements from an iterable lazily.
 */
export function* drop<T>(iterable: Iterable<T>, n: number): IterableIterator<T> {
  let i = 0;
  for (const item of iterable) {
    if (i++ >= n) {
      yield item;
    }
  }
}

/**
 * Reduces an iterable.
 */
export function reduce<T, U>(iterable: Iterable<T>, reducer: (acc: U, item: T, index: number) => U, initialValue: U): U {
  let acc = initialValue;
  let i = 0;
  for (const item of iterable) {
    acc = reducer(acc, item, i++);
  }
  return acc;
}

/**
 * Cycles through an iterable indefinitely.
 */
export function* cycle<T>(iterable: Iterable<T>): IterableIterator<T> {
  const cache: T[] = [];
  for (const item of iterable) {
    cache.push(item);
    yield item;
  }
  while (true) {
    for (const item of cache) {
      yield item;
    }
  }
}

/**
 * Chunks an iterable into arrays of a given size.
 */
export function* chunk<T>(iterable: Iterable<T>, size: number): IterableIterator<T[]> {
  let currentChunk: T[] = [];
  for (const item of iterable) {
    currentChunk.push(item);
    if (currentChunk.length >= size) {
      yield currentChunk;
      currentChunk = [];
    }
  }
  if (currentChunk.length > 0) {
    yield currentChunk;
  }
}

/**
 * Yields elements of multiple iterables in parallel.
 */
export function* zip(...iterables: Iterable<any>[]): IterableIterator<any[]> {
  const iterators = iterables.map(i => i[Symbol.iterator]());
  while (true) {
    const results = iterators.map(i => i.next());
    if (results.some(r => r.done)) break;
    yield results.map(r => r.value);
  }
}

/**
 * Enumerates an iterable, yielding [index, item] tuples.
 */
export function* enumerate<T>(iterable: Iterable<T>): IterableIterator<[number, T]> {
  let i = 0;
  for (const item of iterable) {
    yield [i++, item];
  }
}
