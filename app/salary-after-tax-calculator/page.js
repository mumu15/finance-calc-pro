import PageClient from './PageClient'

export const metadata = {
  title: 'Salary After Tax Calculator 2026 — Your Take-Home Pay',
  description: 'Calculate your exact take-home pay after federal and state taxes. See paycheck breakdown by pay period. All 50 states. Free.',
  alternates: { canonical: 'https://www.freefincalc.net/salary-after-tax-calculator' },
  openGraph: {
    title: 'Salary After Tax Calculator 2026 — Your Take-Home Pay',
    description: 'Free Salary After Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://www.freefincalc.net/salary-after-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
