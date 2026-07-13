import { describe, it, expect } from "vitest";
import { uuid, fnv1a } from "../crypto";

describe("crypto utilities", () => {
  it("uuid", () => {
    const id1 = uuid();
    const id2 = uuid();
    expect(id1).not.toBe(id2);
    // Standard UUID v4 regex validation
    expect(id1).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  it("fnv1a hashing", () => {
    const str1 = "hello world";
    const str2 = "hello world!";
    const hash1 = fnv1a(str1);
    const hash2 = fnv1a(str2);

    expect(hash1).not.toBe(hash2);
    expect(typeof hash1).toBe("number");
    expect(hash1).toBeGreaterThan(0);

    // Consistency check
    expect(fnv1a(str1)).toBe(hash1);
  });
});
