import { describe, it, expect } from 'vitest';
import { vecAdd, vecSub, vecMul, vecDiv, vecDot, vecCross, vecMag, vecNormalize, vecDist, vecLerp, vecAngle, vecProject, vecReflect } from '../vector';

describe('vector utilities', () => {
  it('vecAdd adds vectors', () => {
    expect(vecAdd([1, 2], [3, 4])).toEqual([4, 6]);
  });

  it('vecSub subtracts vectors', () => {
    expect(vecSub([3, 4], [1, 2])).toEqual([2, 2]);
  });

  it('vecMul multiplies vectors', () => {
    expect(vecMul([1, 2], 2)).toEqual([2, 4]);
    expect(vecMul([1, 2], [3, 4])).toEqual([3, 8]);
  });

  it('vecDiv divides vectors', () => {
    expect(vecDiv([4, 6], 2)).toEqual([2, 3]);
    expect(vecDiv([4, 6], [2, 3])).toEqual([2, 2]);
  });

  it('vecDot calculates dot product', () => {
    expect(vecDot([1, 2], [3, 4])).toBe(11); // 1*3 + 2*4
  });

  it('vecCross calculates cross product', () => {
    expect(vecCross([1, 0, 0], [0, 1, 0])).toEqual([0, 0, 1]);
  });

  it('vecMag calculates magnitude', () => {
    expect(vecMag([3, 4])).toBe(5);
  });

  it('vecNormalize normalizes vector', () => {
    const norm = vecNormalize([3, 4]);
    expect(norm[0]).toBeCloseTo(0.6);
    expect(norm[1]).toBeCloseTo(0.8);
  });

  it('vecDist calculates distance', () => {
    expect(vecDist([0, 0], [3, 4])).toBe(5);
  });

  it('vecLerp interpolates vectors', () => {
    expect(vecLerp([0, 0], [10, 10], 0.5)).toEqual([5, 5]);
  });
});
