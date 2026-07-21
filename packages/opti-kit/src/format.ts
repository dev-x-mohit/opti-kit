/**
 * Formats a duration in milliseconds to a human-readable string.
 * @example formatDuration(3661000) → "1h 1m 1s"
 */
export function formatDuration(ms: number): string {
  if (ms < 0) ms = 0;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000) % 60;
  const hours = Math.floor(ms / 3600000) % 24;
  const days = Math.floor(ms / 86400000);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
  return parts.join(" ");
}

/**
 * Formats a US phone number string.
 * @example formatPhoneNumber("1234567890") → "(123) 456-7890"
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

/**
 * Formats a credit card number with spaces every 4 digits.
 * @example formatCreditCardNumber("4111111111111111") → "4111 1111 1111 1111"
 */
export function formatCreditCardNumber(num: string): string {
  const digits = num.replace(/\D/g, "");
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

/**
 * Formats a number as a percentage string.
 * @example formatPercentage(0.856, 1) → "85.6%"
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Joins an array of strings with a conjunction before the last item.
 * @example formatListJoin(["a", "b", "c"]) → "a, b, and c"
 */
export function formatListJoin(items: string[], conjunction: string = "and"): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, ${conjunction} ${items[items.length - 1]}`;
}

/**
 * Returns a count with a properly pluralized noun.
 * @example pluralize(3, "item") → "3 items"
 * @example pluralize(1, "child", "children") → "1 child"
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : (plural || `${singular}s`);
  return `${count} ${word}`;
}

/**
 * Masks a string, showing only the last N characters.
 * @example maskString("4111111111111111", 4) → "************1111"
 */
export function maskString(str: string, visibleChars: number = 4, maskChar: string = "*"): string {
  if (str.length <= visibleChars) return str;
  const masked = maskChar.repeat(str.length - visibleChars);
  return masked + str.slice(-visibleChars);
}

/**
 * Truncates a string in the middle, preserving the beginning and end.
 * @example truncateMiddle("abcdefghij", 7) → "ab…hij"
 */
export function truncateMiddle(str: string, maxLen: number, separator: string = "…"): string {
  if (str.length <= maxLen) return str;
  const charsToShow = maxLen - separator.length;
  if (charsToShow <= 0) return separator;
  const front = Math.ceil(charsToShow / 2);
  const back = Math.floor(charsToShow / 2);
  return str.slice(0, front) + separator + str.slice(-back);
}

/**
 * Formats a number with a thousands separator.
 * @example formatWithSeparator(1234567) → "1,234,567"
 */
export function formatWithSeparator(num: number, separator: string = ","): string {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return parts.join(".");
}
