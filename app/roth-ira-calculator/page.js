import PageClient from './PageClient'

export const metadata = {
  title: 'Roth IRA Calculator 2026 — Tax-Free Retirement Growth',
  description: 'See how much your Roth IRA will be worth at retirement. Tax-free growth projections with contribution limits. Free calculator.',
  alternates: { canonical: 'https://www.freefincalc.net/roth-ira-calculator' },
  openGraph: {
    title: 'Roth IRA Calculator 2026 — Tax-Free Retirement Growth',
    description: 'Free Roth IRA Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
    url: 'https://www.freefincalc.net/roth-ira-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
