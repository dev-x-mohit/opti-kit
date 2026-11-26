/**
 * OptiKit Result & Option — Type-safe algebraic data types for explicit error handling
 * and nullable-free control flow without throwing exceptions.
 */

export type Ok<T> = { readonly ok: true; readonly value: T };
export type Err<E> = { readonly ok: false; readonly error: E };
export type Result<T, E = Error> = Ok<T> | Err<E>;

export type Some<T> = { readonly some: true; readonly value: T };
export type None = { readonly some: false };
export type Option<T> = Some<T> | None;

/**
 * Creates a successful `Ok<T>` Result.
 * @example
 * ```ts
 * const res = ok(42);
 * ```
 */
export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

/**
 * Creates a failed `Err<E>` Result.
 * @example
 * ```ts
 * const res = err('Invalid input');
 * ```
 */
export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}

/** Type guard checking if a Result is `Ok`. */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.ok === true;
}

/** Type guard checking if a Result is `Err`. */
export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return result.ok === false;
}

/** Extracts the `Ok` value or throws the `Err` error. */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.ok) return result.value;
  throw result.error instanceof Error ? result.error : new Error(String(result.error));
}

/** Extracts the `Ok` value or returns a fallback default. */
export function unwrapOr<T, E>(result: Result<T, E>, fallback: T): T {
  return result.ok ? result.value : fallback;
}

/** Extracts the `Ok` value or computes a fallback from the error. */
export function unwrapOrElse<T, E>(result: Result<T, E>, fn: (error: E) => T): T {
  return result.ok ? result.value : fn(result.error);
}

/** Extracts the `Err` error or throws if the Result is `Ok`. */
export function unwrapErr<T, E>(result: Result<T, E>): E {
  if (!result.ok) return result.error;
  throw new Error('Called unwrapErr on an Ok result');
}

/** Transforms the `Ok` value of a Result while preserving `Err`. */
export function mapResult<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
  return result.ok ? ok(fn(result.value)) : result;
}

/** Transforms the `Err` error of a Result while preserving `Ok`. */
export function mapErr<T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F> {
  return result.ok ? result : err(fn(result.error));
}

/** Chains a Result-returning function onto an `Ok` value (monadic bind). */
export function andThen<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  return result.ok ? fn(result.value) : result;
}

/** Recovers from an `Err` by applying a fallback Result-returning function. */
export function orElse<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => Result<T, F>
): Result<T, F> {
  return result.ok ? result : fn(result.error);
}

/** Pattern-matches on a Result, executing `onOk` or `onErr`. */
export function matchResult<T, E, R>(
  result: Result<T, E>,
  handlers: { ok: (value: T) => R; err: (error: E) => R }
): R {
  return result.ok ? handlers.ok(result.value) : handlers.err(result.error);
}

/** Wraps a synchronous throwing function into a `Result<T, E>`. */
export function tryResult<T, E = Error>(
  fn: () => T,
  onError?: (cause: unknown) => E
): Result<T, E> {
  try {
    return ok(fn());
  } catch (cause) {
    const error = onError
      ? onError(cause)
      : ((cause instanceof Error ? cause : new Error(String(cause))) as E);
    return err(error);
  }
}

/** Wraps an async promise or function into a `Promise<Result<T, E>>`. */
export async function tryResultAsync<T, E = Error>(
  fn: () => Promise<T>,
  onError?: (cause: unknown) => E
): Promise<Result<T, E>> {
  try {
    return ok(await fn());
  } catch (cause) {
    const error = onError
      ? onError(cause)
      : ((cause instanceof Error ? cause : new Error(String(cause))) as E);
    return err(error);
  }
}

/** Combines an array of Results into a single Result of array (short-circuits on first `Err`). */
export function combineResults<T, E>(results: readonly Result<T, E>[]): Result<T[], E> {
  const values: T[] = [];
  for (const r of results) {
    if (!r.ok) return r;
    values.push(r.value);
  }
  return ok(values);
}

/** Partitions an array of Results into `{ ok: T[]; err: E[] }`. */
export function partitionResults<T, E>(
  results: readonly Result<T, E>[]
): { ok: T[]; err: E[] } {
  const oks: T[] = [];
  const errs: E[] = [];
  for (const r of results) {
    if (r.ok) oks.push(r.value);
    else errs.push(r.error);
  }
  return { ok: oks, err: errs };
}

/** Creates a `Some<T>` Option. */
export function someOption<T>(value: T): Some<T> {
  return { some: true, value };
}

/** Creates a `None` Option. */
export function noneOption(): None {
  return { some: false };
}

/** Type guard checking if an Option is `Some`. */
export function isSome<T>(option: Option<T>): option is Some<T> {
  return option.some === true;
}

/** Type guard checking if an Option is `None`. */
export function isNone<T>(option: Option<T>): option is None {
  return option.some === false;
}

/** Converts a nullable value (`T | null | undefined`) into an `Option<T>`. */
export function fromNullable<T>(value: T | null | undefined): Option<T> {
  return value === null || value === undefined ? noneOption() : someOption(value);
}

/** Maps a function over a `Some` value, preserving `None`. */
export function mapOption<T, U>(option: Option<T>, fn: (value: T) => U): Option<U> {
  return option.some ? someOption(fn(option.value)) : option;
}

/** Flat-maps an Option-returning function over a `Some` value. */
export function flatMapOption<T, U>(
  option: Option<T>,
  fn: (value: T) => Option<U>
): Option<U> {
  return option.some ? fn(option.value) : option;
}

/** Filters an Option with a predicate, returning `None` if it fails. */
export function filterOption<T>(option: Option<T>, predicate: (value: T) => boolean): Option<T> {
  return option.some && predicate(option.value) ? option : noneOption();
}

/** Extracts the value from `Some` or throws an Error on `None`. */
export function unwrapOption<T>(option: Option<T>): T {
  if (option.some) return option.value;
  throw new Error('Called unwrapOption on None');
}

/** Extracts the value from `Some` or returns a fallback on `None`. */
export function unwrapOptionOr<T>(option: Option<T>, fallback: T): T {
  return option.some ? option.value : fallback;
}

/** Pattern-matches on an Option, executing `some` or `none`. */
export function matchOption<T, R>(
  option: Option<T>,
  handlers: { some: (value: T) => R; none: () => R }
): R {
  return option.some ? handlers.some(option.value) : handlers.none();
}

/** Converts an `Option<T>` to a `Result<T, E>` using the provided error on `None`. */
export function optionToResult<T, E>(option: Option<T>, error: E): Result<T, E> {
  return option.some ? ok(option.value) : err(error);
}
