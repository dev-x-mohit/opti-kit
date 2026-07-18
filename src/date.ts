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
