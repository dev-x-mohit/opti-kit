/**
 * Converts a hex color string to an RGB object. Returns null if invalid.
 */
export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(
    shorthandRegex,
    (_, r, g, b) => r + r + g + g + b + b
  );
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts RGB integer components (0-255) to a Hex color string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clampColor = (c: number) => Math.min(255, Math.max(0, Math.round(c)));
  const toHex = (c: number) => {
    const hex = clampColor(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

/**
 * Converts HSL values (h: 0-360, s: 0-100, l: 0-100) to an RGB object.
 */
export function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  const sat = s / 100;
  const light = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n: number) => {
    return (
      light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    );
  };
  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
  };
}

/**
 * Converts RGB components (0-255) to HSL values (h: 0-360, s: 0-100, l: 0-100).
 */
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
        break;
      case gn:
        h = ((bn - rn) / d + 2) / 6;
        break;
      case bn:
        h = ((rn - gn) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts a hex color string to HSL values.
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * Converts HSL values to a hex color string.
 */
export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Lightens a hex color by a given amount (0 to 1).
 */
export function lighten(hex: string, amount: number): string {
  const hsl = hexToHsl(hex);
  if (!hsl) return hex;
  const newL = Math.min(100, hsl.l + hsl.l * amount);
  return hslToHex(hsl.h, hsl.s, Math.round(newL));
}

/**
 * Darkens a hex color by a given amount (0 to 1).
 */
export function darken(hex: string, amount: number): string {
  const hsl = hexToHsl(hex);
  if (!hsl) return hex;
  const newL = Math.max(0, hsl.l - hsl.l * amount);
  return hslToHex(hsl.h, hsl.s, Math.round(newL));
}

/**
 * Validates whether a string is a valid hex color (3 or 6 characters, with or without #).
 */
export function isValidHex(hex: string): boolean {
  return /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(hex);
}

/**
 * Calculates the WCAG contrast ratio between two hex colors.
 * Returns a ratio between 1 and 21. WCAG AA requires >= 4.5 for normal text.
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const luminance = (hex: string): number => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    const [rs, gs, bs] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}
