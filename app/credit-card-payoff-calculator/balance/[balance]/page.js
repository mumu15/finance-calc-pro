import ccBalances from '../../../../data/ccBalances.js'
import CCPayoffClient from './CCPayoffClient.js'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return ccBalances.map(x => ({ balance: x.slug })) }

export const metadata = {
  alternates: { canonical: 'https://freefincalc.net/credit-card-payoff-calculator/balance/[balance]' },
};

export default function Page({ params }) {
  const item = ccBalances.find(x => x.slug === params.balance)
  if (!item) return notFound()
  return <CCPayoffClient item={item} all={ccBalances} />
}
