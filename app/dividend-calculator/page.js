import PageClient from './PageClient'

export const metadata = {
  title: 'Dividend Calculator | FreeFinCalc',
  description: 'Free Dividend Calculator — project investment growth, returns, and compound interest. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/dividend-calculator' },
  openGraph: {
    title: 'Dividend Calculator | FreeFinCalc',
    description: 'Free Dividend Calculator — project investment growth, returns, and compound interest. Instant results, no sign-up.',
    url: 'https://freefincalc.net/dividend-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
