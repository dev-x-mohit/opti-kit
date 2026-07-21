import { describe, it, expect, vi, beforeEach } from "vitest";
import { registerShortcut, isKeyPressed } from "../keyboard";

describe("keyboard module", () => {
  it("registerShortcut ignores on server side if window is missing", () => {
    // If we mock window as undefined:
    const originalWindow = global.window;
    try {
      (global as any).window = undefined;
      const unbind = registerShortcut("ctrl+k", () => {});
      expect(typeof unbind).toBe("function");
      unbind(); // Should not throw
    } finally {
      global.window = originalWindow;
    }
  });

  it("isKeyPressed returns false on server", () => {
    const originalWindow = global.window;
    try {
      (global as any).window = undefined;
      expect(isKeyPressed("a")).toBe(false);
    } finally {
      global.window = originalWindow;
    }
  });

  it("registers keyboard listeners and fires callbacks", () => {
    const mockTarget = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    } as unknown as EventTarget;

    const callback = vi.fn();
    const unbind = registerShortcut("ctrl+alt+s", callback, {
      target: mockTarget,
      preventDefault: false,
      stopPropagation: false
    });

    expect(mockTarget.addEventListener).toHaveBeenCalledWith("keydown", expect.any(Function));

    // Get the registered handler function
    const handler = vi.mocked(mockTarget.addEventListener).mock.calls[0][1] as Function;

    // Simulate keydown event with matching modifiers and key
    const matchingEvent = {
      key: "s",
      ctrlKey: true,
      altKey: true,
      shiftKey: false,
      metaKey: false,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn()
    };

    handler(matchingEvent);
    expect(callback).toHaveBeenCalledTimes(1);

    // Simulate non-matching modifiers
    const nonMatchingEvent = {
      key: "s",
      ctrlKey: false,
      altKey: true,
      shiftKey: false,
      metaKey: false,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn()
    };

    handler(nonMatchingEvent);
    expect(callback).toHaveBeenCalledTimes(1); // No new calls

    unbind();
    expect(mockTarget.removeEventListener).toHaveBeenCalledWith("keydown", handler);
  });
});
