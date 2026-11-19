import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const unitsTools: McpToolDefinition[] = [
  {
    name: 'opti_unit_convert',
    displayName: 'Unit & Byte Size Converter',
    category: 'Units & Color',
    description: 'Convert between byte sizes (B, KB, MB, GB) or format bytes into human-readable strings.',
    inputSchema: {
      type: 'object',
      properties: {
        bytes: { type: 'number', description: 'Number of bytes to format.' },
        precision: { type: 'number', description: 'Decimal precision (default 2).' }
      },
      required: ['bytes']
    },
    exampleArgs: { bytes: 14745600, precision: 2 },
    handler: (args) => {
      const { bytes, precision = 2 } = args;
      return {
        bytes,
        humanReadable: opti.formatByteSize(bytes, precision)
      };
    }
  },
  {
    name: 'opti_color_convert',
    displayName: 'Color Space Converter',
    category: 'Units & Color',
    description: 'Convert between Hex and RGB color formats.',
    inputSchema: {
      type: 'object',
      properties: {
        direction: {
          type: 'string',
          description: 'Conversion direction: hexToRgb or rgbToHex.',
          enum: ['hexToRgb', 'rgbToHex']
        },
        hex: { type: 'string', description: 'Hex color string (e.g. "#5B7CFA").' },
        r: { type: 'number', description: 'Red component (0-255).' },
        g: { type: 'number', description: 'Green component (0-255).' },
        b: { type: 'number', description: 'Blue component (0-255).' }
      },
      required: ['direction']
    },
    exampleArgs: { direction: 'hexToRgb', hex: '#5B7CFA' },
    handler: (args) => {
      const { direction, hex, r, g, b } = args;
      if (direction === 'hexToRgb') {
        if (!hex) throw new Error('hex color string is required');
        return opti.hexToRgb(hex);
      }
      if (direction === 'rgbToHex') {
        return { hex: opti.rgbToHex(r ?? 0, g ?? 0, b ?? 0) };
      }
      throw new Error(`Unknown direction: ${direction}`);
    }
  }
];
