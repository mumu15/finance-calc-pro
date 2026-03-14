import PageClient from './PageClient'

export const metadata = {
  title: 'Total Debt Calculator | FreeFinCalc',
  description: 'Free Total Debt Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/total-debt-calculator' },
  openGraph: {
    title: 'Total Debt Calculator | FreeFinCalc',
    description: 'Free Total Debt Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
    url: 'https://www.freefincalc.net/total-debt-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
