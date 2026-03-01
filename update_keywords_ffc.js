const fs = require('fs');

const updates = [
  {
    file: 'app/mortgage-calculator/page.js',
    newTitle: 'Free Mortgage Calculator — Monthly Payment on $200K $300K $400K House',
    newDesc: 'Free mortgage calculator online. Calculate your exact monthly mortgage payment for any loan amount. See payment on $200,000, $300,000 or $400,000 home. Instant results.',
    oldH1: 'Mortgage Calculator',
    newH1: 'Free Mortgage Calculator — Monthly Payment Estimator',
    newP: 'Calculate your exact monthly mortgage payment instantly — free mortgage calculator, no sign up',
  },
  {
    file: 'app/loan-calculator/page.js',
    newTitle: 'Free Loan Payment Calculator — Monthly Payment for Any Loan 2026',
    newDesc: 'Free loan payment calculator online. Calculate monthly payments for personal loans, car loans and student loans. See total interest paid over the life of any loan.',
    oldH1: 'Loan Calculator',
    newH1: 'Free Loan Payment Calculator Online',
    newP: 'Calculate monthly loan payments and total interest for any loan — free loan calculator online',
  },
  {
    file: 'app/compound-interest/page.js',
    newTitle: 'Compound Interest Calculator Free — With Monthly Contributions 2026',
    newDesc: 'Free compound interest calculator with monthly contributions. See how your money grows over time. Calculate compound interest daily, monthly or annually. Instant results.',
    oldH1: 'Compound Interest Calculator',
    newH1: 'Free Compound Interest Calculator With Contributions',
    newP: 'Calculate compound interest with monthly contributions — see how your money grows over time',
  },
  {
    file: 'app/savings-calculator/page.js',
    newTitle: 'Free Savings Calculator — How Much Will I Save in 10, 20, 30 Years?',
    newDesc: 'Free savings calculator online. Find out how much you will save in 5, 10, 20 or 30 years with regular contributions. Calculate savings growth with compound interest.',
    oldH1: 'Savings Calculator',
    newH1: 'Free Savings Calculator — See Your Money Grow',
    newP: 'Calculate how much you will save over time with regular contributions — free savings growth calculator',
  },
  {
    file: 'app/retirement-calculator/page.js',
    newTitle: 'Free Retirement Calculator — How Much Do I Need to Retire at 55, 60, 65?',
    newDesc: 'Free retirement calculator online. Find out how much you need to retire at 55, 60 or 65. Uses the 4% rule to calculate your retirement savings target. Instant results.',
    oldH1: 'Retirement Calculator',
    newH1: 'Free Retirement Calculator — How Much Do You Need?',
    newP: 'Calculate how much you need to retire at any age — free retirement savings calculator using the 4% rule',
  },
  {
    file: 'app/tax-calculator/page.js',
    newTitle: 'Free Tax Calculator 2026 — Estimate Your Federal Income Tax Bill',
    newDesc: 'Free federal income tax calculator for 2026. Estimate your tax bill based on income, filing status and deductions. See your effective tax rate and marginal tax bracket.',
    oldH1: 'Tax Calculator',
    newH1: 'Free Federal Tax Calculator 2026',
    newP: 'Estimate your 2026 federal income tax bill instantly — free tax calculator with current tax brackets',
  },
  {
    file: 'app/debt-payoff-calculator/page.js',
    newTitle: 'Free Debt Payoff Calculator — Snowball vs Avalanche Method 2026',
    newDesc: 'Free debt payoff calculator online. Compare snowball vs avalanche debt payoff methods. See how long to pay off $10,000, $20,000 or $50,000 in debt. Instant results.',
    oldH1: 'Debt Payoff Calculator',
    newH1: 'Free Debt Payoff Calculator — Snowball vs Avalanche',
    newP: 'Calculate how long to pay off any debt using snowball or avalanche method — free debt payoff calculator',
  },
  {
    file: 'app/emergency-fund-calculator/page.js',
    newTitle: 'Free Emergency Fund Calculator — How Much Do I Need? (2026)',
    newDesc: 'Free emergency fund calculator. Find out exactly how much emergency fund you need based on your monthly expenses. Most experts recommend 3-6 months of expenses.',
    oldH1: 'Emergency Fund Calculator',
    newH1: 'Free Emergency Fund Calculator — How Much Do You Need?',
    newP: 'Calculate exactly how much emergency fund you need and how long to save it — free calculator',
  },
  {
    file: 'app/budget-calculator/page.js',
    newTitle: 'Free Budget Calculator — 50/30/20 Rule Monthly Budget Planner 2026',
    newDesc: 'Free monthly budget calculator using the 50/30/20 rule. Enter your income and see exactly how much to spend on needs, wants and savings each month. Instant results.',
    oldH1: 'Budget Calculator',
    newH1: 'Free Monthly Budget Calculator — 50/30/20 Rule',
    newP: 'Create your monthly budget using the 50/30/20 rule — free budget calculator for any income',
  },
  {
    file: 'app/net-worth-calculator/page.js',
    newTitle: 'Free Net Worth Calculator — Calculate Your Net Worth in 2026',
    newDesc: 'Free net worth calculator online. Add your assets and liabilities to calculate your total net worth instantly. Track your financial progress over time. No sign up needed.',
    oldH1: 'Net Worth Calculator',
    newH1: 'Free Net Worth Calculator Online',
    newP: 'Calculate your total net worth by entering assets and liabilities — free net worth calculator',
  },
  {
    file: 'app/rent-vs-buy-calculator/page.js',
    newTitle: 'Rent vs Buy Calculator 2026 — Should I Rent or Buy a Home?',
    newDesc: 'Free rent vs buy calculator for 2026. Compare the true monthly cost of renting vs buying a home in your market. Includes all hidden costs most people forget.',
    oldH1: 'Rent vs Buy Calculator',
    newH1: 'Rent vs Buy Calculator — Should You Rent or Buy in 2026?',
    newP: 'Compare the true costs of renting vs buying a home in your market — free rent vs buy calculator 2026',
  },
  {
    file: 'app/inflation-calculator/page.js',
    newTitle: 'Free Inflation Calculator — What Will $100,000 Be Worth in 10, 20 Years?',
    newDesc: 'Free inflation calculator online. See how inflation reduces purchasing power over time. Find out what $100,000 today will be worth in 10, 20 or 30 years at any inflation rate.',
    oldH1: 'Inflation Calculator',
    newH1: 'Free Inflation Calculator — Purchasing Power Over Time',
    newP: 'Calculate how inflation affects your money over time — free inflation and purchasing power calculator',
  },
];

let fixed = 0;

updates.forEach(({ file, newTitle, newDesc, oldH1, newH1, newP }) => {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  Not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Update title in metadata
  content = content.replace(
    /title: ['"][^'"]+['"]/,
    `title: '${newTitle}'`
  );

  // Update description in metadata
  content = content.replace(
    /description: ['"][^'"]+['"]/,
    `description: '${newDesc}'`
  );

  // Update H1
  if (oldH1 && content.includes(oldH1)) {
    content = content.replace(
      new RegExp(`>${oldH1}<`, 'g'),
      `>${newH1}<`
    );
  }

  // Update subtitle paragraph - find and replace the p tag content after h1
  content = content.replace(
    /<p className="text-slate-400 text-lg[^"]*">[^<]+<\/p>/,
    `<p className="text-slate-400 text-lg">${newP}</p>`
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Updated: ${file}`);
  fixed++;
});

console.log(`\n🎉 Done! ${fixed} files updated.`);
console.log('Run: git add . && git commit -m "Update calculator pages with targeted BOFU and long tail keywords" && git push origin master:main');
