import { describe, it, expect } from 'vitest';
import {
  dijkstraShortestPath, bellmanFord, floydWarshall, aStarSearch, kruskalMst, primMst,
  tarjanScc, kosarajuScc, topologicalSortKahn, detectCycleDirected, detectCycleUndirected,
  findBridges, findArticulationPoints, bipartiteCheck, graphColoringGreedy,
  maxFlowEdmondsKarp, pageRank, betweennessCentrality, clusteringCoefficient,
  allSimplePaths, connectedComponents, graphDiameter,
} from '../graph-pro';

describe('Graph Pro', () => {
  it('computes shortest paths and minimum spanning trees', () => {
    const wGraph = {
      A: [{ to: 'B', weight: 1 }, { to: 'C', weight: 4 }],
      B: [{ to: 'C', weight: 2 }, { to: 'A', weight: 1 }],
      C: [{ to: 'A', weight: 4 }, { to: 'B', weight: 2 }],
    };
    const dij = dijkstraShortestPath(wGraph, 'A');
    expect(dij.distances.C).toBe(3);

    const edges = [
      { from: 'A', to: 'B', weight: 1 },
      { from: 'B', to: 'C', weight: 2 },
      { from: 'A', to: 'C', weight: 4 },
    ];
    expect(bellmanFord(['A', 'B', 'C'], edges, 'A').distances.C).toBe(3);
    expect(floydWarshall(['A', 'B', 'C'], edges).A.C).toBe(3);
    expect(aStarSearch(wGraph, 'A', 'C', () => 0)).toEqual({ path: ['A', 'B', 'C'], cost: 3 });
    expect(kruskalMst(['A', 'B', 'C'], edges).totalWeight).toBe(3);
    expect(primMst(wGraph, 'A').totalWeight).toBe(3);
  });

  it('computes SCC, topo sort, bridges, coloring, max flow, and centrality', () => {
    const dir = { A: ['B'], B: ['C'], C: ['A', 'D'], D: [] };
    expect(tarjanScc(dir).length).toBe(2);
    expect(kosarajuScc(dir).length).toBe(2);
    expect(detectCycleDirected(dir)).toBe(true);
    expect(topologicalSortKahn({ A: ['B'], B: ['C'], C: [] })).toEqual(['A', 'B', 'C']);

    const undir = { A: ['B'], B: ['A', 'C'], C: ['B'] };
    expect(detectCycleUndirected(undir)).toBe(false);
    expect(findBridges(undir).length).toBe(2);
    expect(findArticulationPoints(undir)).toEqual(['B']);
    expect(bipartiteCheck(undir)).toBe(true);
    expect(Object.keys(graphColoringGreedy(undir)).length).toBe(3);
    expect(connectedComponents(undir).length).toBe(1);
    expect(graphDiameter(undir)).toBe(2);
    expect(allSimplePaths(undir, 'A', 'C')).toEqual([['A', 'B', 'C']]);

    const flowGraph = {
      S: [{ to: 'A', weight: 10 }, { to: 'B', weight: 5 }],
      A: [{ to: 'T', weight: 5 }],
      B: [{ to: 'T', weight: 10 }],
      T: [],
    };
    expect(maxFlowEdmondsKarp(flowGraph, 'S', 'T')).toBe(10);
    expect(pageRank({ A: ['B'], B: ['A'] }).A).toBeCloseTo(0.5, 2);
    expect(betweennessCentrality(undir).B).toBeGreaterThan(0);
    expect(clusteringCoefficient({ A: ['B', 'C'], B: ['A', 'C'], C: ['A', 'B'] }, 'A')).toBe(1);
  });
});
