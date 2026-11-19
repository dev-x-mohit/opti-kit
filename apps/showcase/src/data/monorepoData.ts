export interface MonorepoPackage {
  id: string;
  name: string;
  path: string;
  description: string;
  role: string;
  stats: string;
  tech: string[];
  links: { label: string; url: string }[];
}

export const monorepoPackages: MonorepoPackage[] = [
  {
    id: 'core',
    name: '@dev_x_mohit/opti-kit',
    path: 'packages/opti-kit',
    role: 'Core Utility Engine',
    description: 'The foundation: 740+ zero-dependency, side-effect free TypeScript utilities compiled into isomorphic ESM and CommonJS.',
    stats: '740+ utilities • 67 modules • ~14 KB min+gzip • 0 deps',
    tech: ['TypeScript 5.4', 'tsup', 'Vitest', 'TypeDoc'],
    links: [
      { label: 'npm package', url: 'https://www.npmjs.com/package/@dev_x_mohit/opti-kit' },
      { label: 'GitHub source', url: 'https://github.com/dev-x-mohit/opti-kit/tree/main/packages/opti-kit' }
    ]
  },
  {
    id: 'mcp',
    name: '@dev_x_mohit/opti-kit-mcp',
    path: 'packages/mcp-server',
    role: 'Agentic Tool Server',
    description: 'Model Context Protocol (MCP) stdio server allowing Claude, Cursor, Antigravity, and Cline to call deterministic utilities.',
    stats: '21 registered MCP tools • JSON Schema inputs • stdio transport',
    tech: ['Node.js 18+', 'JSON-RPC 2.0', 'MCP Protocol', 'tsup'],
    links: [
      { label: 'npm package', url: 'https://www.npmjs.com/package/@dev_x_mohit/opti-kit-mcp' },
      { label: 'GitHub source', url: 'https://github.com/dev-x-mohit/opti-kit/tree/main/packages/mcp-server' }
    ]
  },
  {
    id: 'showcase',
    name: 'opti-kit-showcase',
    path: 'apps/showcase',
    role: 'Docs & Interactive Sandbox',
    description: 'Single-page documentation and live testing application with code runner and benchmark analyzers.',
    stats: 'React 19 • Tailwind CSS v4 • Vite 8 • Framer Motion',
    tech: ['React 19', 'Tailwind v4', 'Vite', 'Framer Motion'],
    links: [
      { label: 'Live Deployment', url: 'https://opti-kit-showcase.vercel.app' },
      { label: 'GitHub source', url: 'https://github.com/dev-x-mohit/opti-kit/tree/main/apps/showcase' }
    ]
  }
];
