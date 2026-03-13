import goals from '../../../../data/savingsGoals'
export async function generateMetadata({ params }) {
  const g = goals.find(x => x.slug === params.goal)
  if (!g) return { title: 'Savings Goal Calculator' }
  const mo = g.rate / 100 / 12
  const pmt = Math.round(g.target * mo / (Math.pow(1 + mo, g.months) - 1))
  return {
    title: `Savings Goal Calculator: ${g.name} 2026`,
    description: `How much do you need to save for ${g.name.toLowerCase()}? Target $${g.target.toLocaleString()} in ${g.months} months. Save $${pmt}/month. Free savings planner.`,
  }
}
export default function Layout({ children }) { return children }
