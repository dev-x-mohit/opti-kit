/**
 * OptiKit Statistics Pro — Correlation, regression, normalization, outlier detection,
 * hypothesis tests (t-test, chi-square, ANOVA), and probability distributions.
 */

const meanOf = (xs: readonly number[]) =>
  xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length;

const varianceSample = (xs: readonly number[]) => {
  if (xs.length < 2) return 0;
  const m = meanOf(xs);
  return xs.reduce((acc, x) => acc + (x - m) ** 2, 0) / (xs.length - 1);
};

/** Computes sample covariance between two equal-length numeric arrays. */
export function sampleCovariance(x: readonly number[], y: readonly number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;
  const mx = meanOf(x);
  const my = meanOf(y);
  let sum = 0;
  for (let i = 0; i < x.length; i++) sum += (x[i] - mx) * (y[i] - my);
  return sum / (x.length - 1);
}

/** Computes Pearson product-moment correlation coefficient in `[-1, 1]`. */
export function pearsonCorrelation(x: readonly number[], y: readonly number[]): number {
  const sx = Math.sqrt(varianceSample(x));
  const sy = Math.sqrt(varianceSample(y));
  if (sx === 0 || sy === 0) return 0;
  return sampleCovariance(x, y) / (sx * sy);
}

function rankArray(xs: readonly number[]): number[] {
  const indexed = xs.map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v);
  const ranks = new Array<number>(xs.length);
  let i = 0;
  while (i < indexed.length) {
    let j = i;
    while (j + 1 < indexed.length && indexed[j + 1].v === indexed[i].v) j++;
    const avgRank = (i + j) / 2 + 1;
    for (let k = i; k <= j; k++) ranks[indexed[k].i] = avgRank;
    i = j + 1;
  }
  return ranks;
}

/** Computes Spearman's rank correlation coefficient. */
export function spearmanCorrelation(x: readonly number[], y: readonly number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;
  return pearsonCorrelation(rankArray(x), rankArray(y));
}

/** Computes Kendall's Tau-a rank correlation coefficient. */
export function kendallTau(x: readonly number[], y: readonly number[]): number {
  const n = x.length;
  if (n !== y.length || n < 2) return 0;
  let concordant = 0, discordant = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = x[i] - x[j];
      const dy = y[i] - y[j];
      if (dx * dy > 0) concordant++;
      else if (dx * dy < 0) discordant++;
    }
  }
  return (concordant - discordant) / ((n * (n - 1)) / 2);
}

/** Fits a simple linear regression `y = slope * x + intercept` with `r2`. */
export function linearRegression(
  x: readonly number[],
  y: readonly number[]
): { slope: number; intercept: number; r2: number } {
  const mx = meanOf(x);
  const my = meanOf(y);
  let num = 0, den = 0;
  for (let i = 0; i < x.length; i++) {
    num += (x[i] - mx) * (y[i] - my);
    den += (x[i] - mx) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = my - slope * mx;
  const r = pearsonCorrelation(x, y);
  return { slope, intercept, r2: r * r };
}

/** Fits a polynomial regression of `degree` using normal equations (Gaussian elimination). */
export function polynomialRegression(
  x: readonly number[],
  y: readonly number[],
  degree = 2
): number[] {
  const n = degree + 1;
  const A = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  const B = new Array<number>(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      A[i][j] = x.reduce((s, xi) => s + xi ** (i + j), 0);
    }
    B[i] = x.reduce((s, xi, idx) => s + y[idx] * xi ** i, 0);
  }
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
    [A[i], A[maxRow]] = [A[maxRow], A[i]];
    [B[i], B[maxRow]] = [B[maxRow], B[i]];
    const pivot = A[i][i] || 1e-12;
    for (let k = i + 1; k < n; k++) {
      const f = A[k][i] / pivot;
      for (let j = i; j < n; j++) A[k][j] -= f * A[i][j];
      B[k] -= f * B[i];
    }
  }
  const coeffs = new Array<number>(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = B[i];
    for (let j = i + 1; j < n; j++) s -= A[i][j] * coeffs[j];
    coeffs[i] = s / (A[i][i] || 1e-12);
  }
  return coeffs;
}

