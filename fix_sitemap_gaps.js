const fs = require('fs');
const path = require('path');

const APP = path.join(__dirname, 'app');
const smFile = path.join(APP, 'sitemap.js');
let sm = fs.readFileSync(smFile, 'utf8');

const states = require('./data/states.js');

let newEntries = '';
let added = 0;

// Home Affordability state pages
if (!sm.includes('home-affordability-calculator/state')) {
  states.forEach(s => {
    newEntries += `  { url: "/home-affordability-calculator/state/${s.slug}", priority: 0.8, freq: "monthly" },\n`;
    added++;
  });
  console.log('  ✅ Added 50 home-affordability state URLs');
}

// Mortgage state pages (check format — could be /mortgage-calculator/[state] or /mortgage-calculator/state/[state])
// Find the actual route
const mortDirs = [
  path.join(APP, 'mortgage-calculator'),
];

// Check what mortgage sub-pages exist
const mortFiles = [];
function findMortPages(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory() && item !== 'components' && item !== 'state') {
      // This is a direct slug like /mortgage-calculator/new-york
      const pgFile = path.join(full, 'page.js');
      if (fs.existsSync(pgFile)) mortFiles.push(item);
      // Check for nested
      findMortPages(full);
    }
    if (item === 'state' && fs.statSync(full).isDirectory()) {
      // /mortgage-calculator/state/[state] pattern
      const dynDir = path.join(full, '[state]');
      if (fs.existsSync(dynDir)) {
        console.log('  Found mortgage-calculator/state/[state] route');
      }
    }
  }
}
findMortPages(path.join(APP, 'mortgage-calculator'));

// Check if mortgage pages are direct slugs (e.g. /mortgage-calculator/new-york)
if (mortFiles.length > 0 && !sm.includes('mortgage-calculator/' + mortFiles[0])) {
  mortFiles.forEach(slug => {
    newEntries += `  { url: "/mortgage-calculator/${slug}", priority: 0.8, freq: "monthly" },\n`;
    added++;
  });
  console.log('  ✅ Added ' + mortFiles.length + ' mortgage state URLs (direct slug format)');
}

// Also check for salary-after-tax state pages format
const satDir = path.join(APP, 'salary-after-tax-calculator');
if (fs.existsSync(satDir)) {
  const satSubs = [];
  function findSatPages(dir) {
    if (!fs.existsSync(dir)) return;
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory() && item !== 'components') {
        const pg = path.join(full, 'page.js');
        if (fs.existsSync(pg) && !item.startsWith('[')) satSubs.push(item);
        findSatPages(full);
      }
    }
  }
  findSatPages(satDir);
}

// Cost of living state pages - check too
if (!sm.includes('cost-of-living-calculator/state/')) {
  const colStates = require('./data/colStates.js');
  colStates.forEach(s => {
    newEntries += `  { url: "/cost-of-living-calculator/state/${s.slug}", priority: 0.8, freq: "monthly" },\n`;
    added++;
  });
  console.log('  ✅ Added 50 cost-of-living state URLs');
}

if (added > 0) {
  // Insert before the closing ]
  const lastBracket = sm.lastIndexOf(']');
  sm = sm.slice(0, lastBracket) + ',\n' + newEntries + sm.slice(lastBracket);
  fs.writeFileSync(smFile, sm, 'utf8');
  console.log('\n  Total new URLs added: ' + added);
} else {
  console.log('  Nothing to add — all URLs already in sitemap');
}

// Count total
const urlCount = (sm.match(/url:/g) || []).length + added;
console.log('  Estimated sitemap total: ~' + urlCount + ' URLs');
console.log('\nNow run:');
console.log('  git add . && git commit -m "Fix sitemap — add missing state pages" && git push origin master');
