import PageClient from './PageClient'

export const metadata = {
  title: 'Retirement Calculator 2026 — Are You Saving Enough?',
  description: 'Find out if you are on track for retirement. Enter your age, savings, and contributions. See projected balance at 65. Free.',
  alternates: { canonical: 'https://www.freefincalc.net/retirement-calculator' },
  openGraph: {
    title: 'Retirement Calculator 2026 — Are You Saving Enough?',
    description: 'Free Retirement Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
    url: 'https://www.freefincalc.net/retirement-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
