import PageClient from './PageClient'

export const metadata = {
  title: 'Land Loan Calculator | FreeFinCalc',
  description: 'Free Land Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/land-loan-calculator' },
  openGraph: {
    title: 'Land Loan Calculator | FreeFinCalc',
    description: 'Free Land Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://www.freefincalc.net/land-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
