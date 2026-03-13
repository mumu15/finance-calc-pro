import items from '../../../../data/homePrices'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.price)
  if (!it) return { title: 'Mortgage Calculator' }
  return {
    title: `Mortgage Calculator for $${it.price.toLocaleString()} Home — Monthly Payment 2026`,
    description: `What is the monthly mortgage payment on a $${it.price.toLocaleString()} home? 20% down, 30-year at 7%: ~$${it.pmt20_30.toLocaleString()}/mo. 10% down: ~$${it.pmt10_30.toLocaleString()}/mo. Free calculator.`,` },
  }
}
export default function Layout({ children }) { return children }