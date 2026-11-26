export interface LibraryComparison {
  name: string;
  version: string;
  fullGzipKb: number;
  singleImportGzipKb: number;
  dependencyCount: number;
  isOptiKit?: boolean;
  isHeaviest?: boolean;
  notes: string;
  bundlephobiaUrl: string;
}

export const bundleComparisonData: LibraryComparison[] = [
  {
    name: 'OptiKit',
    version: '1.4.0',
    fullGzipKb: 14.8,
    singleImportGzipKb: 0.32,
    dependencyCount: 0,
    isOptiKit: true,
    notes: 'Pure TypeScript, zero dependencies, ES module sideEffects: false.',
    bundlephobiaUrl: 'https://bundlephobia.com/package/@dev_x_mohit/opti-kit'
  },
  {
    name: 'Lodash',
    version: '4.17.21',
    fullGzipKb: 24.4,
    singleImportGzipKb: 4.1,
    dependencyCount: 0,
    notes: 'CommonJS legacy core requires babel-plugin-lodash or per-method packages for tree-shaking.',
    bundlephobiaUrl: 'https://bundlephobia.com/package/lodash'
  },
  {
    name: 'Ramda',
    version: '0.30.1',
    fullGzipKb: 12.3,
    singleImportGzipKb: 2.8,
    dependencyCount: 0,
    notes: 'Functional curry overhead retains curried wrappers across single imports.',
    bundlephobiaUrl: 'https://bundlephobia.com/package/ramda'
  },
  {
    name: 'Moment.js',
    version: '2.30.1',
    fullGzipKb: 72.9,
    singleImportGzipKb: 72.9,
    dependencyCount: 0,
    isHeaviest: true,
    notes: 'Monolithic object design bundles all locale data; does not support ESM tree-shaking.',
    bundlephobiaUrl: 'https://bundlephobia.com/package/moment'
  }
];

export const bundleMethodology = {
  testedOn: 'Bundlephobia & Rollup v4 ESM analyzer',
  metric: 'Minified + Gzip compressed transfer payload',
  singleImportMetric: 'Single method import (e.g., debounce / formatRelative / chunk)',
  footnote: 'Data sourced from Bundlephobia public audits and measured on Node 20 LTS using clean rollup production builds.'
};
