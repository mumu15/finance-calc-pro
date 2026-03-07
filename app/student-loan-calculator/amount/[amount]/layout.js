import items from '../../../data/studentAmounts'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.amount)
  if (!it) return { title: 'Student Loan Calculator' }
  return {
    title: `Student Loan Calculator: $${it.amount.toLocaleString()} — Monthly Payment & Payoff 2026`,
    description: `Monthly payment on $${it.amount.toLocaleString()} in student loans. 10-year standard: $${it.pmt10}/mo. 20-year: $${it.pmt20}/mo. Compare repayment plans. Income-driven options.`,
    alternates: { canonical: `https://freefincalc.net/student-loan-calculator/amount/${it.slug}` },
  }
}
export default function Layout({ children }) { return children }