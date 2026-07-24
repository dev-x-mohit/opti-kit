import { describe, it, expect } from 'vitest';
import { treeDepth, flattenTree } from '../tree-extended';

describe('Tree extended utilities', () => {
  it('should process tree', () => {
    const tree = [{ value: 1, children: [{ value: 2 }] }];
    expect(treeDepth(tree)).toBe(2);
    expect(flattenTree(tree).length).toBe(2);
  });
});
