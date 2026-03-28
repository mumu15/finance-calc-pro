const fs = require('fs');
const path = require('path');

// This script should be run from each project directory
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// Detect which site we're in
const pkgPath = path.join(__dirname, 'package.json');
const pkg = fs.existsSync(pkgPath) ? fs.readFileSync(pkgPath, 'utf8') : '';
const isFFC = pkg.includes('finance-calc-pro');
const domain = isFFC ? 'https://www.freefincalc.net' : 'https://www.wordcountertool.net';

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
`;

const robotsPath = path.join(publicDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  console.log('robots.txt already exists. Contents:');
  console.log(fs.readFileSync(robotsPath, 'utf8'));
  console.log('---');
  console.log('Overwriting with optimized version...');
}

fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
console.log('Created public/robots.txt for ' + domain);
console.log('');
console.log('Now run: git add . && git commit -m "Add robots.txt" && git push origin master');
