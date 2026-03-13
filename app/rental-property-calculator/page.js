import PageClient from './PageClient'

export const metadata = {
  title: 'Rental Property Calculator | FreeFinCalc',
  description: 'Free Rental Property Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/rental-property-calculator' },
  openGraph: {
    title: 'Rental Property Calculator | FreeFinCalc',
    description: 'Free Rental Property Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
    url: 'https://freefincalc.net/rental-property-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
