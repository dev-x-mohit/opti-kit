import { describe, it, expect } from "vitest";
import {
  joinPaths,
  parseUrl,
  stringifyQuery,
  buildUrl,
  isAbsoluteUrl,
  getBaseUrl,
  removeQuery,
  addQueryParam,
} from "../url";

describe("url utilities", () => {
  it("joinPaths", () => {
    expect(joinPaths("api", "users", "123")).toBe("api/users/123");
    expect(joinPaths("/api/", "/users/", "/123/")).toBe("api/users/123");
    expect(joinPaths("api", "", "users")).toBe("api/users");
  });

  it("parseUrl", () => {
    const parts = parseUrl(
      "https://example.com:8080/path/to/page?first=mohit&last=lakhara#section"
    );
    expect(parts.protocol).toBe("https:");
    expect(parts.host).toBe("example.com:8080");
    expect(parts.pathname).toBe("/path/to/page");
    expect(parts.query).toEqual({ first: "mohit", last: "lakhara" });
    expect(parts.hash).toBe("#section");
  });

  it("parseUrl fallback for invalid URL", () => {
    const invalid = parseUrl("not-a-valid-url");
    expect(invalid.protocol).toBe("");
    expect(invalid.pathname).toBe("not-a-valid-url");
    expect(invalid.query).toEqual({});
  });

  it("stringifyQuery", () => {
    expect(stringifyQuery({ a: 1, b: "two", c: true })).toBe("?a=1&b=two&c=true");
    expect(stringifyQuery({})).toBe("");
    expect(stringifyQuery({ a: undefined as any, b: null as any, c: 3 })).toBe("?c=3"); // ignores null/undefined
  });

  it("buildUrl", () => {
    expect(buildUrl("https://api.example.com/v1", { search: "test", page: 1 })).toBe("https://api.example.com/v1?search=test&page=1");
    expect(buildUrl("https://api.example.com/v1?existing=true", { search: "test" })).toBe("https://api.example.com/v1?existing=true&search=test");
    expect(buildUrl("https://api.example.com/v1#hash", { search: "test" })).toBe("https://api.example.com/v1?search=test#hash");
    expect(buildUrl("/local/path", { p: 1 })).toBe("/local/path?p=1");
    expect(buildUrl("/local/path")).toBe("/local/path");
  });

  it("isAbsoluteUrl", () => {
    expect(isAbsoluteUrl("https://example.com")).toBe(true);
    expect(isAbsoluteUrl("ftp://files.example.com")).toBe(true);
    expect(isAbsoluteUrl("mailto:user@example.com")).toBe(true);
    expect(isAbsoluteUrl("/api/users")).toBe(false);
    expect(isAbsoluteUrl("api/users")).toBe(false);
  });

  it("getBaseUrl", () => {
    expect(getBaseUrl("https://example.com:8080/path?query=1")).toBe("https://example.com:8080");
    expect(getBaseUrl("http://localhost/path")).toBe("http://localhost");
    expect(getBaseUrl("/relative/path")).toBe("");
  });

  it("removeQuery", () => {
    expect(removeQuery("https://example.com/path?query=1#hash")).toBe("https://example.com/path");
    expect(removeQuery("/api/users?id=5")).toBe("/api/users");
    expect(removeQuery("/api/users#section")).toBe("/api/users");
  });

  it("addQueryParam", () => {
    expect(addQueryParam("https://example.com/path", "page", 2)).toBe("https://example.com/path?page=2");
    expect(addQueryParam("https://example.com/path?sort=asc", "page", 2)).toBe("https://example.com/path?sort=asc&page=2");
    expect(addQueryParam("https://example.com/path", { page: 2, limit: 10 })).toBe("https://example.com/path?page=2&limit=10");
    
    // Relative paths fallback correctly
    expect(addQueryParam("/api/users", "page", 2)).toBe("/api/users?page=2");
    expect(addQueryParam("/api/users?sort=desc", { page: 2 })).toBe("/api/users?sort=desc&page=2");
  });
});
