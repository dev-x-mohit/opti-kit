/**
 * Formats a number as a currency string.
 */
export function formatCurrency(
  value: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Formats a number with locale-specific separators.
 */
export function formatNumber(
  value: number,
  locale = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Formats a date using Intl.DateTimeFormat.
 */
export function formatDateTime(
  date: Date | number,
  locale = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Formats a number as a percentage.
 */
export function formatPercentage(
  value: number,
  locale = 'en-US',
  decimals = 0
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Formats a number as a compact unit (e.g., 1.2K, 3M).
 */
export function formatCompactNumber(
  value: number,
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}

/**
 * Returns the plural rules for a specific number.
 */
export function getPluralRule(
  value: number,
  locale = 'en-US',
  options?: Intl.PluralRulesOptions
): Intl.LDMLPluralRule {
  return new Intl.PluralRules(locale, options).select(value);
}

/**
 * Formats a list of strings with conjunctions (e.g., "A, B, and C").
 */
export function formatList(
  list: string[],
  locale = 'en-US',
  options?: Intl.ListFormatOptions
): string {
  if (typeof Intl.ListFormat !== 'undefined') {
    return new Intl.ListFormat(locale, options).format(list);
  }
  // Fallback for environments without Intl.ListFormat
  if (list.length === 0) return '';
  if (list.length === 1) return list[0];
  if (list.length === 2) return `${list[0]} and ${list[1]}`;
  return `${list.slice(0, -1).join(', ')}, and ${list[list.length - 1]}`;
}

/**
 * Formats a relative time (e.g., "3 days ago").
 */
export function formatRelativeTime(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale = 'en-US',
  options?: Intl.RelativeTimeFormatOptions
): string {
  if (typeof Intl.RelativeTimeFormat !== 'undefined') {
    return new Intl.RelativeTimeFormat(locale, options).format(value, unit);
  }
  // Fallback
  return `${value} ${unit}${value !== 1 ? 's' : ''} ${value < 0 ? 'ago' : 'from now'}`;
}
