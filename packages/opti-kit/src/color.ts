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
