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
