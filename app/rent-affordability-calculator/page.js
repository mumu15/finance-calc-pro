import PageClient from './PageClient'

export const metadata = {
  title: 'Rent Affordability Calculator | FreeFinCalc',
  description: 'Free Rent Affordability Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/rent-affordability-calculator' },
  openGraph: {
    title: 'Rent Affordability Calculator | FreeFinCalc',
    description: 'Free Rent Affordability Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
    url: 'https://freefincalc.net/rent-affordability-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
