/**
 * Formats a number as a currency string.
 */
export function formatCurrency(
  val: number,
  currency = "USD",
  locale = "en-US"
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(val);
  } catch {
    return `${currency} ${val.toFixed(2)}`;
  }
}

/**
 * Formats bytes into a human-readable size string (e.g., "10.5 KB", "2.4 MB").
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const parsedVal = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${parsedVal} ${sizes[i]}`;
}

/**
 * Formats a number with locale-aware thousands separators and optional decimal places.
 * @param options.locale   - BCP 47 locale string (default: "en-US")
 * @param options.decimals - Fixed decimal places (optional)
 */
export function formatNumber(
  val: number,
  options?: { locale?: string; decimals?: number }
): string {
  const locale = options?.locale ?? "en-US";
  const opts: Intl.NumberFormatOptions =
    options?.decimals !== undefined
      ? { minimumFractionDigits: options.decimals, maximumFractionDigits: options.decimals }
      : {};
  return new Intl.NumberFormat(locale, opts).format(val);
}

/**
 * Formats a number in compact notation (e.g. 1000 → "1K", 1_500_000 → "1.5M").
 * @param options.locale    - BCP 47 locale string (default: "en-US")
 * @param options.decimals  - Decimal places in compact notation (default: 1)
 */
export function formatCompact(
  val: number,
  options?: { locale?: string; decimals?: number }
): string {
  const locale = options?.locale ?? "en-US";
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: options?.decimals ?? 1,
  }).format(val);
}

/**
 * Converts an integer to its ordinal string representation.
 * e.g. 1 → "1st", 2 → "2nd", 13 → "13th"
 */
export function toOrdinal(n: number): string {
  const abs = Math.abs(Math.floor(n));
  const mod100 = abs % 100;
  const mod10 = abs % 10;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  if (mod10 === 1) return `${n}st`;
  if (mod10 === 2) return `${n}nd`;
  if (mod10 === 3) return `${n}rd`;
  return `${n}th`;
}

/**
 * Checks if a number is even.
 */
export function isEven(n: number): boolean {
  return Number.isInteger(n) && n % 2 === 0;
}

/**
 * Checks if a number is odd.
 */
export function isOdd(n: number): boolean {
  return Number.isInteger(n) && Math.abs(n % 2) === 1;
}

/**
 * Checks if a number is positive (greater than zero).
 */
export function isPositive(n: number): boolean {
  return n > 0;
}

/**
 * Checks if a number is negative (less than zero).
 */
export function isNegative(n: number): boolean {
  return n < 0;
}

/**
 * Checks if a value is a float (a number with a decimal part).
 */
export function isFloat(n: number): boolean {
  return typeof n === "number" && !Number.isNaN(n) && !Number.isInteger(n);
}

/**
 * Checks if a value is an integer.
 */
export function isInteger(n: number): boolean {
  return Number.isInteger(n);
}

/**
 * Parses a string to a number, returning a default value if NaN.
 */
export function parseNumber(val: any, fallback = 0): number {
  if (val == null || (typeof val === "string" && val.trim() === "")) return fallback;
  const parsed = Number(val);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * Converts a value to a safe integer.
 */
export function toSafeInteger(val: any): number {
  const num = parseNumber(val);
  if (num === 0) return 0;
  if (num > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
  if (num < Number.MIN_SAFE_INTEGER) return Number.MIN_SAFE_INTEGER;
  return Math.round(num);
}

/**
 * Rounds a number to the nearest multiple of a given step.
 * e.g., roundToNearest(13, 5) -> 15
 */
export function roundToNearest(val: number, step: number): number {
  if (step === 0) return val;
  return Math.round(val / step) * step;
}

/**
 * Converts a number to a percentage string.
 * @param val The fraction (e.g. 0.15 for 15%)
 * @param decimals Fixed decimal places
 */
export function toPercentage(val: number, decimals = 0): string {
  const percent = val * 100;
  return `${percent.toFixed(decimals)}%`;
}

/**
 * Restricts a number between a minimum and maximum value.
 */
export function clampNumber(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}



/**
 * Checks if a given number is a perfect square.
 */
export function isPerfectSquare(n: number): boolean {
  if (n < 0 || !Number.isInteger(n)) return false;
  const root = Math.sqrt(n);
  return Number.isInteger(root);
}

export { inRange, gcd, lcm, isPrime } from "./math";

/**
 * Alias for formatBytes - Formats bytes into a human-readable size string.
 */
export function formatFileSize(bytes: number, decimals = 2): string {

  return formatBytes(bytes, decimals);
}


