import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const dataFormatTools: McpToolDefinition[] = [
  {
    name: 'opti_json_tools',
    displayName: 'Safe JSON Parser & Serializer',
    category: 'JSON & CSV',
    description: 'Safely parse and stringify JSON without uncaught syntax errors or circular reference crashes.',
    inputSchema: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          description: 'Operation: safeParse, safeStringify.',
          enum: ['safeParse', 'safeStringify']
        },
        payload: { type: 'string', description: 'String payload for safeParse.' },
        object: { type: 'object', description: 'Object payload for safeStringify.' }
      },
      required: ['operation']
    },
    exampleArgs: { operation: 'safeParse', payload: '{"status":"ok","code":200}' },
    handler: (args) => {
      const { operation, payload, object } = args;
      if (operation === 'safeParse') {
        return opti.safeJsonParse(payload || '{}', null);
      }
      if (operation === 'safeStringify') {
        return { json: opti.safeJsonStringify(object || {}) };
      }
      throw new Error(`Unknown operation: ${operation}`);
    }
  },
  {
    name: 'opti_csv_tools',
    displayName: 'CSV Parser & Stringifier',
    category: 'JSON & CSV',
    description: 'Convert CSV text to JavaScript objects or convert array of objects into CSV text.',
    inputSchema: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          description: 'Operation: parseCsv, stringifyCsv.',
          enum: ['parseCsv', 'stringifyCsv']
        },
        csv: { type: 'string', description: 'CSV string content to parse.' },
        records: { type: 'array', description: 'Array of records to convert to CSV.' }
      },
      required: ['operation']
    },
    exampleArgs: {
      operation: 'parseCsv',
      csv: 'name,role,department\nAlice,Lead Engineer,Platform\nBob,Designer,Product'
    },
    handler: (args) => {
      const { operation, csv, records } = args;
      if (operation === 'parseCsv') {
        return { records: opti.parseCSV(csv || '') };
      }
      if (operation === 'stringifyCsv') {
        return { csv: opti.toCSV(records || []) };
      }
      throw new Error(`Unknown operation: ${operation}`);
    }
  }
];
