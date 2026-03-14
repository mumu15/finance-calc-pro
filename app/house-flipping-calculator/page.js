import PageClient from './PageClient'

export const metadata = {
  title: 'House Flipping Calculator | FreeFinCalc',
  description: 'Free House Flipping Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/house-flipping-calculator' },
  openGraph: {
    title: 'House Flipping Calculator | FreeFinCalc',
    description: 'Free House Flipping Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
    url: 'https://www.freefincalc.net/house-flipping-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
