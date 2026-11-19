import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const dateTools: McpToolDefinition[] = [
  {
    name: 'opti_date_ops',
    displayName: 'Date & Relative Time',
    category: 'Date & Time',
    description: 'Calculate relative time (e.g. "3 days ago"), add days/months/years, or check leap years with zero dependencies.',
    inputSchema: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          description: 'Operation: relativeTime, addDays, addMonths, addYears, isLeapYear.',
          enum: ['relativeTime', 'addDays', 'addMonths', 'addYears', 'isLeapYear']
        },
        date: { type: 'string', description: 'ISO date string or timestamp.' },
        amount: { type: 'number', description: 'Amount of days/months/years to add (can be negative).' }
      },
      required: ['operation']
    },
    exampleArgs: { operation: 'relativeTime', date: new Date(Date.now() - 3600000 * 4).toISOString() },
    handler: (args) => {
      const { operation, date, amount } = args;
      const targetDate = date ? new Date(date) : new Date();

      switch (operation) {
        case 'relativeTime': return { relativeTime: opti.relativeTime(targetDate) };
        case 'addDays': return { resultDate: opti.addDays(targetDate, amount ?? 1) };
        case 'addMonths': return { resultDate: opti.addMonths(targetDate, amount ?? 1) };
        case 'addYears': return { resultDate: opti.addYears(targetDate, amount ?? 1) };
        case 'isLeapYear': return { isLeapYear: opti.isLeapYear(targetDate.getFullYear()) };
        default: throw new Error(`Unknown operation: ${operation}`);
      }
    }
  }
];
