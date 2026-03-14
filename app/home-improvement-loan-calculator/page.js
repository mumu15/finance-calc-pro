import PageClient from './PageClient'

export const metadata = {
  title: 'Home Improvement Loan Calculator | FreeFinCalc',
  description: 'Free Home Improvement Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/home-improvement-loan-calculator' },
  openGraph: {
    title: 'Home Improvement Loan Calculator | FreeFinCalc',
    description: 'Free Home Improvement Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://www.freefincalc.net/home-improvement-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
