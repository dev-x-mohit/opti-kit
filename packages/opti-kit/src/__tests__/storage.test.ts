import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { safeStorage } from "../storage";

describe("storage utilities", () => {
  let mockStore: Record<string, string> = {};

  beforeEach(() => {
    mockStore = {};
    // Stub the window object with localStorage mock
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => mockStore[key] || null,
        setItem: (key: string, value: string) => {
          mockStore[key] = value;
        },
        removeItem: (key: string) => {
          delete mockStore[key];
        },
        clear: () => {
          mockStore = {};
        },
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("setItem & getItem with objects", () => {
    safeStorage.setItem("user", { name: "Mohit" });
    expect(safeStorage.getItem("user")).toEqual({ name: "Mohit" });
  });

  it("getItem returns null for expired items", () => {
    safeStorage.setItem("session_token", "12345", -1000); // 1 sec expired in past
    expect(safeStorage.getItem("session_token")).toBeNull();
  });

  it("getItem returns null for missing keys", () => {
    expect(safeStorage.getItem("non_existent")).toBeNull();
  });

  it("removeItem", () => {
    safeStorage.setItem("data", 42);
    expect(safeStorage.getItem("data")).toBe(42);
    safeStorage.removeItem("data");
    expect(safeStorage.getItem("data")).toBeNull();
  });

  it("clear", () => {
    safeStorage.setItem("a", 1);
    safeStorage.setItem("b", 2);
    safeStorage.clear();
    expect(safeStorage.getItem("a")).toBeNull();
    expect(safeStorage.getItem("b")).toBeNull();
  });
});
