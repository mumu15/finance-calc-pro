const fs = require('fs');
const path = require('path');

const layoutFile = path.join('app', 'mortgage-calculator', '[city]', 'layout.js');
let content = fs.readFileSync(layoutFile, 'utf8');
console.log('BEFORE:\n' + content.slice(0, 800));

// Fix: description: `...`,`, → description: `...`,
content = content.replace(/(`),(`)/g, '$1');
// Also fix any ,` }, patterns
content = content.replace(/,`,/g, ',');

console.log('\nAFTER:\n' + content.slice(0, 800));
fs.writeFileSync(layoutFile, content, 'utf8');
console.log('\n✅ Fixed');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix stray backtick in mortgage/city layout.js"');
console.log('  git push origin master');
