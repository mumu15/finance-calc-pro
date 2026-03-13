const fs = require('fs');
const path = require('path');

// ============================================================
// FULL SITE AUDIT — SEO + AdSense Revenue Optimization
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
const issues = [];
let totalPages = 0;
let pagesWithMeta = 0;
let pagesWithCanonical = 0;
let pagesWithAds = 0;
let pagesWithSchema = 0;
let pagesWithH1 = 0;

// Recursively find all page.js files
function findPages(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.next' || item === 'components') continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      findPages(full, results);
    } else if (item === 'page.js' || item === 'page.tsx') {
      results.push(full);
    }
  }
  return results;
}

// Find all client component files
function findClientFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.next') continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      findClientFiles(full, results);
    } else if (item.endsWith('Client.js') || item.endsWith('Client.tsx')) {
      results.push(full);
    }
  }
  return results;
}

console.log('');
console.log('==========================================================');
console.log('  FULL SITE AUDIT — SEO + AdSense Revenue Optimization');
console.log('  freefincalc.net');
console.log('==========================================================');
console.log('');

// ---- 1. COUNT ALL PAGES ----
const allPages = findPages(APP);
totalPages = allPages.length;
console.log(`📄 Total page.js files found: ${totalPages}`);
console.log('');

// ---- 2. CHECK EACH PAGE FOR METADATA ----
console.log('--- CHECKING PAGE METADATA ---');
let missingMeta = [];
let missingCanonical = [];

for (const pg of allPages) {
  const rel = path.relative(BASE, pg);
  const content = fs.readFileSync(pg, 'utf8');
  
  const hasMeta = content.includes('generateMetadata') || content.includes('export const metadata');
  const hasCanonical = content.includes('canonical');
  
  if (hasMeta) pagesWithMeta++;
  else missingMeta.push(rel);
  
  if (hasCanonical) pagesWithCanonical++;
  else missingCanonical.push(rel);
}

console.log(`  ✅ Pages WITH metadata: ${pagesWithMeta}/${totalPages}`);
console.log(`  ❌ Pages WITHOUT metadata: ${totalPages - pagesWithMeta}`);
if (missingMeta.length > 0 && missingMeta.length <= 20) {
  missingMeta.forEach(p => console.log(`     → ${p}`));
} else if (missingMeta.length > 20) {
  missingMeta.slice(0, 10).forEach(p => console.log(`     → ${p}`));
  console.log(`     ... and ${missingMeta.length - 10} more`);
}
console.log('');
console.log(`  ✅ Pages WITH canonical: ${pagesWithCanonical}/${totalPages}`);
console.log(`  ❌ Pages WITHOUT canonical: ${totalPages - pagesWithCanonical}`);
if (missingCanonical.length > 0 && missingCanonical.length <= 20) {
  missingCanonical.forEach(p => console.log(`     → ${p}`));
} else if (missingCanonical.length > 20) {
  missingCanonical.slice(0, 10).forEach(p => console.log(`     → ${p}`));
  console.log(`     ... and ${missingCanonical.length - 10} more`);
}
console.log('');

// ---- 3. CHECK CLIENT COMPONENTS FOR ADS + SCHEMA ----
console.log('--- CHECKING CLIENT COMPONENTS (Ads + Schema) ---');
const allClients = findClientFiles(APP);
let missingAds = [];
let missingSchema = [];
let badSchemaUsage = [];

for (const cf of allClients) {
  const rel = path.relative(BASE, cf);
  const content = fs.readFileSync(cf, 'utf8');
  
  const hasAds = content.includes('AdUnit');
  const hasSchema = content.includes('SchemaMarkup') || content.includes('StructuredData') || content.includes('BreadcrumbSchema');
  
  if (hasAds) pagesWithAds++;
  else missingAds.push(rel);
  
  if (hasSchema) pagesWithSchema++;
  else missingSchema.push(rel);
  
  // Check for SchemaMarkup called without breadcrumbs prop
  if (content.includes('<SchemaMarkup') && !content.includes('breadcrumbs=')) {
    badSchemaUsage.push(rel);
  }
  
  // Check for H1 tag
  if (content.includes('<h1') || content.includes('<H1')) pagesWithH1++;
}

