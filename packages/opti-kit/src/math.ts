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

/**
 * Computes the maximum value of array. If array is empty or falsey, undefined is returned.
 */
export function max(nums: number[]): number | undefined {
  if (!nums || nums.length === 0) return undefined;
  return Math.max(...nums);
}

/**
 * Computes the minimum value of array. If array is empty or falsey, undefined is returned.
 */
export function min(nums: number[]): number | undefined {
  if (!nums || nums.length === 0) return undefined;
  return Math.min(...nums);
}

/**
 * Adds two numbers.
 */
export function add(augend: number, addend: number): number {
  return augend + addend;
}

/**
 * Subtracts subtrahend from minuend.
 */
export function subtract(minuend: number, subtrahend: number): number {
  return minuend - subtrahend;
}

/**
 * Multiplies two numbers.
 */
export function multiply(multiplier: number, multiplicand: number): number {
  return multiplier * multiplicand;
}

/**
 * Divides two numbers.
 */
export function divide(dividend: number, divisor: number): number {
  return dividend / divisor;
}

/**
 * Computes number rounded up to precision.
 */
export function ceil(val: number, precision = 0): number {
  const factor = Math.pow(10, precision);
  return Math.ceil(val * factor) / factor;
}

/**
 * Computes number rounded down to precision.
 */
export function floor(val: number, precision = 0): number {
  const factor = Math.pow(10, precision);
  return Math.floor(val * factor) / factor;
}

/**
 * Calculates the factorial of a non-negative integer n.
 */
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Returns the nth Fibonacci number.
 */
export function fibonacci(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

/**
 * Checks if a number is a prime number.
 */
export function isPrime(n: number): boolean {
  if (n <= 1 || !Number.isInteger(n)) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}


/**
 * Re-maps a number from one range to another.
 */
export function mapRange(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Calculates the Euclidean distance between two points in 2D or 3D space.
 */
export function distance(
  p1: { x: number; y: number; z?: number },
  p2: { x: number; y: number; z?: number }
): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = (p1.z ?? 0) - (p2.z ?? 0);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Calculates the dot product of two vectors of equal length.
 */
export function dotProduct(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must be of the same length.");
  }
  let sum = 0;
  for (let i = 0; i < vecA.length; i++) {
    sum += vecA[i] * vecB[i];
  }
  return sum;
}

/**
 * Calculates the Euclidean distance between two numeric vectors.
 */
export function euclideanDistance(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must be of the same length.");
  }
  let sum = 0;
  for (let i = 0; i < vecA.length; i++) {
    const diff = vecA[i] - vecB[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

/**
 * Calculates the cosine similarity between two numeric vectors.
 * Returns a value between -1 and 1.
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must be of the same length.");
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Calculates the Greatest Common Divisor (GCD) of two integers using Euclid's algorithm.
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Calculates the Least Common Multiple (LCM) of two integers.
 */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Returns base raised to exponent power.
 */
export function power(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

/**
 * Returns absolute value of a number.
 */
export function abs(val: number): number {
  return Math.abs(val);
}

/**
 * Returns 1 for positive, -1 for negative, 0 for zero.
 */
export function sign(val: number): number {
  return Math.sign(val);
}

/**
 * Calculates square root of sum of squares of arguments.
 */
export function hypot(...values: number[]): number {
  return Math.hypot(...values);
}

export { degreesToRadians, radiansToDegrees } from "./units";
export { mode } from "./statistics";







