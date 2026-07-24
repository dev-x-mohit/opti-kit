import fs from 'fs';
const content = fs.readFileSync('./apps/showcase/src/data/utilitiesData.ts', 'utf-8');
const dataStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const utilities = eval(dataStr);

const generateDummyArgs = (signature, name) => {
    const defaults = {
      chunk: '[1, 2, 3, 4, 5], 2',
      slugify: '"Hello World!"',
      capitalize: '"hello world"',
      camelCase: '"hello-world"',
      kebabCase: '"helloWorld"',
      snakeCase: '"helloWorld"',
      truncate: '"Hello World", 5',
      clamp: '15, 0, 10',
      random: '1, 100',
      difference: '[1, 2, 3], [2, 4]',
      intersection: '[1, 2, 3], [2, 3, 4]',
      unique: '[1, 1, 2, 3, 3]',
      groupBy: '[{ type: "a" }, { type: "b" }, { type: "a" }], item => item.type',
      isEmail: '"test@example.com"',
      isUrl: '"https://example.com"',
      hexToRgb: '"#ff0000"',
      rgbToHex: '255, 0, 0',
      parseQuery: '"?foo=bar&baz=qux"',
      stringifyQuery: '{ foo: "bar", baz: "qux" }',
      cookieGet: '"session_id"',
      cookieSet: '"session_id", "12345", { days: 7 }',
      escapeHtml: '"<h1>Hello</h1>"',
      unescapeHtml: '"&lt;h1&gt;Hello&lt;/h1&gt;"',
    };

    if (defaults[name]) return defaults[name];

    const match = signature.match(/\((.*?)\)/);
    if (!match || !match[1].trim()) return '';

    // Split by comma, but ignore commas inside nested brackets <>, [], {}, ()
    // For simplicity, a regex split or just a basic split works mostly if we don't have complex types
    // Actually, splitting by comma might break things like Record<string, any>.
    // Let's do a simple parse:
    let params = [];
    let current = '';
    let depth = 0;
    for (let char of match[1]) {
      if (char === '<' || char === '[' || char === '{' || char === '(') depth++;
      else if (char === '>' || char === ']' || char === '}' || char === ')') depth--;
      else if (char === ',' && depth === 0) {
        params.push(current.trim());
        current = '';
        continue;
      }
      current += char;
    }
    if (current.trim()) params.push(current.trim());

    const dummyArgs = params.map(param => {
      const colonIdx = param.indexOf(':');
      if (colonIdx === -1) {
        if (param.includes('...')) return '[1, 2, 3]';
        return 'null';
      }
      const pName = param.substring(0, colonIdx).replace('?', '').trim().toLowerCase();
      const type = param.substring(colonIdx + 1).trim().toLowerCase();

      if (pName.includes('url')) return '"https://example.com"';
      if (pName.includes('email')) return '"test@example.com"';
      if (pName.includes('color') || pName.includes('hex')) return '"#ff0000"';
      if (pName.includes('date')) return 'new Date()';
      if (pName.includes('regex') || pName.includes('pattern')) return '/test/i';

      if (type.includes('string')) return '"Hello World"';
      if (type.includes('number')) return '42';
      if (type.includes('boolean')) return 'true';
      if (type.includes('[]') || type.includes('array')) return '[1, 2, 3]';
      if (type.includes('record') || type.includes('object') || type.startsWith('{')) return '{ key: "value" }';
      if (type.includes('=>') || type.includes('function')) return '() => {}';
      if (type.includes('date')) return 'new Date()';
      if (type.includes('regexp')) return '/test/i';

      return 'null';
    });

    return dummyArgs.join(', ');
};

let issues = 0;
utilities.forEach(u => {
  const args = generateDummyArgs(u.signature, u.name);
  if (args.includes('null')) {
    issues++;
    console.log(`Uses null for: ${u.name} | Sig: ${u.signature} | Args: ${args}`);
  }
});
console.log(`Total issues: ${issues}`);
