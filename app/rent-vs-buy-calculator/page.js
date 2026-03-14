import PageClient from './PageClient'

export const metadata = {
  title: 'Rent vs Buy Calculator | FreeFinCalc',
  description: 'Free Rent vs Buy Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/rent-vs-buy-calculator' },
  openGraph: {
    title: 'Rent vs Buy Calculator | FreeFinCalc',
    description: 'Free Rent vs Buy Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
    url: 'https://www.freefincalc.net/rent-vs-buy-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
