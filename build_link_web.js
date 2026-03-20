const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let modified = 0;

console.log('');
console.log('=====================================================');
console.log('  BUILD INTERNAL LINK WEB — All 1441 Pages');
console.log('=====================================================');
console.log('');

// ============================================================
// LINK DATA: Which calculators relate to which blogs & categories
// ============================================================

const BLOG_TO_CALCS = {
  'how-to-calculate-mortgage-payment': ['/mortgage-calculator','/amortization-calculator','/refinance-calculator','/home-affordability-calculator','/mortgage-points-calculator'],
  'how-to-get-out-of-debt': ['/debt-payoff-calculator','/debt-snowball-calculator','/debt-avalanche-calculator','/debt-consolidation-calculator','/credit-card-payoff-calculator','/balance-transfer-calculator'],
  'how-much-house-can-i-afford': ['/home-affordability-calculator','/mortgage-calculator','/down-payment-calculator','/property-tax-calculator','/rent-vs-buy-calculator'],
  'how-to-calculate-net-worth': ['/net-worth-calculator','/savings-interest-calculator','/investment-return-calculator','/retirement-calculator'],
  'how-to-negotiate-salary': ['/salary-after-tax-calculator','/paycheck-calculator','/hourly-to-salary-calculator','/raise-calculator','/freelance-rate-calculator'],
  'debt-snowball-vs-avalanche': ['/debt-snowball-calculator','/debt-avalanche-calculator','/debt-payoff-calculator','/debt-consolidation-calculator','/401k-vs-roth-ira'],
  'how-to-budget-50-30-20': ['/budget-planner-calculator','/net-worth-calculator','/savings-goal-calculator','/emergency-fund-calculator'],
  'how-to-save-money-fast': ['/savings-goal-calculator','/savings-interest-calculator','/cd-calculator','/emergency-fund-calculator','/budget-planner-calculator'],
  'how-to-invest-for-beginners': ['/investment-return-calculator','/portfolio-growth-calculator','/dollar-cost-averaging-calculator','/dividend-calculator','/roth-ira-calculator'],
  'how-much-to-save-for-retirement': ['/retirement-calculator','/401k-calculator','/roth-ira-calculator','/fire-calculator','/retirement-savings-calculator'],
  'how-to-refinance-mortgage': ['/refinance-calculator','/mortgage-calculator','/amortization-calculator','/home-equity-calculator','/mortgage-points-calculator'],
  'what-is-compound-interest': ['/savings-interest-calculator','/investment-return-calculator','/cd-calculator','/portfolio-growth-calculator','/savings-growth-calculator'],
  'what-is-net-worth': ['/net-worth-calculator','/savings-interest-calculator','/budget-planner-calculator','/retirement-calculator'],
  'what-is-passive-income': ['/passive-income-calculator','/dividend-calculator','/rental-property-calculator','/investment-return-calculator'],
  'how-to-build-emergency-fund': ['/emergency-fund-calculator','/savings-goal-calculator','/budget-planner-calculator','/cd-calculator'],
  'what-is-a-good-credit-score': ['/credit-card-payoff-calculator','/credit-utilization-calculator','/personal-loan-calculator','/mortgage-calculator'],
  'how-to-lower-tax-bill': ['/tax-calculator','/capital-gains-tax-calculator','/self-employment-tax-calculator','/401k-calculator','/roth-ira-calculator'],
  'how-to-max-out-roth-ira': ['/roth-ira-calculator','/401k-calculator','/retirement-calculator','/investment-return-calculator','/401k-vs-roth-ira'],
  'types-of-retirement-accounts': ['/retirement-calculator','/401k-calculator','/roth-ira-calculator','/pension-calculator','/annuity-calculator'],
  'how-to-build-wealth': ['/net-worth-calculator','/investment-return-calculator','/savings-growth-calculator','/retirement-calculator','/passive-income-calculator'],
  'how-does-inflation-affect-savings': ['/inflation-impact-calculator','/savings-interest-calculator','/cd-calculator','/retirement-calculator'],
  'how-to-create-monthly-budget': ['/budget-planner-calculator','/net-worth-calculator','/savings-goal-calculator','/debt-to-income-calculator'],
  'how-to-pay-off-debt-fast': ['/debt-payoff-calculator','/debt-snowball-calculator','/debt-avalanche-calculator','/balance-transfer-calculator','/credit-card-payoff-calculator'],
  'how-to-read-pay-stub': ['/paycheck-calculator','/salary-after-tax-calculator','/net-pay-calculator','/tax-calculator'],
  'how-car-loans-work': ['/car-loan-calculator','/car-affordability-calculator','/loan-comparison-calculator','/car-depreciation-calculator'],
  'how-personal-loans-work': ['/personal-loan-calculator','/loan-comparison-calculator','/loan-interest-calculator','/debt-consolidation-calculator'],
  'how-student-loans-work': ['/student-loan-calculator','/loan-payment-calculator','/debt-payoff-calculator','/refinance-calculator'],
  'how-inflation-works': ['/inflation-impact-calculator','/savings-interest-calculator','/cd-calculator','/bond-yield-calculator'],
  'what-is-an-emergency-fund': ['/emergency-fund-calculator','/savings-goal-calculator','/budget-planner-calculator','/cd-calculator'],
  'rent-vs-buy-home': ['/rent-vs-buy-calculator','/mortgage-calculator','/home-affordability-calculator','/rent-affordability-calculator','/down-payment-calculator'],
  'how-to-calculate-loan-payment': ['/loan-payment-calculator','/personal-loan-calculator','/mortgage-calculator','/car-loan-calculator','/student-loan-calculator'],
};

