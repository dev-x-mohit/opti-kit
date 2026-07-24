import { describe, it, expect } from 'vitest';
import { easeInElastic } from '../easing-extended';

describe('Easing Extended utilities', () => {
  it('should ease', () => {
    expect(easeInElastic(0)).toBe(0);
    expect(easeInElastic(1)).toBe(1);
  });
});
