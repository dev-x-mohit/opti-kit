/**
 * Splits an array into chunks of a specified size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0 || arr.length === 0) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Returns a new array with unique values.
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Returns the elements in the first array that are not present in any of the other arrays.
 */
export function difference<T>(arr: T[], ...others: T[][]): T[] {
  if (arr.length === 0) return [];
  const sets = others.map((other) => new Set(other));
  return arr.filter((item) => !sets.some((set) => set.has(item)));
}

/**
 * Returns the intersection of multiple arrays.
 */
export function intersection<T>(...arrs: T[][]): T[] {
  if (arrs.length === 0) return [];
  const [first, ...rest] = arrs;
  if (rest.length === 0) return unique(first);
  const sets = rest.map((other) => new Set(other));
  return Array.from(new Set(first)).filter((item) =>
    sets.every((set) => set.has(item))
  );
}

/**
 * Groups array elements based on a key returned by the iterator function.
 */
export function groupBy<T>(
  arr: T[],
  fn: (item: T) => string | number
): Record<string | number, T[]> {
  const result: Record<string | number, T[]> = {};
  for (const item of arr) {
    const key = fn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

/**
 * Shuffles an array using the Fisher-Yates algorithm without modifying the original.
 */
export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

/**
 * Returns a random element from an array.
 */
export function sample<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
