import PageClient from './PageClient'

export const metadata = {
  title: 'Investment Return Calculator | FreeFinCalc',
  description: 'Free Investment Return Calculator — project investment growth, returns, and compound interest. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/investment-return-calculator' },
  openGraph: {
    title: 'Investment Return Calculator | FreeFinCalc',
    description: 'Free Investment Return Calculator — project investment growth, returns, and compound interest. Instant results, no sign-up.',
    url: 'https://freefincalc.net/investment-return-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
