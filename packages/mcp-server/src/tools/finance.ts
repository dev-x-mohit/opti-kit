import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const financeTools: McpToolDefinition[] = [
  {
    name: 'opti_finance_calc',
    displayName: 'Financial Calculator',
    category: 'Finance',
    description: 'Calculate compound interest, loan payment (PMT), net present value (NPV), and CAGR.',
    inputSchema: {
      type: 'object',
      properties: {
        calculation: {
          type: 'string',
          description: 'Financial calculation: compoundInterest, pmt, npv, cagr, simpleInterest.',
          enum: ['compoundInterest', 'pmt', 'npv', 'cagr', 'simpleInterest']
        },
        principal: { type: 'number', description: 'Initial principal or present value amount.' },
        rate: { type: 'number', description: 'Annual interest rate (e.g. 7 for 7%).' },
        time: { type: 'number', description: 'Time duration in years or periods.' },
        compoundingsPerYear: { type: 'number', description: 'Times compounded per year (default 12 for monthly).' },
        discountRate: { type: 'number', description: 'Discount rate for NPV calculation.' },
        cashFlows: { type: 'array', description: 'Array of cash flows for NPV.' },
        endingValue: { type: 'number', description: 'Ending value for CAGR calculation.' }
      },
      required: ['calculation']
    },
    exampleArgs: { calculation: 'compoundInterest', principal: 10000, rate: 7, time: 10, compoundingsPerYear: 12 },
    handler: (args) => {
      const { calculation, principal, rate, time, compoundingsPerYear, discountRate, cashFlows, endingValue } = args;
      switch (calculation) {
        case 'compoundInterest': {
          const interest = opti.calculateCompoundInterest(principal ?? 0, rate ?? 5, time ?? 1, compoundingsPerYear ?? 12);
          const total = (principal ?? 0) + interest;
          return { principal, rate, time, compoundingsPerYear, interest: Number(interest.toFixed(2)), total: Number(total.toFixed(2)) };
        }
        case 'pmt': {
          const ratePerPeriod = (rate ?? 5) / 100 / 12;
          const periods = (time ?? 1) * 12;
          const pmt = opti.calculatePMT(ratePerPeriod, periods, principal ?? 0);
          return { monthlyPayment: Number(Math.abs(pmt).toFixed(2)), periods, annualRate: rate };
        }
        case 'npv': {
          const npv = opti.calculateNPV(discountRate ?? 0.1, cashFlows ?? []);
          return { npv: Number(npv.toFixed(2)) };
        }
        case 'cagr': {
          const cagr = opti.calculateCAGR(principal ?? 1, endingValue ?? 1, time ?? 1);
          return { cagrPercentage: Number(cagr.toFixed(2)) };
        }
        case 'simpleInterest': {
          const interest = opti.calculateSimpleInterest(principal ?? 0, rate ?? 5, time ?? 1);
          return { simpleInterest: interest, total: (principal ?? 0) + interest };
        }
        default: throw new Error(`Unknown calculation: ${calculation}`);
      }
    }
  },
  {
    name: 'opti_currency_format',
    displayName: 'Currency Formatter',
    category: 'Finance',
    description: 'Format monetary numbers with currency symbols, thousand separators, and ISO codes.',
    inputSchema: {
      type: 'object',
      properties: {
        amount: { type: 'number', description: 'The numeric amount to format.' },
        currency: { type: 'string', description: 'Currency code, e.g. "USD", "EUR", "GBP", "INR", "JPY".' },
        locale: { type: 'string', description: 'Locale string, e.g. "en-US", "de-DE". Defaults to "en-US".' }
      },
      required: ['amount']
    },
    exampleArgs: { amount: 1250490.5, currency: 'USD' },
    handler: (args) => {
      const { amount, currency = 'USD', locale = 'en-US' } = args;
      return {
        formatted: opti.formatCurrency(amount, currency, locale),
        amount,
        currency
      };
    }
  }
];
