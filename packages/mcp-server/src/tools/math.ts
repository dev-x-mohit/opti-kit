import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const mathTools: McpToolDefinition[] = [
  {
    name: 'opti_statistics',
    displayName: 'Statistical Calculations',
    category: 'Math & Statistics',
    description: 'Calculate mean, median, mode, variance, standard deviation, percentile, or range with zero floating-point drift.',
    inputSchema: {
      type: 'object',
      properties: {
        numbers: {
          type: 'array',
          description: 'Array of numbers to analyze.'
        },
        metric: {
          type: 'string',
          description: 'Metric to calculate: all, mean, median, mode, variance, standardDeviation, min, max, sum, range.',
          enum: ['all', 'mean', 'median', 'mode', 'variance', 'standardDeviation', 'min', 'max', 'sum', 'range']
        }
      },
      required: ['numbers', 'metric']
    },
    exampleArgs: { numbers: [12, 18, 24, 30, 42, 54, 60], metric: 'all' },
    handler: (args) => {
      const { numbers, metric } = args;
      if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('numbers must be a non-empty array of numbers');
      }

      if (metric === 'all') {
        return {
          count: numbers.length,
          sum: opti.sum(numbers),
          mean: opti.mean(numbers),
          median: opti.median(numbers),
          variance: opti.variance(numbers),
          standardDeviation: opti.standardDeviation(numbers),
          min: Math.min(...numbers),
          max: Math.max(...numbers),
          range: Math.max(...numbers) - Math.min(...numbers)
        };
      }

      switch (metric) {
        case 'mean': return { mean: opti.mean(numbers) };
        case 'median': return { median: opti.median(numbers) };
        case 'variance': return { variance: opti.variance(numbers) };
        case 'standardDeviation': return { standardDeviation: opti.standardDeviation(numbers) };
        case 'sum': return { sum: opti.sum(numbers) };
        case 'min': return { min: Math.min(...numbers) };
        case 'max': return { max: Math.max(...numbers) };
        case 'range': return { range: Math.max(...numbers) - Math.min(...numbers) };
        default: throw new Error(`Unknown metric: ${metric}`);
      }
    }
  },
  {
    name: 'opti_math_ops',
    displayName: 'Math & Clamp Operations',
    category: 'Math & Statistics',
    description: 'Exact mathematical operations: clamp, lerp, roundTo, factorial, gcd, lcm.',
    inputSchema: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          description: 'Math operation: clamp, lerp, roundTo, gcd, lcm, factorial.',
          enum: ['clamp', 'lerp', 'roundTo', 'gcd', 'lcm', 'factorial']
        },
        val: { type: 'number', description: 'Primary numeric value.' },
        min: { type: 'number', description: 'Min boundary for clamp or start value for lerp.' },
        max: { type: 'number', description: 'Max boundary for clamp or end value for lerp.' },
        t: { type: 'number', description: 'Interpolation factor t (0 to 1) for lerp.' },
        decimals: { type: 'number', description: 'Number of decimal places for roundTo.' },
        secondaryVal: { type: 'number', description: 'Secondary number for gcd/lcm.' }
      },
      required: ['operation']
    },
    exampleArgs: { operation: 'clamp', val: 145, min: 0, max: 100 },
    handler: (args) => {
      const { operation, val, min, max, t, decimals, secondaryVal } = args;
      switch (operation) {
        case 'clamp': return opti.clamp(val, min ?? 0, max ?? 100);
        case 'lerp': return opti.lerp(min ?? 0, max ?? 1, t ?? 0.5);
        case 'roundTo': return opti.roundTo(val, decimals ?? 2);
        case 'gcd': return opti.gcd(val, secondaryVal ?? 1);
        case 'lcm': return opti.lcm(val, secondaryVal ?? 1);
        case 'factorial': return opti.factorial(val);
        default: throw new Error(`Unknown operation: ${operation}`);
      }
    }
  },
  {
    name: 'opti_vector_matrix',
    displayName: 'Vectors & Machine Learning',
    category: 'Math & Statistics',
    description: 'Vector cosine similarity, sigmoid, ReLU, and Euclidean distance.',
    inputSchema: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          description: 'Vector/ML operation: cosineSimilarity, euclideanDistance, sigmoid, relu.',
          enum: ['cosineSimilarity', 'euclideanDistance', 'sigmoid', 'relu']
        },
        vecA: { type: 'array', description: 'First vector [x, y, ...].' },
        vecB: { type: 'array', description: 'Second vector [x, y, ...].' },
        val: { type: 'number', description: 'Numeric value for scalar activations (sigmoid, relu).' }
      },
      required: ['operation']
    },
    exampleArgs: { operation: 'cosineSimilarity', vecA: [1, 2, 3], vecB: [1, 2, 4] },
    handler: (args) => {
      const { operation, vecA, vecB, val } = args;
      switch (operation) {
        case 'cosineSimilarity': return opti.cosineSimilarity(vecA, vecB);
        case 'euclideanDistance': return opti.distance(vecA[0], vecA[1], vecB[0], vecB[1]);
        case 'sigmoid': return opti.sigmoid(val ?? 0);
        case 'relu': return opti.relu(val ?? 0);
        default: throw new Error(`Unknown operation: ${operation}`);
      }
    }
  }
];
