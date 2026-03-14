const fs = require('fs');
const path = require('path');

// ============================================================
// FIX #5 (v3): Remove broken schema, re-add safely
// Strategy: Insert BEFORE <Footer instead of after last return
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let cleaned = 0;
let added = 0;
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
console.log('  FIX #5 (v3): Clean up + re-add structured data');
console.log('=====================================================');
console.log('');

// STEP 1: Remove ALL broken schema insertions from v1 and v2
console.log('--- STEP 1: Removing broken schema blocks ---');

const allClients = findClientFiles(APP);

for (const cf of allClients) {
  let content = fs.readFileSync(cf, 'utf8');
  const before = content;

  // Remove the schema blocks we inserted (both v1 "Structured Data for SEO" and v2 "Structured Data")
  // Pattern: from {/* Structured Data ... to the closing /> of the second script tag
  const schemaPattern = /\n?\s*\{\/\* Structured Data[^]*?aggregateRating[^]*?\}\)\}\} \/>/g;
  content = content.replace(schemaPattern, '');

  if (content !== before) {
    fs.writeFileSync(cf, content, 'utf8');
    cleaned++;
  }
}

console.log(`  Cleaned ${cleaned} files`);
console.log('');

// STEP 2: Re-add schema SAFELY — insert before <Footer
console.log('--- STEP 2: Adding schema before <Footer/> ---');

for (const cf of allClients) {
  let content = fs.readFileSync(cf, 'utf8');
  const rel = path.relative(BASE, cf).replace(/\\/g, '/');

  // Skip if still has structured data (from SchemaMarkup component etc)
  if (content.includes('application/ld+json')) {
    skipped++;
    continue;
  }

  // Must have <Footer to use as anchor point
  if (!content.includes('<Footer')) {
    skipped++;
    continue;
  }

  // Derive parent slug
  const relToApp = path.relative(APP, path.dirname(cf)).replace(/\\/g, '/');
  const parts = relToApp.split('/').filter(Boolean);
  const parentSlug = parts[0] || path.basename(path.dirname(cf));
  if (!parentSlug || parentSlug === 'app') { skipped++; continue; }

  const parentLabel = slugToLabel(parentSlug);

  const schemaBlock = `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"${parentLabel.replace(/"/g, '\\"')}","item":"https://www.freefincalc.net/${parentSlug}"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"${parentLabel.replace(/"/g, '\\"')}","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      `;

  // Insert right before <Footer
  const footerIdx = content.lastIndexOf('<Footer');
  if (footerIdx === -1) { skipped++; continue; }

  const newContent = content.slice(0, footerIdx) + schemaBlock + content.slice(footerIdx);

  try {
    fs.writeFileSync(cf, newContent, 'utf8');
    added++;
    if (added <= 15) console.log(`  ✅ ${rel}`);
  } catch (e) {
    console.log(`  ❌ ${rel}: ${e.message}`);
  }
}

if (added > 15) console.log(`  ... and ${added - 15} more files fixed`);

console.log('');
console.log('=====================================================');
console.log(`  RESULTS: Cleaned ${cleaned} | Added schema to ${added} | Skipped ${skipped}`);
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Fix structured data — insert safely before Footer"');
console.log('  git push origin master');
console.log('');
