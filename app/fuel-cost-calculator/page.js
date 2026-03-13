import PageClient from './PageClient'

export const metadata = {
  title: 'Fuel Cost Calculator | FreeFinCalc',
  description: 'Free Fuel Cost Calculator — calculate auto costs, monthly payments, and total expenses. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/fuel-cost-calculator' },
  openGraph: {
    title: 'Fuel Cost Calculator | FreeFinCalc',
    description: 'Free Fuel Cost Calculator — calculate auto costs, monthly payments, and total expenses. No sign-up.',
    url: 'https://freefincalc.net/fuel-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
