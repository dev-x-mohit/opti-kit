import { describe, it, expect } from 'vitest';
import { quickSort, mergeSort, bubbleSort } from '../sort';

describe('Sort utilities', () => {
  it('should sort array', () => {
    expect(quickSort([3, 1, 4, 1, 5, 9])).toEqual([1, 1, 3, 4, 5, 9]);
    expect(mergeSort([3, 1, 4, 1, 5, 9])).toEqual([1, 1, 3, 4, 5, 9]);
  });
});
