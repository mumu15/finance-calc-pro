import PageClient from './PageClient'

export const metadata = {
  title: 'Car Depreciation Calculator | FreeFinCalc',
  description: 'Free Car Depreciation Calculator — calculate auto costs, monthly payments, and total expenses. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/car-depreciation-calculator' },
  openGraph: {
    title: 'Car Depreciation Calculator | FreeFinCalc',
    description: 'Free Car Depreciation Calculator — calculate auto costs, monthly payments, and total expenses. No sign-up.',
    url: 'https://freefincalc.net/car-depreciation-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
