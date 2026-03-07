import jobs from '../../../../data/jobs'
export async function generateMetadata({ params }) {
  const j = jobs.find(x => x.slug === params.job)
  if (!j) return { title: 'Salary After Tax Calculator' }
  const gross = j.salary
  const fed = gross * j.fedRate / 100
  const state = gross * j.stateRate / 100
  const fica = gross * j.fica / 100
  const net = Math.round(gross - fed - state - fica)
  return {
    title: `${j.name} Salary After Tax 2026 — Take-Home Pay Calculator`,
    description: `How much does a ${j.name} take home? Average salary $${gross.toLocaleString()}/yr. After federal, state, and FICA taxes, estimated take-home is $${net.toLocaleString()}/yr.`,
    alternates: { canonical: `https://freefincalc.net/salary-after-tax-calculator/job/${j.slug}` },
  }
}
export default function Layout({ children }) { return children }
