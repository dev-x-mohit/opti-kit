export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  tooltip: string;
  sourceText: string;
}

export const statsData: StatItem[] = [
  {
    id: 'functions',
    value: 1280,
    suffix: '+',
    label: 'Pure Functions',
    tooltip: "Side-effect-free, individually exportable functions verified in @dev_x_mohit/opti-kit v1.4.0. Import only what you'll actually ship.",
    sourceText: 'Verified via dist/index.d.ts export count'
  },
  {
    id: 'modules',
    value: 108,
    suffix: '',
    label: 'Isomorphic Modules',
    tooltip: 'Independent domain modules covering Data, Math, Cryptography, Async, State Machines, Spatial Indexes, Finance, and Telemetry.',
    sourceText: 'Measured across packages/opti-kit/src'
  },
  {
    id: 'bundle-size',
    value: 14,
    suffix: ' KB',
    label: 'Min + Gzip Core',
    tooltip: "Single imports stay under 300 bytes, and tree-shaking drops anything you don't use.",
    sourceText: 'Measured via Bundlephobia & esbuild analyzer'
  },
  {
    id: 'dependencies',
    value: 0,
    suffix: '',
    label: 'Runtime Dependencies',
    tooltip: 'Zero external runtime packages. Clean lockfiles, no supply-chain bloat, and no transitive CVE headaches.',
    sourceText: 'Verified via npm package manifest'
  },
  {
    id: 'security-score',
    value: 100,
    suffix: '/100',
    label: 'Socket Security Score',
    tooltip: 'Top rating on Socket.dev because nothing opens network sockets, reads env vars, or touches the filesystem.',
    sourceText: 'Audited by Socket.dev Security Intelligence'
  }
];
