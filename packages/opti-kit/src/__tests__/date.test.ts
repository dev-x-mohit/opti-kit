import { describe, it, expect } from "vitest";
import { isLeapYear, daysInMonth, diffInDays, relativeTime } from "../date";

describe("date utilities", () => {
  it("isLeapYear", () => {
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2100)).toBe(false);
    expect(isLeapYear(2023)).toBe(false);
  });

  it("daysInMonth", () => {
    expect(daysInMonth(2024, 1)).toBe(29); // Feb in leap year
    expect(daysInMonth(2023, 1)).toBe(28); // Feb in non-leap year
    expect(daysInMonth(2026, 0)).toBe(31); // Jan
  });

  it("diffInDays", () => {
    const d1 = new Date("2026-07-20T12:00:00Z");
    const d2 = new Date("2026-07-25T12:00:00Z");
    expect(diffInDays(d1, d2)).toBe(5);
  });

  it("relativeTime", () => {
    const base = new Date("2026-07-20T12:00:00Z");
    
    // Past times
    const justPast = new Date("2026-07-20T11:59:30Z");
    const minsPast = new Date("2026-07-20T11:45:00Z");
    const hoursPast = new Date("2026-07-20T08:00:00Z");
    const yesterday = new Date("2026-07-19T12:00:00Z");
    const daysPast = new Date("2026-07-15T12:00:00Z");

    // Future times
    const justFuture = new Date("2026-07-20T12:00:30Z");
    const minsFuture = new Date("2026-07-20T12:15:00Z");
    const hoursFuture = new Date("2026-07-20T16:00:00Z");
    const tomorrow = new Date("2026-07-21T12:00:00Z");

    expect(relativeTime(justPast, base)).toBe("seconds ago");
    expect(relativeTime(minsPast, base)).toBe("15 minutes ago");
    expect(relativeTime(hoursPast, base)).toBe("4 hours ago");
    expect(relativeTime(yesterday, base)).toBe("yesterday");
    expect(relativeTime(daysPast, base)).toBe("5 days ago");

    expect(relativeTime(justFuture, base)).toBe("just now");
    expect(relativeTime(minsFuture, base)).toBe("in 15 minutes");
    expect(relativeTime(hoursFuture, base)).toBe("in 4 hours");
    expect(relativeTime(tomorrow, base)).toBe("tomorrow");
  });
});
