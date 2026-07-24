/**
 * Hashing and Encoding Utilities
 */

export function crc32(str: string): number {
  let crc = -1;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ -1) >>> 0;
}

export function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return hash >>> 0;
}

export function sdbm(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
  }
  return hash >>> 0;
}

declare const Buffer: any;

export function encodeBase64(str: string): string {
  if (typeof btoa !== 'undefined') return btoa(str);
  if (typeof Buffer !== 'undefined') return Buffer.from(str, 'binary').toString('base64');
  throw new Error('Base64 encoding not supported in this environment');
}

export function decodeBase64(str: string): string {
  if (typeof atob !== 'undefined') return atob(str);
  if (typeof Buffer !== 'undefined') return Buffer.from(str, 'base64').toString('binary');
  throw new Error('Base64 decoding not supported in this environment');
}

export function encodeHex(str: string): string {
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return hex;
}

export function decodeHex(hex: string): string {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

export function uuidV4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function generateNanoId(size = 21): string {
  const alphabet = '_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < size; i++) {
    id += alphabet[(Math.random() * alphabet.length) | 0];
  }
  return id;
}

export function checksum(str: string): number {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum = (sum + str.charCodeAt(i)) % 256;
  }
  return sum;
}
