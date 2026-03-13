import PageClient from './PageClient'

export const metadata = {
  title: 'House Affordability Calculator | FreeFinCalc',
  description: 'Free House Affordability Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/house-affordability-calculator' },
  openGraph: {
    title: 'House Affordability Calculator | FreeFinCalc',
    description: 'Free House Affordability Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
    url: 'https://freefincalc.net/house-affordability-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
