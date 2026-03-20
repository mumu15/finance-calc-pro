const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const APP = path.join(BASE, 'app');
const DOMAIN = 'https://www.freefincalc.net';

function findPages(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.next' || item === 'components') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) findPages(full, results);
    else if (item === 'page.js' || item === 'page.tsx') results.push(full);
  }
  return results;
}

console.log('');
console.log('=====================================================');
console.log('  REBUILD SITEMAP — from all actual pages');
console.log('=====================================================');
console.log('');

const allPages = findPages(APP);
const urls = [];

for (const pg of allPages) {
  const relToApp = path.relative(APP, path.dirname(pg)).replace(/\\/g, '/');

  // Skip dynamic route templates — they generate pages at build time
  if (relToApp.includes('[')) continue;

  const urlPath = relToApp === '' || relToApp === '.' ? '/' : '/' + relToApp;

  // Determine priority
  let priority = 0.8;
  let freq = 'monthly';
  const depth = relToApp.split('/').filter(Boolean).length;

  if (urlPath === '/') { priority = 1.0; freq = 'weekly'; }
  else if (depth === 1 && !relToApp.startsWith('blog') && !['about','contact','privacy-policy','terms'].includes(relToApp)) { priority = 0.9; freq = 'weekly'; }
  else if (relToApp.startsWith('blog/') && depth === 2) { priority = 0.7; freq = 'monthly'; }
  else if (relToApp === 'blog') { priority = 0.8; freq = 'weekly'; }
  else if (['about','contact','privacy-policy','terms'].includes(relToApp)) { priority = 0.3; freq = 'monthly'; }
  else if (depth >= 2) { priority = 0.8; freq = 'monthly'; }
  if (depth >= 3) { priority = 0.7; freq = 'monthly'; }

  urls.push({ url: urlPath, priority, freq });
}

// Now handle dynamic routes by reading their generateStaticParams data
// We need to find [param] folders and resolve their slugs

function findDynamicRoutes(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.next' || item === 'components') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      if (item.startsWith('[') && item.endsWith(']')) {
        const pageFile = path.join(full, 'page.js');
        if (fs.existsSync(pageFile)) {
          results.push({ dir: full, pageFile, paramName: item.slice(1, -1) });
        }
      }
      findDynamicRoutes(full, results);
    }
  }
  return results;
}

const dynamicRoutes = findDynamicRoutes(APP);

for (const route of dynamicRoutes) {
  const content = fs.readFileSync(route.pageFile, 'utf8');
  const relToApp = path.relative(APP, route.dir).replace(/\\/g, '/');
  const urlTemplate = '/' + relToApp.replace(/\[([^\]]+)\]/g, '__PARAM__');

  // Try to find the data source
  const importMatches = content.match(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g) || [];

  for (const imp of importMatches) {
    const match = imp.match(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/);
    if (!match) continue;
    const [, varName, importPath] = match;
    if (importPath.includes('components/') || importPath.includes('next/')) continue;

    const resolved = path.resolve(route.dir, importPath);
    let dataFile = resolved;
    if (!dataFile.endsWith('.js')) dataFile += '.js';
    if (!fs.existsSync(dataFile)) continue;

    try {
      const dataContent = fs.readFileSync(dataFile, 'utf8');

      // Extract slugs
      const slugMatches = dataContent.match(/"slug":\s*"([^"]+)"/g);
      if (slugMatches) {
        const slugs = slugMatches.map(m => m.match(/"slug":\s*"([^"]+)"/)[1]);
        const depth = relToApp.split('/').filter(Boolean).length;

        for (const slug of slugs) {
          const url = urlTemplate.replace('__PARAM__', slug);
          urls.push({ url, priority: depth >= 3 ? 0.7 : 0.8, freq: 'monthly' });
        }
        break; // Found data, no need to check other imports
      }

      // For numeric static folders (amounts, prices, etc) — already found as static pages above
    } catch (e) { /* skip */ }
  }
}

// Deduplicate
const seen = new Set();
const unique = [];
for (const u of urls) {
  if (!seen.has(u.url)) {
    seen.add(u.url);
    unique.push(u);
  }
}

// Sort
unique.sort((a, b) => {
  if (a.url === '/') return -1;
  if (b.url === '/') return 1;
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.url.localeCompare(b.url);
});

console.log('  Found ' + unique.length + ' unique URLs');
console.log('');

// Generate sitemap.js
const entries = unique.map(u => `  { url: "${u.url}", priority: ${u.priority}, freq: "${u.freq}" }`).join(',\n');

const sitemapContent = `export default function sitemap() {
  const base = '${DOMAIN}';
  const today = new Date().toISOString().split('T')[0];

  return [
${entries}
  ].map(entry => ({
    url: base + entry.url,
    lastModified: today,
    changeFrequency: entry.freq,
    priority: entry.priority,
  }));
}
`;

// Backup
const backupFile = path.join(BASE, 'sitemap_backup_' + Date.now() + '.js');
fs.copyFileSync(path.join(APP, 'sitemap.js'), backupFile);
console.log('  Backed up old sitemap');

fs.writeFileSync(path.join(APP, 'sitemap.js'), sitemapContent, 'utf8');
console.log('  ✅ New sitemap.js written with ' + unique.length + ' URLs');

// Show breakdown
const corePg = unique.filter(u => u.priority >= 0.9).length;
const subPg = unique.filter(u => u.priority === 0.8).length;
const deepPg = unique.filter(u => u.priority === 0.7).length;
const infoPg = unique.filter(u => u.priority < 0.7).length;

console.log('');
console.log('  Breakdown:');
console.log('    Core pages (0.9+):  ' + corePg);
console.log('    Sub pages (0.8):    ' + subPg);
console.log('    Deep pages (0.7):   ' + deepPg);
console.log('    Info pages (<0.7):  ' + infoPg);

// Check for state pages
const ptStates = unique.filter(u => u.url.includes('property-tax-calculator/state/')).length;
const haStates = unique.filter(u => u.url.includes('home-affordability-calculator/state/')).length;
const mortStates = unique.filter(u => u.url.includes('mortgage-calculator/state/')).length;
const satStates = unique.filter(u => u.url.includes('salary-after-tax/state/')).length;
const taxStates = unique.filter(u => u.url.includes('tax-calculator/state/')).length;

console.log('');
console.log('  State pages:');
console.log('    Property Tax by State:      ' + ptStates);
console.log('    Home Affordability by State: ' + haStates);
console.log('    Mortgage by State:           ' + mortStates);
console.log('    Salary After Tax by State:   ' + satStates);
console.log('    Tax Calculator by State:     ' + taxStates);

console.log('');
console.log('=====================================================');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Rebuild sitemap — all ' + unique.length + ' pages included"');
console.log('  git push origin master');
console.log('');
console.log('Then re-run: node check_live_site_v3.js');
console.log('=====================================================');
console.log('');
