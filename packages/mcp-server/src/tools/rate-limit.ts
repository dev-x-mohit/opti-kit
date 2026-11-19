import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const rateLimitTools: McpToolDefinition[] = [
  {
    name: 'opti_rate_limit_calculator',
    displayName: 'Rate Limit Calculator & Simulator',
    category: 'Concurrency & Network',
    description: 'Calculates Token Bucket throughput, token consumption feasibility, and wait times for API clients.',
    inputSchema: {
      type: 'object',
      properties: {
        capacity: { type: 'number', description: 'Burst capacity of the token bucket.' },
        refillRate: { type: 'number', description: 'Tokens added per second.' },
        tokensToConsume: { type: 'number', description: 'Number of tokens needed for request.' },
        currentTokens: { type: 'number', description: 'Current available tokens in bucket (defaults to capacity).' }
      },
      required: ['capacity', 'refillRate', 'tokensToConsume']
    },
    exampleArgs: {
      capacity: 100,
      refillRate: 10,
      tokensToConsume: 25,
      currentTokens: 15
    },
    handler: (args) => {
      const { capacity, refillRate, tokensToConsume, currentTokens } = args;
      const bucket = new opti.TokenBucket({
        capacity,
        refillRate,
        initialTokens: currentTokens !== undefined ? currentTokens : capacity
      });

      const allowed = bucket.tryConsume(tokensToConsume);
      const remaining = bucket.getTokens();
      const waitMs = allowed ? 0 : bucket.timeUntilTokens(tokensToConsume);

      return {
        allowed,
        remainingTokens: Math.round(remaining * 100) / 100,
        waitMs,
        waitSec: Math.round((waitMs / 1000) * 100) / 100
      };
    }
  }
];
