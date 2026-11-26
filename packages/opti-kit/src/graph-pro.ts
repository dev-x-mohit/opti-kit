/**
 * OptiKit Graph Pro — Weighted shortest paths (Dijkstra, Bellman-Ford, Floyd-Warshall, A*),
 * MST (Kruskal, Prim), SCC (Tarjan, Kosaraju), Topological Sort, Bridges, Max Flow, and PageRank.
 */

export interface WeightedEdge {
  from: string;
  to: string;
  weight: number;
}

export type WeightedAdjList = Record<string, { to: string; weight: number }[]>;

/** Computes single-source shortest paths using Dijkstra's algorithm (non-negative weights). */
export function dijkstraShortestPath(
  graph: WeightedAdjList,
  start: string
): { distances: Record<string, number>; previous: Record<string, string | null> } {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const unvisited = new Set<string>(Object.keys(graph));
  for (const node of unvisited) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[start] = 0;

  while (unvisited.size > 0) {
    let curr: string | null = null;
    for (const n of unvisited) {
      if (curr === null || distances[n] < distances[curr]) curr = n;
    }
    if (curr === null || distances[curr] === Infinity) break;
    unvisited.delete(curr);

    for (const edge of graph[curr] ?? []) {
      const alt = distances[curr] + edge.weight;
      if (alt < (distances[edge.to] ?? Infinity)) {
        distances[edge.to] = alt;
        previous[edge.to] = curr;
      }
    }
  }
  return { distances, previous };
}

/** Computes single-source shortest paths supporting negative weights via Bellman-Ford. */
export function bellmanFord(
  nodes: readonly string[],
  edges: readonly WeightedEdge[],
  start: string
): { distances: Record<string, number>; hasNegativeCycle: boolean } {
  const distances: Record<string, number> = {};
  for (const n of nodes) distances[n] = Infinity;
  distances[start] = 0;

  for (let i = 0; i < nodes.length - 1; i++) {
    for (const e of edges) {
      if (distances[e.from] !== Infinity && distances[e.from] + e.weight < distances[e.to]) {
        distances[e.to] = distances[e.from] + e.weight;
      }
    }
  }
  let hasNegativeCycle = false;
  for (const e of edges) {
    if (distances[e.from] !== Infinity && distances[e.from] + e.weight < distances[e.to]) {
      hasNegativeCycle = true;
      break;
    }
  }
  return { distances, hasNegativeCycle };
}

