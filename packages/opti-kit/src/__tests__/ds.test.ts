import { describe, it, expect } from "vitest";
import { Stack, Queue, PriorityQueue, BiMap } from "../ds";

describe("ds module - Stack", () => {
  it("pushes, pops, and peeks items correctly", () => {
    const stack = new Stack<number>();
    expect(stack.isEmpty()).toBe(true);

    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
    expect(stack.peek()).toBe(2);

    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeUndefined();
    expect(stack.isEmpty()).toBe(true);
  });
});

describe("ds module - Queue", () => {
  it("enqueues, dequeues, and peeks correctly", () => {
    const queue = new Queue<string>();
    expect(queue.isEmpty()).toBe(true);

    queue.enqueue("a");
    queue.enqueue("b");
    expect(queue.size()).toBe(2);
    expect(queue.peek()).toBe("a");

    expect(queue.dequeue()).toBe("a");
    expect(queue.dequeue()).toBe("b");
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.isEmpty()).toBe(true);
  });
});

describe("ds module - PriorityQueue", () => {
  it("extracts min value by default (min-heap)", () => {
    const pq = new PriorityQueue<number>();
    pq.insert(10);
    pq.insert(5);
    pq.insert(15);
    pq.insert(3);

    expect(pq.extract()).toBe(3);
    expect(pq.extract()).toBe(5);
    expect(pq.extract()).toBe(10);
    expect(pq.extract()).toBe(15);
    expect(pq.extract()).toBeUndefined();
  });

  it("supports custom comparator (max-heap)", () => {
    const pq = new PriorityQueue<number>((a, b) => b - a);
    pq.insert(10);
    pq.insert(5);
    pq.insert(15);

    expect(pq.extract()).toBe(15);
    expect(pq.extract()).toBe(10);
    expect(pq.extract()).toBe(5);
  });
});

describe("ds module - BiMap", () => {
  it("maintains bidirectional key-value relationships", () => {
    const bimap = new BiMap<string, number>();
    bimap.set("a", 1);
    bimap.set("b", 2);

    expect(bimap.getValue("a")).toBe(1);
    expect(bimap.getKey(2)).toBe("b");

    // Overwriting keys deletes old pairs
    bimap.set("a", 3);
    expect(bimap.getValue("a")).toBe(3);
    expect(bimap.getKey(1)).toBeUndefined(); // Deleted 1

    // Overwriting values deletes old keys
    bimap.set("c", 2);
    expect(bimap.getKey(2)).toBe("c");
    expect(bimap.getValue("b")).toBeUndefined(); // Deleted b
  });
});
