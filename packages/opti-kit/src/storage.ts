interface StoragePayload {
  value: any;
  expiry?: number;
}

const getStorage = (type: "local" | "session"): Storage | null => {
  if (typeof window === "undefined") return null;
  try {
    return type === "session" ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
};

/**
 * An isomorphic wrapper for LocalStorage and SessionStorage supporting JSON serialization,
 * expiration timers, and graceful fallback in environments without storage capabilities (like SSR).
 */
export const safeStorage = {
  /**
   * Sets a value in storage with an optional expiration time in milliseconds.
   */
  setItem(
    key: string,
    value: any,
    expireMs?: number,
    type: "local" | "session" = "local"
  ): void {
    const storage = getStorage(type);
    if (!storage) return;

    const payload: StoragePayload = { value };
    if (expireMs !== undefined) {
      payload.expiry = Date.now() + expireMs;
    }

    try {
      storage.setItem(key, JSON.stringify(payload));
    } catch (error) {
      console.warn("safeStorage.setItem failed:", error);
    }
  },

  /**
   * Retrieves a value from storage, automatically parsing JSON. Returns null if expired or missing.
   */
  getItem(key: string, type: "local" | "session" = "local"): any {
    const storage = getStorage(type);
    if (!storage) return null;

    const raw = storage.getItem(key);
    if (!raw) return null;

    try {
      const payload: StoragePayload = JSON.parse(raw);
      if (payload.expiry !== undefined && Date.now() > payload.expiry) {
        storage.removeItem(key);
        return null;
      }
      return payload.value;
    } catch {
      return raw; // Fallback if data is not JSON string
    }
  },

  /**
   * Removes a specific item from storage.
   */
  removeItem(key: string, type: "local" | "session" = "local"): void {
    const storage = getStorage(type);
    if (!storage) return;
    storage.removeItem(key);
  },

  /**
   * Clears all items in the designated storage space.
   */
  clear(type: "local" | "session" = "local"): void {
    const storage = getStorage(type);
    if (!storage) return;
    storage.clear();
  },

  /**
   * Returns all keys currently in storage.
   */
  getKeys(type: "local" | "session" = "local"): string[] {
    const storage = getStorage(type);
    if (!storage) return [];
    const keys: string[] = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key) keys.push(key);
    }
    return keys;
  },

  /**
   * Checks if a key exists in storage.
   */
  hasItem(key: string, type: "local" | "session" = "local"): boolean {
    const storage = getStorage(type);
    if (!storage) return false;
    return storage.getItem(key) !== null;
  },

  /**
   * Retrieves an item from storage and immediately removes it.
   */
  pullItem(key: string, type: "local" | "session" = "local"): any {
    const value = this.getItem(key, type);
    this.removeItem(key, type);
    return value;
  },

  /**
   * Treats the stored item as an array and pushes a new value to it.
   */
  pushItem(key: string, value: any, type: "local" | "session" = "local"): void {
    const current = this.getItem(key, type);
    const arr = Array.isArray(current) ? current : [];
    arr.push(value);
    this.setItem(key, arr, undefined, type);
  },

  /**
   * Treats the stored item as an array and pops the last value from it.
   */
  popItem(key: string, type: "local" | "session" = "local"): any {
    const current = this.getItem(key, type);
    if (!Array.isArray(current) || current.length === 0) return undefined;
    const value = current.pop();
    this.setItem(key, current, undefined, type);
    return value;
  },

  /**
   * Calculates the approximate size of the storage in bytes.
   */
  getSize(type: "local" | "session" = "local"): number {
    const storage = getStorage(type);
    if (!storage) return 0;
    let size = 0;
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key) {
        size += key.length + (storage.getItem(key)?.length || 0);
      }
    }
    return size;
  },
};
