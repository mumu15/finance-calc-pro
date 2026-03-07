import items from '../../../../data/businesses'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.business)
  if (!it) return { title: 'Break-Even Calculator' }
  const be = Math.round(it.fixed / (it.price * (1 - it.varCost)))
  return {
    title: `Break-Even Calculator: ${it.name} 2026 — Units & Revenue`,
    description: `Calculate the break-even point for a ${it.name.toLowerCase()}. With $${it.fixed.toLocaleString()} fixed costs and ${Math.round(it.varCost*100)}% variable costs, break-even is ~${be} ${it.unit}s/month.`,
    alternates: { canonical: `https://freefincalc.net/break-even-calculator/business/${it.slug}` },
  }
}
export default function Layout({ children }) { return children }