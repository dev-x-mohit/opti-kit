import { describe, it, expect } from 'vitest';
import {
  npv, irr, mirr, xnpv, pmt, ipmt, ppmt, amortizationSchedule, cagr,
  sharpeRatio, sortinoRatio, maxDrawdown, calmarRatio, valueAtRiskHistorical,
  conditionalVaR, betaCoefficient, alphaJensen, treynorRatio,
  blackScholesCall, blackScholesPut, optionDelta, bondPrice,
  bondYieldToMaturity, macaulayDuration,
} from '../finance-pro';

describe('Finance Pro', () => {
  it('computes DCF, loans, and CAGR', () => {
    expect(npv(0.1, [-100, 60, 60])).toBeCloseTo(4.132, 2);
    expect(irr([-100, 110])).toBeCloseTo(0.1, 4);
    expect(mirr([-100, 60, 60], 0.08, 0.1)).toBeGreaterThan(0.1);
    expect(xnpv(0.1, [{ amount: -100, date: new Date('2025-01-01') }, { amount: 110, date: new Date('2026-01-01') }])).toBeCloseTo(0, 1);

    const pay = pmt(0.01, 12, 1000);
    expect(pay).toBeLessThan(0);
    expect(ipmt(0.01, 1, 12, 1000) + ppmt(0.01, 1, 12, 1000)).toBeCloseTo(pay, 6);
    const sched = amortizationSchedule(1200, 0.12, 12);
    expect(sched.length).toBe(12);
    expect(sched[11].balance).toBeCloseTo(0, 2);
    expect(cagr(100, 121, 2)).toBeCloseTo(0.1, 4);
  });

  it('computes portfolio risk, options, and bonds', () => {
    const rets = [0.02, -0.01, 0.03, 0.01, -0.02, 0.04];
    expect(sharpeRatio(rets, 0)).toBeGreaterThan(0);
    expect(sortinoRatio(rets, 0)).toBeGreaterThan(0);
    expect(maxDrawdown([100, 120, 90, 110])).toBeCloseTo(0.25, 4);
    expect(calmarRatio(0.2, [100, 120, 90, 110])).toBeCloseTo(0.8, 4);
    expect(valueAtRiskHistorical(rets, 0.8)).toBeGreaterThanOrEqual(0);
    expect(conditionalVaR(rets, 0.8)).toBeGreaterThan(0);
    const beta = betaCoefficient([0.02, 0.04, 0.06], [0.01, 0.02, 0.03]);
    expect(beta).toBeCloseTo(2, 4);
    expect(alphaJensen(0.15, 0.02, 1, 0.1)).toBeCloseTo(0.05, 4);
    expect(treynorRatio(0.12, 0.02, 2)).toBeCloseTo(0.05, 4);

    const call = blackScholesCall(100, 100, 1, 0.05, 0.2);
    const put = blackScholesPut(100, 100, 1, 0.05, 0.2);
    // Put-Call Parity: C - P = S - K * e^(-rT)
    expect(call - put).toBeCloseTo(100 - 100 * Math.exp(-0.05), 4);
    expect(optionDelta('call', 100, 100, 1, 0.05, 0.2)).toBeGreaterThan(0.5);

    const bp = bondPrice(1000, 0.05, 0.05, 5);
    expect(bp).toBeCloseTo(1000, 4);
    expect(bondYieldToMaturity(1000, 1000, 0.05, 5)).toBeCloseTo(0.05, 4);
    expect(macaulayDuration(1000, 0.05, 0.05, 5)).toBeGreaterThan(4);
  });
});
