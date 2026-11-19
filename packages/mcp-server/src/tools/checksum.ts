import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const checksumTools: McpToolDefinition[] = [
  {
    name: 'opti_checksum',
    displayName: 'Checksum & Fast Hash Generator',
    category: 'Hashing & Checksums',
    description: 'Computes deterministic non-cryptographic checksums and hashes: CRC32, Adler32, FNV-1a (32/64-bit), and Murmur3.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Input text to hash/checksum.' },
        algorithm: {
          type: 'string',
          description: 'Algorithm: crc32, crc32Hex, adler32, adler32Hex, fnv1a32, fnv1a32Hex, fnv1a64, murmur3.',
          enum: ['crc32', 'crc32Hex', 'adler32', 'adler32Hex', 'fnv1a32', 'fnv1a32Hex', 'fnv1a64', 'murmur3']
        },
        seed: { type: 'number', description: 'Optional seed integer (only used for murmur3).' }
      },
      required: ['text', 'algorithm']
    },
    exampleArgs: {
      text: 'The quick brown fox jumps over the lazy dog',
      algorithm: 'crc32Hex'
    },
    handler: (args) => {
      const { text, algorithm, seed } = args;
      const str = text || '';

      switch (algorithm) {
        case 'crc32':
          return { checksum: opti.fastCrc32(str) };
        case 'crc32Hex':
          return { checksum: opti.crc32Hex(str) };
        case 'adler32':
          return { checksum: opti.adler32(str) };
        case 'adler32Hex':
          return { checksum: opti.adler32Hex(str) };
        case 'fnv1a32':
          return { checksum: opti.fnv1a32(str) };
        case 'fnv1a32Hex':
          return { checksum: opti.fnv1a32Hex(str) };
        case 'fnv1a64':
          return { checksum: opti.fnv1a64(str) };
        case 'murmur3':
          return { checksum: opti.murmur3(str, seed || 0) };
        default:
          throw new Error(`Unsupported checksum algorithm: ${algorithm}`);
      }
    }
  }
];
