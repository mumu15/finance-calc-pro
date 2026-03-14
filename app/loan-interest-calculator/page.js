import PageClient from './PageClient'

export const metadata = {
  title: 'Loan Interest Calculator | FreeFinCalc',
  description: 'Free Loan Interest Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/loan-interest-calculator' },
  openGraph: {
    title: 'Loan Interest Calculator | FreeFinCalc',
    description: 'Free Loan Interest Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/loan-interest-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
