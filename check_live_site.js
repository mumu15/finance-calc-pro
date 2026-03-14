const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ============================================================
// LIVE SITE CHECKER — Tests all pages for 404s & issues
// ============================================================

const DOMAIN = 'https://www.freefincalc.net';
const MAX_CONCURRENT = 5;
const TIMEOUT = 15000;

// Results tracking
const results = {
  ok: [],
  redirect: [],
  notFound: [],
  serverError: [],
  timeout: [],
  other: [],
};

let checked = 0;
let total = 0;

// Build the full URL list from sitemap data
function buildUrlList() {
  const APP = path.join(__dirname, 'app');
  
  // Read sitemap.js to get all URLs
  const smFile = path.join(APP, 'sitemap.js');
  if (!fs.existsSync(smFile)) {
    console.log('❌ Cannot find app/sitemap.js');
    process.exit(1);
  }
  
  const smContent = fs.readFileSync(smFile, 'utf8');
  const urlMatches = smContent.match(/"url":\s*"([^"]+)"/g);
  
  if (!urlMatches) {
    console.log('❌ No URLs found in sitemap.js');
    process.exit(1);
  }
  
  const urls = urlMatches.map(m => m.match(/"url":\s*"([^"]+)"/)[1]);
  return urls;
}

// Check a single URL
function checkUrl(urlPath) {
  return new Promise((resolve) => {
    const fullUrl = DOMAIN + urlPath;
    const startTime = Date.now();
    
    const req = https.get(fullUrl, { timeout: TIMEOUT }, (res) => {
      const elapsed = Date.now() - startTime;
      const status = res.statusCode;
      
      // Consume the response body
      res.resume();
      
      const entry = { url: urlPath, status, elapsed };
      
      if (status >= 200 && status < 300) {
        results.ok.push(entry);
      } else if (status >= 300 && status < 400) {
        entry.location = res.headers.location || 'unknown';
        results.redirect.push(entry);
      } else if (status === 404) {
        results.notFound.push(entry);
      } else if (status >= 500) {
        results.serverError.push(entry);
      } else {
        results.other.push(entry);
      }
      
      checked++;
      const pct = Math.round(checked / total * 100);
      process.stdout.write(`\r  Checking: ${checked}/${total} (${pct}%) — ${urlPath.substring(0, 50).padEnd(50)}`);
      
      resolve();
    });
    
    req.on('timeout', () => {
      req.destroy();
      results.timeout.push({ url: urlPath, status: 'TIMEOUT', elapsed: TIMEOUT });
      checked++;
      resolve();
    });
    
    req.on('error', (err) => {
      results.other.push({ url: urlPath, status: 'ERROR', error: err.message });
      checked++;
      resolve();
    });
  });
}

// Process URLs with concurrency limit
async function processUrls(urls) {
  const queue = [...urls];
  const workers = [];
  
  for (let i = 0; i < MAX_CONCURRENT; i++) {
    workers.push((async () => {
      while (queue.length > 0) {
        const url = queue.shift();
        await checkUrl(url);
      }
    })());
  }
  
  await Promise.all(workers);
}

