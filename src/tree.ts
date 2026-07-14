interface FlatNode {
  [key: string]: any;
}

interface TreeNode extends FlatNode {
  children?: TreeNode[];
}

/**
 * Converts a flat array of items with parent-child relationships into a nested tree structure.
 */
export function arrayToTree(
  list: FlatNode[],
  options: { idKey?: string; parentIdKey?: string; childrenKey?: string } = {}
): TreeNode[] {
  const { idKey = "id", parentIdKey = "parentId", childrenKey = "children" } =
    options;

  const map: Record<string | number, TreeNode> = {};
  const roots: TreeNode[] = [];

  // Clone items and map them by their IDs
  for (const item of list) {
    map[item[idKey]] = { ...item, [childrenKey]: [] };
  }

  for (const item of list) {
    const id = item[idKey];
    const parentId = item[parentIdKey];
    const mappedItem = map[id];

    if (parentId === null || parentId === undefined || parentId === "") {
      roots.push(mappedItem);
    } else {
      const parent = map[parentId];
      if (parent) {
        parent[childrenKey]!.push(mappedItem);
      } else {
        // Parent doesn't exist in map, treat as root
        roots.push(mappedItem);
      }
    }
  }

  return roots;
}

/**
 * Flattens a nested tree structure back into a flat array of nodes.
 */
export function treeToArray(
  tree: TreeNode[],
  options: { childrenKey?: string } = {}
): FlatNode[] {
  const { childrenKey = "children" } = options;
  const result: FlatNode[] = [];

  function traverse(nodes: TreeNode[]) {
    for (const node of nodes) {
      const { [childrenKey]: children, ...flatNode } = node;
      result.push(flatNode);
      if (Array.isArray(children) && children.length > 0) {
        traverse(children);
      }
    }
  }

  traverse(tree);
  return result;
}
