import { describe, it, expect } from "vitest";
import {
  randomUUID,
  randomColor,
  randomBoolean,
  randomFloat,
  randomItem,
} from "../random";

describe("Random Module", () => {
  it("randomUUID", () => {
    const uuid = randomUUID();
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  it("randomColor", () => {
    const color = randomColor();
    expect(color).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it("randomBoolean", () => {
    const bool = randomBoolean();
    expect(typeof bool).toBe("boolean");
  });

  it("randomFloat", () => {
    const float = randomFloat(1, 5);
    expect(float).toBeGreaterThanOrEqual(1);
    expect(float).toBeLessThan(5);
  });

  it("randomItem", () => {
    const arr = [1, 2, 3];
    const item = randomItem(arr);
    expect(arr).toContain(item);
    expect(randomItem([])).toBeUndefined();
  });
});