/** Computes all-pairs shortest path distances using Floyd-Warshall. */
export function floydWarshall(
  nodes: readonly string[],
  edges: readonly WeightedEdge[]
): Record<string, Record<string, number>> {
  const dist: Record<string, Record<string, number>> = {};
  for (const u of nodes) {
    dist[u] = {};
    for (const v of nodes) dist[u][v] = u === v ? 0 : Infinity;
  }
  for (const e of edges) {
    if (e.weight < dist[e.from][e.to]) dist[e.from][e.to] = e.weight;
  }
  for (const k of nodes) {
    for (const i of nodes) {
      for (const j of nodes) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}

/** Finds a shortest path from `start` to `goal` using A* search with heuristic `h`. */
export function aStarSearch(
  graph: WeightedAdjList,
  start: string,
  goal: string,
  heuristic: (node: string) => number
): { path: string[]; cost: number } | null {
  const open = new Set<string>([start]);
  const cameFrom = new Map<string, string>();
  const gScore: Record<string, number> = { [start]: 0 };
  const fScore: Record<string, number> = { [start]: heuristic(start) };

  while (open.size > 0) {
    let curr = '';
    let bestF = Infinity;
    for (const n of open) {
      const f = fScore[n] ?? Infinity;
      if (f < bestF) {
        bestF = f;
        curr = n;
      }
    }
    if (curr === goal) {
      const path = [curr];
      while (cameFrom.has(curr)) {
        curr = cameFrom.get(curr)!;
        path.unshift(curr);
      }
      return { path, cost: gScore[goal] };
    }
    open.delete(curr);
    for (const edge of graph[curr] ?? []) {
      const tentativeG = (gScore[curr] ?? Infinity) + edge.weight;
      if (tentativeG < (gScore[edge.to] ?? Infinity)) {
        cameFrom.set(edge.to, curr);
        gScore[edge.to] = tentativeG;
        fScore[edge.to] = tentativeG + heuristic(edge.to);
        open.add(edge.to);
      }
    }
  }
  return null;
}

/** Computes a Minimum Spanning Tree using Kruskal's algorithm with Union-Find. */
export function kruskalMst(
  nodes: readonly string[],
  edges: readonly WeightedEdge[]
): { edges: WeightedEdge[]; totalWeight: number } {
  const parent = new Map<string, string>();
  for (const n of nodes) parent.set(n, n);
  const find = (x: string): string => {
    while (parent.get(x) !== x) {
      parent.set(x, parent.get(parent.get(x)!)!);
      x = parent.get(x)!;
    }
    return x;
  };
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  const mst: WeightedEdge[] = [];
  let totalWeight = 0;
  for (const e of sorted) {
    const ru = find(e.from);
    const rv = find(e.to);
    if (ru !== rv) {
      parent.set(ru, rv);
      mst.push(e);
      totalWeight += e.weight;
    }
  }
  return { edges: mst, totalWeight };
}

/** Computes a Minimum Spanning Tree using Prim's algorithm. */
export function primMst(
  graph: WeightedAdjList,
  start?: string
): { edges: WeightedEdge[]; totalWeight: number } {
  const nodes = Object.keys(graph);
  if (nodes.length === 0) return { edges: [], totalWeight: 0 };
  const visited = new Set<string>([start ?? nodes[0]]);
  const mst: WeightedEdge[] = [];
  let totalWeight = 0;

  while (visited.size < nodes.length) {
    let bestEdge: WeightedEdge | null = null;
    for (const u of visited) {
      for (const e of graph[u] ?? []) {
        if (!visited.has(e.to) && (!bestEdge || e.weight < bestEdge.weight)) {
          bestEdge = { from: u, to: e.to, weight: e.weight };
        }
      }
    }
    if (!bestEdge) break;
    visited.add(bestEdge.to);
    mst.push(bestEdge);
    totalWeight += bestEdge.weight;
  }
  return { edges: mst, totalWeight };
}

/** Finds Strongly Connected Components (SCC) in a directed graph using Tarjan's algorithm. */
export function tarjanScc(graph: Record<string, string[]>): string[][] {
  let index = 0;
  const indices = new Map<string, number>();
  const lowlink = new Map<string, number>();
  const onStack = new Set<string>();
  const stack: string[] = [];
  const sccs: string[][] = [];

  const strongConnect = (v: string) => {
    indices.set(v, index);
    lowlink.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);

    for (const w of graph[v] ?? []) {
      if (!indices.has(w)) {
        strongConnect(w);
        lowlink.set(v, Math.min(lowlink.get(v)!, lowlink.get(w)!));
      } else if (onStack.has(w)) {
        lowlink.set(v, Math.min(lowlink.get(v)!, indices.get(w)!));
      }
    }

    if (lowlink.get(v) === indices.get(v)) {
      const comp: string[] = [];
      let w: string;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        comp.push(w);
      } while (w !== v);
      sccs.push(comp);
    }
  };

  for (const v of Object.keys(graph)) {
    if (!indices.has(v)) strongConnect(v);
  }
  return sccs;
}

