import PageClient from './PageClient'

export const metadata = {
  title: 'Dividend Calculator — How Much Passive Income?',
  description: 'Calculate dividend income from stocks and ETFs. See monthly and annual payouts with DRIP reinvestment growth projections.',
  alternates: { canonical: 'https://www.freefincalc.net/dividend-calculator' },
  openGraph: {
    title: 'Dividend Calculator — How Much Passive Income?',
    description: 'Free Dividend Calculator — project investment growth, returns, and compound interest. Instant results, no sign-up.',
    url: 'https://www.freefincalc.net/dividend-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
