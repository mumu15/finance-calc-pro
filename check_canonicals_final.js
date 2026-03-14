const https = require('https');

const TESTS = [
  { url: 'https://freefincalc.net/', expected: '/'},
  { url: 'https://freefincalc.net/about', expected: '/about'},
  { url: 'https://freefincalc.net/mortgage-calculator', expected: '/mortgage-calculator'},
  { url: 'https://freefincalc.net/mortgage-calculator/new-york', expected: '/mortgage-calculator/new-york'},
  { url: 'https://freefincalc.net/mortgage-calculator/state/california', expected: '/mortgage-calculator/state/california'},
  { url: 'https://freefincalc.net/mortgage-calculator/price/price-300000', expected: '/mortgage-calculator/price/price-300000'},
  { url: 'https://freefincalc.net/car-loan-calculator/brand/toyota', expected: '/car-loan-calculator/brand/toyota'},
  { url: 'https://freefincalc.net/car-loan-calculator/price/car-10000', expected: '/car-loan-calculator/price/car-10000'},
  { url: 'https://freefincalc.net/salary-after-tax-calculator/job/nurse', expected: '/salary-after-tax-calculator/job/nurse'},
  { url: 'https://freefincalc.net/salary-after-tax/state/texas', expected: '/salary-after-tax/state/texas'},
  { url: 'https://freefincalc.net/personal-loan/purpose/wedding', expected: '/personal-loan/purpose/wedding'},
  { url: 'https://freefincalc.net/personal-loan-calculator/amount/loan-1000', expected: '/personal-loan-calculator/amount/loan-1000'},
  { url: 'https://freefincalc.net/student-loan/major/nursing', expected: '/student-loan/major/nursing'},
  { url: 'https://freefincalc.net/student-loan-calculator/amount/loan-5000', expected: '/student-loan-calculator/amount/loan-5000'},
  { url: 'https://freefincalc.net/tax-calculator/state/california', expected: '/tax-calculator/state/california'},
  { url: 'https://freefincalc.net/savings-goal-calculator/goal/emergency-fund', expected: '/savings-goal-calculator/goal/emergency-fund'},
  { url: 'https://freefincalc.net/compound-interest/scenario/10000-invested-10-years', expected: '/compound-interest/scenario/10000-invested-10-years'},
  { url: 'https://freefincalc.net/retirement-calculator/age/age-22', expected: '/retirement-calculator/age/age-22'},
  { url: 'https://freefincalc.net/budget-calculator/city/chicago', expected: '/budget-calculator/city/chicago'},
  { url: 'https://freefincalc.net/investment-return-calculator/asset/bitcoin', expected: '/investment-return-calculator/asset/bitcoin'},
  { url: 'https://freefincalc.net/home-affordability-calculator/income/100000', expected: '/home-affordability-calculator/income/100000'},
  { url: 'https://freefincalc.net/debt-payoff-calculator/amount/20000', expected: '/debt-payoff-calculator/amount/20000'},
  { url: 'https://freefincalc.net/net-worth-calculator/age/age-20', expected: '/net-worth-calculator/age/age-20'},
  { url: 'https://freefincalc.net/401k-calculator/salary/salary-30000', expected: '/401k-calculator/salary/salary-30000'},
  { url: 'https://freefincalc.net/credit-card-payoff-calculator/balance/balance-500', expected: '/credit-card-payoff-calculator/balance/balance-500'},
  { url: 'https://freefincalc.net/rent-vs-buy-calculator/city/los-angeles', expected: '/rent-vs-buy-calculator/city/los-angeles'},
  { url: 'https://freefincalc.net/freelance-rate-calculator/job/software-developer', expected: '/freelance-rate-calculator/job/software-developer'},
  { url: 'https://freefincalc.net/break-even-calculator/business/restaurant', expected: '/break-even-calculator/business/restaurant'},
  { url: 'https://freefincalc.net/inflation-calculator/year/year-1970', expected: '/inflation-calculator/year/year-1970'},
  { url: 'https://freefincalc.net/blog/how-to-calculate-mortgage-payment', expected: '/blog/how-to-calculate-mortgage-payment'},
];

function getPage(url) {
  return new Promise((resolve) => {
    let html = '';
    const req = https.get(url, { headers: { 'User-Agent': 'curl/7.0' } }, (res) => {
      if ([301,302,307,308].includes(res.statusCode) && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = 'https://freefincalc.net' + loc;
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
    if (code === 404) { console.log('❌ 404     ' + test.expected); missing++; continue; }
    const m = html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
             || html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
    if (!m) {
      console.log('❌ NO TAG  ' + test.expected + ' (HTTP ' + code + ')');
      missing++;
    } else {
      const found = m[1].trim().replace(/\/$/, '');
      const expFull = 'https://freefincalc.net' + test.expected.replace(/\/$/, '');
      const expWww  = 'https://freefincalc.net' + test.expected.replace(/\/$/, '');
      if (found === expFull || found === expWww) {
        console.log('✅ OK      ' + test.expected);
        ok++;
      } else {
        console.log('⚠️  WRONG   ' + test.expected);
        console.log('           expected: ' + expFull);
        console.log('           found:    ' + found);
        wrong++;
      }
    }
    await new Promise(r => setTimeout(r, 200));
  }
  console.log('\n' + '─'.repeat(72));
  console.log('✅ OK: ' + ok + '  ❌ Missing/NoTag: ' + missing + '  ⚠️ Wrong: ' + wrong + '  (of ' + TESTS.length + ')');
  if (ok === TESTS.length) console.log('\n🎉 All canonicals perfect!');
  else console.log('\nPaste output to fix remaining issues.');
})();
