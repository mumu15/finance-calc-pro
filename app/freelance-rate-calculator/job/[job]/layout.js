import items from '../../../../data/freelanceJobs'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.job)
  if (!it) return { title: 'Freelance Rate Calculator' }
  return {
    title: `Freelance ${it.name} Rate Calculator 2026 — How Much to Charge?`,
    description: `What should a freelance ${it.name.toLowerCase()} charge? Avg rate $${it.avgRate}/hr, median $${it.medRate}/hr. Calculate your target rate based on income goal. Free 2026 guide.`,
  }
}
export default function Layout({ children }) { return children }