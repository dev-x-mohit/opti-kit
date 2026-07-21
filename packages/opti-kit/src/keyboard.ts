export interface ShortcutOptions {
  target?: EventTarget;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

const pressedKeys = new Set<string>();

if (typeof window !== "undefined" && typeof window.addEventListener !== "undefined") {
  window.addEventListener("keydown", (e) => {
    pressedKeys.add(e.key.toLowerCase());
  });
  window.addEventListener("keyup", (e) => {
    pressedKeys.delete(e.key.toLowerCase());
  });
  window.addEventListener("blur", () => {
    pressedKeys.clear(); // Clear all keys if window loses focus to prevent sticky key bugs
  });
}

/**
 * Registers a global or target-specific keyboard shortcut listener.
 * Supports combinations like "ctrl+alt+k", "cmd+shift+p", or plain key like "enter".
 * Returns an unregister function. Fully SSR-safe.
 */
export function registerShortcut(
  shortcut: string,
  callback: (e: KeyboardEvent) => void,
  options: ShortcutOptions = {}
): () => void {
  const {
    target = typeof window !== "undefined" ? window : undefined,
    preventDefault = true,
    stopPropagation = true,
  } = options;

  if (!target || typeof (target as any).addEventListener !== "function") {
    return () => {};
  }

  const parts = shortcut
    .toLowerCase()
    .split("+")
    .map((p) => p.trim());
  const modifiers = {
    ctrl: parts.includes("ctrl"),
    alt: parts.includes("alt"),
    shift: parts.includes("shift"),
    meta:
      parts.includes("meta") ||
      parts.includes("cmd") ||
      parts.includes("command"),
  };

  const modifierNames = ["ctrl", "alt", "shift", "meta", "cmd", "command"];
  const triggerKey = parts.find((p) => !modifierNames.includes(p));

  if (!triggerKey) return () => {};

  const handler = (e: Event) => {
    const ke = e as KeyboardEvent;
    const actualKey = ke.key.toLowerCase();

    const matchesModifier =
      ke.ctrlKey === modifiers.ctrl &&
      ke.altKey === modifiers.alt &&
      ke.shiftKey === modifiers.shift &&
      ke.metaKey === modifiers.meta;

    if (matchesModifier && actualKey === triggerKey) {
      if (preventDefault) ke.preventDefault();
      if (stopPropagation) ke.stopPropagation();
      callback(ke);
    }
  };

  target.addEventListener("keydown", handler);
  return () => {
    target.removeEventListener("keydown", handler);
  };
}

/**
 * Checks if a specific keyboard key is currently pressed down.
 * Always returns false in SSR/server environments.
 */
export function isKeyPressed(key: string): boolean {
  if (typeof window === "undefined") return false;
  return pressedKeys.has(key.toLowerCase());
}
