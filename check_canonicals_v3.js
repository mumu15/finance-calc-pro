const https = require('https');
const http = require('http');

const TEST_URLS = [
  'https://freefincalc.net/',
  'https://freefincalc.net/about',
  'https://freefincalc.net/mortgage-calculator',
  'https://freefincalc.net/mortgage-calculator/new-york',
  'https://freefincalc.net/retirement-calculator/age/30',
  'https://freefincalc.net/401k-calculator/salary/80000',
  'https://freefincalc.net/personal-loan/purpose/wedding',
  'https://freefincalc.net/blog/how-to-calculate-mortgage-payment',
];

function getPage(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    let html = '';
    const req = lib.get(url, { headers: { 'User-Agent': 'curl/7.0' } }, (res) => {
      if ([301,302,307,308].includes(res.statusCode) && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = 'https://freefincalc.net' + loc;
        res.resume();
        return getPage(loc).then(resolve);
      }
      res.on('data', d => { html += d; });
      res.on('end', () => resolve({ html: html.slice(0, 15000), code: res.statusCode, url }));
    });
    req.on('error', e => resolve({ html: '', code: 0, url, err: e.message }));
    setTimeout(() => { try { req.destroy(); } catch(e) {} resolve({ html: '', code: 0, url, err: 'timeout' }); }, 8000);
  });
}

(async () => {
  console.log('Checking ' + TEST_URLS.length + ' URLs...\n');
  for (const url of TEST_URLS) {
    try {
      const { html, code, err } = await getPage(url);
      if (err) { console.log('ERROR: ' + url + ' — ' + err); continue; }
      const m = html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
             || html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
      if (m) {
        console.log('OK:      ' + url.replace('https://freefincalc.net',''));
        console.log('         canonical -> ' + m[1]);
      } else {
        console.log('MISSING: ' + url.replace('https://freefincalc.net','') + ' (HTTP ' + code + ')');
        // Show first 500 chars of head to debug
        const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
        if (head) console.log('         HEAD preview: ' + head[1].replace(/\s+/g,' ').slice(0,300));
      }
      console.log('');
    } catch(e) {
      console.log('EXCEPTION: ' + url + ' — ' + e.message);
    }
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('Done.');
})();
