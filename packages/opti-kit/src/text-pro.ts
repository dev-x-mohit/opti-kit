/**
 * OptiKit Text Pro — String similarity metrics (Levenshtein, Damerau-Levenshtein,
 * Jaro-Winkler, Sorensen-Dice), phonetic codes, tokenization, PII masking, and formatting.
 */

/** Computes exact Levenshtein edit distance between two strings. */
export function levenshteinDist(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

/** Computes Optimal String Alignment (Damerau-Levenshtein) distance with transpositions. */
export function damerauLevenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
      }
    }
  }
  return dp[m][n];
}

/** Computes Jaro-Winkler similarity in `[0, 1]`. */
export function jaroWinkler(s1: string, s2: string): number {
  if (s1 === s2) return 1;
  const len1 = s1.length, len2 = s2.length;
  if (len1 === 0 || len2 === 0) return 0;
  const matchWindow = Math.max(0, Math.floor(Math.max(len1, len2) / 2) - 1);
  const m1 = new Array<boolean>(len1).fill(false);
  const m2 = new Array<boolean>(len2).fill(false);
  let matches = 0;
  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, len2);
    for (let j = start; j < end; j++) {
      if (!m2[j] && s1[i] === s2[j]) {
        m1[i] = true;
        m2[j] = true;
        matches++;
        break;
      }
    }
  }
  if (matches === 0) return 0;
  let transpositions = 0;
  let k = 0;
  for (let i = 0; i < len1; i++) {
    if (!m1[i]) continue;
    while (!m2[k]) k++;
    if (s1[i] !== s2[k]) transpositions++;
    k++;
  }
  const jaro = (matches / len1 + matches / len2 + (matches - transpositions / 2) / matches) / 3;
  let prefix = 0;
  for (let i = 0; i < Math.min(4, len1, len2); i++) {
    if (s1[i] === s2[i]) prefix++;
    else break;
  }
  return jaro + prefix * 0.1 * (1 - jaro);
}

/** Computes Hamming distance between two equal-length strings. */
export function hammingDist(a: string, b: string): number {
  if (a.length !== b.length) throw new Error('Hamming distance requires equal-length strings');
  let dist = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) dist++;
  return dist;
}

/** Computes Sorensen-Dice bigram similarity coefficient in `[0, 1]`. */
export function sorensenDice(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;
  const bigrams = new Map<string, number>();
  for (let i = 0; i < a.length - 1; i++) {
    const bg = a.slice(i, i + 2);
    bigrams.set(bg, (bigrams.get(bg) ?? 0) + 1);
  }
  let intersection = 0;
  for (let i = 0; i < b.length - 1; i++) {
    const bg = b.slice(i, i + 2);
    const count = bigrams.get(bg) ?? 0;
    if (count > 0) {
      bigrams.set(bg, count - 1);
      intersection++;
    }
  }
  return (2 * intersection) / (a.length + b.length - 2);
}

/** Computes American Soundex phonetic code (e.g. `Robert` -> `R163`). */
export function soundexCode(word: string): string {
  const clean = word.toUpperCase().replace(/[^A-Z]/g, '');
  if (!clean) return '0000';
  const map: Record<string, string> = {
    B: '1', F: '1', P: '1', V: '1',
    C: '2', G: '2', J: '2', K: '2', Q: '2', S: '2', X: '2', Z: '2',
    D: '3', T: '3', L: '4', M: '5', N: '5', R: '6',
  };
  let out = clean[0];
  let prev = map[clean[0]] ?? '';
  for (let i = 1; i < clean.length && out.length < 4; i++) {
    const code = map[clean[i]] ?? '';
    if (code && code !== prev) out += code;
    prev = code;
  }
  return out.padEnd(4, '0');
}

/** Computes simplified Metaphone phonetic key for English words. */
export function metaphone(word: string): string {
  let s = word.toUpperCase().replace(/[^A-Z]/g, '');
  if (!s) return '';
  s = s.replace(/^(KN|GN|PN|AE|WR)/, (m) => m[1]);
  s = s.replace(/^X/, 'S').replace(/^WH/, 'W');
  return s
    .replace(/([A-Z])\1+/g, '$1')
    .replace(/PH/g, 'F')
    .replace(/[AEIOU]/g, (v, idx) => (idx === 0 ? v : ''))
    .slice(0, 6);
}

