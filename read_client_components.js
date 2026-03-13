const fs = require('fs');
const path = require('path');

const files = [
  'app/retirement-calculator/age/[age]/RetirementAgeClient.js',
  'app/budget-calculator/city/[city]/BudgetCityClient.js',
];

files.forEach(f => {
  const wp = f.replace(/\//g, path.sep);
  console.log('\n═══ ' + f + ' ═══');
  if (fs.existsSync(wp)) console.log(fs.readFileSync(wp, 'utf8'));
  else console.log('NOT FOUND');
});
