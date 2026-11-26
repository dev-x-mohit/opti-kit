/**
 * OptiKit Trie & Search Indexes — Prefix Trie, Inverted Index (TF-IDF / BM25),
 * N-Gram Fuzzy Index, and Bloom Filter.
 */

export interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  wordCount: number;
  prefixCount: number;
}

export interface Trie {
  root: TrieNode;
  size: number;
}

function makeTrieNode(): TrieNode {
  return { children: new Map(), isEnd: false, wordCount: 0, prefixCount: 0 };
}

/** Creates an empty Prefix Trie. */
export function createTrie(): Trie {
  return { root: makeTrieNode(), size: 0 };
}

/** Inserts a word into the Trie. */
export function trieInsert(trie: Trie, word: string): void {
  let node = trie.root;
  node.prefixCount++;
  for (const ch of word) {
    let next = node.children.get(ch);
    if (!next) {
      next = makeTrieNode();
      node.children.set(ch, next);
    }
    node = next;
    node.prefixCount++;
  }
  if (!node.isEnd) {
    node.isEnd = true;
    trie.size++;
  }
  node.wordCount++;
}

/** Checks if an exact word exists in the Trie. */
export function trieSearch(trie: Trie, word: string): boolean {
  let node: TrieNode | undefined = trie.root;
  for (const ch of word) {
    node = node.children.get(ch);
    if (!node) return false;
  }
  return node.isEnd;
}

/** Checks if any word in the Trie starts with `prefix`. */
export function trieStartsWith(trie: Trie, prefix: string): boolean {
  let node: TrieNode | undefined = trie.root;
  for (const ch of prefix) {
    node = node.children.get(ch);
    if (!node) return false;
  }
  return true;
}

/** Deletes a word from the Trie if present, returning `true` if removed. */
export function trieDelete(trie: Trie, word: string): boolean {
  if (!trieSearch(trie, word)) return false;
  let node = trie.root;
  node.prefixCount--;
  for (const ch of word) {
    const child = node.children.get(ch)!;
    child.prefixCount--;
    if (child.prefixCount === 0) {
      node.children.delete(ch);
      trie.size--;
      return true;
    }
    node = child;
  }
  node.isEnd = false;
  node.wordCount = 0;
  trie.size--;
  return true;
}

/** Returns up to `limit` autocomplete suggestions for `prefix`. */
export function trieAutocomplete(trie: Trie, prefix: string, limit = 10): string[] {
  let node: TrieNode | undefined = trie.root;
  for (const ch of prefix) {
    node = node.children.get(ch);
    if (!node) return [];
  }
  const results: string[] = [];
  const dfs = (curr: TrieNode, path: string) => {
    if (results.length >= limit) return;
    if (curr.isEnd) results.push(path);
    for (const [ch, child] of curr.children.entries()) {
      if (results.length >= limit) break;
      dfs(child, path + ch);
    }
  };
  dfs(node, prefix);
  return results;
}

/** Counts how many words in the Trie share `prefix`. */
export function trieCountPrefix(trie: Trie, prefix: string): number {
  let node: TrieNode | undefined = trie.root;
  for (const ch of prefix) {
    node = node.children.get(ch);
    if (!node) return 0;
  }
  return node.prefixCount;
}

/** Finds the longest common prefix among all words in the Trie. */
export function trieLongestCommonPrefix(trie: Trie): string {
  let prefix = '';
  let node = trie.root;
  while (node.children.size === 1 && !node.isEnd) {
    const entry = node.children.entries().next().value as [string, TrieNode];
    prefix += entry[0];
    node = entry[1];
  }
  return prefix;
}

/** Returns all words stored in the Trie. */
export function trieAllWords(trie: Trie): string[] {
  return trieAutocomplete(trie, '', Infinity);
}

/** Returns the number of distinct words in the Trie. */
export function trieSize(trie: Trie): number {
  return trie.size;
}

export interface InvertedIndex {
  docs: Map<string, string[]>;
  postings: Map<string, Map<string, number>>;
  avgDocLength: number;
}

