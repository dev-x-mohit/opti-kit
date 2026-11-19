# OptiKit Monorepo

> A zero-dependency, ultra-lightweight, and fully tree-shakeable JavaScript/TypeScript utility library & Model Context Protocol (MCP) server — built as a professional npm Workspaces monorepo.

[![NPM Version](https://img.shields.io/npm/v/@dev_x_mohit/opti-kit?style=flat-square&color=5B7CFA)](https://www.npmjs.com/package/@dev_x_mohit/opti-kit)
[![Socket Security](https://img.shields.io/badge/Socket%20Security-100%2F100-34D399?style=flat-square)](https://socket.dev/npm/package/@dev_x_mohit/opti-kit)
[![Bundlephobia Size](https://img.shields.io/badge/Minified%20%2B%20Gzip-14%20KB-5B7CFA?style=flat-square)](https://bundlephobia.com/package/@dev_x_mohit/opti-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Developer](https://img.shields.io/badge/Developer-Mohit%20Lakhara-5B7CFA?style=flat-square)](https://mohitlakhara.vercel.app)

---

## Monorepo Architecture

```text
opti-kit/
├── packages/
│   ├── opti-kit/           # Core library: 770+ utilities, 80+ modules, 0 deps → @dev_x_mohit/opti-kit
│   └── mcp-server/         # Model Context Protocol stdio server for AI agents → @dev_x_mohit/opti-kit-mcp
├── apps/
│   └── showcase/           # Interactive landing site & sandbox (React 19, Tailwind v4, Vite)
├── .github/workflows/      # Automated CI/CD & release pipelines
├── vercel.json             # Vercel monorepo deployment config
└── package.json            # Root workspace config
```

---

## Packages & Applications

1. **Core Library**: [`@dev_x_mohit/opti-kit`](./packages/opti-kit)
   - 770+ functions, 80+ modules, 592 unit tests, ~14 KB min+gzip
   - Zero runtime dependencies, 100/100 Socket Security score
   - Dual ESM + CJS output, full TypeScript definitions, `"sideEffects": false`
   - Features Fine-Grained Signals, Deep Diff & RFC 6902 Patch, Data-Last FP (`fp`), Token/Leaky Bucket Rate Limiting, Checksums, Resilient Pipelines, Reactive Streams (`Observable`), Cron Schedulers, Multi-Base Codecs (Base58/Base62/Base32), Data Compression (LZW/RLE/Delta), and Runtime Schema Inference (`s`).

2. **Agentic MCP Server**: [`@dev_x_mohit/opti-kit-mcp`](./packages/mcp-server)
   - 29 registered MCP tools for AI agents (Claude Desktop, Cursor, Antigravity, Cline, Windsurf)
   - Eliminates LLM math/logic hallucinations by providing deterministic tools locally via stdio
   - Tools span text transforms, math, collections, validation, crypto, finance, units, date, JSON/CSV, deep object diffing, RFC 6902 JSON patch, word diffs, CRC32/Adler32/FNV checksums, rate limiting, cron scheduling, multi-base codecs, and data compression
   - Start immediately via: `npx @dev_x_mohit/opti-kit-mcp`

3. **Documentation & Showcase**: [`apps/showcase`](./apps/showcase)
   - Production landing site with interactive live playground, real package execution, and benchmarks
   - URL: [opti-kit-showcase.vercel.app](https://opti-kit-showcase.vercel.app)

---

## MCP Server Quick Configuration

Add OptiKit MCP to your `claude_desktop_config.json` or Cursor Settings:

```json
{
  "mcpServers": {
    "opti-kit": {
      "command": "npx",
      "args": ["-y", "@dev_x_mohit/opti-kit-mcp"]
    }
  }
}
```

---

## Local Development & Build

```bash
# Clone the repository
git clone https://github.com/dev-x-mohit/opti-kit.git
cd opti-kit

# Install dependencies across all workspaces
npm install

# Build all packages and showcase site
npm run build:all

# Run the showcase application locally
npm run dev -w apps/showcase

# Run tests
npm run test:package
```

---

## Deploy to Vercel

The monorepo includes a root `vercel.json` preconfigured for Vercel deployment:

```bash
vercel deploy --prod
```

---

## License

MIT © [Mohit Lakhara](https://mohitlakhara.vercel.app)
