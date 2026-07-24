import { describe, it, expect } from 'vitest';
import { tokenizeWords, hammingDistance } from '../nlp';

describe('NLP utilities', () => {
  it('should tokenize', () => {
    expect(tokenizeWords('Hello world')).toEqual(['hello', 'world']);
  });
  it('should compute hamming distance', () => {
    expect(hammingDistance('karolin', 'kathrin')).toBe(3);
  });
});
