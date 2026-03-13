import items from '../../../../data/netWorthAges'
import NWAgeClient from './NWAgeClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return items.map(x => ({ age: x.slug })) }

export const metadata = {
  alternates: { canonical: 'https://freefincalc.net/net-worth-calculator/age/[age]' },
};

export default function Page({ params }) {
  const item = items.find(x => x.slug === params.age)
  if (!item) return notFound()
  return <NWAgeClient item={item} all={items} />
}
