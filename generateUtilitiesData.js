const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'packages/opti-kit/src');
const dataFile = path.join(__dirname, 'apps/showcase/src/data/utilitiesData.ts');

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.ts') && !f.includes('index') && !f.includes('types') && !f.includes('-extended') && !f.includes('test') && !f.includes('fp.ts'));

let allUtils = [];

function parseFile(file) {
  const filepath = path.join(srcDir, file);
  if (!fs.existsSync(filepath)) return [];
  
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n');
  const results = [];
  
  let currentDesc = 'Utility function';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Naive JSDoc parse
    if (line.startsWith('/**')) {
      let descLine = lines[i+1]?.trim() || '';
      if (descLine.startsWith('*')) descLine = descLine.substring(1).trim();
      if (descLine && descLine !== '@') {
        currentDesc = descLine;
      }
    }

    // Match export function, export const (arrow functions), export class
    const funcMatch = line.match(/^export\s+(?:async\s+)?function\s+([a-zA-Z0-9_]+)/);
    const constMatch = line.match(/^export\s+const\s+([a-zA-Z0-9_]+)/);
    const classMatch = line.match(/^export\s+class\s+([a-zA-Z0-9_]+)/);

    let funcName, isClass = false;
    if (funcMatch) {
      funcName = funcMatch[1];
    } else if (constMatch) {
      funcName = constMatch[1];
    } else if (classMatch) {
      funcName = classMatch[1];
      isClass = true;
    }

    if (funcName) {
      const moduleName = file.replace('.ts', '').split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      
      let sig = isClass ? `class ${funcName}` : `${funcName}(...)`;
      
      let returnType = 'any';
      if (line.includes('): ')) {
        returnType = line.split('): ')[1].split('{')[0].trim();
        sig += `: ${returnType}`;
      } else if (!isClass && funcMatch) {
        sig += `: any`;
      }

      results.push({
        id: funcName.toLowerCase(),
        name: funcName,
        module: moduleName,
        description: currentDesc,
        signature: sig,
        example: isClass ? `new ${funcName}()` : `${funcName}(...)`,
        output: `...`
      });
      
      currentDesc = 'Utility function';
    }
  }
  
  return results;
}

files.forEach(file => {
  const parsed = parseFile(file);
  allUtils = allUtils.concat(parsed);
});

console.log(`Found ${allUtils.length} utilities across ${files.length} modules.`);

const dataFileContent = `export interface UtilityMeta {
  id: string;
  name: string;
  module: string;
  description: string;
  signature: string;
  example: string;
  output: string;
  benchmark?: {
    opti?: string;
    lodash?: string;
    multiplier: string | number;
    winner?: 'OptiKit' | 'Lodash';
    optikitOps?: number;
    lodashOps?: number;
  };
}

export const utilitiesData: UtilityMeta[] = [
${allUtils.map(u => `  ${JSON.stringify(u, null, 2).replace(/\n/g, '\n  ')}`).join(',\n')}
];
`;

fs.writeFileSync(dataFile, dataFileContent);
console.log('Overwrote utilitiesData.ts');
