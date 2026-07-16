import { describe, it, expect } from "vitest";
import { joinPaths, parseUrl } from "../url";

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
});
