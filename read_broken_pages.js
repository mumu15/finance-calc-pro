const fs = require('fs');
const path = require('path');

const BROKEN = [
  'app/mortgage-calculator/price/[price]/page.js',
  'app/retirement-calculator/age/[age]/page.js',
  'app/401k-calculator/salary/[salary]/page.js',
  'app/compound-interest/scenario/[scenario]/page.js',
  'app/net-worth-calculator/age/[age]/page.js',
  'app/credit-card-payoff-calculator/balance/[balance]/page.js',
  'app/freelance-rate-calculator/job/[job]/page.js',
  'app/inflation-calculator/year/[year]/page.js',
  'app/car-loan-calculator/price/[price]/page.js',
  'app/personal-loan-calculator/amount/[amount]/page.js',
  'app/student-loan-calculator/amount/[amount]/page.js',
];

BROKEN.forEach(f => {
  const wp = f.replace(/\//g, path.sep);
  console.log('\n═══ ' + f + ' ═══');
  if (fs.existsSync(wp)) console.log(fs.readFileSync(wp, 'utf8'));
  else console.log('NOT FOUND');
});
