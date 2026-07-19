import { describe, it, expect } from "vitest";
import { arrayToTree, treeToArray } from "../tree";

describe("tree utilities", () => {
  it("arrayToTree", () => {
    const list = [
      { id: 1, name: "Root", parentId: null },
      { id: 2, name: "Child 1", parentId: 1 },
      { id: 3, name: "Child 2", parentId: 1 },
      { id: 4, name: "Grandchild", parentId: 2 },
    ];

    const tree = arrayToTree(list);

    expect(tree).toHaveLength(1);
    expect(tree[0].name).toBe("Root");
    expect(tree[0].children).toHaveLength(2);
    expect(tree[0].children![0].name).toBe("Child 1");
    expect(tree[0].children![0].children).toHaveLength(1);
    expect(tree[0].children![0].children![0].name).toBe("Grandchild");
  });

  it("treeToArray", () => {
    const tree = [
      {
        id: 1,
        name: "Root",
        children: [
          {
            id: 2,
            name: "Child 1",
            children: [{ id: 4, name: "Grandchild" }],
          },
          { id: 3, name: "Child 2" },
        ],
      },
    ];

    const list = treeToArray(tree);

    expect(list).toHaveLength(4);
    expect(list).toEqual(
      expect.arrayContaining([
        { id: 1, name: "Root" },
        { id: 2, name: "Child 1" },
        { id: 3, name: "Child 2" },
        { id: 4, name: "Grandchild" },
      ])
    );
  });
});
