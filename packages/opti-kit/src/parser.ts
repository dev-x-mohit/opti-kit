/**
 * OptiKit Parser — Zero-dependency monadic Parser Combinators for building
 * custom DSLs, expression grammars, and structured text parsers.
 */

export type ParseSuccess<T> = { ok: true; value: T; rest: string; index: number };
export type ParseFailure = { ok: false; expected: string; index: number };
export type ParseOutcome<T> = ParseSuccess<T> | ParseFailure;

export type Parser<T> = (input: string, index: number) => ParseOutcome<T>;

/** Executes a parser on an input string starting at index 0. */
export function runParser<T>(parser: Parser<T>, input: string): ParseOutcome<T> {
  return parser(input, 0);
}

/** Matches a single exact character. */
export function char(expected: string): Parser<string> {
  return (input, index) =>
    input[index] === expected
      ? { ok: true, value: expected, rest: input.slice(index + 1), index: index + 1 }
      : { ok: false, expected: `'${expected}'`, index };
}

/** Matches an exact literal string. */
export function str(expected: string): Parser<string> {
  return (input, index) =>
    input.startsWith(expected, index)
      ? {
          ok: true,
          value: expected,
          rest: input.slice(index + expected.length),
          index: index + expected.length,
        }
      : { ok: false, expected: `"${expected}"`, index };
}

/** Matches a regular expression anchored at the current index. */
export function regexMatch(pattern: RegExp, label = pattern.source): Parser<string> {
  const anchored = new RegExp(`^(?:${pattern.source})`, pattern.flags.replace(/[gy]/g, ''));
  return (input, index) => {
    const slice = input.slice(index);
    const match = anchored.exec(slice);
    if (!match) return { ok: false, expected: label, index };
    const matched = match[0];
    return {
      ok: true,
      value: matched,
      rest: input.slice(index + matched.length),
      index: index + matched.length,
    };
  };
}

/** Sequences multiple parsers and returns an array of their results. */
export function seq<T extends readonly Parser<unknown>[]>(
  ...parsers: T
): Parser<{ [K in keyof T]: T[K] extends Parser<infer U> ? U : never }> {
  return (input, index) => {
    const values: unknown[] = [];
    let current = index;
    for (const p of parsers) {
      const res = p(input, current);
      if (!res.ok) return res;
      values.push(res.value);
      current = res.index;
    }
    return {
      ok: true,
      value: values as { [K in keyof T]: T[K] extends Parser<infer U> ? U : never },
      rest: input.slice(current),
      index: current,
    };
  };
}

/** Tries parsers in order and returns the first match. */
export function alt<T>(...parsers: Parser<T>[]): Parser<T> {
  return (input, index) => {
    let lastErr: ParseFailure = { ok: false, expected: 'alternative', index };
    for (const p of parsers) {
      const res = p(input, index);
      if (res.ok) return res;
      lastErr = res;
    }
    return lastErr;
  };
}

/** Alias for `alt` — tries multiple parser choices. */
export function choice<T>(parsers: readonly Parser<T>[]): Parser<T> {
  return alt(...parsers);
}

/** Matches zero or more occurrences of a parser. */
export function many<T>(parser: Parser<T>): Parser<T[]> {
  return (input, index) => {
    const results: T[] = [];
    let current = index;
    while (true) {
      const res = parser(input, current);
      if (!res.ok || res.index === current) break;
      results.push(res.value);
      current = res.index;
    }
    return { ok: true, value: results, rest: input.slice(current), index: current };
  };
}

/** Matches one or more occurrences of a parser. */
export function many1<T>(parser: Parser<T>): Parser<T[]> {
  return (input, index) => {
    const first = parser(input, index);
    if (!first.ok) return first;
    const rest = many(parser)(input, first.index);
    if (!rest.ok) return rest;
    return {
      ok: true,
      value: [first.value, ...rest.value],
      rest: rest.rest,
      index: rest.index,
    };
  };
}

/** Matches zero or more items separated by a delimiter parser. */
export function sepBy<T, S>(item: Parser<T>, sep: Parser<S>): Parser<T[]> {
  return alt(sepBy1(item, sep), (input, index) => ({
    ok: true,
    value: [],
    rest: input.slice(index),
    index,
  }));
}

