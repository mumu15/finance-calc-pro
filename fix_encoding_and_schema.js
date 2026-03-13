const fs = require('fs');
const path = require('path');

// ============================================================
// FIX #2+#3: Encoding bug in layout.js + Empty breadcrumbs
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let fixes = 0;

console.log('');
console.log('=====================================================');
console.log('  FIX #2: Encoding bug in layout.js');
console.log('=====================================================');
console.log('');

// --- FIX ENCODING IN LAYOUT.JS ---
const layoutFile = path.join(APP, 'layout.js');
if (fs.existsSync(layoutFile)) {
  let content = fs.readFileSync(layoutFile, 'utf8');
  const before = content;

  // Fix garbled em-dash (ΓÇö → —)
  content = content.replace(/ΓÇö/g, '\u2014');
  // Also fix garbled arrow (ΓÇ║ → ›)
  content = content.replace(/ΓÇ║/g, '\u203A');

  // Update "124 calculators" to actual count
  content = content.replace(/124 calculators/g, '470+ calculators');
  content = content.replace(/124 free financial/g, '470+ free financial');

  if (content !== before) {
    fs.writeFileSync(layoutFile, content, 'utf8');
    console.log('  ✅ Fixed encoding (ΓÇö → —) in layout.js');
    console.log('  ✅ Updated calculator count to 470+');
    fixes++;
  } else {
    console.log('  ⏭️  layout.js already clean');
  }
} else {
  console.log('  ❌ layout.js not found');
}

console.log('');
console.log('=====================================================');
console.log('  FIX #3: Fix SchemaMarkup empty breadcrumbs');
console.log('  (23 client files calling <SchemaMarkup /> without');
console.log('   breadcrumbs prop — outputs empty JSON-LD)');
console.log('=====================================================');
console.log('');

// Strategy: For each client component that uses <SchemaMarkup /> without
// breadcrumbs, we add proper breadcrumbs based on the page path.

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

function slugToLabel(slug) {
  const specials = {
    '401k-calculator': '401(k) Calculator',
    'apr-calculator': 'APR Calculator',
    'cd-calculator': 'CD Calculator',
    'fha-loan-calculator': 'FHA Loan Calculator',
    'heloc-calculator': 'HELOC Calculator',
    'roi-calculator': 'ROI Calculator',
    'rmd-calculator': 'RMD Calculator',
    'roth-ira-calculator': 'Roth IRA Calculator',
    'fire-calculator': 'FIRE Calculator',
    'sba-loan-calculator': 'SBA Loan Calculator',
    'saas-metrics-calculator': 'SaaS Metrics Calculator',
    'vat-calculator': 'VAT Calculator',
    'rv-loan-calculator': 'RV Loan Calculator',
    'compound-interest': 'Compound Interest Calculator',
    'salary-after-tax': 'Salary After Tax Calculator',
    'personal-loan': 'Personal Loan Calculator',
    'student-loan': 'Student Loan Calculator',
    'rent-vs-buy-calculator': 'Rent vs Buy Calculator',
  };
  if (specials[slug]) return specials[slug];
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const allClients = findClientFiles(APP);
let schemaFixes = 0;

for (const cf of allClients) {
  const content = fs.readFileSync(cf, 'utf8');
  const rel = path.relative(BASE, cf).replace(/\\/g, '/');

  // Only fix files that have SchemaMarkup WITHOUT breadcrumbs prop
  if (!content.includes('<SchemaMarkup') || content.includes('breadcrumbs=') || content.includes('breadcrumbs ={')) {
    continue;
  }

  // Derive breadcrumbs from file path
  // e.g. app/rent-vs-buy-calculator/city/[city]/RvBCityClient.js
  const relToApp = path.relative(APP, path.dirname(cf)).replace(/\\/g, '/');
  const parts = relToApp.split('/').filter(Boolean);

  // Build breadcrumb trail: Home → Parent Calculator → Dynamic
  const parentSlug = parts[0]; // e.g. "rent-vs-buy-calculator"
  const parentLabel = slugToLabel(parentSlug);
  const parentUrl = `https://freefincalc.net/${parentSlug}`;

  // Determine the sub-category if any
  let subLabel = '';
  let subType = '';
  if (parts.length >= 2) {
    subType = parts[1]; // e.g. "city", "salary", "business", "brand", "price", etc.
    subLabel = subType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  // Build the breadcrumbs array string
  // We'll use a dynamic breadcrumb that reads from props/item
  // Since these are dynamic pages, the last breadcrumb depends on the item
  // For now, we add static Home + Parent, the component can extend later

  const breadcrumbsArray = `[
    { name: 'Home', url: 'https://freefincalc.net' },
    { name: '${parentLabel.replace(/'/g, "\\'")}', url: '${parentUrl}' }
  ]`;

  // Replace <SchemaMarkup /> with <SchemaMarkup breadcrumbs={...} />
  let newContent = content.replace(
    /<SchemaMarkup\s*\/>/g,
    `<SchemaMarkup breadcrumbs={${breadcrumbsArray}} />`
  );

  // Also replace <SchemaMarkup></SchemaMarkup> pattern if exists
  newContent = newContent.replace(
    /<SchemaMarkup\s*>\s*<\/SchemaMarkup>/g,
    `<SchemaMarkup breadcrumbs={${breadcrumbsArray}} />`
  );

  if (newContent !== content) {
    fs.writeFileSync(cf, newContent, 'utf8');
    schemaFixes++;
    console.log(`  ✅ ${rel}`);
  }
}

fixes += schemaFixes;

console.log('');
console.log('=====================================================');
console.log('  FIX #4: Fix encoding in client components too');
console.log('=====================================================');
console.log('');

// Fix garbled characters in ALL client components and page files
let encodingFixes = 0;

function findAllJSFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.next') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) findAllJSFiles(full, results);
    else if (item.endsWith('.js') || item.endsWith('.tsx')) results.push(full);
  }
  return results;
}

const allJSFiles = findAllJSFiles(APP);
for (const f of allJSFiles) {
  let content = fs.readFileSync(f, 'utf8');
  const before = content;

  content = content.replace(/ΓÇö/g, '\u2014');
  content = content.replace(/ΓÇ║/g, '\u203A');
  content = content.replace(/ΓÇô/g, '\u2013');
  content = content.replace(/ΓÇ£/g, '\u201C');
  content = content.replace(/ΓÇ¥/g, '\u201D');
  content = content.replace(/ΓÇÖ/g, '\u2019');

  if (content !== before) {
    fs.writeFileSync(f, content, 'utf8');
    encodingFixes++;
  }
}

console.log(`  ✅ Fixed encoding in ${encodingFixes} files`);
fixes += encodingFixes;

console.log('');
console.log('=====================================================');
console.log(`  TOTAL FIXES: ${fixes}`);
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Fix encoding bugs + add breadcrumbs to SchemaMarkup"');
console.log('  git push origin master');
console.log('');
