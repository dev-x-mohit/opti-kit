import { describe, it, expect } from 'vitest';
import { setBit, clearBit, toggleBit, checkBit } from '../bit';

describe('Bit utilities', () => {
  it('should perform bitwise operations', () => {
    expect(setBit(0, 1)).toBe(2);
    expect(clearBit(3, 1)).toBe(1);
    expect(toggleBit(1, 1)).toBe(3);
    expect(checkBit(2, 1)).toBe(true);
  });
});
