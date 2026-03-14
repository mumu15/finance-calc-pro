import PageClient from './PageClient'

export const metadata = {
  title: 'Home Equity Calculator | FreeFinCalc',
  description: 'Free Home Equity Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/home-equity-calculator' },
  openGraph: {
    title: 'Home Equity Calculator | FreeFinCalc',
    description: 'Free Home Equity Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
    url: 'https://www.freefincalc.net/home-equity-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
