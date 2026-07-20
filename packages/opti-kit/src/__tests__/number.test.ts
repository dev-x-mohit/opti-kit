import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatBytes,
  formatNumber,
  formatCompact,
  toOrdinal,
  isEven,
  isOdd,
  isPositive,
  isNegative,
  isFloat,
  isInteger,
  parseNumber,
  toSafeInteger,
  roundToNearest,
  toPercentage,
  clampNumber,
  inRange,
  gcd,
  lcm,
  isPrime,
  isPerfectSquare,
} from "../number";

describe("number utilities", () => {
  it("formatCurrency", () => {
    // Basic format check
    const formatted = formatCurrency(1234.56, "USD", "en-US");
    // Standard output check: '$1,234.56' or similar depending on platform spaces
    expect(formatted).toContain("$");
    expect(formatted).toContain("1,234.56");
  });

  it("formatBytes", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1234567)).toBe("1.18 MB");
    expect(formatBytes(1234567890, 3)).toBe("1.15 GB");
  });

  it("formatNumber", () => {
    // Tests locale formatting
    const formatted = formatNumber(1234567.89, { locale: "en-US" });
    expect(formatted).toBe("1,234,567.89");
  });

  it("formatCompact", () => {
    expect(formatCompact(1500)).toBe("1.5K");
    expect(formatCompact(1500000)).toBe("1.5M");
  });

  it("toOrdinal", () => {
    expect(toOrdinal(1)).toBe("1st");
    expect(toOrdinal(2)).toBe("2nd");
    expect(toOrdinal(3)).toBe("3rd");
    expect(toOrdinal(4)).toBe("4th");
    expect(toOrdinal(11)).toBe("11th");
    expect(toOrdinal(21)).toBe("21st");
  });

  it("isEven / isOdd", () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(5)).toBe(false);
    expect(isOdd(5)).toBe(true);
    expect(isOdd(4)).toBe(false);
  });

  it("isPositive / isNegative", () => {
    expect(isPositive(5)).toBe(true);
    expect(isPositive(-5)).toBe(false);
    expect(isNegative(-5)).toBe(true);
    expect(isNegative(5)).toBe(false);
    expect(isPositive(0)).toBe(false);
    expect(isNegative(0)).toBe(false);
  });

  it("isFloat / isInteger", () => {
    expect(isFloat(4.5)).toBe(true);
    expect(isFloat(4)).toBe(false);
    expect(isInteger(4)).toBe(true);
    expect(isInteger(4.5)).toBe(false);
  });

  it("parseNumber", () => {
    expect(parseNumber("123")).toBe(123);
    expect(parseNumber("123.45")).toBe(123.45);
    expect(parseNumber("abc", 10)).toBe(10);
    expect(parseNumber(null, 5)).toBe(5);
  });

  it("toSafeInteger", () => {
    expect(toSafeInteger(3.2)).toBe(3);
    expect(toSafeInteger(Number.MAX_VALUE)).toBe(Number.MAX_SAFE_INTEGER);
    expect(toSafeInteger(-Number.MAX_VALUE)).toBe(Number.MIN_SAFE_INTEGER);
    expect(toSafeInteger("invalid")).toBe(0);
  });

  it("roundToNearest", () => {
    expect(roundToNearest(13, 5)).toBe(15);
    expect(roundToNearest(12, 5)).toBe(10);
    expect(roundToNearest(13, 0)).toBe(13);
  });

  it("toPercentage", () => {
    expect(toPercentage(0.15)).toBe("15%");
    expect(toPercentage(0.1555, 1)).toBe("15.6%");
  });

  describe("new numeric utilities", () => {
    it("clampNumber", () => {
      expect(clampNumber(10, 0, 5)).toBe(5);
      expect(clampNumber(-10, 0, 5)).toBe(0);
      expect(clampNumber(3, 0, 5)).toBe(3);
    });

    it("inRange", () => {
      expect(inRange(3, 1, 5)).toBe(true);
      expect(inRange(5, 1, 5)).toBe(true);
      expect(inRange(0, 1, 5)).toBe(false);
      expect(inRange(6, 1, 5)).toBe(false);
    });

    it("gcd", () => {
      expect(gcd(48, 18)).toBe(6);
      expect(gcd(54, 24)).toBe(6);
      expect(gcd(48, -18)).toBe(6);
      expect(gcd(0, 5)).toBe(5);
    });

    it("lcm", () => {
      expect(lcm(21, 6)).toBe(42);
      expect(lcm(4, 6)).toBe(12);
      expect(lcm(0, 5)).toBe(0);
    });

    it("isPrime", () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(29)).toBe(true);
      expect(isPrime(30)).toBe(false);
      expect(isPrime(1)).toBe(false);
      expect(isPrime(-5)).toBe(false);
      expect(isPrime(2.5)).toBe(false);
    });

    it("isPerfectSquare", () => {
      expect(isPerfectSquare(16)).toBe(true);
      expect(isPerfectSquare(25)).toBe(true);
      expect(isPerfectSquare(14)).toBe(false);
      expect(isPerfectSquare(-4)).toBe(false);
      expect(isPerfectSquare(2.5)).toBe(false);
      expect(isPerfectSquare(0)).toBe(true);
    });
  });
});
