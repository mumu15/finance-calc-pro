import cities from '../../../../data/budgetCities'
export async function generateMetadata({ params }) {
  const c = cities.find(x => x.slug === params.city)
  if (!c) return { title: 'Budget Calculator by City' }
  const total = c.rent + c.food + c.transport + c.utilities + c.entertainment + c.misc
  return {
    title: `${c.name} Cost of Living Budget Calculator 2026`,
    description: `Monthly budget breakdown for living in ${c.name}. Rent: $${c.rent}, Food: $${c.food}, Transport: $${c.transport}. Total est. $${total.toLocaleString()}/month.`,
  }
}
export default function Layout({ children }) { return children }