const fs = require('fs');
const path = require('path');

const BASE = 'https://www.freefincalc.net';
let fixed = 0;

// These are static individual folders under home-affordability-calculator/income/
const incomeDir = path.join('app', 'home-affordability-calculator', 'income');

if (!fs.existsSync(incomeDir)) {
  console.log('❌ Directory not found: ' + incomeDir);
  console.log('Listing app/home-affordability-calculator:');
  const parent = path.join('app', 'home-affordability-calculator');
  if (fs.existsSync(parent)) {
    function listDir(d, indent) {
      fs.readdirSync(d, { withFileTypes: true }).slice(0, 10).forEach(e => {
        console.log(indent + e.name);
        if (e.isDirectory()) listDir(path.join(d, e.name), indent + '  ');
      });
    }
    listDir(parent, '  ');
  }
  process.exit(0);
}

// Walk all subdirs and fix each page.js
fs.readdirSync(incomeDir, { withFileTypes: true }).forEach(entry => {
  if (!entry.isDirectory()) return;
  const slug = entry.name;
  const pageFile = path.join(incomeDir, slug, 'page.js');
  if (!fs.existsSync(pageFile)) return;

  let content = fs.readFileSync(pageFile, 'utf8');
  if (content.startsWith("'use client'") || content.startsWith('"use client"')) return;

  const canonicalUrl = BASE + '/home-affordability-calculator/income/' + slug;

  // Remove any existing broken alternates/canonical
  content = content.replace(/\s*alternates:\s*\{[^}]*\},?\n/g, '\n');
  content = content.replace(/export const metadata\s*=\s*\{\s*\};\n?/g, '');

  // Inject alternates into existing metadata or add new one
  if (content.includes('export const metadata')) {
    content = content.replace(
      /export const metadata\s*=\s*\{/,
      "export const metadata = {\n  alternates: { canonical: '" + canonicalUrl + "' },"
    );
  } else if (content.includes('export default')) {
    const meta = "\nexport const metadata = {\n  alternates: { canonical: '" + canonicalUrl + "' },\n};\n";
    content = content.replace(/(export default)/, meta + '\n$1');
  }

  fs.writeFileSync(pageFile, content, 'utf8');
  fixed++;
});

console.log('✅ Fixed ' + fixed + ' home-affordability income pages');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix canonical on home-affordability income pages"');
console.log('  git push origin master');
