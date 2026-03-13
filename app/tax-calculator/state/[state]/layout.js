import taxStates from '../../../../data/taxStates'
export async function generateMetadata({ params }) {
  const s = taxStates.find(x => x.slug === params.state)
  if (!s) return { title: 'Tax Calculator by State' }
  return {
    title: `${s.name} Income Tax Calculator 2026 — State Tax Rates`,
    description: `Calculate your ${s.name} income tax. State rate: ${s.noTax ? 'No state income tax' : s.rate + '%'}. ${s.desc}. Free 2026 take-home pay estimate.`,` },
  }
}
export default function Layout({ children }) { return children }
