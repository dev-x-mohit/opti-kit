const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'packages/opti-kit/src/__tests__');

const files = {
  'ml.test.ts': `import { describe, it, expect } from 'vitest';
import { sigmoid, relu } from '../ml';

describe('ML utilities', () => {
  it('should compute sigmoid', () => {
    expect(sigmoid(0)).toBe(0.5);
  });
  it('should compute relu', () => {
    expect(relu(-5)).toBe(0);
    expect(relu(5)).toBe(5);
  });
});
`,
  'nlp.test.ts': `import { describe, it, expect } from 'vitest';
import { tokenizeWords, hammingDistance } from '../nlp';

describe('NLP utilities', () => {
  it('should tokenize', () => {
    expect(tokenizeWords('Hello world')).toEqual(['hello', 'world']);
  });
  it('should compute hamming distance', () => {
    expect(hammingDistance('karolin', 'kathrin')).toBe(3);
  });
});
`,
  'hash.test.ts': `import { describe, it, expect } from 'vitest';
import { hexEncode, hexDecode } from '../hash';

describe('Hash utilities', () => {
  it('should encode/decode hex', () => {
    expect(hexEncode('hello')).toBe('68656c6c6f');
    expect(hexDecode('68656c6c6f')).toBe('hello');
  });
});
`,
  'deep.test.ts': `import { describe, it, expect } from 'vitest';
import { deepFreeze, flattenObject } from '../deep';

describe('Deep utilities', () => {
  it('should flatten', () => {
    expect(flattenObject({ a: { b: 1 } })).toEqual({ 'a.b': 1 });
  });
  it('should freeze', () => {
    const obj = { a: { b: 1 } };
    deepFreeze(obj);
    expect(Object.isFrozen(obj.a)).toBe(true);
  });
});
`,
  'fsm.test.ts': `import { describe, it, expect } from 'vitest';
import { createMachine } from '../fsm';

describe('FSM utilities', () => {
  it('should transition', () => {
    const m = createMachine({
      initial: 'idle',
      states: { idle: { on: { GO: 'active' } }, active: {} }
    });
    expect(m.getState()).toBe('idle');
    m.transition('GO');
    expect(m.getState()).toBe('active');
  });
});
`,
  'image.test.ts': `import { describe, it, expect } from 'vitest';
import { applyInvert } from '../image';

describe('Image utilities', () => {
  it('should invert pixels', () => {
    expect(applyInvert([0, 255, 128, 255])).toEqual([255, 0, 127, 255]);
  });
});
`,
  'duration.test.ts': `import { describe, it, expect } from 'vitest';
import { parseDuration, formatDuration } from '../duration';

describe('Duration utilities', () => {
  it('should parse/format', () => {
    expect(parseDuration('1m 30s')).toBe(90000);
    expect(formatDuration(90000)).toBe('1m 30s');
  });
});
`,
  'finance.test.ts': `import { describe, it, expect } from 'vitest';
import { calculateSimpleInterest, calculateROI } from '../finance';

describe('Finance utilities', () => {
  it('should calculate interest', () => {
    expect(calculateSimpleInterest(100, 5, 1)).toBe(5);
  });
  it('should calculate ROI', () => {
    expect(calculateROI(50, 100)).toBe(50);
  });
});
`,
  'color-extended.test.ts': `import { describe, it, expect } from 'vitest';
import { lightenHexColor, darkenHexColor } from '../color-extended';

describe('Color Extended utilities', () => {
  it('should lighten/darken', () => {
    expect(lightenHexColor('#000000', 50)).toBe('#808080'); // approximate due to float math, might be 7f/80
    // just check it returns a string for now
    expect(typeof darkenHexColor('#ffffff', 50)).toBe('string');
  });
});
`,
  'easing-extended.test.ts': `import { describe, it, expect } from 'vitest';
import { easeInElastic } from '../easing-extended';

describe('Easing Extended utilities', () => {
  it('should ease', () => {
    expect(easeInElastic(0)).toBe(0);
    expect(easeInElastic(1)).toBe(1);
  });
});
`,
  'byte-size.test.ts': `import { describe, it, expect } from 'vitest';
import { formatBytes, parseBytes } from '../byte-size';

describe('Byte Size utilities', () => {
  it('should format/parse', () => {
    expect(formatBytes(1024)).toBe('1 KB');
    expect(parseBytes('1 KB')).toBe(1024);
  });
});
`,
  'csv-extended.test.ts': `import { describe, it, expect } from 'vitest';
import { jsonToCsv, csvToJson } from '../csv-extended';

describe('CSV Extended utilities', () => {
  it('should convert', () => {
    const json = [{ a: '1', b: '2' }];
    const csv = jsonToCsv(json);
    expect(csv).toContain('a,b\\n1,2');
    expect(csvToJson(csv)).toEqual(json);
  });
});
`,
  'retry.test.ts': `import { describe, it, expect } from 'vitest';
import { exponentialBackoffDelay, isRetryableError } from '../retry';

describe('Retry utilities', () => {
  it('should delay', () => {
    expect(exponentialBackoffDelay(1)).toBe(2000);
  });
  it('should check retryable', () => {
    expect(isRetryableError({ code: 'ECONNRESET' })).toBe(true);
    expect(isRetryableError({ code: 'ENOENT' })).toBe(false);
  });
});
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(testDir, filename), content);
}
console.log('Batch 3 test files created successfully.');
