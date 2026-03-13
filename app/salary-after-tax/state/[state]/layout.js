import items from '../../../../data/satStates'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.state)
  if (!it) return { title: 'Salary After Tax by State' }
  const stateRate = it.noTax ? 'no state income tax' : it.rate + '% state rate'
  return {
    title: `${it.name} Salary After Tax Calculator 2026 — Take-Home Pay`,
    description: `Calculate your exact take-home pay in ${it.name} (${stateRate}). See federal, state, and FICA deductions. Free 2026 ${it.name} salary calculator.`,` },
  }
}
export default function Layout({ children }) { return children }
