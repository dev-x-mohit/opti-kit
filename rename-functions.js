const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'packages/opti-kit/src');

function replaceInFile(filename, replacements) {
  const filepath = path.join(dir, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  for (const [search, replace] of Object.entries(replacements)) {
    content = content.replace(new RegExp(search, 'g'), replace);
  }
  fs.writeFileSync(filepath, content);
}

replaceInFile('map.ts', {
  'export function filterMap': 'export function filterMapEntries',
  'export function invertMap': 'export function invertMapEntries',
  'export function mergeMaps': 'export function mergeMultipleMaps',
  'export function mapKeys': 'export function mapMapKeys',
  'export function mapValues': 'export function mapMapValues',
});

replaceInFile('set.ts', {
  'export function isSubset': 'export function isSetSubset',
  'export function isSuperset': 'export function isSetSuperset',
  'export function setDifference': 'export function differenceOfSets',
  'export function setIntersection': 'export function intersectionOfSets',
  'export function setUnion': 'export function unionOfSets',
});

replaceInFile('date-extended.ts', {
  'export function addDays': 'export function addDaysToDate',
  'export function daysInMonth': 'export function getDaysInMonth',
  'export function endOfDay': 'export function getEndOfDay',
  'export function isAfter': 'export function isDateAfter',
  'export function isBefore': 'export function isDateBefore',
  'export function isLeapYear': 'export function isYearLeap',
  'export function isSameDay': 'export function isSameCalendarDay',
  'export function startOfDay': 'export function getStartOfDay',
  'export function subDays': 'export function subDaysFromDate',
});

replaceInFile('__tests__/date-extended.test.ts', {
  'isLeapYear, addDays, isSameDay': 'isYearLeap, addDaysToDate, isSameCalendarDay',
  'isLeapYear\\(': 'isYearLeap(',
  'addDays\\(': 'addDaysToDate(',
  'isSameDay\\(': 'isSameCalendarDay('
});

replaceInFile('html-entities.ts', {
  'export function escapeHtml': 'export function encodeHtmlEntities',
  'export function unescapeHtml': 'export function decodeHtmlEntities',
});

replaceInFile('__tests__/html-entities.test.ts', {
  'escapeHtml, unescapeHtml': 'encodeHtmlEntities, decodeHtmlEntities',
  'escapeHtml\\(': 'encodeHtmlEntities(',
  'unescapeHtml\\(': 'decodeHtmlEntities('
});

replaceInFile('string-extended.ts', {
  'export function isPalindrome': 'export function isStringPalindrome',
  'export function mask': 'export function maskString',
});

replaceInFile('__tests__/string-extended.test.ts', {
  'isPalindrome,': 'isStringPalindrome,',
  'isPalindrome\\(': 'isStringPalindrome('
});

replaceInFile('concurrency.ts', {
  'export async function pProps': 'export async function pResolveProps',
});

replaceInFile('__tests__/map.test.ts', {
  'mapValues, filterMap, objectToMap': 'mapMapValues, filterMapEntries, objectToMap',
  'mapValues\\(': 'mapMapValues('
});

replaceInFile('__tests__/set.test.ts', {
  'setUnion, setIntersection, setDifference, isSubset': 'unionOfSets, intersectionOfSets, differenceOfSets, isSetSubset',
  'setUnion\\(': 'unionOfSets(',
  'setIntersection\\(': 'intersectionOfSets('
});

console.log('Replacements complete.');
