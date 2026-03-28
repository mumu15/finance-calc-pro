import PageClient from './PageClient'

export const metadata = {
  title: '401k Calculator 2026 — How Much Will You Retire With?',
  description: 'Calculate your 401k balance at retirement. Includes employer match, catch-up contributions, and tax savings. Free 401k calculator.',
  alternates: { canonical: 'https://www.freefincalc.net/401k-calculator' },
  openGraph: {
    title: '401k Calculator 2026 — How Much Will You Retire With?',
    description: 'Free 401(k) Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
    url: 'https://www.freefincalc.net/401k-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
