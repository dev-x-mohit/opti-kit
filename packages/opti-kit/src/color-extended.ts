/**
 * Extended Color Utilities
 */

function hexToRgb(hex: string) {
  const match = hex.replace(/^#/, '').match(/.{2}/g);
  return match ? [parseInt(match[0], 16), parseInt(match[1], 16), parseInt(match[2], 16)] : [0, 0, 0];
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(x => Math.round(Math.min(255, Math.max(0, x))).toString(16).padStart(2, '0')).join('');
}

export function lightenHexColor(hex: string, percent: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r + (255 - r) * (percent / 100), g + (255 - g) * (percent / 100), b + (255 - b) * (percent / 100));
}

export function darkenHexColor(hex: string, percent: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * (1 - percent / 100), g * (1 - percent / 100), b * (1 - percent / 100));
}

export function mixHexColors(hex1: string, hex2: string, weight = 0.5): string {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const w = Math.min(1, Math.max(0, weight));
  return rgbToHex(r1 * (1 - w) + r2 * w, g1 * (1 - w) + g2 * w, b1 * (1 - w) + b2 * w);
}

function getLuminance(r: number, g: number, b: number): number {
  const [R, G, B] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function getHexContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(...hexToRgb(hex1) as [number, number, number]);
  const l2 = getLuminance(...hexToRgb(hex2) as [number, number, number]);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function isHexAccessible(hex1: string, hex2: string, level: 'AA' | 'AAA' = 'AA'): boolean {
  const ratio = getHexContrastRatio(hex1, hex2);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;
  h /= 360;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [r * 255, g * 255, b * 255];
}

export function generateHexComplementary(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return rgbToHex(...hslToRgb((h + 180) % 360, s, l) as [number, number, number]);
}

export function generateHexAnalogous(hex: string): [string, string, string] {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return [
    rgbToHex(...hslToRgb((h - 30 + 360) % 360, s, l) as [number, number, number]),
    hex,
    rgbToHex(...hslToRgb((h + 30) % 360, s, l) as [number, number, number])
  ];
}

export function saturateHexColor(hex: string, percent: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return rgbToHex(...hslToRgb(h, Math.min(1, s + (percent / 100)), l) as [number, number, number]);
}

export function desaturateHexColor(hex: string, percent: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return rgbToHex(...hslToRgb(h, Math.max(0, s - (percent / 100)), l) as [number, number, number]);
}
