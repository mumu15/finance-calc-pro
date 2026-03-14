import PageClient from './PageClient'

export const metadata = {
  title: 'Loan Calculator | FreeFinCalc',
  description: 'Free Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/loan-calculator' },
  openGraph: {
    title: 'Loan Calculator | FreeFinCalc',
    description: 'Free Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://www.freefincalc.net/loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
