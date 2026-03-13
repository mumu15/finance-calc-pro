const https = require('https');

const TESTS = [
  // Static pages
  { url: 'https://www.freefincalc.net/', expected: '/'},
  { url: 'https://www.freefincalc.net/about', expected: '/about'},
  { url: 'https://www.freefincalc.net/mortgage-calculator', expected: '/mortgage-calculator'},
  // Dynamic - one from EVERY batch
  { url: 'https://www.freefincalc.net/mortgage-calculator/new-york', expected: '/mortgage-calculator/new-york'},
  { url: 'https://www.freefincalc.net/mortgage-calculator/state/california', expected: '/mortgage-calculator/state/california'},
  { url: 'https://www.freefincalc.net/mortgage-calculator/price/300000', expected: '/mortgage-calculator/price/300000'},
  { url: 'https://www.freefincalc.net/car-loan-calculator/brand/toyota', expected: '/car-loan-calculator/brand/toyota'},
  { url: 'https://www.freefincalc.net/car-loan-calculator/price/30000', expected: '/car-loan-calculator/price/30000'},
  { url: 'https://www.freefincalc.net/salary-after-tax-calculator/job/nurse', expected: '/salary-after-tax-calculator/job/nurse'},
  { url: 'https://www.freefincalc.net/salary-after-tax/state/texas', expected: '/salary-after-tax/state/texas'},
  { url: 'https://www.freefincalc.net/personal-loan/purpose/wedding', expected: '/personal-loan/purpose/wedding'},
  { url: 'https://www.freefincalc.net/personal-loan-calculator/amount/10000', expected: '/personal-loan-calculator/amount/10000'},
  { url: 'https://www.freefincalc.net/student-loan/major/nursing', expected: '/student-loan/major/nursing'},
  { url: 'https://www.freefincalc.net/student-loan-calculator/amount/50000', expected: '/student-loan-calculator/amount/50000'},
  { url: 'https://www.freefincalc.net/tax-calculator/state/california', expected: '/tax-calculator/state/california'},
  { url: 'https://www.freefincalc.net/savings-goal-calculator/goal/emergency-fund', expected: '/savings-goal-calculator/goal/emergency-fund'},
  { url: 'https://www.freefincalc.net/compound-interest/scenario/sp500-index-fund', expected: '/compound-interest/scenario/sp500-index-fund'},
  { url: 'https://www.freefincalc.net/retirement-calculator/age/30', expected: '/retirement-calculator/age/30'},
  { url: 'https://www.freefincalc.net/budget-calculator/city/chicago', expected: '/budget-calculator/city/chicago'},
  { url: 'https://www.freefincalc.net/investment-return-calculator/asset/bitcoin', expected: '/investment-return-calculator/asset/bitcoin'},
  { url: 'https://www.freefincalc.net/home-affordability-calculator/income/100000', expected: '/home-affordability-calculator/income/100000'},
  { url: 'https://www.freefincalc.net/debt-payoff-calculator/amount/20000', expected: '/debt-payoff-calculator/amount/20000'},
  { url: 'https://www.freefincalc.net/net-worth-calculator/age/35', expected: '/net-worth-calculator/age/35'},
  { url: 'https://www.freefincalc.net/401k-calculator/salary/80000', expected: '/401k-calculator/salary/80000'},
  { url: 'https://www.freefincalc.net/credit-card-payoff-calculator/balance/5000', expected: '/credit-card-payoff-calculator/balance/5000'},
  { url: 'https://www.freefincalc.net/rent-vs-buy-calculator/city/los-angeles', expected: '/rent-vs-buy-calculator/city/los-angeles'},
  { url: 'https://www.freefincalc.net/freelance-rate-calculator/job/web-developer', expected: '/freelance-rate-calculator/job/web-developer'},
  { url: 'https://www.freefincalc.net/break-even-calculator/business/restaurant', expected: '/break-even-calculator/business/restaurant'},
  { url: 'https://www.freefincalc.net/inflation-calculator/year/2020', expected: '/inflation-calculator/year/2020'},
  { url: 'https://www.freefincalc.net/blog/how-to-calculate-mortgage-payment', expected: '/blog/how-to-calculate-mortgage-payment'},
];

function getPage(url) {
  return new Promise((resolve) => {
    let html = '';
    const req = https.get(url, { headers: { 'User-Agent': 'curl/7.0' } }, (res) => {
      if ([301,302,307,308].includes(res.statusCode) && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = 'https://www.freefincalc.net' + loc;
        res.resume();
        return getPage(loc).then(resolve);
      }
      res.on('data', d => { html += d; });
      res.on('end', () => resolve({ html: html.slice(0, 12000), code: res.statusCode }));
    });
    req.on('error', e => resolve({ html: '', code: 0, err: e.message }));
    setTimeout(() => { try { req.destroy(); } catch(e){} resolve({ html: '', code: 0, err: 'timeout' }); }, 8000);
  });
}

(async () => {
  console.log('🔍 Full canonical check — ' + TESTS.length + ' URLs\n' + '─'.repeat(72));
  let ok = 0, wrong = 0, missing = 0;
  for (const test of TESTS) {
    const { html, code, err } = await getPage(test.url);
    if (err) { console.log('🔴 ERROR   ' + test.expected + ' — ' + err); continue; }
    const m = html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
             || html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
    if (!m) {
      console.log('❌ MISSING ' + test.expected + ' (HTTP ' + code + ')');
      missing++;
    } else {
      const found = m[1].trim().replace(/\/$/, '');
      const expectedFull = 'https://freefincalc.net' + test.expected.replace(/\/$/, '');
      const expectedWww  = 'https://www.freefincalc.net' + test.expected.replace(/\/$/, '');
      if (found === expectedFull || found === expectedWww) {
        console.log('✅ OK      ' + test.expected);
        ok++;
      } else {
        console.log('⚠️  WRONG   ' + test.expected);
        console.log('           expected: ' + expectedFull);
        console.log('           found:    ' + found);
        wrong++;
      }
    }
    await new Promise(r => setTimeout(r, 200));
  }
  console.log('\n' + '─'.repeat(72));
  console.log('✅ OK: ' + ok + '  ❌ Missing: ' + missing + '  ⚠️ Wrong: ' + wrong + '  (of ' + TESTS.length + ')');
  if (ok === TESTS.length) console.log('\n🎉 All canonicals perfect! Google duplicate warning will clear in 1-2 weeks.');
  else console.log('\nPaste output to fix remaining issues.');
})();
