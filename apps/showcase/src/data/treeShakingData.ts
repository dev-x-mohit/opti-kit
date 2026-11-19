export interface TreeShakeOption {
  id: string;
  name: string;
  module: string;
  sizeBytes: number;
  description: string;
}

export const sampleTreeShakeFunctions: TreeShakeOption[] = [
  { id: 'fn-debounce', name: 'debounce', module: 'async', sizeBytes: 240, description: 'Rate-limiting function execution' },
  { id: 'fn-sha256', name: 'sha256', module: 'crypto', sizeBytes: 310, description: 'Hardware crypto digest calculation' },
  { id: 'fn-uuid', name: 'uuid', module: 'crypto', sizeBytes: 190, description: 'RFC 4122 v4 token generation' },
  { id: 'fn-arrayToTree', name: 'arrayToTree', module: 'tree', sizeBytes: 340, description: 'Relational hierarchy transformation' },
  { id: 'fn-deepClone', name: 'deepClone', module: 'object', sizeBytes: 280, description: 'Safe nested object duplication' },
  { id: 'fn-isEmail', name: 'isEmail', module: 'validate', sizeBytes: 160, description: 'ReDoS-safe email validation' },
  { id: 'fn-signal', name: 'signal', module: 'functional', sizeBytes: 320, description: 'Fine-grained reactive state' },
  { id: 'fn-levenshtein', name: 'levenshteinDistance', module: 'nlp', sizeBytes: 290, description: 'String edit-distance meter' },
  { id: 'fn-calcInterest', name: 'calculateCompoundInterest', module: 'finance', sizeBytes: 220, description: 'Financial compound interest engine' },
  { id: 'fn-safeStorage', name: 'safeStorage', module: 'storage', sizeBytes: 260, description: 'Private browsing safe localStorage' },
  { id: 'fn-chunk', name: 'chunk', module: 'array', sizeBytes: 170, description: 'Array partitioning by size' },
  { id: 'fn-slugify', name: 'slugify', module: 'string', sizeBytes: 210, description: 'URL-friendly slug generator' },
];

export const all67Modules = [
  'string', 'array', 'object', 'math', 'async', 'set', 'map', 'sort',
  'search', 'bit', 'concurrency', 'memoize', 'graph', 'geometry-extended',
  'html-entities', 'string-extended', 'tree-extended', 'date-extended', 'ml',
  'nlp', 'hash', 'deep', 'fsm', 'image', 'duration', 'finance', 'color-extended',
  'easing-extended', 'byte-size', 'csv-extended', 'retry', 'date', 'color',
  'validate', 'dom', 'crypto', 'storage', 'events', 'tree', 'number', 'url',
  'regex', 'functional', 'statistics', 'geometry', 'collection', 'random',
  'encoding', 'units', 'cache', 'guard', 'format', 'schema', 'browser', 'json',
  'store', 'csv', 'log', 'ds', 'template', 'keyboard', 'semver', 'types', 'vector'
];

export const FULL_LIBRARY_BYTES = 15155; // ~14.8 KB
export const MONOLITHIC_COMPARISON_BYTES = 74650; // ~72.9 KB (e.g. Moment or Lodash monolithic)
