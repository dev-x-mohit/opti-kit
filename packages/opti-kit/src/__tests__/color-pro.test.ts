import { describe, it, expect } from 'vitest';
import {
  rgbToOklab, oklabToRgb, oklabToOklch, oklchToOklab, rgbToXyz, xyzToLab, labToRgb,
  deltaE76, deltaE2000, wcagContrastRatio, wcagMeetsAA, wcagMeetsAAA, apcaContrast,
  generateTonalScale, generateComplementary, generateTriadic, generateAnalogous,
  generateSplitComplementary, mixColorsOklab, simulateProtanopia,
  simulateDeuteranopia, simulateTritanopia, isLightColor, bestTextColor,
} from '../color-pro';

describe('Color Pro', () => {
  it('converts between sRGB, OKLab, OKLCH, XYZ, and CIELAB', () => {
    const red = { r: 220, g: 50, b: 50 };
    const oklab = rgbToOklab(red);
    const back = oklabToRgb(oklab);
    expect(Math.abs(back.r - red.r)).toBeLessThanOrEqual(2);
    expect(Math.abs(back.g - red.g)).toBeLessThanOrEqual(2);

    const lch = oklabToOklch(oklab);
    expect(oklchToOklab(lch).L).toBeCloseTo(oklab.L, 5);

    const lab = xyzToLab(rgbToXyz(red));
    const labBack = labToRgb(lab);
    expect(Math.abs(labBack.r - red.r)).toBeLessThanOrEqual(2);
    expect(deltaE76(lab, lab)).toBe(0);
    expect(deltaE2000(lab, { L: lab.L + 10, a: lab.a, b: lab.b })).toBeGreaterThan(5);
  });

  it('computes contrast, harmonies, mixing, and CVD simulation', () => {
    const black = { r: 0, g: 0, b: 0 };
    const white = { r: 255, g: 255, b: 255 };
    expect(wcagContrastRatio(black, white)).toBeCloseTo(21, 1);
    expect(wcagMeetsAA(black, white)).toBe(true);
    expect(wcagMeetsAAA(black, white)).toBe(true);
    expect(apcaContrast(black, white)).toBeGreaterThan(90);
    expect(isLightColor(white)).toBe(true);
    expect(bestTextColor(black)).toBe('#ffffff');
    expect(bestTextColor(white)).toBe('#000000');

    const blue = { r: 59, g: 130, b: 246 };
    expect(generateTonalScale(blue, 5).length).toBe(5);
    expect(generateComplementary(blue)).toBeDefined();
    expect(generateTriadic(blue).length).toBe(3);
    expect(generateAnalogous(blue).length).toBe(3);
    expect(generateSplitComplementary(blue).length).toBe(3);
    expect(mixColorsOklab(black, white, 0.5).r).toBeGreaterThan(80);
    expect(simulateProtanopia(blue)).toBeDefined();
    expect(simulateDeuteranopia(blue)).toBeDefined();
    expect(simulateTritanopia(blue)).toBeDefined();
  });
});
