import items from '../../../../data/loanAmounts'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.amount)
  if (!it) return { title: 'Personal Loan Calculator' }
  return {
    title: `${it.name} Calculator — Monthly Payments & Total Cost 2026`,
    description: `Calculate monthly payments for a ${it.name}. 36-month payment: ~$${it.term36.toLocaleString()}/mo. 60-month: ~$${it.term60.toLocaleString()}/mo. Compare rates and terms free.`,` },
  }
}
export default function Layout({ children }) { return children }
