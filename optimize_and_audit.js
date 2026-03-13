const fs = require('fs');
const path = require('path');

// ============================================================
// PART 1: OPTIMIZE next.config.js for performance + security
// PART 2: RE-RUN FULL AUDIT to see improvement
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');

// ---- PART 1: OPTIMIZE next.config.js ----
console.log('');
console.log('=====================================================');
console.log('  OPTIMIZING next.config.js');
console.log('=====================================================');
console.log('');

const ncFile = path.join(BASE, 'next.config.js');
const optimizedConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/(.*)\\\\.(js|css|woff2|ico|svg|png|jpg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
`;

fs.writeFileSync(ncFile, optimizedConfig, 'utf8');
console.log('  ✅ Disabled X-Powered-By header (security)');
console.log('  ✅ Enabled React Strict Mode');
console.log('  ✅ Added image optimization (AVIF + WebP)');
console.log('  ✅ Added security headers (X-Frame-Options, X-Content-Type)');
console.log('  ✅ Added cache headers for static assets (1 year)');
console.log('');

// ---- PART 2: FULL RE-AUDIT ----
console.log('=====================================================');
console.log('  FULL SITE RE-AUDIT');
console.log('=====================================================');
console.log('');

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

function findClientFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.next') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) findClientFiles(full, results);
    else if (item.endsWith('Client.js') || item.endsWith('Client.tsx')) results.push(full);
  }
  return results;
}

const allPages = findPages(APP);
const allClients = findClientFiles(APP);
const totalPages = allPages.length;

let pagesWithMeta = 0, pagesWithCanonical = 0, pagesWithAds = 0;
let pagesWithSchema = 0, pagesWithJsonLd = 0;
let missingMeta = [], missingCanonical = [];

for (const pg of allPages) {
  const content = fs.readFileSync(pg, 'utf8');
  if (content.includes('generateMetadata') || content.includes('export const metadata')) pagesWithMeta++;
  else missingMeta.push(path.relative(BASE, pg));
  if (content.includes('canonical')) pagesWithCanonical++;
  else missingCanonical.push(path.relative(BASE, pg));
}

let clientsWithAds = 0, clientsWithSchema = 0, clientsWithJsonLd = 0;
let badSchemaUsage = 0;

for (const cf of allClients) {
  const content = fs.readFileSync(cf, 'utf8');
  if (content.includes('AdUnit')) clientsWithAds++;
  if (content.includes('SchemaMarkup') || content.includes('StructuredData') || content.includes('BreadcrumbSchema')) clientsWithSchema++;
  if (content.includes('application/ld+json')) clientsWithJsonLd++;
  if (content.includes('<SchemaMarkup') && !content.includes('breadcrumbs=') && !content.includes('breadcrumbs ={')) badSchemaUsage++;
}

console.log(`  📄 Total pages: ${totalPages}`);
console.log(`  📦 Total client components: ${allClients.length}`);
console.log('');
console.log('  --- METADATA ---');
console.log(`  ✅ Pages WITH metadata:    ${pagesWithMeta}/${totalPages}`);
console.log(`  ❌ Pages WITHOUT metadata: ${totalPages - pagesWithMeta}`);
if (missingMeta.length > 0 && missingMeta.length <= 10) {
  missingMeta.forEach(p => console.log(`     → ${p}`));
}
console.log('');
console.log('  --- CANONICAL URLs ---');
console.log(`  ✅ Pages WITH canonical:    ${pagesWithCanonical}/${totalPages}`);
console.log(`  ❌ Pages WITHOUT canonical: ${totalPages - pagesWithCanonical}`);
console.log('');
console.log('  --- ADS ---');
console.log(`  ✅ Components WITH AdUnit: ${clientsWithAds}/${allClients.length}`);
console.log('');
console.log('  --- STRUCTURED DATA ---');
console.log(`  ✅ Components with SchemaMarkup component: ${clientsWithSchema}`);
console.log(`  ✅ Components with inline JSON-LD:         ${clientsWithJsonLd}`);
console.log(`  ❌ Components WITHOUT any schema:          ${allClients.length - clientsWithSchema - clientsWithJsonLd + (clientsWithSchema > 0 ? Math.min(clientsWithSchema, clientsWithJsonLd) : 0)}`);
console.log(`  ⚠️  SchemaMarkup without breadcrumbs prop: ${badSchemaUsage}`);
console.log('');

// Check encoding
let encodingIssues = 0;
function checkEncoding(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.next') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) checkEncoding(full);
    else if (item.endsWith('.js') || item.endsWith('.tsx')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('ΓÇö') || c.includes('ΓÇ║')) encodingIssues++;
    }
  }
}
checkEncoding(APP);
console.log('  --- ENCODING ---');
console.log(`  ${encodingIssues === 0 ? '✅' : '❌'} Files with encoding issues: ${encodingIssues}`);
console.log('');

// Sitemap
const smFile = path.join(APP, 'sitemap.js');
const smContent = fs.existsSync(smFile) ? fs.readFileSync(smFile, 'utf8') : '';
const smCount = (smContent.match(/"url":/g) || []).length;
console.log('  --- SITEMAP ---');
console.log(`  📍 URLs in sitemap: ${smCount}`);
console.log(`  📄 Actual pages:    ${totalPages}`);
console.log('');

// Summary
console.log('=====================================================');
console.log('  BEFORE vs AFTER COMPARISON');
console.log('=====================================================');
console.log('');
console.log('  METRIC                  BEFORE    NOW');
console.log('  ──────────────────────  ───────   ───────');
console.log(`  Pages with metadata     320       ${pagesWithMeta}`);
console.log(`  Pages with canonical    320       ${pagesWithCanonical}`);
console.log(`  Components with ads     273       ${clientsWithAds}`);
console.log(`  Components with schema  23        ${clientsWithSchema + clientsWithJsonLd}`);
console.log(`  Empty SchemaMarkup      23        ${badSchemaUsage}`);
console.log(`  Encoding issues         many      ${encodingIssues}`);
console.log(`  next.config optimized   no        YES`);
console.log('');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Optimize next.config + run final audit"');
console.log('  git push origin master');
console.log('');
