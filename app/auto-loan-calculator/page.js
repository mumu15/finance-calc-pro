import PageClient from './PageClient'

export const metadata = {
  title: 'Auto Loan Calculator | FreeFinCalc',
  description: 'Free Auto Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/auto-loan-calculator' },
  openGraph: {
    title: 'Auto Loan Calculator | FreeFinCalc',
    description: 'Free Auto Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/auto-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
