const fs = require('fs');
const path = require('path');

const dirs = [
  'app/retirement-calculator/age/[age]',
  'app/budget-calculator/city/[city]',
  'app/mortgage-calculator/price/[price]',
  'app/car-loan-calculator/brand/[brand]',
];

dirs.forEach(dir => {
  const wp = dir.replace(/\//g, path.sep);
  console.log('\n═══ ' + dir + ' ═══');
  if (!fs.existsSync(wp)) { console.log('DIR NOT FOUND'); return; }
  fs.readdirSync(wp).forEach(f => console.log('  ' + f));
  // Show first 600 chars of page.js
  const pg = path.join(wp, 'page.js');
  if (fs.existsSync(pg)) {
    console.log('\npage.js:');
    console.log(fs.readFileSync(pg, 'utf8').slice(0, 600));
  }
});
