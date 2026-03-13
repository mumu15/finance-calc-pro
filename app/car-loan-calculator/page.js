import PageClient from './PageClient'

export const metadata = {
  title: 'Car Loan Calculator | FreeFinCalc',
  description: 'Free Car Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/car-loan-calculator' },
  openGraph: {
    title: 'Car Loan Calculator | FreeFinCalc',
    description: 'Free Car Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/car-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
