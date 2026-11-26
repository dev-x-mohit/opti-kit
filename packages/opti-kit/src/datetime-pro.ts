/**
 * OptiKit DateTime Pro — ISO 8601 duration parsing/formatting, business day math,
 * fiscal calendars, ISO week numbers, RRule recurrence expansion, and date range algebra.
 */

export interface IsoDuration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

/** Parses an ISO 8601 duration string (e.g. `P1Y2M3DT4H5M6S`). */
export function parseIsoDuration(iso: string): IsoDuration {
  const re =
    /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/;
  const m = re.exec(iso.trim());
  if (!m) throw new Error(`Invalid ISO 8601 duration: "${iso}"`);
  return {
    years: m[1] ? Number(m[1]) : 0,
    months: m[2] ? Number(m[2]) : 0,
    weeks: m[3] ? Number(m[3]) : 0,
    days: m[4] ? Number(m[4]) : 0,
    hours: m[5] ? Number(m[5]) : 0,
    minutes: m[6] ? Number(m[6]) : 0,
    seconds: m[7] ? Number(m[7]) : 0,
  };
}

/** Formats an `IsoDuration` object into an ISO 8601 duration string. */
export function formatIsoDuration(d: IsoDuration): string {
  const datePart =
    (d.years ? `${d.years}Y` : '') +
    (d.months ? `${d.months}M` : '') +
    (d.weeks ? `${d.weeks}W` : '') +
    (d.days ? `${d.days}D` : '');
  const timePart =
    (d.hours ? `${d.hours}H` : '') +
    (d.minutes ? `${d.minutes}M` : '') +
    (d.seconds ? `${d.seconds}S` : '');
  if (!datePart && !timePart) return 'PT0S';
  return `P${datePart}${timePart ? 'T' + timePart : ''}`;
}

/** Checks if a UTC date falls on Saturday or Sunday. */
export function isWeekendDate(date: Date): boolean {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
}

/** Checks if a UTC date is a business day (Mon–Fri and not in `holidays`). */
export function isBusinessDay(date: Date, holidays: readonly string[] = []): boolean {
  if (isWeekendDate(date)) return false;
  const iso = date.toISOString().slice(0, 10);
  return !holidays.includes(iso);
}

/** Adds `days` business days (positive or negative) to a UTC date. */
export function addBusinessDays(
  date: Date,
  days: number,
  holidays: readonly string[] = []
): Date {
  const curr = new Date(date.getTime());
  const step = days >= 0 ? 1 : -1;
  let remaining = Math.abs(Math.trunc(days));
  while (remaining > 0) {
    curr.setUTCDate(curr.getUTCDate() + step);
    if (isBusinessDay(curr, holidays)) remaining--;
  }
  return curr;
}

/** Counts business days strictly between `start` and `end` (excluding `start`, including `end`). */
export function diffBusinessDays(
  start: Date,
  end: Date,
  holidays: readonly string[] = []
): number {
  const dir = end.getTime() >= start.getTime() ? 1 : -1;
  const curr = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
  const target = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));
  let count = 0;
  while (curr.getTime() !== target.getTime()) {
    curr.setUTCDate(curr.getUTCDate() + dir);
    if (isBusinessDay(curr, holidays)) count += dir;
  }
  return count;
}

/** Checks if a Gregorian year is a leap year. */
export function isLeapYearNum(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** Returns the number of days in a given `(year, month1To12)`. */
export function daysInMonthCount(year: number, month1To12: number): number {
  return new Date(Date.UTC(year, month1To12, 0)).getUTCDate();
}

/** Returns the number of days in a Gregorian year (`365` or `366`). */
export function daysInYear(year: number): number {
  return isLeapYearNum(year) ? 366 : 365;
}

/** Computes the ISO-8601 week number (`1..53`) of a UTC date. */
export function isoWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400_000 + 1) / 7);
}

/** Computes the ISO-8601 week-numbering year of a UTC date. */
export function isoWeekYear(date: Date): number {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  return d.getUTCFullYear();
}

/** Returns the calendar quarter (`1..4`) of a UTC date. */
export function getQuarter(date: Date): 1 | 2 | 3 | 4 {
  return (Math.floor(date.getUTCMonth() / 3) + 1) as 1 | 2 | 3 | 4;
}

/** Returns the UTC start of the quarter for a date. */
export function startOfQuarter(date: Date): Date {
  const qStartMonth = Math.floor(date.getUTCMonth() / 3) * 3;
  return new Date(Date.UTC(date.getUTCFullYear(), qStartMonth, 1));
}

