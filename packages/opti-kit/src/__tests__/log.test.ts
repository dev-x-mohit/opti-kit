import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createLogger, ansi, noColorAnsi } from "../log";

describe("log module", () => {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  beforeEach(() => {
    console.log = vi.fn();
    console.warn = vi.fn();
    console.error = vi.fn();
  });

  afterEach(() => {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
  });

  it("ansi color formatting wrappers", () => {
    expect(ansi.red("hello")).toBe("\x1b[31mhello\x1b[39m");
    expect(noColorAnsi.red("hello")).toBe("hello");
  });

  it("logger respects minimum logging level", () => {
    const logger = createLogger({ level: "warn", colors: false });

    logger.debug("test debug");
    logger.info("test info");
    expect(console.log).not.toHaveBeenCalled();

    logger.warn("test warn");
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("WARN"),
      "test warn"
    );

    logger.error("test error");
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("ERROR"),
      "test error"
    );
  });

  it("logger supports prefix", () => {
    const logger = createLogger({ level: "info", prefix: "APP", colors: false });
    logger.info("hello");
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("[APP]"),
      "hello"
    );
  });
});
