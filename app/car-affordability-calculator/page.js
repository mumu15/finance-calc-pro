import PageClient from './PageClient'

export const metadata = {
  title: 'Car Affordability Calculator | FreeFinCalc',
  description: 'Free Car Affordability Calculator — calculate auto costs, monthly payments, and total expenses. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/car-affordability-calculator' },
  openGraph: {
    title: 'Car Affordability Calculator | FreeFinCalc',
    description: 'Free Car Affordability Calculator — calculate auto costs, monthly payments, and total expenses. No sign-up.',
    url: 'https://www.freefincalc.net/car-affordability-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
