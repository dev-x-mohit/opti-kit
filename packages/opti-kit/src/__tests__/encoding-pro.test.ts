import { describe, it, expect } from 'vitest';
import {
  encodeVarint, decodeVarint, encodeZigZag, decodeZigZag, encodeTlv, decodeTlv,
  encodeLeb128, decodeLeb128, packBsonLite, unpackBsonLite,
  encodeQueryStringStrict, decodeQueryStringStrict, encodeNetstring, decodeNetstring,
  bytesToBitString, bitStringToBytes, uint8ArrayConcat, uint8ArrayEquals,
  uint8ArrayIndexOf, uint8ArraySplit, uint32ToBytesBE, bytesToUint32BE,
  float64ToBytesBE, bytesToFloat64BE,
} from '../encoding-pro';

describe('Encoding Pro', () => {
  it('encodes/decodes varint, zigzag, TLV, LEB128, BSON-lite, netstrings, and queries', () => {
    const v = encodeVarint(300);
    expect(decodeVarint(v)).toEqual({ value: 300, bytesRead: 2 });
    expect(decodeZigZag(encodeZigZag(-42))).toBe(-42);

    const payload = new Uint8Array([1, 2, 3]);
    const tlv = encodeTlv(7, payload);
    expect(decodeTlv(tlv)).toEqual({ tag: 7, value: payload, bytesRead: 5 });

    const leb = encodeLeb128(123456789n);
    expect(decodeLeb128(leb).value).toBe(123456789n);

    const packed = packBsonLite({ ok: true, n: 42 });
    expect(unpackBsonLite(packed)).toEqual({ ok: true, n: 42 });

    const qs = encodeQueryStringStrict({ b: 2, a: 'hello world' });
    expect(qs).toBe('a=hello%20world&b=2');
    expect(decodeQueryStringStrict(qs)).toEqual({ a: 'hello world', b: '2' });

    const ns = encodeNetstring('hello');
    expect(ns).toBe('5:hello,');
    expect(decodeNetstring(ns)).toBe('hello');
  });

  it('manipulates bitstrings and Uint8Array buffers', () => {
    const bits = bytesToBitString(new Uint8Array([0b10101010]));
    expect(bits).toBe('10101010');
    expect(bitStringToBytes(bits)).toEqual(new Uint8Array([0b10101010]));

    const a = new Uint8Array([1, 2]);
    const b = new Uint8Array([3, 4]);
    const joined = uint8ArrayConcat([a, b]);
    expect(uint8ArrayEquals(joined, new Uint8Array([1, 2, 3, 4]))).toBe(true);
    expect(uint8ArrayIndexOf(joined, new Uint8Array([2, 3]))).toBe(1);
    expect(uint8ArraySplit(new Uint8Array([1, 0, 2, 0, 3]), new Uint8Array([0])).length).toBe(3);

    expect(bytesToUint32BE(uint32ToBytesBE(0xdeadbeef))).toBe(0xdeadbeef);
    expect(bytesToFloat64BE(float64ToBytesBE(3.14159))).toBeCloseTo(3.14159, 6);
  });
});
