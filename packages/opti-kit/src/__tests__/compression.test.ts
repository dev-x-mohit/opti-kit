import { describe, it, expect } from 'vitest';
import {
  compressLZW,
  decompressLZW,
  compressRLE,
  deltaEncode,
  deltaDecode
} from '../compression';

describe('Data Compression Utilities', () => {
  it('should compress and decompress text with LZW', () => {
    const original = 'TOBEORNOTTOBEORTOBEORNOT';
    const compressed = compressLZW(original);

    expect(Array.isArray(compressed)).toBe(true);
    expect(compressed.length).toBeLessThan(original.length);

    const decompressed = decompressLZW(compressed);
    expect(decompressed).toBe(original);
  });

  it('should compress repetitive sequences with Run-Length Encoding (RLE)', () => {
    const raw = 'AAAAABBBCCDAAAAA';
    const rle = compressRLE(raw);
    expect(rle).toBe('5A3B2CD5A');
  });

  it('should delta-encode and decode numeric series', () => {
    const series = [1000, 1005, 1012, 1020, 1021];
    const encoded = deltaEncode(series);

    expect(encoded).toEqual([1000, 5, 7, 8, 1]);

    const decoded = deltaDecode(encoded);
    expect(decoded).toEqual(series);
  });
});
