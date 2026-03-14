import PageClient from './PageClient'

export const metadata = {
  title: 'Pension Calculator | FreeFinCalc',
  description: 'Free Pension Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/pension-calculator' },
  openGraph: {
    title: 'Pension Calculator | FreeFinCalc',
    description: 'Free Pension Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
    url: 'https://freefincalc.net/pension-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