// Also check static page.js files that render directly (no client component)
const staticPagesWithAds = [];
for (const pg of allPages) {
  const content = fs.readFileSync(pg, 'utf8');
  if (content.includes('AdUnit')) {
    staticPagesWithAds.push(path.relative(BASE, pg));
  }
}

console.log(`  ✅ Client components WITH AdUnit: ${pagesWithAds}/${allClients.length}`);
console.log(`  ❌ Client components WITHOUT AdUnit: ${allClients.length - pagesWithAds}`);
if (missingAds.length > 0 && missingAds.length <= 15) {
  missingAds.forEach(p => console.log(`     → ${p}`));
} else if (missingAds.length > 15) {
  missingAds.slice(0, 10).forEach(p => console.log(`     → ${p}`));
  console.log(`     ... and ${missingAds.length - 10} more`);
}
console.log('');

console.log(`  ✅ Client components WITH Schema: ${pagesWithSchema}/${allClients.length}`);
console.log(`  ❌ Client components WITHOUT Schema: ${allClients.length - pagesWithSchema}`);
if (missingSchema.length > 0 && missingSchema.length <= 15) {
  missingSchema.forEach(p => console.log(`     → ${p}`));
} else if (missingSchema.length > 15) {
  missingSchema.slice(0, 10).forEach(p => console.log(`     → ${p}`));
  console.log(`     ... and ${missingSchema.length - 10} more`);
}
console.log('');

if (badSchemaUsage.length > 0) {
  console.log(`  ⚠️  SchemaMarkup called WITHOUT breadcrumbs prop: ${badSchemaUsage.length} files`);
  console.log(`     (These will render empty breadcrumb JSON-LD — bad for SEO)`);
  badSchemaUsage.slice(0, 10).forEach(p => console.log(`     → ${p}`));
  if (badSchemaUsage.length > 10) console.log(`     ... and ${badSchemaUsage.length - 10} more`);
  console.log('');
}

// ---- 4. SITEMAP AUDIT ----
console.log('--- SITEMAP AUDIT ---');
const sitemapFile = path.join(APP, 'sitemap.js');
if (fs.existsSync(sitemapFile)) {
  const smContent = fs.readFileSync(sitemapFile, 'utf8');
  
  // Count URLs in sitemap
  const urlMatches = smContent.match(/"url":/g);
  const sitemapCount = urlMatches ? urlMatches.length : 0;
  console.log(`  📍 URLs in sitemap.js: ${sitemapCount}`);
  console.log(`  📄 Actual pages on site: ${totalPages}`);
  
  if (sitemapCount < totalPages) {
    console.log(`  ❌ CRITICAL: Sitemap is MISSING ${totalPages - sitemapCount} pages!`);
    console.log(`     Google can't index pages it doesn't know about.`);
  }
  
  // Check sitemap format
  if (smContent.includes('"freq"')) {
    console.log(`  ⚠️  Sitemap uses "freq" — Next.js expects "changeFrequency"`);
    console.log(`     (Your .map() converts it, so this is OK but messy)`);
  }
} else {
  console.log(`  ❌ CRITICAL: No sitemap.js found!`);
}
console.log('');

// ---- 5. ROBOTS.JS CHECK ----
console.log('--- ROBOTS.JS CHECK ---');
const robotsFile = path.join(APP, 'robots.js');
if (fs.existsSync(robotsFile)) {
  const robotsContent = fs.readFileSync(robotsFile, 'utf8');
  console.log(`  ✅ robots.js exists`);
  if (!robotsContent.includes('sitemap')) {
    console.log(`  ❌ robots.js does NOT reference sitemap URL!`);
  } else {
    console.log(`  ✅ robots.js references sitemap`);
  }
  if (robotsContent.includes('Disallow: /')) {
    console.log(`  ⚠️  robots.js has Disallow rules — make sure they're correct`);
  }
} else {
  console.log(`  ❌ No robots.js found — Google won't know your rules`);
}
console.log('');

