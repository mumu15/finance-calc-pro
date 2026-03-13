const fs = require('fs');
const path = require('path');

// ============================================================
// FIX #1: Add metadata + canonical to all pages missing them
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
const DOMAIN = 'https://freefincalc.net';
let fixed = 0;
let skipped = 0;
let errors = [];

// Convert folder name to readable title
// e.g. "401k-calculator" → "401(k) Calculator"
// e.g. "amortization-calculator" → "Amortization Calculator"
function slugToTitle(slug) {
  // Special cases
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
    'hvac-calculator': 'HVAC Calculator',
    'rv-loan-calculator': 'RV Loan Calculator',
    'hsa-calculator': 'HSA Calculator',
  };
  if (specials[slug]) return specials[slug];

  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\bCalculator\b/, 'Calculator')
    .replace(/\bVs\b/, 'vs')
    .replace(/\bBy\b/, 'by')
    .replace(/\bTo\b/, 'to')
    .replace(/\bOf\b/, 'of')
    .replace(/\bAnd\b/, 'and');
}

// Generate description based on calculator type
function generateDescription(title, slug) {
  const lower = slug.toLowerCase();
  
  if (lower.includes('loan')) {
    return `Free ${title} — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.`;
  }
  if (lower.includes('mortgage')) {
    return `Free ${title} — estimate monthly payments, amortization, and total cost. Compare rates and scenarios instantly.`;
  }
  if (lower.includes('tax')) {
    return `Free ${title} — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.`;
  }
  if (lower.includes('retirement') || lower.includes('401k') || lower.includes('ira') || lower.includes('pension')) {
    return `Free ${title} — plan your retirement savings, estimate future balances, and find out if you're on track. No sign-up required.`;
  }
  if (lower.includes('investment') || lower.includes('roi') || lower.includes('compound') || lower.includes('dividend')) {
    return `Free ${title} — project investment growth, returns, and compound interest over time. Instant results, no sign-up.`;
  }
  if (lower.includes('budget')) {
    return `Free ${title} — create a personalized budget plan, track expenses, and find savings opportunities. No sign-up required.`;
  }
  if (lower.includes('debt') || lower.includes('payoff') || lower.includes('credit-card')) {
    return `Free ${title} — find the fastest way to pay off your debt, see interest saved, and create a payoff plan. No sign-up.`;
  }
  if (lower.includes('salary') || lower.includes('pay') || lower.includes('hourly') || lower.includes('overtime')) {
    return `Free ${title} — calculate your take-home pay, hourly rate, and tax withholdings. Instant results, no sign-up.`;
  }
  if (lower.includes('savings')) {
    return `Free ${title} — see how your savings grow over time with interest and regular deposits. Free, instant, no sign-up.`;
  }
  if (lower.includes('car') || lower.includes('auto') || lower.includes('vehicle') || lower.includes('fuel')) {
    return `Free ${title} — calculate auto costs, monthly payments, and total expenses. Compare options instantly, no sign-up.`;
  }
  if (lower.includes('home') || lower.includes('house') || lower.includes('property') || lower.includes('rent')) {
    return `Free ${title} — estimate housing costs, affordability, and make smarter real estate decisions. No sign-up required.`;
  }
  if (lower.includes('business') || lower.includes('break-even') || lower.includes('profit') || lower.includes('markup')) {
    return `Free ${title} — analyze business finances, profit margins, and break-even points. Instant results, no sign-up.`;
  }
  if (lower.includes('insurance')) {
    return `Free ${title} — estimate coverage needs and costs. Compare options, instant results, no sign-up required.`;
  }
  
  // Generic fallback
  return `Free ${title} — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.`;
}

// Find all page.js files missing metadata
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

console.log('');
console.log('=================================================');
console.log('  FIX #1: Adding metadata + canonical to pages');
console.log('=================================================');
console.log('');

const allPages = findPages(APP);

for (const pg of allPages) {
  const rel = path.relative(BASE, pg).replace(/\\/g, '/');
  const content = fs.readFileSync(pg, 'utf8');
  
  // Skip if already has metadata
  if (content.includes('generateMetadata') || content.includes('export const metadata')) {
    skipped++;
    continue;
  }
  
  // Derive the URL path from file location
  // e.g. app/401k-calculator/page.js → /401k-calculator
  const urlPath = '/' + path.dirname(pg)
    .replace(APP, '')
    .replace(/\\/g, '/')
    .replace(/^\//, '')
    .replace(/\/$/, '');
  
  // Get the calculator slug (last meaningful folder name)
  const parts = urlPath.split('/').filter(Boolean);
  const slug = parts[0] || 'calculator';
  const title = slugToTitle(slug);
  const fullTitle = `${title} — Free Online ${title} | FreeFinCalc`;
  const description = generateDescription(title, slug);
  const canonicalUrl = `${DOMAIN}${urlPath}`;
  
  // Build the metadata export to add
  const metadataBlock = `
export const metadata = {
  title: '${fullTitle.replace(/'/g, "\\'")}',
  description: '${description.replace(/'/g, "\\'")}',
  alternates: { canonical: '${canonicalUrl}' },
  openGraph: {
    title: '${fullTitle.replace(/'/g, "\\'")}',
    description: '${description.replace(/'/g, "\\'")}',
    url: '${canonicalUrl}',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};
`;
  
  // Find the right place to insert — after imports, before the default function
  let newContent;
  
  // Strategy: insert metadata block before "export default" 
  const exportDefaultIdx = content.indexOf('export default');
  if (exportDefaultIdx === -1) {
    errors.push(`${rel} — no "export default" found, skipped`);
    continue;
  }
  
  newContent = content.slice(0, exportDefaultIdx) + metadataBlock + '\n' + content.slice(exportDefaultIdx);
  
  try {
    fs.writeFileSync(pg, newContent, 'utf8');
    fixed++;
    if (fixed <= 15) console.log(`  ✅ ${rel}`);
  } catch (e) {
    errors.push(`${rel} — write error: ${e.message}`);
  }
}

if (fixed > 15) console.log(`  ... and ${fixed - 15} more files fixed`);

console.log('');
console.log('=================================================');
console.log(`  RESULTS: Fixed ${fixed} pages | Skipped ${skipped} (already had metadata)`);
if (errors.length > 0) {
  console.log(`  Errors: ${errors.length}`);
  errors.forEach(e => console.log(`    ❌ ${e}`));
}
console.log('=================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add metadata + canonical to 151 pages missing SEO"');
console.log('  git push origin master');
console.log('');
console.log('After deploying, run the audit again to see the improvement!');
console.log('');
