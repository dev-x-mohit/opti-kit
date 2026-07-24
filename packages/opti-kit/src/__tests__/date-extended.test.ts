import { describe, it, expect } from 'vitest';
import { isYearLeap, addDaysToDate, isSameCalendarDay } from '../date-extended';

describe('Date extended utilities', () => {
  it('should process dates', () => {
    expect(isYearLeap(2020)).toBe(true);
    const d1 = new Date(2020, 0, 1);
    const d2 = addDaysToDate(d1, 1);
    expect(isSameCalendarDay(d1, d2)).toBe(false);
  });
});
