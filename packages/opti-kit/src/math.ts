/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/**
 * Linearly interpolates between two numbers.
 */
export function lerp(start: number, end: number, amt: number): number {
  return (1 - amt) * start + amt * end;
}

/**
 * Generates a random number in a given range.
 * @param float If true, returns a decimal float; otherwise returns an integer.
 */
export function random(min: number, max: number, float = false): number {
  const val = Math.random() * (max - min) + min;
  return float ? val : Math.floor(val);
}

/**
 * Rounds a number to a specified decimal precision.
 */
export function round(val: number, precision = 0): number {
  const factor = Math.pow(10, precision);
  return Math.round(val * factor) / factor;
}

/**
 * Returns the sum of an array of numbers.
 */
export function sum(nums: number[]): number {
  return nums.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Returns the average (mean) of an array of numbers.
 */
export function mean(nums: number[]): number {
  if (nums.length === 0) return 0;
  return sum(nums) / nums.length;
}

/**
 * Returns the median value of an array of numbers.
 */
export function median(nums: number[]): number {
  if (nums.length === 0) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Returns the standard deviation of an array of numbers.
 * @param population - If true, uses population std dev (N); otherwise sample (N-1).
 */
export function standardDeviation(nums: number[], population = false): number {
  if (nums.length === 0) return 0;
  const avg = mean(nums);
  const squareDiffs = nums.map((n) => Math.pow(n - avg, 2));
  const divisor = population ? nums.length : nums.length - 1;
  return Math.sqrt(sum(squareDiffs) / divisor);
}

/**
 * Calculates the percentage of a value relative to a total.
 * @param options.decimals - Number of decimal places (default: 2)
 */
export function percentage(
  value: number,
  total: number,
  options?: { decimals?: number }
): number {
  if (total === 0) return 0;
  return round((value / total) * 100, options?.decimals ?? 2);
}

/**
 * Checks whether a number falls within a range [min, max].
 * @param exclusive - If true, the range is exclusive on both ends.
 */
export function inRange(
  val: number,
  min: number,
  max: number,
  exclusive = false
): boolean {
  return exclusive ? val > min && val < max : val >= min && val <= max;
}
