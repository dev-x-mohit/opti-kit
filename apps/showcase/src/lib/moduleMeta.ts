import { utilitiesData } from '../data/utilitiesData';

export const moduleCategories: Record<string, string> = {
  String: 'Data',
  'String Extended': 'Data',
  Array: 'Data',
  Object: 'Data',
  Collection: 'Data',
  JSON: 'Data',
  CSV: 'Data',
  'Csv Extended': 'Data',
  DS: 'Data',
  Tree: 'Data',
  'Tree Extended': 'Data',
  Deep: 'Data',
  Map: 'Data',
  Set: 'Data',
  Iter: 'Data',
  Sort: 'Data',
  Search: 'Data',
  Diff: 'Data',

  Crypto: 'Security & Encoders',
  Encoding: 'Security & Encoders',
  Validate: 'Security & Encoders',
  Hash: 'Security & Encoders',
  Binary: 'Security & Encoders',
  Checksum: 'Security & Encoders',
  Codec: 'Security & Encoders',
  Compression: 'Security & Encoders',

  Math: 'Math & Science',
  Number: 'Math & Science',
  Statistics: 'Math & Science',
  Geometry: 'Math & Science',
  'Geometry Extended': 'Math & Science',
  Units: 'Math & Science',
  ML: 'Math & Science',
  NLP: 'Math & Science',
  Finance: 'Math & Science',
  Matrix: 'Math & Science',
  Vector: 'Math & Science',
  Graph: 'Math & Science',

  Browser: 'Web',
  DOM: 'Web',
  URL: 'Web',
  Storage: 'Web',
  Keyboard: 'Web',
  Events: 'Web',
  'Html Entities': 'Web',
  Http: 'Web',

  Async: 'Async & Logic',
  Functional: 'Async & Logic',
  Fp: 'Async & Logic',
  Store: 'Async & Logic',
  FSM: 'Async & Logic',
  Concurrency: 'Async & Logic',
  Memoize: 'Async & Logic',
  Retry: 'Async & Logic',
  Signals: 'Async & Logic',
  Observable: 'Async & Logic',
  Pipeline: 'Async & Logic',
  'Rate Limit': 'Async & Logic',
  Cron: 'Async & Logic',

  Random: 'Utilities',
  Color: 'Utilities',
  'Color Extended': 'Utilities',
  'Color Space': 'Utilities',
  Regex: 'Utilities',
  Types: 'Utilities',
  Cache: 'Utilities',
  Guard: 'Utilities',
  Format: 'Utilities',
  Schema: 'Utilities',
  'Schema Infer': 'Utilities',
  Date: 'Utilities',
  'Date Extended': 'Utilities',
  Log: 'Utilities',
  Semver: 'Utilities',
  Bit: 'Utilities',
  Image: 'Utilities',
  Duration: 'Utilities',
  File: 'Utilities',
  Intl: 'Utilities',
  Path: 'Utilities',
  Perf: 'Utilities',
  Template: 'Utilities',
  'Byte Size': 'Utilities',
  Error: 'Utilities',
  Easing: 'Utilities',
  'Easing Extended': 'Utilities',

  // v1.4.0 Pro Modules
  Query: 'Data',
  Lens: 'Data',
  Interval: 'Data',
  Trie: 'Data',
  'Encoding-pro': 'Security & Encoders',
  'Crypto-pro': 'Security & Encoders',
  'Validation-pro': 'Security & Encoders',
  'Graph-pro': 'Math & Science',
  'Statistics-pro': 'Math & Science',
  'Finance-pro': 'Math & Science',
  Spatial: 'Math & Science',
  Result: 'Async & Logic',
  'State-machine': 'Async & Logic',
  Di: 'Async & Logic',
  Parser: 'Async & Logic',
  Scheduler: 'Async & Logic',
  'Reactive-store': 'Async & Logic',
  'Workflow-pro': 'Async & Logic',
  Telemetry: 'Utilities',
  'Text-pro': 'Utilities',
  'Color-pro': 'Utilities',
  'Datetime-pro': 'Utilities',
};

