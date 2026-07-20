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
