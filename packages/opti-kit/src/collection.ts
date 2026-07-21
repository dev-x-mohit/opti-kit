/**
 * Creates a new object composed of the inverted keys and values of the given object.
 * If the object contains duplicate values, subsequent values overwrite property assignments of previous values.
 */
export function invertMap(obj: Record<string, string | number>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(obj)) {
    result[String(val)] = key;
  }
  return result;
}

/**
 * Returns a new Set containing all elements present in either Set A or Set B.
 */
export function setUnion<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>(setA);
  for (const elem of setB) {
    result.add(elem);
  }
  return result;
}

/**
 * Returns a new Set containing all elements present in both Set A and Set B.
 */
export function setIntersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const elem of setB) {
    if (setA.has(elem)) {
      result.add(elem);
    }
  }
  return result;
}

/**
 * Returns a new Set containing all elements present in Set A but not in Set B.
 */
export function setDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>(setA);
  for (const elem of setB) {
    result.delete(elem);
  }
  return result;
}

/**
 * Returns a new Set containing elements present in either set but not both.
 */
export function symmetricDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>(setA);
  for (const elem of setB) {
    if (result.has(elem)) {
      result.delete(elem);
    } else {
      result.add(elem);
    }
  }
  return result;
}

/**
 * Merges two Maps into a new Map. Values from the second map overwrite the first.
 */
export function mergeMaps<K, V>(mapA: Map<K, V>, mapB: Map<K, V>): Map<K, V> {
  const result = new Map<K, V>(mapA);
  for (const [key, value] of mapB) {
    result.set(key, value);
  }
  return result;
}

/**
 * Counts the frequency of each element in an array.
 */
export function frequencies<T>(arr: T[]): Map<T, number> {
  const result = new Map<T, number>();
  for (const item of arr) {
    result.set(item, (result.get(item) || 0) + 1);
  }
  return result;
}

/**
 * Maps and filters in a single pass. Returns only items where the callback does not return undefined.
 */
export function filterMap<T, R>(arr: T[], fn: (item: T, index: number) => R | undefined): R[] {
  const result: R[] = [];
  for (let i = 0; i < arr.length; i++) {
    const mapped = fn(arr[i], i);
    if (mapped !== undefined) {
      result.push(mapped);
    }
  }
  return result;
}

/**
 * Creates a new object with the same keys but with values transformed by the callback.
 */
export function mapRecordValues<V, R>(
  obj: Record<string, V>,
  fn: (value: V, key: string) => R
): Record<string, R> {
  const result: Record<string, R> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = fn(value, key);
  }
  return result;
}

/**
 * Creates a new object containing only the entries where the predicate returns true.
 */
export function filterRecord<V>(
  obj: Record<string, V>,
  fn: (value: V, key: string) => boolean
): Record<string, V> {
  const result: Record<string, V> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (fn(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Checks if a Set is a subset of another Set.
 */
export function isSubset<T>(subset: Set<T>, superset: Set<T>): boolean {
  for (const elem of subset) {
    if (!superset.has(elem)) return false;
  }
  return true;
}

/**
 * Checks if a Set is a superset of another Set.
 */
export function isSuperset<T>(superset: Set<T>, subset: Set<T>): boolean {
  return isSubset(subset, superset);
}
