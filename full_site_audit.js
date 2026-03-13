const https = require('https');

// Sample URLs covering every route type — one from each batch
const TEST_URLS = [
  // Static core
  { url: 'https://www.freefincalc.net/', label: 'Homepage' },
  { url: 'https://www.freefincalc.net/mortgage-calculator', label: 'Mortgage base' },
  { url: 'https://www.freefincalc.net/about', label: 'About' },
  { url: 'https://www.freefincalc.net/blog', label: 'Blog index' },
  { url: 'https://www.freefincalc.net/blog/how-to-calculate-mortgage-payment', label: 'Blog post' },
  // Dynamic batch samples
  { url: 'https://www.freefincalc.net/mortgage-calculator/new-york', label: 'Mortgage/city' },
  { url: 'https://www.freefincalc.net/mortgage-calculator/state/california', label: 'Mortgage/state' },
  { url: 'https://www.freefincalc.net/mortgage-calculator/price/price-300000', label: 'Mortgage/price' },
  { url: 'https://www.freefincalc.net/car-loan-calculator/brand/toyota', label: 'Car/brand' },
  { url: 'https://www.freefincalc.net/car-loan-calculator/price/car-10000', label: 'Car/price' },
  { url: 'https://www.freefincalc.net/salary-after-tax-calculator/job/nurse', label: 'Salary/job' },
  { url: 'https://www.freefincalc.net/salary-after-tax/state/texas', label: 'Salary/state' },
  { url: 'https://www.freefincalc.net/personal-loan/purpose/wedding', label: 'PersonalLoan/purpose' },
  { url: 'https://www.freefincalc.net/personal-loan-calculator/amount/loan-1000', label: 'PersonalLoan/amount' },
  { url: 'https://www.freefincalc.net/student-loan/major/nursing', label: 'StudentLoan/major' },
  { url: 'https://www.freefincalc.net/student-loan-calculator/amount/loan-5000', label: 'StudentLoan/amount' },
  { url: 'https://www.freefincalc.net/tax-calculator/state/california', label: 'Tax/state' },
  { url: 'https://www.freefincalc.net/savings-goal-calculator/goal/emergency-fund', label: 'Savings/goal' },
  { url: 'https://www.freefincalc.net/compound-interest/scenario/10000-invested-10-years', label: 'Compound/scenario' },
  { url: 'https://www.freefincalc.net/retirement-calculator/age/age-22', label: 'Retirement/age' },
  { url: 'https://www.freefincalc.net/budget-calculator/city/chicago', label: 'Budget/city' },
  { url: 'https://www.freefincalc.net/investment-return-calculator/asset/bitcoin', label: 'Investment/asset' },
  { url: 'https://www.freefincalc.net/home-affordability-calculator/income/100000', label: 'HomeAfford/income' },
  { url: 'https://www.freefincalc.net/debt-payoff-calculator/amount/20000', label: 'DebtPayoff/amount' },
  { url: 'https://www.freefincalc.net/net-worth-calculator/age/age-20', label: 'NetWorth/age' },
  { url: 'https://www.freefincalc.net/401k-calculator/salary/salary-30000', label: '401k/salary' },
  { url: 'https://www.freefincalc.net/credit-card-payoff-calculator/balance/balance-500', label: 'CC/balance' },
  { url: 'https://www.freefincalc.net/rent-vs-buy-calculator/city/los-angeles', label: 'RentVsBuy/city' },
  { url: 'https://www.freefincalc.net/freelance-rate-calculator/job/software-developer', label: 'Freelance/job' },
  { url: 'https://www.freefincalc.net/break-even-calculator/business/restaurant', label: 'BreakEven/business' },
  { url: 'https://www.freefincalc.net/inflation-calculator/year/year-1970', label: 'Inflation/year' },
];

const ADSENSE_PUB = 'ca-pub-8934829211507329';
const ADSENSE_SLOTS = ['7405024590', '3248634657'];

function getPage(url) {
  return new Promise((resolve) => {
    let html = '';
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if ([301,302,307,308].includes(res.statusCode) && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = 'https://www.freefincalc.net' + loc;
        res.resume();
        return getPage(loc).then(resolve);
      }
      res.on('data', d => { html += d; });
      res.on('end', () => resolve({ html, code: res.statusCode }));
    });
    req.on('error', e => resolve({ html: '', code: 0, err: e.message }));
    setTimeout(() => { try{req.destroy()}catch(e){} resolve({ html: '', code: 0, err: 'timeout' }); }, 10000);
  });
}

