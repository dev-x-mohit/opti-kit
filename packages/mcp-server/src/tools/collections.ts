import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const collectionsTools: McpToolDefinition[] = [
  {
    name: 'opti_array_ops',
    displayName: 'Array Operations',
    category: 'Data & Collections',
    description: 'Chunk, flatten, unique, intersect, or calculate difference on arrays.',
    inputSchema: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          description: 'Array operation: chunk, unique, intersection, difference, union, shuffle, flatten.',
          enum: ['chunk', 'unique', 'intersection', 'difference', 'union', 'shuffle', 'flatten']
        },
        array: { type: 'array', description: 'Primary array input.' },
        secondaryArray: { type: 'array', description: 'Secondary array for intersection/difference/union.' },
        chunkSize: { type: 'number', description: 'Chunk size when operation is chunk.' }
      },
      required: ['operation', 'array']
    },
    exampleArgs: { operation: 'chunk', array: [1, 2, 3, 4, 5, 6, 7], chunkSize: 3 },
    handler: (args) => {
      const { operation, array, secondaryArray, chunkSize } = args;
      switch (operation) {
        case 'chunk': return opti.chunk(array, chunkSize || 2);
        case 'unique': return opti.unique(array);
        case 'intersection': return opti.intersection(array, secondaryArray || []);
        case 'difference': return opti.difference(array, secondaryArray || []);
        case 'union': return opti.union(array, secondaryArray || []);
        case 'shuffle': return opti.shuffle([...array]);
        case 'flatten': return opti.flatten(array);
        default: throw new Error(`Unknown operation: ${operation}`);
      }
    }
  },
  {
    name: 'opti_object_ops',
    displayName: 'Object Utilities',
    category: 'Data & Collections',
    description: 'Deep clone, deep merge, pick, omit, flatten, or get nested paths from JSON objects.',
    inputSchema: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          description: 'Object operation: deepClone, deepMerge, pick, omit, flattenObject, getPath.',
          enum: ['deepClone', 'deepMerge', 'pick', 'omit', 'flattenObject', 'getPath']
        },
        target: { type: 'object', description: 'Target object to inspect or mutate.' },
        source: { type: 'object', description: 'Secondary object for deepMerge.' },
        keys: { type: 'array', description: 'Keys to pick or omit.' },
        path: { type: 'string', description: 'Path string (e.g. "user.profile.name") for getPath.' }
      },
      required: ['operation', 'target']
    },
    exampleArgs: { operation: 'getPath', target: { user: { address: { city: 'San Francisco' } } }, path: 'user.address.city' },
    handler: (args) => {
      const { operation, target, source, keys, path } = args;
      switch (operation) {
        case 'deepClone': return opti.deepClone(target);
        case 'deepMerge': return opti.deepMerge(target, source || {});
        case 'pick': return opti.pick(target, keys || []);
        case 'omit': return opti.omit(target, keys || []);
        case 'flattenObject': return opti.flattenObject(target);
        case 'getPath': return opti.get(target, path || '');
        default: throw new Error(`Unknown operation: ${operation}`);
      }
    }
  },
  {
    name: 'opti_group_sort',
    displayName: 'Group, Partition & Tree',
    category: 'Data & Collections',
    description: 'Transform flat list of objects into hierarchical tree or group items by key.',
    inputSchema: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          description: 'Operation: arrayToTree, groupBy.',
          enum: ['arrayToTree', 'groupBy']
        },
        items: { type: 'array', description: 'List of objects to process.' },
        key: { type: 'string', description: 'Key to group by (e.g. "category" or "role").' }
      },
      required: ['operation', 'items']
    },
    exampleArgs: {
      operation: 'arrayToTree',
      items: [
        { id: '1', parentId: null, name: 'Root Folder' },
        { id: '2', parentId: '1', name: 'Documents' },
        { id: '3', parentId: '2', name: 'Report.pdf' }
      ]
    },
    handler: (args) => {
      const { operation, items, key } = args;
      if (operation === 'arrayToTree') {
        return opti.arrayToTree(items);
      }
      if (operation === 'groupBy') {
        if (!key) throw new Error('key is required for groupBy');
        return opti.groupBy(items, (item: any) => item[key]);
      }
      throw new Error(`Unknown operation: ${operation}`);
    }
  }
];
