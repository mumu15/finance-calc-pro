import PageClient from './PageClient'

export const metadata = {
  title: 'FIRE Retirement Calculator | FreeFinCalc',
  description: 'Free FIRE Retirement Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/fire-retirement-calculator' },
  openGraph: {
    title: 'FIRE Retirement Calculator | FreeFinCalc',
    description: 'Free FIRE Retirement Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
    url: 'https://freefincalc.net/fire-retirement-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
