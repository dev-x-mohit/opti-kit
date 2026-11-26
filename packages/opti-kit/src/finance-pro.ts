/**
 * OptiKit Finance Pro — Quantitative finance, discounted cash flow (NPV, IRR, MIRR, XNPV),
 * loans & amortization, portfolio risk (Sharpe, Sortino, VaR, CVaR, Beta, Alpha),
 * Black-Scholes options, and fixed-income bond analytics.
 */

function stdNormCdf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  const ax = Math.abs(x) / Math.sqrt(2);
  const t = 1 / (1 + 0.3275911 * ax);
  const erf =
    1 -
    (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax));
  return 0.5 * (1 + sign * erf);
}

/** Computes Net Present Value (NPV) for periodic cash flows starting at t=0. */
export function npv(discountRate: number, cashFlows: readonly number[]): number {
  let sum = 0;
  for (let t = 0; t < cashFlows.length; t++) {
    sum += cashFlows[t] / Math.pow(1 + discountRate, t);
  }
  return sum;
}

/** Computes Internal Rate of Return (IRR) using Newton-Raphson with bisection fallback. */
export function irr(cashFlows: readonly number[], guess = 0.1): number {
  let rate = guess;
  for (let i = 0; i < 100; i++) {
    let f = 0;
    let df = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      const denom = Math.pow(1 + rate, t);
      f += cashFlows[t] / denom;
      if (t > 0) df -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
    }
    if (Math.abs(f) < 1e-9) return rate;
    if (Math.abs(df) < 1e-12) break;
    const next = rate - f / df;
    if (!Number.isFinite(next) || next <= -1) break;
    rate = next;
  }
  let low = -0.99, high = 10;
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const val = npv(mid, cashFlows);
    if (Math.abs(val) < 1e-7) return mid;
    if (val > 0) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

/** Computes Modified Internal Rate of Return (MIRR). */
export function mirr(
  cashFlows: readonly number[],
  financeRate: number,
  reinvestRate: number
): number {
  const n = cashFlows.length - 1;
  if (n <= 0) return 0;
  let pvNeg = 0;
  let fvPos = 0;
  for (let t = 0; t <= n; t++) {
    const cf = cashFlows[t];
    if (cf < 0) pvNeg += -cf / Math.pow(1 + financeRate, t);
    else if (cf > 0) fvPos += cf * Math.pow(1 + reinvestRate, n - t);
  }
  if (pvNeg === 0) return 0;
  return Math.pow(fvPos / pvNeg, 1 / n) - 1;
}

/** Computes Net Present Value for irregular cash flow dates (`XNPV`). */
export function xnpv(
  discountRate: number,
  cashFlows: readonly { amount: number; date: Date }[]
): number {
  if (cashFlows.length === 0) return 0;
  const t0 = cashFlows[0].date.getTime();
  const msPerYear = 365 * 86400_000;
  let sum = 0;
  for (const cf of cashFlows) {
    const years = (cf.date.getTime() - t0) / msPerYear;
    sum += cf.amount / Math.pow(1 + discountRate, years);
  }
  return sum;
}

/** Computes fixed periodic loan payment (`PMT`). */
export function pmt(ratePerPeriod: number, totalPeriods: number, presentValue: number): number {
  if (ratePerPeriod === 0) return -presentValue / totalPeriods;
  const factor = Math.pow(1 + ratePerPeriod, totalPeriods);
  return (-presentValue * ratePerPeriod * factor) / (factor - 1);
}

/** Computes the interest portion of a loan payment for period `period` (1-indexed). */
export function ipmt(
  ratePerPeriod: number,
  period: number,
  totalPeriods: number,
  presentValue: number
): number {
  const payment = pmt(ratePerPeriod, totalPeriods, presentValue);
  let balance = presentValue;
  for (let p = 1; p < period; p++) {
    balance = balance * (1 + ratePerPeriod) + payment;
  }
  return -balance * ratePerPeriod;
}

/** Computes the principal portion of a loan payment for period `period` (1-indexed). */
export function ppmt(
  ratePerPeriod: number,
  period: number,
  totalPeriods: number,
  presentValue: number
): number {
  return pmt(ratePerPeriod, totalPeriods, presentValue) - ipmt(ratePerPeriod, period, totalPeriods, presentValue);
}

