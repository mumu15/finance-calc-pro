const fs = require('fs');

const updates = [
  {
    file: 'app/mortgage-calculator/page.js',
    title: 'Free Mortgage Calculator — Monthly Payment, PMI, Taxes & Amortization Schedule',
    desc: 'Free mortgage calculator with full amortization schedule, PMI warning, property tax and HOA fees. See your complete monthly payment breakdown instantly. No sign up.',
  },
  {
    file: 'app/loan-calculator/page.js',
    title: 'Free Loan Calculator — Monthly Payment, Payoff Date & Full Amortization Table',
    desc: 'Free loan calculator with full amortization schedule, exact payoff date and principal vs interest bar. Includes car loan, personal loan and student loan presets.',
  },
  {
    file: 'app/compound-interest/page.js',
    title: 'Compound Interest Calculator — Year by Year Growth Table & Rule of 72',
    desc: 'Free compound interest calculator with year by year growth table, Rule of 72 doubling time and compounding frequency options. See how your money grows over time.',
  },
  {
    file: 'app/debt-payoff-calculator/page.js',
    title: 'Debt Payoff Calculator — Snowball vs Avalanche Side by Side Comparison 2026',
    desc: 'Free debt payoff calculator comparing snowball vs avalanche methods side by side. Add your debts, set extra payments and see exact payoff time and interest saved.',
  },
  {
    file: 'app/budget-calculator/page.js',
    title: 'Free Budget Calculator — 50/30/20 Rule with Customizable Splits & Annual Summary',
    desc: 'Free monthly budget calculator with customizable 50/30/20 splits, live color bar and full annual summary. Adjust needs, wants and savings to fit your lifestyle.',
  },
  {
    file: 'app/retirement-calculator/page.js',
    title: 'Free Retirement Calculator — Progress Bar, Milestones & Monthly Income Estimate',
    desc: 'Free retirement calculator with progress bar showing how close you are to your goal. See savings milestones by age and estimated monthly retirement income using 4% rule.',
  },
  {
    file: 'app/net-worth-calculator/page.js',
    title: 'Free Net Worth Calculator — Add Assets & Liabilities with Live Balance Bar',
    desc: 'Free net worth calculator with editable assets and liabilities. Add, edit or remove items and see your net worth update in real time with a visual assets vs liabilities bar.',
  },
  {
    file: 'app/savings-calculator/page.js',
    title: 'Free Savings Calculator — Year by Year Growth Table & Rate Presets 2026',
    desc: 'Free savings calculator with year by year growth table. Compare regular bank, high yield savings and S&P 500 rate presets. See exactly how your savings grow over time.',
  },
  {
    file: 'app/inflation-calculator/page.js',
    title: 'Free Inflation Calculator — Purchasing Power Table & Historical Rate Presets',
    desc: 'Free inflation calculator with year by year purchasing power table. Compare Fed target, historical average and 2022 peak presets. See how inflation erodes your money.',
  },
  {
    file: 'app/emergency-fund-calculator/page.js',
    title: 'Free Emergency Fund Calculator — How Much Do You Need? (3-6 Month Guide)',
    desc: 'Free emergency fund calculator. Find out exactly how much you need in your emergency fund based on monthly expenses. See how long to save 3, 6 or 12 months of expenses.',
  },
  {
    file: 'app/tax-calculator/page.js',
    title: 'Free Tax Calculator 2026 — Federal Income Tax with Brackets & Effective Rate',
    desc: 'Free 2026 federal income tax calculator. See your tax bracket, effective tax rate and estimated tax bill. Updated for 2026 tax brackets and standard deductions.',
  },
  {
    file: 'app/rent-vs-buy-calculator/page.js',
    title: 'Rent vs Buy Calculator 2026 — True Monthly Cost Comparison with Hidden Costs',
    desc: 'Free rent vs buy calculator for 2026. Compare the true monthly cost of renting vs buying including all hidden costs most people forget. Make the right decision for your market.',
  },
];

let fixed = 0;

updates.forEach(({ file, title, desc }) => {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  Not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  // Update title
  content = content.replace(
    /title: ['"][^'"]+['"]/,
    `title: '${title}'`
  );

  // Update description
  content = content.replace(
    /description: ['"][^'"]+['"]/,
    `description: '${desc}'`
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Updated: ${file}`);
  fixed++;
});

console.log(`\n🎉 Done! ${fixed} files updated with new feature-rich metadata.`);
console.log('Run: git add . && git commit -m "Update metadata to reflect all new calculator features" && git push origin master:main');
