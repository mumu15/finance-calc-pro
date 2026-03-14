const fs = require('fs');
const path = require('path');

// ============================================================
// FINAL DOMAIN FIX: All URLs → www.freefincalc.net
// + Update checker domain
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
console.log('  FINAL FIX: All URLs → www.freefincalc.net');
console.log('=====================================================');
console.log('');

const appFiles = findAllFiles(APP);
const componentFiles = findAllFiles(path.join(BASE, 'components'));
const rootFiles = fs.readdirSync(BASE)
  .filter(f => f.endsWith('.js') || f.endsWith('.ts'))
  .map(f => path.join(BASE, f));

const allFiles = [...appFiles, ...componentFiles, ...rootFiles];

for (const f of allFiles) {
  let content = fs.readFileSync(f, 'utf8');
  const before = content;

  // Step 1: Find all https://www.freefincalc.net that are NOT already www
  // We need to be careful: replace "https://www.freefincalc.net" but NOT "https://www.freefincalc.net"
  // Strategy: first normalize everything to non-www, then convert all to www
  
  // Normalize: www → non-www first (in case of mixed state)
  content = content.replace(/https:\/\/www\.freefincalc\.net/g, 'https://www.freefincalc.net');
  // Now convert all to www
  content = content.replace(/https:\/\/freefincalc\.net/g, 'https://www.freefincalc.net');

  if (content !== before) {
    fs.writeFileSync(f, content, 'utf8');
    const rel = path.relative(BASE, f).replace(/\\/g, '/');
    filesFixed++;
    if (filesFixed <= 15) console.log(`  ✅ ${rel}`);
  }
}

if (filesFixed > 15) console.log(`  ... and ${filesFixed - 15} more files`);

console.log('');
console.log(`  Fixed ${filesFixed} files`);
console.log('');
console.log('=====================================================');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "All URLs use www.freefincalc.net — matches live site"');
console.log('  git push origin master');
console.log('');
console.log('Then test with:');
console.log('  node check_live_site_v3.js');
console.log('=====================================================');
console.log('');
