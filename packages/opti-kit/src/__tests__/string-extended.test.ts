import { describe, it, expect } from 'vitest';
import { reverseString, isStringPalindrome, toSnakeCase } from '../string-extended';

describe('String extended utilities', () => {
  it('should reverse and test palindrome', () => {
    expect(reverseString('hello')).toBe('olleh');
    expect(isStringPalindrome('racecar')).toBe(true);
    expect(toSnakeCase('helloWorld')).toBe('hello_world');
  });
});
