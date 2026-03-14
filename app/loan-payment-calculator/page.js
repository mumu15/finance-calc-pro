import PageClient from './PageClient'

export const metadata = {
  title: 'Loan Payment Calculator | FreeFinCalc',
  description: 'Free Loan Payment Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/loan-payment-calculator' },
  openGraph: {
    title: 'Loan Payment Calculator | FreeFinCalc',
    description: 'Free Loan Payment Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://www.freefincalc.net/loan-payment-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
