import items from '../../../../data/inflationYears'
import InflationYearClient from './InflationYearClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return items.map(x => ({ year: x.slug })) }

export const metadata = {
  alternates: { canonical: 'https://freefincalc.net/inflation-calculator/year/[year]' },
};

export default function Page({ params }) {
  const item = items.find(x => x.slug === params.year)
  if (!item) return notFound()
  return <InflationYearClient item={item} all={items} />
}
