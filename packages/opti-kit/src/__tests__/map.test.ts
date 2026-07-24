import { describe, it, expect } from 'vitest';
import { mapMapValues, filterMapEntries, objectToMap } from '../map';

describe('Map utilities', () => {
  it('should map values', () => {
    const map = new Map([['a', 1], ['b', 2]]);
    const mapped = mapMapValues(map, v => v * 2);
    expect(mapped.get('a')).toBe(2);
  });
});
