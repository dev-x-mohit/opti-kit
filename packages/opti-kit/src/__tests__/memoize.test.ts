import { describe, it, expect } from 'vitest';
import { memoizeSimple } from '../memoize';

describe('Memoize utilities', () => {
  it('should memoize', () => {
    let calls = 0;
    const fn = memoizeSimple((x: number) => { calls++; return x * 2; });
    fn(2); fn(2);
    expect(calls).toBe(1);
  });
});
