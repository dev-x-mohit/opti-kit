import { describe, it, expect } from 'vitest';
import {
  ok, err, isOk, isErr, unwrap, unwrapOr, unwrapOrElse, unwrapErr,
  mapResult, mapErr, andThen, orElse, matchResult, tryResult, tryResultAsync,
  combineResults, partitionResults, someOption, noneOption, isSome, isNone,
  fromNullable, mapOption, flatMapOption, filterOption, unwrapOption,
  unwrapOptionOr, matchOption, optionToResult,
} from '../result';

describe('Result & Option', () => {
  it('handles ok/err creation, guards, and unwrapping', () => {
    const a = ok(10);
    const b = err('bad');
    expect(isOk(a)).toBe(true);
    expect(isErr(b)).toBe(true);
    expect(unwrap(a)).toBe(10);
    expect(() => unwrap(b)).toThrow('bad');
    expect(unwrapOr(b, 99)).toBe(99);
    expect(unwrapOrElse(b, (e) => e.length)).toBe(3);
    expect(unwrapErr(b)).toBe('bad');
    expect(() => unwrapErr(a)).toThrow();
  });

  it('transforms and chains Results', () => {
    const r = ok(5);
    expect(mapResult(r, (x) => x * 2)).toEqual(ok(10));
    expect(mapErr(err('e'), (e) => e.toUpperCase())).toEqual(err('E'));
    expect(andThen(r, (x) => (x > 0 ? ok(x + 1) : err('neg')))).toEqual(ok(6));
    expect(orElse(err('fail'), () => ok(42))).toEqual(ok(42));
    expect(matchResult(r, { ok: (v) => `v=${v}`, err: (e) => e })).toBe('v=5');
  });

  it('wraps sync/async throwing functions and combines results', async () => {
    expect(tryResult(() => JSON.parse('{"a":1}'))).toEqual(ok({ a: 1 }));
    expect(isErr(tryResult(() => JSON.parse('bad')))).toBe(true);
    expect(await tryResultAsync(async () => 7)).toEqual(ok(7));
    expect(isErr(await tryResultAsync(async () => { throw new Error('boom'); }))).toBe(true);

    expect(combineResults([ok(1), ok(2)])).toEqual(ok([1, 2]));
    expect(combineResults([ok(1), err('x'), ok(3)])).toEqual(err('x'));
    expect(partitionResults([ok(1), err('a'), ok(2)])).toEqual({ ok: [1, 2], err: ['a'] });
  });

  it('handles Option operations and conversions', () => {
    const s = someOption(10);
    const n = noneOption();
    expect(isSome(s)).toBe(true);
    expect(isNone(n)).toBe(true);
    expect(fromNullable(null)).toEqual(n);
    expect(fromNullable('hi')).toEqual(someOption('hi'));
    expect(mapOption(s, (x) => x + 5)).toEqual(someOption(15));
    expect(flatMapOption(s, (x) => (x > 5 ? someOption(x * 2) : noneOption()))).toEqual(someOption(20));
    expect(filterOption(s, (x) => x > 20)).toEqual(n);
    expect(unwrapOption(s)).toBe(10);
    expect(() => unwrapOption(n)).toThrow();
    expect(unwrapOptionOr(n, 0)).toBe(0);
    expect(matchOption(n, { some: (v) => v, none: () => -1 })).toBe(-1);
    expect(optionToResult(n, 'missing')).toEqual(err('missing'));
  });
});
