import { describe, it, expect } from 'vitest';
import { deepFreeze, flattenDeepObject } from '../deep';

describe('Deep utilities', () => {
  it('should flatten', () => {
    expect(flattenDeepObject({ a: { b: 1 } })).toEqual({ 'a.b': 1 });
  });
  it('should freeze', () => {
    const obj = { a: { b: 1 } };
    deepFreeze(obj);
    expect(Object.isFrozen(obj.a)).toBe(true);
  });
});
