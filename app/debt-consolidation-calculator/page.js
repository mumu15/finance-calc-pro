import PageClient from './PageClient'

export const metadata = {
  title: 'Debt Consolidation Calculator | FreeFinCalc',
  description: 'Free Debt Consolidation Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/debt-consolidation-calculator' },
  openGraph: {
    title: 'Debt Consolidation Calculator | FreeFinCalc',
    description: 'Free Debt Consolidation Calculator — find the fastest way to pay off your debt and see interest saved. No sign-up.',
    url: 'https://www.freefincalc.net/debt-consolidation-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
