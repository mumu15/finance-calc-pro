import PageClient from './PageClient'

export const metadata = {
  title: 'RV Loan Calculator | FreeFinCalc',
  description: 'Free RV Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/rv-loan-calculator' },
  openGraph: {
    title: 'RV Loan Calculator | FreeFinCalc',
    description: 'Free RV Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://www.freefincalc.net/rv-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
