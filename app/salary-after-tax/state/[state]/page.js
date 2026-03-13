import items from '../../../../data/satStates'
import SATStateClient from './SATStateClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return items.map(x => ({ state: x.slug })) }

export const metadata = {
  alternates: { canonical: 'https://freefincalc.net/salary-after-tax/state/[state]' },
};

export default function Page({ params }) {
  const item = items.find(x => x.slug === params.state)
  if (!item) return notFound()
  return <SATStateClient item={item} all={items} />
}
