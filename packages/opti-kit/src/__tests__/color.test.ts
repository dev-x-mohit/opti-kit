import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, hslToRgb } from "../color";

describe("color utilities", () => {
  it("hexToRgb", () => {
    expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("invalid")).toBeNull();
  });

  it("rgbToHex", () => {
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
    expect(rgbToHex(0, 0, 0)).toBe("#000000"); // 6-digit hex format
    expect(rgbToHex(256, -10, 100)).toBe("#ff0064"); // tests clamping logic
  });

  it("hslToRgb", () => {
    expect(hslToRgb(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
    expect(hslToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
    expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
  });
});
