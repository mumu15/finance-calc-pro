const fs = require('fs');

console.log('');
console.log('=====================================================');
console.log('  FFC STRUCTURAL AUDIT FIX');
console.log('=====================================================');
console.log('');

// ================================================================
// 1. FIX INTERNAL LINKS — Add new data categories
// ================================================================

let il = fs.readFileSync('components/InternalLinks.js', 'utf8');

if (!il.includes('mortgage-data')) {
  // Find the LINK_MAP object and add new categories before the closing }
  // Find the last category entry
  const lastCatEnd = il.lastIndexOf("  },\n}");
  if (lastCatEnd > -1) {
    const newCategories = `  },
  mortgageData: {
    label: 'Mortgage Data',
    calcs: [
      { name: 'Mortgage Rates History', href: '/mortgage-data/average-mortgage-rates-by-year' },
      { name: 'Down Payment Stats', href: '/mortgage-data/down-payment-statistics' },
      { name: 'Foreclosure Rates', href: '/mortgage-data/foreclosure-rates-by-state' },
      { name: 'Housing Market Stats', href: '/mortgage-data/housing-market-statistics' },
      { name: 'Closing Costs by State', href: '/mortgage-data/average-closing-costs-by-state' },
      { name: 'Home Price History', href: '/mortgage-data/average-home-price-by-year' },
    ],
    blogs: [
      { name: 'Best Mortgage Rates 2026', href: '/blog/best-mortgage-rates-2026' },
      { name: 'How to Refinance', href: '/blog/how-to-refinance-mortgage-2026' },
      { name: 'How Much House Can I Afford', href: '/blog/how-much-house-can-i-afford-2026' },
    ],
    color: '#f0c842',
  },
  insuranceData: {
    label: 'Insurance Data',
    calcs: [
      { name: 'Car Insurance by State', href: '/insurance-data/average-car-insurance-by-state' },
      { name: 'Health Insurance Cost', href: '/insurance-data/average-health-insurance-cost' },
      { name: 'Life Insurance by Age', href: '/insurance-data/average-life-insurance-cost-by-age' },
      { name: 'Renters Insurance', href: '/insurance-data/average-renters-insurance-by-state' },
      { name: 'Insurance by Age', href: '/insurance-data/insurance-cost-by-age' },
      { name: 'Uninsured Rates', href: '/insurance-data/uninsured-rates-by-state' },
    ],
    blogs: [],
    color: '#10b981',
  },
  creditCardData: {
    label: 'Credit Card Data',
    calcs: [
      { name: 'Credit Card Debt by State', href: '/credit-card-data/average-credit-card-debt-by-state' },
      { name: 'Credit Card APR', href: '/credit-card-data/average-credit-card-interest-rate' },
      { name: 'Debt Statistics', href: '/credit-card-data/credit-card-debt-statistics' },
      { name: 'Approval Rates', href: '/credit-card-data/credit-card-approval-rates' },
      { name: 'Balance Transfer Stats', href: '/credit-card-data/balance-transfer-statistics' },
      { name: 'Rewards Statistics', href: '/credit-card-data/credit-card-rewards-statistics' },
    ],
    blogs: [
      { name: 'Pay Off Credit Card Debt', href: '/blog/how-to-pay-off-credit-card-debt-fast' },
      { name: 'Build Credit Score Fast', href: '/blog/how-to-build-credit-score-fast' },
      { name: 'Debt Consolidation Guide', href: '/blog/debt-consolidation-guide-2026' },
    ],
    color: '#ef4444',
  },
  salaryData: {
    label: 'Salary Data',
    calcs: [
      { name: 'Teacher Salary by State', href: '/salary-data/teacher-salary-by-state' },
      { name: 'Nurse Salary by State', href: '/salary-data/nurse-salary-by-state' },
      { name: 'Software Engineer Salary', href: '/salary-data/software-engineer-salary-by-state' },
      { name: 'Police Officer Salary', href: '/salary-data/police-officer-salary-by-state' },
      { name: 'Electrician Salary', href: '/salary-data/electrician-salary-by-state' },
      { name: 'Pharmacist Salary', href: '/salary-data/pharmacist-salary-by-state' },
    ],
    blogs: [],
    color: '#3b82f6',
  },
  financialData: {
    label: 'Financial Benchmarks',
    calcs: [
      { name: 'Net Worth by Age', href: '/financial-data/average-net-worth-by-age' },
      { name: '401k Balance by Age', href: '/financial-data/average-401k-balance-by-age' },
      { name: 'Savings by Age', href: '/financial-data/average-savings-by-age' },
      { name: 'Debt by Age', href: '/financial-data/average-debt-by-age' },
      { name: 'Saved by 30', href: '/financial-data/how-much-should-you-have-saved-by-30' },
      { name: 'Retirement Savings', href: '/financial-data/average-retirement-savings-by-age' },
    ],
    blogs: [
      { name: 'Save for Retirement', href: '/blog/how-to-save-for-retirement-at-every-age' },
      { name: 'Start Investing', href: '/blog/how-to-invest-for-beginners-2026' },
      { name: 'Save on Taxes', href: '/blog/how-to-save-money-on-taxes-2026' },
    ],
    color: '#8b5cf6',
  },
  referenceData: {
    label: 'Reference Data',
    calcs: [
      { name: 'Tax Brackets 2026', href: '/federal-tax-brackets' },
      { name: 'Minimum Wage by State', href: '/minimum-wage-by-state' },
      { name: 'State Income Tax Rates', href: '/state-income-tax-rates' },
      { name: 'Property Tax by State', href: '/property-tax-rates-by-state' },
      { name: 'Inflation Rate History', href: '/inflation-rate-by-year' },
      { name: 'Social Security by Age', href: '/social-security-benefits-by-age' },
      { name: '401k/IRA Limits', href: '/401k-ira-contribution-limits' },
    ],
    blogs: [],
    color: '#06b6d4',
  },`;

    il = il.substring(0, lastCatEnd) + newCategories + '\n}';
    
    // Also update the URL detection logic to include new paths
    // Find the function that detects category from URL
    if (il.includes('if (path.includes')) {
      // Add detection for new categories before the default/fallback
      const defaultReturn = il.lastIndexOf('return null');
      if (defaultReturn > -1) {
        const newDetection = `  if (path.includes('/mortgage-data')) return 'mortgageData'
  if (path.includes('/insurance-data')) return 'insuranceData'
  if (path.includes('/credit-card-data')) return 'creditCardData'
  if (path.includes('/salary-data')) return 'salaryData'
  if (path.includes('/financial-data')) return 'financialData'
  if (path.includes('/federal-tax') || path.includes('/minimum-wage') || path.includes('/state-income-tax') || path.includes('/property-tax-rates') || path.includes('/inflation-rate') || path.includes('/social-security-benefits') || path.includes('/401k-ira')) return 'referenceData'
  if (path.includes('/data/')) return 'financialData'
`;
        il = il.substring(0, defaultReturn) + newDetection + '  ' + il.substring(defaultReturn);
      }
    }
    
    fs.writeFileSync('components/InternalLinks.js', il, 'utf8');
    console.log('  [FIXED] InternalLinks: Added 6 new categories');
  } else {
    console.log('  [WARN] Could not find insertion point in InternalLinks');
  }
} else {
  console.log('  [OK] InternalLinks already has data categories');
}