/** Matches one or more items separated by a delimiter parser. */
export function sepBy1<T, S>(item: Parser<T>, sep: Parser<S>): Parser<T[]> {
  return (input, index) => {
    const first = item(input, index);
    if (!first.ok) return first;
    const results: T[] = [first.value];
    let current = first.index;
    while (true) {
      const s = sep(input, current);
      if (!s.ok) break;
      const next = item(input, s.index);
      if (!next.ok) break;
      results.push(next.value);
      current = next.index;
    }
    return { ok: true, value: results, rest: input.slice(current), index: current };
  };
}

/** Matches `content` surrounded by `open` and `close` parsers. */
export function between<O, T, C>(
  open: Parser<O>,
  close: Parser<C>,
  content: Parser<T>
): Parser<T> {
  return mapParse(seq(open, content, close), ([, val]) => val);
}

/** Matches a parser optionally, returning `undefined` if it fails. */
export function optionalParse<T>(parser: Parser<T>): Parser<T | undefined> {
  return (input, index) => {
    const res = parser(input, index);
    return res.ok ? res : { ok: true, value: undefined, rest: input.slice(index), index };
  };
}

/** Transforms the parsed output value. */
export function mapParse<A, B>(parser: Parser<A>, fn: (value: A) => B): Parser<B> {
  return (input, index) => {
    const res = parser(input, index);
    return res.ok ? { ...res, value: fn(res.value) } : res;
  };
}

/** Chains a parser based on the previously parsed value. */
export function flatMapParse<A, B>(parser: Parser<A>, fn: (value: A) => Parser<B>): Parser<B> {
  return (input, index) => {
    const res = parser(input, index);
    if (!res.ok) return res;
    return fn(res.value)(input, res.index);
  };
}

/** Positive lookahead: succeeds without consuming input if `parser` matches. */
export function lookahead<T>(parser: Parser<T>): Parser<T> {
  return (input, index) => {
    const res = parser(input, index);
    return res.ok
      ? { ok: true, value: res.value, rest: input.slice(index), index }
      : res;
  };
}

/** Negative lookahead: succeeds without consuming input if `parser` fails. */
export function notFollowedBy<T>(parser: Parser<T>): Parser<null> {
  return (input, index) => {
    const res = parser(input, index);
    return res.ok
      ? { ok: false, expected: 'notFollowedBy', index }
      : { ok: true, value: null, rest: input.slice(index), index };
  };
}

/** Matches the end of the input string. */
export const eof: Parser<null> = (input, index) =>
  index >= input.length
    ? { ok: true, value: null, rest: '', index }
    : { ok: false, expected: 'EOF', index };

/** Matches zero or more whitespace characters. */
export const whitespace: Parser<string> = regexMatch(/\s*/, 'whitespace');

/** Wraps a parser to skip trailing whitespace. */
export function lexeme<T>(parser: Parser<T>): Parser<T> {
  return mapParse(seq(parser, whitespace), ([val]) => val);
}

/** Matches one or more ASCII digits. */
export const digits: Parser<string> = regexMatch(/[0-9]+/, 'digits');

/** Matches a signed integer and parses it to a `number`. */
export const integer: Parser<number> = mapParse(
  regexMatch(/-?[0-9]+/, 'integer'),
  (s) => Number.parseInt(s, 10)
);

/** Matches a signed floating-point number and parses it to a `number`. */
export const floating: Parser<number> = mapParse(
  regexMatch(/-?(?:[0-9]+\.[0-9]+|\.[0-9]+|[0-9]+)/, 'float'),
  (s) => Number.parseFloat(s)
);

/** Matches a double-quoted string literal (supporting `\"` escapes). */
export const quotedString: Parser<string> = mapParse(
  regexMatch(/"(?:[^"\\]|\\.)*"/, 'quoted string'),
  (s) => s.slice(1, -1).replace(/\\(.)/g, '$1')
);

/** Matches a standard programming identifier (`[A-Za-z_][A-Za-z0-9_]*`). */
export const identifier: Parser<string> = regexMatch(/[A-Za-z_][A-Za-z0-9_]*/, 'identifier');

/** Defers parser creation for recursive grammars. */
export function lazyParser<T>(factory: () => Parser<T>): Parser<T> {
  return (input, index) => factory()(input, index);
}
