import { describe, it, expect } from 'vitest';
import { stringToUint8Array, uint8ArrayToString, bufferToHex, hexToBuffer, concatUint8Arrays, areUint8ArraysEqual, base64ToBuffer, bufferToBase64 } from '../binary';

describe('binary utilities', () => {
  it('stringToUint8Array and uint8ArrayToString work correctly', () => {
    const str = 'Hello World';
    const arr = stringToUint8Array(str);
    expect(arr).toBeInstanceOf(Uint8Array);
    expect(uint8ArrayToString(arr)).toBe(str);
  });

  it('bufferToHex and hexToBuffer work correctly', () => {
    const hex = '48656c6c6f'; // 'Hello'
    const buffer = hexToBuffer(hex);
    expect(buffer).toBeInstanceOf(Uint8Array);
    expect(bufferToHex(buffer)).toBe(hex);
  });

  it('concatUint8Arrays concatenates correctly', () => {
    const arr1 = new Uint8Array([1, 2, 3]);
    const arr2 = new Uint8Array([4, 5]);
    const result = concatUint8Arrays([arr1, arr2]);
    expect(result).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
  });

  it('areUint8ArraysEqual checks equality correctly', () => {
    const arr1 = new Uint8Array([1, 2, 3]);
    const arr2 = new Uint8Array([1, 2, 3]);
    const arr3 = new Uint8Array([1, 2, 4]);
    expect(areUint8ArraysEqual(arr1, arr2)).toBe(true);
    expect(areUint8ArraysEqual(arr1, arr3)).toBe(false);
  });

  it('base64ToBuffer and bufferToBase64 work correctly', () => {
    const base64 = 'SGVsbG8='; // 'Hello'
    const buffer = base64ToBuffer(base64);
    expect(buffer).toBeInstanceOf(Uint8Array);
    expect(bufferToBase64(buffer)).toBe(base64);
  });
});
