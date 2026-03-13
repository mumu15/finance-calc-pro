import taxStates from '../../../../data/taxStates'
import TaxStateClient from './TaxStateClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return taxStates.map(s => ({ state: s.slug })) }

export const metadata = {
  alternates: { canonical: 'https://freefincalc.net/tax-calculator/state/[state]' },
};

export default function Page({ params }) {
  const item = taxStates.find(s => s.slug === params.state)
  if (!item) return notFound()
  return <TaxStateClient item={item} all={taxStates} />
}
