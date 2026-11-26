import { describe, it, expect } from 'vitest';
import {
  levenshteinDist, damerauLevenshtein, jaroWinkler, hammingDist, sorensenDice,
  soundexCode, metaphone, tokenizeWordsPro, tokenizeSentencesPro, wordFrequency,
  readingTimeMinutes, extractHashtagsPro, extractMentionsPro, extractUrls,
  extractEmails, maskEmail, maskPhone, maskCard, wrapTextPro, indentText,
  dedentText, stripAnsi, highlightMatch, slugifyUnicode, camelToTitle,
  truncateMiddlePro, pluralizeEn, singularizeEn,
} from '../text-pro';

describe('Text Pro', () => {
  it('computes string similarity and phonetic encodings', () => {
    expect(levenshteinDist('kitten', 'sitting')).toBe(3);
    expect(damerauLevenshtein('ca', 'ac')).toBe(1);
    expect(jaroWinkler('martha', 'marhta')).toBeGreaterThan(0.9);
    expect(hammingDist('karolin', 'kathrin')).toBe(3);
    expect(sorensenDice('night', 'nacht')).toBeGreaterThan(0);
    expect(soundexCode('Robert')).toBe('R163');
    expect(metaphone('knight').length).toBeGreaterThan(0);
  });

  it('extracts, masks, and formats text', () => {
    const sample = 'Hello @alice! Check #OptiKit at https://example.com or email bob@test.io. Great!';
    expect(tokenizeWordsPro('Hello world!')).toEqual(['Hello', 'world']);
    expect(tokenizeSentencesPro('One. Two!')).toEqual(['One.', 'Two!']);
    expect(wordFrequency('a b a')).toEqual({ a: 2, b: 1 });
    expect(readingTimeMinutes('word '.repeat(250), 200)).toBe(2);
    expect(extractHashtagsPro(sample)).toEqual(['#OptiKit']);
    expect(extractMentionsPro(sample)).toEqual(['@alice']);
    expect(extractUrls(sample)).toEqual(['https://example.com']);
    expect(extractEmails(sample)).toEqual(['bob@test.io']);
    expect(maskEmail('alice@example.com')).toBe('a***e@example.com');
    expect(maskPhone('+1-555-123-4567')).toBe('+*_***-***-4567'.replace('_', '-'));
    expect(maskCard('4111-1111-1111-1234')).toBe('****-****-****-1234');
    expect(wrapTextPro('one two three four', 7)).toBe('one two\nthree\nfour');
    expect(indentText('a\nb', 2)).toBe('  a\n  b');
    expect(dedentText('  a\n  b')).toBe('a\nb');
    expect(stripAnsi('\x1b[31mred\x1b[0m')).toBe('red');
    expect(highlightMatch('Hello World', 'world')).toBe('Hello <mark>World</mark>');
    expect(slugifyUnicode('Café Crème!')).toBe('cafe-creme');
    expect(camelToTitle('helloWorldTest')).toBe('Hello World Test');
    expect(truncateMiddlePro('abcdefghij', 7)).toBe('ab...ij');
    expect(pluralizeEn('city')).toBe('cities');
    expect(singularizeEn('cities')).toBe('city');
  });
});
