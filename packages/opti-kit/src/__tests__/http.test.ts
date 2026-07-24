import { describe, it, expect, vi } from 'vitest';
import { buildQueryString, parseQueryString, isSuccessStatus, isErrorStatus } from '../http';

describe('http utilities', () => {
  it('buildQueryString builds correct query string', () => {
    expect(buildQueryString({ a: 1, b: 'hello' })).toBe('?a=1&b=hello');
    expect(buildQueryString({ a: undefined, b: null, c: 2 })).toBe('?c=2');
    expect(buildQueryString({})).toBe('');
  });

  it('parseQueryString parses query string correctly', () => {
    expect(parseQueryString('?a=1&b=hello')).toEqual({ a: '1', b: 'hello' });
    expect(parseQueryString('a=1&b=hello')).toEqual({ a: '1', b: 'hello' });
    expect(parseQueryString('')).toEqual({});
  });

  it('isSuccessStatus returns true for 2xx status codes', () => {
    expect(isSuccessStatus(200)).toBe(true);
    expect(isSuccessStatus(299)).toBe(true);
    expect(isSuccessStatus(300)).toBe(false);
    expect(isSuccessStatus(404)).toBe(false);
  });

  it('isErrorStatus returns true for 4xx and 5xx status codes', () => {
    expect(isErrorStatus(400)).toBe(true);
    expect(isErrorStatus(404)).toBe(true);
    expect(isErrorStatus(500)).toBe(true);
    expect(isErrorStatus(200)).toBe(false);
  });
});
