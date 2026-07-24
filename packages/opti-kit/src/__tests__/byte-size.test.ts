import { describe, it, expect } from 'vitest';
import { formatByteSize, parseBytes } from '../byte-size';

describe('Byte Size utilities', () => {
  it('should format/parse', () => {
    expect(formatByteSize(1024)).toBe('1 KB');
    expect(parseBytes('1 KB')).toBe(1024);
  });
});
