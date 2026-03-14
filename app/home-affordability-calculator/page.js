import PageClient from './PageClient'

export const metadata = {
  title: 'Home Affordability Calculator | FreeFinCalc',
  description: 'Free Home Affordability Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/home-affordability-calculator' },
  openGraph: {
    title: 'Home Affordability Calculator | FreeFinCalc',
    description: 'Free Home Affordability Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
    url: 'https://www.freefincalc.net/home-affordability-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
