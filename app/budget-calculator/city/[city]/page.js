import cities from '../../../../data/budgetCities'
import BudgetCityClient from './BudgetCityClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return cities.map(c => ({ city: c.slug })) }
export default function Page({ params }) {
  const item = cities.find(c => c.slug === params.city)
  if (!item) return notFound()
  return <BudgetCityClient item={item} all={cities} />
}