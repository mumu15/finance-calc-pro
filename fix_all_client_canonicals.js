const fs = require('fs');
const path = require('path');

// All dynamic routes where page.js is 'use client' and needs splitting
const ROUTES = [
  { dir: 'app/mortgage-calculator/price/[price]',                    param: 'price',    base: 'mortgage-calculator/price' },
  { dir: 'app/car-loan-calculator/price/[price]',                    param: 'price',    base: 'car-loan-calculator/price' },
  { dir: 'app/personal-loan-calculator/amount/[amount]',             param: 'amount',   base: 'personal-loan-calculator/amount' },
  { dir: 'app/student-loan-calculator/amount/[amount]',              param: 'amount',   base: 'student-loan-calculator/amount' },
  { dir: 'app/compound-interest/scenario/[scenario]',                param: 'scenario', base: 'compound-interest/scenario' },
  { dir: 'app/retirement-calculator/age/[age]',                      param: 'age',      base: 'retirement-calculator/age' },
  { dir: 'app/home-affordability-calculator/income/[income]',        param: 'income',   base: 'home-affordability-calculator/income' },
  { dir: 'app/net-worth-calculator/age/[age]',                       param: 'age',      base: 'net-worth-calculator/age' },
  { dir: 'app/401k-calculator/salary/[salary]',                      param: 'salary',   base: '401k-calculator/salary' },
  { dir: 'app/credit-card-payoff-calculator/balance/[balance]',      param: 'balance',  base: 'credit-card-payoff-calculator/balance' },
  { dir: 'app/freelance-rate-calculator/job/[job]',                  param: 'job',      base: 'freelance-rate-calculator/job' },
  { dir: 'app/inflation-calculator/year/[year]',                     param: 'year',     base: 'inflation-calculator/year' },
];

let fixed = 0;

ROUTES.forEach(({ dir, param, base }) => {
  const winDir = dir.replace(/\//g, path.sep);
  const pageFile = path.join(winDir, 'page.js');
  const clientFile = path.join(winDir, 'Client.js');

  if (!fs.existsSync(pageFile)) {
    console.log('⚠️  NOT FOUND: ' + pageFile);
    return;
  }

  let pageContent = fs.readFileSync(pageFile, 'utf8');
  const isClient = pageContent.startsWith("'use client'") || pageContent.startsWith('"use client"');

  if (!isClient) {
    // Already a server component — just ensure generateMetadata uses params correctly
    // Remove old broken generateMetadata and re-add clean one
    pageContent = pageContent.replace(/\nexport async function generateMetadata[\s\S]*?\n\}\n/g, '\n');
    pageContent = pageContent.replace(/\nexport function generateMetadata[\s\S]*?\n\}\n/g, '\n');
    const genMeta =
      '\nexport async function generateMetadata({ params }) {\n' +
      '  return {\n' +
      '    alternates: { canonical: `https://freefincalc.net/' + base + '/${params.' + param + '}` },\n' +
      '  };\n' +
      '}\n';
    pageContent = pageContent.replace(/(export default)/, genMeta + '\n$1');
    fs.writeFileSync(pageFile, pageContent, 'utf8');
    console.log('✅ [server fix] ' + dir);
    fixed++;
    return;
  }

  // It's a 'use client' file — need to split
  // Step 1: Save current page.js as Client.js (if Client.js doesn't already exist)
  if (!fs.existsSync(clientFile)) {
    fs.writeFileSync(clientFile, pageContent, 'utf8');
    console.log('   📋 Saved Client.js: ' + dir);
  } else {
    console.log('   📋 Client.js already exists: ' + dir);
  }

  // Step 2: Extract component name from the file
  const compMatch = pageContent.match(/export default function (\w+)/);
  const compName = compMatch ? compMatch[1] : 'PageClient';

  // Step 3: Extract generateStaticParams if it exists in the client file
  // (we'll recreate it in the server file)
  const gsMatch = pageContent.match(/export(?:\s+async)?\s+function\s+generateStaticParams\s*\(\s*\)\s*\{[\s\S]*?\n\}/);

  // Step 4: Create clean server page.js
  let newPage =
    "import " + compName + " from './Client';\n\n";

  if (gsMatch) {
    newPage += gsMatch[0] + '\n\n';
  }

  newPage +=
    "export async function generateMetadata({ params }) {\n" +
    "  return {\n" +
    "    alternates: { canonical: `https://freefincalc.net/" + base + "/${params." + param + "}` },\n" +
    "  };\n" +
    "}\n\n" +
    "export default function Page({ params }) {\n" +
    "  return <" + compName + " params={params} />;\n" +
    "}\n";

  fs.writeFileSync(pageFile, newPage, 'utf8');
  console.log('✅ [split fix]  ' + dir);
  fixed++;
});

console.log('\n─────────────────────────────────────────');
console.log('✅ Fixed: ' + fixed + ' routes');
console.log('─────────────────────────────────────────');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix canonical on all dynamic client routes — split to server+client"');
console.log('  git push origin master');
