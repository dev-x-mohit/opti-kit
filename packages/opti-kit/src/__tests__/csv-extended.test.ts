import { describe, it, expect } from 'vitest';
import { jsonToCsv, csvToJson } from '../csv-extended';

describe('CSV Extended utilities', () => {
  it('should convert', () => {
    const json = [{ a: '1', b: '2' }];
    const csv = jsonToCsv(json);
    expect(csv).toContain('a,b\n1,2');
    expect(csvToJson(csv)).toEqual(json);
  });
});
