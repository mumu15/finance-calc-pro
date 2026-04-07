import PageClient from './PageClient'

export const metadata = {
  title: 'EV Charging Cost Calculator: Real Cost Per Mile (2026)',
  description: 'Free EV charging cost calculator with 2026 electricity rates from the EIA. Compare home vs Supercharger vs Electrify America. See your cost per mile, monthly bill, and savings vs gas.',
  keywords: [
    'ev charging cost calculator',
    'electric car charging cost',
    'cost to charge an ev',
    'tesla charging cost',
    'home vs public charging',
    'ev cost per mile',
    'supercharger cost calculator',
    'electrify america cost',
  ],
  alternates: { canonical: 'https://www.freefincalc.net/ev-charging-cost-calculator' },
  openGraph: {
    title: 'EV Charging Cost Calculator (2026 Rates)',
    description: 'Calculate the real cost of charging an electric vehicle in 2026. Home vs Supercharger vs Electrify America with current rates.',
    url: 'https://www.freefincalc.net/ev-charging-cost-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Charging Cost Calculator (2026)',
    description: 'See what charging your EV actually costs. Real 2026 rates from EIA, Tesla, and Electrify America.',
  },
}

export default function Page() {
  return <PageClient />
}
