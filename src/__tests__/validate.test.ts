import { describe, it, expect } from "vitest";
import { isEmail, isUrl, isUuid, isPhone, isStrongPassword, isIP, isDateValid } from "../validate";

describe("validation utilities", () => {
  it("isEmail", () => {
    expect(isEmail("test@example.com")).toBe(true);
    expect(isEmail("user.name+tag@sub.domain.co")).toBe(true);
    expect(isEmail("invalid-email")).toBe(false);
    expect(isEmail("@missing-user.com")).toBe(false);
    expect(isEmail("user@")).toBe(false);
  });

  it("isUrl", () => {
    expect(isUrl("https://google.com")).toBe(true);
    expect(isUrl("http://localhost:3000/path?query=1")).toBe(true);
    expect(isUrl("ftp://file-server.net")).toBe(true);
    expect(isUrl("invalid-url")).toBe(false);
    expect(isUrl("google.com")).toBe(false); // missing protocol/scheme
  });

  it("isUuid", () => {
    expect(isUuid("123e4567-e89b-12d3-a456-426614174000")).toBe(true); // v1/v4 UUID
    expect(isUuid("123E4567-E89B-12D3-A456-426614174000")).toBe(true); // Uppercase check
    expect(isUuid("not-a-uuid")).toBe(false);
    expect(isUuid("123e4567-e89b-12d3-a456-42661417400")).toBe(false); // too short
  });

  it("isPhone", () => {
    expect(isPhone("+1 (555) 019-2834")).toBe(true);
    expect(isPhone("123-456-7890")).toBe(true);
    expect(isPhone("invalid-phone")).toBe(false);
  });

  it("isStrongPassword", () => {
    expect(isStrongPassword("P@ssw0rd123")).toBe(true);
    expect(isStrongPassword("weak")).toBe(false); // too short
    expect(isStrongPassword("password123")).toBe(false); // missing uppercase & special
  });

  it("isIP", () => {
    expect(isIP("192.168.1.1")).toBe(true);
    expect(isIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
    expect(isIP("invalid-ip")).toBe(false);
    expect(isIP("192.168.1.1", "6")).toBe(false);
  });

  it("isDateValid", () => {
    expect(isDateValid("2026-07-20T12:00:00Z")).toBe(true);
    expect(isDateValid("invalid-date")).toBe(false);
  });
});
