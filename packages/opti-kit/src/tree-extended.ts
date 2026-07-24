export interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

/**
 * Walks a tree structure using depth-first search.
 */
export function walkTree<T>(
  tree: TreeNode<T>[],
  callback: (node: TreeNode<T>, depth: number, parent: TreeNode<T> | null) => void,
  depth = 0,
  parent: TreeNode<T> | null = null
) {
  for (const node of tree) {
    callback(node, depth, parent);
    if (node.children && node.children.length > 0) {
      walkTree(node.children, callback, depth + 1, node);
    }
  }
}

/**
 * Finds the first node in a tree that satisfies a predicate.
 */
export function findInTree<T>(
  tree: TreeNode<T>[],
  predicate: (node: TreeNode<T>) => boolean
): TreeNode<T> | undefined {
  for (const node of tree) {
    if (predicate(node)) return node;
    if (node.children) {
      const found = findInTree(node.children, predicate);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Maps over a tree, creating a new tree with mapped values.
 */
export function mapTree<T, R>(
  tree: TreeNode<T>[],
  mapper: (node: TreeNode<T>) => R
): TreeNode<R>[] {
  return tree.map(node => ({
    value: mapper(node),
    children: node.children ? mapTree(node.children, mapper) : undefined
  }));
}

/**
 * Filters nodes in a tree, retaining subtrees if their parent matches.
 */
export function filterTree<T>(
  tree: TreeNode<T>[],
  predicate: (node: TreeNode<T>) => boolean
): TreeNode<T>[] {
  const result: TreeNode<T>[] = [];
  for (const node of tree) {
    if (predicate(node)) {
      result.push({
        ...node,
        children: node.children ? filterTree(node.children, predicate) : undefined
      });
    }
  }
  return result;
}

/**
 * Flattens a tree into a flat array of its nodes.
 */
export function flattenTree<T>(tree: TreeNode<T>[]): TreeNode<T>[] {
  const result: TreeNode<T>[] = [];
  walkTree(tree, node => result.push(node));
  return result;
}

/**
 * Gets the maximum depth of a tree.
 */
export function treeDepth<T>(tree: TreeNode<T>[]): number {
  if (tree.length === 0) return 0;
  let maxDepth = 0;
  walkTree(tree, (_, depth) => {
    if (depth > maxDepth) maxDepth = depth;
  });
  return maxDepth + 1;
}

/**
 * Checks if every node in a tree satisfies a predicate.
 */
export function everyInTree<T>(
  tree: TreeNode<T>[],
  predicate: (node: TreeNode<T>) => boolean
): boolean {
  for (const node of tree) {
    if (!predicate(node)) return false;
    if (node.children && !everyInTree(node.children, predicate)) return false;
  }
  return true;
}

/**
 * Checks if some node in a tree satisfies a predicate.
 */
export function someInTree<T>(
  tree: TreeNode<T>[],
  predicate: (node: TreeNode<T>) => boolean
): boolean {
  for (const node of tree) {
    if (predicate(node)) return true;
    if (node.children && someInTree(node.children, predicate)) return true;
  }
  return false;
}
