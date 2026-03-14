const https = require('https');

// Site redirects freefincalc.net → www.freefincalc.net, so check www directly
const BASE = 'https://www.freefincalc.net';

const TEST_URLS = [
  '/','/about','/blog','/privacy-policy',
  '/mortgage-calculator','/car-loan-calculator','/401k-calculator','/retirement-calculator',
  '/mortgage-calculator/new-york','/mortgage-calculator/state/california','/mortgage-calculator/price/300000',
  '/car-loan-calculator/brand/toyota','/car-loan-calculator/price/30000',
  '/salary-after-tax-calculator/job/software-engineer','/salary-after-tax/state/texas',
  '/personal-loan/purpose/wedding','/personal-loan-calculator/amount/10000',
  '/student-loan/major/computer-science','/student-loan-calculator/amount/50000',
  '/tax-calculator/state/new-york','/savings-goal-calculator/goal/emergency-fund',
  '/compound-interest/scenario/sp500-index-fund','/retirement-calculator/age/30',
  '/budget-calculator/city/chicago','/investment-return-calculator/asset/bitcoin',
  '/home-affordability-calculator/income/100000','/debt-payoff-calculator/amount/20000',
  '/net-worth-calculator/age/35','/401k-calculator/salary/80000',
  '/credit-card-payoff-calculator/balance/5000','/rent-vs-buy-calculator/city/los-angeles',
  '/freelance-rate-calculator/job/web-developer','/break-even-calculator/business/restaurant',
  '/inflation-calculator/year/2020','/blog/how-to-calculate-mortgage-payment',
];

function fetchPage(urlPath) {
  return new Promise((resolve) => {
    const req = https.get(BASE + urlPath, { headers: { 'User-Agent': 'Mozilla/5.0 (canonical-checker)' }, timeout: 10000 }, (res) => {
      let html = '';
      res.on('data', chunk => { html += chunk; if (html.length > 10000) req.destroy(); });
      res.on('end', () => {
        const code = res.statusCode;
        const match = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
                    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
        if (!match) {
          resolve({ urlPath, status: 'MISSING', canonical: null, code });
        } else {
          const found = match[1].trim().replace(/\/$/, '');
          const expectedWww = (BASE + urlPath).replace(/\/$/, '');
          const expectedNonWww = ('https://www.freefincalc.net' + urlPath).replace(/\/$/, '');
          if (found === expectedWww || found === expectedNonWww) {
            resolve({ urlPath, status: 'OK', canonical: found, code });
          } else {
            resolve({ urlPath, status: 'WRONG', canonical: found, code });
          }
        }
      });
    });
    req.on('error', (e) => resolve({ urlPath, status: 'ERROR', canonical: e.message, code: 0 }));
    req.on('timeout', () => { req.destroy(); resolve({ urlPath, status: 'TIMEOUT', canonical: null, code: 0 }); });
  });
}

async function runCheck() {
  console.log('🔍 Checking canonicals on ' + BASE + '\n' + '─'.repeat(70));
  let ok = 0, missing = 0, wrong = 0, errors = 0;
  for (const urlPath of TEST_URLS) {
    const r = await fetchPage(urlPath);
    if (r.status === 'OK')      { console.log('✅ OK      ' + urlPath); ok++; }
    else if (r.status === 'MISSING') { console.log('❌ MISSING ' + urlPath + ' (HTTP ' + r.code + ')'); missing++; }
    else if (r.status === 'WRONG')   { console.log('⚠️  WRONG   ' + urlPath + '\n           Found: ' + r.canonical); wrong++; }
    else                             { console.log('🔴 ' + r.status + ' ' + urlPath); errors++; }
    await new Promise(res => setTimeout(res, 200));
  }
  console.log('\n' + '─'.repeat(70));
  console.log('✅ OK: ' + ok + '  ❌ Missing: ' + missing + '  ⚠️  Wrong: ' + wrong + '  🔴 Errors: ' + errors);
  if (missing === 0 && wrong === 0 && errors === 0) {
    console.log('\n🎉 All canonicals correct! But note: your site uses www — make sure');
    console.log('   canonical metadata uses https://www.freefincalc.net not https://www.freefincalc.net');
  } else {
    console.log('\n⚠️  Paste this output to fix remaining issues.');
  }
}

runCheck();