/** Finds Strongly Connected Components using Kosaraju's two-pass DFS algorithm. */
export function kosarajuScc(graph: Record<string, string[]>): string[][] {
  const visited = new Set<string>();
  const order: string[] = [];
  const dfs1 = (u: string) => {
    visited.add(u);
    for (const v of graph[u] ?? []) if (!visited.has(v)) dfs1(v);
    order.push(u);
  };
  for (const u of Object.keys(graph)) if (!visited.has(u)) dfs1(u);

  const rev: Record<string, string[]> = {};
  for (const u of Object.keys(graph)) rev[u] = [];
  for (const [u, neighbors] of Object.entries(graph)) {
    for (const v of neighbors) {
      if (!rev[v]) rev[v] = [];
      rev[v].push(u);
    }
  }

  visited.clear();
  const sccs: string[][] = [];
  const dfs2 = (u: string, comp: string[]) => {
    visited.add(u);
    comp.push(u);
    for (const v of rev[u] ?? []) if (!visited.has(v)) dfs2(v, comp);
  };
  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    if (!visited.has(u)) {
      const comp: string[] = [];
      dfs2(u, comp);
      sccs.push(comp);
    }
  }
  return sccs;
}

/** Performs Kahn's topological sort; returns `null` if the graph contains a cycle. */
export function topologicalSortKahn(graph: Record<string, string[]>): string[] | null {
  const inDegree: Record<string, number> = {};
  for (const u of Object.keys(graph)) inDegree[u] = 0;
  for (const neighbors of Object.values(graph)) {
    for (const v of neighbors) inDegree[v] = (inDegree[v] ?? 0) + 1;
  }
  const queue = Object.keys(inDegree).filter((u) => inDegree[u] === 0);
  const order: string[] = [];
  while (queue.length > 0) {
    const u = queue.shift()!;
    order.push(u);
    for (const v of graph[u] ?? []) {
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
    }
  }
  return order.length === Object.keys(inDegree).length ? order : null;
}

/** Detects whether a directed graph contains a cycle. */
export function detectCycleDirected(graph: Record<string, string[]>): boolean {
  return topologicalSortKahn(graph) === null;
}

/** Detects whether an undirected graph contains a cycle. */
export function detectCycleUndirected(graph: Record<string, string[]>): boolean {
  const visited = new Set<string>();
  const dfs = (u: string, parent: string | null): boolean => {
    visited.add(u);
    for (const v of graph[u] ?? []) {
      if (!visited.has(v)) {
        if (dfs(v, u)) return true;
      } else if (v !== parent) {
        return true;
      }
    }
    return false;
  };
  for (const u of Object.keys(graph)) {
    if (!visited.has(u) && dfs(u, null)) return true;
  }
  return false;
}

/** Finds all bridge edges in an undirected graph using Tarjan's bridge algorithm. */
export function findBridges(graph: Record<string, string[]>): [string, string][] {
  const tin = new Map<string, number>();
  const low = new Map<string, number>();
  const visited = new Set<string>();
  const bridges: [string, string][] = [];
  let timer = 0;

  const dfs = (v: string, p: string | null) => {
    visited.add(v);
    tin.set(v, timer);
    low.set(v, timer);
    timer++;
    for (const to of graph[v] ?? []) {
      if (to === p) continue;
      if (visited.has(to)) {
        low.set(v, Math.min(low.get(v)!, tin.get(to)!));
      } else {
        dfs(to, v);
        low.set(v, Math.min(low.get(v)!, low.get(to)!));
        if (low.get(to)! > tin.get(v)!) bridges.push([v, to]);
      }
    }
  };
  for (const v of Object.keys(graph)) if (!visited.has(v)) dfs(v, null);
  return bridges;
}

/** Finds all articulation points (cut vertices) in an undirected graph. */
export function findArticulationPoints(graph: Record<string, string[]>): string[] {
  const tin = new Map<string, number>();
  const low = new Map<string, number>();
  const visited = new Set<string>();
  const ap = new Set<string>();
  let timer = 0;

  const dfs = (v: string, p: string | null) => {
    visited.add(v);
    tin.set(v, timer);
    low.set(v, timer);
    timer++;
    let children = 0;
    for (const to of graph[v] ?? []) {
      if (to === p) continue;
      if (visited.has(to)) {
        low.set(v, Math.min(low.get(v)!, tin.get(to)!));
      } else {
        dfs(to, v);
        low.set(v, Math.min(low.get(v)!, low.get(to)!));
        if (low.get(to)! >= tin.get(v)! && p !== null) ap.add(v);
        children++;
      }
    }
    if (p === null && children > 1) ap.add(v);
  };
  for (const v of Object.keys(graph)) if (!visited.has(v)) dfs(v, null);
  return Array.from(ap);
}