/** Computes Exponential Moving Average (EMA) over a series. */
export function exponentialMovingAverage(values: readonly number[], period: number): number[] {
  if (values.length === 0) return [];
  const k = 2 / (Math.max(1, period) + 1);
  const ema = [values[0]];
  for (let i = 1; i < values.length; i++) {
    ema.push(values[i] * k + ema[i - 1] * (1 - k));
  }
  return ema;
}

/** Computes Weighted Moving Average (WMA) over a series. */
export function weightedMovingAverage(values: readonly number[], period: number): number[] {
  const p = Math.max(1, Math.floor(period));
  const out: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - p + 1);
    const slice = values.slice(start, i + 1);
    let num = 0, den = 0;
    slice.forEach((v, idx) => {
      const w = idx + 1;
      num += v * w;
      den += w;
    });
    out.push(num / den);
  }
  return out;
}

/** Computes the z-score of a single value given mean and standard deviation. */
export function zScoreValue(value: number, mean: number, stdDev: number): number {
  return stdDev === 0 ? 0 : (value - mean) / stdDev;
}

/** Standardizes an array to zero mean and unit variance. */
export function zScoreStandardize(values: readonly number[]): number[] {
  const m = meanOf(values);
  const sd = Math.sqrt(varianceSample(values));
  return values.map((v) => zScoreValue(v, m, sd));
}

/** Normalizes an array to `[0, 1]` using min-max scaling. */
export function minMaxNormalize(values: readonly number[]): number[] {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min;
  return span === 0 ? values.map(() => 0) : values.map((v) => (v - min) / span);
}

/** Scales features using median and interquartile range (robust to outliers). */
export function robustScale(values: readonly number[]): number[] {
  if (values.length === 0) return [];
  const sorted = [...values].sort((a, b) => a - b);
  const q = (p: number) => sorted[Math.floor(p * (sorted.length - 1))];
  const med = q(0.5);
  const iqr = q(0.75) - q(0.25);
  return iqr === 0 ? values.map(() => 0) : values.map((v) => (v - med) / iqr);
}

/** Detects outliers using Tukey's `1.5 * IQR` fence rule. */
export function iqrOutliers(values: readonly number[], factor = 1.5): number[] {
  if (values.length < 4) return [];
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(0.25 * (sorted.length - 1))];
  const q3 = sorted[Math.floor(0.75 * (sorted.length - 1))];
  const iqr = q3 - q1;
  const low = q1 - factor * iqr;
  const high = q3 + factor * iqr;
  return values.filter((v) => v < low || v > high);
}

/** Computes an approximate normal confidence interval `[lower, upper]` for the sample mean. */
export function confidenceIntervalMean(
  values: readonly number[],
  zCritical = 1.96
): { mean: number; lower: number; upper: number } {
  const m = meanOf(values);
  const se = values.length > 0 ? Math.sqrt(varianceSample(values) / values.length) : 0;
  return { mean: m, lower: m - zCritical * se, upper: m + zCritical * se };
}

/** Performs a one-sample t-test returning the t-statistic and degrees of freedom. */
export function tTestOneSample(
  values: readonly number[],
  populationMean: number
): { t: number; df: number } {
  const n = values.length;
  if (n < 2) return { t: 0, df: 0 };
  const se = Math.sqrt(varianceSample(values) / n);
  return { t: se === 0 ? 0 : (meanOf(values) - populationMean) / se, df: n - 1 };
}

/** Performs Welch's two-sample t-test returning the t-statistic and approximate df. */
export function tTestTwoSample(
  a: readonly number[],
  b: readonly number[]
): { t: number; df: number } {
  const va = varianceSample(a);
  const vb = varianceSample(b);
  const se = Math.sqrt(va / a.length + vb / b.length);
  const t = se === 0 ? 0 : (meanOf(a) - meanOf(b)) / se;
  const num = (va / a.length + vb / b.length) ** 2;
  const den =
    (va / a.length) ** 2 / Math.max(1, a.length - 1) +
    (vb / b.length) ** 2 / Math.max(1, b.length - 1);
  return { t, df: den === 0 ? 0 : num / den };
}

