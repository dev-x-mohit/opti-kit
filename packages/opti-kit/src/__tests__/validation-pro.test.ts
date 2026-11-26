import { describe, it, expect } from 'vitest';
import {
  isCreditCardLuhn, detectCardBrand, isIban, isBicSwift, isIsbn10, isIsbn13, isIssn,
  isEan13, isUpcA, isVin, isMacAddressStrict, isIpv4Cidr, isIpv6, ipInCidr,
  isCronExpression, isJwtFormat, isSemverRange, isMimeType, isDataUri, isSlugStrict,
  passwordStrengthScore, isStrongPasswordStrict, isE164Phone, isIso3166Alpha2,
  isIso4217Currency, sanitizeFilename, escapeRegExpStr, stripControlChars,
} from '../validation-pro';

describe('Validation Pro', () => {
  it('validates financial and product identifiers', () => {
    expect(isCreditCardLuhn('4111 1111 1111 1111')).toBe(true);
    expect(isCreditCardLuhn('4111 1111 1111 1112')).toBe(false);
    expect(detectCardBrand('4111111111111111')).toBe('visa');
    expect(detectCardBrand('5500000000000004')).toBe('mastercard');
    expect(isIban('DE89 3704 0044 0532 0130 00')).toBe(true);
    expect(isBicSwift('DEUTDEFF')).toBe(true);
    expect(isIsbn10('0-306-40615-2')).toBe(true);
    expect(isIsbn13('978-0-306-40615-7')).toBe(true);
    expect(isIssn('0378-5955')).toBe(true);
    expect(isEan13('4006381333931')).toBe(true);
    expect(isUpcA('036000291452')).toBe(true);
    expect(isVin('1HGCM82633A004352')).toBe(true);
  });

  it('validates network, format, security, and sanitizers', () => {
    expect(isMacAddressStrict('00:1A:2B:3C:4D:5E')).toBe(true);
    expect(isIpv4Cidr('192.168.1.0/24')).toBe(true);
    expect(isIpv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
    expect(ipInCidr('192.168.1.42', '192.168.1.0/24')).toBe(true);
    expect(ipInCidr('10.0.0.1', '192.168.1.0/24')).toBe(false);
    expect(isCronExpression('*/5 * * * *')).toBe(true);
    expect(isJwtFormat('aaa.bbb.ccc')).toBe(true);
    expect(isSemverRange('^1.2.3')).toBe(true);
    expect(isMimeType('application/json; charset=utf-8')).toBe(true);
    expect(isDataUri('data:text/plain;base64,SGVsbG8=')).toBe(true);
    expect(isSlugStrict('opti-kit-v2')).toBe(true);
    expect(passwordStrengthScore('Str0ng!Pass')).toBe(4);
    expect(isStrongPasswordStrict('Str0ng!Pass')).toBe(true);
    expect(isE164Phone('+14155552671')).toBe(true);
    expect(isIso3166Alpha2('US')).toBe(true);
    expect(isIso4217Currency('USD')).toBe(true);
    expect(sanitizeFilename('a/b:c*?.txt')).toBe('a_b_c__.txt');
    expect(escapeRegExpStr('a.b+c?')).toBe('a\\.b\\+c\\?');
    expect(stripControlChars('hi\x00\x07there')).toBe('hithere');
  });
});
