import PageClient from './PageClient'

export const metadata = {
  title: 'Net Investment Fee Calculator | FreeFinCalc',
  description: 'Free Net Investment Fee Calculator — project investment growth, returns, and compound interest. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/net-investment-fee-calculator' },
  openGraph: {
    title: 'Net Investment Fee Calculator | FreeFinCalc',
    description: 'Free Net Investment Fee Calculator — project investment growth, returns, and compound interest. Instant results, no sign-up.',
    url: 'https://freefincalc.net/net-investment-fee-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
