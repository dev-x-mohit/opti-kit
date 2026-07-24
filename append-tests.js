const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'packages', 'opti-kit', 'src', '__tests__');

const arrayContent = `
describe('array extensions', () => {
  it('zip', () => {
    expect(moduleArray.zip([1, 2], ['a', 'b'])).toEqual([[1, 'a'], [2, 'b']]);
  });
  it('unzip', () => {
    expect(moduleArray.unzip([[1, 'a'], [2, 'b']])).toEqual([[1, 2], ['a', 'b']]);
  });
  it('intersection', () => {
    expect(moduleArray.intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
  });
  it('difference', () => {
    expect(moduleArray.difference([1, 2, 3], [2, 3])).toEqual([1]);
  });
  it('symmetricDifference', () => {
    expect(moduleArray.symmetricDifference([1, 2], [2, 3])).toEqual([1, 3]);
  });
  it('sampleSize', () => {
    expect(moduleArray.sampleSize([1, 2, 3], 2).length).toBe(2);
  });
  it('countBy', () => {
    expect(moduleArray.countBy(['a', 'b', 'a'], x => x)).toEqual({ a: 2, b: 1 });
  });
});
`;

// Just appending tests. Since we don't know the exact imports in each file without parsing, 
// we'll rely on the existing imports if any, or we might need to import them dynamically. 
// Wait, we need to know the imports. Let's just append the describe blocks and assume `moduleArray` or similar doesn't exist.
// Let's import the specific functions. Actually, we can just read the file, add imports, and append.
// This is slightly tricky, so we'll just run vitest and fix any import errors.

let arrayTest = fs.readFileSync(path.join(testDir, 'array.test.ts'), 'utf8');
arrayTest = arrayTest.replace(/} from '\.\.\/array';/, ', zip, unzip, intersection, difference, symmetricDifference, sampleSize, countBy } from \'../array\';');
fs.writeFileSync(path.join(testDir, 'array.test.ts'), arrayTest + arrayContent.replace(/moduleArray\./g, ''));

const stringContent = `
describe('string extensions', () => {
  it('stripTags', () => expect(stripTags('<p>hello</p>')).toBe('hello'));
  it('pad', () => expect(pad('a', 3, 'x')).toBe('xax'));
  it('stripAccents', () => expect(stripAccents('hélló')).toBe('hello'));
  it('wordCount', () => expect(wordCount('hello world')).toBe(2));
  it('reverse', () => expect(reverse('hello')).toBe('olleh'));
  it('truncateWords', () => expect(truncateWords('hello world there', 2)).toBe('hello world...'));
});
`;

let stringTest = fs.readFileSync(path.join(testDir, 'string.test.ts'), 'utf8');
stringTest = stringTest.replace(/} from '\.\.\/string';/, ', stripTags, pad, stripAccents, wordCount, reverse, truncateWords } from \'../string\';');
fs.writeFileSync(path.join(testDir, 'string.test.ts'), stringTest + stringContent);

const objectContent = `
describe('object extensions', () => {
  it('pickBy', () => expect(pickBy({ a: 1, b: 2 }, v => v > 1)).toEqual({ b: 2 }));
  it('omitBy', () => expect(omitBy({ a: 1, b: 2 }, v => v > 1)).toEqual({ a: 1 }));
  it('invert', () => expect(invert({ a: '1', b: '2' })).toEqual({ '1': 'a', '2': 'b' }));
  it('mapKeys', () => expect(mapKeys({ a: 1 }, (v, k) => k + v)).toEqual({ a1: 1 }));
  it('mapValues', () => expect(mapValues({ a: 1 }, v => v + 1)).toEqual({ a: 2 }));
  it('hasPath', () => expect(hasPath({ a: { b: { c: 1 } } }, 'a.b.c')).toBe(true));
});
`;

let objectTest = fs.readFileSync(path.join(testDir, 'object.test.ts'), 'utf8');
objectTest = objectTest.replace(/} from '\.\.\/object';/, ', pickBy, omitBy, invert, mapKeys, mapValues, hasPath } from \'../object\';');
fs.writeFileSync(path.join(testDir, 'object.test.ts'), objectTest + objectContent);

