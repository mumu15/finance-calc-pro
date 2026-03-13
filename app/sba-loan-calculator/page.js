import PageClient from './PageClient'

export const metadata = {
  title: 'SBA Loan Calculator | FreeFinCalc',
  description: 'Free SBA Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/sba-loan-calculator' },
  openGraph: {
    title: 'SBA Loan Calculator | FreeFinCalc',
    description: 'Free SBA Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/sba-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
