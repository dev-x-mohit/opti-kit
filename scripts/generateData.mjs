import fs from 'fs';
import path from 'path';

const srcDir = './packages/opti-kit/src';
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts');

let data = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  const moduleName = file.replace('.ts', '');
  const moduleTitle = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

  const regex = /\/\*\*([\s\S]*?)\*\/\s*export\s+(?:async\s+)?function\s+(\w+)([\s\S]*?)\s*\{/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const doc = match[1];
    const name = match[2];
    let sigRaw = match[3];
    
    let signature = `${name}${sigRaw}`.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    if (signature.endsWith(':')) signature = signature.slice(0, -1).trim();
    
    const docLines = doc.split('\n')
      .map(l => l.replace(/^\s*\*\s?/, '').trim())
      .filter(l => l && !l.startsWith('@') && !l.startsWith('//'));
    const description = docLines.length > 0 ? docLines[0] : 'No description provided.';

    let example = `${name}(...)`;
    let output = '...';
    
    const exampleMatch = doc.match(/@example\s*\n([\s\S]*)/);
    if (exampleMatch) {
      const exLines = exampleMatch[1].split('\n').map(l => l.replace(/^\s*\*\s?/, ''));
      const codeLines = [];
      const outLines = [];
      for (const line of exLines) {
        if (line.includes('// →')) {
          const parts = line.split('// →');
          codeLines.push(parts[0].trim());
          outLines.push(parts[1].trim());
        } else if (line.trim().startsWith('@')) {
          break;
        } else {
          codeLines.push(line.trim());
        }
      }
      if (codeLines.length > 0 && codeLines.join('').trim() !== '') {
        example = codeLines.filter(Boolean).join('\n');
      }
      if (outLines.length > 0) {
        output = outLines.filter(Boolean).join('\n');
      }
    }

    data.push({
      id: name.toLowerCase(),
      name,
      module: moduleTitle,
      description,
      signature,
      example,
      output
    });
  }
});

const fileOutput = `export interface UtilityMeta {
  id: string;
  name: string;
  module: string;
  description: string;
  signature: string;
  example: string;
  output: string;
}

export const utilitiesData: UtilityMeta[] = ${JSON.stringify(data, null, 2)};
`;

fs.writeFileSync('./apps/showcase/src/data/utilitiesData.ts', fileOutput);
console.log(`Generated ${data.length} utilities.`);
