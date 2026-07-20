import { isObject } from "./types";

/**
 * Creates a new object composed of the picked object properties.
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  if (obj == null) return result;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Creates a new object omitting specified keys.
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/**
 * Safely gets a nested property value from an object using a dot-path string or array of keys.
 */
export function get(
  obj: any,
  path: string | string[],
  defaultValue?: any
): any {
  if (obj == null) return defaultValue;
  const parts = Array.isArray(path)
    ? path
    : path
        .replace(/\[(\d+)\]/g, ".$1")
        .split(".")
        .filter(Boolean);

  let current = obj;
  for (const part of parts) {
    if (current == null) return defaultValue;
    current = current[part];
  }
  return current !== undefined ? current : defaultValue;
}

/**
 * Creates a deep copy of a value (handles Dates, RegExps, Arrays, and Plain Objects).
 */
export function deepClone<T>(val: T): T {
  if (val === null || typeof val !== "object") {
    return val;
  }

  if (val instanceof Date) {
    return new Date(val.getTime()) as any;
  }

  if (val instanceof RegExp) {
    return new RegExp(val.source, val.flags) as any;
  }

  if (Array.isArray(val)) {
    return val.map((item) => deepClone(item)) as any;
  }

  if (isObject(val)) {
    const clone = {} as any;
    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key)) {
        clone[key] = deepClone(val[key]);
      }
    }
    return clone;
  }

  return val;
}

/**
 * Deeply merges multiple source objects into a target object.
 */
export function deepMerge(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (isObject(source[key])) {
          if (!target[key]) {
            target[key] = {};
          }
          deepMerge(target[key], source[key]);
        } else {
          target[key] = deepClone(source[key]);
        }
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * Flattens a nested object into a single-level object with dot-path keys.
 * @param options.delimiter - Custom key delimiter, defaults to "."
 * @param options.maxDepth  - Max depth to flatten (unlimited by default)
 */
export function flattenObject(
  obj: Record<string, any>,
  options?: { delimiter?: string; maxDepth?: number }
): Record<string, any> {
  const delimiter = options?.delimiter ?? ".";
  const maxDepth = options?.maxDepth ?? Infinity;
  const result: Record<string, any> = {};

  function recurse(current: any, prefix: string, depth: number) {
    for (const key in current) {
      if (!Object.prototype.hasOwnProperty.call(current, key)) continue;
      const newKey = prefix ? `${prefix}${delimiter}${key}` : key;
      if (isObject(current[key]) && depth < maxDepth) {
        recurse(current[key], newKey, depth + 1);
      } else {
        result[newKey] = current[key];
      }
    }
  }

  recurse(obj, "", 0);
  return result;
}

/**
 * Safely sets a nested value in an object using a dot-path string.
 * Mutates and returns the object.
 */
export function set(obj: any, path: string, value: any): any {
  if (obj == null) return obj;
  const parts = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (current[key] == null || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }
  current[parts[parts.length - 1]] = value;
  return obj;
}

/**
 * Creates a new object by mapping keys through a transform function.
 * @param iteratee - Function that returns the new key for each entry
 */
export function mapKeys<T>(
  obj: Record<string, T>,
  iteratee: (key: string, val: T) => string
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[iteratee(key, obj[key])] = obj[key];
    }
  }
  return result;
}

/**
 * Creates a new object by mapping values through a transform function.
 */
export function mapValues<T, U>(
  obj: Record<string, T>,
  iteratee: (val: T, key: string) => U
): Record<string, U> {
  const result: Record<string, U> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = iteratee(obj[key], key);
    }
  }
  return result;
}

/**
 * Checks if a path exists in an object.
 */
export function has(obj: any, path: string | string[]): boolean {
  if (obj == null) return false;
  const parts = Array.isArray(path)
    ? path
    : path
        .replace(/\[(\d+)\]/g, ".$1")
        .split(".")
        .filter(Boolean);
  let current = obj;
  for (const part of parts) {
    if (current == null || !Object.prototype.hasOwnProperty.call(current, part)) {
      return false;
    }
    current = current[part];
  }
  return true;
}

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 */
export function isEqual(value: any, other: any): boolean {
  if (value === other) return true;
  if (value == null || other == null || typeof value !== "object" || typeof other !== "object") {
    return value !== value && other !== other; // NaN check
  }
  const keysA = Object.keys(value);
  const keysB = Object.keys(other);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(other, key) || !isEqual(value[key], other[key])) {
      return false;
    }
  }
  return true;
}

/**
 * Gets the size of a collection (array, string, object).
 */
export function size(collection: any): number {
  if (collection == null) return 0;
  if (Array.isArray(collection) || typeof collection === "string") {
    return collection.length;
  }
  if (typeof collection === "object") {
    return Object.keys(collection).length;
  }
  return 0;
}

