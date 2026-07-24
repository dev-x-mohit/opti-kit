import { describe, it, expect } from 'vitest';
import { range, map, filter, take, drop, reduce, chunk, zip, enumerate } from '../iter';

describe('iter utilities', () => {
  it('range', () => {
    expect(Array.from(range(0, 3))).toEqual([0, 1, 2]);
  });

  it('map', () => {
    expect(Array.from(map([1, 2, 3], x => x * 2))).toEqual([2, 4, 6]);
  });

  it('filter', () => {
    expect(Array.from(filter([1, 2, 3, 4], x => x % 2 === 0))).toEqual([2, 4]);
  });

  it('take', () => {
    expect(Array.from(take([1, 2, 3, 4], 2))).toEqual([1, 2]);
  });

  it('drop', () => {
    expect(Array.from(drop([1, 2, 3, 4], 2))).toEqual([3, 4]);
  });

  it('reduce', () => {
    expect(reduce([1, 2, 3], (a, b) => a + b, 0)).toBe(6);
  });

  it('chunk', () => {
    expect(Array.from(chunk([1, 2, 3, 4, 5], 2))).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('zip', () => {
    expect(Array.from(zip([1, 2], ['a', 'b']))).toEqual([[1, 'a'], [2, 'b']]);
  });

  it('enumerate', () => {
    expect(Array.from(enumerate(['a', 'b']))).toEqual([[0, 'a'], [1, 'b']]);
  });
});
