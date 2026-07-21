import { describe, it, expect } from "vitest";
import {
  formatDuration,
  formatPhoneNumber,
  formatCreditCardNumber,
  formatPercentage,
  formatListJoin,
  pluralize,
  maskString,
  truncateMiddle,
  formatWithSeparator
} from "../format";

describe("format", () => {
  it("formatDuration", () => {
    expect(formatDuration(0)).toBe("0s");
    expect(formatDuration(1000)).toBe("1s");
    expect(formatDuration(61000)).toBe("1m 1s");
    expect(formatDuration(3661000)).toBe("1h 1m 1s");
    expect(formatDuration(90061000)).toBe("1d 1h 1m 1s");
  });

  it("formatPhoneNumber", () => {
    expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("11234567890")).toBe("+1 (123) 456-7890");
    expect(formatPhoneNumber("555-1234")).toBe("555-1234");
  });

  it("formatCreditCardNumber", () => {
    expect(formatCreditCardNumber("4111111111111111")).toBe("4111 1111 1111 1111");
    expect(formatCreditCardNumber("1234-5678-9012")).toBe("1234 5678 9012");
  });

  it("formatPercentage", () => {
    expect(formatPercentage(0.856)).toBe("86%");
    expect(formatPercentage(0.856, 1)).toBe("85.6%");
    expect(formatPercentage(0.856, 2)).toBe("85.60%");
  });

  it("formatListJoin", () => {
    expect(formatListJoin([])).toBe("");
    expect(formatListJoin(["a"])).toBe("a");
    expect(formatListJoin(["a", "b"])).toBe("a and b");
    expect(formatListJoin(["a", "b", "c"])).toBe("a, b, and c");
    expect(formatListJoin(["a", "b", "c"], "or")).toBe("a, b, or c");
  });

  it("pluralize", () => {
    expect(pluralize(1, "apple")).toBe("1 apple");
    expect(pluralize(3, "apple")).toBe("3 apples");
    expect(pluralize(1, "child", "children")).toBe("1 child");
    expect(pluralize(3, "child", "children")).toBe("3 children");
  });

  it("maskString", () => {
    expect(maskString("1234567890", 4)).toBe("******7890");
    expect(maskString("123", 4)).toBe("123");
    expect(maskString("123456", 2, "#")).toBe("####56");
  });

  it("truncateMiddle", () => {
    expect(truncateMiddle("abcdefghij", 7)).toBe("abc…hij");
    expect(truncateMiddle("abc", 5)).toBe("abc");
    expect(truncateMiddle("abcdefghij", 3, "-")).toBe("a-j");
  });

  it("formatWithSeparator", () => {
    expect(formatWithSeparator(1234567)).toBe("1,234,567");
    expect(formatWithSeparator(1234567.89)).toBe("1,234,567.89");
    expect(formatWithSeparator(123, " ")).toBe("123");
  });
});
