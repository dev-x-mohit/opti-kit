import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const compressionTools: McpToolDefinition[] = [
  {
    name: 'opti_compress_data',
    displayName: 'Data Compressor & Decompressor',
    category: 'Data & Utilities',
    description: 'Compresses or decompresses text/data using LZW dictionary compression, Run-Length Encoding (RLE), or Delta numeric encoding.',
    inputSchema: {
      type: 'object',
      properties: {
        algorithm: {
          type: 'string',
          description: 'Compression algorithm to apply.',
          enum: ['lzwCompress', 'lzwDecompress', 'rleCompress', 'deltaEncode', 'deltaDecode']
        },
        text: { type: 'string', description: 'String input for LZW/RLE.' },
        lzwCodes: { type: 'array', description: 'Array of integer codes for lzwDecompress.' },
        numbers: { type: 'array', description: 'Array of numbers for deltaEncode or deltaDecode.' }
      },
      required: ['algorithm']
    },
    exampleArgs: {
      algorithm: 'lzwCompress',
      text: 'TOBEORNOTTOBEORTOBEORNOT'
    },
    handler: (args) => {
      const { algorithm, text, lzwCodes, numbers } = args;

      switch (algorithm) {
        case 'lzwCompress':
          return { codes: opti.compressLZW(text || '') };
        case 'lzwDecompress':
          return { text: opti.decompressLZW(lzwCodes || []) };
        case 'rleCompress':
          return { rle: opti.compressRLE(text || '') };
        case 'deltaEncode':
          return { deltas: opti.deltaEncode(numbers || []) };
        case 'deltaDecode':
          return { numbers: opti.deltaDecode(numbers || []) };
        default:
          throw new Error(`Unsupported compression algorithm: ${algorithm}`);
      }
    }
  }
];
