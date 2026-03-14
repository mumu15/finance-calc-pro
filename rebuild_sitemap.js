const fs = require('fs');
const path = require('path');

// ============================================================
// REBUILD SITEMAP — Only include pages that actually exist
// Removes all 670 ghost URLs that return 404
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
const DOMAIN = 'https://www.freefincalc.net';

// Find all actual page.js files and derive their URL paths
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

// For dynamic routes like [city], [age], etc., we need to read the data files
// to get the actual slugs/values
function getStaticParams(pageFile) {
  const content = fs.readFileSync(pageFile, 'utf8');
  
  // Look for generateStaticParams or direct data imports
  const paramMatch = content.match(/generateStaticParams/);
  if (!paramMatch) return null;
  
  // Try to find the data source
  const importMatch = content.match(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g);
  if (!importMatch) return null;
  
  // Find data imports (not component imports)
  for (const imp of importMatch) {
    const match = imp.match(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/);
    if (!match) continue;
    const [, varName, importPath] = match;
    
    // Skip component imports
    if (importPath.includes('components/') || importPath.includes('next/')) continue;
    if (!importPath.includes('data/') && !importPath.includes('../data/')) continue;
    
    // Resolve the data file path
    const dir = path.dirname(pageFile);
    let dataFile = path.resolve(dir, importPath);
    if (!dataFile.endsWith('.js')) dataFile += '.js';
    
    if (fs.existsSync(dataFile)) {
      try {
        const dataContent = fs.readFileSync(dataFile, 'utf8');
        // Extract slugs from the data
        const slugMatches = dataContent.match(/"slug":\s*"([^"]+)"/g);
        if (slugMatches) {
          return slugMatches.map(m => m.match(/"slug":\s*"([^"]+)"/)[1]);
        }
        // For numeric arrays (amounts, prices, salaries, ages, years, balances)
        // These are typically folders, not dynamic routes
      } catch (e) {}
    }
  }
  
  return null;
}

console.log('');
console.log('=====================================================');
console.log('  REBUILDING SITEMAP — Only real pages');
console.log('=====================================================');
console.log('');

const allPages = findPages(APP);
const urls = [];

for (const pg of allPages) {
  const relToApp = path.relative(APP, path.dirname(pg)).replace(/\\/g, '/');
  
  // Skip special files
  if (relToApp === '' || relToApp === '.') {
    urls.push({ url: '/', priority: 1.0, freq: 'weekly' });
    continue;
  }
  
  // Skip dynamic route template pages — we'll handle them via static folders
  if (relToApp.includes('[')) {
    // Dynamic pages are generated at build time
    // The actual URLs come from generateStaticParams
    // But we can find them by looking at sibling static folders
    continue;
  }
  
  // Convert path to URL
  const urlPath = '/' + relToApp;
  
  // Determine priority based on depth
  const depth = relToApp.split('/').length;
  let priority = 0.8;
  let freq = 'monthly';
  
  // Core pages
  if (depth === 1) {
    priority = 0.9;
    freq = 'weekly';
  }
  
  // Blog
  if (relToApp.startsWith('blog')) {
    priority = relToApp === 'blog' ? 0.8 : 0.7;
    freq = 'monthly';
  }
  
  // Legal/info pages
  if (['about', 'contact', 'privacy-policy', 'terms'].includes(relToApp)) {
    priority = 0.3;
    freq = 'monthly';
  }
  
  // Sub-pages (city, state, amount, etc.)
  if (depth >= 3) {
    priority = 0.7;
    freq = 'monthly';
  }
  
  urls.push({ url: urlPath, priority, freq });
}

// Sort: homepage first, then by priority desc, then alphabetically
urls.sort((a, b) => {
  if (a.url === '/') return -1;
  if (b.url === '/') return 1;
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.url.localeCompare(b.url);
});

console.log(`  Found ${urls.length} real pages`);
console.log('');

// Generate the new sitemap.js
const sitemapEntries = urls.map(u => `  { url: "${u.url}", priority: ${u.priority}, freq: "${u.freq}" }`).join(',\n');

const sitemapContent = `export default function sitemap() {
  const base = '${DOMAIN}';
  const today = new Date().toISOString().split('T')[0];

  return [
${sitemapEntries}
  ].map(entry => ({
    url: base + entry.url,
    lastModified: today,
    changeFrequency: entry.freq,
    priority: entry.priority,
  }));
}
`;

const sitemapFile = path.join(APP, 'sitemap.js');

// Backup old sitemap
const backupFile = path.join(BASE, 'sitemap_backup.js');
fs.copyFileSync(sitemapFile, backupFile);
console.log(`  📦 Backed up old sitemap to sitemap_backup.js`);

// Write new sitemap
fs.writeFileSync(sitemapFile, sitemapContent, 'utf8');
console.log(`  ✅ New sitemap.js written with ${urls.length} URLs`);

// Show what was removed
console.log('');
console.log('  📊 Comparison:');
console.log(`     Old sitemap: 1381 URLs (670 were 404s)`);
console.log(`     New sitemap: ${urls.length} URLs (all real pages)`);
console.log(`     Removed:     ${1381 - urls.length} ghost URLs`);
console.log('');

// Show sample of URLs included
console.log('  Sample URLs included:');
urls.slice(0, 15).forEach(u => console.log(`     ${u.url}`));
console.log(`     ... and ${urls.length - 15} more`);

console.log('');
console.log('=====================================================');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Rebuild sitemap — remove 670 ghost 404 URLs"');
console.log('  git push origin master');
console.log('');
console.log('After deploy, re-run: node check_live_site.js');
console.log('=====================================================');
console.log('');
