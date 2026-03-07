import items from '../../../../data/ccBalances'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.balance)
  if (!it) return { title: 'Credit Card Payoff Calculator' }
  return {
    title: `Credit Card Payoff Calculator: $${it.balance.toLocaleString()} Balance at ${it.apr}% APR`,
    description: `How to pay off $${it.balance.toLocaleString()} in credit card debt. 24-month plan: $${it.pmt24}/mo. 36-month: $${it.pmt36}/mo. See total interest and fastest payoff strategy.`,
    alternates: { canonical: `https://freefincalc.net/credit-card-payoff-calculator/balance/${it.slug}` },
  }
}
export default function Layout({ children }) { return children }