import PageClient from './PageClient'

export const metadata = {
  title: 'FHA Loan Calculator | FreeFinCalc',
  description: 'Free FHA Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/fha-loan-calculator' },
  openGraph: {
    title: 'FHA Loan Calculator | FreeFinCalc',
    description: 'Free FHA Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/fha-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
