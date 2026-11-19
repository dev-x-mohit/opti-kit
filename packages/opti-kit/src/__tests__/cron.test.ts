import { describe, it, expect } from 'vitest';
import {
  parseCron,
  isValidCron,
  getNextCronDate,
  getNextCronDates,
  describeCron
} from '../cron';

describe('Cron Expression Parser & Scheduler', () => {
  it('should validate cron expressions correctly', () => {
    expect(isValidCron('* * * * *')).toBe(true);
    expect(isValidCron('*/15 9-17 * * 1-5')).toBe(true);
    expect(isValidCron('0 0 1 1 *')).toBe(true);
    expect(isValidCron('invalid-cron')).toBe(false);
    expect(isValidCron('60 * * * *')).toBe(false); // minute 60 is invalid
  });

  it('should parse cron expression components', () => {
    const parsed = parseCron('0,30 9-17 * * 1-5');
    expect(parsed.minutes).toEqual([0, 30]);
    expect(parsed.hours).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
    expect(parsed.daysOfWeek).toEqual([1, 2, 3, 4, 5]);
  });

  it('should compute next occurrence dates', () => {
    const base = new Date('2026-01-01T10:00:00Z');
    const next = getNextCronDate('*/15 * * * *', base);
    expect(next.getMinutes() % 15).toBe(0);
    expect(next.getTime()).toBeGreaterThan(base.getTime());

    const dates = getNextCronDates('0 0 * * *', 3, base);
    expect(dates.length).toBe(3);
    expect(dates[0].getHours()).toBe(0);
    expect(dates[0].getMinutes()).toBe(0);
  });

  it('should translate cron into human-readable descriptions', () => {
    expect(describeCron('* * * * *')).toBe('Every minute');
    expect(describeCron('*/15 * * * *')).toBe('Every 15 minutes');
    expect(describeCron('0 */2 * * *')).toBe('Every 2 hours');
    expect(describeCron('0 9 * * 1-5')).toBe('At 09:00 on Monday through Friday');
    expect(describeCron('30 14 * * *')).toBe('At 14:30 every day');
  });
});
