import PageClient from './PageClient'

export const metadata = {
  title: 'Business Loan Calculator | FreeFinCalc',
  description: 'Free Business Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/business-loan-calculator' },
  openGraph: {
    title: 'Business Loan Calculator | FreeFinCalc',
    description: 'Free Business Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://www.freefincalc.net/business-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
