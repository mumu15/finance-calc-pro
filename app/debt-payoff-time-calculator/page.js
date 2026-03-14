import PageClient from './PageClient'

export const metadata = {
  title: 'Debt Payoff Time Calculator | FreeFinCalc',
  description: 'Free Debt Payoff Time Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/debt-payoff-time-calculator' },
  openGraph: {
    title: 'Debt Payoff Time Calculator | FreeFinCalc',
    description: 'Free Debt Payoff Time Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
    url: 'https://freefincalc.net/debt-payoff-time-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
