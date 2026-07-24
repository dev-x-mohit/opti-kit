/**
 * Financial Math Utilities
 */

export function calculateSimpleInterest(principal: number, rate: number, time: number): number {
  return (principal * rate * time) / 100;
}

export function calculateCompoundInterest(principal: number, rate: number, time: number, compoundingsPerYear = 1): number {
  return principal * Math.pow(1 + (rate / 100 / compoundingsPerYear), compoundingsPerYear * time) - principal;
}

export function calculatePMT(ratePerPeriod: number, numPeriods: number, presentValue: number, futureValue = 0, type = 0): number {
  if (ratePerPeriod === 0) return -(presentValue + futureValue) / numPeriods;
  const pvif = Math.pow(1 + ratePerPeriod, numPeriods);
  let pmt = ratePerPeriod / (pvif - 1) * -(presentValue * pvif + futureValue);
  if (type === 1) pmt /= (1 + ratePerPeriod);
  return pmt;
}

export function calculateROI(investmentGain: number, costOfInvestment: number): number {
  return (investmentGain / costOfInvestment) * 100;
}

export function calculateNPV(discountRate: number, cashFlows: number[]): number {
  return cashFlows.reduce((npv, flow, t) => npv + flow / Math.pow(1 + discountRate, t), 0);
}

export function calculateCAGR(beginningValue: number, endingValue: number, years: number): number {
  return (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
}

export function calculateMarkup(cost: number, price: number): number {
  return ((price - cost) / cost) * 100;
}

export function calculateMargin(cost: number, price: number): number {
  return ((price - cost) / price) * 100;
}

export function calculateAmortization(principal: number, rate: number, periods: number): { interest: number, principal: number, balance: number }[] {
  const pmt = -calculatePMT(rate / 12, periods, principal);
  let balance = principal;
  const schedule = [];
  for (let i = 0; i < periods; i++) {
    const interest = balance * (rate / 12);
    const p = pmt - interest;
    balance -= p;
    schedule.push({ interest, principal: p, balance: Math.max(0, balance) });
  }
  return schedule;
}

export function formatFinanceCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}
