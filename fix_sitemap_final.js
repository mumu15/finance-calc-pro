const fs = require('fs');
let c = fs.readFileSync('app/sitemap.js', 'utf8');

// Extract all URL paths from the file
const urls = [];
const regex = /url:\s*(?:base\s*\+\s*)?["']([^"']*?)["']/g;
let m;
while ((m = regex.exec(c)) !== null) {
  let path = m[1];
  // Remove any full domain that leaked in
  path = path.replace('https://www.freefincalc.net', '');
  if (!path.startsWith('/')) path = '/' + path;
  // Avoid empty or duplicate
  if (path && !urls.includes(path)) urls.push(path);
}

console.log('Extracted', urls.length, 'unique URLs');

// Rebuild sitemap from scratch
const domain = 'https://www.freefincalc.net';
const lines = [];
lines.push('export default function sitemap() {');
lines.push('  const today = new Date().toISOString().split("T")[0];');
lines.push('  return [');

urls.forEach((path, i) => {
  const priority = path === '/' ? 1 : 
    path.includes('/data') || path.includes('/salary-data') || path.includes('/financial-data') ? 0.8 :
    path.includes('/blog/') ? 0.7 :
    path.includes('/cost-of-living-calculator/state/') ? 0.8 :
    path.includes('/mortgage-calculator/') ? 0.8 : 0.9;
  const freq = priority >= 0.9 ? 'weekly' : 'monthly';
  const comma = i < urls.length - 1 ? ',' : '';
  lines.push('    { url: "' + domain + path + '", lastModified: today, changeFrequency: "' + freq + '", priority: ' + priority + ' }' + comma);
});

lines.push('  ];');
lines.push('}');

fs.writeFileSync('app/sitemap.js', lines.join('\n'), 'utf8');
console.log('Rebuilt sitemap.js with', urls.length, 'URLs');
console.log('First:', domain + urls[0]);
console.log('Last:', domain + urls[urls.length - 1]);

// Validate
const test = new Function(lines.join('\n').replace('export default function sitemap()','return function sitemap()'));
const result = test()();
console.log('Validation: ' + result.length + ' URLs');
console.log('Sample:', result[0].url);
const bad = result.filter(u => u.url.includes('netnttps') || u.url.includes('nethttps') || !u.url.startsWith('https://'));
console.log('Bad URLs:', bad.length);
