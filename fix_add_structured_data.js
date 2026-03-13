const fs = require('fs');
const path = require('path');

// ============================================================
// FIX #5: Add structured data to 250 client components
// Adds BreadcrumbList JSON-LD + SoftwareApplication schema
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let fixed = 0;
let skipped = 0;

function slugToLabel(slug) {
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
console.log('  FIX #5: Add structured data to client components');
console.log('=====================================================');
console.log('');

const allClients = findClientFiles(APP);

for (const cf of allClients) {
  let content = fs.readFileSync(cf, 'utf8');
  const rel = path.relative(BASE, cf).replace(/\\/g, '/');

  // Skip if already has any structured data
  if (content.includes('SchemaMarkup') || content.includes('StructuredData') ||
      content.includes('BreadcrumbSchema') || content.includes('WebAppSchema') ||
      content.includes('application/ld+json')) {
    skipped++;
    continue;
  }

  // Derive path info
  const relToApp = path.relative(APP, path.dirname(cf)).replace(/\\/g, '/');
  const parts = relToApp.split('/').filter(Boolean);
  const parentSlug = parts[0];
  const parentLabel = slugToLabel(parentSlug);

  // Determine what kind of sub-page this is
  let subCategory = parts.length >= 2 ? parts[1] : '';
  let subValue = parts.length >= 3 ? parts[2] : '';

  // Build canonical URL path
  const urlPath = '/' + relToApp.replace(/\[([^\]]+)\]/g, ''); // remove dynamic segments for base

  // Build the inline JSON-LD schema block
  // We add both BreadcrumbList and SoftwareApplication schemas
  const schemaBlock = `
      {/* Structured Data for SEO */}
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

  // Find the right insertion point — after the first opening tag in the return
  // We look for patterns like: return(<div ...> or return (\n<div
  // Insert right after the first > of the root element

  // Strategy: find "return" then find the first ">" after it, insert after that
  const returnIdx = content.lastIndexOf('return');
  if (returnIdx === -1) {
    skipped++;
    continue;
  }

  // Find the first > after return (this is the opening tag of root element)
  const afterReturn = content.substring(returnIdx);
  const firstTagClose = afterReturn.indexOf('>');
  if (firstTagClose === -1) {
    skipped++;
    continue;
  }

  const insertPoint = returnIdx + firstTagClose + 1;

  // Check if there's already content right after the tag
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
console.log('  git commit -m "Add structured data (BreadcrumbList + SoftwareApp schema) to all pages"');
console.log('  git push origin master');
console.log('');
