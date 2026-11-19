import readline from 'readline';
import { allTools, executeTool } from './tools';

export interface OptiKitMcpServerOptions {
  name?: string;
  version?: string;
}

export class OptiKitMcpServer {
  private name: string;
  private version: string;

  constructor(options: OptiKitMcpServerOptions = {}) {
    this.name = options.name || 'opti-kit-mcp';
    this.version = options.version || '1.2.1';
  }

  public start(): void {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    process.stderr.write(`[opti-kit-mcp] Starting ${this.name} v${this.version} with ${allTools.length} tools...\n`);

    rl.on('line', async (line: string) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      try {
        const message = JSON.parse(trimmed);
        await this.handleMessage(message);
      } catch (err: any) {
        this.sendError(null, -32700, `Parse error: ${err.message}`);
      }
    });

    process.on('SIGINT', () => {
      process.exit(0);
    });
  }

  private async handleMessage(message: any): Promise<void> {
    const { id, method, params } = message;

    // Notifications (no id)
    if (id === undefined || id === null) {
      if (method === 'notifications/initialized') {
        process.stderr.write('[opti-kit-mcp] Client initialized notification received.\n');
      }
      return;
    }

    switch (method) {
      case 'initialize': {
        this.sendResult(id, {
          protocolVersion: '2024-11-05',
          serverInfo: {
            name: this.name,
            version: this.version,
          },
          capabilities: {
            tools: {
              listChanged: false,
            },
          },
        });
        break;
      }

      case 'tools/list': {
        const toolsList = allTools.map((t) => ({
          name: t.name,
          description: t.description,
          inputSchema: t.inputSchema,
        }));
        this.sendResult(id, { tools: toolsList });
        break;
      }

      case 'tools/call': {
        const toolName = params?.name;
        const toolArgs = params?.arguments || {};
        const result = await executeTool(toolName, toolArgs);
        this.sendResult(id, result);
        break;
      }

      case 'ping': {
        this.sendResult(id, {});
        break;
      }

      default: {
        this.sendError(id, -32601, `Method not found: ${method}`);
        break;
      }
    }
  }

  private sendResult(id: string | number, result: any): void {
    const response = {
      jsonrpc: '2.0',
      id,
      result,
    };
    process.stdout.write(JSON.stringify(response) + '\n');
  }

  private sendError(id: string | number | null, code: number, message: string): void {
    const response = {
      jsonrpc: '2.0',
      id,
      error: { code, message },
    };
    process.stdout.write(JSON.stringify(response) + '\n');
  }
}
