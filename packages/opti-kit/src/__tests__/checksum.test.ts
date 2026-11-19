import { describe, it, expect } from 'vitest';
import {
  fastCrc32,
  crc32Hex,
  adler32,
  adler32Hex,
  fnv1a32,
  fnv1a32Hex,
  fnv1a64,
  murmur3
} from '../checksum';
import { djb2, sdbm } from '../hash';

describe('Checksum and Hash Algorithms', () => {
  it('should compute IEEE 802.3 CRC32 correctly', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const sum = fastCrc32(text);
    expect(sum).toBe(1095738169);
    expect(crc32Hex(text)).toBe('414fa339');

    // Consistent with empty string
    expect(fastCrc32('')).toBe(0);
  });

  it('should compute Adler-32 correctly', () => {
    const text = 'Wikipedia';
    const sum = adler32(text);
    expect(sum).toBe(300286872);
    expect(adler32Hex(text)).toBe('11e60398');
  });

  it('should compute FNV-1a 32-bit and 64-bit hashes', () => {
    const text = 'hello world';
    const f32 = fnv1a32(text);
    expect(f32).toBe(3582672807);
    expect(fnv1a32Hex(text)).toBe('d58b3fa7');

    const f64 = fnv1a64(text);
    expect(typeof f64).toBe('string');
    expect(f64.length).toBe(16);
  });

  it('should compute DJB2, SDBM, and Murmur3 hashes', () => {
    const str = 'opti-kit-zero-deps';
    const d = djb2(str);
    const s = sdbm(str);
    const m = murmur3(str, 12345);

    expect(typeof d).toBe('number');
    expect(typeof s).toBe('number');
    expect(typeof m).toBe('number');
    expect(d).toBeGreaterThan(0);
    expect(s).toBeGreaterThan(0);
  });
});
