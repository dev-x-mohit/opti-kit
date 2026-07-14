import { describe, it, expect } from "vitest";
import { regex } from "../regex";

describe("regex patterns", () => {
  it("email regex", () => {
    expect(regex.email.test("test@domain.com")).toBe(true);
    expect(regex.email.test("invalid")).toBe(false);
  });

  it("url regex", () => {
    expect(regex.url.test("https://google.com")).toBe(true);
    expect(regex.url.test("invalid-url")).toBe(false);
  });

  it("uuid regex", () => {
    expect(regex.uuid.test("123e4567-e89b-12d3-a456-426614174000")).toBe(true);
    expect(regex.uuid.test("not-a-uuid")).toBe(false);
  });

  it("ipv4 regex", () => {
    expect(regex.ipv4.test("192.168.1.1")).toBe(true);
    expect(regex.ipv4.test("256.100.0.1")).toBe(false);
    expect(regex.ipv4.test("invalid-ip")).toBe(false);
  });

  it("creditCard regex", () => {
    expect(regex.creditCard.test("4111111111111111")).toBe(true); // Visa
    expect(regex.creditCard.test("1234567890")).toBe(false);
  });
});
