import { describe, it, expect } from 'vitest';
import { pointInRect, rectIntersect } from '../geometry-extended';

describe('Geometry extended utilities', () => {
  it('should test rect intersection', () => {
    const r1 = { x: 0, y: 0, width: 10, height: 10 };
    const r2 = { x: 5, y: 5, width: 10, height: 10 };
    expect(rectIntersect(r1, r2)).toBe(true);
  });
});
