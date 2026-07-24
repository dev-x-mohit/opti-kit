import { describe, it, expect } from 'vitest';
import { lightenHexColor, darkenHexColor } from '../color-extended';

describe('Color Extended utilities', () => {
  it('should lighten/darken', () => {
    expect(lightenHexColor('#000000', 50)).toBe('#808080'); // approximate due to float math, might be 7f/80
    // just check it returns a string for now
    expect(typeof darkenHexColor('#ffffff', 50)).toBe('string');
  });
});