function audit(html, url) {
  const issues = [];
  const passes = [];

  // 1. HTTP 200
  // (checked before calling this)

  // 2. Title tag
  const titleM = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleM) {
    const t = titleM[1].trim();
    if (t.length < 10) issues.push('Title too short: ' + t);
    else if (t.length > 80) issues.push('Title too long (' + t.length + ' chars)');
    else passes.push('Title: ' + t.slice(0, 60));
  } else {
    issues.push('NO TITLE TAG');
  }

  // 3. Meta description
  const descM = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
              || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
  if (descM) {
    const d = descM[1].trim();
    if (d.length < 50) issues.push('Description too short: ' + d.slice(0,50));
    else passes.push('Description OK (' + d.length + ' chars)');
  } else {
    issues.push('NO META DESCRIPTION');
  }

  // 4. Canonical tag
  const canonM = html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
               || html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  if (canonM) passes.push('Canonical: ' + canonM[1].slice(0,60));
  else issues.push('NO CANONICAL TAG');

  // 5. H1 tag
  const h1M = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1M) passes.push('H1: ' + h1M[1].trim().slice(0,50));
  else issues.push('NO H1 TAG');

  // 6. AdSense publisher ID
  if (html.includes(ADSENSE_PUB)) passes.push('AdSense pub ID present');
  else issues.push('ADSENSE PUB ID MISSING (' + ADSENSE_PUB + ')');

  // 7. AdSense ad slots
  const foundSlots = ADSENSE_SLOTS.filter(s => html.includes(s));
  if (foundSlots.length > 0) passes.push('AdSense slots: ' + foundSlots.join(', '));
  else issues.push('NO ADSENSE AD SLOTS FOUND');

  // 8. Schema markup
  if (html.includes('"@type"')) passes.push('Schema JSON-LD present');
  else issues.push('NO SCHEMA MARKUP');

  // 9. Viewport meta (mobile)
  if (html.includes('viewport')) passes.push('Viewport meta OK');
  else issues.push('NO VIEWPORT META');

  // 10. No noindex
  if (html.match(/content=["'][^"']*noindex/i)) issues.push('⛔ NOINDEX FOUND — Google will NOT index this page');
  else passes.push('No noindex');

  // 11. robots meta
  const robotsM = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
  if (robotsM) passes.push('Robots: ' + robotsM[1]);

  // 12. Content length (thin content check)
  const bodyText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (bodyText.length < 500) issues.push('THIN CONTENT — page has very little text (' + bodyText.length + ' chars)');
  else passes.push('Content length OK (' + bodyText.length + ' chars)');

  return { issues, passes };
}

(async () => {
  console.log('🔍 Full Site Audit — AdSense + SEO\n' + '═'.repeat(72));
  
  let totalIssues = 0;
  let totalPasses = 0;
  const problemPages = [];

  for (const test of TEST_URLS) {
    const { html, code, err } = await getPage(test.url);
    
    if (err || code !== 200) {
      console.log('\n🔴 [' + code + '] ' + test.label);
      console.log('   ERROR: ' + (err || 'HTTP ' + code));
      problemPages.push({ label: test.label, url: test.url, issues: ['HTTP ' + code] });
      totalIssues++;
      continue;
    }

    const { issues, passes } = audit(html, test.url);
    totalPasses += passes.length;
    totalIssues += issues.length;

    if (issues.length === 0) {
      console.log('✅ ' + test.label);
    } else {
      console.log('\n⚠️  ' + test.label + ' — ' + issues.length + ' issue(s)');
      issues.forEach(i => console.log('   ❌ ' + i));
      passes.forEach(p => console.log('   ✓  ' + p));
      problemPages.push({ label: test.label, url: test.url, issues });
    }

    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n' + '═'.repeat(72));
  console.log('SUMMARY');
  console.log('═'.repeat(72));
  console.log('Pages checked: ' + TEST_URLS.length);
  console.log('Total passes:  ' + totalPasses);
  console.log('Total issues:  ' + totalIssues);

  if (problemPages.length === 0) {
    console.log('\n🎉 All pages perfect — ready for maximum AdSense revenue!');
  } else {
    console.log('\n⚠️  Pages with issues (' + problemPages.length + '):');
    problemPages.forEach(p => {
      console.log('  • ' + p.label + ': ' + p.issues.join(', '));
    });
  }
})();
