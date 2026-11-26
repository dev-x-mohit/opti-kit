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
    description: "1,280+ zero-dependency, side-effect-free TypeScript utilities compiled to isomorphic ESM and CommonJS. Pull in one function and tree-shaking drops the rest.",
    stats: '1,280+ utilities • 108 modules • ~14 KB min+gzip • 0 deps',
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
    description: 'Model Context Protocol (MCP) stdio server so Claude, Cursor, Antigravity, and Cline can call deterministic utilities directly.',
    stats: '29 registered MCP tools • JSON Schema inputs • stdio transport',
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
    description: 'Interactive documentation, live TypeScript sandbox, bundle estimator, and release changelog.',
    stats: 'React 19 • Tailwind CSS v4 • Vite 8 • Framer Motion',
    tech: ['React 19', 'Tailwind v4', 'Vite', 'Framer Motion'],
    links: [
      { label: 'Live Deployment', url: 'https://opti-kit-showcase.vercel.app' },
      { label: 'GitHub source', url: 'https://github.com/dev-x-mohit/opti-kit/tree/main/apps/showcase' }
    ]
  }
];
