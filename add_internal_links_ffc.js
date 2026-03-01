const fs = require('fs');

const links = [
  {
    file: 'app/mortgage-calculator/page.js',
    slug: 'how-to-calculate-mortgage-payment',
    title: 'How to Calculate Your Monthly Mortgage Payment (2026)',
  },
  {
    file: 'app/loan-calculator/page.js',
    slug: 'how-to-calculate-loan-payment',
    title: 'How to Calculate Loan Payments: Complete Guide (2026)',
  },
  {
    file: 'app/compound-interest/page.js',
    slug: 'what-is-compound-interest',
    title: 'What is Compound Interest and How Does It Work?',
  },
  {
    file: 'app/savings-calculator/page.js',
    slug: 'how-to-build-emergency-fund',
    title: 'How to Build an Emergency Fund From Scratch (2026)',
  },
  {
    file: 'app/retirement-calculator/page.js',
    slug: 'how-much-to-save-for-retirement',
    title: 'How Much Should I Save for Retirement? (2026 Guide)',
  },
  {
    file: 'app/tax-calculator/page.js',
    slug: 'how-to-lower-tax-bill',
    title: 'How to Lower Your Tax Bill Legally in 2026',
  },
  {
    file: 'app/debt-payoff-calculator/page.js',
    slug: 'debt-snowball-vs-avalanche',
    title: 'Debt Snowball vs Debt Avalanche: Which is Better?',
  },
  {
    file: 'app/emergency-fund-calculator/page.js',
    slug: 'how-to-build-emergency-fund',
    title: 'How to Build an Emergency Fund From Scratch (2026)',
  },
  {
    file: 'app/budget-calculator/page.js',
    slug: 'how-to-create-monthly-budget',
    title: 'How to Create a Monthly Budget That Actually Works',
  },
  {
    file: 'app/net-worth-calculator/page.js',
    slug: 'how-to-calculate-net-worth',
    title: 'How to Calculate Your Net Worth (And Why It Matters)',
  },
  {
    file: 'app/rent-vs-buy-calculator/page.js',
    slug: 'rent-vs-buy-home',
    title: 'Renting vs Buying a Home: Which is Better in 2026?',
  },
  {
    file: 'app/inflation-calculator/page.js',
    slug: 'how-does-inflation-affect-savings',
    title: 'How Does Inflation Affect Your Savings? (2026 Guide)',
  },
];

const linkBlock = (slug, title) => `
          {/* Internal Link to Blog */}
          <div className="mt-8 p-4 rounded-xl border" style={{borderColor:'rgba(240,200,66,0.2)',background:'rgba(240,200,66,0.05)'}}>
            <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
            <a href="/blog/${slug}" className="font-semibold hover:underline" style={{color:'#f0c842'}}>${title}</a>
          </div>`;

let fixed = 0;
let skipped = 0;

links.forEach(({ file, slug, title }) => {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  Not found: ${file}`);
    skipped++;
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(`/blog/${slug}`)) {
    console.log(`⏭️  Already has link: ${file}`);
    skipped++;
    return;
  }
  content = content.replace(
    '      <Footer />',
    `${linkBlock(slug, title)}\n      <Footer />`
  );
  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Added link to: ${file}`);
  fixed++;
});

console.log(`\n🎉 Done! ${fixed} files updated, ${skipped} skipped.`);
console.log('Run: git add . && git commit -m "Add internal links from tools to blog articles" && git push');
