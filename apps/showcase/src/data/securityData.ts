export interface SecurityCard {
  title: string;
  tagline: string;
  description: string;
  icon: string;
  verificationBadge: string;
}

export const securityPillars: SecurityCard[] = [
  {
    title: 'Zero Dependencies',
    tagline: '0 Runtime Packages',
    description: 'Zero transitive supply-chain attack vectors. No hidden vulnerabilities or unmaintained upstream packages in your node_modules.',
    icon: 'ShieldCheck',
    verificationBadge: 'Verified Package Manifest'
  },
  {
    title: 'No Network Access',
    tagline: '100% Offline & Pure',
    description: 'None of the 740+ functions open sockets, send telemetry, or reach out to external servers. Safe in air-gapped financial environments.',
    icon: 'WifiOff',
    verificationBadge: 'Zero Sockets Opened'
  },
  {
    title: 'No Environment Tampering',
    tagline: 'Zero Global Pollution',
    description: 'No mutations to process.env, Object.prototype, or window globals. Strict functional purity guarantees reproducible results.',
    icon: 'Lock',
    verificationBadge: 'Pure Functional State'
  },
  {
    title: 'Socket 100/100 Rating',
    tagline: 'Perfect Security Score',
    description: 'Independently audited by Socket Security intelligence with 100/100 supply chain health and 0 known security red flags.',
    icon: 'Award',
    verificationBadge: 'Socket Audited'
  }
];

export const trustBadges = [
  { label: 'License', value: 'MIT Open Source', href: 'https://github.com/dev-x-mohit/opti-kit/blob/main/LICENSE' },
  { label: 'GitHub Source', value: 'Public Repository', href: 'https://github.com/dev-x-mohit/opti-kit' },
  { label: 'TypeScript', value: 'Native Declarations Included', href: 'https://www.npmjs.com/package/@dev_x_mohit/opti-kit' },
  { label: 'Versioning', value: 'Semantic (SemVer 2.0.0)', href: 'https://semver.org' },
  { label: 'Changelog', value: 'Release History', href: 'https://github.com/dev-x-mohit/opti-kit/releases' },
  { label: 'Security Report', value: 'Socket Security 100/100', href: 'https://socket.dev/npm/package/@dev_x_mohit/opti-kit' }
];
