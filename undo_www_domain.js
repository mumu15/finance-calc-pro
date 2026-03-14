const fs = require('fs');
const path = require('path');

// ============================================================
// UNDO: Reverse www.freefincalc.net → freefincalc.net
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let filesFixed = 0;
let replacements = 0;

function findAllFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.next' || item === '.vercel') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) findAllFiles(full, results);
    else if (item.endsWith('.js') || item.endsWith('.tsx') || item.endsWith('.ts')) {
      results.push(full);
    }
  }
  return results;
}

console.log('');
console.log('=====================================================');
console.log('  UNDO: www.freefincalc.net → freefincalc.net');
console.log('=====================================================');
console.log('');

const appFiles = findAllFiles(APP);
const componentFiles = findAllFiles(path.join(BASE, 'components'));
const rootFiles = fs.readdirSync(BASE)
  .filter(f => f.endsWith('.js') || f.endsWith('.ts'))
  .map(f => path.join(BASE, f));

const allFiles = [...appFiles, ...componentFiles, ...rootFiles];

console.log(`  Scanning ${allFiles.length} files...`);
console.log('');

for (const f of allFiles) {
  let content = fs.readFileSync(f, 'utf8');
  const before = content;

  const count = (content.match(/https:\/\/www\.freefincalc\.net/g) || []).length;

  if (count > 0) {
    content = content.replace(/https:\/\/www\.freefincalc\.net/g, 'https://www.freefincalc.net');
    fs.writeFileSync(f, content, 'utf8');
    const rel = path.relative(BASE, f).replace(/\\/g, '/');
    filesFixed++;
    replacements += count;
    if (filesFixed <= 20) console.log(`  ✅ ${rel} (${count} URLs reverted)`);
  }
}

if (filesFixed > 20) console.log(`  ... and ${filesFixed - 20} more files`);

console.log('');
console.log('=====================================================');
console.log(`  RESULTS: ${filesFixed} files fixed, ${replacements} URLs reverted`);
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Revert to freefincalc.net (non-www) — matches live redirect"');
console.log('  git push origin master');
console.log('');
