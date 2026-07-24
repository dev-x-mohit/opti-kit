const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'packages/opti-kit/src/__tests__');

const files = {
  'set.test.ts': `import { describe, it, expect } from 'vitest';
import { setUnion, setIntersection, setDifference, isSubset, cartesianProduct } from '../set';

describe('Set utilities', () => {
  it('should compute union', () => {
    expect(Array.from(setUnion(new Set([1, 2]), new Set([2, 3])))).toEqual([1, 2, 3]);
  });
  it('should compute intersection', () => {
    expect(Array.from(setIntersection(new Set([1, 2]), new Set([2, 3])))).toEqual([2]);
  });
});
`,
  'map.test.ts': `import { describe, it, expect } from 'vitest';
import { mapValues, filterMap, objectToMap } from '../map';

describe('Map utilities', () => {
  it('should map values', () => {
    const map = new Map([['a', 1], ['b', 2]]);
    const mapped = mapValues(map, v => v * 2);
    expect(mapped.get('a')).toBe(2);
  });
});
`,
  'sort.test.ts': `import { describe, it, expect } from 'vitest';
import { quickSort, mergeSort, bubbleSort } from '../sort';

describe('Sort utilities', () => {
  it('should sort array', () => {
    expect(quickSort([3, 1, 4, 1, 5, 9])).toEqual([1, 1, 3, 4, 5, 9]);
    expect(mergeSort([3, 1, 4, 1, 5, 9])).toEqual([1, 1, 3, 4, 5, 9]);
  });
});
`,
  'search.test.ts': `import { describe, it, expect } from 'vitest';
import { binarySearch, linearSearch } from '../search';

describe('Search utilities', () => {
  it('should search array', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
    expect(linearSearch([1, 2, 3, 4, 5], 3)).toBe(2);
  });
});
`,
  'bit.test.ts': `import { describe, it, expect } from 'vitest';
import { setBit, clearBit, toggleBit, checkBit } from '../bit';

describe('Bit utilities', () => {
  it('should perform bitwise operations', () => {
    expect(setBit(0, 1)).toBe(2);
    expect(clearBit(3, 1)).toBe(1);
    expect(toggleBit(1, 1)).toBe(3);
    expect(checkBit(2, 1)).toBe(true);
  });
});
`,
  'concurrency.test.ts': `import { describe, it, expect } from 'vitest';
import { pMapSeries, Mutex } from '../concurrency';

describe('Concurrency utilities', () => {
  it('should map series', async () => {
    const res = await pMapSeries([1, 2, 3], async v => v * 2);
    expect(res).toEqual([2, 4, 6]);
  });
});
`,
  'memoize.test.ts': `import { describe, it, expect } from 'vitest';
import { memoizeSimple } from '../memoize';

describe('Memoize utilities', () => {
  it('should memoize', () => {
    let calls = 0;
    const fn = memoizeSimple((x: number) => { calls++; return x * 2; });
    fn(2); fn(2);
    expect(calls).toBe(1);
  });
});
`,
  'graph.test.ts': `import { describe, it, expect } from 'vitest';
import { bfs, dfs, addEdge } from '../graph';

describe('Graph utilities', () => {
  it('should traverse graph', () => {
    const graph = new Map();
    addEdge(graph, 'A', 'B');
    addEdge(graph, 'A', 'C');
    expect(bfs(graph, 'A')).toContain('B');
  });
});
`,
  'geometry-extended.test.ts': `import { describe, it, expect } from 'vitest';
import { pointInRect, rectIntersect } from '../geometry-extended';

describe('Geometry extended utilities', () => {
  it('should test rect intersection', () => {
    const r1 = { x: 0, y: 0, width: 10, height: 10 };
    const r2 = { x: 5, y: 5, width: 10, height: 10 };
    expect(rectIntersect(r1, r2)).toBe(true);
  });
});
`,
  'html-entities.test.ts': `import { describe, it, expect } from 'vitest';
import { escapeHtml, unescapeHtml, stripHtmlTags } from '../html-entities';

describe('HTML Entities utilities', () => {
  it('should escape and unescape', () => {
    expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
    expect(unescapeHtml('&lt;div&gt;')).toBe('<div>');
    expect(stripHtmlTags('<div>test</div>')).toBe('test');
  });
});
`,
  'string-extended.test.ts': `import { describe, it, expect } from 'vitest';
import { reverseString, isPalindrome, toSnakeCase } from '../string-extended';

describe('String extended utilities', () => {
  it('should reverse and test palindrome', () => {
    expect(reverseString('hello')).toBe('olleh');
    expect(isPalindrome('racecar')).toBe(true);
    expect(toSnakeCase('helloWorld')).toBe('hello_world');
  });
});
`,
  'tree-extended.test.ts': `import { describe, it, expect } from 'vitest';
import { treeDepth, flattenTree } from '../tree-extended';

describe('Tree extended utilities', () => {
  it('should process tree', () => {
    const tree = [{ value: 1, children: [{ value: 2 }] }];
    expect(treeDepth(tree)).toBe(2);
    expect(flattenTree(tree).length).toBe(2);
  });
});
`,
  'date-extended.test.ts': `import { describe, it, expect } from 'vitest';
import { isLeapYear, addDays, isSameDay } from '../date-extended';

describe('Date extended utilities', () => {
  it('should process dates', () => {
    expect(isLeapYear(2020)).toBe(true);
    const d1 = new Date(2020, 0, 1);
    const d2 = addDays(d1, 1);
    expect(isSameDay(d1, d2)).toBe(false);
  });
});
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(testDir, filename), content);
}
console.log('Test files created successfully.');
