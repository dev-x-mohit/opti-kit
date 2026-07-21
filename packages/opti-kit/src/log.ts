declare const process: any;

export interface LoggerOptions {
  level?: "debug" | "info" | "warn" | "error";
  prefix?: string;
  colors?: boolean;
}

export interface Logger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

const levels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const isColorSupported = (): boolean => {
  if (typeof window !== "undefined") return false;
  if (typeof process === "undefined") return false;
  return (
    !!(process.stdout && process.stdout.isTTY) ||
    process.env.FORCE_COLOR === "1"
  );
};

export const ansi = {
  reset: (str: string) => `\x1b[0m${str}\x1b[0m`,
  bold: (str: string) => `\x1b[1m${str}\x1b[22m`,
  dim: (str: string) => `\x1b[2m${str}\x1b[22m`,
  red: (str: string) => `\x1b[31m${str}\x1b[39m`,
  green: (str: string) => `\x1b[32m${str}\x1b[39m`,
  yellow: (str: string) => `\x1b[33m${str}\x1b[39m`,
  blue: (str: string) => `\x1b[34m${str}\x1b[39m`,
  magenta: (str: string) => `\x1b[35m${str}\x1b[39m`,
  cyan: (str: string) => `\x1b[36m${str}\x1b[39m`,
  gray: (str: string) => `\x1b[90m${str}\x1b[39m`,
};

export const noColorAnsi = {
  reset: (str: string) => str,
  bold: (str: string) => str,
  dim: (str: string) => str,
  red: (str: string) => str,
  green: (str: string) => str,
  yellow: (str: string) => str,
  blue: (str: string) => str,
  magenta: (str: string) => str,
  cyan: (str: string) => str,
  gray: (str: string) => str,
};

/**
 * Creates a customizable console logger with level-based filtering and optional color styling.
 */
export function createLogger(options: LoggerOptions = {}): Logger {
  const {
    level = "info",
    prefix = "",
    colors = isColorSupported(),
  } = options;

  const minLevel = levels[level];
  const styler = colors ? ansi : noColorAnsi;

  function log(msgLevel: "debug" | "info" | "warn" | "error", args: any[]) {
    if (levels[msgLevel] < minLevel) return;

    const pre = prefix ? `[${prefix}] ` : "";

    let levelStr = msgLevel.toUpperCase();
    if (msgLevel === "debug") levelStr = styler.gray(levelStr);
    else if (msgLevel === "info") levelStr = styler.blue(levelStr);
    else if (msgLevel === "warn") levelStr = styler.yellow(levelStr);
    else if (msgLevel === "error") levelStr = styler.red(levelStr);

    const timestamp = styler.dim(new Date().toISOString());
    const finalPrefix = `${timestamp} ${levelStr} ${pre}`;

    if (msgLevel === "error") {
      console.error(finalPrefix, ...args);
    } else if (msgLevel === "warn") {
      console.warn(finalPrefix, ...args);
    } else {
      console.log(finalPrefix, ...args);
    }
  }

  return {
    debug: (...args) => log("debug", args),
    info: (...args) => log("info", args),
    warn: (...args) => log("warn", args),
    error: (...args) => log("error", args),
  };
}
