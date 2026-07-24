import { describe, it, expect } from 'vitest';
import { pMapSeries, Mutex } from '../concurrency';

describe('Concurrency utilities', () => {
  it('should map series', async () => {
    const res = await pMapSeries([1, 2, 3], async v => v * 2);
    expect(res).toEqual([2, 4, 6]);
  });
});
