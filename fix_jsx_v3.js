const fs = require('fs');

const files = [
  'app/blog/income-tax-calculator-india-2026/page.js',
  'app/blog/home-loan-emi-calculator-india/page.js',
  'app/blog/mortgage-calculator-uk-2026/page.js',
  'app/blog/isa-savings-calculator-uk/page.js',
  'app/blog/mortgage-calculator-uae-dubai-2026/page.js',
  'app/blog/home-loan-calculator-pakistan-2026/page.js',
  'app/blog/mortgage-calculator-australia-2026/page.js',
  'app/blog/mortgage-calculator-canada-2026/page.js',
  'app/blog/mortgage-calculator-singapore-2026/page.js',
  'app/blog/loan-calculator-nigeria-2026/page.js',
  'app/blog/bond-calculator-south-africa-2026/page.js',
];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) { console.log(`⚠️ Not found: ${filePath}`); return; }
  let c = fs.readFileSync(filePath, 'utf8');

  // Step 1: Undo ALL previous bad escaping - restore everything
  c = c.replace(/=&gt;/g, '=>');
  c = c.replace(/&gt;(\d+%)/g, '>$1');
  c = c.replace(/<strong &gt;/g, '<strong>');
  c = c.replace(/&gt; PKR/g, 'PKR');

  // Step 2: Replace ALL remaining &gt; in text with safe plain English
  // These are the ones that were correctly escaped but need better wording
  c = c.replace(/&gt;₹3\.75L/g, 'over Rs 3.75L');
  c = c.replace(/&gt;₹3L/g, 'over Rs 3L');
  c = c.replace(/&gt;₹2L/g, 'over Rs 2L');
  c = c.replace(/&gt;₹/g, 'over Rs ');
  c = c.replace(/&gt;£/g, 'above £');
  c = c.replace(/&gt;\s*/g, 'above ');

  // Step 3: Now find and fix any RAW > symbols that are in JSX text nodes
  // Pattern: they appear inside table cell text content
  // Replace comparison > with "over" or "above" in text
  c = c.replace(/Old if deductions >₹3\.75L/g, 'Old if deductions over Rs 3.75L');
  c = c.replace(/Old if deductions >₹3L/g, 'Old if deductions over Rs 3L');
  c = c.replace(/Old if deductions >₹2L/g, 'Old if deductions over Rs 2L');
  c = c.replace(/deductions >₹/g, 'deductions over Rs ');
  c = c.replace(/savings >₹/g, 'savings over Rs ');
  c = c.replace(/above >₹/g, 'above Rs ');
  c = c.replace(/>₹3\.75L/g, 'over Rs 3.75L');
  c = c.replace(/>₹3L/g, 'over Rs 3L');
  c = c.replace(/>₹2L/g, 'over Rs 2L');

  // UK specific
  c = c.replace(/>£450,000/g, 'above £450,000');
  c = c.replace(/>£1\.5M/g, 'above £1.5M');
  c = c.replace(/>£1M/g, 'above £1M');

  // Singapore - income comparisons  
  c = c.replace(/income >S\$/g, 'income above S$');
  c = c.replace(/saving > /g, 'saving above ');

  // General percentage comparisons in text
  c = c.replace(/rates > /g, 'rates above ');
  c = c.replace(/above > /g, 'above ');

  // Pakistan - the specific broken strong tag
  c = c.replace(/<strong>\s*PKR/g, '<strong>PKR');
  
  // Clean up any double spaces introduced
  c = c.replace(/  +/g, ' ');

  fs.writeFileSync(filePath, c, 'utf8');
  console.log(`✅ ${filePath.split('/')[2]}`);
});

// Verify no remaining raw > issues in JSX text
console.log('\n🔍 Checking for remaining issues...');
let issuesFound = 0;
files.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  const c = fs.readFileSync(filePath, 'utf8');
  const lines = c.split('\n');
  lines.forEach((line, i) => {
    // Look for > inside JSX text (between > and <) that isn't a tag
    if (line.includes('=&gt;') || line.match(/<strong &gt;/)) {
      console.log(`  ⚠️  Issue at ${filePath}:${i+1}: ${line.trim().substring(0, 80)}`);
      issuesFound++;
    }
  });
});

if (issuesFound === 0) {
  console.log('✅ No remaining JSX issues found!');
} else {
  console.log(`⚠️  ${issuesFound} issues still found - check above`);
}

console.log('\n🎉 Done! Now run: git add . && git commit -m "Fix JSX escaping" && git push origin master:main');
