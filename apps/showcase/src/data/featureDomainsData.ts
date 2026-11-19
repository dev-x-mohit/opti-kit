export interface FunctionDetail {
  name: string;
  signature: string;
  description: string;
  example: string;
  returnType: string;
}

export interface DomainCategory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  functionCount: number;
  highlightCode: string;
  functions: FunctionDetail[];
}

export const featureDomainsData: DomainCategory[] = [
  {
    id: 'data-collections',
    title: 'Data & Collections',
    tagline: 'High-performance data structures & object transformations',
    description: 'Zero-overhead deep cloning, nesting getters/setters, Bidirectional Maps, Priority Queues, and tree transformations.',
    functionCount: 184,
    highlightCode: `import { arrayToTree, deepClone, BiMap } from '@dev_x_mohit/opti-kit';

// Transform flat SQL or API parent-child rows into deep nested trees
const flatItems = [
  { id: 'root', parentId: null, label: 'Workspaces' },
  { id: 'proj-1', parentId: 'root', label: 'Production App' }
];
const tree = arrayToTree(flatItems);`,
    functions: [
      {
        name: 'arrayToTree',
        signature: 'arrayToTree<T>(items: T[], config?: TreeConfig): TreeNode<T>[]',
        description: 'Converts a flat array of relational records with parent IDs into a nested hierarchical tree structure.',
        example: `import { arrayToTree } from '@dev_x_mohit/opti-kit';

const items = [
  { id: 1, parentId: null, name: 'Root' },
  { id: 2, parentId: 1, name: 'Child A' },
  { id: 3, parentId: 1, name: 'Child B' }
];

const tree = arrayToTree(items);
// Returns nested array with 'children' properties`,
        returnType: 'TreeNode<T>[]'
      },
      {
        name: 'deepClone',
        signature: 'deepClone<T>(val: T): T',
        description: 'Creates a deep copy of any object, array, Date, RegExp, Map, or Set without circular reference issues.',
        example: `import { deepClone } from '@dev_x_mohit/opti-kit';

const original = { user: { profile: { name: 'Dev' }, tags: ['admin'] } };
const copy = deepClone(original);
copy.user.profile.name = 'Updated';
console.log(original.user.profile.name); // 'Dev'`,
        returnType: 'T'
      },
      {
        name: 'deepMerge',
        signature: 'deepMerge<T, U>(target: T, source: U): T & U',
        description: 'Recursively merges two or more objects together without mutating the originals.',
        example: `import { deepMerge } from '@dev_x_mohit/opti-kit';

const baseConfig = { api: { timeout: 5000, retry: true } };
const userConfig = { api: { timeout: 10000 } };
const config = deepMerge(baseConfig, userConfig);`,
        returnType: 'T & U'
      },
      {
        name: 'BiMap',
        signature: 'class BiMap<K, V>',
        description: 'Bidirectional Map allowing constant-time O(1) lookups from key to value and value to key.',
        example: `import { BiMap } from '@dev_x_mohit/opti-kit';

const mimeTypes = new BiMap<string, string>();
mimeTypes.set('json', 'application/json');
console.log(mimeTypes.get('json')); // 'application/json'
console.log(mimeTypes.getKey('application/json')); // 'json'`,
        returnType: 'BiMap<K, V>'
      },
      {
        name: 'PriorityQueue',
        signature: 'class PriorityQueue<T>',
        description: 'Binary heap-backed priority queue supporting custom comparator, O(log n) push/pop.',
        example: `import { PriorityQueue } from '@dev_x_mohit/opti-kit';

const pq = new PriorityQueue<string>((a, b) => a.length - b.length);
pq.push('banana');
pq.push('apple');
console.log(pq.pop()); // 'apple'`,
        returnType: 'PriorityQueue<T>'
      },
      {
        name: 'flattenObject',
        signature: 'flattenObject(obj: Record<string, any>, delimiter?: string): Record<string, any>',
        description: 'Flattens a deeply nested object into dot-notation paths.',
        example: `import { flattenObject } from '@dev_x_mohit/opti-kit';

const nested = { app: { theme: { dark: true } } };
const flat = flattenObject(nested);
// { 'app.theme.dark': true }`,
        returnType: 'Record<string, any>'
      }
    ]
  },
  {
    id: 'control-flow-async',
    title: 'Control Flow & Async',
    tagline: 'Deterministic scheduling, reactive signals & caching',
    description: 'Fine-grained reactivity primitives (signal, computed, effect), rate limiting, exponential backoff, and LRU cache.',
    functionCount: 142,
    highlightCode: `import { signal, computed, effect, debounce, retry } from '@dev_x_mohit/opti-kit';

// Fine-grained reactive state
const count = signal(10);
const doubled = computed(() => count.value * 2);

effect(() => {
  console.log('Value updated:', doubled.value);
});
count.value = 25; // Logs: 50`,
    functions: [
      {
        name: 'signal',
        signature: 'signal<T>(initialValue: T): Signal<T>',
        description: 'Creates a fine-grained reactive state signal with automatic dependency tracking.',
        example: `import { signal, computed } from '@dev_x_mohit/opti-kit';

const price = signal(100);
const tax = computed(() => price.value * 0.18);
console.log(tax.value); // 18`,
        returnType: 'Signal<T>'
      },
      {
        name: 'debounce',
        signature: 'debounce<T extends (...args: any[]) => any>(fn: T, wait: number): DebouncedFn<T>',
        description: 'Delays execution until after wait milliseconds have elapsed since the last time it was invoked.',
        example: `import { debounce } from '@dev_x_mohit/opti-kit';

const onSearch = debounce((query: string) => {
  fetchResults(query);
}, 300);`,
        returnType: 'DebouncedFn<T>'
      },
      {
        name: 'throttle',
        signature: 'throttle<T extends (...args: any[]) => any>(fn: T, wait: number): ThrottledFn<T>',
        description: 'Limits function execution to at most once per every wait milliseconds.',
        example: `import { throttle } from '@dev_x_mohit/opti-kit';

const handleScroll = throttle(() => {
  checkVisibility();
}, 100);`,
        returnType: 'ThrottledFn<T>'
      },
      {
        name: 'retry',
        signature: 'retry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>',
        description: 'Executes an async task with automatic retry attempts, jitter, and exponential backoff.',
        example: `import { retry } from '@dev_x_mohit/opti-kit';

const data = await retry(() => fetchRemoteAPI(), {
  retries: 3,
  delay: 500,
  backoff: 'exponential'
});`,
        returnType: 'Promise<T>'
      },
      {
        name: 'asyncPool',
        signature: 'asyncPool<T, R>(limit: number, items: T[], fn: (item: T) => Promise<R>): Promise<R[]>',
        description: 'Runs concurrent asynchronous tasks with a maximum concurrency pool limit.',
        example: `import { asyncPool } from '@dev_x_mohit/opti-kit';

const urls = ['/api/1', '/api/2', '/api/3', '/api/4'];
const results = await asyncPool(2, urls, url => fetch(url));`,
        returnType: 'Promise<R[]>'
      },
      {
        name: 'LRUCache',
        signature: 'class LRUCache<K, V>',
        description: 'Least-Recently-Used memory cache with maximum capacity and optional TTL item expiration.',
        example: `import { LRUCache } from '@dev_x_mohit/opti-kit';

const cache = new LRUCache<string, any>(100);
cache.set('session', { token: 'xyz' });
console.log(cache.get('session'));`,
        returnType: 'LRUCache<K, V>'
      }
    ]
  },
  {
    id: 'security-validation',
    title: 'Security & Validation',
    tagline: 'Cryptographic hashing, tokens & 28+ type validators',
    description: 'Hardware-accelerated WebCrypto SHA-256, UUID v4, HMAC, Base64/Hex encoding, and pure zero-regex-backtracking validators.',
    functionCount: 126,
    highlightCode: `import { sha256, uuid, isEmail, isJWT } from '@dev_x_mohit/opti-kit';

// Isomorphic hardware SHA-256 (Node + Browser)
const digest = await sha256('production-payload-2026');
const token = uuid(); // RFC 4122 v4 compliant
const valid = isEmail('security@domain.org');`,
    functions: [
      {
        name: 'sha256',
        signature: 'sha256(message: string): Promise<string>',
        description: 'Calculates the hexadecimal SHA-256 digest using standard crypto.subtle or Node crypto.',
        example: `import { sha256 } from '@dev_x_mohit/opti-kit';

const hash = await sha256('my-secret-key');
console.log(hash); // 64-character lowercase hex string`,
        returnType: 'Promise<string>'
      },
      {
        name: 'uuid',
        signature: 'uuid(): string',
        description: 'Generates a cryptographically strong RFC 4122 Version 4 UUID string.',
        example: `import { uuid } from '@dev_x_mohit/opti-kit';

const id = uuid();
// "f47ac10b-58cc-4372-a567-0e02b2c3d479"`,
        returnType: 'string'
      },
      {
        name: 'isEmail',
        signature: 'isEmail(value: string): boolean',
        description: 'Validates standard email format without catastrophic regular expression backtracking risks.',
        example: `import { isEmail } from '@dev_x_mohit/opti-kit';

console.log(isEmail('alice@company.co')); // true
console.log(isEmail('invalid@')); // false`,
        returnType: 'boolean'
      },
      {
        name: 'isJWT',
        signature: 'isJWT(value: string): boolean',
        description: 'Validates structure and base64url header/payload components of JSON Web Tokens.',
        example: `import { isJWT } from '@dev_x_mohit/opti-kit';

const isValidToken = isJWT(bearerToken);`,
        returnType: 'boolean'
      },
      {
        name: 'crc32',
        signature: 'crc32(str: string): string',
        description: 'Computes fast cyclic redundancy check checksum for data integrity verifications.',
        example: `import { crc32 } from '@dev_x_mohit/opti-kit';

const checksum = crc32('packet-data-stream');`,
        returnType: 'string'
      },
      {
        name: 'base64Encode',
        signature: 'base64Encode(str: string): string',
        description: 'Isomorphic Base64 encoding supporting full UTF-8 Unicode characters without encoding errors.',
        example: `import { base64Encode, base64Decode } from '@dev_x_mohit/opti-kit';

const encoded = base64Encode('OptiKit 🚀');
const decoded = base64Decode(encoded);`,
        returnType: 'string'
      }
    ]
  },
  {
    id: 'math-ml-science',
    title: 'Math, ML & Science',
    tagline: 'Numerical accuracy, statistics, vector math & finance',
    description: 'Statistical distributions, compound interest, loan amortizations, activation functions, and NLP phonetic distances.',
    functionCount: 168,
    highlightCode: `import { calculateCompoundInterest, calculatePMT, cosineSimilarity, levenshteinDistance } from '@dev_x_mohit/opti-kit';

// Exact financial loan payment
const monthlyPmt = calculatePMT(0.065 / 12, 360, 450000);
// Vector semantic cosine distance
const similarity = cosineSimilarity([1, 0, 1], [0.9, 0.1, 0.95]);`,
    functions: [
      {
        name: 'calculateCompoundInterest',
        signature: 'calculateCompoundInterest(principal: number, rate: number, time: number, compoundingsPerYear?: number): number',
        description: 'Computes total compound interest earned over time with configurable compounding frequency.',
        example: `import { calculateCompoundInterest } from '@dev_x_mohit/opti-kit';

// $10,000 at 7% for 10 years compounded monthly
const interest = calculateCompoundInterest(10000, 7, 10, 12);
console.log('Interest earned:', interest.toFixed(2));`,
        returnType: 'number'
      },
      {
        name: 'calculatePMT',
        signature: 'calculatePMT(ratePerPeriod: number, numPeriods: number, presentValue: number): number',
        description: 'Calculates the constant periodic payment for an annuity or mortgage loan based on interest and tenure.',
        example: `import { calculatePMT } from '@dev_x_mohit/opti-kit';

// 30-year loan of $300,000 at 6% annual interest
const pmt = calculatePMT(0.06 / 12, 360, 300000);
console.log('Monthly payment:', Math.abs(pmt).toFixed(2));`,
        returnType: 'number'
      },
      {
        name: 'levenshteinDistance',
        signature: 'levenshteinDistance(a: string, b: string): number',
        description: 'Determines the minimum number of single-character edits (insertions, deletions, substitutions) required to change one word into another.',
        example: `import { levenshteinDistance } from '@dev_x_mohit/opti-kit';

const dist = levenshteinDistance('kitten', 'sitting');
console.log(dist); // 3`,
        returnType: 'number'
      },
      {
        name: 'soundex',
        signature: 'soundex(str: string): string',
        description: 'Computes the American Soundex phonetic encoding of words so names with the same pronunciation encode to the same code.',
        example: `import { soundex } from '@dev_x_mohit/opti-kit';

console.log(soundex('Robert')); // 'R163'
console.log(soundex('Rupert')); // 'R163'`,
        returnType: 'string'
      },
      {
        name: 'cosineSimilarity',
        signature: 'cosineSimilarity(vecA: number[], vecB: number[]): number',
        description: 'Calculates the cosine angle between two multi-dimensional numerical embeddings/vectors.',
        example: `import { cosineSimilarity } from '@dev_x_mohit/opti-kit';

const score = cosineSimilarity([0.2, 0.8, 0.4], [0.25, 0.78, 0.39]);
// 0.998+`,
        returnType: 'number'
      },
      {
        name: 'standardDeviation',
        signature: 'standardDeviation(numbers: number[], isSample?: boolean): number',
        description: 'Calculates population or sample standard deviation without precision degradation.',
        example: `import { standardDeviation } from '@dev_x_mohit/opti-kit';

const stdDev = standardDeviation([10, 12, 23, 23, 16, 23, 21, 16]);`,
        returnType: 'number'
      }
    ]
  },
  {
    id: 'web-dom',
    title: 'Web & DOM',
    tagline: 'Safe storage, cookies, keyboard bindings & browser heuristics',
    description: 'Safe fallbacks for restricted iframe localStorage, declarative hotkey listeners, cookie managers, and SSR-safe runtime detection.',
    functionCount: 120,
    highlightCode: `import { safeStorage, bindHotkey, isBrowser, getScrollProgress } from '@dev_x_mohit/opti-kit';

// Safe in private windows, iframes, and server-side rendering
safeStorage.setItem('theme', 'dark');

// Clean shortcut binding with auto-cleanup
const unbind = bindHotkey('ctrl+k', () => openPalette());`,
    functions: [
      {
        name: 'safeStorage',
        signature: 'safeStorage: { getItem(k), setItem(k, v), removeItem(k), clear() }',
        description: 'Provides an identical localStorage interface that automatically falls back to in-memory storage if SecurityError or quota is exceeded.',
        example: `import { safeStorage } from '@dev_x_mohit/opti-kit';

// Works in Chrome incognito, third-party iframes, and Node SSR
safeStorage.setItem('key', { saved: true });
const val = safeStorage.getItem('key');`,
        returnType: 'StorageWrapper'
      },
      {
        name: 'bindHotkey',
        signature: 'bindHotkey(combo: string, callback: (e: KeyboardEvent) => void): () => void',
        description: 'Binds a keyboard combination (e.g. "ctrl+k", "escape") and returns an unbind disposer function.',
        example: `import { bindHotkey } from '@dev_x_mohit/opti-kit';

const unbind = bindHotkey('cmd+s', (e) => {
  e.preventDefault();
  saveDocument();
});`,
        returnType: '() => void'
      },
      {
        name: 'cookieGet',
        signature: 'cookieGet(name: string): string | null',
        description: 'Reads cookie value with proper URL component decoding.',
        example: `import { cookieGet, cookieSet } from '@dev_x_mohit/opti-kit';

cookieSet('session_id', 'token123', { days: 7, secure: true });
const token = cookieGet('session_id');`,
        returnType: 'string | null'
      },
      {
        name: 'isBrowser',
        signature: 'isBrowser(): boolean',
        description: 'Deterministic check whether code is currently executing in a client browser window environment.',
        example: `import { isBrowser } from '@dev_x_mohit/opti-kit';

if (isBrowser()) {
  window.scrollTo(0, 0);
}`,
        returnType: 'boolean'
      }
    ]
  },
  {
    id: 'signals-diff-fp',
    title: 'Signals, Diff & Reactive FP',
    tagline: 'Fine-grained reactive state, RFC 6902 JSON patch, and data-last pipelines',
    description: 'Zero-dependency reactive signals with lazy computed memoization, deep recursive object diffing, RFC 6902 JSON Patch, token bucket rate limiting, and data-last functional composition.',
    functionCount: 65,
    highlightCode: `import { signal, computed, effect, diffObjects, createJsonPatch, fp } from '@dev_x_mohit/opti-kit';

// 1. Reactive fine-grained state with auto-tracking & batching
const count = signal(0);
const double = computed(() => count.value * 2);
effect(() => console.log('Double:', double.value));

// 2. Deep object diffing & RFC 6902 JSON patch
const patch = createJsonPatch({ a: 1 }, { a: 2, b: 'new' });`,
    functions: [
      {
        name: 'signal',
        signature: 'signal<T>(initialValue: T): Signal<T>',
        description: 'Creates a fine-grained reactive signal container with automated dependency tracking, batching, and side-effect observers.',
        example: `import { signal, effect } from '@dev_x_mohit/opti-kit';

const count = signal(0);
effect(() => console.log('Count:', count.value));
count.value++; // triggers effect`,
        returnType: 'Signal<T>'
      },
      {
        name: 'diffObjects',
        signature: 'diffObjects<T>(original: T, updated: T): ObjectDiff',
        description: 'Recursively diffs two JSON objects, returning added, removed, and updated fields with old/new values.',
        example: `import { diffObjects } from '@dev_x_mohit/opti-kit';

const diff = diffObjects({ a: 1, b: 2 }, { a: 1, b: 3, c: 4 });
// → { added: { c: 4 }, removed: {}, updated: { b: { oldValue: 2, newValue: 3 } } }`,
        returnType: 'ObjectDiff'
      },
      {
        name: 'createJsonPatch',
        signature: 'createJsonPatch(original: any, target: any): JsonPatchOperation[]',
        description: 'Generates standard RFC 6902 compliant JSON Patch operations (add, remove, replace, move, copy, test).',
        example: `import { createJsonPatch, applyJsonPatch } from '@dev_x_mohit/opti-kit';

const patch = createJsonPatch(docA, docB);
const docBReconstructed = applyJsonPatch(docA, patch);`,
        returnType: 'JsonPatchOperation[]'
      },
      {
        name: 'TokenBucket',
        signature: 'new TokenBucket(options: TokenBucketOptions)',
        description: 'Classic Token Bucket algorithm for burst rate limiting, token consumption, and smooth throughput.',
        example: `import { TokenBucket } from '@dev_x_mohit/opti-kit';

const limiter = new TokenBucket({ capacity: 10, refillRate: 2 });
if (limiter.tryConsume(1)) {
  // Request allowed
}`,
        returnType: 'TokenBucket'
      },
      {
        name: 'fastCrc32',
        signature: 'fastCrc32(input: string | Uint8Array): number',
        description: 'Hardware-grade IEEE 802.3 CRC32 checksum with precomputed lookup table.',
        example: `import { fastCrc32, crc32Hex } from '@dev_x_mohit/opti-kit';

const checksum = crc32Hex('OptiKit payload');
// → '414fa339'`,
        returnType: 'number'
      }
    ]
  }
];
