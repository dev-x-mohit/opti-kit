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
