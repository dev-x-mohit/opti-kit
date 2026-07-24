import { describe, it, expect } from 'vitest';
import { mat3Identity, mat4Identity, mat3Mul, mat4Mul, mat3Transpose, mat4Transpose } from '../matrix';

describe('matrix utilities', () => {
  it('mat3Identity returns identity matrix', () => {
    expect(mat3Identity()).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  });

  it('mat4Identity returns identity matrix', () => {
    expect(mat4Identity()).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  });

  it('mat3Mul multiplies matrices', () => {
    const a = mat3Identity();
    const b = mat3Identity();
    expect(mat3Mul(a, b)).toEqual(mat3Identity());
  });

  it('mat3Transpose transposes matrix', () => {
    const a: any = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(mat3Transpose(a)).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9]);
  });
});
