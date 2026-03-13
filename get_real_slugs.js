const fs = require('fs');
const path = require('path');

// Get first slug from each data file
const FILES = {
  'mortgage/price':     'data/homePrices.js',
  'car/price':          'data/carPrices.js',
  'personal-loan/amt':  'data/loanAmounts.js',
  'student-loan/amt':   'data/studentAmounts.js',
  'compound/scenario':  'data/ciScenarios.js',
  'retirement/age':     'data/retirementAges.js',
  'networth/age':       'data/netWorthAges.js',
  '401k/salary':        'data/salaries401k.js',
  'cc/balance':         'data/ccBalances.js',
  'freelance/job':      'data/freelanceJobs.js',
  'inflation/year':     'data/inflationYears.js',
};

Object.entries(FILES).forEach(([label, file]) => {
  const wp = file.replace(/\//g, path.sep);
  if (!fs.existsSync(wp)) { console.log(label + ': NOT FOUND'); return; }
  const content = fs.readFileSync(wp, 'utf8');
  // Try slug: "..." pattern
  const m = content.match(/"slug":\s*"([^"]+)"/);
  // Also try slug: '...' pattern  
  const m2 = content.match(/slug:\s*['"]([^'"]+)['"]/);
  const slug = (m && m[1]) || (m2 && m2[1]) || 'NOT FOUND';
  console.log(label + ': ' + slug);
});
