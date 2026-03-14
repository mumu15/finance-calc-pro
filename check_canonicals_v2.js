const https = require('https');
const http = require('http');

const TEST_URLS = [
  '/','/about','/blog','/privacy-policy',
  '/mortgage-calculator','/car-loan-calculator','/401k-calculator','/retirement-calculator',
  '/mortgage-calculator/new-york','/mortgage-calculator/state/california','/mortgage-calculator/price/300000',
  '/car-loan-calculator/brand/toyota','/salary-after-tax-calculator/job/software-engineer',
  '/personal-loan/purpose/wedding','/student-loan/major/computer-science',
  '/tax-calculator/state/new-york','/retirement-calculator/age/30',
  '/budget-calculator/city/chicago','/debt-payoff-calculator/amount/20000',
  '/401k-calculator/salary/80000','/freelance-rate-calculator/job/web-developer',
  '/inflation-calculator/year/2020','/blog/how-to-calculate-mortgage-payment',
];

// Fetch with redirect following (up to 5 hops)
function fetchWithRedirects(url, hops = 0) {
  return new Promise((resolve) => {
    if (hops > 5) return resolve({ html: '', finalUrl: url, code: 0 });
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 12000 }, (res) => {
      const code = res.statusCode;
      if ((code === 301 || code === 302 || code === 307 || code === 308) && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) {
          const u = new URL(url);
          loc = u.protocol + '//' + u.host + loc;
        }
        res.resume();
        return resolve(fetchWithRedirects(loc, hops + 1));
      }
      let html = '';
      res.on('data', chunk => { html += chunk; if (html.length > 12000) req.destroy(); });
      res.on('end', () => resolve({ html, finalUrl: url, code }));
    });
    req.on('error', (e) => resolve({ html: '', finalUrl: url, code: 0, err: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ html: '', finalUrl: url, code: 0, err: 'timeout' }); });
  });
}

async function checkUrl(urlPath) {
  const startUrl = 'https://www.freefincalc.net' + urlPath;
  const { html, finalUrl, code, err } = await fetchWithRedirects(startUrl);

  if (err || !html) return { urlPath, status: 'ERROR', msg: err || 'no html', finalUrl, code };

  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
              || html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);

  if (!match) return { urlPath, status: 'MISSING', finalUrl, code };

  const found = match[1].trim().replace(/\/$/, '');
  // Accept canonical pointing to either www or non-www version of the same path
  const pathOnly = urlPath.replace(/\/$/, '');
  if (found.endsWith(pathOnly) || found === finalUrl.replace(/\/$/, '')) {
    return { urlPath, status: 'OK', canonical: found, finalUrl, code };
  }
  return { urlPath, status: 'WRONG', canonical: found, finalUrl, code };
}

async function run() {
  console.log('🔍 Checking canonicals (following redirects)...\n' + '─'.repeat(72));
  let ok = 0, missing = 0, wrong = 0, errors = 0;
  for (const urlPath of TEST_URLS) {
    const r = await checkUrl(urlPath);
    const finalNote = r.finalUrl && !r.finalUrl.includes(urlPath.replace(/\/$/, '')) ? ' → ' + r.finalUrl : '';
    if (r.status === 'OK')      { console.log('✅ OK      ' + urlPath + (r.canonical ? '  [' + r.canonical + ']' : '')); ok++; }
    else if (r.status === 'MISSING') { console.log('❌ MISSING ' + urlPath + finalNote + ' (HTTP ' + r.code + ')'); missing++; }
    else if (r.status === 'WRONG')   { console.log('⚠️  WRONG   ' + urlPath + '\n           Found:    ' + r.canonical + '\n           FinalURL: ' + r.finalUrl); wrong++; }
    else { console.log('🔴 ERROR   ' + urlPath + ' — ' + r.msg); errors++; }
    await new Promise(res => setTimeout(res, 150));
  }
  console.log('\n' + '─'.repeat(72));
  console.log('✅ OK: ' + ok + '  ❌ Missing: ' + missing + '  ⚠️ Wrong: ' + wrong + '  🔴 Errors: ' + errors + '  (of ' + TEST_URLS.length + ' tested)');
  if (missing === 0 && wrong === 0 && errors === 0) console.log('\n🎉 All canonicals are correct!');
  else console.log('\nPaste this output to fix remaining issues.');
}

run();
