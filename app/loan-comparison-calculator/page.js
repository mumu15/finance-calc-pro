import PageClient from './PageClient'

export const metadata = {
  title: 'Loan Comparison Calculator | FreeFinCalc',
  description: 'Free Loan Comparison Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/loan-comparison-calculator' },
  openGraph: {
    title: 'Loan Comparison Calculator | FreeFinCalc',
    description: 'Free Loan Comparison Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://www.freefincalc.net/loan-comparison-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
