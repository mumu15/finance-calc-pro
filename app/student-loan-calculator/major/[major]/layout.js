import majors from '../../../../data/majors'
export async function generateMetadata({ params }) {
  const m = majors.find(x => x.slug === params.major)
  if (!m) return { title: 'Student Loan Calculator' }
  const mo = m.rate / 100 / 12
  const pmt = Math.round(m.debt * mo / (1 - Math.pow(1 + mo, -m.term)))
  const dti = Math.round(pmt / (m.salary / 12) * 100)
  return {
    title: `Student Loan Calculator for ${m.name} 2026`,
    description: `Avg ${m.name} student debt: $${m.debt.toLocaleString()}. Est. monthly payment $${pmt}. Starting salary $${m.salary.toLocaleString()}/yr. Debt-to-income ratio ~${dti}%.`,
  }
}
export default function Layout({ children }) { return children }
