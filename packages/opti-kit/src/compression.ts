/**
 * OptiKit Compression — Zero-dependency client-side and isomorphic data compression.
 * Includes LZW dictionary compression, Run-Length Encoding (RLE), and Delta encoding for numbers.
 */

/**
 * Compresses a text string using the Lempel-Ziv-Welch (LZW) algorithm.
 *
 * @example
 * ```ts
 * const compressed = compressLZW('TOBEORNOTTOBEORTOBEORNOT');
 * ```
 */
export function compressLZW(uncompressed: string): number[] {
  if (!uncompressed) return [];

  const dictionary = new Map<string, number>();
  for (let i = 0; i < 256; i++) {
    dictionary.set(String.fromCharCode(i), i);
  }

  let w = '';
  const result: number[] = [];
  let dictSize = 256;

  for (let i = 0; i < uncompressed.length; i++) {
    const c = uncompressed.charAt(i);
    const wc = w + c;
    if (dictionary.has(wc)) {
      w = wc;
    } else {
      result.push(dictionary.get(w)!);
      dictionary.set(wc, dictSize++);
      w = String(c);
    }
  }

  if (w !== '') {
    result.push(dictionary.get(w)!);
  }

  return result;
}

/**
 * Decompresses an LZW integer code array back into the original string.
 *
 * @example
 * ```ts
 * const text = decompressLZW(compressed);
 * ```
 */
export function decompressLZW(compressed: readonly number[]): string {
  if (compressed.length === 0) return '';

  const dictionary = new Map<number, string>();
  for (let i = 0; i < 256; i++) {
    dictionary.set(i, String.fromCharCode(i));
  }

  let w = String.fromCharCode(compressed[0]);
  let result = w;
  let dictSize = 256;

  for (let i = 1; i < compressed.length; i++) {
    const k = compressed[i];
    let entry = '';

    if (dictionary.has(k)) {
      entry = dictionary.get(k)!;
    } else if (k === dictSize) {
      entry = w + w.charAt(0);
    } else {
      throw new Error(`Invalid LZW compressed stream at code ${k}`);
    }

    result += entry;
    dictionary.set(dictSize++, w + entry.charAt(0));
    w = entry;
  }

  return result;
}

/**
 * Run-Length Encoding (RLE) string compression.
 * Compresses runs of identical consecutive characters into count + character (e.g., 'AAAAABBB' -> '5A3B').
 */
export function compressRLE(input: string): string {
  if (!input) return '';

  let compressed = '';
  let count = 1;

  for (let i = 0; i < input.length; i++) {
    if (i + 1 < input.length && input[i] === input[i + 1]) {
      count++;
    } else {
      compressed += (count > 1 ? String(count) : '') + input[i];
      count = 1;
    }
  }

  return compressed;
}

/**
 * Delta encoding for numeric series. Converts absolute values to relative differences.
 * Highly effective for compressing timestamps, monotonic IDs, and sensor data.
 *
 * @example
 * ```ts
 * deltaEncode([100, 102, 105, 110]);
 * // → [100, 2, 3, 5]
 * ```
 */
export function deltaEncode(numbers: readonly number[]): number[] {
  if (numbers.length === 0) return [];
  const result: number[] = [numbers[0]];
  for (let i = 1; i < numbers.length; i++) {
    result.push(numbers[i] - numbers[i - 1]);
  }
  return result;
}

/**
 * Restores original numeric series from delta-encoded differences.
 *
 * @example
 * ```ts
 * deltaDecode([100, 2, 3, 5]);
 * // → [100, 102, 105, 110]
 * ```
 */
export function deltaDecode(deltas: readonly number[]): number[] {
  if (deltas.length === 0) return [];
  const result: number[] = [deltas[0]];
  for (let i = 1; i < deltas.length; i++) {
    result.push(result[i - 1] + deltas[i]);
  }
  return result;
}
