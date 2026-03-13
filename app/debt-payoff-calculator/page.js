import PageClient from './PageClient'

export const metadata = {
  title: 'Debt Payoff Calculator | FreeFinCalc',
  description: 'Free Debt Payoff Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/debt-payoff-calculator' },
  openGraph: {
    title: 'Debt Payoff Calculator | FreeFinCalc',
    description: 'Free Debt Payoff Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
    url: 'https://freefincalc.net/debt-payoff-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
