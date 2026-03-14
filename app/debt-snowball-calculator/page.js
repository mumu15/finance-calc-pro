import PageClient from './PageClient'

export const metadata = {
  title: 'Debt Snowball Calculator | FreeFinCalc',
  description: 'Free Debt Snowball Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/debt-snowball-calculator' },
  openGraph: {
    title: 'Debt Snowball Calculator | FreeFinCalc',
    description: 'Free Debt Snowball Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
    url: 'https://www.freefincalc.net/debt-snowball-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
