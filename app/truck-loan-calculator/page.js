import PageClient from './PageClient'

export const metadata = {
  title: 'Truck Loan Calculator | FreeFinCalc',
  description: 'Free Truck Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/truck-loan-calculator' },
  openGraph: {
    title: 'Truck Loan Calculator | FreeFinCalc',
    description: 'Free Truck Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/truck-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
