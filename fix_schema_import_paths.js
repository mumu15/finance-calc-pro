const fs = require('fs');
const path = require('path');

let fixed = 0;

function getCorrectImportPath(filePath) {
  // Count depth from project root to the file
  // e.g. app/about/page.js = depth 2 → ../../components/SchemaMarkup
  // e.g. app/blog/slug/page.js = depth 3 → ../../../components/SchemaMarkup
  // e.g. app/mortgage-calculator/city/page.js = depth 3 → ../../../components/SchemaMarkup
  // e.g. app/personal-loan/purpose/slug/page.js = depth 4 → ../../../../components/SchemaMarkup
  const normalized = filePath.replace(/\\/g, '/');
  const parts = normalized.split('/');
  // parts example: ['app', 'about', 'page.js'] → depth = parts.length - 1 = 2
  const depth = parts.length - 1;
  return '../'.repeat(depth) + 'components/SchemaMarkup';
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('SchemaMarkup')) return;

  const correctPath = getCorrectImportPath(filePath);

  // Replace any existing SchemaMarkup import path (wrong one) with correct one
  const newContent = content.replace(
    /from\s+['"][^'"]*components\/SchemaMarkup['"]/g,
    "from '" + correctPath + "'"
  );

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('✅ Fixed: ' + filePath + ' → ' + correctPath);
    fixed++;
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(fullPath);
    else if (entry.name === 'page.js') fixFile(fullPath);
  });
}

walkDir('app');

console.log('\n🎉 Fixed ' + fixed + ' files');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix SchemaMarkup import paths"');
console.log('  git push origin master');