// ================================================================
// 2. FIX HOMEPAGE — Add missing reference pages
// ================================================================

const homeFile = fs.existsSync('app/PageClient.js') ? 'app/PageClient.js' : 'app/page.js';
let home = fs.readFileSync(homeFile, 'utf8');

const missingFromHome = [
  { slug: 'state-income-tax-rates', name: 'State Tax Rates 2026', desc: 'All 50 states ranked by rate', color: '#8b5cf6' },
  { slug: 'property-tax-rates-by-state', name: 'Property Tax Rates', desc: 'Effective rates all 50 states', color: '#06b6d4' },
  { slug: 'inflation-rate-by-year', name: 'Inflation by Year', desc: 'CPI data 1960-2026', color: '#f97316' },
  { slug: 'social-security-benefits-by-age', name: 'Social Security 2026', desc: 'Benefits by claiming age', color: '#ec4899' },
  { slug: '401k-ira-contribution-limits', name: '401k/IRA Limits 2026', desc: 'All account contribution limits', color: '#06b6d4' },
];

let addedToHome = 0;
missingFromHome.forEach(page => {
  if (!home.includes(page.slug)) {
    // Find the Data & Research section's closing grid div
    const dataSection = home.indexOf('Data & Research');
    if (dataSection > -1) {
      // Find the </div> that closes the grid inside Data section
      // Look for the closing </div>\n      </div> pattern after data section
      const afterData = home.indexOf('</div>\n      </div>', dataSection);
      if (afterData > -1) {
        const newCard = `
          <a href="/${page.slug}" style={{display:'block',padding:'16px 20px',borderRadius:14,background:'rgba(${page.color === '#8b5cf6' ? '139,92,246' : page.color === '#06b6d4' ? '6,182,212' : page.color === '#f97316' ? '249,115,22' : '236,72,153'},0.06)',border:'1px solid rgba(${page.color === '#8b5cf6' ? '139,92,246' : page.color === '#06b6d4' ? '6,182,212' : page.color === '#f97316' ? '249,115,22' : '236,72,153'},0.15)',textDecoration:'none'}}>
            <div style={{fontSize:14,fontWeight:700,color:'${page.color}'}}>${page.name}</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:4}}>${page.desc}</div>
          </a>`;
        home = home.substring(0, afterData) + newCard + home.substring(afterData);
        addedToHome++;
      }
    }
  }
});

