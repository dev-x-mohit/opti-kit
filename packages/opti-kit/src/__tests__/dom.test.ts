import { describe, it, expect, vi } from "vitest";
import {
  copyToClipboard,
  getQueryParams,
  scrollToTop,
  getScrollPosition,
  isElementVisible,
  setCookie,
  getCookie,
  deleteCookie,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  createElement,
  removeElement,
} from "../dom";

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

  it("scrollToTop handles non-browser context gracefully", () => {
    expect(() => scrollToTop()).not.toThrow();
  });

  it("getScrollPosition returns defaults in non-browser context", () => {
    expect(getScrollPosition()).toEqual({ x: 0, y: 0 });
  });

  it("isElementVisible handles non-browser context gracefully", () => {
    expect(isElementVisible({} as any)).toBe(false);
    expect(isElementVisible(null)).toBe(false);
  });

  it("cookie utilities handle non-browser context gracefully", () => {
    expect(() => setCookie("test", "value")).not.toThrow();
    expect(getCookie("test")).toBeNull();
    expect(() => deleteCookie("test")).not.toThrow();
  });

  it("mocked browser cookies", () => {
    const origDoc = global.document;
    try {
      global.document = { cookie: "" } as any;
      
      setCookie("user", "mohit");
      expect(document.cookie).toContain("user=mohit");
      
      document.cookie = "user=mohit; theme=dark";
      expect(getCookie("theme")).toBe("dark");
      expect(getCookie("user")).toBe("mohit");
      expect(getCookie("invalid")).toBeNull();

      deleteCookie("user");
      expect(document.cookie).toContain("Max-Age=-99999999");
    } finally {
      if (origDoc !== undefined) {
        global.document = origDoc;
      } else {
        delete (global as any).document;
      }
    }
  });


  describe("class and element utilities", () => {
    it("handles null elements gracefully", () => {
      expect(() => addClass(null, "active")).not.toThrow();
      expect(() => removeClass(null, "active")).not.toThrow();
      expect(() => toggleClass(null, "active")).not.toThrow();
      expect(hasClass(null, "active")).toBe(false);
      expect(() => removeElement(null)).not.toThrow();
    });

    it("createElement handles non-browser context", () => {
      // document should be undefined here, so it should return null
      expect(createElement("div")).toBeNull();
    });

    it("works with mocked HTMLElement", () => {
      const mockElement = {
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
          toggle: vi.fn(),
          contains: vi.fn().mockReturnValue(true),
        },
        parentNode: {
          removeChild: vi.fn(),
        },
      } as any;

      addClass(mockElement, "test");
      expect(mockElement.classList.add).toHaveBeenCalledWith("test");

      removeClass(mockElement, "test");
      expect(mockElement.classList.remove).toHaveBeenCalledWith("test");

      toggleClass(mockElement, "test");
      expect(mockElement.classList.toggle).toHaveBeenCalledWith("test");

      expect(hasClass(mockElement, "test")).toBe(true);

      removeElement(mockElement);
      expect(mockElement.parentNode.removeChild).toHaveBeenCalledWith(mockElement);
    });

    it("createElement works with mocked document", () => {
      const mockEl = {
        setAttribute: vi.fn(),
        textContent: "",
      };
      global.document = {
        createElement: vi.fn().mockReturnValue(mockEl),
      } as any;

      const el = createElement("div", { id: "test" }, "Hello");
      expect(document.createElement).toHaveBeenCalledWith("div");
      expect(mockEl.setAttribute).toHaveBeenCalledWith("id", "test");
      expect(mockEl.textContent).toBe("Hello");
      expect(el).toBe(mockEl);

      delete (global as any).document;
    });
  });
});
