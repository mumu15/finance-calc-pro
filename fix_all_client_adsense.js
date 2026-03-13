const fs = require('fs');
const path = require('path');

const AD_SLOT_1 = '7405024590';
const AD_SLOT_2 = '3248634657';

let fixed = 0;
let skipped = 0;

// Find all *Client.js files (RetirementAgeClient.js, BudgetCityClient.js etc)
function walkDir(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules','.next','public','data'].includes(entry.name)) return;
      walkDir(fullPath, results);
    } else if (entry.name.endsWith('Client.js') || entry.name === 'Client.js') {
      results.push(fullPath);
    }
  });
  return results;
}

function getDepth(filePath) {
  // Count path segments from project root
  return filePath.split(path.sep).length - 1;
}

function getRelPath(filePath, target) {
  // target is 'components/AdUnit' etc from project root
  const depth = filePath.split(path.sep).length - 1;
  // app/a/b/[c]/Client.js = depth 4, need ../../../../components/AdUnit
  const ups = '../'.repeat(depth - 1);
  return ups + target;
}

function fixClientFile(filePath) {
  let c = fs.readFileSync(filePath, 'utf8');

  // Only fix 'use client' files
  if (!c.startsWith("'use client'") && !c.startsWith('"use client"')) {
    skipped++; return;
  }

  // Skip if already has AdUnit slots
  if (c.includes(AD_SLOT_1)) { skipped++; return; }

  let changed = false;

  // 1. Add AdUnit import if missing
  if (!c.includes('AdUnit')) {
    const rel = getRelPath(filePath, 'components/AdUnit');
    // Insert after last import line
    c = c.replace(/(import[^\n]+\n)(?!import)/, '$1import AdUnit from \'' + rel + '\';\n');
    changed = true;
  }

  // 2. Add SchemaMarkup import if missing
  if (!c.includes('SchemaMarkup')) {
    const rel = getRelPath(filePath, 'components/SchemaMarkup');
    c = c.replace(/(import[^\n]+\n)(?!import)/, '$1import SchemaMarkup from \'' + rel + '\';\n');
    changed = true;
  }

  // 3. Inject SchemaMarkup + AdUnit after <Header />
  if (c.includes('<Header />') && !c.includes(AD_SLOT_1)) {
    c = c.replace(
      '<Header />',
      '<Header />\n        <SchemaMarkup />\n        <AdUnit slot="' + AD_SLOT_1 + '" />'
    );
    changed = true;
  } else if (c.includes('<Header/>') && !c.includes(AD_SLOT_1)) {
    c = c.replace(
      '<Header/>',
      '<Header/>\n        <SchemaMarkup />\n        <AdUnit slot="' + AD_SLOT_1 + '" />'
    );
    changed = true;
  }

  // 4. Inject second AdUnit before <Footer />
  if (c.includes('<Footer />') && !c.includes(AD_SLOT_2)) {
    c = c.replace(
      '<Footer />',
      '<AdUnit slot="' + AD_SLOT_2 + '" />\n      <Footer />'
    );
    changed = true;
  } else if (c.includes('<Footer/>') && !c.includes(AD_SLOT_2)) {
    c = c.replace(
      '<Footer/>',
      '<AdUnit slot="' + AD_SLOT_2 + '" />\n      <Footer/>'
    );
    changed = true;
  }

  // 5. Fix range sliders → number inputs
  if (c.includes('type="range"') || c.includes("type='range'")) {
    c = c.replace(/type="range"/g, 'type="number"');
    c = c.replace(/type='range'/g, "type='number'");
    // Remove range-specific attributes
    c = c.replace(/\s+min=\{[^}]+\}/g, '');
    c = c.replace(/\s+max=\{[^}]+\}/g, '');
    c = c.replace(/\s+step=\{[^}]+\}/g, '');
    c = c.replace(/\s+min="[^"]+"/g, '');
    c = c.replace(/\s+max="[^"]+"/g, '');
    c = c.replace(/\s+step="[^"]+"/g, '');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, c, 'utf8');
    fixed++;
    if (fixed <= 15) console.log('✅ ' + filePath);
  } else {
    skipped++;
  }
}

const files = walkDir('app');
console.log('Found ' + files.length + ' Client.js files\n');
files.forEach(fixClientFile);

console.log('\n(showing first 15 fixed)\n─────────────────────────────────────');
console.log('✅ Fixed:   ' + fixed);
console.log('⏭️  Skipped: ' + skipped + ' (already complete)');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Add AdUnit + SchemaMarkup to all client components, fix sliders"');
console.log('  git push origin master');
