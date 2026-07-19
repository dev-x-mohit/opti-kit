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
