import PageClient from './PageClient'

export const metadata = {
  title: 'Income Tax Calculator 2026 — Federal & State Brackets',
  description: 'Calculate your 2026 federal and state income tax. See your effective rate, marginal bracket, and take-home pay. Free calculator.',
  alternates: { canonical: 'https://www.freefincalc.net/tax-calculator' },
  openGraph: {
    title: 'Income Tax Calculator 2026 — Federal & State Brackets',
    description: 'Free Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://www.freefincalc.net/tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
