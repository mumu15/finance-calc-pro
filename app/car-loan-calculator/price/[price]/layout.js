import items from '../../../../data/carPrices'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.price)
  if (!it) return { title: 'Car Loan Calculator' }
  return {
    title: `Car Loan Calculator for $${it.price.toLocaleString()} Vehicle — Monthly Payment 2026`,
    description: `Monthly car loan payment on a $${it.price.toLocaleString()} vehicle. 48-mo: ~$${it.pmt48}/mo. 60-mo: ~$${it.pmt60}/mo. 72-mo: ~$${it.pmt72}/mo. Compare rates free.`,
    alternates: { canonical: `https://freefincalc.net/car-loan-calculator/price/${it.slug}` },
  }
}
export default function Layout({ children }) { return children }