/** Generates a full loan amortization schedule. */
export function amortizationSchedule(
  principal: number,
  annualRate: number,
  months: number
): { period: number; payment: number; principalPaid: number; interestPaid: number; balance: number }[] {
  const r = annualRate / 12;
  const payment = -pmt(r, months, principal);
  let balance = principal;
  const schedule = [];
  for (let period = 1; period <= months; period++) {
    const interestPaid = balance * r;
    const principalPaid = payment - interestPaid;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({ period, payment, principalPaid, interestPaid, balance });
  }
  return schedule;
}

/** Computes Compound Annual Growth Rate (CAGR). */
export function cagr(beginValue: number, endValue: number, years: number): number {
  if (beginValue <= 0 || years <= 0) return 0;
  return Math.pow(endValue / beginValue, 1 / years) - 1;
}

const mean = (xs: readonly number[]) => (xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length);
const stdDev = (xs: readonly number[]) => {
  if (xs.length < 2) return 0;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - 1));
};

/** Computes annualized or periodic Sharpe Ratio. */
export function sharpeRatio(returns: readonly number[], riskFreeRate = 0): number {
  const excess = returns.map((r) => r - riskFreeRate);
  const sd = stdDev(excess);
  return sd === 0 ? 0 : mean(excess) / sd;
}

/** Computes Sortino Ratio using downside deviation below `targetReturn`. */
export function sortinoRatio(returns: readonly number[], targetReturn = 0): number {
  const excess = returns.map((r) => r - targetReturn);
  const downsideSq = excess.reduce((s, r) => s + (r < 0 ? r * r : 0), 0);
  const downsideDev = returns.length > 0 ? Math.sqrt(downsideSq / returns.length) : 0;
  return downsideDev === 0 ? 0 : mean(excess) / downsideDev;
}

/** Computes Maximum Drawdown (as a positive fraction `0..1`) from an equity curve. */
export function maxDrawdown(equityCurve: readonly number[]): number {
  let peak = -Infinity;
  let maxDd = 0;
  for (const v of equityCurve) {
    if (v > peak) peak = v;
    if (peak > 0) {
      const dd = (peak - v) / peak;
      if (dd > maxDd) maxDd = dd;
    }
  }
  return maxDd;
}

/** Computes Calmar Ratio (`annualizedReturn / maxDrawdown`). */
export function calmarRatio(annualizedReturn: number, equityCurve: readonly number[]): number {
  const mdd = maxDrawdown(equityCurve);
  return mdd === 0 ? 0 : annualizedReturn / mdd;
}

/** Computes historical Value at Risk (VaR) at `confidence` level (e.g. `0.95`). */
export function valueAtRiskHistorical(returns: readonly number[], confidence = 0.95): number {
  if (returns.length === 0) return 0;
  const sorted = [...returns].sort((a, b) => a - b);
  const idx = Math.max(0, Math.floor((1 - confidence) * sorted.length));
  return -sorted[idx];
}

/** Computes Conditional Value at Risk (Expected Shortfall / CVaR). */
export function conditionalVaR(returns: readonly number[], confidence = 0.95): number {
  if (returns.length === 0) return 0;
  const sorted = [...returns].sort((a, b) => a - b);
  const cutoff = Math.max(1, Math.floor((1 - confidence) * sorted.length));
  const tail = sorted.slice(0, cutoff);
  return -mean(tail);
}

/** Computes portfolio Beta relative to benchmark returns. */
export function betaCoefficient(assetReturns: readonly number[], marketReturns: readonly number[]): number {
  const n = Math.min(assetReturns.length, marketReturns.length);
  if (n < 2) return 0;
  const ma = mean(assetReturns.slice(0, n));
  const mm = mean(marketReturns.slice(0, n));
  let cov = 0, varM = 0;
  for (let i = 0; i < n; i++) {
    cov += (assetReturns[i] - ma) * (marketReturns[i] - mm);
    varM += (marketReturns[i] - mm) ** 2;
  }
  return varM === 0 ? 0 : cov / varM;
}

