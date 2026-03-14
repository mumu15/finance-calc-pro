import PageClient from './PageClient'

export const metadata = {
  title: 'Debt Service Coverage Calculator | FreeFinCalc',
  description: 'Free Debt Service Coverage Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/debt-service-coverage-calculator' },
  openGraph: {
    title: 'Debt Service Coverage Calculator | FreeFinCalc',
    description: 'Free Debt Service Coverage Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
    url: 'https://www.freefincalc.net/debt-service-coverage-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
