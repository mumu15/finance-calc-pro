import items from '../../../../data/netWorthAges'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.age)
  if (!it) return { title: 'Net Worth Calculator by Age' }
  return {
    title: `Average Net Worth at ${it.name} — 2026 Benchmarks`,
    description: `What is the average net worth at ${it.name}? Median: $${it.median.toLocaleString()}, 75th percentile: $${it.p75.toLocaleString()}, top 10%: $${it.p90.toLocaleString()}. Calculate yours free.`,
    alternates: { canonical: `https://freefincalc.net/net-worth-calculator/age/${it.slug}` },
  }
}
export default function Layout({ children }) { return children }
