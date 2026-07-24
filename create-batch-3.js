const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'packages/opti-kit/src');

const files = {
  'ml.ts': `/**
 * Machine Learning and Statistics Utilities
 */

export function sigmoid(t: number): number {
  return 1 / (1 + Math.exp(-t));
}

export function relu(t: number): number {
  return Math.max(0, t);
}

export function leakyRelu(t: number, alpha = 0.01): number {
  return t > 0 ? t : alpha * t;
}

export function tanh(t: number): number {
  return Math.tanh(t);
}

export function softmax(arr: number[]): number[] {
  const max = Math.max(...arr);
  const exps = arr.map((x) => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((x) => x / sum);
}

export function minMaxScaler(arr: number[]): number[] {
  if (arr.length === 0) return [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  if (min === max) return arr.map(() => 0.5);
  return arr.map((x) => (x - min) / (max - min));
}

export function zScoreNormalize(arr: number[]): number[] {
  if (arr.length === 0) return [];
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length;
  const stdDev = Math.sqrt(variance);
  if (stdDev === 0) return arr.map(() => 0);
  return arr.map((x) => (x - mean) / stdDev);
}

export function meanSquaredError(actual: number[], predicted: number[]): number {
  if (actual.length !== predicted.length) throw new Error('Lengths must match');
  let sum = 0;
  for (let i = 0; i < actual.length; i++) {
    sum += Math.pow(actual[i] - predicted[i], 2);
  }
  return sum / actual.length;
}

export function rootMeanSquaredError(actual: number[], predicted: number[]): number {
  return Math.sqrt(meanSquaredError(actual, predicted));
}

export function meanAbsoluteError(actual: number[], predicted: number[]): number {
  if (actual.length !== predicted.length) throw new Error('Lengths must match');
  let sum = 0;
  for (let i = 0; i < actual.length; i++) {
    sum += Math.abs(actual[i] - predicted[i]);
  }
  return sum / actual.length;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error('Lengths must match');
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function euclideanDistance(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error('Lengths must match');
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(sum);
}
`,

  'nlp.ts': `/**
 * Natural Language Processing Utilities
 */

export function tokenizeWords(text: string): string[] {
  return text.toLowerCase().match(/\\b\\w+\\b/g) || [];
}

export function tokenizeSentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) || [text.trim()];
}

const DEFAULT_STOP_WORDS = new Set(['the', 'is', 'in', 'and', 'to', 'of', 'it', 'that', 'on', 'for', 'with', 'as']);

export function removeStopWords(words: string[], stopWords = DEFAULT_STOP_WORDS): string[] {
  return words.filter((w) => !stopWords.has(w.toLowerCase()));
}

export function generateNGrams(words: string[], n: number): string[][] {
  const nGrams: string[][] = [];
  for (let i = 0; i <= words.length - n; i++) {
    nGrams.push(words.slice(i, i + n));
  }
  return nGrams;
}

export function levenshteinDistance(a: string, b: string): number {
  const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + indicator
      );
    }
  }
  return matrix[a.length][b.length];
}

export function hammingDistance(a: string, b: string): number {
  if (a.length !== b.length) throw new Error('Strings must be of equal length');
  let dist = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) dist++;
  }
  return dist;
}

export function jaccardSimilarity(a: string[], b: string[]): number {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

export function soundex(word: string): string {
  if (!word) return '';
  const map: Record<string, string> = {
    b: '1', f: '1', p: '1', v: '1',
    c: '2', g: '2', j: '2', k: '2', q: '2', s: '2', x: '2', z: '2',
    d: '3', t: '3',
    l: '4',
    m: '5', n: '5',
    r: '6',
  };
  const chars = word.toLowerCase().split('');
  let res = chars[0].toUpperCase();
  for (let i = 1; i < chars.length && res.length < 4; i++) {
    const c = chars[i];
    const code = map[c];
    if (code && code !== res[res.length - 1] && code !== map[chars[i - 1]]) {
      res += code;
    }
  }
  return res.padEnd(4, '0');
}

export function extractHashtags(text: string): string[] {
  return text.match(/#[a-z0-9_]+/gi) || [];
}

export function extractMentions(text: string): string[] {
  return text.match(/@[a-z0-9_]+/gi) || [];
}
`,

  'hash.ts': `/**
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

export function base64Encode(str: string): string {
  if (typeof btoa !== 'undefined') return btoa(str);
  if (typeof Buffer !== 'undefined') return Buffer.from(str, 'binary').toString('base64');
  throw new Error('Base64 encoding not supported in this environment');
}

export function base64Decode(str: string): string {
  if (typeof atob !== 'undefined') return atob(str);
  if (typeof Buffer !== 'undefined') return Buffer.from(str, 'base64').toString('binary');
  throw new Error('Base64 decoding not supported in this environment');
}

export function hexEncode(str: string): string {
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return hex;
}

export function hexDecode(hex: string): string {
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
`,

  'deep.ts': `/**
 * Deep Object Operations
 */

export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const value = (obj as any)[name];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}

export function deepSeal<T extends object>(obj: T): T {
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const value = (obj as any)[name];
    if (value && typeof value === 'object') {
      deepSeal(value);
    }
  }
  return Object.seal(obj);
}

export function flattenObject(obj: Record<string, any>, prefix = ''): Record<string, any> {
  let res: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      Object.assign(res, flattenObject(v, pre + k));
    } else {
      res[pre + k] = v;
    }
  }
  return res;
}

export function unflattenObject(obj: Record<string, any>): Record<string, any> {
  const res: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    const keys = k.split('.');
    let cur = res;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!cur[keys[i]]) cur[keys[i]] = {};
      cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = v;
  }
  return res;
}

export function deepMapKeys(obj: any, fn: (key: string) => string): any {
  if (Array.isArray(obj)) return obj.map((v) => deepMapKeys(v, fn));
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[fn(key)] = deepMapKeys(obj[key], fn);
      return acc;
    }, {} as any);
  }
  return obj;
}

export function deepMapValues(obj: any, fn: (val: any) => any): any {
  if (Array.isArray(obj)) return obj.map((v) => deepMapValues(v, fn));
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = deepMapValues(obj[key], fn);
      return acc;
    }, {} as any);
  }
  return fn(obj);
}

export function deepDiff(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
  const diff: Record<string, any> = {};
  for (const key of Object.keys(obj1)) {
    if (obj1[key] !== obj2[key]) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        const subDiff = deepDiff(obj1[key], obj2[key]);
        if (Object.keys(subDiff).length > 0) diff[key] = subDiff;
      } else {
        diff[key] = obj2[key];
      }
    }
  }
  for (const key of Object.keys(obj2)) {
    if (!(key in obj1)) diff[key] = obj2[key];
  }
  return diff;
}

export function deepOmit(obj: any, keysToOmit: string[]): any {
  if (Array.isArray(obj)) return obj.map((v) => deepOmit(v, keysToOmit));
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      if (!keysToOmit.includes(key)) {
        acc[key] = deepOmit(obj[key], keysToOmit);
      }
      return acc;
    }, {} as any);
  }
  return obj;
}
`,

  'fsm.ts': `/**
 * Finite State Machine Utilities
 */

export interface MachineConfig {
  initial: string;
  states: Record<string, {
    on?: Record<string, string>;
  }>;
}

export class StateMachine {
  private state: string;
  private history: string[] = [];

  constructor(private config: MachineConfig) {
    this.state = config.initial;
    this.history.push(this.state);
  }

  transition(event: string): boolean {
    const currentStateConfig = this.config.states[this.state];
    if (currentStateConfig && currentStateConfig.on && currentStateConfig.on[event]) {
      this.state = currentStateConfig.on[event];
      this.history.push(this.state);
      return true;
    }
    return false;
  }

  canTransition(event: string): boolean {
    const currentStateConfig = this.config.states[this.state];
    return !!(currentStateConfig && currentStateConfig.on && currentStateConfig.on[event]);
  }

  getState(): string {
    return this.state;
  }

  getHistory(): string[] {
    return [...this.history];
  }
}

export function createMachine(config: MachineConfig): StateMachine {
  return new StateMachine(config);
}

export function transitionState(machine: StateMachine, event: string): boolean {
  return machine.transition(event);
}

export function canTransition(machine: StateMachine, event: string): boolean {
  return machine.canTransition(event);
}

export function getMachineState(machine: StateMachine): string {
  return machine.getState();
}

export function getMachineHistory(machine: StateMachine): string[] {
  return machine.getHistory();
}
`,

  'image.ts': `/**
 * Image Processing Primitives (for pixel arrays [r,g,b,a,...])
 */

export function applyBrightness(pixels: number[], amount: number): number[] {
  const result = new Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    result[i] = Math.min(255, Math.max(0, pixels[i] + amount));
    result[i + 1] = Math.min(255, Math.max(0, pixels[i + 1] + amount));
    result[i + 2] = Math.min(255, Math.max(0, pixels[i + 2] + amount));
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function applyContrast(pixels: number[], amount: number): number[] {
  const result = new Array(pixels.length);
  const factor = (259 * (amount + 255)) / (255 * (259 - amount));
  for (let i = 0; i < pixels.length; i += 4) {
    result[i] = Math.min(255, Math.max(0, factor * (pixels[i] - 128) + 128));
    result[i + 1] = Math.min(255, Math.max(0, factor * (pixels[i + 1] - 128) + 128));
    result[i + 2] = Math.min(255, Math.max(0, factor * (pixels[i + 2] - 128) + 128));
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function applyGrayscale(pixels: number[]): number[] {
  const result = new Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const avg = 0.3 * pixels[i] + 0.59 * pixels[i + 1] + 0.11 * pixels[i + 2];
    result[i] = avg;
    result[i + 1] = avg;
    result[i + 2] = avg;
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function applyInvert(pixels: number[]): number[] {
  const result = new Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    result[i] = 255 - pixels[i];
    result[i + 1] = 255 - pixels[i + 1];
    result[i + 2] = 255 - pixels[i + 2];
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function applySepia(pixels: number[]): number[] {
  const result = new Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    result[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
    result[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
    result[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function applyThreshold(pixels: number[], threshold: number): number[] {
  const result = new Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const avg = 0.3 * pixels[i] + 0.59 * pixels[i + 1] + 0.11 * pixels[i + 2];
    const v = avg >= threshold ? 255 : 0;
    result[i] = v;
    result[i + 1] = v;
    result[i + 2] = v;
    result[i + 3] = pixels[i + 3];
  }
  return result;
}

export function convolve2D(matrix: number[][], kernel: number[][]): number[][] {
  const kw = kernel[0].length, kh = kernel.length;
  const mw = matrix[0].length, mh = matrix.length;
  const result = Array(mh).fill(null).map(() => Array(mw).fill(0));
  
  const padH = Math.floor(kh / 2);
  const padW = Math.floor(kw / 2);

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      let sum = 0;
      for (let ky = 0; ky < kh; ky++) {
        for (let kx = 0; kx < kw; kx++) {
          const my = y + ky - padH;
          const mx = x + kx - padW;
          if (my >= 0 && my < mh && mx >= 0 && mx < mw) {
            sum += matrix[my][mx] * kernel[ky][kx];
          }
        }
      }
      result[y][x] = sum;
    }
  }
  return result;
}

export function rgbToHexArray(pixels: number[]): string[] {
  const hex: string[] = [];
  for (let i = 0; i < pixels.length; i += 4) {
    hex.push('#' + [pixels[i], pixels[i+1], pixels[i+2]].map(x => {
      const h = Math.round(x).toString(16);
      return h.length === 1 ? '0' + h : h;
    }).join(''));
  }
  return hex;
}
`,

  'duration.ts': `/**
 * Duration Utilities
 */

const DURATION_REGEX = /^(\\d+d)?\\s*(\\d+h)?\\s*(\\d+m)?\\s*(\\d+s)?\\s*(\\d+ms)?$/;

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

export function formatDuration(ms: number): string {
  if (ms === 0) return '0ms';
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const msRem = ms % 1000;
  
  const parts = [];
  if (d > 0) parts.push(\`\${d}d\`);
  if (h > 0) parts.push(\`\${h}h\`);
  if (m > 0) parts.push(\`\${m}m\`);
  if (s > 0) parts.push(\`\${s}s\`);
  if (msRem > 0) parts.push(\`\${msRem}ms\`);
  return parts.join(' ');
}

export function addDurations(a: string, b: string): string {
  return formatDuration(parseDuration(a) + parseDuration(b));
}

export function subDurations(a: string, b: string): string {
  return formatDuration(Math.max(0, parseDuration(a) - parseDuration(b)));
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
`,

  'finance.ts': `/**
 * Financial Math Utilities
 */

export function calculateSimpleInterest(principal: number, rate: number, time: number): number {
  return (principal * rate * time) / 100;
}

export function calculateCompoundInterest(principal: number, rate: number, time: number, compoundingsPerYear = 1): number {
  return principal * Math.pow(1 + (rate / 100 / compoundingsPerYear), compoundingsPerYear * time) - principal;
}

export function calculatePMT(ratePerPeriod: number, numPeriods: number, presentValue: number, futureValue = 0, type = 0): number {
  if (ratePerPeriod === 0) return -(presentValue + futureValue) / numPeriods;
  const pvif = Math.pow(1 + ratePerPeriod, numPeriods);
  let pmt = ratePerPeriod / (pvif - 1) * -(presentValue * pvif + futureValue);
  if (type === 1) pmt /= (1 + ratePerPeriod);
  return pmt;
}

export function calculateROI(investmentGain: number, costOfInvestment: number): number {
  return (investmentGain / costOfInvestment) * 100;
}

export function calculateNPV(discountRate: number, cashFlows: number[]): number {
  return cashFlows.reduce((npv, flow, t) => npv + flow / Math.pow(1 + discountRate, t), 0);
}

export function calculateCAGR(beginningValue: number, endingValue: number, years: number): number {
  return (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
}

export function calculateMarkup(cost: number, price: number): number {
  return ((price - cost) / cost) * 100;
}

export function calculateMargin(cost: number, price: number): number {
  return ((price - cost) / price) * 100;
}

export function calculateAmortization(principal: number, rate: number, periods: number): { interest: number, principal: number, balance: number }[] {
  const pmt = -calculatePMT(rate / 12, periods, principal);
  let balance = principal;
  const schedule = [];
  for (let i = 0; i < periods; i++) {
    const interest = balance * (rate / 12);
    const p = pmt - interest;
    balance -= p;
    schedule.push({ interest, principal: p, balance: Math.max(0, balance) });
  }
  return schedule;
}

export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}
`,

  'color-extended.ts': `/**
 * Extended Color Utilities
 */

function hexToRgb(hex: string) {
  const match = hex.replace(/^#/, '').match(/.{2}/g);
  return match ? [parseInt(match[0], 16), parseInt(match[1], 16), parseInt(match[2], 16)] : [0, 0, 0];
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(x => Math.round(Math.min(255, Math.max(0, x))).toString(16).padStart(2, '0')).join('');
}

export function lightenHexColor(hex: string, percent: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r + (255 - r) * (percent / 100), g + (255 - g) * (percent / 100), b + (255 - b) * (percent / 100));
}

export function darkenHexColor(hex: string, percent: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * (1 - percent / 100), g * (1 - percent / 100), b * (1 - percent / 100));
}

export function mixHexColors(hex1: string, hex2: string, weight = 0.5): string {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const w = Math.min(1, Math.max(0, weight));
  return rgbToHex(r1 * (1 - w) + r2 * w, g1 * (1 - w) + g2 * w, b1 * (1 - w) + b2 * w);
}

function getLuminance(r: number, g: number, b: number): number {
  const [R, G, B] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function getHexContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(...hexToRgb(hex1) as [number, number, number]);
  const l2 = getLuminance(...hexToRgb(hex2) as [number, number, number]);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function isHexAccessible(hex1: string, hex2: string, level: 'AA' | 'AAA' = 'AA'): boolean {
  const ratio = getHexContrastRatio(hex1, hex2);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;
  h /= 360;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [r * 255, g * 255, b * 255];
}

export function generateHexComplementary(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return rgbToHex(...hslToRgb((h + 180) % 360, s, l) as [number, number, number]);
}

export function generateHexAnalogous(hex: string): [string, string, string] {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return [
    rgbToHex(...hslToRgb((h - 30 + 360) % 360, s, l) as [number, number, number]),
    hex,
    rgbToHex(...hslToRgb((h + 30) % 360, s, l) as [number, number, number])
  ];
}

export function saturateHexColor(hex: string, percent: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return rgbToHex(...hslToRgb(h, Math.min(1, s + (percent / 100)), l) as [number, number, number]);
}

export function desaturateHexColor(hex: string, percent: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return rgbToHex(...hslToRgb(h, Math.max(0, s - (percent / 100)), l) as [number, number, number]);
}
`,

  'easing-extended.ts': `/**
 * Extended Easing Curves
 */

const c4 = (2 * Math.PI) / 3;
const c5 = (2 * Math.PI) / 4.5;
const n1 = 7.5625;
const d1 = 2.75;

export function easeInElastic(x: number): number {
  return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
}

export function easeOutElastic(x: number): number {
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

export function easeInOutElastic(x: number): number {
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}

export function easeOutBounce(x: number): number {
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

export function easeInBounce(x: number): number {
  return 1 - easeOutBounce(1 - x);
}

export function easeInOutBounce(x: number): number {
  return x < 0.5
    ? (1 - easeOutBounce(1 - 2 * x)) / 2
    : (1 + easeOutBounce(2 * x - 1)) / 2;
}

const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;

export function easeInBack(x: number): number {
  return c3 * x * x * x - c1 * x * x;
}

export function easeOutBack(x: number): number {
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export function easeInOutBack(x: number): number {
  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

export function bezierEasing(x1: number, y1: number, x2: number, y2: number) {
  // Simplistic cubic bezier approx for easing
  return (t: number) => {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;

    const sampleCurveX = (t: number) => ((ax * t + bx) * t + cx) * t;
    const sampleCurveY = (t: number) => ((ay * t + by) * t + cy) * t;
    // VERY rough approximation: assume t approx x
    return sampleCurveY(t);
  };
}
`,

  'byte-size.ts': `/**
 * Byte Size Utilities
 */

const KILOBYTE = 1024;
const MEGABYTE = KILOBYTE * 1024;
const GIGABYTE = MEGABYTE * 1024;
const TERABYTE = GIGABYTE * 1024;

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function parseBytes(sizeStr: string): number {
  const match = sizeStr.trim().match(/^(\\d+(?:\\.\\d+)?)\\s*([a-zA-Z]+)?$/);
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
`,

  'csv-extended.ts': `/**
 * Extended CSV Utilities
 */

export function jsonToCsv(json: Record<string, any>[], delimiter = ','): string {
  if (json.length === 0) return '';
  const headers = Object.keys(json[0]);
  const rows = json.map(row => 
    headers.map(header => {
      let cell = row[header] === null || row[header] === undefined ? '' : String(row[header]);
      if (cell.includes(delimiter) || cell.includes('\\n') || cell.includes('"')) {
        cell = '"' + cell.replace(/"/g, '""') + '"';
      }
      return cell;
    }).join(delimiter)
  );
  return [headers.join(delimiter), ...rows].join('\\n');
}

export function csvToJson(csv: string, delimiter = ','): Record<string, string>[] {
  const rows = csv.split('\\n').filter(r => r.trim() !== '');
  if (rows.length === 0) return [];
  const headers = parseCsvRow(rows[0], delimiter);
  return rows.slice(1).map(rowStr => {
    const values = parseCsvRow(rowStr, delimiter);
    return headers.reduce((acc, header, i) => {
      acc[header] = values[i] || '';
      return acc;
    }, {} as Record<string, string>);
  });
}

export function parseCsvRow(row: string, delimiter = ','): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"') {
      if (inQuotes && row[i+1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function stringifyCsvRow(row: string[], delimiter = ','): string {
  return row.map(cell => {
    if (cell.includes(delimiter) || cell.includes('\\n') || cell.includes('"')) {
      return '"' + cell.replace(/"/g, '""') + '"';
    }
    return cell;
  }).join(delimiter);
}

export function detectCsvDelimiter(csv: string): string {
  const line = csv.split('\\n')[0] || '';
  const delimiters = [',', ';', '\\t', '|'];
  let maxCount = 0;
  let best = ',';
  for (const d of delimiters) {
    const count = line.split(d).length - 1;
    if (count > maxCount) {
      maxCount = count;
      best = d;
    }
  }
  return best;
}
`,

  'retry.ts': `/**
 * Retry Utilities
 */

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayFn: (attempt: number) => number = exponentialBackoffDelay
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) throw err;
      const delay = delayFn(attempt);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

export async function retryWithJitter<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  return retryWithBackoff(fn, maxRetries, (attempt) => {
    const exp = Math.pow(2, attempt) * baseDelay;
    return exp / 2 + Math.random() * (exp / 2); // 50% jitter
  });
}

export function exponentialBackoffDelay(attempt: number, baseDelay = 1000): number {
  return Math.pow(2, attempt) * baseDelay;
}

export function linearBackoffDelay(attempt: number, baseDelay = 1000): number {
  return attempt * baseDelay;
}

export function isRetryableError(error: any): boolean {
  if (!error) return false;
  // Generic network errors are usually retryable
  if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') return true;
  // HTTP 5xx or 429
  if (error.status >= 500 || error.status === 429) return true;
  return false;
}
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, filename), content);
}
console.log('Batch 3 files created successfully.');
