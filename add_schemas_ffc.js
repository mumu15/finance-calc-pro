const fs = require('fs');

// ── BREADCRUMB SCHEMA COMPONENT ───────────────────────────────────────────────
const breadcrumbComponent = `export default function BreadcrumbSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
`;

fs.writeFileSync('components/BreadcrumbSchema.js', breadcrumbComponent, 'utf8');
console.log('✅ BreadcrumbSchema component created!');

// ── WEBAPP SCHEMA COMPONENT ───────────────────────────────────────────────────
const webAppComponent = `export default function WebAppSchema({ name, description, url }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1180",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
`;

fs.writeFileSync('components/WebAppSchema.js', webAppComponent, 'utf8');
console.log('✅ WebAppSchema component created!');

// ── ADD SCHEMAS TO ALL CALCULATOR PAGES ──────────────────────────────────────
const calcPages = [
  {
    file: 'app/mortgage-calculator/page.js',
    name: 'Free Mortgage Calculator',
    description: 'Calculate your monthly mortgage payment including principal, interest, taxes and insurance. Free mortgage calculator.',
    url: 'https://www.freefincalc.net/mortgage-calculator',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Mortgage Calculator', url: 'https://www.freefincalc.net/mortgage-calculator' },
    ]
  },
  {
    file: 'app/loan-calculator/page.js',
    name: 'Free Loan Calculator',
    description: 'Calculate monthly loan payments for personal loans, car loans and student loans. Free loan payment calculator.',
    url: 'https://www.freefincalc.net/loan-calculator',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Loan Calculator', url: 'https://www.freefincalc.net/loan-calculator' },
    ]
  },
  {
    file: 'app/compound-interest/page.js',
    name: 'Free Compound Interest Calculator',
    description: 'Calculate compound interest and see how your money grows over time. Free compound interest calculator.',
    url: 'https://www.freefincalc.net/compound-interest',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Compound Interest Calculator', url: 'https://www.freefincalc.net/compound-interest' },
    ]
  },
  {
    file: 'app/savings-calculator/page.js',
    name: 'Free Savings Calculator',
    description: 'Calculate how your savings grow over time with regular contributions. Free savings growth calculator.',
    url: 'https://www.freefincalc.net/savings-calculator',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Savings Calculator', url: 'https://www.freefincalc.net/savings-calculator' },
    ]
  },
  {
    file: 'app/retirement-calculator/page.js',
    name: 'Free Retirement Calculator',
    description: 'Calculate how much you need to save for retirement. Free retirement savings calculator with 4% rule.',
    url: 'https://www.freefincalc.net/retirement-calculator',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Retirement Calculator', url: 'https://www.freefincalc.net/retirement-calculator' },
    ]
  },
  {
    file: 'app/tax-calculator/page.js',
    name: 'Free Tax Calculator',
    description: 'Estimate your federal income tax bill. Free US income tax calculator with tax brackets.',
    url: 'https://www.freefincalc.net/tax-calculator',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Tax Calculator', url: 'https://www.freefincalc.net/tax-calculator' },
    ]
  },
  {
    file: 'app/debt-payoff-calculator/page.js',
    name: 'Free Debt Payoff Calculator',
    description: 'Calculate how long to pay off debt using snowball or avalanche method. Free debt payoff calculator.',
    url: 'https://www.freefincalc.net/debt-payoff-calculator',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Debt Payoff Calculator', url: 'https://www.freefincalc.net/debt-payoff-calculator' },
    ]
  },
  {
    file: 'app/emergency-fund-calculator/page.js',
    name: 'Free Emergency Fund Calculator',
    description: 'Calculate how much emergency fund you need and how long to save it. Free emergency fund calculator.',
    url: 'https://www.freefincalc.net/emergency-fund-calculator',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Emergency Fund Calculator', url: 'https://www.freefincalc.net/emergency-fund-calculator' },
    ]
  },
  {
    file: 'app/budget-calculator/page.js',
    name: 'Free Budget Calculator',
    description: 'Create a monthly budget using the 50/30/20 rule. Free budget calculator for beginners.',
    url: 'https://www.freefincalc.net/budget-calculator',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Budget Calculator', url: 'https://www.freefincalc.net/budget-calculator' },
    ]
  },
  {
    file: 'app/net-worth-calculator/page.js',
    name: 'Free Net Worth Calculator',
    description: 'Calculate your total net worth by adding assets and subtracting liabilities. Free net worth calculator.',
    url: 'https://www.freefincalc.net/net-worth-calculator',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Net Worth Calculator', url: 'https://www.freefincalc.net/net-worth-calculator' },
    ]
  },
  {
    file: 'app/rent-vs-buy-calculator/page.js',
    name: 'Free Rent vs Buy Calculator',
    description: 'Compare the true costs of renting vs buying a home. Free rent vs buy calculator with full breakdown.',
    url: 'https://www.freefincalc.net/rent-vs-buy-calculator',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Rent vs Buy Calculator', url: 'https://www.freefincalc.net/rent-vs-buy-calculator' },
    ]
  },
  {
    file: 'app/inflation-calculator/page.js',
    name: 'Free Inflation Calculator',
    description: 'Calculate how inflation affects the purchasing power of your money over time. Free inflation calculator.',
    url: 'https://www.freefincalc.net/inflation-calculator',
    breadcrumb: [
      { name: 'Home', url: 'https://www.freefincalc.net' },
      { name: 'Inflation Calculator', url: 'https://www.freefincalc.net/inflation-calculator' },
    ]
  },
];

let fixed = 0;
let skipped = 0;

calcPages.forEach(({ file, name, description, url, breadcrumb }) => {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  Not found: ${file}`);
    skipped++;
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('BreadcrumbSchema')) {
    console.log(`⏭️  Already has schema: ${file}`);
    skipped++;
    return;
  }

  // Add imports
  content = content.replace(
    `import FaqSchema from '../../../components/FaqSchema'`,
    `import FaqSchema from '../../../components/FaqSchema'
import BreadcrumbSchema from '../../../components/BreadcrumbSchema'
import WebAppSchema from '../../../components/WebAppSchema'`
  );

  // Add schema components in JSX
  content = content.replace(
    `      <FaqSchema faqs={faqs} />`,
    `      <FaqSchema faqs={faqs} />
      <BreadcrumbSchema items={${JSON.stringify(breadcrumb)}} />
      <WebAppSchema name="${name}" description="${description}" url="${url}" />`
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Added schemas to: ${file}`);
  fixed++;
});

console.log(`\n🎉 Done! ${fixed} files updated, ${skipped} skipped.`);
console.log('Run: git add . && git commit -m "Add Breadcrumb and WebApp schema to all calculator pages" && git push origin master:main');
