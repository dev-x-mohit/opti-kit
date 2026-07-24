/**
 * Byte Size Utilities
 */

const KILOBYTE = 1024;
const MEGABYTE = KILOBYTE * 1024;
const GIGABYTE = MEGABYTE * 1024;
const TERABYTE = GIGABYTE * 1024;

export function formatByteSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function parseBytes(sizeStr: string): number {
  const match = sizeStr.trim().match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)?$/);
  if (!match) throw new Error('Invalid byte size format');
  const val = parseFloat(match[1]);
  const unit = match[2] ? match[2].toUpperCase() : 'B';
  if (unit === 'B' || unit === 'BYTES') return val;
  if (unit === 'KB') return val * KILOBYTE;
  if (unit === 'MB') return val * MEGABYTE;
  if (unit === 'GB') return val * GIGABYTE;
  if (unit === 'TB') return val * TERABYTE;
  throw new Error('Unsupported unit');
}

export function bytesToKb(bytes: number): number { return bytes / KILOBYTE; }
export function bytesToMb(bytes: number): number { return bytes / MEGABYTE; }
export function bytesToGb(bytes: number): number { return bytes / GIGABYTE; }