/** Checks if an undirected graph is bipartite (2-colorable). */
export function bipartiteCheck(graph: Record<string, string[]>): boolean {
  const color = new Map<string, number>();
  for (const start of Object.keys(graph)) {
    if (color.has(start)) continue;
    color.set(start, 0);
    const queue = [start];
    while (queue.length > 0) {
      const u = queue.shift()!;
      for (const v of graph[u] ?? []) {
        if (!color.has(v)) {
          color.set(v, 1 - color.get(u)!);
          queue.push(v);
        } else if (color.get(v) === color.get(u)) {
          return false;
        }
      }
    }
  }
  return true;
}

/** Greedily colors vertices of an undirected graph and returns `{ node: colorIndex }`. */
export function graphColoringGreedy(graph: Record<string, string[]>): Record<string, number> {
  const colors: Record<string, number> = {};
  for (const u of Object.keys(graph)) {
    const used = new Set<number>();
    for (const v of graph[u] ?? []) {
      if (colors[v] !== undefined) used.add(colors[v]);
    }
    let c = 0;
    while (used.has(c)) c++;
    colors[u] = c;
  }
  return colors;
}

/** Computes Maximum Flow from `source` to `sink` using the Edmonds-Karp algorithm. */
export function maxFlowEdmondsKarp(
  capacityGraph: WeightedAdjList,
  source: string,
  sink: string
): number {
  const cap: Record<string, Record<string, number>> = {};
  for (const [u, edges] of Object.entries(capacityGraph)) {
    cap[u] = cap[u] ?? {};
    for (const e of edges) {
      cap[u][e.to] = (cap[u][e.to] ?? 0) + e.weight;
      cap[e.to] = cap[e.to] ?? {};
      cap[e.to][u] = cap[e.to][u] ?? 0;
    }
  }
  let maxFlow = 0;
  while (true) {
    const parent = new Map<string, string>();
    const queue = [source];
    parent.set(source, '');
    while (queue.length > 0 && !parent.has(sink)) {
      const u = queue.shift()!;
      for (const [v, c] of Object.entries(cap[u] ?? {})) {
        if (!parent.has(v) && c > 0) {
          parent.set(v, u);
          queue.push(v);
        }
      }
    }
    if (!parent.has(sink)) break;
    let flow = Infinity;
    for (let v = sink; v !== source; v = parent.get(v)!) {
      flow = Math.min(flow, cap[parent.get(v)!][v]);
    }
    for (let v = sink; v !== source; v = parent.get(v)!) {
      const u = parent.get(v)!;
      cap[u][v] -= flow;
      cap[v][u] += flow;
    }
    maxFlow += flow;
  }
  return maxFlow;
}

/** Computes PageRank scores for a directed graph. */
export function pageRank(
  graph: Record<string, string[]>,
  damping = 0.85,
  iterations = 30
): Record<string, number> {
  const nodes = Object.keys(graph);
  const n = nodes.length;
  if (n === 0) return {};
  let ranks: Record<string, number> = {};
  for (const node of nodes) ranks[node] = 1 / n;

  for (let it = 0; it < iterations; it++) {
    const next: Record<string, number> = {};
    for (const node of nodes) next[node] = (1 - damping) / n;
    for (const u of nodes) {
      const out = graph[u] ?? [];
      if (out.length === 0) {
        const share = (damping * ranks[u]) / n;
        for (const v of nodes) next[v] += share;
      } else {
        const share = (damping * ranks[u]) / out.length;
        for (const v of out) if (v in next) next[v] += share;
      }
    }
    ranks = next;
  }
  return ranks;
}

