/**
 * Splits an array into chunks of a specified size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0 || arr.length === 0) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Returns a new array with unique values.
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Returns the elements in the first array that are not present in any of the other arrays.
 */
export function difference<T>(arr: T[], ...others: T[][]): T[] {
  if (arr.length === 0) return [];
  const sets = others.map((other) => new Set(other));
  return arr.filter((item) => !sets.some((set) => set.has(item)));
}

/**
 * Returns the intersection of multiple arrays.
 */
export function intersection<T>(...arrs: T[][]): T[] {
  if (arrs.length === 0) return [];
  const [first, ...rest] = arrs;
  if (rest.length === 0) return unique(first);
  const sets = rest.map((other) => new Set(other));
  return Array.from(new Set(first)).filter((item) =>
    sets.every((set) => set.has(item))
  );
}

/**
 * Groups array elements based on a key returned by the iterator function.
 */
export function groupBy<T>(
  arr: T[],
  fn: (item: T) => string | number
): Record<string | number, T[]> {
  const result: Record<string | number, T[]> = {};
  for (const item of arr) {
    const key = fn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

/**
 * Shuffles an array using the Fisher-Yates algorithm without modifying the original.
 */
export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

/**
 * Returns a random element from an array.
 */
export function sample<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/**
 * Returns a duplicate-free version of an array, based on a custom key or mapping function.
 */
export function uniqueBy<T>(
  arr: T[],
  iteratee: keyof T | ((item: T) => any)
): T[] {
  const seen = new Set<any>();
  return arr.filter((item) => {
    const key = typeof iteratee === "function" ? iteratee(item) : item[iteratee];
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Flattens an array of arrays by one level.
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 */
export function countBy<T>(
  arr: T[],
  iteratee: (item: T) => string | number
): Record<string | number, number> {
  const result: Record<string | number, number> = {};
  for (const item of arr) {
    const key = iteratee(item);
    result[key] = (result[key] || 0) + 1;
  }
  return result;
}

/**
 * Creates an array with all falsy values removed.
 */
export function compact<T>(arr: T[]): Exclude<T, false | null | 0 | "" | undefined>[] {
  return arr.filter(Boolean) as any;
}

/**
 * Creates a slice of array with n elements dropped from the beginning.
 */
export function drop<T>(arr: T[], n: number = 1): T[] {
  return arr.slice(Math.max(0, n));
}

/**
 * Creates a slice of array with n elements dropped from the end.
 */
export function dropRight<T>(arr: T[], n: number = 1): T[] {
  const end = Math.max(0, arr.length - n);
  return arr.slice(0, end);
}

/**
 * Creates a slice of array with n elements taken from the beginning.
 */
export function take<T>(arr: T[], n: number = 1): T[] {
  return arr.slice(0, Math.max(0, n));
}

/**
 * Creates a slice of array with n elements taken from the end.
 */
export function takeRight<T>(arr: T[], n: number = 1): T[] {
  const start = Math.max(0, arr.length - n);
  return arr.slice(start);
}

/**
 * Gets all but the last element of array.
 */
export function initial<T>(arr: T[]): T[] {
  return dropRight(arr, 1);
}

/**
 * Gets the last element of array.
 */
export function last<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[arr.length - 1];
}

/**
 * Gets the first element of array.
 */
export function first<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[0];
}

/**
 * Creates an array of grouped elements, the first of which contains the first elements of the given arrays.
 */
export function zip<T1, T2>(arr1: T1[], arr2: T2[]): [T1 | undefined, T2 | undefined][] {
  const length = Math.max(arr1.length, arr2.length);
  const result: [T1 | undefined, T2 | undefined][] = [];
  for (let i = 0; i < length; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
}

/**
 * Unzips an array of grouped elements into two arrays.
 */
export function unzip<T1, T2>(arr: [T1, T2][]): [T1[], T2[]] {
  const result1: T1[] = [];
  const result2: T2[] = [];
  for (const [item1, item2] of arr) {
    result1.push(item1);
    result2.push(item2);
  }
  return [result1, result2];
}

/**
 * Creates an array of unique values, in order, from all given arrays.
 */
export function union<T>(...arrs: T[][]): T[] {
  return unique(flatten(arrs));
}

/**
 * Splits an array into two groups: those that pass the predicate, and those that don't.
 */
export function partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of arr) {
    if (predicate(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  }
  return [pass, fail];
}

/**
 * Creates an array excluding all given values.
 */
export function without<T>(arr: T[], ...values: T[]): T[] {
  const set = new Set(values);
  return arr.filter(item => !set.has(item));
}

/**
 * The opposite of filter; this method returns the elements of collection that predicate does not return truthy for.
 */
export function reject<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(item => !predicate(item));
}

/**
 * Creates an object composed of keys generated from the results of running each element of array thru iteratee.
 */
export function keyBy<T>(arr: T[], iteratee: keyof T | ((item: T) => string | number)): Record<string | number, T> {
  const result: Record<string | number, T> = {};
  for (const item of arr) {
    const key = typeof iteratee === "function" ? iteratee(item) : (item[iteratee] as any);
    result[key] = item;
  }
  return result;
}

/**
 * Gets the element at index n of array. If n is negative, the nth element from the end is returned.
 */
export function nth<T>(arr: T[], n: number): T | undefined {
  if (n < 0) {
    n += arr.length;
  }
  return arr[n];
}

/**
 * Gets n random elements at unique keys from array up to the size of array.
 */
export function sampleSize<T>(arr: T[], n: number = 1): T[] {
  n = Math.min(Math.max(0, n), arr.length);
  return shuffle(arr).slice(0, n);
}

/**
 * Sorts an array based on an iteratee. Returns a new sorted array.
 */
export function sortBy<T>(arr: T[], iteratee: (item: T) => any): T[] {
  const copy = [...arr];
  return copy.sort((a, b) => {
    const valA = iteratee(a);
    const valB = iteratee(b);
    if (valA < valB) return -1;
    if (valA > valB) return 1;
    return 0;
  });
}

/**
 * Creates an array of numbers progressing from start up to, but not including, end.
 */
export function range(start: number, end?: number, step = 1): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  if (step === 0) return [];
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
}

/**
 * Rotates array elements by an offset position. Positive rotates right, negative rotates left.
 */
export function rotate<T>(arr: T[], offset: number): T[] {
  if (arr.length === 0) return [];
  const len = arr.length;
  const n = ((offset % len) + len) % len;
  if (n === 0) return [...arr];
  return [...arr.slice(len - n), ...arr.slice(0, len - n)];
}

/**
 * Finds the element in an array that produces the minimum value when passed to iteratee.
 */
export function minBy<T>(arr: T[], iteratee: (item: T) => number): T | undefined {
  if (arr.length === 0) return undefined;
  let minElem = arr[0];
  let minVal = iteratee(minElem);
  for (let i = 1; i < arr.length; i++) {
    const val = iteratee(arr[i]);
    if (val < minVal) {
      minVal = val;
      minElem = arr[i];
    }
  }
  return minElem;
}

/**
 * Finds the element in an array that produces the maximum value when passed to iteratee.
 */
export function maxBy<T>(arr: T[], iteratee: (item: T) => number): T | undefined {
  if (arr.length === 0) return undefined;
  let maxElem = arr[0];
  let maxVal = iteratee(maxElem);
  for (let i = 1; i < arr.length; i++) {
    const val = iteratee(arr[i]);
    if (val > maxVal) {
      maxVal = val;
      maxElem = arr[i];
    }
  }
  return maxElem;
}

/**
 * Computes the sum of values produced by iteratee for each element in the array.
 */
export function sumBy<T>(arr: T[], iteratee: (item: T) => number): number {
  let total = 0;
  for (const item of arr) {
    total += iteratee(item);
  }
  return total;
}

/**
 * Computes the mean (average) of values produced by iteratee for each element in the array.
 */
export function meanBy<T>(arr: T[], iteratee: (item: T) => number): number {
  if (arr.length === 0) return 0;
  return sumBy(arr, iteratee) / arr.length;
}

/**
 * Moves an element from one index to another in a new array.
 */
export function move<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const copy = [...arr];
  if (
    fromIndex < 0 ||
    fromIndex >= arr.length ||
    toIndex < 0 ||
    toIndex >= arr.length
  ) {
    return copy;
  }
  const [element] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, element);
  return copy;
}