/** Computes Jensen's Alpha. */
export function alphaJensen(
  portfolioReturn: number,
  riskFreeRate: number,
  beta: number,
  marketReturn: number
): number {
  return portfolioReturn - (riskFreeRate + beta * (marketReturn - riskFreeRate));
}

/** Computes Treynor Ratio (`(portfolioReturn - riskFreeRate) / beta`). */
export function treynorRatio(portfolioReturn: number, riskFreeRate: number, beta: number): number {
  return beta === 0 ? 0 : (portfolioReturn - riskFreeRate) / beta;
}

/** Prices a European Call option using Black-Scholes-Merton. */
export function blackScholesCall(
  spot: number,
  strike: number,
  timeYears: number,
  riskFreeRate: number,
  volatility: number
): number {
  if (timeYears <= 0) return Math.max(0, spot - strike);
  const sqrtT = Math.sqrt(timeYears);
  const d1 = (Math.log(spot / strike) + (riskFreeRate + 0.5 * volatility ** 2) * timeYears) / (volatility * sqrtT);
  const d2 = d1 - volatility * sqrtT;
  return spot * stdNormCdf(d1) - strike * Math.exp(-riskFreeRate * timeYears) * stdNormCdf(d2);
}

/** Prices a European Put option using Black-Scholes-Merton. */
export function blackScholesPut(
  spot: number,
  strike: number,
  timeYears: number,
  riskFreeRate: number,
  volatility: number
): number {
  if (timeYears <= 0) return Math.max(0, strike - spot);
  const sqrtT = Math.sqrt(timeYears);
  const d1 = (Math.log(spot / strike) + (riskFreeRate + 0.5 * volatility ** 2) * timeYears) / (volatility * sqrtT);
  const d2 = d1 - volatility * sqrtT;
  return strike * Math.exp(-riskFreeRate * timeYears) * stdNormCdf(-d2) - spot * stdNormCdf(-d1);
}

/** Computes Black-Scholes option Delta (`call` or `put`). */
export function optionDelta(
  type: 'call' | 'put',
  spot: number,
  strike: number,
  timeYears: number,
  riskFreeRate: number,
  volatility: number
): number {
  const d1 =
    (Math.log(spot / strike) + (riskFreeRate + 0.5 * volatility ** 2) * timeYears) /
    (volatility * Math.sqrt(timeYears));
  return type === 'call' ? stdNormCdf(d1) : stdNormCdf(d1) - 1;
}

/** Computes present value of a fixed-coupon bond. */
export function bondPrice(
  faceValue: number,
  couponRate: number,
  yieldRate: number,
  periods: number,
  frequency = 1
): number {
  const c = (faceValue * couponRate) / frequency;
  const r = yieldRate / frequency;
  let pv = 0;
  for (let t = 1; t <= periods; t++) {
    pv += c / Math.pow(1 + r, t);
  }
  pv += faceValue / Math.pow(1 + r, periods);
  return pv;
}

/** Estimates Bond Yield to Maturity (YTM) via bisection. */
export function bondYieldToMaturity(
  price: number,
  faceValue: number,
  couponRate: number,
  periods: number,
  frequency = 1
): number {
  let low = 0.0001, high = 1.0;
  for (let i = 0; i < 80; i++) {
    const mid = (low + high) / 2;
    const p = bondPrice(faceValue, couponRate, mid, periods, frequency);
    if (Math.abs(p - price) < 1e-6) return mid;
    if (p > price) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

/** Computes Macaulay Duration (in years) of a fixed-coupon bond. */
export function macaulayDuration(
  faceValue: number,
  couponRate: number,
  yieldRate: number,
  periods: number,
  frequency = 1
): number {
  const c = (faceValue * couponRate) / frequency;
  const r = yieldRate / frequency;
  const price = bondPrice(faceValue, couponRate, yieldRate, periods, frequency);
  if (price === 0) return 0;
  let weighted = 0;
  for (let t = 1; t <= periods; t++) {
    const cf = t === periods ? c + faceValue : c;
    weighted += (t / frequency) * (cf / Math.pow(1 + r, t));
  }
  return weighted / price;
}