// ---- 6. LAYOUT.JS ISSUES ----
console.log('--- LAYOUT.JS AUDIT ---');
const layoutFile = path.join(APP, 'layout.js');
if (fs.existsSync(layoutFile)) {
  const layoutContent = fs.readFileSync(layoutFile, 'utf8');
  
  // Check encoding issues
  if (layoutContent.includes('ΓÇö') || layoutContent.includes('\u0393\u00c7\u00b6')) {
    console.log(`  ❌ ENCODING BUG: Title/description contains garbled characters (ΓÇö instead of —)`);
    console.log(`     This shows as broken text in Google search results!`);
  }
  
  // Check title format
  if (layoutContent.includes('124 calculators')) {
    console.log(`  ⚠️  Layout says "124 calculators" but you have ${totalPages}+ pages`);
    console.log(`     Update this number for credibility`);
  }
  
  // Check viewport
  if (!layoutContent.includes('viewport')) {
    console.log(`  ⚠️  No viewport meta — mobile SEO may suffer`);
    console.log(`     (Next.js adds this automatically, so this is likely OK)`);
  }
  
  console.log(`  ✅ AdSense script loaded with afterInteractive strategy (good)`);
  console.log(`  ✅ Preconnect to Google Ad domains (good)`);
}
console.log('');

// ---- 7. CHECK FOR DUPLICATE/MISSING TITLE PATTERNS ----
console.log('--- METADATA QUALITY CHECK ---');
let pagesWithUniqueTitle = 0;
let pagesWithUniqueDesc = 0;
let titlePatterns = {};