/** Computes Pearson's Chi-Square goodness-of-fit statistic. */
export function chiSquareTest(
  observed: readonly number[],
  expected: readonly number[]
): { chiSquare: number; df: number } {
  let chi2 = 0;
  for (let i = 0; i < observed.length; i++) {
    if (expected[i] > 0) chi2 += (observed[i] - expected[i]) ** 2 / expected[i];
  }
  return { chiSquare: chi2, df: Math.max(0, observed.length - 1) };
}

/** Performs one-way ANOVA returning the F-statistic and between/within degrees of freedom. */
export function anovaOneWay(groups: readonly (readonly number[])[]): {
  f: number;
  dfBetween: number;
  dfWithin: number;
} {
  const all = groups.flat();
  const grandMean = meanOf(all);
  let ssBetween = 0, ssWithin = 0;
  for (const g of groups) {
    const gm = meanOf(g);
    ssBetween += g.length * (gm - grandMean) ** 2;
    for (const v of g) ssWithin += (v - gm) ** 2;
  }
  const dfBetween = Math.max(1, groups.length - 1);
  const dfWithin = Math.max(1, all.length - groups.length);
  const msBetween = ssBetween / dfBetween;
  const msWithin = ssWithin / dfWithin;
  return { f: msWithin === 0 ? 0 : msBetween / msWithin, dfBetween, dfWithin };
}

/** Normal probability density function (PDF). */
export function normalPdf(x: number, mean = 0, stdDev = 1): number {
  const z = (x - mean) / stdDev;
  return Math.exp(-0.5 * z * z) / (stdDev * Math.sqrt(2 * Math.PI));
}

function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax));
  return sign * y;
}

/** Normal cumulative distribution function (CDF). */
export function normalCdf(x: number, mean = 0, stdDev = 1): number {
  return 0.5 * (1 + erf((x - mean) / (stdDev * Math.sqrt(2))));
}

/** Inverse standard normal CDF (Acklam's rational approximation). */
export function normalInvCdf(p: number): number {
  if (p <= 0 || p >= 1) throw new Error('Probability p must be in (0, 1)');
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const pLow = 0.02425;
  const pHigh = 1 - pLow;
  if (p < pLow) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p <= pHigh) {
    const q = p - 0.5;
    const r = q * q;
    return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  const q = Math.sqrt(-2 * Math.log(1 - p));
  return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
    ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
}

/** Poisson probability mass function (PMF). */
export function poissonPmf(k: number, lambda: number): number {
  if (k < 0 || !Number.isInteger(k)) return 0;
  let fact = 1;
  for (let i = 2; i <= k; i++) fact *= i;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / fact;
}

/** Binomial probability mass function (PMF). */
export function binomialPmf(k: number, n: number, p: number): number {
  if (k < 0 || k > n) return 0;
  let comb = 1;
  for (let i = 1; i <= k; i++) comb = (comb * (n - i + 1)) / i;
  return comb * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

/** Exponential probability density function (PDF). */
export function exponentialPdf(x: number, rate: number): number {
  return x < 0 ? 0 : rate * Math.exp(-rate * x);
}

/** Computes Shannon entropy (base 2) of a discrete probability distribution. */
export function shannonEntropy(probs: readonly number[]): number {
  let h = 0;
  for (const p of probs) if (p > 0) h -= p * Math.log2(p);
  return h;
}

/** Computes Kullback-Leibler divergence `D_KL(P || Q)` in bits. */
export function klDivergence(p: readonly number[], q: readonly number[]): number {
  let kl = 0;
  for (let i = 0; i < p.length; i++) {
    if (p[i] > 0 && q[i] > 0) kl += p[i] * Math.log2(p[i] / q[i]);
  }
  return kl;
}
