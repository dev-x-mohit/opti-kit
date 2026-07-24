import { describe, it, expect } from 'vitest';
import { calculateSimpleInterest, calculateROI } from '../finance';

describe('Finance utilities', () => {
  it('should calculate interest', () => {
    expect(calculateSimpleInterest(100, 5, 1)).toBe(5);
  });
  it('should calculate ROI', () => {
    expect(calculateROI(50, 100)).toBe(50);
  });
});
