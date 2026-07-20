import { mean, median, standardDeviation, sum } from "./math";

/**
 * Returns the most frequently occurring value(s) in an array.
 * If multiple values have the highest frequency, returns an array of all modes.
 * If the array is empty, returns an empty array.
 */
export function mode(nums: number[]): number[] {
  if (nums.length === 0) return [];
  const counts = new Map<number, number>();
  let maxCount = 0;

  for (const num of nums) {
    const count = (counts.get(num) || 0) + 1;
    counts.set(num, count);
    if (count > maxCount) {
      maxCount = count;
    }
  }

  const modes: number[] = [];
  for (const [num, count] of counts.entries()) {
    if (count === maxCount) {
      modes.push(num);
    }
  }

  return modes.sort((a, b) => a - b);
}

/**
 * Calculates the variance of a dataset.
 * @param population - If true, uses population variance (N); otherwise sample variance (N-1).
 */
export function variance(nums: number[], population = false): number {
  if (nums.length === 0) return 0;
  if (!population && nums.length === 1) return 0;
  const avg = mean(nums);
  const squareDiffs = nums.map((n) => Math.pow(n - avg, 2));
  const divisor = population ? nums.length : nums.length - 1;
  return sum(squareDiffs) / divisor;
}

/**
 * Calculates the p-th percentile of an array of numbers.
 * @param p - Percentile between 0 and 100.
 */
export function percentile(nums: number[], p: number): number {
  if (nums.length === 0) return 0;
  if (p <= 0) return Math.min(...nums);
  if (p >= 100) return Math.max(...nums);

  const sorted = [...nums].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = lower + 1;
  const weight = index % 1;

  if (upper >= sorted.length) return sorted[lower];
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

/**
 * Returns the 1st (25%), 2nd (50%/median), and 3rd (75%) quartiles of an array.
 */
export function quartiles(nums: number[]): { q1: number; q2: number; q3: number } {
  if (nums.length === 0) return { q1: 0, q2: 0, q3: 0 };
  return {
    q1: percentile(nums, 25),
    q2: median(nums),
    q3: percentile(nums, 75)
  };
}

/**
 * Calculates the z-score for a specific value given a dataset.
 */
export function zScore(value: number, nums: number[], population = false): number {
  if (nums.length === 0) return 0;
  const stdDev = standardDeviation(nums, population);
  if (stdDev === 0) return 0; // Avoid division by zero
  const avg = mean(nums);
  return (value - avg) / stdDev;
}

/**
 * Calculates the covariance between two equally-sized arrays of numbers.
 * @param population - If true, calculates population covariance (N); otherwise sample covariance (N-1).
 */
export function covariance(nums1: number[], nums2: number[], population = false): number {
  if (nums1.length !== nums2.length || nums1.length === 0) return 0;
  if (!population && nums1.length === 1) return 0;

  const mean1 = mean(nums1);
  const mean2 = mean(nums2);
  let total = 0;

  for (let i = 0; i < nums1.length; i++) {
    total += (nums1[i] - mean1) * (nums2[i] - mean2);
  }

  const divisor = population ? nums1.length : nums1.length - 1;
  return total / divisor;
}
