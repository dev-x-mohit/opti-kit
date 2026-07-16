import { describe, it, expect } from "vitest";
import { copyToClipboard, getQueryParams } from "../dom";

describe("dom utilities", () => {
  it("copyToClipboard handles non-browser context gracefully", async () => {
    // In node environment, window and navigator are undefined
    const result = await copyToClipboard("test text");
    expect(result).toBe(false);
  });

  it("getQueryParams handles non-browser context or explicit URL input", () => {
    // Should fallback to empty object if no window is present and no URL is provided
    expect(getQueryParams()).toEqual({});

    // Should successfully parse explicit URL strings
    const url = "https://example.com/page?first=mohit&last=lakhara";
    expect(getQueryParams(url)).toEqual({
      first: "mohit",
      last: "lakhara",
    });

    const emptyUrl = "https://example.com/page";
    expect(getQueryParams(emptyUrl)).toEqual({});
  });
});
