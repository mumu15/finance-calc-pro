import PageClient from './PageClient'

export const metadata = {
  title: 'Debt Avalanche Calculator | FreeFinCalc',
  description: 'Free Debt Avalanche Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/debt-avalanche-calculator' },
  openGraph: {
    title: 'Debt Avalanche Calculator | FreeFinCalc',
    description: 'Free Debt Avalanche Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
    url: 'https://www.freefincalc.net/debt-avalanche-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
