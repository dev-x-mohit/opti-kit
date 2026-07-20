/**
 * Safe client-side clipboard writer. Returns true if successful, false otherwise.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (
    typeof window === "undefined" ||
    typeof navigator === "undefined" ||
    !navigator.clipboard
  ) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns a key-value record of query parameters from a URL or window.location.
 */
export function getQueryParams(url?: string): Record<string, string> {
  if (typeof window === "undefined" && !url) {
    return {};
  }
  try {
    const searchString = url
      ? new URL(url).search
      : typeof window !== "undefined"
        ? window.location.search
        : "";
    const params = new URLSearchParams(searchString);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  } catch {
    return {};
  }
}

/**
 * Smoothly scrolls the window to the top.
 */
export function scrollToTop(): void {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/**
 * Gets the current scroll position of the window.
 */
export function getScrollPosition(): { x: number; y: number } {
  if (typeof window !== "undefined") {
    return {
      x: window.scrollX || window.pageXOffset,
      y: window.scrollY || window.pageYOffset,
    };
  }
  return { x: 0, y: 0 };
}

/**
 * Checks if a given HTML element is currently visible within the viewport.
 */
export function isElementVisible(el: HTMLElement | null): boolean {
  if (typeof window === "undefined" || !el) return false;
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


/**
 * Safely adds a CSS class to an element.
 */
export function addClass(el: HTMLElement | null, className: string): void {
  if (el && el.classList) {
    el.classList.add(className);
  }
}

/**
 * Safely removes a CSS class from an element.
 */
export function removeClass(el: HTMLElement | null, className: string): void {
  if (el && el.classList) {
    el.classList.remove(className);
  }
}

/**
 * Safely toggles a CSS class on an element.
 */
export function toggleClass(el: HTMLElement | null, className: string): void {
  if (el && el.classList) {
    el.classList.toggle(className);
  }
}

/**
 * Checks if an element has a specific CSS class.
 */
export function hasClass(el: HTMLElement | null, className: string): boolean {
  if (el && el.classList) {
    return el.classList.contains(className);
  }
  return false;
}

/**
 * Creates a DOM element with optional attributes and text content.
 * Returns null in non-browser environments.
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes?: Record<string, string>,
  text?: string
): HTMLElementTagNameMap[K] | null {
  if (typeof document === "undefined") return null;
  const el = document.createElement(tag);
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      el.setAttribute(key, value);
    }
  }
  if (text) {
    el.textContent = text;
  }
  return el;
}

/**
 * Safely removes an element from the DOM.
 */
export function removeElement(el: HTMLElement | null): void {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

/**
 * Sets a cookie in the browser environment.
 */
export function setCookie(name: string, value: string, days?: number): void {
  if (typeof document === "undefined") return;
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/`;
}

/**
 * Gets a cookie value by name in the browser environment.
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined" || !document.cookie) return null;
  const nameEQ = `${encodeURIComponent(name)}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

/**
 * Deletes a cookie by name in the browser environment.
 */
export function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=; Max-Age=-99999999; path=/`;
}

