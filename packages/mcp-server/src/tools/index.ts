import { McpToolDefinition, McpToolResult } from '../types';
import { textTools } from './text';
import { collectionsTools } from './collections';
import { mathTools } from './math';
import { validationTools } from './validation';
import { cryptoTools } from './crypto';
import { financeTools } from './finance';
import { unitsTools } from './units';
import { dateTools } from './date';
import { dataFormatTools } from './data-format';
import { diffTools } from './diff';
import { checksumTools } from './checksum';
import { rateLimitTools } from './rate-limit';
import { cronTools } from './cron';
import { codecTools } from './codec';
import { compressionTools } from './compression';

export const allTools: McpToolDefinition[] = [
  ...textTools,
  ...collectionsTools,
  ...mathTools,
  ...validationTools,
  ...cryptoTools,
  ...financeTools,
  ...unitsTools,
  ...dateTools,
  ...dataFormatTools,
  ...diffTools,
  ...checksumTools,
  ...rateLimitTools,
  ...cronTools,
  ...codecTools,
  ...compressionTools,
];

export const toolsMap = new Map<string, McpToolDefinition>(
  allTools.map(t => [t.name, t])
);

export async function executeTool(name: string, args: Record<string, any> = {}): Promise<McpToolResult> {
  const tool = toolsMap.get(name);
  if (!tool) {
    return {
      content: [{ type: 'text', text: `Tool not found: "${name}". Available tools: ${allTools.map(t => t.name).join(', ')}` }],
      isError: true
    };
  }

  try {
    const result = await tool.handler(args);
    const textOutput = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
    return {
      content: [{ type: 'text', text: textOutput }],
      isError: false
    };
  } catch (err: any) {
    return {
      content: [{ type: 'text', text: `Error executing ${name}: ${err?.message || String(err)}` }],
      isError: true
    };
  }
}

export * from '../types';
