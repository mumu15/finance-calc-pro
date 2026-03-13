const fs = require('fs');

const FILES = [
  'app/retirement-calculator/age/[age]/page.js',
  'app/401k-calculator/salary/[salary]/page.js',
  'app/mortgage-calculator/[city]/page.js',
  'app/personal-loan/purpose/[purpose]/page.js',
  'app/student-loan/major/[major]/page.js',
  'app/investment-return-calculator/asset/[asset]/page.js',
  'app/debt-payoff-calculator/amount/[amount]/page.js',
  'app/home-affordability-calculator/income/[income]/page.js',
];

const BASE = 'https://freefincalc.net';

FILES.forEach(filePath => {
  const winPath = filePath.replace(/\//g, require('path').sep);
  if (!fs.existsSync(winPath)) { console.log('⚠️  NOT FOUND: ' + filePath); return; }

  let content = fs.readFileSync(winPath, 'utf8');

  // Extract param name from path
  const paramMatch = filePath.match(/\[([^\]]+)\]/);
  const paramName = paramMatch ? paramMatch[1] : null;
  if (!paramName) { console.log('⚠️  No param: ' + filePath); return; }

  // Extract route base (remove [param] and page.js)
  const routeBase = filePath
    .replace(/^app\//, '')
    .replace(/\/\[[^\]]+\]\/page\.js$/, '');
  const canonicalBase = BASE + '/' + routeBase + '/';

  console.log('\n📄 ' + filePath);
  console.log('   param: ' + paramName + ', base: ' + canonicalBase);

  // Show current metadata/generateMetadata sections
  const metaMatch = content.match(/export const metadata[\s\S]{0,200}/);
  const genMetaMatch = content.match(/export async function generateMetadata[\s\S]{0,200}/);
  if (metaMatch) console.log('   STATIC META: ' + metaMatch[0].trim().slice(0, 120));
  if (genMetaMatch) console.log('   GEN META:    ' + genMetaMatch[0].trim().slice(0, 120));

  // NUCLEAR CLEAN: remove everything metadata-related
  // Remove static metadata exports
  content = content.replace(/\nexport const metadata\s*=\s*\{[\s\S]*?\n\};\n/g, '\n');
  content = content.replace(/export const metadata\s*=\s*\{[\s\S]*?\};\n/g, '');
  // Remove generateMetadata functions  
  content = content.replace(/\nexport async function generateMetadata\s*\([^)]*\)\s*\{[\s\S]*?\n\}\n/g, '\n');
  content = content.replace(/\nexport function generateMetadata\s*\([^)]*\)\s*\{[\s\S]*?\n\}\n/g, '\n');
  // Remove stray alternates lines
  content = content.replace(/\s*alternates:\s*\{[^\}]*\},?\n/g, '\n');

  // Build clean generateMetadata
  const cleanMeta =
    '\nexport async function generateMetadata({ params }) {\n' +
    '  return {\n' +
    '    alternates: { canonical: `' + canonicalBase + '${params.' + paramName + '}` },\n' +
    '  };\n' +
    '}\n';

  // Insert before default export
  if (content.includes('export default')) {
    content = content.replace(/(\nexport default)/, cleanMeta + '\n$1');
  } else {
    content += cleanMeta;
  }

  fs.writeFileSync(winPath, content, 'utf8');
  console.log('   ✅ FIXED');
});

console.log('\n\nDone. Now run:');
console.log('  git add .');
console.log('  git commit -m "Nuclear fix canonical on retirement/age and 401k/salary + missing batches"');
console.log('  git push origin master');
