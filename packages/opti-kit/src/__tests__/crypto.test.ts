import { describe, it, expect } from "vitest";
import { uuid, fnv1a, generateToken, sha256 } from "../crypto";

describe("crypto utilities", () => {
  it("uuid", () => {
    const id1 = uuid();
    const id2 = uuid();
    expect(id1).not.toBe(id2);
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
    expect(fnv1a(str1)).toBe(hash1);
  });

  it("generateToken", () => {
    const t1 = generateToken(16);
    const t2 = generateToken(32);
    expect(t1.length).toBe(16);
    expect(t2.length).toBe(32);
    expect(t1).not.toBe(t2);
  });

  it("sha256 hashing", async () => {
    const digest = await sha256("hello world");
    expect(digest.length).toBe(64); // SHA-256 is 64 hex chars
    expect(digest).toBe("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9");
  });
});
