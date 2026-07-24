/**
 * Custom Error class with a code property.
 */
export class CodeError extends Error {
  public code: string | number;
  public details?: any;

  constructor(message: string, code: string | number, details?: any) {
    super(message);
    this.name = 'CodeError';
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, CodeError.prototype);
  }
}

/**
 * Custom Error class for HTTP errors.
 */
export class HttpError extends Error {
  public statusCode: number;
  public statusText: string;
  public response?: any;

  constructor(statusCode: number, statusText: string, response?: any) {
    super(`HTTP Error ${statusCode}: ${statusText}`);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.response = response;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

/**
 * Safely parses an unknown error into a standard Error object.
 */
export function normalizeError(err: unknown): Error {
  if (err instanceof Error) {
    return err;
  }
  if (typeof err === 'string') {
    return new Error(err);
  }
  if (typeof err === 'object' && err !== null) {
    return new Error(JSON.stringify(err));
  }
  return new Error(String(err));
}

/**
 * Attempts to extract a user-friendly error message from an unknown error.
 */
export function getErrorMessage(err: unknown, fallback = 'An unknown error occurred'): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string') {
    return (err as any).message;
  }
  return fallback;
}

/**
 * Parses a stack trace string into an array of call site strings.
 */
export function parseStackTrace(stack?: string): string[] {
  if (!stack) return [];
  return stack
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('at '));
}

/**
 * Wraps a function to catch synchronous exceptions and return them as a result tuple [error, result].
 */
export function tryCatch<T, E = Error>(fn: () => T): [E | null, T | null] {
  try {
    return [null, fn()];
  } catch (error) {
    return [error as E, null];
  }
}