// Reverse map: calculator slug → related blog posts
const CALC_TO_BLOGS = {};
for (const [blog, calcs] of Object.entries(BLOG_TO_CALCS)) {
  for (const calc of calcs) {
    const slug = calc.replace(/^\//, '');
    if (!CALC_TO_BLOGS[slug]) CALC_TO_BLOGS[slug] = [];
    CALC_TO_BLOGS[slug].push(blog);
  }
}

// Cross-category calculator links
const CROSS_LINKS = {
  'mortgage-calculator': ['/tax-calculator','/budget-planner-calculator','/salary-after-tax-calculator','/net-worth-calculator','/15-vs-30-year-mortgage'],
  'retirement-calculator': ['/tax-calculator','/budget-planner-calculator','/net-worth-calculator','/salary-after-tax-calculator','/401k-vs-roth-ira'],
  '401k-calculator': ['/tax-calculator','/roth-ira-calculator','/salary-after-tax-calculator','/retirement-savings-calculator','/401k-vs-roth-ira'],
  'roth-ira-calculator': ['/tax-calculator','/401k-calculator','/investment-return-calculator','/retirement-calculator','/401k-vs-roth-ira'],
  'credit-card-payoff-calculator': ['/budget-planner-calculator','/salary-after-tax-calculator','/balance-transfer-calculator','/debt-snowball-vs-avalanche'],
  'debt-payoff-calculator': ['/budget-planner-calculator','/salary-after-tax-calculator','/net-worth-calculator','/debt-snowball-vs-avalanche'],
  'car-loan-calculator': ['/budget-planner-calculator','/salary-after-tax-calculator','/car-affordability-calculator','/insurance-calculator'],
  'home-affordability-calculator': ['/mortgage-calculator','/property-tax-calculator','/salary-after-tax-calculator','/budget-planner-calculator','/cost-of-living-calculator'],
  'tax-calculator': ['/salary-after-tax-calculator','/paycheck-calculator','/capital-gains-tax-calculator','/retirement-calculator','/budget-planner-calculator'],
  'salary-after-tax-calculator': ['/tax-calculator','/budget-planner-calculator','/net-worth-calculator','/cost-of-living-calculator','/hourly-to-salary-calculator'],
  'budget-planner-calculator': ['/salary-after-tax-calculator','/net-worth-calculator','/savings-goal-calculator','/debt-to-income-calculator','/cost-of-living-calculator'],
  'net-worth-calculator': ['/budget-planner-calculator','/savings-interest-calculator','/retirement-calculator','/investment-return-calculator','/debt-payoff-calculator'],
  'investment-return-calculator': ['/retirement-calculator','/portfolio-growth-calculator','/roth-ira-calculator','/dividend-calculator','/cd-vs-high-yield-savings'],
  'savings-interest-calculator': ['/cd-calculator','/savings-goal-calculator','/emergency-fund-calculator','/inflation-impact-calculator','/cd-vs-high-yield-savings'],
  'personal-loan-calculator': ['/loan-comparison-calculator','/debt-consolidation-calculator','/credit-card-payoff-calculator','/budget-planner-calculator'],
  'student-loan-calculator': ['/salary-after-tax-calculator','/budget-planner-calculator','/debt-payoff-calculator','/loan-comparison-calculator'],
  'profit-margin-calculator': ['/break-even-calculator','/roi-calculator','/markup-calculator','/cash-flow-calculator','/business-valuation-calculator'],
  'fire-calculator': ['/retirement-calculator','/investment-return-calculator','/savings-goal-calculator','/passive-income-calculator','/net-worth-calculator'],
};

const stateTypes = [
  { prefix: 'property-tax-calculator', label: 'Property Tax' },
  { prefix: 'home-affordability-calculator', label: 'Home Affordability' },
  { prefix: 'cost-of-living-calculator', label: 'Cost of Living' },
  { prefix: 'tax-calculator', label: 'Income Tax' },
  { prefix: 'salary-after-tax-calculator', label: 'Salary After Tax' },
];

// ============================================================
// STEP 1: Add cross-state links to all state pages
// ============================================================
console.log('--- Step 1: Cross-state links on state pages ---');

const states = require('./data/states.js');
let stateLinksAdded = 0;

for (const st of stateTypes) {
  const stateDir = path.join(APP, st.prefix, 'state', '[state]');
  if (!fs.existsSync(stateDir)) continue;

  const files = fs.readdirSync(stateDir).filter(f => f.endsWith('Client.js'));
  for (const file of files) {
    const filePath = path.join(stateDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('Explore More for')) continue; // Already has cross-links

    // Build the cross-state section
    const otherTypes = stateTypes.filter(t => t.prefix !== st.prefix);
    const crossSection = `
        <div style={st.box}>
          <h2 style={st.h2}>{'Explore More for ' + s.name}</h2>
          <p style={st.p}>{'See all ' + s.name + ' financial calculators:'}</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            ${otherTypes.map(t => `<a href={'/${t.prefix}/state/' + s.slug} style={st.calcA}>${t.label} in {s.name}</a>`).join('\n            ')}
            <a href={'/mortgage-calculator'} style={st.calcA}>Mortgage Calculator</a>
            <a href={'/budget-planner-calculator'} style={st.calcA}>Budget Planner</a>
          </div>
        </div>
`;

    // Insert before the FAQ section or "Property Tax by State" / "Cost of Living by State" links
    const insertPatterns = ['Frequently Asked Questions', 'Property Tax by State', 'Home Affordability by State', 'Cost of Living by State', 'Tax Calculator by State'];
    let inserted = false;
    for (const pat of insertPatterns) {
      if (content.includes(pat)) {
        const idx = content.lastIndexOf(pat);
        const divStart = content.lastIndexOf('<div', idx);
        const lineStart = content.lastIndexOf('\n', divStart);
        if (lineStart > 0) {
          content = content.slice(0, lineStart) + crossSection + content.slice(lineStart);
          inserted = true;
          break;
        }
      }
    }

    if (inserted) {
      fs.writeFileSync(filePath, content, 'utf8');
      stateLinksAdded++;
    }
  }
}
console.log('  ✅ Added cross-state links to ' + stateLinksAdded + ' state page templates');

// ============================================================
// STEP 2: Add blog links to core calculators
// ============================================================
console.log('--- Step 2: Blog links on core calculators ---');

let blogLinksAdded = 0;

function findClientFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.next' || item === 'components') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) findClientFiles(full, results);
    else if ((item === 'PageClient.js' || item.endsWith('Client.js')) && !item.startsWith('.')) {
      results.push(full);
    }
  }
  return results;
}

