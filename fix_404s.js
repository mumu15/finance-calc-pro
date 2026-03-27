const fs = require('fs');
const path = require('path');

// Check if next.config.js exists
const configPath = path.join(__dirname, 'next.config.js');
let config = '';
if (fs.existsSync(configPath)) {
  config = fs.readFileSync(configPath, 'utf8');
}

// Build new config with redirects
const newConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/salary-after-tax-calculator/state/:slug', destination: '/salary-after-tax-calculator', permanent: true },
      { source: '/roth-ira-vs-traditional-ira', destination: '/401k-vs-roth-ira', permanent: true },
      { source: '/loan-payoff-calculator', destination: '/loan-payment-calculator', permanent: true },
      { source: '/auto-lease-calculator', destination: '/lease-vs-buy-calculator', permanent: true },
      { source: '/trade-in-calculator', destination: '/car-depreciation-calculator', permanent: true },
      { source: '/salary-after-tax', destination: '/salary-after-tax-calculator', permanent: true },
      { source: '/expense-tracker-calculator', destination: '/budget-planner-calculator', permanent: true },
      { source: '/car-payment-calculator', destination: '/car-loan-calculator', permanent: true },
      { source: '/vehicle-depreciation-calculator', destination: '/car-depreciation-calculator', permanent: true },
      { source: '/financial-independence-calculator', destination: '/fire-calculator', permanent: true },
      { source: '/income-tax-calculator', destination: '/tax-calculator', permanent: true },
      { source: '/investment-calculator', destination: '/investment-return-calculator', permanent: true },
      { source: '/personal-loan', destination: '/personal-loan-calculator', permanent: true },
      { source: '/inventory-turnover-calculator', destination: '/profit-margin-calculator', permanent: true },
      { source: '/revenue-growth-calculator', destination: '/roi-calculator', permanent: true },
      { source: '/gas-mileage-calculator', destination: '/fuel-cost-calculator', permanent: true },
      { source: '/pricing-calculator', destination: '/markup-calculator', permanent: true },
      { source: '/road-trip-cost-calculator', destination: '/fuel-cost-calculator', permanent: true },
      { source: '/credit-score-calculator', destination: '/credit-utilization-calculator', permanent: true },
    ]
  },
`;

// Preserve any existing config options
if (config.includes('nextConfig')) {
  // Extract existing options between the first { and the closing }
  const existingMatch = config.match(/const nextConfig\s*=\s*\{([\s\S]*?)\n\}/);
  if (existingMatch) {
    let existing = existingMatch[1].trim();
    // Remove any existing redirects
    existing = existing.replace(/async redirects\(\)\s*\{[\s\S]*?\},?\n?/g, '');
    existing = existing.trim();
    if (existing && !existing.endsWith(',')) existing += ',';
    
    const finalConfig = newConfig + (existing ? '  ' + existing + '\n' : '') + `}

module.exports = nextConfig
`;
    fs.writeFileSync(configPath, finalConfig, 'utf8');
  } else {
    fs.writeFileSync(configPath, newConfig + `}

module.exports = nextConfig
`, 'utf8');
  }
} else {
  fs.writeFileSync(configPath, newConfig + `}

module.exports = nextConfig
`, 'utf8');
}

console.log('Fixed 19 redirects in next.config.js');
console.log('');
console.log('Redirects:');
console.log('  /salary-after-tax-calculator/state/* -> /salary-after-tax-calculator');
console.log('  /roth-ira-vs-traditional-ira -> /401k-vs-roth-ira');
console.log('  /loan-payoff-calculator -> /loan-payment-calculator');
console.log('  /auto-lease-calculator -> /lease-vs-buy-calculator');
console.log('  /trade-in-calculator -> /car-depreciation-calculator');
console.log('  /salary-after-tax -> /salary-after-tax-calculator');
console.log('  /expense-tracker-calculator -> /budget-planner-calculator');
console.log('  /car-payment-calculator -> /car-loan-calculator');
console.log('  /vehicle-depreciation-calculator -> /car-depreciation-calculator');
console.log('  /financial-independence-calculator -> /fire-calculator');
console.log('  /income-tax-calculator -> /tax-calculator');
console.log('  /investment-calculator -> /investment-return-calculator');
console.log('  /personal-loan -> /personal-loan-calculator');
console.log('  /inventory-turnover-calculator -> /profit-margin-calculator');
console.log('  /revenue-growth-calculator -> /roi-calculator');
console.log('  /gas-mileage-calculator -> /fuel-cost-calculator');
console.log('  /pricing-calculator -> /markup-calculator');
console.log('  /road-trip-cost-calculator -> /fuel-cost-calculator');
console.log('  /credit-score-calculator -> /credit-utilization-calculator');
console.log('');
console.log('Now run:');
console.log('  git add . && git commit -m "Fix 19 404s with permanent redirects" && git push origin master');
