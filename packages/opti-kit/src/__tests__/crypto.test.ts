import { describe, it, expect } from "vitest";
import {
  uuid,
  fnv1a,
  generateToken,
  sha256,
  sha1,
  sha384,
  sha512,
  hmacSha256,
  randomInt,
  cyrb53,
} from "../crypto";

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

  it("sha1 hashing", async () => {
    const digest = await sha1("hello world");
    expect(digest.length).toBe(40);
    expect(digest).toBe("2aae6c35c94fcfb415dbe95f408b9ce91ee846ed");
  });

  it("sha384 hashing", async () => {
    const digest = await sha384("hello world");
    expect(digest.length).toBe(96);
    expect(digest).toBe(
      "fdbd8e75a67f29f701a4e040385e2e23986303ea10239211af907fcbb83578b3e417cb71ce646efd0819dd8c088de1bd"
    );
  });

  it("sha512 hashing", async () => {
    const digest = await sha512("hello world");
    expect(digest.length).toBe(128);
    expect(digest).toBe(
      "309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f"
    );
  });

  it("hmacSha256 hashing", async () => {
    const digest = await hmacSha256("hello world", "secret-key");
    expect(digest.length).toBe(64);
    // Verified HMAC SHA-256 for "hello world" and "secret-key"
    expect(digest).toBe("095d5a21fe6d0646db223fdf3de6436bb8dfb2fab0b51677ecf6441fcf5f2a67");
  });

  it("randomInt", () => {
    const val = randomInt(10, 20);
    expect(val).toBeGreaterThanOrEqual(10);
    expect(val).toBeLessThanOrEqual(20);
    expect(Number.isInteger(val)).toBe(true);

    const val2 = randomInt(1, 1);
    expect(val2).toBe(1);
  });

  it("cyrb53 hashing", () => {
    const hash1 = cyrb53("hello world");
    const hash2 = cyrb53("hello world!");
    const hash3 = cyrb53("hello world", 12345);

    expect(hash1).not.toBe(hash2);
    expect(hash1).not.toBe(hash3);
    expect(typeof hash1).toBe("number");
    expect(hash1).toBeGreaterThan(0);
    expect(cyrb53("hello world")).toBe(hash1); // deterministic
  });
});
