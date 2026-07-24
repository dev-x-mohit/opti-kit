/**
 * Machine Learning and Statistics Utilities
 */

export function sigmoid(t: number): number {
  return 1 / (1 + Math.exp(-t));
}

export function relu(t: number): number {
  return Math.max(0, t);
}

export function leakyRelu(t: number, alpha = 0.01): number {
  return t > 0 ? t : alpha * t;
}

export function tanh(t: number): number {
  return Math.tanh(t);
}

export function softmax(arr: number[]): number[] {
  const max = Math.max(...arr);
  const exps = arr.map((x) => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((x) => x / sum);
}

export function minMaxScaler(arr: number[]): number[] {
  if (arr.length === 0) return [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  if (min === max) return arr.map(() => 0.5);
  return arr.map((x) => (x - min) / (max - min));
}

export function zScoreNormalize(arr: number[]): number[] {
  if (arr.length === 0) return [];
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length;
  const stdDev = Math.sqrt(variance);
  if (stdDev === 0) return arr.map(() => 0);
  return arr.map((x) => (x - mean) / stdDev);
}

export function meanSquaredError(actual: number[], predicted: number[]): number {
  if (actual.length !== predicted.length) throw new Error('Lengths must match');
  let sum = 0;
  for (let i = 0; i < actual.length; i++) {
    sum += Math.pow(actual[i] - predicted[i], 2);
  }
  return sum / actual.length;
}

export function rootMeanSquaredError(actual: number[], predicted: number[]): number {
  return Math.sqrt(meanSquaredError(actual, predicted));
}

export function meanAbsoluteError(actual: number[], predicted: number[]): number {
  if (actual.length !== predicted.length) throw new Error('Lengths must match');
  let sum = 0;
  for (let i = 0; i < actual.length; i++) {
    sum += Math.abs(actual[i] - predicted[i]);
  }
  return sum / actual.length;
}

export function mlCosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error('Lengths must match');
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function mlEuclideanDistance(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error('Lengths must match');
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(sum);
}
