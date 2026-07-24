/**
 * Natural Language Processing Utilities
 */

export function tokenizeWords(text: string): string[] {
  return text.toLowerCase().match(/\b\w+\b/g) || [];
}

export function tokenizeSentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) || [text.trim()];
}

const DEFAULT_STOP_WORDS = new Set(['the', 'is', 'in', 'and', 'to', 'of', 'it', 'that', 'on', 'for', 'with', 'as']);

export function removeStopWords(words: string[], stopWords = DEFAULT_STOP_WORDS): string[] {
  return words.filter((w) => !stopWords.has(w.toLowerCase()));
}

export function generateNGrams(words: string[], n: number): string[][] {
  const nGrams: string[][] = [];
  for (let i = 0; i <= words.length - n; i++) {
    nGrams.push(words.slice(i, i + n));
  }
  return nGrams;
}

export function nlpLevenshteinDistance(a: string, b: string): number {
  const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + indicator
      );
    }
  }
  return matrix[a.length][b.length];
}

export function hammingDistance(a: string, b: string): number {
  if (a.length !== b.length) throw new Error('Strings must be of equal length');
  let dist = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) dist++;
  }
  return dist;
}

export function jaccardSimilarity(a: string[], b: string[]): number {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

export function soundex(word: string): string {
  if (!word) return '';
  const map: Record<string, string> = {
    b: '1', f: '1', p: '1', v: '1',
    c: '2', g: '2', j: '2', k: '2', q: '2', s: '2', x: '2', z: '2',
    d: '3', t: '3',
    l: '4',
    m: '5', n: '5',
    r: '6',
  };
  const chars = word.toLowerCase().split('');
  let res = chars[0].toUpperCase();
  for (let i = 1; i < chars.length && res.length < 4; i++) {
    const c = chars[i];
    const code = map[c];
    if (code && code !== res[res.length - 1] && code !== map[chars[i - 1]]) {
      res += code;
    }
  }
  return res.padEnd(4, '0');
}

export function extractHashtags(text: string): string[] {
  return text.match(/#[a-z0-9_]+/gi) || [];
}

export function extractMentions(text: string): string[] {
  return text.match(/@[a-z0-9_]+/gi) || [];
}
