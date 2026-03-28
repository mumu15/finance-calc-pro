const fs = require('fs');
const path = require('path');

console.log('');
console.log('=====================================================');
console.log('  CTR OPTIMIZATION: Better Titles + Descriptions');
console.log('  For pages already ranking on page 1-2');
console.log('=====================================================');
console.log('');

const OPTIMIZATIONS = [
  {
    file: 'app/net-worth-calculator/page.js',
    old: "Net Worth Calculator | FreeFinCalc",
    new: "Net Worth Calculator 2026 — Are You Above Average?",
    oldDesc: null,
    newDesc: "Calculate your net worth in 60 seconds. See how you compare to the average American by age. Free, instant, no sign-up."
  },
  {
    file: 'app/savings-goal-calculator/page.js',
    old: "Savings Goal Calculator | FreeFinCalc",
    new: "Savings Goal Calculator — How Long to Reach Your Goal?",
    oldDesc: null,
    newDesc: "Find out exactly when you will reach your savings goal. Enter your target, monthly savings, and interest rate. Free calculator."
  },
  {
    file: 'app/rent-vs-buy-calculator/page.js',
    old: "Rent vs Buy Calculator | FreeFinCalc",
    new: "Rent vs Buy Calculator 2026 — Which Saves You More?",
    oldDesc: null,
    newDesc: "Should you rent or buy in 2026? Compare total costs over 5-30 years with real tax benefits, appreciation, and opportunity cost."
  },
  {
    file: 'app/compound-interest/page.js',
    old: "Compound Interest | FreeFinCalc",
    new: "Compound Interest Calculator — See Your Money Grow",
    oldDesc: null,
    newDesc: "Watch your investment grow with compound interest. Enter any amount, rate, and time period. See yearly breakdown. Free calculator."
  },
  {
    file: 'app/loan-calculator/page.js',
    old: "Loan Calculator | FreeFinCalc",
    new: "Loan Calculator 2026 — Monthly Payment & Total Cost",
    oldDesc: null,
    newDesc: "Calculate monthly loan payments instantly. See total interest, amortization schedule, and payoff date. Works for any loan type."
  },
  {
    file: 'app/dividend-calculator/page.js',
    old: "Dividend Calculator | FreeFinCalc",
    new: "Dividend Calculator — How Much Passive Income?",
    oldDesc: null,
    newDesc: "Calculate dividend income from stocks and ETFs. See monthly and annual payouts with DRIP reinvestment growth projections."
  },
  {
    file: 'app/budget-planner-calculator/page.js',
    old: "Budget Planner Calculator | FreeFinCalc",
    new: "Budget Planner Calculator — 50/30/20 Rule Made Easy",
    oldDesc: null,
    newDesc: "Create a personalized budget in 2 minutes using the 50/30/20 rule. See exactly where your money goes. Free budget calculator."
  },
  {
    file: 'app/savings-calculator/page.js',
    old: "Savings Calculator | FreeFinCalc",
    new: "Savings Calculator 2026 — How Much Will You Have?",
    oldDesc: null,
    newDesc: "Calculate how your savings grow over time with interest. Enter deposits, rate, and time. See monthly breakdown. Free calculator."
  },
  {
    file: 'app/savings-interest-calculator/page.js',
    old: "Savings Interest Calculator | FreeFinCalc",
    new: "Savings Interest Calculator — Earn More on Your Money",
    oldDesc: null,
    newDesc: "Calculate interest earnings on savings accounts, CDs, and money market accounts. Compare rates and see how compounding works."
  },
  {
    file: 'app/debt-snowball-vs-avalanche/page.js',
    old: "Debt Snowball vs Avalanche — Which Pays Off Debt Faster? 2026 | FreeFinCalc",
    new: "Debt Snowball vs Avalanche 2026: Which Method Wins?",
    oldDesc: null,
    newDesc: "Compare debt snowball vs avalanche with your real numbers. See which saves more interest and which pays off debt faster. Free calculator."
  },
  {
    file: 'app/freelance-rate-calculator/page.js',
    old: null,
    new: "Freelance Rate Calculator — What Should You Charge?",
    oldDesc: null,
    newDesc: "Calculate your ideal freelance hourly rate based on expenses, desired salary, and billable hours. Stop undercharging."
  },
  {
    file: 'app/mortgage-calculator/page.js',
    old: null,
    new: "Mortgage Calculator 2026 — Monthly Payment & Amortization",
    oldDesc: null,
    newDesc: "Calculate mortgage payments instantly. See amortization schedule, total interest, and how extra payments save you money. Free."
  },
  {
    file: 'app/tax-calculator/page.js',
    old: null,
    new: "Income Tax Calculator 2026 — Federal & State Brackets",
    oldDesc: null,
    newDesc: "Calculate your 2026 federal and state income tax. See your effective rate, marginal bracket, and take-home pay. Free calculator."
  },
  {
    file: 'app/retirement-calculator/page.js',
    old: null,
    new: "Retirement Calculator 2026 — Are You Saving Enough?",
    oldDesc: null,
    newDesc: "Find out if you are on track for retirement. Enter your age, savings, and contributions. See projected balance at 65. Free."
  },
  {
    file: 'app/credit-card-payoff-calculator/page.js',
    old: null,
    new: "Credit Card Payoff Calculator — Get Debt-Free Faster",
    oldDesc: null,
    newDesc: "See exactly when you will be credit card debt-free. Enter your balance and payments. Get a custom payoff plan. Free calculator."
  },
  {
    file: 'app/401k-calculator/page.js',
    old: null,
    new: "401k Calculator 2026 — How Much Will You Retire With?",
    oldDesc: null,
    newDesc: "Calculate your 401k balance at retirement. Includes employer match, catch-up contributions, and tax savings. Free 401k calculator."
  },
  {
    file: 'app/home-affordability-calculator/page.js',
    old: null,
    new: "Home Affordability Calculator 2026 — How Much House?",
    oldDesc: null,
    newDesc: "Find out how much house you can afford based on income, debt, down payment, and current rates. Uses the 28/36 rule. Free."
  },
  {
    file: 'app/salary-after-tax-calculator/page.js',
    old: null,
    new: "Salary After Tax Calculator 2026 — Your Take-Home Pay",
    oldDesc: null,
    newDesc: "Calculate your exact take-home pay after federal and state taxes. See paycheck breakdown by pay period. All 50 states. Free."
  },
  {
    file: 'app/roth-ira-calculator/page.js',
    old: null,
    new: "Roth IRA Calculator 2026 — Tax-Free Retirement Growth",
    oldDesc: null,
    newDesc: "See how much your Roth IRA will be worth at retirement. Tax-free growth projections with contribution limits. Free calculator."
  },
  {
    file: 'app/fire-calculator/page.js',
    old: null,
    new: "FIRE Calculator — When Can You Retire Early?",
    oldDesc: null,
    newDesc: "Calculate your financial independence number and retirement date. Based on the 4% rule with your real expenses and savings rate."
  },
];

