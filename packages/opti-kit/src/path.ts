/**
 * Utilities for cross-platform path manipulation.
 */

export const sep = '/';

/**
 * Normalizes a path string, resolving '..' and '.'.
 */
export function normalize(path: string): string {
  const isAbsolute = path.startsWith('/');
  const trailingSlash = path && path[path.length - 1] === '/';

  let parts = path.split('/').filter(p => !!p && p !== '.');
  const resolvedParts: string[] = [];
  
  for (const part of parts) {
    if (part === '..') {
      if (resolvedParts.length > 0 && resolvedParts[resolvedParts.length - 1] !== '..') {
        resolvedParts.pop();
      } else if (!isAbsolute) {
        resolvedParts.push('..');
      }
    } else {
      resolvedParts.push(part);
    }
  }
  
  let res = resolvedParts.join('/');
  if (!res && !isAbsolute) {
    res = '.';
  }
  if (res && trailingSlash) {
    res += '/';
  }
  return (isAbsolute ? '/' : '') + res;
}

/**
 * Joins all given path segments together.
 */
export function join(...paths: string[]): string {
  return normalize(paths.filter(p => typeof p === 'string' && p.length > 0).join('/'));
}

/**
 * Gets the directory name of a path.
 */
export function dirname(path: string): string {
  if (path.length === 0) return '.';
  const hasRoot = path.startsWith('/');
  let end = -1;
  let matchedSlash = true;
  for (let i = path.length - 1; i >= 1; --i) {
    if (path[i] === '/') {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  
  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) return '//'; // keep double slash for UNC
  return path.slice(0, end);
}

/**
 * Gets the base name of a path.
 */
export function basename(path: string, ext?: string): string {
  let start = 0;
  let end = -1;
  let matchedSlash = true;

  for (let i = path.length - 1; i >= 0; --i) {
    if (path[i] === '/') {
      if (!matchedSlash) {
        start = i + 1;
        break;
      }
    } else if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
  }
  
  if (end === -1) return '';
  let base = path.slice(start, end);
  if (ext && base.endsWith(ext) && base.length > ext.length) {
    base = base.slice(0, base.length - ext.length);
  }
  return base;
}

/**
 * Gets the extension of a path.
 */
export function extname(path: string): string {
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  
  for (let i = path.length - 1; i >= 0; --i) {
    const code = path.charCodeAt(i);
    if (code === 47 /* '/' */) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /* '.' */) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  
  if (startDot === -1 || end === -1 || 
      preDotState === 0 || 
      (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
    return '';
  }
  return path.slice(startDot, end);
}

/**
 * Checks if a path is absolute.
 */
export function isAbsolute(path: string): boolean {
  return path.length > 0 && path.charCodeAt(0) === 47 /* '/' */;
}
