import items from '../../../../data/inflationYears'
import InflationYearClient from './InflationYearClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return items.map(x => ({ year: x.slug })) }
export default function Page({ params }) {
  const item = items.find(x => x.slug === params.year)
  if (!item) return notFound()
  return <InflationYearClient item={item} all={items} />
}
