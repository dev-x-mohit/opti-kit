import { describe, it, expect } from 'vitest';
import { CodeError, HttpError, normalizeError, getErrorMessage, parseStackTrace, tryCatch } from '../error';

describe('error utilities', () => {
  it('CodeError sets code and details', () => {
    const err = new CodeError('Not found', 'NOT_FOUND', { id: 1 });
    expect(err.message).toBe('Not found');
    expect(err.code).toBe('NOT_FOUND');
    expect(err.details).toEqual({ id: 1 });
  });

  it('HttpError sets status code', () => {
    const err = new HttpError(404, 'Not Found');
    expect(err.message).toBe('HTTP Error 404: Not Found');
    expect(err.statusCode).toBe(404);
  });

  it('normalizeError normalizes different types to Error', () => {
    expect(normalizeError(new Error('test'))).toBeInstanceOf(Error);
    expect(normalizeError('string error')).toBeInstanceOf(Error);
    expect(normalizeError({ message: 'obj error' })).toBeInstanceOf(Error);
  });

  it('getErrorMessage extracts message', () => {
    expect(getErrorMessage(new Error('test'))).toBe('test');
    expect(getErrorMessage('string error')).toBe('string error');
    expect(getErrorMessage({ message: 'obj error' })).toBe('obj error');
    expect(getErrorMessage(123)).toBe('An unknown error occurred');
  });

  it('parseStackTrace parses stack string', () => {
    const stack = `Error: test
    at Object.<anonymous> (/test.js:1:1)
    at Module._compile (module.js:1:1)`;
    const lines = parseStackTrace(stack);
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain('at Object');
  });

  it('tryCatch handles sync success and failure', () => {
    const [err1, res1] = tryCatch(() => 'success');
    expect(err1).toBeNull();
    expect(res1).toBe('success');

    const [err2, res2] = tryCatch(() => { throw new Error('fail'); });
    expect(err2).toBeInstanceOf(Error);
    expect(res2).toBeNull();
  });
});
