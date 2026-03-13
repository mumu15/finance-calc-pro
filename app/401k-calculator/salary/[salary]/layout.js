import items from '../../../../data/salaries401k'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.salary)
  if (!it) return { title: '401k Calculator' }
  return {
    title: `401k Calculator for $${it.salary.toLocaleString()} Salary — 2026 Retirement Projections`,
    description: `How much will your 401k grow on a $${it.salary.toLocaleString()} salary? At 10% contribution + 3% match over 30 years: ~$${it.fv30.toLocaleString()}. Free 401k planner.`,
  }
}
export default function Layout({ children }) { return children }