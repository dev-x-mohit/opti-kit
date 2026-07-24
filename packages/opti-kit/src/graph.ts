export type AdjacencyList = Map<string, string[]>;

/**
 * Performs Breadth-First Search (BFS) on a graph.
 */
export function bfs(graph: AdjacencyList, start: string): string[] {
  const visited = new Set<string>();
  const queue = [start];
  const result: string[] = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    
    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}

/**
 * Performs Depth-First Search (DFS) on a graph.
 */
export function dfs(graph: AdjacencyList, start: string): string[] {
  const visited = new Set<string>();
  const result: string[] = [];

  function explore(node: string) {
    visited.add(node);
    result.push(node);
    
    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        explore(neighbor);
      }
    }
  }
  
  explore(start);
  return result;
}

/**
 * Finds the shortest path between two nodes using BFS (unweighted).
 */
export function shortestPathBFS(graph: AdjacencyList, start: string, target: string): string[] | null {
  const visited = new Set<string>();
  const queue: [string, string[]][] = [[start, [start]]];
  visited.add(start);

  while (queue.length > 0) {
    const [node, path] = queue.shift()!;
    if (node === target) return path;

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return null;
}

/**
 * Performs a topological sort of a Directed Acyclic Graph (DAG).
 */
export function topologicalSort(graph: AdjacencyList): string[] {
  const visited = new Set<string>();
  const stack: string[] = [];
  const visiting = new Set<string>();

  function explore(node: string) {
    visiting.add(node);
    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (visiting.has(neighbor)) {
        throw new Error('Graph contains a cycle');
      }
      if (!visited.has(neighbor)) {
        explore(neighbor);
      }
    }
    visiting.delete(node);
    visited.add(node);
    stack.push(node);
  }

  for (const node of graph.keys()) {
    if (!visited.has(node)) explore(node);
  }
  return stack.reverse();
}

/**
 * Adds an edge to an adjacency list.
 */
export function addEdge(graph: AdjacencyList, u: string, v: string, directed = false) {
  if (!graph.has(u)) graph.set(u, []);
  graph.get(u)!.push(v);
  
  if (!directed) {
    if (!graph.has(v)) graph.set(v, []);
    graph.get(v)!.push(u);
  }
}

/**
 * Detects if a directed graph contains a cycle.
 */
export function hasCycle(graph: AdjacencyList): boolean {
  try {
    topologicalSort(graph);
    return false;
  } catch (e) {
    return true;
  }
}
