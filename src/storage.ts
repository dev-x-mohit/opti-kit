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
};
