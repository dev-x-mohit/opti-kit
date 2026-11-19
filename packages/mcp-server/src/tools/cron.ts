import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const cronTools: McpToolDefinition[] = [
  {
    name: 'opti_cron_schedule',
    displayName: 'Cron Parser & Next Run Calculator',
    category: 'Date & Time',
    description: 'Parses standard 5-part cron expressions, validates syntax, calculates next execution dates, and generates a human-readable English description.',
    inputSchema: {
      type: 'object',
      properties: {
        expression: { type: 'string', description: 'Standard 5-part cron expression (e.g. "*/15 9-17 * * 1-5").' },
        count: { type: 'number', description: 'Number of upcoming execution dates to compute (default: 5).' },
        fromDate: { type: 'string', description: 'ISO date string reference to calculate from (defaults to now).' }
      },
      required: ['expression']
    },
    exampleArgs: {
      expression: '*/15 9-17 * * 1-5',
      count: 3
    },
    handler: (args) => {
      const { expression, count, fromDate } = args;
      const ref = fromDate ? new Date(fromDate) : new Date();

      if (!opti.isValidCron(expression)) {
        throw new Error(`Invalid cron expression: "${expression}". Must be 5 fields: minute hour day-of-month month day-of-week.`);
      }

      const description = opti.describeCron(expression);
      const nextDates = opti.getNextCronDates(expression, count || 5, ref).map(d => d.toISOString());

      return {
        expression,
        description,
        nextRuns: nextDates
      };
    }
  }
];
