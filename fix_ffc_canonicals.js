const fs = require('fs');
const path = require('path');

const BASE = 'https://freefincalc.net';
let updated = 0;
let skipped = 0;

// Convert file path to canonical URL
function getCanonicalUrl(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  // Remove leading 'app/' and trailing '/page.js'
  let route = normalized.replace(/^app\//, '').replace(/\/page\.js$/, '');
  // Root page
  if (route === 'page.js' || route === '') return BASE + '/';
  return BASE + '/' + route;
}

function fixPageFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip 'use client' files — they can't export metadata
  if (content.startsWith("'use client'") || content.startsWith('"use client"')) {
    skipped++;
    return;
  }

  const canonicalUrl = getCanonicalUrl(filePath);

  // Case 1: Already has alternates canonical — skip
  if (content.includes('alternates') && content.includes('canonical')) {
    skipped++;
    return;
  }

  // Case 2: Has existing metadata export — inject alternates into it
  if (content.includes('export const metadata') || content.includes('export async function generateMetadata')) {

    // For static metadata object, add alternates field
    if (content.includes('export const metadata')) {
      // Find the metadata object and add alternates before the closing brace
      // Pattern: find the metadata export and insert alternates
      const metadataMatch = content.match(/export const metadata\s*=\s*\{/);
      if (metadataMatch) {
        // Check if it already has alternates
        if (!content.includes('alternates')) {
          content = content.replace(
            /export const metadata\s*=\s*\{/,
            'export const metadata = {\n  alternates: { canonical: \'' + canonicalUrl + '\' },'
          );
          fs.writeFileSync(filePath, content, 'utf8');
          updated++;
          console.log('✅ [metadata inject] ' + filePath);
          return;
        }
      }
    }

    // For generateMetadata function — wrap with canonical added
    if (content.includes('export async function generateMetadata') || content.includes('export function generateMetadata')) {
      if (!content.includes('alternates')) {
        // Add alternates to the return statement in generateMetadata
        content = content.replace(
          /(return\s*\{)/,
          '$1\n    alternates: { canonical: \'' + canonicalUrl + '\' },'
        );
        fs.writeFileSync(filePath, content, 'utf8');
        updated++;
        console.log('✅ [generateMetadata inject] ' + filePath);
        return;
      }
    }

    skipped++;
    return;
  }

  // Case 3: No metadata at all — add it before the default export
  // Find the title from the file if possible
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/) ||
                     content.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'FreeFinCalc — Free Financial Calculators';

  const metadataBlock = '\nexport const metadata = {\n  alternates: { canonical: \'' + canonicalUrl + '\' },\n};\n';

  // Insert before default export
  if (content.includes('export default')) {
    content = content.replace(
      /(export default)/,
      metadataBlock + '\n$1'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log('✅ [new metadata] ' + filePath);
    return;
  }

  skipped++;
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules and .next
      if (entry.name === 'node_modules' || entry.name === '.next') return;
      walkDir(fullPath);
    } else if (entry.name === 'page.js') {
      fixPageFile(fullPath);
    }
  });
}

console.log('🔧 Adding canonical tags to all page.js files...\n');
walkDir('app');

console.log('\n─────────────────────────────────────');
console.log('✅ Updated: ' + updated + ' pages');
console.log('⏭  Skipped: ' + skipped + ' pages (client components or already done)');
console.log('─────────────────────────────────────');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Add canonical metadata to all pages — fix duplicate content warning"');
console.log('  git push origin master');
console.log('\nAfter deploy, re-run the canonical checker to verify all pages show ✅');