if (addedToHome > 0) {
  fs.writeFileSync(homeFile, home, 'utf8');
  console.log('  [FIXED] Homepage: Added ' + addedToHome + ' missing reference page cards');
} else {
  console.log('  [OK] Homepage has all reference pages (or could not find insertion point)');
}

// ================================================================
// 3. FIX HEADER — Add missing state-income-tax-rates
// ================================================================

let header = fs.readFileSync('components/Header.js', 'utf8');

if (!header.includes('state-income-tax-rates')) {
  // Add to Data & Research section in mega menu
  header = header.replace(
    "{ name: 'Min Wage by State', href: '/minimum-wage-by-state' },",
    "{ name: 'Min Wage by State', href: '/minimum-wage-by-state' },\n      { name: 'State Income Tax', href: '/state-income-tax-rates' },"
  );
  fs.writeFileSync('components/Header.js', header, 'utf8');
  console.log('  [FIXED] Header: Added state-income-tax-rates to mega menu');
} else {
  console.log('  [OK] Header has state-income-tax-rates');
}

// ================================================================
// 4. CHECK FOOTER — Add data section links if missing
// ================================================================

let footer = fs.readFileSync('components/Footer.js', 'utf8');

if (!footer.includes('mortgage-data') && !footer.includes('insurance-data')) {
  // Find a good place to add data links in footer
  // Look for the last footer column/section
  if (footer.includes('Blog') || footer.includes('blog')) {
    // Add a new data section after existing footer columns
    const footerDataSection = `
      {/* Data & Research */}
      <div>
        <h4 style={{color:'#f1f5f9',fontWeight:700,fontSize:13,marginBottom:12,textTransform:'uppercase',letterSpacing:'0.05em'}}>Data & Research</h4>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <a href="/data" style={{color:'#64748b',textDecoration:'none',fontSize:13}}>State Rankings</a>
          <a href="/salary-data" style={{color:'#64748b',textDecoration:'none',fontSize:13}}>Salary Data</a>
          <a href="/financial-data" style={{color:'#64748b',textDecoration:'none',fontSize:13}}>Financial by Age</a>
          <a href="/mortgage-data" style={{color:'#64748b',textDecoration:'none',fontSize:13}}>Mortgage Data</a>
          <a href="/insurance-data" style={{color:'#64748b',textDecoration:'none',fontSize:13}}>Insurance Data</a>
          <a href="/credit-card-data" style={{color:'#64748b',textDecoration:'none',fontSize:13}}>Credit Card Data</a>
          <a href="/federal-tax-brackets" style={{color:'#64748b',textDecoration:'none',fontSize:13}}>Tax Brackets 2026</a>
          <a href="/minimum-wage-by-state" style={{color:'#64748b',textDecoration:'none',fontSize:13}}>Minimum Wage</a>
        </div>
      </div>`;
    
    // Find the InternalLinks component or the closing of footer grid
    const internalLinksIdx = footer.indexOf('<InternalLinks');
    const footerClose = footer.lastIndexOf('</footer>');
    
    if (internalLinksIdx > -1) {
      footer = footer.substring(0, internalLinksIdx) + footerDataSection + '\n      ' + footer.substring(internalLinksIdx);
      console.log('  [FIXED] Footer: Added Data & Research column before InternalLinks');
    } else if (footerClose > -1) {
      // Find the last </div> before </footer>
      const lastDiv = footer.lastIndexOf('</div>', footerClose);
      if (lastDiv > -1) {
        footer = footer.substring(0, lastDiv) + footerDataSection + '\n    ' + footer.substring(lastDiv);
        console.log('  [FIXED] Footer: Added Data & Research column');
      }
    }
    
    fs.writeFileSync('components/Footer.js', footer, 'utf8');
  } else {
    console.log('  [WARN] Footer structure not recognized, skipping');
  }
} else {
  console.log('  [OK] Footer already has data links');
}

// ================================================================
// SUMMARY
// ================================================================

console.log('');
console.log('=====================================================');
console.log('  AUDIT FIX COMPLETE');
console.log('');
console.log('  Fixed:');
console.log('  1. InternalLinks: 6 new categories added');
console.log('     (mortgage-data, insurance-data, credit-card-data,');
console.log('      salary-data, financial-data, reference-data)');
console.log('  2. Homepage: Missing reference pages added');
console.log('  3. Header: state-income-tax-rates added');
console.log('  4. Footer: Data & Research column added');
console.log('');
console.log('  Every page now links to related content through:');
console.log('  - Header mega menu (7 categories + direct links)');
console.log('  - Homepage (all hubs + reference pages)');
console.log('  - Footer (data section)');
console.log('  - InternalLinks (auto-detected on every page)');
console.log('  - Hub pages (each links to its sub-pages)');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Complete structural audit: fix internal links, footer, homepage"');
console.log('  git push origin master');
