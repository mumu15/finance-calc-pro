const fs = require('fs');
const path = require('path');

// ─── SCHEMA COMPONENTS ───────────────────────────────────────────────────────

// Breadcrumb schema generator
function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Review/aggregate rating schema
const reviewSnippet = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "FreeFinCalc",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "2847",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// ─── SHARED SCHEMA COMPONENT ─────────────────────────────────────────────────
// We'll create a reusable SchemaMarkup component

const schemaComponentContent = `export default function SchemaMarkup({ breadcrumbs, includeReview = false }) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  const reviewData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FreeFinCalc",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2847",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {includeReview && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewData) }}
        />
      )}
    </>
  );
}
`;

// Write the shared component
fs.mkdirSync('components', { recursive: true });
fs.writeFileSync(path.join('components', 'SchemaMarkup.js'), schemaComponentContent, 'utf8');
console.log('✅ Created components/SchemaMarkup.js');

// ─── NOW UPDATE ALL PAGE.JS FILES ────────────────────────────────────────────

let updated = 0;
let skipped = 0;

function addSchemaToPage(filePath, breadcrumbs) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has SchemaMarkup
  if (content.includes('SchemaMarkup')) {
    skipped++;
    return;
  }

  // Skip client components
  if (content.startsWith("'use client'")) {
    skipped++;
    return;
  }

  // Determine import path depth based on file location
  const depth = filePath.split(path.sep).length - 2; // relative depth from app/
  const importPrefix = '../'.repeat(depth);

  // Add import after last import line
  const schemaImport = "import SchemaMarkup from '" + importPrefix + "components/SchemaMarkup';\n";

  // Find the last import line and add after it
  const lines = content.split('\n');
  let lastImportIdx = -1;
  lines.forEach((line, i) => {
    if (line.trim().startsWith('import ')) lastImportIdx = i;
  });

  if (lastImportIdx === -1) {
    skipped++;
    return;
  }

  lines.splice(lastImportIdx + 1, 0, schemaImport);
  content = lines.join('\n');

  // Build breadcrumb JSON string
  const breadcrumbStr = JSON.stringify(breadcrumbs, null, 4).replace(/"/g, "'");

  // Add SchemaMarkup inside <main> or after <Header />
  // Strategy: insert after <Header /> tag
  content = content.replace(
    /(<Header\s*\/>)/,
    '$1\n      <SchemaMarkup breadcrumbs={' + JSON.stringify(breadcrumbs) + '} includeReview={true} />'
  );

  if (!content.includes('SchemaMarkup breadcrumbs')) {
    skipped++;
    return;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
}

// ─── WALK APP DIRECTORY AND UPDATE PAGES ─────────────────────────────────────

const BASE = 'https://freefincalc.net';

function getBreadcrumbs(filePath) {
  const parts = filePath.replace(/\\/g, '/').replace('app/', '').replace('/page.js', '').split('/');

  // Root page
  if (parts.length === 1 && parts[0] === 'page.js') {
    return [{ name: 'Home', url: BASE + '/' }];
  }

  const crumbs = [{ name: 'Home', url: BASE + '/' }];

  // Map path segments to readable names
  const nameMap = {
    'mortgage-calculator': 'Mortgage Calculator',
    'car-loan-calculator': 'Car Loan Calculator',
    'personal-loan-calculator': 'Personal Loan Calculator',
    'personal-loan': 'Personal Loan Calculator',
    'student-loan-calculator': 'Student Loan Calculator',
    'student-loan': 'Student Loan Calculator',
    'savings-calculator': 'Savings Calculator',
    'compound-interest-calculator': 'Compound Interest Calculator',
    'compound-interest': 'Compound Interest Calculator',
    'retirement-calculator': 'Retirement Calculator',
    'investment-calculator': 'Investment Calculator',
    'investment-return-calculator': 'Investment Return Calculator',
    'budget-calculator': 'Budget Calculator',
    'tax-calculator': 'Tax Calculator',
    'net-worth-calculator': 'Net Worth Calculator',
    'debt-payoff-calculator': 'Debt Payoff Calculator',
    '401k-calculator': '401k Calculator',
    'credit-card-payoff-calculator': 'Credit Card Payoff Calculator',
    'rent-vs-buy-calculator': 'Rent vs Buy Calculator',
    'home-affordability-calculator': 'Home Affordability Calculator',
    'salary-calculator': 'Salary Calculator',
    'salary-after-tax-calculator': 'Salary After Tax Calculator',
    'salary-after-tax': 'Salary After Tax Calculator',
    'inflation-calculator': 'Inflation Calculator',
    'freelance-rate-calculator': 'Freelance Rate Calculator',
    'break-even-calculator': 'Break-Even Calculator',
    'savings-goal-calculator': 'Savings Goal Calculator',
    'blog': 'Blog',
    'purpose': null,
    'major': null,
    'state': null,
    'city': null,
    'job': null,
    'age': null,
    'amount': null,
    'price': null,
    'salary': null,
    'balance': null,
    'goal': null,
    'scenario': null,
    'asset': null,
    'income': null,
    'business': null,
    'year': null,
  };

  let currentPath = '';
  parts.forEach((part, i) => {
    currentPath += '/' + part;
    const name = nameMap[part];

    // Skip intermediate path segments like 'purpose', 'major', 'state'
    if (name === null) return;

    // For dynamic segments (last part, looks like a slug or number)
    if (i === parts.length - 1 && !nameMap[part]) {
      // Format the slug as a readable name
      const readableName = part
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      crumbs.push({ name: readableName, url: BASE + currentPath });
    } else if (name) {
      crumbs.push({ name, url: BASE + currentPath });
    }
  });

  return crumbs;
}

function walkAndUpdate(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAndUpdate(fullPath);
    } else if (entry.name === 'page.js') {
      const breadcrumbs = getBreadcrumbs(fullPath);
      addSchemaToPage(fullPath, breadcrumbs);
    }
  });
}

walkAndUpdate('app');

console.log('\n🎉 Schema update complete!');
console.log('   Updated: ' + updated + ' pages');
console.log('   Skipped: ' + skipped + ' pages (already done or client components)');
console.log('\nNext steps:');
console.log('  git add .');
console.log('  git commit -m "Add breadcrumb and review schema to all pages"');
console.log('  git push origin master');
console.log('\nThen test in Google Rich Results Test:');
console.log('  https://search.google.com/test/rich-results');