/** Computes unweighted Betweenness Centrality for all nodes (Brandes' algorithm). */
export function betweennessCentrality(graph: Record<string, string[]>): Record<string, number> {
  const nodes = Object.keys(graph);
  const cb: Record<string, number> = {};
  for (const v of nodes) cb[v] = 0;

  for (const s of nodes) {
    const stack: string[] = [];
    const pred: Record<string, string[]> = {};
    const sigma: Record<string, number> = {};
    const dist: Record<string, number> = {};
    for (const v of nodes) {
      pred[v] = [];
      sigma[v] = 0;
      dist[v] = -1;
    }
    sigma[s] = 1;
    dist[s] = 0;
    const queue = [s];
    while (queue.length > 0) {
      const v = queue.shift()!;
      stack.push(v);
      for (const w of graph[v] ?? []) {
        if (dist[w] < 0) {
          queue.push(w);
          dist[w] = dist[v] + 1;
        }
        if (dist[w] === dist[v] + 1) {
          sigma[w] += sigma[v];
          pred[w].push(v);
        }
      }
    }
    const delta: Record<string, number> = {};
    for (const v of nodes) delta[v] = 0;
    while (stack.length > 0) {
      const w = stack.pop()!;
      for (const v of pred[w]) {
        delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]);
      }
      if (w !== s) cb[w] += delta[w];
    }
  }
  return cb;
}

/** Computes the local clustering coefficient of a node in an undirected graph. */
export function clusteringCoefficient(graph: Record<string, string[]>, node: string): number {
  const neighbors = Array.from(new Set(graph[node] ?? []));
  const k = neighbors.length;
  if (k < 2) return 0;
  let links = 0;
  for (let i = 0; i < k; i++) {
    const nSet = new Set(graph[neighbors[i]] ?? []);
    for (let j = i + 1; j < k; j++) {
      if (nSet.has(neighbors[j])) links++;
    }
  }
  return (2 * links) / (k * (k - 1));
}

/** Enumerates all simple paths between `start` and `end`. */
export function allSimplePaths(
  graph: Record<string, string[]>,
  start: string,
  end: string
): string[][] {
  const paths: string[][] = [];
  const dfs = (curr: string, path: string[], visited: Set<string>) => {
    if (curr === end) {
      paths.push([...path]);
      return;
    }
    for (const next of graph[curr] ?? []) {
      if (!visited.has(next)) {
        visited.add(next);
        path.push(next);
        dfs(next, path, visited);
        path.pop();
        visited.delete(next);
      }
    }
  };
  dfs(start, [start], new Set([start]));
  return paths;
}

/** Finds connected components in an undirected graph. */
export function connectedComponents(graph: Record<string, string[]>): string[][] {
  const visited = new Set<string>();
  const comps: string[][] = [];
  for (const node of Object.keys(graph)) {
    if (visited.has(node)) continue;
    const comp: string[] = [];
    const queue = [node];
    visited.add(node);
    while (queue.length > 0) {
      const u = queue.shift()!;
      comp.push(u);
      for (const v of graph[u] ?? []) {
        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);
        }
      }
    }
    comps.push(comp);
  }
  return comps;
}

/** Computes the unweighted diameter (longest shortest path) of a connected graph. */
export function graphDiameter(graph: Record<string, string[]>): number {
  let diameter = 0;
  for (const start of Object.keys(graph)) {
    const dist = new Map<string, number>([[start, 0]]);
    const queue = [start];
    while (queue.length > 0) {
      const u = queue.shift()!;
      const d = dist.get(u)!;
      if (d > diameter) diameter = d;
      for (const v of graph[u] ?? []) {
        if (!dist.has(v)) {
          dist.set(v, d + 1);
          queue.push(v);
        }
      }
    }
  }
  return diameter;
}
