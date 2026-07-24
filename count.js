const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\cosmo\\CareerThings\\opti-kit\\apps\\showcase\\src\\data\\utilitiesData.ts', 'utf8');
const match = content.match(/export const utilitiesData.*?=\s*\[([\s\S]*?)\];/);
if (match) {
  const objs = match[1].split(/},\s*{/);
  const modules = new Set();
  objs.forEach(o => {
    const m = o.match(/"module":\s*"([^"]+)"/);
    if (m) modules.add(m[1]);
  });
  console.log('Distinct modules in utilitiesData:', modules.size);
  console.log(Array.from(modules).join(', '));
  console.log('Total Utilities:', objs.length);
}
