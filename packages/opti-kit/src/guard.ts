/**
 * Safely parses a JSON string. Returns the parsed value or the fallback on failure.
 */
export function safeJsonParse<T = any>(str: string, fallback?: T): T | null {
  try {
    return JSON.parse(str);
  } catch {
    return fallback !== undefined ? fallback : null;
  }
}

/**
 * Safely stringifies a value to JSON. Handles circular references gracefully.
 */
export function safeJsonStringify(val: any, fallback?: string): string {
  try {
    return JSON.stringify(val);
  } catch {
    return fallback !== undefined ? fallback : "";
  }
}

/**
 * Safely parses an integer. Returns the fallback (default 0) if parsing fails or produces NaN.
 */
export function safeParseInt(val: string, fallback: number = 0, radix: number = 10): number {
  const parsed = parseInt(val, radix);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * Safely parses a float. Returns the fallback (default 0) if parsing fails or produces NaN.
 */
export function safeParseFloat(val: string, fallback: number = 0): number {
  const parsed = parseFloat(val);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * Safely parses a date string. Returns the fallback or null if parsing fails.
 */
export function safeParseDate(val: string, fallback?: Date): Date | null {
  const parsed = new Date(val);
  if (isNaN(parsed.getTime())) {
    return fallback !== undefined ? fallback : null;
  }
  return parsed;
}

/**
 * Returns the first non-null and non-undefined value from the arguments.
 */
export function coalesce<T>(...values: (T | null | undefined)[]): T | undefined {
  for (const val of values) {
    if (val !== null && val !== undefined) {
      return val;
    }
  }
  return undefined;
}

/**
 * Wraps a synchronous function call in a try/catch. Returns the fallback on failure.
 */
export function attempt<T>(fn: () => T, fallback?: T): T | undefined {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

/**
 * Wraps an asynchronous function call in a try/catch. Returns the fallback on failure.
 */
export async function attemptAsync<T>(fn: () => Promise<T>, fallback?: T): Promise<T | undefined> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

/**
 * Asserts that a condition is true. Throws an error with the given message if not.
 */
export function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Asserts that a value is not null or undefined. Throws if it is.
 */
export function assertDefined<T>(val: T | null | undefined, name?: string): T {
  if (val === null || val === undefined) {
    throw new Error(`Expected ${name || "value"} to be defined, but received ${val}`);
  }
  return val;
}

/**
 * Used for exhaustive checks in switch statements. Throws if called.
 */
export function assertNever(val: never): never {
  throw new Error(`Unexpected value: ${val}`);
}

/**
 * Returns the value if it is not null/undefined, otherwise returns the default value.
 */
export function withDefault<T>(val: T | null | undefined, defaultVal: T): T {
  return val !== null && val !== undefined ? val : defaultVal;
}
