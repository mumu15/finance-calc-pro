import PageClient from './PageClient'

export const metadata = {
  title: 'Boat Loan Calculator | FreeFinCalc',
  description: 'Free Boat Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/boat-loan-calculator' },
  openGraph: {
    title: 'Boat Loan Calculator | FreeFinCalc',
    description: 'Free Boat Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/boat-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
