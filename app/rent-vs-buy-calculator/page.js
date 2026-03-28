import PageClient from './PageClient'

export const metadata = {
  title: 'Rent vs Buy Calculator 2026 — Which Saves You More?',
  description: 'Should you rent or buy in 2026? Compare total costs over 5-30 years with real tax benefits, appreciation, and opportunity cost.',
  alternates: { canonical: 'https://www.freefincalc.net/rent-vs-buy-calculator' },
  openGraph: {
    title: 'Rent vs Buy Calculator 2026 — Which Saves You More?',
    description: 'Free Rent vs Buy Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
    url: 'https://www.freefincalc.net/rent-vs-buy-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
