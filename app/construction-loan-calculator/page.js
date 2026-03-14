import PageClient from './PageClient'

export const metadata = {
  title: 'Construction Loan Calculator | FreeFinCalc',
  description: 'Free Construction Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/construction-loan-calculator' },
  openGraph: {
    title: 'Construction Loan Calculator | FreeFinCalc',
    description: 'Free Construction Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/construction-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
