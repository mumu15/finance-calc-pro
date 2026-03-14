const fs = require('fs');
const path = require('path');

const f = path.join('app', 'mortgage-calculator', 'layout.js');
let c = fs.readFileSync(f, 'utf8');

// Add canonical for base route only
c = c.replace(
  /export const metadata\s*=\s*\{/,
  "export const metadata = {\n  alternates: { canonical: 'https://freefincalc.net/mortgage-calculator' },"
);

fs.writeFileSync(f, c, 'utf8');
console.log('✅ Fixed mortgage-calculator/layout.js');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix canonical on homepage and mortgage-calculator base route"');
console.log('  git push origin master');
