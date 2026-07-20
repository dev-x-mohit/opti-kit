import { describe, it, expect } from "vitest";
import {
  isLeapYear,
  daysInMonth,
  diffInDays,
  relativeTime,
  isValidDate,
  addDays,
  subDays,
  addMonths,
  subMonths,
  addYears,
  subYears,
  isBefore,
  isAfter,
  isSameDay,
  isWeekend,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  formatDate,
} from "../date";

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

  it("isValidDate", () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date("invalid"))).toBe(false);
    expect(isValidDate("2024-01-01")).toBe(false);
  });

  it("add / sub Days", () => {
    const d = new Date("2024-01-10T12:00:00Z");
    expect(addDays(d, 5).getDate()).toBe(15);
    expect(subDays(d, 5).getDate()).toBe(5);
  });

  it("add / sub Months", () => {
    const d = new Date("2024-01-10T12:00:00Z");
    expect(addMonths(d, 2).getMonth()).toBe(2); // March (0-indexed)
    expect(subMonths(d, 1).getMonth()).toBe(11); // Previous December
  });

  it("add / sub Years", () => {
    const d = new Date("2024-01-10T12:00:00Z");
    expect(addYears(d, 2).getFullYear()).toBe(2026);
    expect(subYears(d, 1).getFullYear()).toBe(2023);
  });

  it("isBefore / isAfter", () => {
    const d1 = new Date("2024-01-10T12:00:00Z");
    const d2 = new Date("2024-01-15T12:00:00Z");
    expect(isBefore(d1, d2)).toBe(true);
    expect(isAfter(d2, d1)).toBe(true);
  });

  it("isSameDay", () => {
    const d1 = new Date(2024, 0, 10, 10, 0, 0); // Jan 10, 2024, 10:00 local
    const d2 = new Date(2024, 0, 10, 22, 0, 0); // Jan 10, 2024, 22:00 local
    const d3 = new Date(2024, 0, 11, 2, 0, 0);  // Jan 11, 2024, 02:00 local
    expect(isSameDay(d1, d2)).toBe(true);
    expect(isSameDay(d1, d3)).toBe(false);
  });

  it("isWeekend", () => {
    const saturday = new Date("2024-01-13T12:00:00Z"); // Jan 13, 2024 is Saturday
    const monday = new Date("2024-01-15T12:00:00Z");
    expect(isWeekend(saturday)).toBe(true);
    expect(isWeekend(monday)).toBe(false);
  });

  it("startOfDay / endOfDay", () => {
    const d = new Date("2024-01-10T12:30:00Z");
    const start = startOfDay(d);
    expect(start.getHours()).toBe(0);
    expect(start.getMinutes()).toBe(0);
    const end = endOfDay(d);
    expect(end.getHours()).toBe(23);
    expect(end.getMinutes()).toBe(59);
  });

  it("startOfMonth / endOfMonth", () => {
    const d = new Date("2024-02-15T12:00:00Z"); // Leap year
    const start = startOfMonth(d);
    expect(start.getDate()).toBe(1);
    const end = endOfMonth(d);
    expect(end.getDate()).toBe(29);
  });

  it("formatDate", () => {
    const d = new Date("2024-01-10T12:00:00Z");
    // Depending on timezone, could be Jan 10, 2024. Just test that it returns a string with 2024.
    expect(formatDate(d)).toContain("2024");
  });
});
