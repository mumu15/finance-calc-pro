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
  if (!fs.existsSync(filePath)) return;

  let c = fs.readFileSync(filePath, 'utf8');

  // Step 1: Restore ALL arrow functions that got broken (=&gt; back to =>)
  c = c.replace(/=&gt;/g, '=>');

  // Step 2: Restore any &gt; that appeared before % signs incorrectly
  c = c.replace(/&gt;(\d+%)/g, '>$1');

  // Step 3: Now ONLY fix the specific text content comparisons
  // These are the exact strings with > that appear inside JSX text nodes
  const textReplacements = [
    ['Old if deductions >₹3.75L', 'Old if deductions &gt;₹3.75L'],
    ['Old if deductions >₹3L', 'Old if deductions &gt;₹3L'],
    ['Old if deductions >₹2L', 'Old if deductions &gt;₹2L'],
    ['deductions >₹3.75L', 'deductions &gt;₹3.75L'],
    ['deductions >₹3L', 'deductions &gt;₹3L'],
    ['deductions >₹2L', 'deductions &gt;₹2L'],
    ['>₹3.75L', '&gt;₹3.75L'],
    ['>₹3L', '&gt;₹3L'],
    ['>₹2L', '&gt;₹2L'],
    ['income >₹', 'income &gt;₹'],
    ['above >₹', 'above &gt;₹'],
    // UK
    ['above >£', 'above &gt;£'],
    ['>£450,000', '&gt;£450,000'],
    // Singapore - deductions text
    ['saving > ', 'saving &gt; '],
  ];

  textReplacements.forEach(([from, to]) => {
    c = c.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
  });

  fs.writeFileSync(filePath, c, 'utf8');
  console.log(`✅ Fixed: ${filePath.split('/').pop().replace('/page.js','')}`);
});

console.log('\n🎉 All JSX escaping fixed! Ready to push.');
