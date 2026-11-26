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
    description: "No transitive supply-chain surprises. You won't pull in unmaintained upstream packages or hidden vulnerabilities.",
    icon: 'ShieldCheck',
    verificationBadge: 'Verified Package Manifest'
  },
  {
    title: 'No Network Access',
    tagline: '100% Offline & Pure',
    description: 'None of our 1,280+ functions open sockets, send telemetry, or phone home. Safe inside air-gapped financial systems.',
    icon: 'WifiOff',
    verificationBadge: 'Zero Sockets Opened'
  },
  {
    title: 'No Environment Tampering',
    tagline: 'Zero Global Pollution',
    description: "We don't touch process.env, Object.prototype, or window globals. Every call stays pure and deterministic.",
    icon: 'Lock',
    verificationBadge: 'Pure Functional State'
  },
  {
    title: 'Socket 100/100 Rating',
    tagline: 'Perfect Security Score',
    description: 'Audited by Socket Security with a 100/100 supply-chain health score and zero flagged risks.',
    icon: 'Award',
    verificationBadge: 'Socket Audited'
  }
];

export const trustBadges = [
  { label: 'License', value: 'MIT Open Source', href: 'https://github.com/dev-x-mohit/opti-kit/blob/main/LICENSE' },
  { label: 'GitHub Source', value: 'Public Repository', href: 'https://github.com/dev-x-mohit/opti-kit' },
  { label: 'TypeScript', value: 'Native Declarations Included', href: 'https://www.npmjs.com/package/@dev_x_mohit/opti-kit' },
  { label: 'Versioning', value: 'Semantic (SemVer 2.0.0)', href: 'https://semver.org' },
  { label: 'Changelog', value: 'Release History', href: '/changelog' },
  { label: 'Security Report', value: 'Socket Security 100/100', href: 'https://socket.dev/npm/package/@dev_x_mohit/opti-kit' }
];
