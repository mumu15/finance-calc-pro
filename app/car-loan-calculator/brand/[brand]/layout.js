import brands from '../../../../data/carBrands'
export async function generateMetadata({ params }) {
  const b = brands.find(x => x.slug === params.brand)
  if (!b) return { title: 'Car Loan Calculator' }
  const loan = b.avg * (1 - b.down / 100)
  const mo = b.rate / 100 / 12
  const pmt = Math.round(loan * mo / (1 - Math.pow(1 + mo, -b.term)))
  return {
    title: `${b.name} Car Loan Calculator 2026 — Monthly Payment & Financing`,
    description: `Calculate your ${b.name} car loan payment. Avg price $${b.avg.toLocaleString()}, rate ${b.rate}%, est. $${pmt}/month. Compare ${b.term}-month financing options.`,
    alternates: { canonical: `https://freefincalc.net/car-loan-calculator/brand/${b.slug}` },
  }
}
export default function Layout({ children }) { return children }
