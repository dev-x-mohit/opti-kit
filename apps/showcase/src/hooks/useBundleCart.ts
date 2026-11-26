import { useState, useEffect, useCallback } from 'react';

const BUNDLE_KEY = 'optikit-bundle-cart';

export function useBundleCart() {
  const [items, setItems] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['chunk', 'debounce', 'sha256'];
    try {
      const raw = localStorage.getItem(BUNDLE_KEY);
      if (!raw) return ['chunk', 'debounce', 'sha256'];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BUNDLE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage error
    }
    window.dispatchEvent(new CustomEvent('optikit-bundle-updated', { detail: items }));
  }, [items]);

  useEffect(() => {
    const sync = (e: Event) => {
      const custom = e as CustomEvent<string[]>;
      if (Array.isArray(custom.detail)) {
        setItems((prev) =>
          JSON.stringify(prev) === JSON.stringify(custom.detail) ? prev : custom.detail
        );
      }
    };
    window.addEventListener('optikit-bundle-updated', sync);
    return () => window.removeEventListener('optikit-bundle-updated', sync);
  }, []);

  const toggleItem = useCallback((name: string) => {
    setItems((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((x) => x !== name));
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  const hasItem = useCallback((name: string) => items.includes(name), [items]);

  // Estimate ~180 bytes gzipped per tree-shaken utility + 120B ESM overhead
  const estimatedBytes = items.length === 0 ? 0 : 120 + items.length * 185;
  const legacyBaselineBytes = items.length === 0 ? 0 : 71600; // ~71.6 KB Lodash full bundle

  return {
    items,
    toggleItem,
    removeItem,
    clearItems,
    hasItem,
    estimatedBytes,
    legacyBaselineBytes,
  };
}
