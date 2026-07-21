/**
 * Generates a random UUID (v4) using the native crypto API.
 */
export function randomUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generates a random hex color string.
 */
export function randomColor(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

/**
 * Returns a random boolean value.
 */
export function randomBoolean(): boolean {
  return Math.random() >= 0.5;
}

/**
 * Generates a random floating-point number between min and max (inclusive of min, exclusive of max).
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random item from an array.
 * If the array is empty, returns undefined.
 */
export function randomItem<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/**
 * Generates a random integer between min and max (inclusive) using Math.random (non-cryptographically secure).
 */
export function randomIntFast(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random alphanumeric string of a given length.
 * @param length The length of the string.
 * @param charset Optional custom character set. Defaults to alphanumeric.
 */
export function randomString(length: number, charset?: string): string {
  const chars = charset || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Returns N unique random items from an array (no repeats).
 * If n exceeds array length, returns a shuffled copy of the array.
 */
export function randomSample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const count = Math.min(n, copy.length);
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

/**
 * Selects a random item from a weighted list.
 * Each item must have a `value` and a `weight`.
 */
export function weightedRandom<T>(items: { value: T; weight: number }[]): T | undefined {
  if (items.length === 0) return undefined;
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight <= 0) return undefined;
  let random = Math.random() * totalWeight;
  for (const item of items) {
    random -= item.weight;
    if (random <= 0) return item.value;
  }
  return items[items.length - 1].value;
}
