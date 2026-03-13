const fs = require('fs');
const path = require('path');

// ============================================================
// FIX #1 (v2): Properly add metadata to 'use client' pages
// Strategy: Split into server page.js + PageClient.js
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
const DOMAIN = 'https://freefincalc.net';
let fixed = 0;
let reverted = 0;
let skipped = 0;
let errors = [];

function slugToTitle(slug) {
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
    'fire-retirement-calculator': 'FIRE Retirement Calculator',
    'sba-loan-calculator': 'SBA Loan Calculator',
    'saas-metrics-calculator': 'SaaS Metrics Calculator',
    'vat-calculator': 'VAT Calculator',
    'rv-loan-calculator': 'RV Loan Calculator',
  };
  if (specials[slug]) return specials[slug];
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\bVs\b/, 'vs')
    .replace(/\bBy\b/, 'by')
    .replace(/\bTo\b/, 'to')
    .replace(/\bOf\b/, 'of')
    .replace(/\bAnd\b/, 'and');
}

function generateDescription(title, slug) {
  const l = slug.toLowerCase();
  if (l.includes('loan')) return `Free ${title} \u2014 calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.`;
  if (l.includes('mortgage')) return `Free ${title} \u2014 estimate monthly payments, amortization, and total cost. Compare rates and scenarios instantly.`;
  if (l.includes('tax')) return `Free ${title} \u2014 estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.`;
  if (l.includes('retirement') || l.includes('401k') || l.includes('ira') || l.includes('pension')) return `Free ${title} \u2014 plan your retirement savings and estimate future balances. No sign-up required.`;
  if (l.includes('investment') || l.includes('roi') || l.includes('compound') || l.includes('dividend')) return `Free ${title} \u2014 project investment growth, returns, and compound interest. Instant results, no sign-up.`;
  if (l.includes('budget')) return `Free ${title} \u2014 create a personalized budget plan and find savings opportunities. No sign-up required.`;
  if (l.includes('debt') || l.includes('payoff') || l.includes('credit-card')) return `Free ${title} \u2014 find the fastest way to pay off your debt and see interest saved. No sign-up.`;
  if (l.includes('salary') || l.includes('pay') || l.includes('hourly') || l.includes('overtime')) return `Free ${title} \u2014 calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.`;
  if (l.includes('savings')) return `Free ${title} \u2014 see how your savings grow over time with interest and deposits. No sign-up.`;
  if (l.includes('car') || l.includes('auto') || l.includes('fuel')) return `Free ${title} \u2014 calculate auto costs, monthly payments, and total expenses. No sign-up.`;
  if (l.includes('home') || l.includes('house') || l.includes('property') || l.includes('rent')) return `Free ${title} \u2014 estimate housing costs and make smarter real estate decisions. No sign-up.`;
  if (l.includes('business') || l.includes('break-even') || l.includes('profit') || l.includes('markup')) return `Free ${title} \u2014 analyze business finances and profit margins. Instant results, no sign-up.`;
  if (l.includes('insurance')) return `Free ${title} \u2014 estimate coverage needs and costs. Instant results, no sign-up.`;
  return `Free ${title} \u2014 get instant results with our easy-to-use calculator. 100% free, no sign-up required.`;
}

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
console.log('  FIX #1 (v2): Metadata for client component pages');
console.log('=====================================================');
console.log('');

// STEP 1: First, revert any broken metadata we added in v1
console.log('--- STEP 1: Reverting broken metadata from v1 ---');
const allPages = findPages(APP);

for (const pg of allPages) {
  const content = fs.readFileSync(pg, 'utf8');
  
  // If file has BOTH 'use client' AND 'export const metadata', remove the metadata block
  if (content.includes("'use client'") && content.includes('export const metadata')) {
    // Remove the metadata block we added
    const cleaned = content.replace(/\nexport const metadata = \{[\s\S]*?\};\n/g, '\n');
    if (cleaned !== content) {
      fs.writeFileSync(pg, cleaned, 'utf8');
      reverted++;
    }
  }
}
console.log(`  Reverted ${reverted} files with conflicting metadata + 'use client'`);
console.log('');

// STEP 2: For each page that has 'use client' and NO metadata, split it
console.log('--- STEP 2: Splitting client pages into server + client ---');

