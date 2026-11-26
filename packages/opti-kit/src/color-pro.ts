/**
 * OptiKit Color Pro — Perceptual color science (OKLab, OKLCH, XYZ, CIELAB, DeltaE 76/2000),
 * WCAG 2.1 & APCA contrast, tonal palettes, harmonies, and CVD simulation.
 */

export interface RgbColor {
  r: number; // 0..255
  g: number; // 0..255
  b: number; // 0..255
}

export interface OkLabColor {
  L: number;
  a: number;
  b: number;
}

export interface OkLchColor {
  L: number;
  C: number;
  h: number;
}

export interface LabColor {
  L: number;
  a: number;
  b: number;
}

const srgbToLinear = (c: number) => {
  const x = c / 255;
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
};

const linearToSrgb = (c: number) => {
  const clamped = Math.min(1, Math.max(0, c));
  const v = clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.round(v * 255);
};

/** Converts sRGB (`0..255`) to perceptual OKLab. */
export function rgbToOklab({ r, g, b }: RgbColor): OkLabColor {
  const lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

/** Converts OKLab back to sRGB (`0..255`). */
export function oklabToRgb({ L, a, b }: OkLabColor): RgbColor {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  return {
    r: linearToSrgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  };
}

/** Converts OKLab to cylindrical OKLCH. */
export function oklabToOklch({ L, a, b }: OkLabColor): OkLchColor {
  const C = Math.hypot(a, b);
  const h = ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
  return { L, C, h: C < 1e-6 ? 0 : h };
}

/** Converts cylindrical OKLCH to OKLab. */
export function oklchToOklab({ L, C, h }: OkLchColor): OkLabColor {
  const rad = (h * Math.PI) / 180;
  return { L, a: C * Math.cos(rad), b: C * Math.sin(rad) };
}

/** Converts sRGB to CIE XYZ (D65). */
export function rgbToXyz({ r, g, b }: RgbColor): { x: number; y: number; z: number } {
  const lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
  return {
    x: 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb,
    y: 0.2126729 * lr + 0.7151522 * lg + 0.072175 * lb,
    z: 0.0193339 * lr + 0.119192 * lg + 0.9503041 * lb,
  };
}

/** Converts CIE XYZ (D65) to CIELAB. */
export function xyzToLab({ x, y, z }: { x: number; y: number; z: number }): LabColor {
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(x / 0.95047), fy = f(y / 1.0), fz = f(z / 1.08883);
  return { L: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}

/** Converts CIELAB (D65) back to sRGB. */
export function labToRgb({ L, a, b }: LabColor): RgbColor {
  const fy = (L + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;
  const inv = (t: number) => (t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787);
  const x = inv(fx) * 0.95047;
  const y = inv(fy) * 1.0;
  const z = inv(fz) * 1.08883;
  return {
    r: linearToSrgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z),
    g: linearToSrgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z),
    b: linearToSrgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
  };
}

/** Computes CIE76 Euclidean color difference (`Delta E`). */
export function deltaE76(c1: LabColor, c2: LabColor): number {
  return Math.hypot(c1.L - c2.L, c1.a - c2.a, c1.b - c2.b);
}

/** Computes CIEDE2000 perceptual color difference. */
export function deltaE2000(c1: LabColor, c2: LabColor): number {
  const avgL = (c1.L + c2.L) / 2;
  const C1 = Math.hypot(c1.a, c1.b);
  const C2 = Math.hypot(c2.a, c2.b);
  const avgC = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(avgC ** 7 / (avgC ** 7 + 25 ** 7)));
  const a1p = c1.a * (1 + G);
  const a2p = c2.a * (1 + G);
  const C1p = Math.hypot(a1p, c1.b);
  const C2p = Math.hypot(a2p, c2.b);
  const avgCp = (C1p + C2p) / 2;
  const h1p = ((Math.atan2(c1.b, a1p) * 180) / Math.PI + 360) % 360;
  const h2p = ((Math.atan2(c2.b, a2p) * 180) / Math.PI + 360) % 360;
  let dhp = h2p - h1p;
  if (Math.abs(dhp) > 180) dhp += dhp > 0 ? -360 : 360;
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * Math.PI) / 360);
  const dLp = c2.L - c1.L;
  const dCp = C2p - C1p;
  let avgHp = h1p + h2p;
  if (Math.abs(h1p - h2p) > 180) avgHp += avgHp < 360 ? 360 : -360;
  avgHp /= 2;
  const T =
    1 -
    0.17 * Math.cos(((avgHp - 30) * Math.PI) / 180) +
    0.24 * Math.cos(((2 * avgHp) * Math.PI) / 180) +
    0.32 * Math.cos(((3 * avgHp + 6) * Math.PI) / 180) -
    0.2 * Math.cos(((4 * avgHp - 63) * Math.PI) / 180);
  const SL = 1 + (0.015 * (avgL - 50) ** 2) / Math.sqrt(20 + (avgL - 50) ** 2);
  const SC = 1 + 0.045 * avgCp;
  const SH = 1 + 0.015 * avgCp * T;
  const dTheta = 30 * Math.exp(-(((avgHp - 275) / 25) ** 2));
  const RC = 2 * Math.sqrt(avgCp ** 7 / (avgCp ** 7 + 25 ** 7));
  const RT = -RC * Math.sin((2 * dTheta * Math.PI) / 180);
  return Math.sqrt(
    (dLp / SL) ** 2 + (dCp / SC) ** 2 + (dHp / SH) ** 2 + RT * (dCp / SC) * (dHp / SH)
  );
}

