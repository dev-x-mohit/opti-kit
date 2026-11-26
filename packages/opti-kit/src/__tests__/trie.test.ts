import { describe, it, expect } from 'vitest';
import {
  createTrie, trieInsert, trieSearch, trieStartsWith, trieDelete, trieAutocomplete,
  trieCountPrefix, trieLongestCommonPrefix, trieAllWords, trieSize,
  createInvertedIndex, indexDocument, searchIndex, removeDocument, bm25Score, tfIdfScore,
  createNGramIndex, searchNGram, createBloomFilter, bloomAdd, bloomHas, bloomFalsePositiveRate,
} from '../trie';

describe('Trie, Search Indexes & Bloom Filter', () => {
  it('supports Prefix Trie operations', () => {
    const t = createTrie();
    trieInsert(t, 'apple');
    trieInsert(t, 'app');
    trieInsert(t, 'application');
    expect(trieSize(t)).toBe(3);
    expect(trieSearch(t, 'app')).toBe(true);
    expect(trieStartsWith(t, 'appl')).toBe(true);
    expect(trieCountPrefix(t, 'app')).toBe(3);
    expect(trieLongestCommonPrefix(t)).toBe('app');
    expect(trieAutocomplete(t, 'appl')).toEqual(['apple', 'application']);
    expect(trieAllWords(t).length).toBe(3);
    expect(trieDelete(t, 'app')).toBe(true);
    expect(trieSearch(t, 'app')).toBe(false);
    expect(trieSize(t)).toBe(2);
  });

  it('supports Inverted Index (BM25 / TF-IDF), NGram Index, and Bloom Filter', () => {
    const idx = createInvertedIndex();
    indexDocument(idx, 'd1', 'fast zero dependency typescript utility');
    indexDocument(idx, 'd2', 'react state management signals');
    expect(bm25Score(idx, 'd1', 'typescript')).toBeGreaterThan(0);
    expect(tfIdfScore(idx, 'd1', 'typescript')).toBeGreaterThan(0);
    expect(searchIndex(idx, 'typescript')[0].docId).toBe('d1');
    expect(removeDocument(idx, 'd2')).toBe(true);

    const ng = createNGramIndex(['typescript', 'javascript', 'python'], 2);
    const hits = searchNGram(ng, 'typescrip', 0.3);
    expect(hits[0].value).toBe('typescript');

    const bf = createBloomFilter(512, 3);
    bloomAdd(bf, 'hello');
    bloomAdd(bf, 'world');
    expect(bloomHas(bf, 'hello')).toBe(true);
    expect(bloomHas(bf, 'definitely-not-added-xyz-123')).toBe(false);
    expect(bloomFalsePositiveRate(bf)).toBeGreaterThanOrEqual(0);
  });
});
