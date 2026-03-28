import PageClient from './PageClient'

export const metadata = {
  title: 'Loan Calculator 2026 — Monthly Payment & Total Cost',
  description: 'Calculate monthly loan payments instantly. See total interest, amortization schedule, and payoff date. Works for any loan type.',
  alternates: { canonical: 'https://www.freefincalc.net/loan-calculator' },
  openGraph: {
    title: 'Loan Calculator 2026 — Monthly Payment & Total Cost',
    description: 'Free Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://www.freefincalc.net/loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
