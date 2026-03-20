import PageClient from './PageClient'

export const metadata = {
  title: 'Debt Snowball vs Avalanche — Which Pays Off Debt Faster? 2026 | FreeFinCalc',
  description: 'Compare debt snowball vs avalanche methods. See which saves more interest and which pays off debt faster. Interactive calculator with your real debts.',
  alternates: { canonical: 'https://www.freefincalc.net/debt-snowball-vs-avalanche' },
  openGraph: {
    title: 'Debt Snowball vs Avalanche — Which Pays Off Debt Faster? 2026',
    description: 'Compare debt snowball vs avalanche methods. See which saves more interest and which pays off debt faster. Interactive calculator with your real debts.',
    url: 'https://www.freefincalc.net/debt-snowball-vs-avalanche',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
}

export default function Page() {
  return <PageClient />
}
