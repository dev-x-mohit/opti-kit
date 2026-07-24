import { describe, it, expect } from 'vitest';
import { bfs, dfs, addEdge } from '../graph';

describe('Graph utilities', () => {
  it('should traverse graph', () => {
    const graph = new Map();
    addEdge(graph, 'A', 'B');
    addEdge(graph, 'A', 'C');
    expect(bfs(graph, 'A')).toContain('B');
  });
});
