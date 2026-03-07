import items from '../../../../data/inflationYears'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.year)
  if (!it) return { title: 'Inflation Calculator' }
  return {
    title: `Inflation Calculator: ${it.year} to 2026 — CPI & Purchasing Power`,
    description: `How much is $1 from ${it.year} worth today? CPI multiplier: ${it.multiplier}x. $100 in ${it.year} = ~$${Math.round(100*it.multiplier)} in 2026. Free historical inflation calculator.`,
    alternates: { canonical: `https://freefincalc.net/inflation-calculator/year/${it.slug}` },
  }
}
export default function Layout({ children }) { return children }
