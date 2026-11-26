import { describe, it, expect } from 'vitest';
import {
  sampleCovariance, pearsonCorrelation, spearmanCorrelation, kendallTau,
  linearRegression, polynomialRegression, exponentialMovingAverage, weightedMovingAverage,
  zScoreValue, zScoreStandardize, minMaxNormalize, robustScale, iqrOutliers,
  confidenceIntervalMean, tTestOneSample, tTestTwoSample, chiSquareTest, anovaOneWay,
  normalPdf, normalCdf, normalInvCdf, poissonPmf, binomialPmf, exponentialPdf,
  shannonEntropy, klDivergence,
} from '../statistics-pro';

describe('Statistics Pro', () => {
  it('computes correlations, regressions, moving averages, and normalization', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [2, 4, 6, 8, 10];
    expect(sampleCovariance(x, y)).toBe(5);
    expect(pearsonCorrelation(x, y)).toBeCloseTo(1, 5);
    expect(spearmanCorrelation(x, y)).toBeCloseTo(1, 5);
    expect(kendallTau(x, y)).toBeCloseTo(1, 5);

    const lr = linearRegression(x, y);
    expect(lr.slope).toBeCloseTo(2, 5);
    expect(lr.intercept).toBeCloseTo(0, 5);
    expect(lr.r2).toBeCloseTo(1, 5);

    const poly = polynomialRegression([0, 1, 2, 3], [1, 2, 5, 10], 2); // 1 + x^2
    expect(poly[0]).toBeCloseTo(1, 4);
    expect(poly[2]).toBeCloseTo(1, 4);

    expect(exponentialMovingAverage([10, 20, 30], 2).length).toBe(3);
    expect(weightedMovingAverage([10, 20, 30], 2)[2]).toBeCloseTo((20 * 1 + 30 * 2) / 3, 4);
    expect(zScoreValue(15, 10, 2.5)).toBe(2);
    expect(zScoreStandardize([1, 2, 3]).reduce((a, b) => a + b, 0)).toBeCloseTo(0, 5);
    expect(minMaxNormalize([10, 20, 30])).toEqual([0, 0.5, 1]);
    expect(robustScale([1, 2, 3, 4, 100]).length).toBe(5);
    expect(iqrOutliers([1, 2, 3, 4, 5, 100])).toEqual([100]);
  });

  it('computes hypothesis tests and probability distributions', () => {
    const ci = confidenceIntervalMean([10, 12, 14, 16]);
    expect(ci.mean).toBe(13);
    expect(ci.lower).toBeLessThan(13);
    expect(tTestOneSample([10, 12, 14], 10).t).toBeGreaterThan(0);
    expect(tTestTwoSample([10, 11, 12], [20, 21, 22]).t).toBeLessThan(0);
    expect(chiSquareTest([10, 10], [10, 10]).chiSquare).toBe(0);
    expect(anovaOneWay([[1, 2, 3], [10, 11, 12]]).f).toBeGreaterThan(10);

    expect(normalPdf(0)).toBeCloseTo(0.39894, 4);
    expect(normalCdf(0)).toBeCloseTo(0.5, 5);
    expect(normalInvCdf(0.975)).toBeCloseTo(1.96, 2);
    expect(poissonPmf(2, 2)).toBeCloseTo(0.27067, 4);
    expect(binomialPmf(2, 4, 0.5)).toBeCloseTo(0.375, 5);
    expect(exponentialPdf(0, 2)).toBe(2);
    expect(shannonEntropy([0.5, 0.5])).toBe(1);
    expect(klDivergence([0.5, 0.5], [0.5, 0.5])).toBe(0);
  });
});
