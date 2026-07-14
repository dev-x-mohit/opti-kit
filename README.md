# OptiKit

An ultra-lightweight, high-performance, and fully tree-shakeable modern JavaScript/TypeScript utility library. Built with TypeScript, side-effects free, bundled into both ESM and CommonJS formats, and thoroughly unit tested.

## Features

- ⚡️ **Fully Tree-shakeable**: Only bundlers include functions you actually import.
- 📦 **Zero Dependencies**: Pure, hand-optimized implementations for maximum performance.
- 🛡️ **Type Safe**: First-class TypeScript declaration support.
- 🌐 **Dual Target**: Supports ESM (`import`) and CommonJS (`require`).

---

## Installation

```bash
npm install @dev_x_mohit/opti-kit
```

---

## Usage Examples

### 1. Type Guards
```typescript
import { isNil, isObject, isDate } from '@dev_x_mohit/opti-kit';

isNil(null);            // true
isObject({ a: 1 });     // true
isObject([]);           // false (arrays are excluded)
isDate(new Date());     // true
```

### 2. String Casing & Formatting
```typescript
import { camelCase, kebabCase, snakeCase, escapeHtml } from '@dev_x_mohit/opti-kit';

camelCase('hello-world'); // 'helloWorld'
kebabCase('helloWorld');  // 'hello-world'
snakeCase('helloWorld');  // 'hello_world'
escapeHtml('<script>');   // '&lt;script&gt;'
```

### 3. Array Operations
```typescript
import { chunk, unique, groupBy, intersection } from '@dev_x_mohit/opti-kit';

chunk([1, 2, 3, 4], 2);           // [[1, 2], [3, 4]]
unique([1, 2, 2, 3]);             // [1, 2, 3]
intersection([1, 2], [2, 3]);     // [2]
groupBy([{g: 'A'}, {g: 'B'}], i => i.g); // { A: [...], B: [...] }
```

### 4. Object Utilities
```typescript
import { pick, omit, get, deepClone, deepMerge } from '@dev_x_mohit/opti-kit';

const obj = { a: { b: 42 }, c: 3 };
get(obj, 'a.b');                  // 42
pick(obj, ['c']);                 // { c: 3 }
omit(obj, ['c']);                 // { a: { b: 42 } }

const clone = deepClone(obj);     // Fully deep-copied object
```

### 5. Math Functions
```typescript
import { clamp, lerp, round, mean } from '@dev_x_mohit/opti-kit';

clamp(15, 1, 10);                 // 10 (clamped to max)
lerp(10, 20, 0.5);                // 15 (linear interpolation)
round(1.2345, 2);                 // 1.23
mean([1, 2, 3, 4]);               // 2.5
```

### 6. Async & Functional Control
```typescript
import { delay, once, retry } from '@dev_x_mohit/opti-kit';

await delay(1000); // sleep for 1 second

const init = once(() => console.log('Run only once!'));
init(); // Logs 'Run only once!'
init(); // Does nothing

// Retries async function up to 3 times, with a 500ms delay between failures
const data = await retry(fetchData, 3, 500);
```

### 7. Date Tools
```typescript
import { isLeapYear, relativeTime } from '@dev_x_mohit/opti-kit';

isLeapYear(2024); // true
relativeTime(new Date(Date.now() - 60000)); // "a minute ago"
```

### 8. Color Conversions
```typescript
import { hexToRgb, rgbToHex } from '@dev_x_mohit/opti-kit';

hexToRgb('#0080ff'); // { r: 0, g: 128, b: 255 }
rgbToHex(255, 0, 100); // '#ff0064'
```

### 9. Validation Helpers
```typescript
import { isEmail, isUrl, isUuid } from '@dev_x_mohit/opti-kit';

isEmail('test@domain.com'); // true
isUrl('https://google.com'); // true
isUuid('123e4567-e89b-12d3-a456-426614174000'); // true
```

### 10. DOM / Isomorphic Utilities
```typescript
import { copyToClipboard, getQueryParams } from '@dev_x_mohit/opti-kit';

// Safely writes text to clipboard in client context (returns boolean success)
await copyToClipboard('Hello Clipboard!'); 

// Resolves search queries isomorphic or explicitly
getQueryParams('http://domain.com?user=mohit'); // { user: 'mohit' }
```

### 11. Hashing & Unique IDs (Crypto)
```typescript
import { uuid, fnv1a } from '@dev_x_mohit/opti-kit';

uuid(); // '4e12ff48-356b-4e16-bb4d-6bc0bf3a8f56'
fnv1a('hello world'); // 358245367 (unsigned 32-bit FNV hash value)
```

### 12. safeStorage Wrapper
```typescript
import { safeStorage } from '@dev_x_mohit/opti-kit';

// Works isomorphic (no crashing during Next.js SSR), serializes objects natively,
// and supports custom expiration times in milliseconds!
safeStorage.setItem('session', { active: true }, 60000); // expires in 1 min
safeStorage.getItem('session'); // { active: true }
```

### 13. Event Emitter (Pub/Sub)
```typescript
import { EventEmitter } from '@dev_x_mohit/opti-kit';

const emitter = new EventEmitter();
emitter.on('login', (user) => console.log('Welcome back', user));
emitter.emit('login', 'Mohit'); // Logs "Welcome back Mohit"
```

---

## Development

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run tests**:
   ```bash
   npm run test
   ```
3. **Build distribution assets**:
   ```bash
   npm run build
   ```

---

## Publishing to NPM

1. **Log in to your npm account**:
   ```bash
   npm login
   ```
2. **Change package name** in [package.json](file:///c:/Users/cosmo/CareerThings/my-first-package/package.json) if needed.
3. **Publish**:
   ```bash
   # For standard package:
   npm publish
   # For scoped package:
   npm publish --access public
   ```
