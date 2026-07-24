/**
 * Maps over the values of a Map to produce a new Map with the same keys.
 */
export function mapMapValues<K, V, R>(map: Map<K, V>, mapper: (value: V, key: K) => R): Map<K, R> {
  const result = new Map<K, R>();
  for (const [key, value] of map) {
    result.set(key, mapper(value, key));
  }
  return result;
}

/**
 * Maps over the keys of a Map to produce a new Map with the same values.
 */
export function mapMapKeys<K, V, R>(map: Map<K, V>, mapper: (key: K, value: V) => R): Map<R, V> {
  const result = new Map<R, V>();
  for (const [key, value] of map) {
    result.set(mapper(key, value), value);
  }
  return result;
}

/**
 * Filters a Map to produce a new Map containing only entries that satisfy the predicate.
 */
export function filterMapEntries<K, V>(map: Map<K, V>, predicate: (value: V, key: K) => boolean): Map<K, V> {
  const result = new Map<K, V>();
  for (const [key, value] of map) {
    if (predicate(value, key)) {
      result.set(key, value);
    }
  }
  return result;
}

/**
 * Merges multiple Maps into a single new Map. Later maps overwrite earlier ones for duplicate keys.
 */
export function mergeMultipleMaps<K, V>(...maps: Map<K, V>[]): Map<K, V> {
  const result = new Map<K, V>();
  for (const map of maps) {
    for (const [key, value] of map) {
      result.set(key, value);
    }
  }
  return result;
}

/**
 * Inverts a Map by swapping its keys and values.
 * If values are not unique, later entries will overwrite earlier ones.
 */
export function invertMapEntries<K, V>(map: Map<K, V>): Map<V, K> {
  const result = new Map<V, K>();
  for (const [key, value] of map) {
    result.set(value, key);
  }
  return result;
}

/**
 * Groups elements of an iterable into a Map based on a grouping function.
 */
export function groupByToMap<T, K>(iterable: Iterable<T>, iteratee: (item: T) => K): Map<K, T[]> {
  const result = new Map<K, T[]>();
  for (const item of iterable) {
    const key = iteratee(item);
    const collection = result.get(key);
    if (!collection) {
      result.set(key, [item]);
    } else {
      collection.push(item);
    }
  }
  return result;
}

/**
 * Finds the first entry in a Map that satisfies the predicate.
 */
export function findInMap<K, V>(map: Map<K, V>, predicate: (value: V, key: K) => boolean): [K, V] | undefined {
  for (const entry of map) {
    if (predicate(entry[1], entry[0])) {
      return entry;
    }
  }
  return undefined;
}

/**
 * Checks if every entry in a Map satisfies the predicate.
 */
export function everyInMap<K, V>(map: Map<K, V>, predicate: (value: V, key: K) => boolean): boolean {
  for (const [key, value] of map) {
    if (!predicate(value, key)) return false;
  }
  return true;
}

/**
 * Checks if some entry in a Map satisfies the predicate.
 */
export function someInMap<K, V>(map: Map<K, V>, predicate: (value: V, key: K) => boolean): boolean {
  for (const [key, value] of map) {
    if (predicate(value, key)) return true;
  }
  return false;
}

/**
 * Converts an object to a Map.
 */
export function objectToMap<V>(obj: Record<string, V>): Map<string, V> {
  const map = new Map<string, V>();
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      map.set(key, obj[key]);
    }
  }
  return map;
}

/**
 * Converts a Map to an object.
 */
export function mapToObject<V>(map: Map<string, V>): Record<string, V> {
  const obj: Record<string, V> = {};
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}
