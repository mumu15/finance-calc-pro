import PageClient from './PageClient'

export const metadata = {
  title: 'Home Buying Cost Calculator | FreeFinCalc',
  description: 'Free Home Buying Cost Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/home-buying-cost-calculator' },
  openGraph: {
    title: 'Home Buying Cost Calculator | FreeFinCalc',
    description: 'Free Home Buying Cost Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
    url: 'https://freefincalc.net/home-buying-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
