import { describe, it, expect } from "vitest";
import {
  hexToRgb, rgbToHex, hslToRgb,
  rgbToHsl, hexToHsl, hslToHex,
  lighten, darken, isValidHex, getContrastRatio
} from "../color";

describe("color", () => {
  it("hexToRgb", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("#000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("invalid")).toBeNull();
  });

  it("rgbToHex", () => {
    expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
  });

  it("hslToRgb", () => {
    const rgb = hslToRgb(0, 100, 50);
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });

  it("rgbToHsl", () => {
    const hsl = rgbToHsl(255, 0, 0);
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(100);
    expect(hsl.l).toBe(50);
  });

  it("rgbToHsl handles achromatic (gray)", () => {
    const hsl = rgbToHsl(128, 128, 128);
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(0);
    expect(hsl.l).toBe(50);
  });

  it("hexToHsl", () => {
    const hsl = hexToHsl("#ff0000");
    expect(hsl).toEqual({ h: 0, s: 100, l: 50 });
    expect(hexToHsl("invalid")).toBeNull();
  });

  it("hslToHex", () => {
    expect(hslToHex(0, 100, 50)).toBe("#ff0000");
    expect(hslToHex(0, 0, 0)).toBe("#000000");
  });

  it("lighten", () => {
    const lighter = lighten("#333333", 0.5);
    expect(lighter).not.toBe("#333333");
    expect(lighten("invalid", 0.5)).toBe("invalid");
  });

  it("darken", () => {
    const darker = darken("#cccccc", 0.5);
    expect(darker).not.toBe("#cccccc");
    expect(darken("invalid", 0.5)).toBe("invalid");
  });

  it("isValidHex", () => {
    expect(isValidHex("#ff0000")).toBe(true);
    expect(isValidHex("#fff")).toBe(true);
    expect(isValidHex("ff0000")).toBe(true);
    expect(isValidHex("#gggggg")).toBe(false);
    expect(isValidHex("not-a-color")).toBe(false);
  });

  it("getContrastRatio", () => {
    // Black vs White should be max contrast (21:1)
    expect(getContrastRatio("#000000", "#ffffff")).toBe(21);
    // Same color should be 1:1
    expect(getContrastRatio("#ff0000", "#ff0000")).toBe(1);
    // Should return a number > 1 for different colors
    expect(getContrastRatio("#333333", "#ffffff")).toBeGreaterThan(4);
  });
});
