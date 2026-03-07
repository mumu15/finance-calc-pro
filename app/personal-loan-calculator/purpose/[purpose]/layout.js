import purposes from '../../../../data/loanPurposes'
export async function generateMetadata({ params }) {
  const p = purposes.find(x => x.slug === params.purpose)
  if (!p) return { title: 'Personal Loan Calculator' }
  const mo = p.rate / 100 / 12
  const pmt = Math.round(p.avg * mo / (1 - Math.pow(1 + mo, -p.term)))
  return {
    title: `Personal Loan for ${p.name} 2026 — Calculator & Rates`,
    description: `Calculate your personal loan for ${p.name.toLowerCase()}. Avg amount $${p.avg.toLocaleString()}, rate ~${p.rate}%, est. $${pmt}/month on ${p.term}-month term.`,
    alternates: { canonical: `https://freefincalc.net/personal-loan-calculator/purpose/${p.slug}` },
  }
}
export default function Layout({ children }) { return children }
