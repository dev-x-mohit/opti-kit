/**
 * Checks if a given year is a leap year.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Returns the number of days in a given month (0-indexed: 0 = January, 11 = December).
 */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Calculates the difference in days between two Date instances.
 */
export function diffInDays(date1: Date, date2: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const time1 = date1.getTime();
  const time2 = date2.getTime();
  return Math.round(Math.abs(time1 - time2) / msPerDay);
}

/**
 * Formats a date relative to a base date (defaults to now) into a human-readable string.
 * Examples: "just now", "3 minutes ago", "in 2 hours", "yesterday", "5 days ago".
 */
export function relativeTime(date: Date, baseDate = new Date()): string {
  const elapsed = date.getTime() - baseDate.getTime();
  const absElapsed = Math.abs(elapsed);
  const isFuture = elapsed > 0;
  const suffix = isFuture ? "" : " ago";
  const prefix = isFuture ? "in " : "";

  const seconds = Math.round(absElapsed / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (seconds < 45) {
    return isFuture ? "just now" : "seconds ago";
  }
  if (seconds < 90) {
    return isFuture ? "in a minute" : "a minute ago";
  }
  if (minutes < 45) {
    return prefix + minutes + " minutes" + suffix;
  }
  if (minutes < 90) {
    return isFuture ? "in an hour" : "an hour ago";
  }
  if (hours < 22) {
    return prefix + hours + " hours" + suffix;
  }
  if (hours < 36) {
    return isFuture ? "tomorrow" : "yesterday";
  }
  if (days < 26) {
    return prefix + days + " days" + suffix;
  }
  if (days < 45) {
    return isFuture ? "in a month" : "a month ago";
  }
  if (weeks < 11) {
    return prefix + weeks + " weeks" + suffix;
  }
  if (months < 11) {
    return prefix + months + " months" + suffix;
  }
  return prefix + years + " years" + suffix;
}

/**
 * Checks if a value is a valid Date object.
 */
export function isValidDate(date: any): boolean {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

/**
 * Adds a specified number of days to a date.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Subtracts a specified number of days from a date.
 */
export function subDays(date: Date, days: number): Date {
  return addDays(date, -days);
}

/**
 * Adds a specified number of months to a date.
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Subtracts a specified number of months from a date.
 */
export function subMonths(date: Date, months: number): Date {
  return addMonths(date, -months);
}

/**
 * Adds a specified number of years to a date.
 */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Subtracts a specified number of years from a date.
 */
export function subYears(date: Date, years: number): Date {
  return addYears(date, -years);
}

/**
 * Checks if the first date is before the second date.
 */
export function isBefore(date1: Date, date2: Date): boolean {
  return date1.getTime() < date2.getTime();
}

/**
 * Checks if the first date is after the second date.
 */
export function isAfter(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime();
}

/**
 * Checks if two dates are on the same calendar day.
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Checks if a date falls on a weekend (Saturday or Sunday).
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Returns a new date at the start of the given date's day (00:00:00.000).
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Returns a new date at the end of the given date's day (23:59:59.999).
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Returns a new date at the start of the given date's month.
 */
export function startOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Returns a new date at the end of the given date's month.
 */
export function endOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Simple wrapper for Intl.DateTimeFormat to format dates easily.
 * @param date - The date to format
 * @param options.locale - BCP 47 language tag (default: 'en-US')
 * @param options.style - dateStyle ('full', 'long', 'medium', 'short')
 */
export function formatDate(
  date: Date,
  options?: { locale?: string; style?: "full" | "long" | "medium" | "short" }
): string {
  const locale = options?.locale ?? "en-US";
  const dateStyle = options?.style ?? "medium";
  return new Intl.DateTimeFormat(locale, { dateStyle }).format(date);
}