/** Returns the UTC end of the quarter for a date (`23:59:59.999`). */
export function endOfQuarter(date: Date): Date {
  const qStartMonth = Math.floor(date.getUTCMonth() / 3) * 3;
  return new Date(Date.UTC(date.getUTCFullYear(), qStartMonth + 3, 0, 23, 59, 59, 999));
}

/** Generates an array of UTC dates from `start` to `end` stepping by `stepDays`. */
export function generateDateRange(start: Date, end: Date, stepDays = 1): Date[] {
  const dates: Date[] = [];
  const step = Math.max(1, Math.floor(stepDays));
  const curr = new Date(start.getTime());
  while (curr.getTime() <= end.getTime()) {
    dates.push(new Date(curr.getTime()));
    curr.setUTCDate(curr.getUTCDate() + step);
  }
  return dates;
}

/** Generates recurring dates for `daily` | `weekly` | `monthly` | `yearly` schedules. */
export function generateRRuleDates(options: {
  start: Date;
  freq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval?: number;
  count: number;
}): Date[] {
  const interval = Math.max(1, options.interval ?? 1);
  const dates: Date[] = [];
  for (let i = 0; i < options.count; i++) {
    const d = new Date(options.start.getTime());
    if (options.freq === 'daily') d.setUTCDate(d.getUTCDate() + i * interval);
    else if (options.freq === 'weekly') d.setUTCDate(d.getUTCDate() + i * 7 * interval);
    else if (options.freq === 'monthly') d.setUTCMonth(d.getUTCMonth() + i * interval);
    else d.setUTCFullYear(d.getUTCFullYear() + i * interval);
    dates.push(d);
  }
  return dates;
}

/** Checks if two UTC dates fall on the same calendar day. */
export function isSameUtcDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

/** Checks if two UTC dates fall in the same year and month. */
export function isSameMonth(a: Date, b: Date): boolean {
  return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth();
}

/** Checks if `date` is inclusively between `start` and `end`. */
export function isBetweenDates(date: Date, start: Date, end: Date): boolean {
  const t = date.getTime();
  return t >= start.getTime() && t <= end.getTime();
}

/** Returns the overlapping Date range between `[aStart, aEnd]` and `[bStart, bEnd]`, or `null`. */
export function overlapDateRanges(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date
): { start: Date; end: Date } | null {
  const s = Math.max(aStart.getTime(), bStart.getTime());
  const e = Math.min(aEnd.getTime(), bEnd.getTime());
  return s <= e ? { start: new Date(s), end: new Date(e) } : null;
}

/** Formats a deterministic relative time string (`"5 minutes ago"`, `"in 2 days"`). */
export function formatRelativeStrict(target: Date, base: Date = new Date()): string {
  const diffSec = Math.round((target.getTime() - base.getTime()) / 1000);
  const abs = Math.abs(diffSec);
  const suffix = diffSec < 0 ? 'ago' : 'from now';
  if (abs < 60) return diffSec === 0 ? 'just now' : `${abs} seconds ${suffix}`;
  const mins = Math.floor(abs / 60);
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ${suffix}`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ${suffix}`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'} ${suffix}`;
}

/** Computes the fiscal year given a configurable `fiscalStartMonth` (`1..12`, default `4` = April). */
export function getFiscalYear(date: Date, fiscalStartMonth = 4): number {
  const m = date.getUTCMonth() + 1;
  const y = date.getUTCFullYear();
  return m >= fiscalStartMonth ? y : y - 1;
}

/** Computes the fiscal quarter (`1..4`) given a `fiscalStartMonth` (`1..12`). */
export function getFiscalQuarter(date: Date, fiscalStartMonth = 4): 1 | 2 | 3 | 4 {
  const m = date.getUTCMonth() + 1;
  const offset = (m - fiscalStartMonth + 12) % 12;
  return (Math.floor(offset / 3) + 1) as 1 | 2 | 3 | 4;
}

/** Finds the `nth` (1-indexed) occurrence of `weekday` (`0=Sun..6=Sat`) in `(year, month1To12)`. */
export function nthWeekdayOfMonth(
  year: number,
  month1To12: number,
  weekday: number,
  nth: number
): Date | null {
  const first = new Date(Date.UTC(year, month1To12 - 1, 1));
  const diff = (weekday - first.getUTCDay() + 7) % 7;
  const day = 1 + diff + (nth - 1) * 7;
  if (day > daysInMonthCount(year, month1To12)) return null;
  return new Date(Date.UTC(year, month1To12 - 1, day));
}
