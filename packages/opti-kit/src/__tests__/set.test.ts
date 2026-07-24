import { describe, it, expect } from 'vitest';
import { unionOfSets, intersectionOfSets, differenceOfSets, isSetSubset, cartesianProduct } from '../set';

describe('Set utilities', () => {
  it('should compute union', () => {
    expect(Array.from(unionOfSets(new Set([1, 2]), new Set([2, 3])))).toEqual([1, 2, 3]);
  });
  it('should compute intersection', () => {
    expect(Array.from(intersectionOfSets(new Set([1, 2]), new Set([2, 3])))).toEqual([2]);
  });
});
