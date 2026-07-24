/**
 * Checks if a year is a leap year.
 */
export function isYearLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Gets the number of days in a month. (Month is 0-indexed: 0 = Jan, 11 = Dec).
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Adds a specific number of days to a Date.
 */
export function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Subtracts a specific number of days from a Date.
 */
export function subDaysFromDate(date: Date, days: number): Date {
  return addDaysToDate(date, -days);
}

/**
 * Returns the start of the day for a given date (00:00:00.000).
 */
export function getStartOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Returns the end of the day for a given date (23:59:59.999).
 */
export function getEndOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Checks if two dates are the exact same day (ignoring time).
 */
export function isSameCalendarDay(dateLeft: Date, dateRight: Date): boolean {
  return (
    dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth() &&
    dateLeft.getDate() === dateRight.getDate()
  );
}

/**
 * Checks if the first date is before the second date.
 */
export function isDateBefore(date: Date, dateToCompare: Date): boolean {
  return date.getTime() < dateToCompare.getTime();
}

/**
 * Checks if the first date is after the second date.
 */
export function isDateAfter(date: Date, dateToCompare: Date): boolean {
  return date.getTime() > dateToCompare.getTime();
}

/**
 * Checks if a date is between two other dates.
 */
export function isBetween(date: Date, start: Date, end: Date, inclusive = true): boolean {
  const time = date.getTime();
  const startTime = start.getTime();
  const endTime = end.getTime();

  if (inclusive) {
    return time >= startTime && time <= endTime;
  }
  return time > startTime && time < endTime;
}
