import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const diffTools: McpToolDefinition[] = [
  {
    name: 'opti_diff_objects',
    displayName: 'Deep Object Differ',
    category: 'Diff & Patch',
    description: 'Computes deep structural differences between two JSON objects, returning added, removed, and updated fields.',
    inputSchema: {
      type: 'object',
      properties: {
        original: { type: 'object', description: 'The original baseline object.' },
        updated: { type: 'object', description: 'The modified target object.' }
      },
      required: ['original', 'updated']
    },
    exampleArgs: {
      original: { name: 'Alice', role: 'developer', level: 2 },
      updated: { name: 'Alice', role: 'lead', level: 3, location: 'Remote' }
    },
    handler: (args) => {
      const { original, updated } = args;
      const diff = opti.diffObjects(original || {}, updated || {});
      return diff;
    }
  },
  {
    name: 'opti_json_patch',
    displayName: 'RFC 6902 JSON Patch Engine',
    category: 'Diff & Patch',
    description: 'Generates or applies standard RFC 6902 JSON Patch operations (add, remove, replace, move, copy, test).',
    inputSchema: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          description: 'create (generate patch between original and target) or apply (apply patch to document).',
          enum: ['create', 'apply']
        },
        document: { type: 'object', description: 'Base document (for create: original; for apply: target document).' },
        target: { type: 'object', description: 'Modified document (used when operation is "create").' },
        patch: {
          type: 'array',
          description: 'Array of RFC 6902 patch operations (used when operation is "apply").'
        }
      },
      required: ['operation', 'document']
    },
    exampleArgs: {
      operation: 'create',
      document: { title: 'Old Title', count: 1 },
      target: { title: 'New Title', count: 2, tags: ['ai'] }
    },
    handler: (args) => {
      const { operation, document, target, patch } = args;
      if (operation === 'create') {
        return { patch: opti.createJsonPatch(document, target) };
      }
      if (operation === 'apply') {
        if (!Array.isArray(patch)) {
          throw new Error('Patch array is required for "apply" operation');
        }
        return { result: opti.applyJsonPatch(document, patch) };
      }
      throw new Error(`Unknown operation: ${operation}`);
    }
  },
  {
    name: 'opti_text_diff',
    displayName: 'Word-Level Text Differ',
    category: 'Diff & Patch',
    description: 'Performs word-by-word diff analysis between two text snippets, classifying each token as added, removed, or unchanged.',
    inputSchema: {
      type: 'object',
      properties: {
        original: { type: 'string', description: 'Original source text.' },
        updated: { type: 'string', description: 'Updated modified text.' }
      },
      required: ['original', 'updated']
    },
    exampleArgs: {
      original: 'The quick brown fox jumps',
      updated: 'The fast brown fox leaps'
    },
    handler: (args) => {
      const { original, updated } = args;
      const parts = opti.diffWords(original || '', updated || '');
      return { parts };
    }
  }
];
