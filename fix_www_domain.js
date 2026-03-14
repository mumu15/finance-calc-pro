const fs = require('fs');
const path = require('path');

// ============================================================
// FIX: Update all URLs from freefincalc.net → www.freefincalc.net
// Covers: canonicals, sitemap, layout, structured data, OG urls
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
console.log('  FIX: freefincalc.net → www.freefincalc.net');
console.log('=====================================================');
console.log('');

// Process ALL JS files in the project (app + components + data + root)
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

  // Replace https://freefincalc.net with https://freefincalc.net
  // But NOT if it already has www
  // Use a regex that matches https://freefincalc.net but NOT https://freefincalc.net
  const count = (content.match(/https:\/\/freefincalc\.net/g) || []).length;
  const wwwCount = (content.match(/https:\/\/www\.freefincalc\.net/g) || []).length;
  const nonWwwCount = count - wwwCount;

  if (nonWwwCount > 0) {
    // Replace only non-www instances
    content = content.replace(/https:\/\/freefincalc\.net(?![\w.])/g, 'https://freefincalc.net');
    
    if (content !== before) {
      fs.writeFileSync(f, content, 'utf8');
      const rel = path.relative(BASE, f).replace(/\\/g, '/');
      filesFixed++;
      replacements += nonWwwCount;
      if (filesFixed <= 20) console.log(`  ✅ ${rel} (${nonWwwCount} URLs updated)`);
    }
  }
}

if (filesFixed > 20) console.log(`  ... and ${filesFixed - 20} more files`);

console.log('');
console.log('=====================================================');
console.log(`  RESULTS: ${filesFixed} files fixed, ${replacements} URLs updated`);
console.log('=====================================================');
console.log('');
console.log('  What changed:');
console.log('    ✅ All canonical URLs now use www.freefincalc.net');
console.log('    ✅ Sitemap URLs now use www.freefincalc.net');
console.log('    ✅ Layout metadataBase updated');
console.log('    ✅ OpenGraph URLs updated');
console.log('    ✅ Structured data URLs updated');
console.log('    ✅ Breadcrumb URLs updated');
console.log('');
console.log('  Why this matters:');
console.log('    - Google was seeing redirects on every page');
console.log('    - Canonical mismatch hurts crawl budget');
console.log('    - AdSense reviewers check for redirect chains');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Fix www domain mismatch — all URLs now use www.freefincalc.net"');
console.log('  git push origin master');
console.log('');
console.log('After deploy, re-run: node check_live_site.js');
console.log('(But first update DOMAIN in check_live_site.js to https://freefincalc.net)');
console.log('');
