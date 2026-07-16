import { describe, it, expect } from "vitest";
import { formatCurrency, formatBytes } from "../number";

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
});
