const fs = require('fs');

let c = fs.readFileSync('components/Header.js', 'utf8');

// 1. Add Data & Research section to MEGA menu (after Business & Budget)
const newMegaSection = `  {
    label: 'Data & Research',
    tools: [
      { name: 'State Rankings (50)', href: '/data' },
      { name: 'Salary by Profession', href: '/salary-data' },
      { name: 'Financial by Age', href: '/financial-data' },
      { name: 'Mortgage Data', href: '/mortgage-data' },
      { name: 'Insurance Data', href: '/insurance-data' },
      { name: 'Credit Card Data', href: '/credit-card-data' },
      { name: 'Tax Brackets 2026', href: '/federal-tax-brackets' },
      { name: 'Min Wage by State', href: '/minimum-wage-by-state' },
    ],
  },`;

// Insert after the last mega section closing
c = c.replace(
  "]\n\nconst DIRECT",
  ",\n" + newMegaSection + "\n]\n\nconst DIRECT"
);

// 2. Add Data link to DIRECT nav
c = c.replace(
  "{ label: 'Blog', href: '/blog' },",
  "{ label: 'Data', href: '/data' },\n  { label: 'Blog', href: '/blog' },"
);

// 3. Add Data & Research to MOBILE_NAV
const newMobileSection = `  {
    label: 'Data & Research',
    tools: [
      { name: 'All State Rankings', href: '/data' },
      { name: 'Salary by Profession', href: '/salary-data' },
      { name: 'Financial by Age', href: '/financial-data' },
      { name: 'Mortgage Data', href: '/mortgage-data' },
      { name: 'Insurance Data', href: '/insurance-data' },
      { name: 'Credit Card Data', href: '/credit-card-data' },
      { name: 'Tax Brackets 2026', href: '/federal-tax-brackets' },
      { name: 'Min Wage by State', href: '/minimum-wage-by-state' },
      { name: 'Property Tax Rates', href: '/property-tax-rates-by-state' },
      { name: 'Inflation by Year', href: '/inflation-rate-by-year' },
      { name: 'Social Security', href: '/social-security-benefits-by-age' },
      { name: '401k/IRA Limits', href: '/401k-ira-contribution-limits' },
    ],
  },`;

// Find end of MOBILE_NAV array and add before closing
const mobileEnd = c.indexOf("]\n", c.indexOf("const MOBILE_NAV"));
if (mobileEnd > -1) {
  // Find the last } before the ]
  const lastBrace = c.lastIndexOf("  },", mobileEnd);
  if (lastBrace > c.indexOf("const MOBILE_NAV")) {
    c = c.substring(0, lastBrace + 4) + "\n" + newMobileSection + "\n" + c.substring(lastBrace + 4);
  }
}

fs.writeFileSync('components/Header.js', c, 'utf8');
console.log('Updated Header.js:');
console.log('  - Added Data & Research to mega menu (7th column)');
console.log('  - Added Data link to direct nav bar');
console.log('  - Added Data & Research to mobile drawer');
console.log('');
console.log('Now run: git add . && git commit -m "Add data sections to header nav" && git push origin master');
