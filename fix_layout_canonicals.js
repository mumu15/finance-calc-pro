const fs = require('fs');
const path = require('path');

let fixed = 0;

function fixLayout(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Remove alternates block from layout metadata
  // Handles multiline: alternates: { canonical: '...' },
  content = content.replace(/\s*alternates:\s*\{[^}]*\},?/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Fixed: ' + filePath);
    fixed++;
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') return;
      walkDir(fullPath);
    } else if (entry.name === 'layout.js') {
      fixLayout(fullPath);
    }
  });
}

console.log('🔧 Removing alternates from all layout.js files...\n');
walkDir('app');

console.log('\n─────────────────────────────────────────');
console.log('✅ Fixed: ' + fixed + ' layout.js files');
console.log('─────────────────────────────────────────');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Remove alternates from layout.js files — let page.js canonical win"');
console.log('  git push origin master');
