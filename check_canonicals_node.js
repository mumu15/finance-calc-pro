const https = require('https');

const BASE = 'https://www.freefincalc.net';

// Test a sample from each section to verify canonicals are working
const TEST_URLS = [
  // Static pages
  '/',
  '/about',
  '/blog',
  '/privacy-policy',
  // Base calculators
  '/mortgage-calculator',
  '/car-loan-calculator',
  '/401k-calculator',
  '/retirement-calculator',
  // Dynamic routes - one from each batch
  '/mortgage-calculator/new-york',
  '/mortgage-calculator/state/california',
  '/mortgage-calculator/price/300000',
  '/car-loan-calculator/brand/toyota',
  '/car-loan-calculator/price/30000',
  '/salary-after-tax-calculator/job/software-engineer',
  '/salary-after-tax/state/texas',
  '/personal-loan/purpose/wedding',
  '/personal-loan-calculator/amount/10000',
  '/student-loan/major/computer-science',
  '/student-loan-calculator/amount/50000',
  '/tax-calculator/state/new-york',
  '/savings-goal-calculator/goal/emergency-fund',
  '/compound-interest/scenario/sp500-index-fund',
  '/retirement-calculator/age/30',
  '/budget-calculator/city/chicago',
  '/investment-return-calculator/asset/bitcoin',
  '/home-affordability-calculator/income/100000',
  '/debt-payoff-calculator/amount/20000',
  '/net-worth-calculator/age/35',
  '/401k-calculator/salary/80000',
  '/credit-card-payoff-calculator/balance/5000',
  '/rent-vs-buy-calculator/city/los-angeles',
  '/freelance-rate-calculator/job/web-developer',
  '/break-even-calculator/business/restaurant',
  '/inflation-calculator/year/2020',
  // Blog
  '/blog/how-to-calculate-mortgage-payment',
];

function fetchPage(url) {
  return new Promise((resolve) => {
    const fullUrl = BASE + url;
    const req = https.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (canonical-checker)' } }, (res) => {
      // Follow redirect
      if (res.statusCode === 301 || res.statusCode === 302) {
        resolve({ url, status: 'redirect', canonical: null, code: res.statusCode });
        return;
      }
      let html = '';
      res.on('data', chunk => { html += chunk; if (html.length > 8000) req.destroy(); });
      res.on('end', () => {
        const match = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
                    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
        if (!match) {
          resolve({ url, status: 'MISSING', canonical: null, code: res.statusCode });
        } else {
          const found = match[1].trim().replace(/\/$/, '');
          const expected = (BASE + url).replace(/\/$/, '');
          if (found === expected) {
            resolve({ url, status: 'OK', canonical: found, code: res.statusCode });
          } else {
            resolve({ url, status: 'WRONG', canonical: found, code: res.statusCode });
          }
        }
      });
    });
    req.on('error', (e) => resolve({ url, status: 'ERROR', canonical: e.message, code: 0 }));
    req.on('close', () => {});
    setTimeout(() => { req.destroy(); resolve({ url, status: 'TIMEOUT', canonical: null, code: 0 }); }, 10000);
  });
}

async function runCheck() {
  console.log('🔍 Checking canonical tags on FreeFinCalc.net...\n');
  console.log('─'.repeat(80));

  let ok = 0, missing = 0, wrong = 0, errors = 0;

  for (const url of TEST_URLS) {
    const result = await fetchPage(url);
    if (result.status === 'OK') {
      console.log('✅ OK      ' + url);
      ok++;
    } else if (result.status === 'MISSING') {
      console.log('❌ MISSING ' + url + '  (HTTP ' + result.code + ')');
      missing++;
    } else if (result.status === 'WRONG') {
      console.log('⚠️  WRONG   ' + url);
      console.log('          Expected: ' + BASE + url);
      console.log('          Found:    ' + result.canonical);
      wrong++;
    } else {
      console.log('🔴 ' + result.status + '   ' + url + ' — ' + (result.canonical || ''));
      errors++;
    }
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n' + '─'.repeat(80));
  console.log('RESULTS:');
  console.log('  ✅ OK:      ' + ok + ' / ' + TEST_URLS.length);
  console.log('  ❌ Missing: ' + missing);
  console.log('  ⚠️  Wrong:   ' + wrong);
  console.log('  🔴 Errors:  ' + errors);
  console.log('─'.repeat(80));

  if (missing === 0 && wrong === 0) {
    console.log('\n🎉 All canonicals are correct! Google Search Console warning will clear within 1-2 weeks.');
  } else if (missing > 0 || wrong > 0) {
    console.log('\n⚠️  Some pages still have issues. Share this output and we will fix them.');
  }
}

runCheck();
