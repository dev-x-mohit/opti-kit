import { describe, it, expect } from 'vitest';
import { binarySearch, linearSearch } from '../search';

describe('Search utilities', () => {
  it('should search array', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
    expect(linearSearch([1, 2, 3, 4, 5], 3)).toBe(2);
  });
});
