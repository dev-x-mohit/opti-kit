import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  isBrowser,
  isServer,
  isChrome,
  isFirefox,
  isSafari,
  isEdge,
  isIOS,
  isAndroid,
  isMobile,
  isDesktop,
  isTouchDevice,
  supportsWebGL,
  supportsServiceWorker,
  getDevicePixelRatio,
  getPreferredLanguage,
  isOnline
} from "../browser";

describe("browser module - SSR/Server environment default tests", () => {
  // By default, since Vitest runs in Node.js (unless configured otherwise),
  // we check the server-side fallbacks first.
  it("detects server environment", () => {
    // In node.js, window/document are typically undefined unless mocked by jsdom.
    // If Vitest runs in jsdom, we can mock it. Let's see.
    const browser = typeof window !== "undefined";
    expect(isBrowser()).toBe(browser);
    expect(isServer()).toBe(!browser);
  });
});

describe("browser module - mocked environment tests", () => {
  const originalWindow = global.window;
  const originalNavigator = global.navigator;
  const originalDocument = global.document;

  beforeEach(() => {
    // Clean mock environment
    vi.stubGlobal("window", undefined);
    vi.stubGlobal("navigator", undefined);
    vi.stubGlobal("document", undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("handles server-side defaults cleanly", () => {
    expect(isBrowser()).toBe(false);
    expect(isServer()).toBe(true);
    expect(isChrome()).toBe(false);
    expect(isFirefox()).toBe(false);
    expect(isSafari()).toBe(false);
    expect(isEdge()).toBe(false);
    expect(isIOS()).toBe(false);
    expect(isAndroid()).toBe(false);
    expect(isMobile()).toBe(false);
    expect(isDesktop()).toBe(false);
    expect(isTouchDevice()).toBe(false);
    expect(supportsWebGL()).toBe(false);
    expect(supportsServiceWorker()).toBe(false);
    expect(getDevicePixelRatio()).toBe(1);
    expect(getPreferredLanguage()).toBe("en");
    expect(isOnline()).toBe(true);
  });

  it("detects browser environment when globals are defined", () => {
    const mockWindow = {} as any;
    const mockDocument = {} as any;
    vi.stubGlobal("window", mockWindow);
    vi.stubGlobal("document", mockDocument);

    expect(isBrowser()).toBe(true);
    expect(isServer()).toBe(false);
  });

  it("detects specific browsers from userAgent", () => {
    const mockWindow = {} as any;
    const mockDocument = {} as any;
    vi.stubGlobal("window", mockWindow);
    vi.stubGlobal("document", mockDocument);

    // Mock Chrome UA
    vi.stubGlobal("navigator", {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    });
    expect(isChrome()).toBe(true);
    expect(isFirefox()).toBe(false);
    expect(isSafari()).toBe(false);

    // Mock Firefox UA
    vi.stubGlobal("navigator", {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0"
    });
    expect(isFirefox()).toBe(true);
    expect(isChrome()).toBe(false);

    // Mock Safari UA
    vi.stubGlobal("navigator", {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15"
    });
    expect(isSafari()).toBe(true);
    expect(isChrome()).toBe(false);

    // Mock Edge UA
    vi.stubGlobal("navigator", {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
    });
    expect(isEdge()).toBe(true);
    expect(isChrome()).toBe(false);
  });

  it("detects touch and pixel ratios", () => {
    const mockWindow = { devicePixelRatio: 2 } as any;
    const mockDocument = {} as any;
    vi.stubGlobal("window", mockWindow);
    vi.stubGlobal("document", mockDocument);
    vi.stubGlobal("navigator", { maxTouchPoints: 5, language: "fr-FR", onLine: false } as any);

    expect(isTouchDevice()).toBe(true);
    expect(getDevicePixelRatio()).toBe(2);
    expect(getPreferredLanguage()).toBe("fr-FR");
    expect(isOnline()).toBe(false);
  });
});
