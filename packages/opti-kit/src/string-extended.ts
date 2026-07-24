/**
 * Reverses a string.
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Checks if a string is a palindrome.
 */
export function isStringPalindrome(str: string): boolean {
  const cleanStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  return cleanStr === reverseString(cleanStr);
}

/**
 * Checks if two strings are anagrams of each other.
 */
export function isAnagram(str1: string, str2: string): boolean {
  const clean1 = str1.replace(/[^A-Za-z0-9]/g, '').toLowerCase().split('').sort().join('');
  const clean2 = str2.replace(/[^A-Za-z0-9]/g, '').toLowerCase().split('').sort().join('');
  return clean1 === clean2;
}

/**
 * Counts the number of words in a string.
 */
export function countWords(str: string): number {
  const matches = str.match(/\b\w+\b/g);
  return matches ? matches.length : 0;
}

/**
 * Counts the number of lines in a string.
 */
export function countLines(str: string): number {
  if (str === '') return 0;
  return str.split(/\r\n|\r|\n/).length;
}

/**
 * Masks characters in a string, leaving a specified number of characters unmasked.
 */
export function maskText(str: string, maskChar = '*', unmaskedLength = 4, fromEnd = true): string {
  if (str.length <= unmaskedLength) return str;
  const maskLength = str.length - unmaskedLength;
  const maskStr = maskChar.repeat(maskLength);
  
  if (fromEnd) {
    return maskStr + str.slice(-unmaskedLength);
  }
  return str.slice(0, unmaskedLength) + maskStr;
}

/**
 * Pads a string on both sides to a specified length.
 */
export function padCenter(str: string, length: number, padChar = ' '): string {
  if (str.length >= length) return str;
  const padLeft = Math.floor((length - str.length) / 2);
  const padRight = length - str.length - padLeft;
  return padChar.repeat(padLeft) + str + padChar.repeat(padRight);
}

/**
 * Wraps text to a specified width.
 */
export function wrapText(str: string, width: number): string {
  const words = str.split(' ');
  let line = '';
  let result = '';
  
  for (let i = 0; i < words.length; i++) {
    if (line.length + words[i].length + 1 > width) {
      result += line.trim() + '\n';
      line = '';
    }
    line += words[i] + ' ';
  }
  result += line.trim();
  return result;
}

/**
 * Converts a string to snake_case.
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    .replace(/[-\s]+/g, '_')
    .replace(/^_/, '');
}

/**
 * Converts a string to kebab-case.
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
    .replace(/[_ \s]+/g, '-')
    .replace(/^-/, '');
}