/**
 * Creates an object composed of the inverted keys and values of object.
 */
export function invert(obj: Record<string, string | number>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[String(obj[key])] = key;
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable string keyed property key-value pairs of object.
 */
export function toPairs<T>(obj: Record<string, T>): [string, T][] {
  return Object.entries(obj);
}

/**
 * Creates an object from an array of key-value pairs.
 */
export function fromPairs<T>(pairs: [string, T][]): Record<string, T> {
  const result: Record<string, T> = {};
  for (const [key, val] of pairs) {
    result[key] = val;
  }
  return result;
}

/**
 * Creates a shallow clone of value.
 */
export function clone<T>(val: T): T {
  if (val == null || typeof val !== "object") return val;
  if (Array.isArray(val)) return [...val] as any;
  return { ...val };
}

/**
 * Creates an object composed of the object properties predicate returns truthy for.
 */
export function pickBy<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Creates an object composed of the object properties predicate does not return truthy for.
 */
export function omitBy<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Returns the key of the first element predicate returns truthy for.
 */
export function findKey<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): keyof T | undefined {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && predicate(obj[key], key)) {
      return key;
    }
  }
  return undefined;
}

/**
 * Returns the key of the last element predicate returns truthy for.
 */
export function findLastKey<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): keyof T | undefined {
  const keysList = Object.keys(obj) as Array<keyof T>;
  for (let i = keysList.length - 1; i >= 0; i--) {
    const key = keysList[i];
    if (predicate(obj[key], key)) return key;
  }
  return undefined;
}

/**
 * Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.
 */
export function forOwn<T extends object>(
  obj: T,
  iteratee: (value: T[keyof T], key: keyof T) => void
): void {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      iteratee(obj[key], key);
    }
  }
}

/**
 * Invokes the method at path of object.
 */
export function invoke(obj: any, path: string | string[], ...args: any[]): any {
  if (obj == null) return undefined;
  
  const parts = Array.isArray(path)
    ? path
    : path
        .replace(/\[(\d+)\]/g, ".$1")
        .split(".")
        .filter(Boolean);
        
  const method = parts.pop();
  if (!method) return undefined;
  
  let current = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  
  if (current != null && typeof current[method] === "function") {
    return current[method](...args);
  }
  return undefined;
}

/**
 * Wrapper for Object.keys
 */
export function keys(obj: any): string[] {
  return obj ? Object.keys(obj) : [];
}

/**
 * Wrapper for Object.values
 */
export function values<T>(obj: Record<string, T>): T[] {
  return obj ? Object.values(obj) : [];
}

/**
 * Wrapper for Object.entries
 */
export function entries<T>(obj: Record<string, T>): [string, T][] {
  return obj ? Object.entries(obj) : [];
}

/**
 * Creates an object from an array of key-value pairs.
 */
export function fromEntries<K extends PropertyKey, V>(
  entriesList: [K, V][]
): Record<K, V> {
  return entriesList ? (Object.fromEntries(entriesList) as Record<K, V>) : ({} as Record<K, V>);
}

/**
 * Checks if a value is empty (empty object, array, string, map, set, or null/undefined).
 */
export function isEmpty(val: any): boolean {
  if (val == null) return true;
  if (typeof val === "boolean" || typeof val === "number") return false;
  if (typeof val === "string" || Array.isArray(val)) return val.length === 0;
  if (val instanceof Map || val instanceof Set) return val.size === 0;
  if (typeof val === "object") return Object.keys(val).length === 0;
  return false;
}

/**
 * Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to undefined.
 */
export function defaults<T extends Record<string, any>>(
  target: T,
  ...sources: Record<string, any>[]
): T {
  const result = { ...target };
  for (const src of sources) {
    if (!src) continue;
    for (const key in src) {
      if (result[key] === undefined) {
        result[key as keyof T] = src[key];
      }
    }
  }
  return result;
}

/**
 * Filters an object's properties based on key predicate.
 */
export function filterKeys<T extends Record<string, any>>(
  obj: T,
  predicate: (key: keyof T) => boolean
): Partial<T> {
  const result: Partial<T> = {};
  if (!obj) return result;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (predicate(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Filters an object's properties based on value predicate.
 */
export function filterValues<T extends Record<string, any>>(
  obj: T,
  predicate: (val: T[keyof T]) => boolean
): Partial<T> {
  const result: Partial<T> = {};
  if (!obj) return result;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (predicate(obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Removes null, undefined, and empty string values from an object.
 */
export function compactObject<T extends Record<string, any>>(obj: T): Partial<T> {
  return filterValues(
    obj,
    (val) => val !== null && val !== undefined && val !== ""
  );
}