export const CATEGORIES = [
  'All',
  'Data',
  'Math & Science',
  'Web',
  'Async & Logic',
  'Security & Encoders',
  'Utilities',
] as const;

export const TOTAL_UTILITIES_COUNT = utilitiesData.length;

export const UNIQUE_MODULES = Array.from(new Set(utilitiesData.map((u) => u.module))).sort();
export const TOTAL_MODULES_COUNT = UNIQUE_MODULES.length;

export function getModuleCategory(moduleName: string): string {
  return moduleCategories[moduleName] || 'Utilities';
}

const DEFAULT_ARGS: Record<string, string> = {
  chunk: '[1, 2, 3, 4, 5], 2',
  slugify: '"Hello World!"',
  capitalize: '"hello world"',
  camelCase: '"hello-world"',
  kebabCase: '"helloWorld"',
  snakeCase: '"helloWorld"',
  truncate: '"Hello World", 5',
  clamp: '15, 0, 10',
  random: '1, 100',
  difference: '[1, 2, 3], [2, 4]',
  intersection: '[1, 2, 3], [2, 3, 4]',
  unique: '[1, 1, 2, 3, 3]',
  groupBy: '[{ type: "a" }, { type: "b" }, { type: "a" }], item => item.type',
  isEmail: '"test@example.com"',
  isUrl: '"https://example.com"',
  hexToRgb: '"#ff0000"',
  rgbToHex: '255, 0, 0',
  parseQuery: '"?foo=bar&baz=qux"',
  stringifyQuery: '{ foo: "bar", baz: "qux" }',
  cookieGet: '"session_id"',
  cookieSet: '"session_id", "12345", { days: 7 }',
  escapeHtml: '"<h1>Hello</h1>"',
  unescapeHtml: '"&lt;h1&gt;Hello&lt;/h1&gt;"',
};

/**
 * Generates sensible default arguments for a utility function from its TypeScript signature.
 */
export function generateDummyArgs(signature: string, name: string): string {
  if (DEFAULT_ARGS[name]) return DEFAULT_ARGS[name];

  const match = signature.match(/\((.*?)\)/);
  if (!match || !match[1].trim()) return '';

  const params: string[] = [];
  let current = '';
  let depth = 0;
  for (const char of match[1]) {
    if (char === '<' || char === '[' || char === '{' || char === '(') depth++;
    else if (char === '>' || char === ']' || char === '}' || char === ')') depth--;
    else if (char === ',' && depth === 0) {
      params.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }
  if (current.trim()) params.push(current.trim());

  const dummyArgs = params.map((param) => {
    const colonIdx = param.indexOf(':');
    if (colonIdx === -1) {
      if (param.includes('...')) return '[1, 2, 3]';
      return 'null';
    }
    const pName = param.substring(0, colonIdx).replace('?', '').trim().toLowerCase();
    const type = param.substring(colonIdx + 1).trim().toLowerCase();

    if (pName.includes('url')) return '"https://example.com"';
    if (pName.includes('email')) return '"test@example.com"';
    if (pName.includes('color') || pName.includes('hex')) return '"#5B7CFA"';
    if (pName.includes('date')) return 'new Date()';
    if (pName.includes('regex') || pName.includes('pattern')) return '/test/i';

    if (type.includes('string')) return '"Hello World"';
    if (type.includes('number')) return '42';
    if (type.includes('boolean')) return 'true';
    if (type.includes('[]') || type.includes('array')) return '[1, 2, 3]';
    if (type.includes('record') || type.includes('object') || type.startsWith('{')) return '{ key: "value" }';
    if (type.includes('=>') || type.includes('function')) return '() => {}';
    if (type.includes('date')) return 'new Date()';
    if (type.includes('regexp')) return '/test/i';

    return 'null';
  });

  return dummyArgs.join(', ');
}