for (const pg of allPages) {
  const content = fs.readFileSync(pg, 'utf8');
  const rel = path.relative(BASE, pg).replace(/\\/g, '/');
  const dir = path.dirname(pg);
  
  // Skip if already has proper metadata (server component)
  if ((content.includes('export const metadata') || content.includes('generateMetadata')) && !content.includes("'use client'")) {
    skipped++;
    continue;
  }
  
  // Skip if it's NOT a 'use client' page (it's a server component that just needs metadata)
  if (!content.includes("'use client'") && !content.includes('"use client"')) {
    // This is a server component without metadata — just add metadata directly
    if (!content.includes('export const metadata') && !content.includes('generateMetadata')) {
      const urlPath = '/' + path.relative(APP, dir).replace(/\\/g, '/');
      const parts = urlPath.split('/').filter(Boolean);
      const slug = parts[0] || 'calculator';
      const title = slugToTitle(slug);
      const fullTitle = `${title} | FreeFinCalc`;
      const desc = generateDescription(title, slug);
      const canonical = `${DOMAIN}${urlPath}`;

      const metaBlock = `\nexport const metadata = {\n  title: '${fullTitle.replace(/'/g, "\\'")}',\n  description: '${desc.replace(/'/g, "\\'")}',\n  alternates: { canonical: '${canonical}' },\n  openGraph: { title: '${fullTitle.replace(/'/g, "\\'")}', description: '${desc.replace(/'/g, "\\'")}', url: '${canonical}', siteName: 'FreeFinCalc', type: 'website' },\n};\n`;

      const idx = content.indexOf('export default');
      if (idx !== -1) {
        const newContent = content.slice(0, idx) + metaBlock + '\n' + content.slice(idx);
        fs.writeFileSync(pg, newContent, 'utf8');
        fixed++;
        if (fixed <= 10) console.log(`  ✅ [server-meta] ${rel}`);
      }
    } else {
      skipped++;
    }
    continue;
  }
  
  // THIS IS A 'use client' PAGE — needs to be SPLIT
  
  // Check if there's already a separate client file in this dir
  const existingClientFiles = fs.readdirSync(dir).filter(f => f.endsWith('Client.js') || f.endsWith('Client.tsx'));
  if (existingClientFiles.length > 0) {
    // Already has a client component — the page.js just needs metadata
    // This shouldn't normally happen for 'use client' page.js files, but skip to be safe
    skipped++;
    continue;
  }
  
  // Generate the URL path and metadata
  const urlPath = '/' + path.relative(APP, dir).replace(/\\/g, '/');
  const parts = urlPath.split('/').filter(Boolean);
  const slug = parts[0] || 'calculator';
  const title = slugToTitle(slug);
  const fullTitle = `${title} | FreeFinCalc`;
  const desc = generateDescription(title, slug);
  const canonical = `${DOMAIN}${urlPath}`;
  
  // 1. Move current page.js content to PageClient.js
  const clientFileName = 'PageClient.js';
  const clientFilePath = path.join(dir, clientFileName);
  
  // Make sure the client component has a proper default export name
  let clientContent = content;
  
  // If the default export is anonymous, give it a name
  clientContent = clientContent.replace(
    /export default function\s*\(/,
    'export default function PageClient('
  );
  // Handle arrow function exports
  clientContent = clientContent.replace(
    /export default\s*\(\s*\)\s*=>/,
    'export default function PageClient()'
  );
  
  fs.writeFileSync(clientFilePath, clientContent, 'utf8');
  
  // 2. Create new SERVER page.js with metadata + import of client
  const newPageContent = `import PageClient from './PageClient'

export const metadata = {
  title: '${fullTitle.replace(/'/g, "\\'")}',
  description: '${desc.replace(/'/g, "\\'")}',
  alternates: { canonical: '${canonical}' },
  openGraph: {
    title: '${fullTitle.replace(/'/g, "\\'")}',
    description: '${desc.replace(/'/g, "\\'")}',
    url: '${canonical}',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
`;
  
  fs.writeFileSync(pg, newPageContent, 'utf8');
  fixed++;
  if (fixed <= 20) console.log(`  ✅ [split] ${rel} → page.js + PageClient.js`);
}

if (fixed > 20) console.log(`  ... and ${fixed - 20} more files fixed`);

console.log('');
console.log('=====================================================');
console.log(`  RESULTS:`);
console.log(`    Reverted:  ${reverted} (removed broken v1 metadata)`);
console.log(`    Fixed:     ${fixed} pages now have proper metadata`);
console.log(`    Skipped:   ${skipped} (already had metadata)`);
if (errors.length > 0) {
  console.log(`    Errors:    ${errors.length}`);
  errors.forEach(e => console.log(`      ❌ ${e}`));
}
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add SEO metadata to all pages — split client components properly"');
console.log('  git push origin master');
console.log('');
