import PageClient from './PageClient'

export const metadata = {
  title: 'Credit Card Minimum Payment Calculator | FreeFinCalc',
  description: 'Free Credit Card Minimum Payment Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/credit-card-minimum-payment-calculator' },
  openGraph: {
    title: 'Credit Card Minimum Payment Calculator | FreeFinCalc',
    description: 'Free Credit Card Minimum Payment Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
    url: 'https://www.freefincalc.net/credit-card-minimum-payment-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
