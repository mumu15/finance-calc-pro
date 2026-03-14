const fs = require('fs');
const path = require('path');

const f = path.join('app','mortgage-calculator','[city]','layout.js');

const clean = `import cities from '../../../data/cities'

export async function generateMetadata({ params }) {
  const city = cities.find(c => c.slug === params.city)
  if (!city) return { title: 'Mortgage Calculator' }
  const down = Math.round(city.medianPrice * city.downPct / 100)
  const loan = city.medianPrice - down
  const mo = city.rate / 100 / 12
  const n = 360
  const monthly = Math.round(loan * mo * Math.pow(1+mo,n) / (Math.pow(1+mo,n)-1))
  return {
    metadataBase: new URL('https://www.freefincalc.net'),
    alternates: { canonical: \`https://www.freefincalc.net/mortgage-calculator/\${params.city}\` },
    title: \`Mortgage Calculator \${city.name}, \${city.state} — \${city.name} Home Loan Calculator 2026\`,
    description: \`Calculate your mortgage payment in \${city.name}. Median home price $\${city.medianPrice.toLocaleString()}, typical monthly payment $\${monthly.toLocaleString()}/mo. Free \${city.name} mortgage calculator.\`,
    openGraph: {
      title: \`Mortgage Calculator \${city.name} \${city.state} 2026\`,
      description: \`Free mortgage calculator for \${city.name}. See what you can afford with local home prices and tax rates.\`,
      url: \`https://www.freefincalc.net/mortgage-calculator/\${city.slug}\`,
      siteName: 'FreeFinCalc',
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  const cities = require('../../../data/cities')
  return cities.map(c => ({ city: c.slug }))
}

export default function Layout({ children }) {
  return <>{children}</>
}
`;

fs.writeFileSync(f, clean, 'utf8');
console.log('✅ Rewrote ' + f + ' cleanly');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Rewrite mortgage/city layout.js — fix syntax error"');
console.log('  git push origin master');
