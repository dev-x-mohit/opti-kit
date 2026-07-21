/**
 * Checks if a value is null or undefined.
 * @param val The value to check.
 */
export function isNil(val: any): val is null | undefined {
  return val === null || val === undefined;
}

/**
 * Checks if a value is a plain object (excluding array, null, and other instances).
 * @param val The value to check.
 */
export function isObject(val: any): val is Record<any, any> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

/**
 * Checks if a value is a function.
 * @param val The value to check.
 */
export function isFunction(val: any): val is Function {
  return typeof val === "function";
}

/**
 * Checks if a value is a valid Date instance.
 * @param val The value to check.
 */
export function isDate(val: any): val is Date {
  return val instanceof Date && !isNaN(val.getTime());
}

/**
 * Checks if a value is a regular expression.
 * @param val The value to check.
 */
export function isRegExp(val: any): val is RegExp {
  return val instanceof RegExp;
}

/**
 * Checks if a value is a string.
 * @param val The value to check.
 */
export function isString(val: any): val is string {
  return typeof val === "string";
}

/**
 * Checks if a value is a finite number (excludes NaN and Infinity).
 * @param val The value to check.
 */
export function isNumber(val: any): val is number {
  return typeof val === "number" && Number.isFinite(val);
}

/**
 * Checks if a value is a boolean.
 * @param val The value to check.
 */
export function isBoolean(val: any): val is boolean {
  return typeof val === "boolean";
}

/**
 * Checks if a value is an array.
 * @param val The value to check.
 */
export function isArray(val: any): val is any[] {
  return Array.isArray(val);
}

/**
 * Checks if a value is a Promise or thenable.
 * @param val The value to check.
 */
export function isPromise(val: any): val is Promise<any> {
  return (
    val != null &&
    (val instanceof Promise ||
      (typeof val === "object" && typeof val.then === "function"))
  );
}

/**
 * Checks if a value is a Map instance.
 * @param val The value to check.
 */
export function isMap(val: any): val is Map<any, any> {
  return val instanceof Map;
}

/**
 * Checks if a value is a Set instance.
 * @param val The value to check.
 */
export function isSet(val: any): val is Set<any> {
  return val instanceof Set;
}

/**
 * Checks if a value is a Symbol.
 * @param val The value to check.
 */
export function isSymbol(val: any): val is symbol {
  return typeof val === "symbol";
}

/**
 * Checks if a value is an Error instance.
 * @param val The value to check.
 */
export function isError(val: any): val is Error {
  return val instanceof Error;
}

/**
 * Checks if a value is a JavaScript primitive (string, number, bigint, boolean, undefined, symbol, or null).
 * @param val The value to check.
 */
export function isPrimitive(val: any): boolean {
  if (val === null) return true;
  const type = typeof val;
  return type !== "object" && type !== "function";
}

