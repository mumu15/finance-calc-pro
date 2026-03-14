import PageClient from './PageClient'

export const metadata = {
  title: 'Equipment Loan Calculator | FreeFinCalc',
  description: 'Free Equipment Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/equipment-loan-calculator' },
  openGraph: {
    title: 'Equipment Loan Calculator | FreeFinCalc',
    description: 'Free Equipment Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://www.freefincalc.net/equipment-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
