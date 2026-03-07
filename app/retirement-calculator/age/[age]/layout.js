import items from '../../../../data/retirementAges'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.age)
  if (!it) return { title: 'Retirement Calculator' }
  const mo = it.rate / 100 / 12
  const n  = (it.retireAt - it.age) * 12
  const fv = it.saved * Math.pow(1 + mo, n) + it.monthly * (Math.pow(1 + mo, n) - 1) / mo
  return {
    title: `Retirement Calculator — ${it.name} (Retire at ${it.retireAt}) 2026`,
    description: `Retirement plan for ${it.desc}. Starting $${it.saved.toLocaleString()}, saving $${it.monthly}/month at ${it.rate}%, retire at ${it.retireAt} with ~$${Math.round(fv).toLocaleString()}.`,
    alternates: { canonical: `https://freefincalc.net/retirement-calculator/age/${it.slug}` },
  }
}
export default function Layout({ children }) { return children }