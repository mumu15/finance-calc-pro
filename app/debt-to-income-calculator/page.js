import PageClient from './PageClient'

export const metadata = {
  title: 'Debt to Income Calculator | FreeFinCalc',
  description: 'Free Debt to Income Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/debt-to-income-calculator' },
  openGraph: {
    title: 'Debt to Income Calculator | FreeFinCalc',
    description: 'Free Debt to Income Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
    url: 'https://freefincalc.net/debt-to-income-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
