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
    value: 740,
    suffix: '+',
    label: 'Pure Functions',
    tooltip: 'Total side-effect-free, individually exportable functions verified in @dev_x_mohit/opti-kit v1.2.1.',
    sourceText: 'Verified via dist/index.d.ts export count'
  },
  {
    id: 'modules',
    value: 67,
    suffix: '+',
    label: 'Isomorphic Modules',
    tooltip: 'Independent domain modules spanning Data, Math, Cryptography, Async, DOM, and Machine Learning.',
    sourceText: 'Measured across packages/opti-kit/src'
  },
  {
    id: 'bundle-size',
    value: 14,
    suffix: ' KB',
    label: 'Min + Gzip Core',
    tooltip: 'Complete combined library footprint under 16 KB compressed; single imports are typically < 300 bytes.',
    sourceText: 'Measured via Bundlephobia & esbuild analyzer'
  },
  {
    id: 'dependencies',
    value: 0,
    suffix: '',
    label: 'Runtime Dependencies',
    tooltip: 'Zero external runtime packages. Clean lockfiles, zero supply-chain risk, zero transitive CVE vulnerabilities.',
    sourceText: 'Verified via npm package manifest'
  },
  {
    id: 'security-score',
    value: 100,
    suffix: '/100',
    label: 'Socket Security Score',
    tooltip: 'Highest rating on Socket.dev for zero network requests, zero env tampering, and zero filesystem abuse.',
    sourceText: 'Audited by Socket.dev Security Intelligence'
  }
];
