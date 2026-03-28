import PageClient from './PageClient'

export const metadata = {
  title: 'Credit Card Payoff Calculator — Get Debt-Free Faster',
  description: 'See exactly when you will be credit card debt-free. Enter your balance and payments. Get a custom payoff plan. Free calculator.',
  alternates: { canonical: 'https://www.freefincalc.net/credit-card-payoff-calculator' },
  openGraph: {
    title: 'Credit Card Payoff Calculator — Get Debt-Free Faster',
    description: 'Free Credit Card Payoff Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
    url: 'https://www.freefincalc.net/credit-card-payoff-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