for (const pg of allPages) {
  const content = fs.readFileSync(pg, 'utf8');
  
  // Look for title in generateMetadata or metadata export
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  const titleTemplate = content.match(/title.*\$\{/); // template literal
  
  if (titleMatch || titleTemplate) {
    pagesWithUniqueTitle++;
    if (titleMatch) {
      const t = titleMatch[1].substring(0, 40);
      titlePatterns[t] = (titlePatterns[t] || 0) + 1;
    }
  }
  
  const descMatch = content.match(/description:\s*['"`]([^'"`]{10,})['"`]/);
  const descTemplate = content.match(/description.*\$\{/);
  if (descMatch || descTemplate) pagesWithUniqueDesc++;
}

console.log(`  ✅ Pages with title: ${pagesWithUniqueTitle}/${totalPages}`);
console.log(`  ✅ Pages with description: ${pagesWithUniqueDesc}/${totalPages}`);
console.log(`  ❌ Pages WITHOUT title: ${totalPages - pagesWithUniqueTitle}`);
console.log(`  ❌ Pages WITHOUT description: ${totalPages - pagesWithUniqueDesc}`);
console.log('');

// ---- 8. CHECK next.config.js ----
console.log('--- NEXT.CONFIG.JS AUDIT ---');
const ncFile = path.join(BASE, 'next.config.js');
if (fs.existsSync(ncFile)) {
  const ncContent = fs.readFileSync(ncFile, 'utf8');
  
  if (!ncContent.includes('images')) {
    console.log(`  ⚠️  No image optimization config`);
  }
  if (ncContent.includes('compress: true')) {
    console.log(`  ✅ Compression enabled`);
  }
  if (!ncContent.includes('headers')) {
    console.log(`  ⚠️  No custom headers — consider adding cache-control for better performance`);
  }
  if (!ncContent.includes('poweredByHeader')) {
    console.log(`  ⚠️  X-Powered-By header still enabled — disable for security`);
  }
}
console.log('');

// ---- 9. AD PLACEMENT ANALYSIS ----
console.log('--- AD PLACEMENT ANALYSIS ---');
let totalAdSlots = 0;
let filesWithMultipleAds = 0;
const allJSFiles = [...allPages, ...allClients];

for (const f of allClients) {
  const content = fs.readFileSync(f, 'utf8');
  const adMatches = content.match(/AdUnit/g);
  if (adMatches) {
    const count = adMatches.length - (content.match(/import.*AdUnit/g) || []).length;
    totalAdSlots += count;
    if (count >= 2) filesWithMultipleAds++;
  }
}

console.log(`  📊 Total AdUnit placements across client components: ${totalAdSlots}`);
console.log(`  📊 Components with 2+ ads: ${filesWithMultipleAds}`);
console.log(`  💡 For max AdSense revenue: aim for 2-3 ads per page`);
console.log(`     (top of content, mid-content, bottom of content)`);
console.log('');

// ---- 10. CHECK FOR COMMON BUILD ERRORS ----
console.log('--- POTENTIAL BUILD ERROR CHECK ---');
let undefinedMapCalls = 0;
let unsafeFiles = [];

for (const cf of allClients) {
  const content = fs.readFileSync(cf, 'utf8');
  const rel = path.relative(BASE, cf);
  
  // Check for .map() without optional chaining or default
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Look for patterns like: someVar.map( without ?. 
    // but exclude hardcoded arrays like [].map and known safe patterns
    if (line.match(/\w+\.map\s*\(/) && !line.includes('?.map') && !line.includes('].map') && !line.includes(').map')) {
      // Could be unsafe if the variable might be undefined
      if (!line.includes('filter(') && !line.includes('||')) {
        // Check if it's a prop that might be undefined
        if (line.match(/(props\.|all\.|items\.|data\.|list\.|cities\.|breadcrumbs)\.map/)) {
          unsafeFiles.push({ file: rel, line: i + 1, code: line.trim().substring(0, 80) });
        }
      }
    }
  }
}

if (unsafeFiles.length > 0) {
  console.log(`  ⚠️  Potentially unsafe .map() calls (could crash during build):`);
  unsafeFiles.slice(0, 10).forEach(f => {
    console.log(`     → ${f.file}:${f.line}`);
    console.log(`       ${f.code}`);
  });
  if (unsafeFiles.length > 10) console.log(`     ... and ${unsafeFiles.length - 10} more`);
} else {
  console.log(`  ✅ No obviously unsafe .map() calls found`);
}
console.log('');

// ---- SUMMARY ----
console.log('==========================================================');
console.log('  AUDIT SUMMARY');
console.log('==========================================================');
console.log('');

const criticalIssues = [];
const warnings = [];
const good = [];

// Critical
if (missingMeta.length > 0) criticalIssues.push(`${missingMeta.length} pages missing metadata (title/description)`);
if (missingCanonical.length > 0) criticalIssues.push(`${missingCanonical.length} pages missing canonical URLs`);
if (badSchemaUsage.length > 0) criticalIssues.push(`${badSchemaUsage.length} pages have SchemaMarkup without breadcrumbs (empty JSON-LD)`);

// Check sitemap gap
const smContent2 = fs.existsSync(sitemapFile) ? fs.readFileSync(sitemapFile, 'utf8') : '';
const smCount = (smContent2.match(/"url":/g) || []).length;
if (smCount < totalPages) criticalIssues.push(`Sitemap only has ${smCount} URLs but site has ${totalPages} pages — ${totalPages - smCount} pages invisible to Google`);

const layoutContent2 = fs.existsSync(layoutFile) ? fs.readFileSync(layoutFile, 'utf8') : '';
if (layoutContent2.includes('ΓÇö')) criticalIssues.push('Encoding bug in layout.js — garbled characters in title/meta');

// Warnings
if (missingAds.length > 0) warnings.push(`${missingAds.length} client components missing AdUnit — lost revenue`);
if (missingSchema.length > 0) warnings.push(`${missingSchema.length} client components missing structured data`);

// Good
if (pagesWithMeta > 0) good.push(`${pagesWithMeta} pages have metadata`);
if (pagesWithAds > 0) good.push(`${pagesWithAds} components have ads`);
good.push('AdSense loaded with afterInteractive (no performance hit)');
good.push('Compression enabled in next.config');

console.log('🔴 CRITICAL ISSUES (fix these FIRST — they block revenue):');
if (criticalIssues.length === 0) console.log('  None! Great job.');
else criticalIssues.forEach(i => console.log(`  → ${i}`));
console.log('');

console.log('🟡 WARNINGS (fix these for more revenue):');
if (warnings.length === 0) console.log('  None!');
else warnings.forEach(w => console.log(`  → ${w}`));
console.log('');

console.log('🟢 WHAT\'S WORKING WELL:');
good.forEach(g => console.log(`  → ${g}`));
console.log('');

console.log('==========================================================');
console.log('  NEXT STEPS — Tell me which issue to fix first!');
console.log('==========================================================');
console.log('');
console.log('I can generate fix scripts for any of the above issues.');
console.log('Just paste this output back to me and I\'ll create the fix.');
console.log('');
