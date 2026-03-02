const fs = require('fs');

const CALC_SLOT = "7405024590";
const BLOG_SLOT = "3248634657";

const calculators = [
  'mortgage-calculator',
  'loan-calculator',
  'compound-interest',
  'debt-payoff-calculator',
  'budget-calculator',
  'retirement-calculator',
  'net-worth-calculator',
  'savings-calculator',
  'inflation-calculator',
  'emergency-fund-calculator',
  'tax-calculator',
  'rent-vs-buy-calculator',
];

const blogs = [
  'how-to-calculate-mortgage-payment',
  'how-to-calculate-loan-payment',
  'how-to-calculate-net-worth',
  'how-to-create-monthly-budget',
  'how-to-build-emergency-fund',
  'how-to-pay-off-debt-fast',
  'how-to-lower-tax-bill',
  'how-much-to-save-for-retirement',
  'debt-snowball-vs-avalanche',
  'how-does-inflation-affect-savings',
  'rent-vs-buy-home',
  'what-is-compound-interest',
];

let success = 0;
let skipped = 0;

// Add ads to all calculators
calculators.forEach(calc => {
  const path = `app/${calc}/page.js`;
  if (!fs.existsSync(path)) { console.log(`⚠️  Not found: ${path}`); skipped++; return; }

  let f = fs.readFileSync(path, 'utf8');

  if (f.includes('AdUnit')) { console.log(`⏭️  Already has ad: ${calc}`); skipped++; return; }

  // Add import
  f = f.replace(/^(import .+)/m, `$1\nimport AdUnit from '../components/AdUnit'`);

  // Try different comment markers
  if (f.includes('{/* Internal Link */}')) {
    f = f.replace(`{/* Internal Link */}`, `<AdUnit slot="${CALC_SLOT}" />\n\n        {/* Internal Link */}`);
  } else if (f.includes('{/* FAQ */}')) {
    f = f.replace(`{/* FAQ */}`, `<AdUnit slot="${CALC_SLOT}" />\n\n        {/* FAQ */}`);
  } else if (f.includes('{/* Internal Link to Blog */}')) {
    f = f.replace(`{/* Internal Link to Blog */}`, `<AdUnit slot="${CALC_SLOT}" />\n\n        {/* Internal Link to Blog */}`);
  } else {
    f = f.replace(`</main>`, `<AdUnit slot="${CALC_SLOT}" />\n\n      </main>`);
  }

  fs.writeFileSync(path, f, 'utf8');
  console.log(`✅ ${calc}`);
  success++;
});

// Add ads to all blog articles
blogs.forEach(blog => {
  const path = `app/blog/${blog}/page.js`;
  if (!fs.existsSync(path)) { console.log(`⚠️  Not found: ${path}`); skipped++; return; }

  let f = fs.readFileSync(path, 'utf8');

  if (f.includes('AdUnit')) { console.log(`⏭️  Already has ad: ${blog}`); skipped++; return; }

  // Add import
  f = f.replace(/^(import .+)/m, `$1\nimport AdUnit from '../../components/AdUnit'`);

  if (f.includes('{/* FAQ */}')) {
    f = f.replace(`{/* FAQ */}`, `<AdUnit slot="${BLOG_SLOT}" />\n\n      {/* FAQ */}`);
  } else if (f.includes('<section')) {
    const firstSection = f.indexOf('<section');
    const secondSection = f.indexOf('<section', firstSection + 1);
    if (secondSection > -1) {
      f = f.slice(0, secondSection) + `<AdUnit slot="${BLOG_SLOT}" />\n\n      ` + f.slice(secondSection);
    }
  } else {
    f = f.replace(`</article>`, `<AdUnit slot="${BLOG_SLOT}" />\n\n      </article>`);
  }

  fs.writeFileSync(path, f, 'utf8');
  console.log(`✅ ${blog}`);
  success++;
});

console.log(`\n🎉 Done! ${success} files updated, ${skipped} skipped.`);
