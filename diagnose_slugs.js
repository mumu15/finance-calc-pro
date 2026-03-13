const fs = require('fs');
const path = require('path');

// Check actual slugs in data files
const DATA = [
  ['data/homePrices.js',    'price',    '300000'],
  ['data/carPrices.js',     'price',    '30000'],
  ['data/loanAmounts.js',   'amount',   '10000'],
  ['data/studentAmounts.js','amount',   '50000'],
  ['data/ciScenarios.js',   'scenario', 'sp500-index-fund'],
  ['data/retirementAges.js','age',      '30'],
  ['data/netWorthAges.js',  'age',      '35'],
  ['data/salaries401k.js',  'salary',   '80000'],
  ['data/ccBalances.js',    'balance',  '5000'],
  ['data/freelanceJobs.js', 'job',      'web-developer'],
  ['data/inflationYears.js','year',     '2020'],
];

DATA.forEach(([file, param, testSlug]) => {
  const wp = file.replace(/\//g, path.sep);
  if (!fs.existsSync(wp)) { console.log('NOT FOUND: ' + file); return; }
  const content = fs.readFileSync(wp, 'utf8');
  // Extract first few slugs
  const slugs = [...content.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g)].map(m => m[1]).slice(0, 5);
  const hasTest = content.includes("'" + testSlug + "'") || content.includes('"' + testSlug + '"') || content.includes('`' + testSlug + '`');
  console.log((hasTest ? '✅' : '❌') + ' ' + file);
  console.log('   First slugs: ' + slugs.join(', '));
  console.log('   Testing "' + testSlug + '": ' + (hasTest ? 'FOUND' : 'NOT FOUND'));
});
