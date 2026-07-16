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
