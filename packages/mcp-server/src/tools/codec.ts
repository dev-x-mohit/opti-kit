import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const codecTools: McpToolDefinition[] = [
  {
    name: 'opti_codecs',
    displayName: 'Multi-Base Codec & Short ID Engine',
    category: 'Encoding & Codecs',
    description: 'Encodes and decodes data using Bitcoin Base58, Base62 (short URLs), RFC 4648 Base32, URL-safe Base64, or generates random short IDs.',
    inputSchema: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          description: 'Codec operation to perform.',
          enum: [
            'encodeBase58', 'decodeBase58',
            'encodeBase62', 'decodeBase62',
            'encodeBase32', 'decodeBase32',
            'generateShortId',
            'urlSafeBase64Encode', 'urlSafeBase64Decode'
          ]
        },
        payload: { type: 'string', description: 'String input to encode/decode.' },
        number: { type: 'number', description: 'Number input for encodeBase62.' },
        length: { type: 'number', description: 'Length for generateShortId (default: 10).' }
      },
      required: ['operation']
    },
    exampleArgs: {
      operation: 'encodeBase58',
      payload: 'OptiKit AI Agent Protocol'
    },
    handler: (args) => {
      const { operation, payload, number, length } = args;

      switch (operation) {
        case 'encodeBase58':
          return { result: opti.encodeBase58(payload || '') };
        case 'decodeBase58':
          return { result: opti.decodeBase58(payload || '') };
        case 'encodeBase62':
          return { result: opti.encodeBase62(number !== undefined ? number : 0) };
        case 'decodeBase62':
          return { result: String(opti.decodeBase62(payload || '0')) };
        case 'encodeBase32':
          return { result: opti.encodeBase32(payload || '') };
        case 'decodeBase32':
          return { result: opti.decodeBase32(payload || '') };
        case 'generateShortId':
          return { id: opti.generateShortId(length || 10) };
        case 'urlSafeBase64Encode':
          return { result: opti.urlSafeBase64Encode(payload || '') };
        case 'urlSafeBase64Decode':
          return { result: opti.urlSafeBase64Decode(payload || '') };
        default:
          throw new Error(`Unsupported codec operation: ${operation}`);
      }
    }
  }
];
