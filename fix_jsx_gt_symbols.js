const fs = require('fs');
const path = require('path');

// Files to fix - any blog that has > inside JSX table cells
const filesToFix = [
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

let totalFixed = 0;

filesToFix.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace > inside JSX td/th content with &gt;
  // Pattern: >sometext>moretext< — the > between tags needs escaping
  // We need to replace literal > that appear inside JSX text content (between tags)
  // specifically patterns like: >₹2L</td> should become >&gt;₹2L</td>
  content = content.replace(/>([^<]*?)>([^<]*?)</g, (match, before, after) => {
    // This is text content with a > in it — escape the inner >
    return `>${before}&gt;${after}<`;
  });

  // Also fix patterns like Old if deductions >₹3L
  // More targeted: replace > that appear right before currency symbols or letters inside td content
  content = content.replace(/(\>)([^<]*?)(>)(₹|£|\$|€|R|A\$|C\$|S\$|AED|PKR|NGN|ZAR|NZD)/g, 
    (match, open, before, gt, curr) => `${open}${before}&gt;${curr}`
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    totalFixed++;
  } else {
    console.log(`⏭️  No > issues found: ${filePath}`);
  }
});

// Also do a targeted fix on the specific known problem file
const problemFile = 'app/blog/income-tax-calculator-india-2026/page.js';
if (fs.existsSync(problemFile)) {
  let content = fs.readFileSync(problemFile, 'utf8');
  // Replace all instances of >₹ that appear inside JSX text (meaning a > before ₹ inside a tag)
  const before = content;
  content = content
    .replace(/Old if deductions >₹/g, 'Old if deductions &gt;₹')
    .replace(/deductions >₹/g, 'deductions &gt;₹')
    .replace(/>₹3\.75L/g, '&gt;₹3.75L')
    .replace(/>₹3L/g, '&gt;₹3L')
    .replace(/>₹2L/g, '&gt;₹2L');
  
  if (content !== before) {
    fs.writeFileSync(problemFile, content, 'utf8');
    console.log(`✅ Extra fix applied: ${problemFile}`);
  }
}

// Nuclear option - scan ALL new blog files for any remaining > in text content
const allBlogs = fs.readdirSync('app/blog').filter(d => {
  const p = `app/blog/${d}/page.js`;
  return fs.existsSync(p);
});

allBlogs.forEach(blog => {
  const filePath = `app/blog/${blog}/page.js`;
  let content = fs.readFileSync(filePath, 'utf8');
  const before = content;

  // Find patterns like: >text>text< which indicates unescaped > in JSX
  // Replace "Old if deductions >X" and similar comparison text patterns
  content = content
    .replace(/(\w)\s*>\s*(₹|£|€|R |A\$|C\$|S\$|AED|PKR|NGN|ZAR|kr|Fr)/g, '$1 &gt; $2')
    .replace(/(deductions|income|savings|deposit|contributions)\s*>([\s₹£€$])/g, '$1 &gt;$2')
    .replace(/>(\s*)(20%|10%|5%|15%|25%|30%|40%|50%)/g, (m, sp, pct) => `&gt;${sp}${pct}`)

  if (content !== before) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Scan-fixed: ${blog}`);
    totalFixed++;
  }
});

console.log(`\n🎉 Done! Fixed ${totalFixed} files. Ready to push!`);
