#!/usr/bin/env node
import { OptiKitMcpServer } from './server';

const server = new OptiKitMcpServer({
  name: '@dev_x_mohit/opti-kit-mcp',
  version: '1.2.1',
});

server.start();