const allClients = findClientFiles(APP);

for (const cf of allClients) {
  let content = fs.readFileSync(cf, 'utf8');
  const rel = path.relative(APP, path.dirname(cf)).replace(/\\/g, '/');
  const parts = rel.split('/').filter(Boolean);
  const slug = parts[0] || '';

  // Skip state pages, blog pages
  if (parts.length > 1) continue;
  if (slug === 'blog' || slug === 'about' || slug === 'contact' || slug === 'privacy-policy') continue;
  if (content.includes('Related Guides') || content.includes('Recommended Reading')) continue;

  const blogs = CALC_TO_BLOGS[slug];
  if (!blogs || blogs.length === 0) continue;

  const blogLinks = blogs.slice(0, 3);
  const titles = {
    'how-to-calculate-mortgage-payment': 'How to Calculate Your Mortgage Payment',
    'how-to-get-out-of-debt': 'How to Get Out of Debt: Complete Guide',
    'how-much-house-can-i-afford': 'How Much House Can I Afford?',
    'how-to-calculate-net-worth': 'How to Calculate Your Net Worth',
    'how-to-negotiate-salary': 'How to Negotiate Your Salary',
    'debt-snowball-vs-avalanche': 'Debt Snowball vs Avalanche: Which Wins?',
    'how-to-budget-50-30-20': 'How to Budget Using the 50/30/20 Rule',
    'how-to-save-money-fast': 'How to Save Money Fast',
    'how-to-invest-for-beginners': 'How to Invest for Beginners',
    'how-much-to-save-for-retirement': 'How Much to Save for Retirement',
    'how-to-refinance-mortgage': 'How to Refinance Your Mortgage',
    'what-is-compound-interest': 'What Is Compound Interest?',
    'what-is-net-worth': 'What Is Net Worth?',
    'what-is-passive-income': 'What Is Passive Income?',
    'how-to-build-emergency-fund': 'How to Build an Emergency Fund',
    'what-is-a-good-credit-score': 'What Is a Good Credit Score?',
    'how-to-lower-tax-bill': 'How to Lower Your Tax Bill',
    'how-to-max-out-roth-ira': 'How to Max Out Your Roth IRA',
    'types-of-retirement-accounts': 'Types of Retirement Accounts',
    'how-to-build-wealth': 'How to Build Wealth',
    'how-does-inflation-affect-savings': 'How Inflation Affects Your Savings',
    'how-to-create-monthly-budget': 'How to Create a Monthly Budget',
    'how-to-pay-off-debt-fast': 'How to Pay Off Debt Fast',
    'how-to-read-pay-stub': 'How to Read Your Pay Stub',
    'how-car-loans-work': 'How Car Loans Work',
    'how-personal-loans-work': 'How Personal Loans Work',
    'how-student-loans-work': 'How Student Loans Work',
    'how-inflation-works': 'How Inflation Works',
    'what-is-an-emergency-fund': 'What Is an Emergency Fund?',
    'rent-vs-buy-home': 'Rent vs Buy: Which Is Better?',
    'how-to-calculate-loan-payment': 'How to Calculate Any Loan Payment',
  };

  const blogSection = `
        <div style={{marginTop:24,marginBottom:24,padding:20,borderRadius:16,background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.12)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Recommended Reading</h2>
${blogLinks.map(b => `          <a href="/blog/${b}" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>${titles[b] || b.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</a>`).join('\n')}
        </div>
`;

  // Insert before Footer or AdUnit at end
  let insertIdx = content.lastIndexOf('<Footer');
  if (insertIdx === -1) insertIdx = content.lastIndexOf('</main>');
  if (insertIdx === -1) continue;

  content = content.slice(0, insertIdx) + blogSection + '      ' + content.slice(insertIdx);
  fs.writeFileSync(cf, content, 'utf8');
  blogLinksAdded++;
}
console.log('  ✅ Added blog links to ' + blogLinksAdded + ' core calculators');

// ============================================================
// STEP 3: Add calculator links to blog posts
// ============================================================
console.log('--- Step 3: Calculator links on blog posts ---');

let calcLinksAdded = 0;

for (const [blogSlug, calcs] of Object.entries(BLOG_TO_CALCS)) {
  const blogDir = path.join(APP, 'blog', blogSlug);
  if (!fs.existsSync(blogDir)) continue;

  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('Try These Calculators') || content.includes('Related Tools')) continue;

    const calcNames = {
      '/mortgage-calculator': 'Mortgage Calculator',
      '/amortization-calculator': 'Amortization Calculator',
      '/refinance-calculator': 'Refinance Calculator',
      '/home-affordability-calculator': 'Home Affordability',
      '/mortgage-points-calculator': 'Mortgage Points',
      '/debt-payoff-calculator': 'Debt Payoff Calculator',
      '/debt-snowball-calculator': 'Debt Snowball',
      '/debt-avalanche-calculator': 'Debt Avalanche',
      '/debt-consolidation-calculator': 'Debt Consolidation',
      '/credit-card-payoff-calculator': 'Credit Card Payoff',
      '/balance-transfer-calculator': 'Balance Transfer',
      '/net-worth-calculator': 'Net Worth Calculator',
      '/savings-interest-calculator': 'Savings Calculator',
      '/investment-return-calculator': 'Investment Return',
      '/retirement-calculator': 'Retirement Calculator',
      '/401k-calculator': '401k Calculator',
      '/roth-ira-calculator': 'Roth IRA Calculator',
      '/fire-calculator': 'FIRE Calculator',
      '/budget-planner-calculator': 'Budget Planner',
      '/salary-after-tax-calculator': 'Salary After Tax',
      '/paycheck-calculator': 'Paycheck Calculator',
      '/hourly-to-salary-calculator': 'Hourly to Salary',
      '/raise-calculator': 'Raise Calculator',
      '/freelance-rate-calculator': 'Freelance Rate',
      '/savings-goal-calculator': 'Savings Goal',
      '/emergency-fund-calculator': 'Emergency Fund',
      '/cd-calculator': 'CD Calculator',
      '/tax-calculator': 'Tax Calculator',
      '/capital-gains-tax-calculator': 'Capital Gains Tax',
      '/self-employment-tax-calculator': 'Self-Employment Tax',
      '/property-tax-calculator': 'Property Tax',
      '/car-loan-calculator': 'Car Loan Calculator',
      '/car-affordability-calculator': 'Car Affordability',
      '/loan-comparison-calculator': 'Loan Comparison',
      '/car-depreciation-calculator': 'Car Depreciation',
      '/personal-loan-calculator': 'Personal Loan',
      '/loan-interest-calculator': 'Loan Interest',
      '/student-loan-calculator': 'Student Loan',
      '/loan-payment-calculator': 'Loan Payment',
      '/down-payment-calculator': 'Down Payment',
      '/rent-vs-buy-calculator': 'Rent vs Buy',
      '/rent-affordability-calculator': 'Rent Affordability',
      '/inflation-impact-calculator': 'Inflation Calculator',
      '/bond-yield-calculator': 'Bond Yield',
      '/portfolio-growth-calculator': 'Portfolio Growth',
      '/dollar-cost-averaging-calculator': 'Dollar Cost Averaging',
      '/dividend-calculator': 'Dividend Calculator',
      '/passive-income-calculator': 'Passive Income',
      '/rental-property-calculator': 'Rental Property',
      '/savings-growth-calculator': 'Savings Growth',
      '/retirement-savings-calculator': 'Retirement Savings',
      '/pension-calculator': 'Pension Calculator',
      '/annuity-calculator': 'Annuity Calculator',
      '/debt-to-income-calculator': 'Debt-to-Income',
      '/net-pay-calculator': 'Net Pay Calculator',
      '/home-equity-calculator': 'Home Equity',
      '/credit-utilization-calculator': 'Credit Utilization',
      '/roi-calculator': 'ROI Calculator',
      '/break-even-calculator': 'Break-Even',
      '/markup-calculator': 'Markup Calculator',
      '/cash-flow-calculator': 'Cash Flow',
      '/business-valuation-calculator': 'Business Valuation',
      '/insurance-calculator': 'Insurance Calculator',
      '/401k-vs-roth-ira': '401k vs Roth IRA',
      '/15-vs-30-year-mortgage': '15 vs 30 Year Mortgage',
      '/debt-snowball-vs-avalanche': 'Snowball vs Avalanche',
      '/cd-vs-high-yield-savings': 'CD vs HYSA',
    };

    const calcSection = `
        <div style={{marginTop:32,marginBottom:32,padding:24,borderRadius:16,background:'rgba(240,200,66,0.04)',border:'1px solid rgba(240,200,66,0.15)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f0c842',marginBottom:12,marginTop:0}}>Try These Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
${calcs.map(c => `            <a href="${c}" style={{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600}}>${calcNames[c] || c.replace(/\//g, '').replace(/-/g, ' ')}</a>`).join('\n')}
          </div>
        </div>
`;

    // Insert before Footer
    let insertIdx = content.lastIndexOf('<Footer');
    if (insertIdx === -1) insertIdx = content.lastIndexOf('</main>');
    if (insertIdx === -1) continue;

    content = content.slice(0, insertIdx) + calcSection + '      ' + content.slice(insertIdx);
    fs.writeFileSync(filePath, content, 'utf8');
    calcLinksAdded++;
  }
}
console.log('  ✅ Added calculator links to ' + calcLinksAdded + ' blog posts');

// ============================================================
// STEP 4: Add cross-category links to core calculators
// ============================================================
console.log('--- Step 4: Cross-category links on core calculators ---');

let crossLinksAdded = 0;

for (const [calcSlug, links] of Object.entries(CROSS_LINKS)) {
  const calcDir = path.join(APP, calcSlug);
  if (!fs.existsSync(calcDir)) continue;

  const clientFile = path.join(calcDir, 'PageClient.js');
  if (!fs.existsSync(clientFile)) continue;

  let content = fs.readFileSync(clientFile, 'utf8');
  if (content.includes('Explore More Tools')) continue;

  const calcNames = {
    '/mortgage-calculator': 'Mortgage Calculator',
    '/tax-calculator': 'Tax Calculator',
    '/budget-planner-calculator': 'Budget Planner',
    '/salary-after-tax-calculator': 'Salary After Tax',
    '/net-worth-calculator': 'Net Worth',
    '/15-vs-30-year-mortgage': '15 vs 30 Year Mortgage',
    '/401k-vs-roth-ira': '401k vs Roth IRA',
    '/roth-ira-calculator': 'Roth IRA',
    '/401k-calculator': '401k Calculator',
    '/retirement-calculator': 'Retirement',
    '/retirement-savings-calculator': 'Retirement Savings',
    '/investment-return-calculator': 'Investment Return',
    '/capital-gains-tax-calculator': 'Capital Gains Tax',
    '/self-employment-tax-calculator': 'Self-Employment Tax',
    '/paycheck-calculator': 'Paycheck Calculator',
    '/credit-card-payoff-calculator': 'Credit Card Payoff',
    '/balance-transfer-calculator': 'Balance Transfer',
    '/debt-snowball-vs-avalanche': 'Snowball vs Avalanche',
    '/home-affordability-calculator': 'Home Affordability',
    '/down-payment-calculator': 'Down Payment',
    '/property-tax-calculator': 'Property Tax',
    '/car-affordability-calculator': 'Car Affordability',
    '/insurance-calculator': 'Insurance',
    '/cost-of-living-calculator': 'Cost of Living',
    '/hourly-to-salary-calculator': 'Hourly to Salary',
    '/savings-goal-calculator': 'Savings Goal',
    '/emergency-fund-calculator': 'Emergency Fund',
    '/debt-to-income-calculator': 'Debt-to-Income',
    '/inflation-impact-calculator': 'Inflation Calculator',
    '/debt-consolidation-calculator': 'Debt Consolidation',
    '/loan-comparison-calculator': 'Loan Comparison',
    '/portfolio-growth-calculator': 'Portfolio Growth',
    '/dividend-calculator': 'Dividend Calculator',
    '/cd-calculator': 'CD Calculator',
    '/cd-vs-high-yield-savings': 'CD vs HYSA',
    '/debt-payoff-calculator': 'Debt Payoff',
    '/passive-income-calculator': 'Passive Income',
    '/break-even-calculator': 'Break-Even',
    '/roi-calculator': 'ROI Calculator',
    '/markup-calculator': 'Markup',
    '/cash-flow-calculator': 'Cash Flow',
    '/business-valuation-calculator': 'Business Valuation',
    '/savings-interest-calculator': 'Savings Interest',
    '/refinance-calculator': 'Refinance',
    '/amortization-calculator': 'Amortization',
    '/home-equity-calculator': 'Home Equity',
    '/mortgage-points-calculator': 'Mortgage Points',
    '/raise-calculator': 'Raise Calculator',
    '/freelance-rate-calculator': 'Freelance Rate',
    '/fire-calculator': 'FIRE Calculator',
    '/debt-snowball-calculator': 'Debt Snowball',
    '/debt-avalanche-calculator': 'Debt Avalanche',
    '/rent-vs-buy-calculator': 'Rent vs Buy',
    '/personal-loan-calculator': 'Personal Loan',
    '/student-loan-calculator': 'Student Loan',
  };

  const crossSection = `
        <div style={{marginTop:24,marginBottom:24,padding:20,borderRadius:16,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Explore More Tools</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
${links.map(l => `            <a href="${l}" style={{display:'inline-block',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:13,fontWeight:600}}>${calcNames[l] || l.replace(/\//g,'').replace(/-/g,' ')}</a>`).join('\n')}
          </div>
        </div>
`;

  let insertIdx = content.lastIndexOf('<Footer');
  if (insertIdx === -1) insertIdx = content.lastIndexOf('</main>');
  if (insertIdx === -1) continue;

  content = content.slice(0, insertIdx) + crossSection + '      ' + content.slice(insertIdx);
  fs.writeFileSync(clientFile, content, 'utf8');
  crossLinksAdded++;
}
console.log('  ✅ Added cross-category links to ' + crossLinksAdded + ' core calculators');

// ============================================================
// SUMMARY
// ============================================================
modified = stateLinksAdded + blogLinksAdded + calcLinksAdded + crossLinksAdded;

console.log('');
console.log('=====================================================');
console.log('  INTERNAL LINK WEB — COMPLETE');
console.log('');
console.log('  Cross-state links on state pages:    ' + stateLinksAdded + ' templates');
console.log('    → Each of 250 state pages now links to');
console.log('      4 other state calculator types for same state');
console.log('');
console.log('  Blog links on core calculators:      ' + blogLinksAdded + ' pages');
console.log('    → "Recommended Reading" with 2-3 blog posts');
console.log('');
console.log('  Calculator links on blog posts:      ' + calcLinksAdded + ' posts');
console.log('    → "Try These Calculators" with 3-5 tools');
console.log('');
console.log('  Cross-category links on calculators: ' + crossLinksAdded + ' pages');
console.log('    → "Explore More Tools" linking across categories');
console.log('');
console.log('  Total files modified: ' + modified);
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Build internal link web across all pages"');
console.log('  git push origin master');
console.log('');