/**
 * Swaps two elements in an array at specified indices in a new array.
 */
export function swap<T>(arr: T[], index1: number, index2: number): T[] {
  const copy = [...arr];
  if (
    index1 >= 0 &&
    index1 < arr.length &&
    index2 >= 0 &&
    index2 < arr.length
  ) {
    const temp = copy[index1];
    copy[index1] = copy[index2];
    copy[index2] = temp;
  }
  return copy;
}

/**
 * Places a separator element between each element of an array.
 */
export function intersperse<T>(arr: T[], separator: T): T[] {
  if (arr.length === 0) return [];
  const result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
    if (i < arr.length - 1) {
      result.push(separator);
    }
  }
  return result;
}

/**
 * Returns cumulative accumulation values (running reduce history) for an array.
 */
export function scan<T, R>(
  arr: T[],
  fn: (acc: R, val: T, index: number) => R,
  initial: R
): R[] {
  const result: R[] = [initial];
  let acc = initial;
  for (let i = 0; i < arr.length; i++) {
    acc = fn(acc, arr[i], i);
    result.push(acc);
  }
  return result;
}

/**
 * Extracts a property value from each object in an array.
 */
export function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map((item) => item[key]);
}

/**
 * Recursively flattens an array up to the specified depth (default: Infinity).
 */
export function flatDeep<T>(arr: any[], depth = Infinity): T[] {
  if (depth < 1) return arr.slice() as T[];
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flatDeep(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, [] as T[]);
}
