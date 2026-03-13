import PageClient from './PageClient'

export const metadata = {
  title: 'Personal Loan Calculator | FreeFinCalc',
  description: 'Free Personal Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/personal-loan-calculator' },
  openGraph: {
    title: 'Personal Loan Calculator | FreeFinCalc',
    description: 'Free Personal Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/personal-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
