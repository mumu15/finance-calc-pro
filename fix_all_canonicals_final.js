const fs = require('fs');
const path = require('path');

const BASE = 'https://www.freefincalc.net';
let fixed = 0, skipped = 0;

function getParamName(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  const match = normalized.match(/\[([^\]]+)\]/);
  return match ? match[1] : null;
}

function getRouteBase(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  let route = normalized.replace(/^app\//, '').replace(/\/page\.js$/, '');
  // Remove the [param] segment
  route = route.replace(/\/\[[^\]]+\]$/, '');
  return route;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip client components
  if (content.startsWith("'use client'") || content.startsWith('"use client"')) {
    skipped++;
    return;
  }

  const paramName = getParamName(filePath);
  if (!paramName) { skipped++; return; }

  const routeBase = getRouteBase(filePath);
  const canonicalBase = BASE + '/' + routeBase + '/';

  // Step 1: Remove ALL existing static metadata exports that have alternates/canonical
  // This fixes the conflict where static metadata overrides generateMetadata
  content = content.replace(/export const metadata\s*=\s*\{[^}]*alternates[^}]*\}[^}]*\};?\n?/gs, '');
  // Also remove bare alternates injected into existing metadata
  content = content.replace(/\s*alternates:\s*\{\s*canonical:\s*[`'"][^`'"]*[`'"]\s*\},?\n?/g, '');

  // Step 2: Remove any existing generateMetadata (we'll add a clean one)
  content = content.replace(/export async function generateMetadata[\s\S]*?\n\}\n/g, '');
  content = content.replace(/export function generateMetadata[\s\S]*?\n\}\n/g, '');

  // Step 3: Build the correct generateMetadata block
  const genMeta =
    '\nexport async function generateMetadata({ params }) {\n' +
    '  return {\n' +
    '    alternates: { canonical: `' + canonicalBase + '${params.' + paramName + '}` },\n' +
    '  };\n' +
    '}\n';

  // Step 4: Insert before default export
  if (content.includes('export default')) {
    content = content.replace(/(export default)/, genMeta + '\n$1');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ ' + filePath);
    fixed++;
    return;
  }

  // Append at end if no default export found
  content += genMeta;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ [appended] ' + filePath);
  fixed++;
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') return;
      walkDir(fullPath);
    } else if (entry.name === 'page.js' && fullPath.includes('[')) {
      fixFile(fullPath);
    }
  });
}

console.log('🔧 Fixing ALL dynamic route canonicals...\n');
walkDir('app');
console.log('\n─────────────────────────────────────────');
console.log('✅ Fixed:   ' + fixed + ' dynamic page files');
console.log('⏭  Skipped: ' + skipped + ' (client components)');
console.log('─────────────────────────────────────────');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix all dynamic route canonicals — clean generateMetadata on all pages"');
console.log('  git push origin master');
