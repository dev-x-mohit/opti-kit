import { describe, it, expect } from "vitest";
import {
  mode,
  variance,
  percentile,
  quartiles,
  zScore,
  covariance,
} from "../statistics";

describe("Statistics Module", () => {
  it("mode", () => {
    expect(mode([1, 2, 2, 3, 3, 3])).toEqual([3]);
    expect(mode([1, 1, 2, 2, 3])).toEqual([1, 2]);
    expect(mode([])).toEqual([]);
    expect(mode([5])).toEqual([5]);
  });

  it("variance", () => {
    const data = [1, 2, 3, 4, 5]; // mean = 3
    // sample variance = sum((x-3)^2) / 4 = (4 + 1 + 0 + 1 + 4) / 4 = 10 / 4 = 2.5
    expect(variance(data)).toBe(2.5);
    // population variance = 10 / 5 = 2.0
    expect(variance(data, true)).toBe(2);
    expect(variance([])).toBe(0);
    expect(variance([1])).toBe(0); // Sample n=1
    expect(variance([1], true)).toBe(0); // Pop n=1
  });

  it("percentile", () => {
    const data = [15, 20, 35, 40, 50];
    expect(percentile(data, 0)).toBe(15);
    expect(percentile(data, 100)).toBe(50);
    expect(percentile(data, 50)).toBe(35); // Median
    expect(percentile([], 50)).toBe(0);
  });

  it("quartiles", () => {
    const data = [1, 2, 3, 4, 5, 6, 7];
    const { q1, q2, q3 } = quartiles(data);
    expect(q1).toBe(2.5); // 25th percentile
    expect(q2).toBe(4);   // Median
    expect(q3).toBe(5.5); // 75th percentile
    expect(quartiles([])).toEqual({ q1: 0, q2: 0, q3: 0 });
  });

  it("zScore", () => {
    const data = [10, 12, 23, 23, 16, 23, 21, 16];
    // mean = 18, stdDev (sample) ≈ 5.237
    const z = zScore(23, data);
    expect(z).toBeCloseTo(0.954, 2);
    
    expect(zScore(5, [])).toBe(0);
    expect(zScore(5, [5, 5, 5])).toBe(0); // stdDev is 0
  });

  it("covariance", () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [1, 2, 3, 4, 5];
    // sample covariance should equal sample variance of arr1 = 2.5
    expect(covariance(arr1, arr2)).toBe(2.5);
    
    const arr3 = [5, 4, 3, 2, 1];
    expect(covariance(arr1, arr3)).toBe(-2.5);
    
    expect(covariance([], [])).toBe(0);
    expect(covariance([1], [1])).toBe(0); // sample n=1
  });
});
