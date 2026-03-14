import PageClient from './PageClient'

export const metadata = {
  title: 'Student Loan Calculator | FreeFinCalc',
  description: 'Free Student Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/student-loan-calculator' },
  openGraph: {
    title: 'Student Loan Calculator | FreeFinCalc',
    description: 'Free Student Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://www.freefincalc.net/student-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
