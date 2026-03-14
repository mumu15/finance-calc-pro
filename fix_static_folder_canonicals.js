const fs = require('fs');
const path = require('path');

const BASE = 'https://www.freefincalc.net';
let fixed = 0;

// These are the batches with static individual folders that have wrong canonicals
const BATCHES = [
  { dir: 'app/mortgage-calculator/price',               route: 'mortgage-calculator/price' },
  { dir: 'app/car-loan-calculator/price',               route: 'car-loan-calculator/price' },
  { dir: 'app/personal-loan-calculator/amount',         route: 'personal-loan-calculator/amount' },
  { dir: 'app/student-loan-calculator/amount',          route: 'student-loan-calculator/amount' },
  { dir: 'app/compound-interest/scenario',              route: 'compound-interest/scenario' },
  { dir: 'app/retirement-calculator/age',               route: 'retirement-calculator/age' },
  { dir: 'app/net-worth-calculator/age',                route: 'net-worth-calculator/age' },
  { dir: 'app/401k-calculator/salary',                  route: '401k-calculator/salary' },
  { dir: 'app/credit-card-payoff-calculator/balance',   route: 'credit-card-payoff-calculator/balance' },
  { dir: 'app/freelance-rate-calculator/job',           route: 'freelance-rate-calculator/job' },
  { dir: 'app/inflation-calculator/year',               route: 'inflation-calculator/year' },
];

function fixPageFile(filePath, canonicalUrl) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip client components
  if (content.startsWith("'use client'") || content.startsWith('"use client"')) return false;

  // Remove ALL existing alternates/canonical entries
  content = content.replace(/\s*alternates:\s*\{[^}]*\},?\n?/g, '\n');
  // Clean up empty metadata objects
  content = content.replace(/export const metadata\s*=\s*\{\s*\};\n?/g, '');

  // Inject into existing metadata
  if (content.includes('export const metadata')) {
    content = content.replace(
      /export const metadata\s*=\s*\{/,
      "export const metadata = {\n  alternates: { canonical: '" + canonicalUrl + "' },"
    );
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }

  // No metadata — add before default export
  if (content.includes('export default')) {
    const meta = "\nexport const metadata = {\n  alternates: { canonical: '" + canonicalUrl + "' },\n};\n";
    content = content.replace(/(export default)/, meta + '\n$1');
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }

  return false;
}

BATCHES.forEach(({ dir, route }) => {
  const winDir = dir.replace(/\//g, path.sep);
  if (!fs.existsSync(winDir)) {
    console.log('⚠️  NOT FOUND: ' + dir);
    return;
  }

  let batchFixed = 0;
  fs.readdirSync(winDir, { withFileTypes: true }).forEach(entry => {
    // Skip dynamic route folders like [price]
    if (!entry.isDirectory() || entry.name.startsWith('[')) return;
    
    const pageFile = path.join(winDir, entry.name, 'page.js');
    if (!fs.existsSync(pageFile)) return;

    const canonicalUrl = BASE + '/' + route + '/' + entry.name;
    if (fixPageFile(pageFile, canonicalUrl)) {
      batchFixed++;
      fixed++;
    }
  });

  console.log('✅ ' + dir + ' — fixed ' + batchFixed + ' pages');
});

console.log('\n─────────────────────────────────────────');
console.log('Total fixed: ' + fixed + ' pages');
console.log('─────────────────────────────────────────');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix canonical in all static folder dynamic batch pages"');
console.log('  git push origin master');