/** Tokenizes text into alphanumeric words. */
export function tokenizeWordsPro(text: string): string[] {
  return text.match(/[A-Za-z0-9']+/g) ?? [];
}

/** Splits text into trimmed sentences. */
export function tokenizeSentencesPro(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Computes a frequency map of words (case-insensitive). */
export function wordFrequency(text: string): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const w of tokenizeWordsPro(text.toLowerCase())) {
    freq[w] = (freq[w] ?? 0) + 1;
  }
  return freq;
}

/** Estimates reading time in minutes given words-per-minute (default 200). */
export function readingTimeMinutes(text: string, wpm = 200): number {
  const words = tokenizeWordsPro(text).length;
  return words === 0 ? 0 : Math.max(1, Math.ceil(words / wpm));
}

/** Extracts `#hashtags` from text. */
export function extractHashtagsPro(text: string): string[] {
  return text.match(/#[A-Za-z0-9_]+/g) ?? [];
}

/** Extracts `@mentions` from text (excluding email addresses). */
export function extractMentionsPro(text: string): string[] {
  const matches: string[] = [];
  const re = /(?:^|[^\w.])(@[A-Za-z0-9_]+(?:[.-][A-Za-z0-9_]+)*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    matches.push(m[1]);
  }
  return matches;
}

/** Extracts HTTP/HTTPS URLs from text. */
export function extractUrls(text: string): string[] {
  return text.match(/https?:\/\/[^\s<>"{}|\\^`[\]]+/g) ?? [];
}

/** Extracts email addresses from text. */
export function extractEmails(text: string): string[] {
  return text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) ?? [];
}

/** Masks an email address (`alice@example.com` -> `a***e@example.com`). */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  if (local.length <= 2) return `${local[0] ?? '*'}*@${domain}`;
  return `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
}

/** Masks a phone number, keeping only the last `visibleDigits` digits. */
export function maskPhone(phone: string, visibleDigits = 4): string {
  let count = 0;
  const chars = phone.split('');
  for (let i = chars.length - 1; i >= 0; i--) {
    if (/\d/.test(chars[i])) {
      count++;
      if (count > visibleDigits) chars[i] = '*';
    }
  }
  return chars.join('');
}

/** Masks a payment card number, keeping only the last 4 digits. */
export function maskCard(card: string): string {
  return maskPhone(card, 4);
}

/** Word-wraps text to a maximum line width. */
export function wrapTextPro(text: string, width = 80): string {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    if (!line) line = w;
    else if (line.length + 1 + w.length <= width) line += ' ' + w;
    else {
      lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines.join('\n');
}

/** Indents every non-empty line of text by `spaces` spaces (or custom prefix). */
export function indentText(text: string, spaces = 2, char = ' '): string {
  const pad = char.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line.length > 0 ? pad + line : line))
    .join('\n');
}

/** Removes common leading indentation from a multi-line string. */
export function dedentText(text: string): string {
  const lines = text.split('\n');
  const indents = lines
    .filter((l) => l.trim().length > 0)
    .map((l) => l.match(/^\s*/)?.[0].length ?? 0);
  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(minIndent)).join('\n');
}

/** Strips ANSI terminal escape codes from a string. */
export function stripAnsi(text: string): string {
  return text.replace(/\x1B\[[0-9;]*[A-Za-z]/g, '');
}

/** Wraps matched substrings with `<mark>` (or custom tags) for search highlighting. */
export function highlightMatch(text: string, query: string, openTag = '<mark>', closeTag = '</mark>'): string {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), `${openTag}$1${closeTag}`);
}

/** Slugifies Unicode strings by normalizing diacritics (NFD) before ASCII cleanup. */
export function slugifyUnicode(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Converts `camelCase` or `PascalCase` into `Title Case`. */
export function camelToTitle(text: string): string {
  return text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase());
}

/** Truncates a long string in the middle (`abcdef...wxyz`). */
export function truncateMiddlePro(text: string, maxLength: number, ellipsis = '...'): string {
  if (text.length <= maxLength) return text;
  const avail = Math.max(2, maxLength - ellipsis.length);
  const front = Math.ceil(avail / 2);
  const back = Math.floor(avail / 2);
  return text.slice(0, front) + ellipsis + text.slice(text.length - back);
}

/** Basic English pluralization helper with irregulars and count support. */
export function pluralizeEn(word: string, count = 2): string {
  if (count === 1) return word;
  if (/(s|x|z|ch|sh)$/i.test(word)) return `${word}es`;
  if (/[^aeiou]y$/i.test(word)) return `${word.slice(0, -1)}ies`;
  return `${word}s`;
}

/** Basic English singularization helper. */
export function singularizeEn(word: string): string {
  if (/ies$/i.test(word)) return `${word.slice(0, -3)}y`;
  if (/(ses|xes|zes|ches|shes)$/i.test(word)) return word.slice(0, -2);
  if (/s$/i.test(word) && !/ss$/i.test(word)) return word.slice(0, -1);
  return word;
}
