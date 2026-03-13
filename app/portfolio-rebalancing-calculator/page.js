import PageClient from './PageClient'

export const metadata = {
  title: 'Portfolio Rebalancing Calculator | FreeFinCalc',
  description: 'Free Portfolio Rebalancing Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/portfolio-rebalancing-calculator' },
  openGraph: {
    title: 'Portfolio Rebalancing Calculator | FreeFinCalc',
    description: 'Free Portfolio Rebalancing Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/portfolio-rebalancing-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
