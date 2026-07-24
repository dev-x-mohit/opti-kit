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

replaceInFile('ml.ts', {
  'export function cosineSimilarity': 'export function mlCosineSimilarity',
  'export function euclideanDistance': 'export function mlEuclideanDistance',
});

replaceInFile('nlp.ts', {
  'export function levenshteinDistance': 'export function nlpLevenshteinDistance',
});

replaceInFile('deep.ts', {
  'export function flattenObject': 'export function flattenDeepObject',
});
replaceInFile('__tests__/deep.test.ts', {
  'flattenObject': 'flattenDeepObject',
});

replaceInFile('retry.ts', {
  'export async function retryWithBackoff': 'export async function retryWithExponentialBackoff',
  'retryWithBackoff\\(': 'retryWithExponentialBackoff('
});

replaceInFile('byte-size.ts', {
  'export function formatBytes': 'export function formatByteSize',
});
replaceInFile('__tests__/byte-size.test.ts', {
  'formatBytes': 'formatByteSize',
});

replaceInFile('finance.ts', {
  'export function formatCurrency': 'export function formatFinanceCurrency',
});

replaceInFile('hash.ts', {
  'export function base64Encode': 'export function encodeBase64',
  'export function base64Decode': 'export function decodeBase64',
  'export function hexEncode': 'export function encodeHex',
  'export function hexDecode': 'export function decodeHex',
});
replaceInFile('__tests__/hash.test.ts', {
  'hexEncode, hexDecode': 'encodeHex, decodeHex',
  'hexEncode\\(': 'encodeHex(',
  'hexDecode\\(': 'decodeHex('
});

replaceInFile('duration.ts', {
  'export function formatDuration': 'export function formatTimeDuration',
  'formatDuration\\(': 'formatTimeDuration('
});
replaceInFile('__tests__/duration.test.ts', {
  'formatDuration': 'formatTimeDuration',
});

console.log('Renaming fixed.');
