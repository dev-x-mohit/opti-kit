import { describe, it, expect } from 'vitest';
import {
  parseIsoDuration, formatIsoDuration, isWeekendDate, isBusinessDay,
  addBusinessDays, diffBusinessDays, isLeapYearNum, daysInMonthCount, daysInYear,
  isoWeekNumber, isoWeekYear, getQuarter, startOfQuarter, endOfQuarter,
  generateDateRange, generateRRuleDates, isSameUtcDay, isSameMonth,
  isBetweenDates, overlapDateRanges, formatRelativeStrict, getFiscalYear,
  getFiscalQuarter, nthWeekdayOfMonth,
} from '../datetime-pro';

describe('DateTime Pro', () => {
  it('parses/formats ISO durations and computes business days', () => {
    const parsed = parseIsoDuration('P1Y2M3DT4H5M6S');
    expect(parsed).toEqual({ years: 1, months: 2, weeks: 0, days: 3, hours: 4, minutes: 5, seconds: 6 });
    expect(formatIsoDuration(parsed)).toBe('P1Y2M3DT4H5M6S');

    const fri = new Date('2026-11-27T00:00:00Z'); // Friday
    const sat = new Date('2026-11-28T00:00:00Z');
    expect(isWeekendDate(sat)).toBe(true);
    expect(isBusinessDay(fri)).toBe(true);
    expect(isBusinessDay(fri, ['2026-11-27'])).toBe(false);
    expect(addBusinessDays(fri, 1).toISOString().slice(0, 10)).toBe('2026-11-30'); // Monday
    expect(diffBusinessDays(fri, new Date('2026-11-30T00:00:00Z'))).toBe(1);
  });

  it('handles calendar, ISO weeks, quarters, recurrence, and fiscal years', () => {
    expect(isLeapYearNum(2024)).toBe(true);
    expect(isLeapYearNum(2025)).toBe(false);
    expect(daysInMonthCount(2024, 2)).toBe(29);
    expect(daysInYear(2024)).toBe(366);

    const d = new Date('2026-05-15T00:00:00Z');
    expect(isoWeekNumber(d)).toBeGreaterThan(15);
    expect(isoWeekYear(d)).toBe(2026);
    expect(getQuarter(d)).toBe(2);
    expect(startOfQuarter(d).toISOString().slice(0, 10)).toBe('2026-04-01');
    expect(endOfQuarter(d).toISOString().slice(0, 10)).toBe('2026-06-30');

    expect(generateDateRange(new Date('2026-01-01T00:00:00Z'), new Date('2026-01-03T00:00:00Z')).length).toBe(3);
    expect(generateRRuleDates({ start: new Date('2026-01-01T00:00:00Z'), freq: 'monthly', count: 3 }).length).toBe(3);
    expect(isSameUtcDay(d, new Date('2026-05-15T12:00:00Z'))).toBe(true);
    expect(isSameMonth(d, new Date('2026-05-01T00:00:00Z'))).toBe(true);
    expect(isBetweenDates(d, new Date('2026-05-01T00:00:00Z'), new Date('2026-05-31T00:00:00Z'))).toBe(true);
    expect(
      overlapDateRanges(
        new Date('2026-01-01T00:00:00Z'),
        new Date('2026-01-10T00:00:00Z'),
        new Date('2026-01-05T00:00:00Z'),
        new Date('2026-01-15T00:00:00Z')
      )
    ).not.toBeNull();
    expect(formatRelativeStrict(new Date('2026-01-01T00:00:00Z'), new Date('2026-01-01T00:05:00Z'))).toBe(
      '5 minutes ago'
    );
    expect(getFiscalYear(new Date('2026-02-01T00:00:00Z'), 4)).toBe(2025);
    expect(getFiscalQuarter(new Date('2026-04-01T00:00:00Z'), 4)).toBe(1);
    expect(nthWeekdayOfMonth(2026, 11, 4, 4)?.toISOString().slice(0, 10)).toBe('2026-11-26'); // 4th Thursday
  });
});
