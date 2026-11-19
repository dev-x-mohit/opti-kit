export interface QuickStartCodeTab {
  id: string;
  label: string;
  filename: string;
  code: string;
}

export const quickStartTabs: QuickStartCodeTab[] = [
  {
    id: 'esm',
    label: 'ESM (Recommended)',
    filename: 'app.js',
    code: `// Pure ES Module with automatic tree-shaking
import { debounce, sha256, unique } from '@dev_x_mohit/opti-kit';

const list = unique([1, 2, 2, 3, 4, 4]);
const hash = await sha256('opti-kit');

console.log({ list, hash });`
  },
  {
    id: 'ts',
    label: 'TypeScript',
    filename: 'index.ts',
    code: `// Full TypeScript type inference out of the box
import { arrayToTree, TreeNode, BiMap } from '@dev_x_mohit/opti-kit';

interface Category {
  id: string;
  parentId: string | null;
  name: string;
}

const map = new BiMap<string, number>();
map.set('latency', 42);

const categories: Category[] = [
  { id: '1', parentId: null, name: 'Root' },
  { id: '2', parentId: '1', name: 'Child' }
];

const tree: TreeNode<Category>[] = arrayToTree(categories);`
  },
  {
    id: 'cjs',
    label: 'CommonJS',
    filename: 'server.cjs',
    code: `// Dual CommonJS output for legacy Node environments
const { calculateCompoundInterest, uuid } = require('@dev_x_mohit/opti-kit');

const id = uuid();
const interest = calculateCompoundInterest(10000, 7.5, 5, 12);

console.log({ id, interest });`
  }
];

export const installManagers = [
  { name: 'npm', cmd: 'npm install @dev_x_mohit/opti-kit' },
  { name: 'pnpm', cmd: 'pnpm add @dev_x_mohit/opti-kit' },
  { name: 'yarn', cmd: 'yarn add @dev_x_mohit/opti-kit' },
  { name: 'bun', cmd: 'bun add @dev_x_mohit/opti-kit' }
];
