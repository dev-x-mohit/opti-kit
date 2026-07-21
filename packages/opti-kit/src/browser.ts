/**
 * Safe client-side environment and browser feature detection utilities.
 * All functions are SSR-safe and will not throw when run on the server.
 */

const getUA = (): string => {
  if (typeof navigator === "undefined") return "";
  return navigator.userAgent || "";
};

/**
 * Checks if the code is running in a browser environment.
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/**
 * Checks if the code is running in a server environment (e.g. Node.js, SSR).
 */
export function isServer(): boolean {
  return !isBrowser();
}

/**
 * Checks if the current browser is Google Chrome.
 */
export function isChrome(): boolean {
  if (isServer()) return false;
  const ua = getUA();
  return /Chrome|Chromium/i.test(ua) && !/Edge|Edg|OPR|Opera/i.test(ua);
}

/**
 * Checks if the current browser is Mozilla Firefox.
 */
export function isFirefox(): boolean {
  if (isServer()) return false;
  return /Firefox|FxiOS/i.test(getUA());
}

/**
 * Checks if the current browser is Apple Safari.
 */
export function isSafari(): boolean {
  if (isServer()) return false;
  const ua = getUA();
  return /Safari/i.test(ua) && !/Chrome|Chromium|Android/i.test(ua);
}

/**
 * Checks if the current browser is Microsoft Edge.
 */
export function isEdge(): boolean {
  if (isServer()) return false;
  return /Edge|Edg/i.test(getUA());
}

/**
 * Checks if the current operating system is iOS.
 */
export function isIOS(): boolean {
  if (isServer()) return false;
  return /iPad|iPhone|iPod/.test(getUA()) && !(window as any).MSStream;
}

/**
 * Checks if the current operating system is Android.
 */
export function isAndroid(): boolean {
  if (isServer()) return false;
  return /Android/i.test(getUA());
}

/**
 * Checks if the device is a mobile device (phone or tablet).
 */
export function isMobile(): boolean {
  if (isServer()) return false;
  const ua = getUA();
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || isIOS();
}

/**
 * Checks if the device is a desktop.
 */
export function isDesktop(): boolean {
  if (isServer()) return false;
  return !isMobile();
}

/**
 * Checks if the device supports touch interaction.
 */
export function isTouchDevice(): boolean {
  if (isServer()) return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/**
 * Checks if the browser supports WebGL.
 */
export function supportsWebGL(): boolean {
  if (isServer()) return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

/**
 * Checks if the browser supports Service Workers.
 */
export function supportsServiceWorker(): boolean {
  if (isServer()) return false;
  return "serviceWorker" in navigator;
}

/**
 * Returns the device pixel ratio (DPR). Falls back to 1 on the server.
 */
export function getDevicePixelRatio(): number {
  if (isServer()) return 1;
  return window.devicePixelRatio || 1;
}

/**
 * Returns the preferred language code of the client. Falls back to "en" on the server.
 */
export function getPreferredLanguage(): string {
  if (isServer()) return "en";
  return navigator.language || (navigator as any).userLanguage || "en";
}

/**
 * Checks if the client has an active internet connection. Falls back to true on the server.
 */
export function isOnline(): boolean {
  if (isServer()) return true;
  return navigator.onLine !== undefined ? navigator.onLine : true;
}
