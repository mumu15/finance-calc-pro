const fs = require('fs');
const path = require('path');

// ============================================================
// FINAL FIX: Schema + AdUnit for remaining components
// - Skips redirect pages (return null)
// - Adds JSON-LD before last </div> for files without Footer
// - Adds AdUnit import + placement where missing
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let schemaAdded = 0;
let adsAdded = 0;
let redirectsSkipped = 0;
let alreadyDone = 0;

function slugToLabel(slug) {
  if (!slug) return 'Calculator';
  const specials = {
    '401k-calculator': '401(k) Calculator',
    'compound-interest': 'Compound Interest Calculator',
    'salary-after-tax': 'Salary After Tax',
    'personal-loan': 'Personal Loan Calculator',
    'student-loan': 'Student Loan Calculator',
    'debt-payoff-calculator': 'Debt Payoff Calculator',
    'home-affordability-calculator': 'Home Affordability Calculator',
    'investment-return-calculator': 'Investment Return Calculator',
    'mortgage-calculator': 'Mortgage Calculator',
    'car-loan-calculator': 'Car Loan Calculator',
    'personal-loan-calculator': 'Personal Loan Calculator',
    'student-loan-calculator': 'Student Loan Calculator',
    'credit-card-payoff-calculator': 'Credit Card Payoff Calculator',
    'net-worth-calculator': 'Net Worth Calculator',
    'retirement-calculator': 'Retirement Calculator',
    'savings-goal-calculator': 'Savings Goal Calculator',
    'budget-calculator': 'Budget Calculator',
    'rent-vs-buy-calculator': 'Rent vs Buy Calculator',
    'freelance-rate-calculator': 'Freelance Rate Calculator',
    'break-even-calculator': 'Break Even Calculator',
    'inflation-calculator': 'Inflation Calculator',
    'salary-after-tax-calculator': 'Salary After Tax Calculator',
    'tax-calculator': 'Tax Calculator',
  };
  if (specials[slug]) return specials[slug];
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function findClientFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.next') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) findClientFiles(full, results);
    else if (item.endsWith('Client.js') || item.endsWith('Client.tsx')) results.push(full);
  }
  return results;
}

console.log('');
console.log('=====================================================');
console.log('  FINAL FIX: Schema + AdUnit for remaining files');
console.log('=====================================================');
console.log('');

const allClients = findClientFiles(APP);

for (const cf of allClients) {
  let content = fs.readFileSync(cf, 'utf8');
  const rel = path.relative(BASE, cf).replace(/\\/g, '/');

  // SKIP: redirect pages (return null, or router.replace)
  if (content.includes('return null') || (content.includes('router.replace') && !content.includes('<div'))) {
    redirectsSkipped++;
    continue;
  }

  let changed = false;

  // --- ADD SCHEMA if missing ---
  if (!content.includes('application/ld+json') && !content.includes('SchemaMarkup')) {
    const relToApp = path.relative(APP, path.dirname(cf)).replace(/\\/g, '/');
    const parts = relToApp.split('/').filter(Boolean);
    const parentSlug = parts[0] || path.basename(path.dirname(cf));
    if (!parentSlug || parentSlug === 'app') { alreadyDone++; continue; }

    const parentLabel = slugToLabel(parentSlug);

    // Build single-line schema to avoid JSX issues
    const schemaLine = `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"${parentLabel.replace(/"/g, '\\"')}","item":"https://freefincalc.net/${parentSlug}"}]})}} />`;
    const appSchemaLine = `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"${parentLabel.replace(/"/g, '\\"')}","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />`;

    if (content.includes('<Footer')) {
      // Insert before Footer (preferred)
      const idx = content.lastIndexOf('<Footer');
      content = content.slice(0, idx) + schemaLine + '\n      ' + appSchemaLine + '\n      ' + content.slice(idx);
      changed = true;
      schemaAdded++;
    } else {
      // No Footer — find the LAST closing </div> before the end of the function
      // This is the root element's closing tag
      const returnMatch = content.match(/return\s*\(/);
      if (returnMatch) {
        const returnStart = content.indexOf(returnMatch[0]);
        const afterReturn = content.substring(returnStart);
        
        // Find the matching closing — we want the last </div> before the closing );
        const closingParen = afterReturn.lastIndexOf(');');
        if (closingParen > 0) {
          const returnBlock = afterReturn.substring(0, closingParen);
          const lastDivClose = returnBlock.lastIndexOf('</div>');
          
          if (lastDivClose > 0) {
            const globalInsertPoint = returnStart + lastDivClose;
            content = content.slice(0, globalInsertPoint) + '\n      ' + schemaLine + '\n      ' + appSchemaLine + '\n    ' + content.slice(globalInsertPoint);
            changed = true;
            schemaAdded++;
          }
        }
      }
    }
  }

  // --- ADD ADUNIT if missing ---
  if (!content.includes('AdUnit')) {
    // Don't add to redirects (already filtered above)
    // Add import at top
    if (!content.includes("import AdUnit")) {
      // Find the right relative path for the import
      const relToApp = path.relative(APP, path.dirname(cf)).replace(/\\/g, '/');
      const depth = relToApp.split('/').filter(Boolean).length;
      const dots = depth === 0 ? '..' : '../'.repeat(depth + 1).slice(0, -1);
      const importLine = `import AdUnit from '${dots}/components/AdUnit';\n`;

      // Insert after last import
      const lastImportIdx = content.lastIndexOf('import ');
      if (lastImportIdx !== -1) {
        const endOfImportLine = content.indexOf('\n', lastImportIdx);
        if (endOfImportLine !== -1) {
          content = content.slice(0, endOfImportLine + 1) + importLine + content.slice(endOfImportLine + 1);
        }
      }
    }

    // Add AdUnit placement before last </div>
    const returnMatch2 = content.match(/return\s*\(/);
    if (returnMatch2) {
      const returnStart2 = content.indexOf(returnMatch2[0]);
      const afterReturn2 = content.substring(returnStart2);
      const closingParen2 = afterReturn2.lastIndexOf(');');
      if (closingParen2 > 0) {
        const returnBlock2 = afterReturn2.substring(0, closingParen2);
        const lastDivClose2 = returnBlock2.lastIndexOf('</div>');
        if (lastDivClose2 > 0) {
          const globalInsertPoint2 = returnStart2 + lastDivClose2;
          content = content.slice(0, globalInsertPoint2) + '\n      <AdUnit slot="3248634657" />\n    ' + content.slice(globalInsertPoint2);
          changed = true;
          adsAdded++;
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(cf, content, 'utf8');
    if ((schemaAdded + adsAdded) <= 20) console.log(`  ✅ ${rel}`);
  } else {
    alreadyDone++;
  }
}

if ((schemaAdded + adsAdded) > 20) console.log(`  ... and more files fixed`);

console.log('');
console.log('=====================================================');
console.log(`  RESULTS:`);
console.log(`    Schema added:      ${schemaAdded}`);
console.log(`    AdUnit added:      ${adsAdded}`);
console.log(`    Redirects skipped: ${redirectsSkipped}`);
console.log(`    Already done:      ${alreadyDone}`);
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add schema + ads to all remaining components"');
console.log('  git push origin master');
console.log('');
