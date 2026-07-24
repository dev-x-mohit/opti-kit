/**
 * Image Processing Primitives (for pixel arrays [r,g,b,a,...])
 */

export function applyBrightness(pixels: number[], amount: number): number[] {
  const result = new Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    result[i] = Math.min(255, Math.max(0, pixels[i] + amount));
    result[i + 1] = Math.min(255, Math.max(0, pixels[i + 1] + amount));
    result[i + 2] = Math.min(255, Math.max(0, pixels[i + 2] + amount));
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function applyContrast(pixels: number[], amount: number): number[] {
  const result = new Array(pixels.length);
  const factor = (259 * (amount + 255)) / (255 * (259 - amount));
  for (let i = 0; i < pixels.length; i += 4) {
    result[i] = Math.min(255, Math.max(0, factor * (pixels[i] - 128) + 128));
    result[i + 1] = Math.min(255, Math.max(0, factor * (pixels[i + 1] - 128) + 128));
    result[i + 2] = Math.min(255, Math.max(0, factor * (pixels[i + 2] - 128) + 128));
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function applyGrayscale(pixels: number[]): number[] {
  const result = new Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const avg = 0.3 * pixels[i] + 0.59 * pixels[i + 1] + 0.11 * pixels[i + 2];
    result[i] = avg;
    result[i + 1] = avg;
    result[i + 2] = avg;
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function applyInvert(pixels: number[]): number[] {
  const result = new Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    result[i] = 255 - pixels[i];
    result[i + 1] = 255 - pixels[i + 1];
    result[i + 2] = 255 - pixels[i + 2];
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function applySepia(pixels: number[]): number[] {
  const result = new Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    result[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
    result[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
    result[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function applyThreshold(pixels: number[], threshold: number): number[] {
  const result = new Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const avg = 0.3 * pixels[i] + 0.59 * pixels[i + 1] + 0.11 * pixels[i + 2];
    const v = avg >= threshold ? 255 : 0;
    result[i] = v;
    result[i + 1] = v;
    result[i + 2] = v;
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function convolve2D(matrix: number[][], kernel: number[][]): number[][] {
  const kw = kernel[0].length, kh = kernel.length;
  const mw = matrix[0].length, mh = matrix.length;
  const result = Array(mh).fill(null).map(() => Array(mw).fill(0));
  
  const padH = Math.floor(kh / 2);
  const padW = Math.floor(kw / 2);

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      let sum = 0;
      for (let ky = 0; ky < kh; ky++) {
        for (let kx = 0; kx < kw; kx++) {
          const my = y + ky - padH;
          const mx = x + kx - padW;
          if (my >= 0 && my < mh && mx >= 0 && mx < mw) {
            sum += matrix[my][mx] * kernel[ky][kx];
          }
        }
      }
      result[y][x] = sum;
    }
  }
  return result;
}

export function rgbToHexArray(pixels: number[]): string[] {
  const hex: string[] = [];
  for (let i = 0; i < pixels.length; i += 4) {
    hex.push('#' + [pixels[i], pixels[i+1], pixels[i+2]].map(x => {
      const h = Math.round(x).toString(16);
      return h.length === 1 ? '0' + h : h;
    }).join(''));
  }
  return hex;
}