// Main
async function main() {
  console.log('');
  console.log('==========================================================');
  console.log('  LIVE SITE CHECKER — freefincalc.net');
  console.log('==========================================================');
  console.log('');
  
  const urls = buildUrlList();
  total = urls.length;
  
  console.log(`  📍 Testing ${total} URLs from sitemap.js`);
  console.log(`  🌐 Domain: ${DOMAIN}`);
  console.log(`  ⚡ Concurrent requests: ${MAX_CONCURRENT}`);
  console.log(`  ⏱️  Timeout: ${TIMEOUT / 1000}s per page`);
  console.log('');
  
  const startTime = Date.now();
  await processUrls(urls);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('\n');
  console.log('==========================================================');
  console.log('  RESULTS');
  console.log('==========================================================');
  console.log('');
  console.log(`  ✅ OK (200):         ${results.ok.length}`);
  console.log(`  ↪️  Redirects (3xx):  ${results.redirect.length}`);
  console.log(`  ❌ Not Found (404):  ${results.notFound.length}`);
  console.log(`  💥 Server Error (5xx): ${results.serverError.length}`);
  console.log(`  ⏱️  Timeouts:         ${results.timeout.length}`);
  console.log(`  ⚠️  Other:            ${results.other.length}`);
  console.log(`  ⏱️  Total time:       ${elapsed}s`);
  console.log('');
  
  // Show 404s
  if (results.notFound.length > 0) {
    console.log('==========================================================');
    console.log('  ❌ 404 NOT FOUND PAGES — THESE NEED FIXING');
    console.log('==========================================================');
    console.log('');
    results.notFound.forEach(r => {
      console.log(`  → ${DOMAIN}${r.url}`);
    });
    console.log('');
  }
  
  // Show server errors
  if (results.serverError.length > 0) {
    console.log('==========================================================');
    console.log('  💥 SERVER ERRORS (500) — BROKEN PAGES');
    console.log('==========================================================');
    console.log('');
    results.serverError.forEach(r => {
      console.log(`  → ${DOMAIN}${r.url} (${r.status})`);
    });
    console.log('');
  }
  
  // Show redirects
  if (results.redirect.length > 0) {
    console.log('==========================================================');
    console.log('  ↪️  REDIRECTS — Review these');
    console.log('==========================================================');
    console.log('');
    results.redirect.slice(0, 30).forEach(r => {
      console.log(`  → ${r.url} → ${r.location} (${r.status})`);
    });
    if (results.redirect.length > 30) console.log(`  ... and ${results.redirect.length - 30} more`);
    console.log('');
  }
  
  // Show timeouts
  if (results.timeout.length > 0) {
    console.log('==========================================================');
    console.log('  ⏱️  TIMEOUTS — Slow pages');
    console.log('==========================================================');
    console.log('');
    results.timeout.forEach(r => {
      console.log(`  → ${r.url}`);
    });
    console.log('');
  }
  
  // Show slow pages (over 3 seconds)
  const slowPages = results.ok.filter(r => r.elapsed > 3000);
  if (slowPages.length > 0) {
    console.log('==========================================================');
    console.log('  🐌 SLOW PAGES (over 3 seconds) — May hurt SEO');
    console.log('==========================================================');
    console.log('');
    slowPages.sort((a, b) => b.elapsed - a.elapsed).slice(0, 20).forEach(r => {
      console.log(`  → ${r.url} (${(r.elapsed / 1000).toFixed(1)}s)`);
    });
    console.log('');
  }
  
  // Average load time
  const avgTime = results.ok.length > 0
    ? (results.ok.reduce((a, r) => a + r.elapsed, 0) / results.ok.length / 1000).toFixed(2)
    : 'N/A';
  
  console.log('==========================================================');
  console.log('  PERFORMANCE SUMMARY');
  console.log('==========================================================');
  console.log('');
  console.log(`  Average page load:    ${avgTime}s`);
  console.log(`  Fastest page:         ${results.ok.length > 0 ? (Math.min(...results.ok.map(r => r.elapsed)) / 1000).toFixed(2) + 's' : 'N/A'}`);
  console.log(`  Slowest page:         ${results.ok.length > 0 ? (Math.max(...results.ok.map(r => r.elapsed)) / 1000).toFixed(2) + 's' : 'N/A'}`);
  console.log('');
  
  // AdSense readiness check
  console.log('==========================================================');
  console.log('  ADSENSE READINESS CHECK');
  console.log('==========================================================');
  console.log('');
  
  const adsenseChecks = [];
  
  // 1. No 404s
  if (results.notFound.length === 0) {
    adsenseChecks.push({ pass: true, msg: 'No 404 pages — all URLs resolve' });
  } else {
    adsenseChecks.push({ pass: false, msg: `${results.notFound.length} pages return 404 — fix these before applying` });
  }
  
  // 2. No server errors
  if (results.serverError.length === 0) {
    adsenseChecks.push({ pass: true, msg: 'No server errors — site is stable' });
  } else {
    adsenseChecks.push({ pass: false, msg: `${results.serverError.length} server errors — critical issue` });
  }
  
  // 3. Page count
  const livePages = results.ok.length + results.redirect.length;
  if (livePages >= 50) {
    adsenseChecks.push({ pass: true, msg: `${livePages} live pages — well above AdSense minimum` });
  } else {
    adsenseChecks.push({ pass: false, msg: `Only ${livePages} live pages — need more content` });
  }
  
  // 4. Speed
  if (parseFloat(avgTime) < 3) {
    adsenseChecks.push({ pass: true, msg: `Average load ${avgTime}s — fast enough for ads` });
  } else {
    adsenseChecks.push({ pass: false, msg: `Average load ${avgTime}s — too slow, ads may not load well` });
  }
  
  // 5. Timeouts
  if (results.timeout.length === 0) {
    adsenseChecks.push({ pass: true, msg: 'No timeouts — all pages respond' });
  } else {
    adsenseChecks.push({ pass: false, msg: `${results.timeout.length} pages timed out — investigate` });
  }
  
  // 6. Redirect ratio
  const redirectPct = (results.redirect.length / total * 100).toFixed(1);
  if (results.redirect.length < total * 0.1) {
    adsenseChecks.push({ pass: true, msg: `Redirect ratio ${redirectPct}% — acceptable` });
  } else {
    adsenseChecks.push({ pass: false, msg: `Redirect ratio ${redirectPct}% — too many redirects, clean up sitemap` });
  }
  
  adsenseChecks.forEach(c => {
    console.log(`  ${c.pass ? '✅' : '❌'} ${c.msg}`);
  });
  
  const passCount = adsenseChecks.filter(c => c.pass).length;
  console.log('');
  console.log(`  SCORE: ${passCount}/${adsenseChecks.length} checks passed`);
  
  if (passCount === adsenseChecks.length) {
    console.log('  🎉 YOUR SITE IS READY FOR ADSENSE!');
  } else {
    console.log('  ⚠️  Fix the issues above before applying for AdSense');
  }
  
  console.log('');
  
  // Save full report
  const reportFile = path.join(__dirname, 'site_check_report.txt');
  let report = `SITE CHECK REPORT — ${new Date().toISOString()}\n`;
  report += `Domain: ${DOMAIN}\n`;
  report += `Total URLs: ${total}\n\n`;
  report += `OK: ${results.ok.length}\n`;
  report += `Redirects: ${results.redirect.length}\n`;
  report += `404s: ${results.notFound.length}\n`;
  report += `500s: ${results.serverError.length}\n`;
  report += `Timeouts: ${results.timeout.length}\n\n`;
  
  if (results.notFound.length > 0) {
    report += `--- 404 PAGES ---\n`;
    results.notFound.forEach(r => report += `${DOMAIN}${r.url}\n`);
    report += '\n';
  }
  if (results.serverError.length > 0) {
    report += `--- SERVER ERRORS ---\n`;
    results.serverError.forEach(r => report += `${DOMAIN}${r.url} (${r.status})\n`);
    report += '\n';
  }
  if (results.redirect.length > 0) {
    report += `--- REDIRECTS ---\n`;
    results.redirect.forEach(r => report += `${r.url} → ${r.location}\n`);
    report += '\n';
  }
  
  fs.writeFileSync(reportFile, report, 'utf8');
  console.log(`  📄 Full report saved to: site_check_report.txt`);
  console.log('');
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
