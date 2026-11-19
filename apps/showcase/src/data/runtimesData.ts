export interface RuntimeItem {
  name: string;
  category: string;
  version: string;
  badge: string;
  description: string;
  verified: boolean;
}

export const runtimesData: RuntimeItem[] = [
  {
    name: 'Node.js',
    category: 'Server / Backend',
    version: '>= 18.0.0 (LTS & Current)',
    badge: 'Dual ESM / CJS',
    description: 'Zero native node-gyp bindings; runs out of the box in serverless and containers.',
    verified: true
  },
  {
    name: 'Modern Browsers',
    category: 'Client / Web',
    version: 'Chrome, Safari, Firefox, Edge',
    badge: 'Hardware WebCrypto',
    description: 'Safe storage fallbacks, touch/pointer awareness, and zero window SSR hazards.',
    verified: true
  },
  {
    name: 'Deno',
    category: 'Edge / Runtime',
    version: '>= 1.38',
    badge: 'npm: specifier',
    description: 'Imports directly via `npm:@dev_x_mohit/opti-kit` without bundling steps.',
    verified: true
  },
  {
    name: 'Bun',
    category: 'Runtime / Tooling',
    version: '>= 1.0',
    badge: 'Sub-millisecond startup',
    description: 'Ultra-fast execution with Bun’s native JavaScriptCore engine.',
    verified: true
  },
  {
    name: 'Cloudflare Workers',
    category: 'Edge Compute',
    version: 'Workerd V8 Isolate',
    badge: '0ms Cold Start',
    description: 'Zero node dependencies and zero dynamic eval; complies with strict edge isolate sandboxes.',
    verified: true
  },
  {
    name: 'Vercel Edge & Serverless',
    category: 'Deployment',
    version: 'Next.js, Remix, Astro',
    badge: 'Fluid Hydration',
    description: 'Isomorphic exports prevent hydration mismatches and bundle bloat.',
    verified: true
  }
];
