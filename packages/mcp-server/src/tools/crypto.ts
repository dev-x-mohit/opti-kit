import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const cryptoTools: McpToolDefinition[] = [
  {
    name: 'opti_hash',
    displayName: 'Cryptographic & Fast Hashing',
    category: 'Crypto & Security',
    description: 'Calculate cryptographic SHA-256 or non-cryptographic fast hashes (CRC32, DJB2).',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'String input to hash.' },
        algorithm: {
          type: 'string',
          description: 'Hash algorithm: sha256, crc32, djb2.',
          enum: ['sha256', 'crc32', 'djb2']
        }
      },
      required: ['input', 'algorithm']
    },
    exampleArgs: { input: 'Secret payload data', algorithm: 'sha256' },
    handler: async (args) => {
      const { input, algorithm } = args;
      switch (algorithm) {
        case 'sha256': {
          const hash = await opti.sha256(input);
          return { algorithm: 'sha256', hash };
        }
        case 'crc32': {
          return { algorithm: 'crc32', hash: opti.crc32(input) };
        }
        case 'djb2': {
          return { algorithm: 'djb2', hash: opti.djb2(input) };
        }
        default: throw new Error(`Unknown algorithm: ${algorithm}`);
      }
    }
  },
  {
    name: 'opti_generate_token',
    displayName: 'Identifier & Token Generator',
    category: 'Crypto & Security',
    description: 'Generate secure UUID v4 or random alphanumeric tokens.',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Token type: uuid, randomString, randomHex.',
          enum: ['uuid', 'randomString', 'randomHex']
        },
        length: { type: 'number', description: 'Length of random string/hex token.' }
      },
      required: ['type']
    },
    exampleArgs: { type: 'uuid' },
    handler: (args) => {
      const { type, length } = args;
      switch (type) {
        case 'uuid': return { token: opti.uuid() };
        case 'randomString': return { token: opti.randomString(length || 16) };
        case 'randomHex': return { token: opti.randomHex(length || 16) };
        default: throw new Error(`Unknown token type: ${type}`);
      }
    }
  },
  {
    name: 'opti_encode_decode',
    displayName: 'Data Encoding & Decoding',
    category: 'Crypto & Security',
    description: 'Encode and decode Base64 and Hexadecimal strings safely.',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'String payload to encode or decode.' },
        codec: {
          type: 'string',
          description: 'Codec: base64Encode, base64Decode, hexEncode, hexDecode.',
          enum: ['base64Encode', 'base64Decode', 'hexEncode', 'hexDecode']
        }
      },
      required: ['input', 'codec']
    },
    exampleArgs: { input: 'Hello World', codec: 'base64Encode' },
    handler: (args) => {
      const { input, codec } = args;
      switch (codec) {
        case 'base64Encode': return { result: opti.base64Encode(input) };
        case 'base64Decode': return { result: opti.base64Decode(input) };
        case 'hexEncode': return { result: opti.hexEncode(input) };
        case 'hexDecode': return { result: opti.hexDecode(input) };
        default: throw new Error(`Unknown codec: ${codec}`);
      }
    }
  }
];
