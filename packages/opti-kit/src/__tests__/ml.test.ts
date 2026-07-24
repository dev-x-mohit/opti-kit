import { describe, it, expect } from 'vitest';
import { sigmoid, relu } from '../ml';

describe('ML utilities', () => {
  it('should compute sigmoid', () => {
    expect(sigmoid(0)).toBe(0.5);
  });
  it('should compute relu', () => {
    expect(relu(-5)).toBe(0);
    expect(relu(5)).toBe(5);
  });
});
