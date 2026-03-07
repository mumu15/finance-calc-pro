import ccBalances from '../../../../data/ccBalances.js'
import CCPayoffClient from './CCPayoffClient.js'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return ccBalances.map(x => ({ balance: x.slug })) }
export default function Page({ params }) {
  const item = ccBalances.find(x => x.slug === params.balance)
  if (!item) return notFound()
  return <CCPayoffClient item={item} all={ccBalances} />
}
