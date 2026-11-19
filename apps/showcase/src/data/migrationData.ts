export interface MigrationItem {
  library: 'Lodash' | 'Ramda' | 'Moment';
  title: string;
  description: string;
  savings: string;
  before: {
    title: string;
    code: string[];
    removedLines: number[];
  };
  after: {
    title: string;
    code: string[];
    addedLines: number[];
  };
}

export const migrationData: MigrationItem[] = [
  {
    library: 'Lodash',
    title: 'Migrate from Lodash to OptiKit',
    description: 'Eliminate 24 KB of CommonJS wrappers and get first-class TypeScript types without @types/lodash.',
    savings: '82% smaller bundle, zero types packages',
    before: {
      title: 'Legacy Lodash',
      code: [
        `import _ from 'lodash';`,
        `// Or per-method: import debounce from 'lodash/debounce';`,
        ``,
        `const items = [1, 2, 2, 3, 4, 4];`,
        `const uniqueItems = _.uniq(items);`,
        `const grouped = _.groupBy(users, 'role');`,
        `const cloned = _.cloneDeep(config);`,
        `const debouncedSearch = _.debounce(search, 300);`
      ],
      removedLines: [1, 2, 5, 6, 7, 8]
    },
    after: {
      title: 'OptiKit (Drop-in & Tree-shaken)',
      code: [
        `import { unique, groupBy, deepClone, debounce } from '@dev_x_mohit/opti-kit';`,
        `// Pure ESM, tree-shakes to under 1.2 KB`,
        ``,
        `const items = [1, 2, 2, 3, 4, 4];`,
        `const uniqueItems = unique(items);`,
        `const grouped = groupBy(users, u => u.role);`,
        `const cloned = deepClone(config);`,
        `const debouncedSearch = debounce(search, 300);`
      ],
      addedLines: [1, 2, 5, 6, 7, 8]
    }
  },
  {
    library: 'Ramda',
    title: 'Migrate from Ramda to OptiKit',
    description: 'Keep functional data pipelines without runtime curry performance penalties.',
    savings: 'No hidden closure overhead, faster hot loops',
    before: {
      title: 'Ramda Pipeline',
      code: [
        `import * as R from 'ramda';`,
        ``,
        `const processData = R.pipe(`,
        `  R.filter(R.propEq('active', true)),`,
        `  R.map(R.prop('score')),`,
        `  R.sum`,
        `);`,
        `const result = processData(records);`
      ],
      removedLines: [1, 3, 4, 5, 6, 7, 8]
    },
    after: {
      title: 'OptiKit Pipeline',
      code: [
        `import { pipeFP, filterFP, mapFP, sum } from '@dev_x_mohit/opti-kit';`,
        ``,
        `const processData = pipeFP(`,
        `  filterFP((item: any) => item.active),`,
        `  mapFP((item: any) => item.score),`,
        `  (scores: number[]) => sum(scores)`,
        `);`,
        `const result = processData(records);`
      ],
      addedLines: [1, 3, 4, 5, 6, 7, 8]
    }
  },
  {
    library: 'Moment',
    title: 'Migrate from Moment.js to OptiKit',
    description: 'Replace the 73 KB monolithic Moment library with lightweight date & relative time utilities.',
    savings: 'Saves 72 KB (98% reduction), zero mutable bugs',
    before: {
      title: 'Moment.js (Monolithic 73 KB)',
      code: [
        `import moment from 'moment';`,
        ``,
        `const timeAgo = moment(post.createdAt).fromNow();`,
        `const nextWeek = moment().add(7, 'days').toDate();`,
        `const isLeap = moment([2024]).isLeapYear();`,
        `const formatted = moment().format('YYYY-MM-DD');`
      ],
      removedLines: [1, 3, 4, 5, 6]
    },
    after: {
      title: 'OptiKit Date Utilities (0.6 KB)',
      code: [
        `import { relativeTime, addDays, isLeapYear, formatDate } from '@dev_x_mohit/opti-kit';`,
        ``,
        `const timeAgo = relativeTime(post.createdAt);`,
        `const nextWeek = addDays(new Date(), 7);`,
        `const isLeap = isLeapYear(2024);`,
        `const formatted = formatDate(new Date(), 'YYYY-MM-DD');`
      ],
      addedLines: [1, 3, 4, 5, 6]
    }
  }
];
