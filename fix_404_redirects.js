const fs = require('fs');
const path = require('path');

const configFile = path.join(__dirname, 'next.config.js');
let config = fs.readFileSync(configFile, 'utf8');

// These 9 URLs return 404 — redirect them to the closest matching page
const newRedirects = [
  { source: '/investment-calculator', destination: '/investment-return-calculator', permanent: true },
  { source: '/personal-loan', destination: '/personal-loan-calculator', permanent: true },
  { source: '/income-tax-calculator', destination: '/tax-calculator', permanent: true },
  { source: '/inventory-turnover-calculator', destination: '/accounts-receivable-calculator', permanent: true },
  { source: '/revenue-growth-calculator', destination: '/roi-calculator', permanent: true },
  { source: '/gas-mileage-calculator', destination: '/fuel-cost-calculator', permanent: true },
  { source: '/pricing-calculator', destination: '/markup-calculator', permanent: true },
  { source: '/road-trip-cost-calculator', destination: '/fuel-cost-calculator', permanent: true },
  { source: '/credit-score-calculator', destination: '/credit-utilization-calculator', permanent: true },
];

// Find the redirects array in next.config.js
if (config.includes('async redirects()')) {
  // Find the return [ inside redirects
  const redirectStart = config.indexOf('async redirects()');
  const returnIdx = config.indexOf('return [', redirectStart);
  const arrayStart = config.indexOf('[', returnIdx);
  
  // Build new redirect entries
  const entries = newRedirects.map(r => `
      {
        source: '${r.source}',
        destination: '${r.destination}',
        permanent: ${r.permanent},
      }`).join(',');
  
  // Find the closing ] of the return array
  // We need to find the matching ]
  let bracketCount = 0;
  let insertIdx = -1;
  for (let i = arrayStart; i < config.length; i++) {
    if (config[i] === '[') bracketCount++;
    if (config[i] === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        insertIdx = i;
        break;
      }
    }
  }
  
  if (insertIdx > 0) {
    // Insert before the closing ]
    config = config.slice(0, insertIdx) + ',' + entries + '\n    ' + config.slice(insertIdx);
    fs.writeFileSync(configFile, config, 'utf8');
    console.log('  ✅ Added 9 redirects to next.config.js');
  }
} else {
  console.log('  ❌ Could not find redirects section');
}

console.log('');
console.log('  Redirects added:');
newRedirects.forEach(r => console.log('    ' + r.source + ' → ' + r.destination));
console.log('');
console.log('Now run:');
console.log('  git add . && git commit -m "Add redirects for 9 broken URLs" && git push origin master');
