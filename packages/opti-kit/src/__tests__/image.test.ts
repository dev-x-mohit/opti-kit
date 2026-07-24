import { describe, it, expect } from 'vitest';
import { applyInvert } from '../image';

describe('Image utilities', () => {
  it('should invert pixels', () => {
    expect(applyInvert([0, 255, 128, 255])).toEqual([255, 0, 127, 255]);
  });
});