function tokenizeSimple(text: string): string[] {
  return text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

/** Creates an empty in-memory Inverted Index. */
export function createInvertedIndex(): InvertedIndex {
  return { docs: new Map(), postings: new Map(), avgDocLength: 0 };
}

/** Indexes a document by `docId` and `text`. */
export function indexDocument(index: InvertedIndex, docId: string, text: string): void {
  if (index.docs.has(docId)) removeDocument(index, docId);
  const tokens = tokenizeSimple(text);
  index.docs.set(docId, tokens);
  for (const token of tokens) {
    if (!index.postings.has(token)) index.postings.set(token, new Map());
    const docMap = index.postings.get(token)!;
    docMap.set(docId, (docMap.get(docId) ?? 0) + 1);
  }
  let totalLen = 0;
  for (const t of index.docs.values()) totalLen += t.length;
  index.avgDocLength = index.docs.size > 0 ? totalLen / index.docs.size : 0;
}

/** Removes a document from the Inverted Index. */
export function removeDocument(index: InvertedIndex, docId: string): boolean {
  const tokens = index.docs.get(docId);
  if (!tokens) return false;
  for (const token of tokens) {
    const docMap = index.postings.get(token);
    if (docMap) {
      docMap.delete(docId);
      if (docMap.size === 0) index.postings.delete(token);
    }
  }
  index.docs.delete(docId);
  let totalLen = 0;
  for (const t of index.docs.values()) totalLen += t.length;
  index.avgDocLength = index.docs.size > 0 ? totalLen / index.docs.size : 0;
  return true;
}

/** Computes BM25 relevance score for a query against a document in the index. */
export function bm25Score(
  index: InvertedIndex,
  docId: string,
  query: string,
  k1 = 1.5,
  b = 0.75
): number {
  const docTokens = index.docs.get(docId);
  if (!docTokens || index.docs.size === 0) return 0;
  const N = index.docs.size;
  const docLen = docTokens.length;
  const avgDl = index.avgDocLength || 1;
  let score = 0;
  for (const term of tokenizeSimple(query)) {
    const docMap = index.postings.get(term);
    if (!docMap) continue;
    const tf = docMap.get(docId) ?? 0;
    if (tf === 0) continue;
    const df = docMap.size;
    const idf = Math.log((N - df + 0.5) / (df + 0.5) + 1);
    score += (idf * (tf * (k1 + 1))) / (tf + k1 * (1 - b + (b * docLen) / avgDl));
  }
  return score;
}

/** Computes TF-IDF score for a query against a document in the index. */
export function tfIdfScore(index: InvertedIndex, docId: string, query: string): number {
  const docTokens = index.docs.get(docId);
  if (!docTokens || docTokens.length === 0) return 0;
  const N = index.docs.size;
  let score = 0;
  for (const term of tokenizeSimple(query)) {
    const docMap = index.postings.get(term);
    if (!docMap) continue;
    const tf = (docMap.get(docId) ?? 0) / docTokens.length;
    const idf = Math.log(1 + N / docMap.size);
    score += tf * idf;
  }
  return score;
}

/** Searches the Inverted Index using BM25 ranking. */
export function searchIndex(
  index: InvertedIndex,
  query: string,
  limit = 10
): { docId: string; score: number }[] {
  const candidates = new Set<string>();
  for (const term of tokenizeSimple(query)) {
    const docMap = index.postings.get(term);
    if (docMap) for (const docId of docMap.keys()) candidates.add(docId);
  }
  const scored = Array.from(candidates).map((docId) => ({
    docId,
    score: bm25Score(index, docId, query),
  }));
  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

export interface NGramIndex {
  n: number;
  items: Map<string, Set<string>>;
}

function getNGrams(text: string, n: number): Set<string> {
  const norm = text.toLowerCase();
  const grams = new Set<string>();
  if (norm.length < n) {
    grams.add(norm);
    return grams;
  }
  for (let i = 0; i <= norm.length - n; i++) {
    grams.add(norm.slice(i, i + n));
  }
  return grams;
}

/** Creates an N-gram fuzzy index for substring/typo-tolerant matching. */
export function createNGramIndex(words: readonly string[], n = 2): NGramIndex {
  const items = new Map<string, Set<string>>();
  for (const w of words) {
    items.set(w, getNGrams(w, n));
  }
  return { n, items };
}

/** Searches an N-gram index using Jaccard similarity. */
export function searchNGram(
  index: NGramIndex,
  query: string,
  minSimilarity = 0.2
): { value: string; score: number }[] {
  const qGrams = getNGrams(query, index.n);
  const results: { value: string; score: number }[] = [];
  for (const [value, grams] of index.items.entries()) {
    let intersection = 0;
    for (const g of qGrams) if (grams.has(g)) intersection++;
    const union = qGrams.size + grams.size - intersection;
    const score = union === 0 ? 0 : intersection / union;
    if (score >= minSimilarity) results.push({ value, score });
  }
  return results.sort((a, b) => b.score - a.score);
}

export interface BloomFilter {
  bits: Uint8Array;
  bitSize: number;
  hashCount: number;
  itemCount: number;
}

function fnv1aHash(str: string, seed: number): number {
  let h = 0x811c9dc5 ^ seed;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Creates a probabilistic Bloom Filter with `bitSize` bits and `hashCount` hashes. */
export function createBloomFilter(bitSize = 1024, hashCount = 4): BloomFilter {
  const safeBits = Math.max(8, bitSize);
  return {
    bits: new Uint8Array(Math.ceil(safeBits / 8)),
    bitSize: safeBits,
    hashCount: Math.max(1, hashCount),
    itemCount: 0,
  };
}

/** Adds an item to the Bloom Filter. */
export function bloomAdd(filter: BloomFilter, item: string): void {
  const h1 = fnv1aHash(item, 0);
  const h2 = fnv1aHash(item, 0x9e3779b9);
  for (let i = 0; i < filter.hashCount; i++) {
    const bit = ((h1 + i * h2) >>> 0) % filter.bitSize;
    filter.bits[bit >> 3] |= 1 << (bit & 7);
  }
  filter.itemCount++;
}

/** Checks if an item may be in the Bloom Filter (`false` = definitely not present). */
export function bloomHas(filter: BloomFilter, item: string): boolean {
  const h1 = fnv1aHash(item, 0);
  const h2 = fnv1aHash(item, 0x9e3779b9);
  for (let i = 0; i < filter.hashCount; i++) {
    const bit = ((h1 + i * h2) >>> 0) % filter.bitSize;
    if ((filter.bits[bit >> 3] & (1 << (bit & 7))) === 0) return false;
  }
  return true;
}

/** Estimates the current false-positive probability of the Bloom Filter. */
export function bloomFalsePositiveRate(filter: BloomFilter): number {
  const k = filter.hashCount;
  const m = filter.bitSize;
  const n = filter.itemCount;
  return Math.pow(1 - Math.exp((-k * n) / m), k);
}

