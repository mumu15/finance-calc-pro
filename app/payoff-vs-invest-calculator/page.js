import PageClient from './PageClient'

export const metadata = {
  title: 'Payoff vs Invest Calculator | FreeFinCalc',
  description: 'Free Payoff vs Invest Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/payoff-vs-invest-calculator' },
  openGraph: {
    title: 'Payoff vs Invest Calculator | FreeFinCalc',
    description: 'Free Payoff vs Invest Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
    url: 'https://www.freefincalc.net/payoff-vs-invest-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
