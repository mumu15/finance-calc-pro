const https = require('https');
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.freefincalc.net';
const MAX_CONCURRENT = 5;
const TIMEOUT = 15000;

const results = { ok: [], redirect: [], notFound: [], serverError: [], timeout: [], other: [] };
let checked = 0;
let total = 0;

function buildUrlList() {
  const smFile = path.join(__dirname, 'app', 'sitemap.js');
  if (!fs.existsSync(smFile)) { console.log('Cannot find app/sitemap.js'); process.exit(1); }
  const smContent = fs.readFileSync(smFile, 'utf8');
  const matches = smContent.match(/url:\s*"([^"]+)"/g);
  if (!matches || matches.length === 0) { console.log('No URLs found'); process.exit(1); }
  return matches.map(m => m.match(/url:\s*"([^"]+)"/)[1]);
}

function checkUrl(urlPath) {
  return new Promise((resolve) => {
    const fullUrl = DOMAIN + urlPath;
    const startTime = Date.now();
    const req = https.get(fullUrl, { timeout: TIMEOUT }, (res) => {
      const elapsed = Date.now() - startTime;
      const status = res.statusCode;
      res.resume();
      const entry = { url: urlPath, status, elapsed };
      if (status >= 200 && status < 300) results.ok.push(entry);
      else if (status >= 300 && status < 400) { entry.location = res.headers.location || '?'; results.redirect.push(entry); }
      else if (status === 404) results.notFound.push(entry);
      else if (status >= 500) results.serverError.push(entry);
      else results.other.push(entry);
      checked++;
      process.stdout.write('\r  Checking: ' + checked + '/' + total + ' (' + Math.round(checked/total*100) + '%)');
      resolve();
    });
    req.on('timeout', () => { req.destroy(); results.timeout.push({ url: urlPath }); checked++; resolve(); });
    req.on('error', () => { results.other.push({ url: urlPath }); checked++; resolve(); });
  });
}

async function processUrls(urls) {
  const queue = [...urls];
  const workers = [];
  for (let i = 0; i < MAX_CONCURRENT; i++) {
    workers.push((async () => { while (queue.length > 0) { await checkUrl(queue.shift()); } })());
  }
  await Promise.all(workers);
}

async function main() {
  console.log('');
  console.log('==========================================================');
  console.log('  LIVE SITE CHECKER v3 — www.freefincalc.net');
  console.log('==========================================================');
  console.log('');
  const urls = buildUrlList();
  total = urls.length;
  console.log('  Testing ' + total + ' URLs');
  console.log('  Domain: ' + DOMAIN);
  console.log('');
  const start = Date.now();
  await processUrls(urls);
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log('\n');
  console.log('==========================================================');
  console.log('  RESULTS');
  console.log('==========================================================');
  console.log('');
  console.log('  OK (200):         ' + results.ok.length);
  console.log('  Redirects (3xx):  ' + results.redirect.length);
  console.log('  Not Found (404):  ' + results.notFound.length);
  console.log('  Server Error:     ' + results.serverError.length);
  console.log('  Timeouts:         ' + results.timeout.length);
  console.log('  Total time:       ' + elapsed + 's');
  console.log('');
  if (results.notFound.length > 0) {
    console.log('  404 PAGES:');
    results.notFound.slice(0, 30).forEach(r => console.log('    ' + DOMAIN + r.url));
    if (results.notFound.length > 30) console.log('    ... and ' + (results.notFound.length - 30) + ' more');
    console.log('');
  }
  if (results.redirect.length > 0) {
    console.log('  REDIRECTS:');
    results.redirect.slice(0, 10).forEach(r => console.log('    ' + r.url + ' -> ' + r.location));
    if (results.redirect.length > 10) console.log('    ... and ' + (results.redirect.length - 10) + ' more');
    console.log('');
  }
  const avgTime = results.ok.length > 0 ? (results.ok.reduce((a, r) => a + r.elapsed, 0) / results.ok.length / 1000).toFixed(2) : 'N/A';
  console.log('==========================================================');
  console.log('  ADSENSE READINESS CHECK');
  console.log('==========================================================');
  console.log('');
  const checks = [];
  checks.push({ pass: results.notFound.length === 0, msg: results.notFound.length === 0 ? 'No 404 pages' : results.notFound.length + ' pages return 404' });
  checks.push({ pass: results.serverError.length === 0, msg: results.serverError.length === 0 ? 'No server errors' : results.serverError.length + ' server errors' });
  checks.push({ pass: results.ok.length >= 50, msg: results.ok.length + ' live pages (200 OK)' });
  checks.push({ pass: avgTime !== 'N/A' && parseFloat(avgTime) < 3, msg: 'Average load: ' + avgTime + 's' });
  checks.push({ pass: results.timeout.length === 0, msg: results.timeout.length === 0 ? 'No timeouts' : results.timeout.length + ' timeouts' });
  checks.push({ pass: results.redirect.length < total * 0.1, msg: 'Redirect ratio: ' + (results.redirect.length / total * 100).toFixed(1) + '%' });
  checks.forEach(c => console.log('  ' + (c.pass ? 'PASS' : 'FAIL') + ' ' + c.msg));
  const passCount = checks.filter(c => c.pass).length;
  console.log('');
  console.log('  SCORE: ' + passCount + '/' + checks.length);
  console.log(passCount === checks.length ? '  YOUR SITE IS READY FOR ADSENSE!' : '  Fix issues above before applying');
  console.log('');
}

main().catch(err => { console.error(err); process.exit(1); });
