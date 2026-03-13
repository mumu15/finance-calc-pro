const fs = require('fs');
const path = require('path');

const BASE = 'https://freefincalc.net';
let updated = 0;
let skipped = 0;

// Check if a file path contains a dynamic segment like [slug]
function isDynamic(filePath) {
  return filePath.includes('[') && filePath.includes(']');
}

// Extract the route pattern and param name from file path
// e.g. app/401k-calculator/salary/[salary]/page.js
//   -> routeBase = '401k-calculator/salary'
//   -> paramName = 'salary'
function getRouteInfo(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  const route = normalized.replace(/^app\//, '').replace(/\/page\.js$/, '');
  // e.g. '401k-calculator/salary/[salary]'
  const parts = route.split('/');
  const dynamicPart = parts.find(p => p.startsWith('[') && p.endsWith(']'));
  const paramName = dynamicPart ? dynamicPart.slice(1, -1) : null;
  const routeBase = parts.filter(p => !p.startsWith('[')).join('/');
  return { route, routeBase, paramName };
}

function fixDynamicPage(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip client components
  if (content.startsWith("'use client'") || content.startsWith('"use client"')) {
    skipped++;
    return;
  }

  const { routeBase, paramName } = getRouteInfo(filePath);
  if (!paramName) { skipped++; return; }

  const canonicalBase = BASE + '/' + routeBase + '/';

  // Remove any existing broken static metadata with literal [param] in canonical
  // Pattern: export const metadata = { alternates: { canonical: '....[param]...' } }
  const brokenPattern = new RegExp(
    'export const metadata\\s*=\\s*\\{\\s*alternates:\\s*\\{\\s*canonical:\\s*[\'"][^\'"]*\\[' + paramName + '\\][^\'"]*[\'"]\\s*\\}\\s*\\};?\\n?',
    'g'
  );
  const hasBroken = brokenPattern.test(content);

  // Reset regex
  const brokenPattern2 = new RegExp(
    'export const metadata\\s*=\\s*\\{\\s*alternates:\\s*\\{\\s*canonical:\\s*[\'"][^\'"]*\\[' + paramName + '\\][^\'"]*[\'"]\\s*\\},?\\s*\\};?\\n?',
    'g'
  );
  content = content.replace(brokenPattern2, '');

  // Also remove if it was injected at top of existing metadata
  const brokenInject = new RegExp(
    'alternates:\\s*\\{\\s*canonical:\\s*[\'"][^\'"]*\\[' + paramName + '\\][^\'"]*[\'"]\\s*\\},?\\n?\\s*',
    'g'
  );
  content = content.replace(brokenInject, '');

  // Now check if generateMetadata already exists with correct canonical
  if (content.includes('generateMetadata') && content.includes('alternates') && content.includes(paramName)) {
    skipped++;
    return;
  }

  // Remove any existing broken generateMetadata that doesn't have canonical
  // We'll add a fresh correct one

  // Check if there's already a generateMetadata function
  if (content.includes('export async function generateMetadata') || content.includes('export function generateMetadata')) {
    // Add alternates to existing generateMetadata return
    if (!content.includes('alternates')) {
      content = content.replace(
        /(return\s*\{)/,
        '$1\n    alternates: { canonical: `' + canonicalBase + '${params.' + paramName + '}` },'
      );
      fs.writeFileSync(filePath, content, 'utf8');
      updated++;
      console.log('✅ [generateMetadata+canonical] ' + filePath);
      return;
    }
    skipped++;
    return;
  }

  // Add generateMetadata function before the default export
  const generateMetadataBlock =
    '\nexport async function generateMetadata({ params }) {\n' +
    '  return {\n' +
    '    alternates: { canonical: `' + canonicalBase + '${params.' + paramName + '}` },\n' +
    '  };\n' +
    '}\n';

  if (content.includes('export default')) {
    content = content.replace(
      /(export default)/,
      generateMetadataBlock + '\n$1'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log('✅ [new generateMetadata] ' + filePath);
    return;
  }

  skipped++;
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') return;
      walkDir(fullPath);
    } else if (entry.name === 'page.js' && isDynamic(fullPath)) {
      fixDynamicPage(fullPath);
    }
  });
}

console.log('🔧 Fixing canonical tags on all dynamic route pages...\n');
walkDir('app');

console.log('\n─────────────────────────────────────');
console.log('✅ Fixed: ' + updated + ' dynamic pages');
console.log('⏭  Skipped: ' + skipped + ' pages');
console.log('─────────────────────────────────────');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix canonical tags on dynamic routes — use generateMetadata with params"');
console.log('  git push origin master');
