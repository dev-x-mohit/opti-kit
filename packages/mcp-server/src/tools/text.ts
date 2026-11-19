import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const textTools: McpToolDefinition[] = [
  {
    name: 'opti_text_transform',
    displayName: 'Text Transformer',
    category: 'Text & NLP',
    description: 'Transform string text into various casing formats or apply truncation and slugification.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'The input string to transform.' },
        operation: {
          type: 'string',
          description: 'Transformation to apply: slugify, camelCase, snakeCase, kebabCase, pascalCase, capitalize, titleCase, truncate, reverse.',
          enum: ['slugify', 'camelCase', 'snakeCase', 'kebabCase', 'pascalCase', 'capitalize', 'titleCase', 'truncate', 'reverse']
        },
        length: { type: 'number', description: 'Maximum length for truncation (only used if operation is "truncate").' },
        suffix: { type: 'string', description: 'Suffix for truncation, defaults to "..."' }
      },
      required: ['text', 'operation']
    },
    exampleArgs: { text: 'Hello World from OptiKit!', operation: 'slugify' },
    handler: (args) => {
      const { text, operation, length, suffix } = args;
      switch (operation) {
        case 'slugify': return opti.slugify(text);
        case 'camelCase': return opti.camelCase(text);
        case 'snakeCase': return opti.snakeCase(text);
        case 'kebabCase': return opti.kebabCase(text);
        case 'pascalCase': return opti.pascalCase(text);
        case 'capitalize': return opti.capitalize(text);
        case 'titleCase': return opti.titleCase(text);
        case 'truncate': return opti.truncate(text, length || 30, suffix || '...');
        case 'reverse': return opti.reverse(text);
        default: throw new Error(`Unknown operation: ${operation}`);
      }
    }
  },
  {
    name: 'opti_text_analysis',
    displayName: 'Text Similarity & Distance',
    category: 'Text & NLP',
    description: 'Calculate string distance (Levenshtein), phonetic soundex code, or n-gram similarity.',
    inputSchema: {
      type: 'object',
      properties: {
        str1: { type: 'string', description: 'Primary string to compare.' },
        str2: { type: 'string', description: 'Secondary string to compare against (for distance/similarity).' },
        mode: {
          type: 'string',
          description: 'Analysis mode: levenshtein, soundex, similarity.',
          enum: ['levenshtein', 'soundex', 'similarity']
        }
      },
      required: ['str1', 'mode']
    },
    exampleArgs: { str1: 'sitting', str2: 'kitten', mode: 'levenshtein' },
    handler: (args) => {
      const { str1, str2, mode } = args;
      if (mode === 'soundex') {
        return { soundex: opti.soundex(str1) };
      }
      if (!str2) throw new Error('str2 is required for levenshtein and similarity comparison');
      if (mode === 'levenshtein') {
        const distance = opti.levenshteinDistance(str1, str2);
        const maxLen = Math.max(str1.length, str2.length);
        const similarityPct = maxLen === 0 ? 100 : Math.round((1 - distance / maxLen) * 100);
        return { distance, similarityPercentage: similarityPct };
      }
      if (mode === 'similarity') {
        const dist = opti.levenshteinDistance(str1, str2);
        return { levenshteinDistance: dist, soundex1: opti.soundex(str1), soundex2: opti.soundex(str2) };
      }
      throw new Error(`Invalid mode: ${mode}`);
    }
  },
  {
    name: 'opti_text_extract',
    displayName: 'Extract & Clean Text',
    category: 'Text & NLP',
    description: 'Extract words, strip HTML tags, or unescape HTML entities safely.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'The raw text to process.' },
        operation: {
          type: 'string',
          description: 'Operation: stripHtml, words, escapeHtml, unescapeHtml.',
          enum: ['stripHtml', 'words', 'escapeHtml', 'unescapeHtml']
        }
      },
      required: ['text', 'operation']
    },
    exampleArgs: { text: '<p>Hello <b>World</b> &amp; friends!</p>', operation: 'stripHtml' },
    handler: (args) => {
      const { text, operation } = args;
      switch (operation) {
        case 'stripHtml': return opti.stripHtml(text);
        case 'words': return opti.words(text);
        case 'escapeHtml': return opti.escapeHtml(text);
        case 'unescapeHtml': return opti.unescapeHtml(text);
        default: throw new Error(`Unknown operation: ${operation}`);
      }
    }
  }
];
