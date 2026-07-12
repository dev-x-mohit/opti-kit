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
