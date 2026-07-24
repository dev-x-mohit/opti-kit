import { describe, it, expect } from 'vitest';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToHsv, hsvToRgb, luminance, contrast, isDark } from '../color-space';

describe('color space utilities', () => {
  it('hexToRgb and rgbToHex', () => {
    const rgb = hexToRgb('#ff0000');
    expect(rgb).toEqual({ r: 255, g: 0, b: 0, a: undefined });
    expect(rgbToHex(rgb!)).toBe('#ff0000');
  });

  it('rgbToHsl and hslToRgb', () => {
    const rgb = { r: 255, g: 0, b: 0 };
    const hsl = rgbToHsl(rgb);
    expect(hsl).toEqual({ h: 0, s: 100, l: 50, a: undefined });
    expect(hslToRgb(hsl)).toEqual(rgb);
  });

  it('rgbToHsv and hsvToRgb', () => {
    const rgb = { r: 255, g: 0, b: 0 };
    const hsv = rgbToHsv(rgb);
    expect(hsv).toEqual({ h: 0, s: 100, v: 100, a: undefined });
    expect(hsvToRgb(hsv)).toEqual(rgb);
  });

  it('luminance', () => {
    expect(luminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0);
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1);
  });

  it('contrast', () => {
    const c = contrast({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    expect(c).toBe(21);
  });

  it('isDark', () => {
    expect(isDark({ r: 0, g: 0, b: 0 })).toBe(true);
    expect(isDark({ r: 255, g: 255, b: 255 })).toBe(false);
  });
});
