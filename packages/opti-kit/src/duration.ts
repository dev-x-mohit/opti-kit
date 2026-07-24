/**
 * Duration Utilities
 */

const DURATION_REGEX = /^(\d+d)?\s*(\d+h)?\s*(\d+m)?\s*(\d+s)?\s*(\d+ms)?$/;

export function parseDuration(duration: string): number {
  const match = duration.trim().match(DURATION_REGEX);
  if (!match) throw new Error('Invalid duration format');
  let ms = 0;
  if (match[1]) ms += parseInt(match[1]) * 86400000;
  if (match[2]) ms += parseInt(match[2]) * 3600000;
  if (match[3]) ms += parseInt(match[3]) * 60000;
  if (match[4]) ms += parseInt(match[4]) * 1000;
  if (match[5]) ms += parseInt(match[5]);
  return ms;
}

export function formatTimeDuration(ms: number): string {
  if (ms === 0) return '0ms';
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const msRem = ms % 1000;
  
  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0) parts.push(`${s}s`);
  if (msRem > 0) parts.push(`${msRem}ms`);
  return parts.join(' ');
}

export function addDurations(a: string, b: string): string {
  return formatTimeDuration(parseDuration(a) + parseDuration(b));
}

export function subDurations(a: string, b: string): string {
  return formatTimeDuration(Math.max(0, parseDuration(a) - parseDuration(b)));
}

export function isDurationLonger(a: string, b: string): boolean {
  return parseDuration(a) > parseDuration(b);
}

export function isDurationShorter(a: string, b: string): boolean {
  return parseDuration(a) < parseDuration(b);
}

export function msToTicks(ms: number, tickRate = 1000 / 60): number {
  return Math.floor(ms / tickRate);
}

export function ticksToMs(ticks: number, tickRate = 1000 / 60): number {
  return Math.floor(ticks * tickRate);
}