const relLuminance = ({ r, g, b }: RgbColor) =>
  0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);

/** Computes WCAG 2.1 relative contrast ratio (`1..21`). */
export function wcagContrastRatio(fg: RgbColor, bg: RgbColor): number {
  const l1 = relLuminance(fg);
  const l2 = relLuminance(bg);
  const [bright, dark] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (bright + 0.05) / (dark + 0.05);
}

/** Checks if foreground/background meet WCAG AA (`4.5:1` normal, `3:1` large text). */
export function wcagMeetsAA(fg: RgbColor, bg: RgbColor, largeText = false): boolean {
  return wcagContrastRatio(fg, bg) >= (largeText ? 3 : 4.5);
}

/** Checks if foreground/background meet WCAG AAA (`7:1` normal, `4.5:1` large text). */
export function wcagMeetsAAA(fg: RgbColor, bg: RgbColor, largeText = false): boolean {
  return wcagContrastRatio(fg, bg) >= (largeText ? 4.5 : 7);
}

/** Computes simplified APCA perceptual lightness contrast (`Lc`, roughly `-108..106`). */
export function apcaContrast(textRgb: RgbColor, bgRgb: RgbColor): number {
  const yTxt = relLuminance(textRgb);
  const yBg = relLuminance(bgRgb);
  if (Math.abs(yBg - yTxt) < 0.0005) return 0;
  if (yBg > yTxt) {
    return (Math.pow(yBg, 0.56) - Math.pow(yTxt, 0.57)) * 1.14 * 100;
  }
  return (Math.pow(yBg, 0.65) - Math.pow(yTxt, 0.62)) * 1.14 * 100;
}

/** Generates a perceptual tonal scale of `steps` lightness shades in OKLCH. */
export function generateTonalScale(base: RgbColor, steps = 9): RgbColor[] {
  const lch = oklabToOklch(rgbToOklab(base));
  const out: RgbColor[] = [];
  for (let i = 0; i < steps; i++) {
    const L = 0.95 - (i / Math.max(1, steps - 1)) * 0.75;
    out.push(oklabToRgb(oklchToOklab({ L, C: lch.C * 0.9, h: lch.h })));
  }
  return out;
}

const rotateHue = (base: RgbColor, deg: number): RgbColor => {
  const lch = oklabToOklch(rgbToOklab(base));
  return oklabToRgb(oklchToOklab({ ...lch, h: (lch.h + deg + 360) % 360 }));
};

/** Generates a complementary color (180° hue shift in OKLCH). */
export function generateComplementary(base: RgbColor): RgbColor {
  return rotateHue(base, 180);
}

/** Generates a triadic color harmony (0°, +120°, +240°). */
export function generateTriadic(base: RgbColor): [RgbColor, RgbColor, RgbColor] {
  return [base, rotateHue(base, 120), rotateHue(base, 240)];
}

/** Generates an analogous color harmony (-30°, 0°, +30°). */
export function generateAnalogous(base: RgbColor): [RgbColor, RgbColor, RgbColor] {
  return [rotateHue(base, -30), base, rotateHue(base, 30)];
}

/** Generates a split-complementary color harmony (0°, +150°, +210°). */
export function generateSplitComplementary(base: RgbColor): [RgbColor, RgbColor, RgbColor] {
  return [base, rotateHue(base, 150), rotateHue(base, 210)];
}

/** Perceptually mixes two sRGB colors in OKLab space at ratio `t` (`0..1`). */
export function mixColorsOklab(c1: RgbColor, c2: RgbColor, t = 0.5): RgbColor {
  const a = rgbToOklab(c1);
  const b = rgbToOklab(c2);
  return oklabToRgb({
    L: a.L + (b.L - a.L) * t,
    a: a.a + (b.a - a.a) * t,
    b: a.b + (b.b - a.b) * t,
  });
}

function applyColorMatrix(c: RgbColor, m: readonly number[]): RgbColor {
  const clamp = (v: number) => Math.min(255, Math.max(0, Math.round(v)));
  return {
    r: clamp(c.r * m[0] + c.g * m[1] + c.b * m[2]),
    g: clamp(c.r * m[3] + c.g * m[4] + c.b * m[5]),
    b: clamp(c.r * m[6] + c.g * m[7] + c.b * m[8]),
  };
}

/** Simulates Protanopia (red-blind) color vision deficiency. */
export function simulateProtanopia(c: RgbColor): RgbColor {
  return applyColorMatrix(c, [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758]);
}

/** Simulates Deuteranopia (green-blind) color vision deficiency. */
export function simulateDeuteranopia(c: RgbColor): RgbColor {
  return applyColorMatrix(c, [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7]);
}

/** Simulates Tritanopia (blue-blind) color vision deficiency. */
export function simulateTritanopia(c: RgbColor): RgbColor {
  return applyColorMatrix(c, [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525]);
}

/** Checks whether a color is perceptually light (`luminance > 0.179`). */
export function isLightColor(c: RgbColor): boolean {
  return relLuminance(c) > 0.179;
}

/** Returns `#000000` or `#ffffff` whichever achieves higher WCAG contrast on `bg`. */
export function bestTextColor(bg: RgbColor): '#000000' | '#ffffff' {
  return isLightColor(bg) ? '#000000' : '#ffffff';
}
