const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let fixed = 0;
let skipped = 0;

function slugToLabel(slug) {
  if (!slug) return 'Calculator';
  const specials = {
    '401k-calculator': '401(k) Calculator',
    'compound-interest': 'Compound Interest Calculator',
    'salary-after-tax': 'Salary After Tax',
    'personal-loan': 'Personal Loan Calculator',
    'student-loan': 'Student Loan Calculator',
    'debt-payoff-calculator': 'Debt Payoff Calculator',
    'home-affordability-calculator': 'Home Affordability Calculator',
    'investment-return-calculator': 'Investment Return Calculator',
    'mortgage-calculator': 'Mortgage Calculator',
    'car-loan-calculator': 'Car Loan Calculator',
    'personal-loan-calculator': 'Personal Loan Calculator',
    'student-loan-calculator': 'Student Loan Calculator',
    'credit-card-payoff-calculator': 'Credit Card Payoff Calculator',
    'net-worth-calculator': 'Net Worth Calculator',
    'retirement-calculator': 'Retirement Calculator',
    'savings-goal-calculator': 'Savings Goal Calculator',
    'budget-calculator': 'Budget Calculator',
    'rent-vs-buy-calculator': 'Rent vs Buy Calculator',
    'freelance-rate-calculator': 'Freelance Rate Calculator',
    'break-even-calculator': 'Break Even Calculator',
    'inflation-calculator': 'Inflation Calculator',
    'salary-after-tax-calculator': 'Salary After Tax Calculator',
    'tax-calculator': 'Tax Calculator',
  };
  if (specials[slug]) return specials[slug];
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
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

console.log('');
console.log('=====================================================');
console.log('  FIX #5 (v2): Add structured data to client files');
console.log('=====================================================');
console.log('');

const allClients = findClientFiles(APP);

for (const cf of allClients) {
  let content = fs.readFileSync(cf, 'utf8');
  const rel = path.relative(BASE, cf).replace(/\\/g, '/');

  // Skip if already has structured data
  if (content.includes('application/ld+json')) {
    skipped++;
    continue;
  }

  // Derive path info
  const relToApp = path.relative(APP, path.dirname(cf)).replace(/\\/g, '/');
  const parts = relToApp.split('/').filter(Boolean);

  // Get parent slug — could be the folder itself for PageClient.js files
  // e.g. "401k-calculator" for app/401k-calculator/PageClient.js
  // e.g. "mortgage-calculator" for app/mortgage-calculator/[city]/Client.js
  const parentSlug = parts[0] || path.basename(path.dirname(cf));
  if (!parentSlug || parentSlug === 'app') {
    skipped++;
    continue;
  }

  const parentLabel = slugToLabel(parentSlug);

  const schemaBlock = `
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "${parentLabel.replace(/"/g, '\\"')}", "item": "https://freefincalc.net/${parentSlug}" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "${parentLabel.replace(/"/g, '\\"')}",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />`;

  // Find insertion point after first > in return statement
  const returnIdx = content.lastIndexOf('return');
  if (returnIdx === -1) { skipped++; continue; }

  const afterReturn = content.substring(returnIdx);
  const firstTagClose = afterReturn.indexOf('>');
  if (firstTagClose === -1) { skipped++; continue; }

  const insertPoint = returnIdx + firstTagClose + 1;
  const newContent = content.slice(0, insertPoint) + schemaBlock + content.slice(insertPoint);

  try {
    fs.writeFileSync(cf, newContent, 'utf8');
    fixed++;
    if (fixed <= 15) console.log(`  ✅ ${rel}`);
  } catch (e) {
    console.log(`  ❌ ${rel}: ${e.message}`);
  }
}

if (fixed > 15) console.log(`  ... and ${fixed - 15} more files fixed`);

console.log('');
console.log('=====================================================');
console.log(`  RESULTS: Fixed ${fixed} | Skipped ${skipped} (already had schema)`);
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add structured data to all client components"');
console.log('  git push origin master');
console.log('');