let fixed = 0;
let skipped = 0;

OPTIMIZATIONS.forEach(opt => {
  if (!fs.existsSync(opt.file)) {
    console.log('  SKIP (not found): ' + opt.file);
    skipped++;
    return;
  }

  let c = fs.readFileSync(opt.file, 'utf8');
  let changed = false;

  // Update title
  if (opt.old) {
    // Replace exact old title
    if (c.includes(opt.old)) {
      c = c.replace(opt.old, opt.new);
      changed = true;
    }
  } else {
    // Find any title pattern and replace
    const titleMatch = c.match(/title: '([^']+)'/);
    if (titleMatch && !titleMatch[1].includes('—') && !titleMatch[1].includes('2026')) {
      // Only replace if it's a generic title
      const oldTitle = titleMatch[1];
      c = c.replace("title: '" + oldTitle + "'", "title: '" + opt.new + "'");
      changed = true;
    }
  }

  // Update description if we have a new one
  if (opt.newDesc && changed) {
    const descMatch = c.match(/description: '([^']+)'/);
    if (descMatch) {
      c = c.replace("description: '" + descMatch[1] + "'", "description: '" + opt.newDesc + "'");
    }
  }

  // Also update openGraph title if it exists
  if (changed) {
    const ogMatch = c.match(/openGraph:\s*\{[^}]*title: '([^']+)'/);
    if (ogMatch) {
      const ogOld = ogMatch[1];
      if (!ogOld.includes('—') && !ogOld.includes('2026')) {
        c = c.replace("title: '" + ogOld + "'", "title: '" + opt.new + "'");
      }
    }
  }

  if (changed) {
    fs.writeFileSync(opt.file, c, 'utf8');
    console.log('  UPDATED: ' + opt.file.split('/')[1]);
    fixed++;
  } else {
    console.log('  SKIP (already optimized or pattern mismatch): ' + opt.file.split('/')[1]);
    skipped++;
  }
});

console.log('');
console.log('=====================================================');
console.log('  Updated ' + fixed + ' pages, skipped ' + skipped);
console.log('');
console.log('  OLD: "Net Worth Calculator | FreeFinCalc"');
console.log('  NEW: "Net Worth Calculator 2026 — Are You Above Average?"');
console.log('');
console.log('  Why this matters:');
console.log('  - Position 3 with boring title = 5% CTR');
console.log('  - Position 3 with compelling title = 15% CTR');
console.log('  - 3x more clicks at the SAME position');
console.log('  - Google rewards higher CTR with better rankings');
console.log('=====================================================');
console.log('');
console.log('Run: git add . && git commit -m "Optimize titles for CTR on top-ranking pages" && git push origin master');