const asyncContent = `
describe('async extensions', () => {
  it('pTimeout', async () => {
    await expect(pTimeout(new Promise(r => setTimeout(r, 100)), 10)).rejects.toThrow();
  });
  it('pAny', async () => {
    const res = await pAny([Promise.reject('a'), Promise.resolve('b')]);
    expect(res).toBe('b');
  });
  it('pLimit', async () => {
    const limit = pLimit(1);
    const res = await limit(() => Promise.resolve('a'));
    expect(res).toBe('a');
  });
});
`;

let asyncTest = fs.readFileSync(path.join(testDir, 'async.test.ts'), 'utf8');
asyncTest = asyncTest.replace(/} from '\.\.\/async';/, ', pTimeout, pAny, pLimit } from \'../async\';');
fs.writeFileSync(path.join(testDir, 'async.test.ts'), asyncTest + asyncContent);

const mathContent = `
describe('math extensions', () => {
  it('gcd', () => expect(gcd(12, 8)).toBe(4));
  it('lcm', () => expect(lcm(12, 8)).toBe(24));
  it('factorial', () => expect(factorial(5)).toBe(120));
  it('fibonacci', () => expect(fibonacci(5)).toBe(5));
  it('roundTo', () => expect(roundTo(1.2345, 2)).toBe(1.23));
});
`;

let mathTest = fs.readFileSync(path.join(testDir, 'math.test.ts'), 'utf8');
mathTest = mathTest.replace(/} from '\.\.\/math';/, ', gcd, lcm, factorial, fibonacci, roundTo } from \'../math\';');
fs.writeFileSync(path.join(testDir, 'math.test.ts'), mathTest + mathContent);

const validateContent = `
describe('validate extensions', () => {
  it('isMACAddress', () => expect(isMACAddress('00:1A:2B:3C:4D:5E')).toBe(true));
  it('isIP', () => expect(isIP('192.168.1.1')).toBe(true));
  it('isPort', () => expect(isPort(8080)).toBe(true));
  it('isBase64', () => expect(isBase64('SGVsbG8=')).toBe(true));
  it('isCreditCard', () => expect(isCreditCard('4111111111111111')).toBe(true));
});
`;

let validateTest = fs.readFileSync(path.join(testDir, 'validate.test.ts'), 'utf8');
validateTest = validateTest.replace(/} from '\.\.\/validate';/, ', isMACAddress, isIP, isPort, isBase64, isCreditCard } from \'../validate\';');
fs.writeFileSync(path.join(testDir, 'validate.test.ts'), validateTest + validateContent);

const domContent = `
describe('dom extensions', () => {
  it('addClass, removeClass, toggleClass dummy', () => {
    // Just testing they are exported
    expect(typeof addClass).toBe('function');
    expect(typeof removeClass).toBe('function');
    expect(typeof toggleClass).toBe('function');
    expect(typeof getParents).toBe('function');
    expect(typeof closest).toBe('function');
  });
});
`;

let domTest = fs.readFileSync(path.join(testDir, 'dom.test.ts'), 'utf8');
domTest = domTest.replace(/} from '\.\.\/dom';/, ', addClass, removeClass, toggleClass, getParents, closest } from \'../dom\';');
fs.writeFileSync(path.join(testDir, 'dom.test.ts'), domTest + domContent);

const randomContent = `
describe('random extensions', () => {
  it('randomBoolean', () => expect(typeof randomBoolean()).toBe('boolean'));
  it('randomString', () => expect(randomString(5).length).toBe(5));
  it('randomColor', () => expect(randomColor()).toMatch(/^#[0-9a-f]{6}$/i));
  it('randomDate', () => expect(randomDate(new Date(2000, 0, 1))).toBeInstanceOf(Date));
});
`;

let randomTest = fs.readFileSync(path.join(testDir, 'random.test.ts'), 'utf8');
randomTest = randomTest.replace(/} from '\.\.\/random';/, ', randomBoolean, randomString, randomColor, randomDate } from \'../random\';');
fs.writeFileSync(path.join(testDir, 'random.test.ts'), randomTest + randomContent);

console.log('Appended tests successfully.');
