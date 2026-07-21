import { describe, it, expect } from "vitest";
import {
  mode, variance, percentile, quartiles, zScore, covariance,
  correlation, skewness, kurtosis, movingAverage, weightedAverage, geometricMean
} from "../statistics";

describe("statistics", () => {
  it("mode", () => {
    expect(mode([1, 2, 2, 3])).toEqual([2]);
    expect(mode([1, 1, 2, 2])).toEqual([1, 2]);
    expect(mode([])).toEqual([]);
  });

  it("variance", () => {
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(4.571, 2);
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9], true)).toBeCloseTo(4, 2);
  });

  it("percentile", () => {
    expect(percentile([1, 2, 3, 4, 5], 50)).toBe(3);
    expect(percentile([], 50)).toBe(0);
  });

  it("quartiles", () => {
    const q = quartiles([1, 2, 3, 4, 5, 6, 7]);
    expect(q.q2).toBe(4);
  });

  it("zScore", () => {
    expect(zScore(5, [2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(0, 0);
    expect(zScore(5, [])).toBe(0);
  });

  it("covariance", () => {
    expect(covariance([1, 2, 3], [4, 5, 6])).toBeCloseTo(1, 5);
    expect(covariance([], [])).toBe(0);
  });

  it("correlation", () => {
    // Perfect positive correlation
    expect(correlation([1, 2, 3], [2, 4, 6])).toBeCloseTo(1, 5);
    // Perfect negative correlation
    expect(correlation([1, 2, 3], [6, 4, 2])).toBeCloseTo(-1, 5);
    // No data
    expect(correlation([], [])).toBe(0);
  });

  it("skewness", () => {
    // Symmetric distribution should have skewness near 0
    expect(skewness([1, 2, 3, 4, 5])).toBeCloseTo(0, 5);
    expect(skewness([])).toBe(0);
    expect(skewness([1, 2])).toBe(0);
  });

  it("kurtosis", () => {
    // Uniform-ish distribution has negative kurtosis
    const k = kurtosis([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(typeof k).toBe("number");
    expect(kurtosis([])).toBe(0);
    expect(kurtosis([1, 2, 3])).toBe(0);
  });

  it("movingAverage", () => {
    expect(movingAverage([1, 2, 3, 4, 5], 3)).toEqual([2, 3, 4]);
    expect(movingAverage([10, 20, 30], 2)).toEqual([15, 25]);
    expect(movingAverage([], 3)).toEqual([]);
    expect(movingAverage([1, 2, 3], 0)).toEqual([]);
  });

  it("weightedAverage", () => {
    expect(weightedAverage([80, 90], [1, 3])).toBe(87.5);
    expect(weightedAverage([10, 20, 30], [1, 1, 1])).toBeCloseTo(20);
    expect(weightedAverage([], [])).toBe(0);
  });

  it("geometricMean", () => {
    expect(geometricMean([2, 8])).toBeCloseTo(4, 5);
    expect(geometricMean([1, 3, 9])).toBeCloseTo(3, 5);
    expect(geometricMean([])).toBe(0);
    expect(geometricMean([-1, 2])).toBe(0); // negative values
  });
});
