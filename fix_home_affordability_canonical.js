const fs = require('fs');
const path = require('path');

const winDir = path.join('app', 'home-affordability-calculator', 'income', '[income]');
const pageFile = path.join(winDir, 'page.js');
const clientFile = path.join(winDir, 'Client.js');

console.log('Looking for: ' + pageFile);
console.log('Exists: ' + fs.existsSync(pageFile));

// Also check what's actually in the directory
const parentDir = path.join('app', 'home-affordability-calculator');
if (fs.existsSync(parentDir)) {
  console.log('\nContents of app/home-affordability-calculator:');
  function listDir(d, indent) {
    fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
      console.log(indent + e.name);
      if (e.isDirectory()) listDir(path.join(d, e.name), indent + '  ');
    });
  }
  listDir(parentDir, '  ');
}

if (!fs.existsSync(pageFile)) {
  console.log('\n⚠️  page.js not found — checking alternate paths...');
  process.exit(0);
}

let pageContent = fs.readFileSync(pageFile, 'utf8');
const isClient = pageContent.startsWith("'use client'") || pageContent.startsWith('"use client"');
console.log('\nIs use client: ' + isClient);

// Remove old generateMetadata
pageContent = pageContent.replace(/\nexport async function generateMetadata[\s\S]*?\n\}\n/g, '\n');
pageContent = pageContent.replace(/\nexport function generateMetadata[\s\S]*?\n\}\n/g, '\n');
// Remove stray alternates
pageContent = pageContent.replace(/\s*alternates:\s*\{[^\}]*\},?\n/g, '\n');

if (isClient) {
  // Save as Client.js
  if (!fs.existsSync(clientFile)) {
    fs.writeFileSync(clientFile, pageContent, 'utf8');
    console.log('✅ Saved Client.js');
  }
  const compMatch = pageContent.match(/export default function (\w+)/);
  const compName = compMatch ? compMatch[1] : 'PageClient';
  const gsMatch = pageContent.match(/export(?:\s+async)?\s+function\s+generateStaticParams\s*\(\s*\)\s*\{[\s\S]*?\n\}/);
  let newPage = "import " + compName + " from './Client';\n\n";
  if (gsMatch) newPage += gsMatch[0] + '\n\n';
  newPage +=
    "export async function generateMetadata({ params }) {\n" +
    "  return {\n" +
    "    alternates: { canonical: `https://www.freefincalc.net/home-affordability-calculator/income/${params.income}` },\n" +
    "  };\n" +
    "}\n\n" +
    "export default function Page({ params }) {\n" +
    "  return <" + compName + " params={params} />;\n" +
    "}\n";
  fs.writeFileSync(pageFile, newPage, 'utf8');
  console.log('✅ Created server page.js');
} else {
  const genMeta =
    '\nexport async function generateMetadata({ params }) {\n' +
    '  return {\n' +
    '    alternates: { canonical: `https://www.freefincalc.net/home-affordability-calculator/income/${params.income}` },\n' +
    '  };\n' +
    '}\n';
  pageContent = pageContent.replace(/(export default)/, genMeta + '\n$1');
  fs.writeFileSync(pageFile, pageContent, 'utf8');
  console.log('✅ Added generateMetadata to server page.js');
}

console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix home-affordability canonical"');
console.log('  git push origin master');
