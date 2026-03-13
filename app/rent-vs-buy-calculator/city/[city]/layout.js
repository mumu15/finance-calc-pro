import items from '../../../../data/rvbCities'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.city)
  if (!it) return { title: 'Rent vs Buy Calculator' }
  return {
    title: `Rent vs Buy in ${it.name} 2026 — Is It Worth Buying?`,
    description: `Should you rent or buy in ${it.name}? Median home: $${it.medianHome.toLocaleString()}, median rent: $${it.medianRent.toLocaleString()}/mo. Personalized rent vs buy analysis for 2026.`,` },
  }
}
export default function Layout({ children }) { return children }