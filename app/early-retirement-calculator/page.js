import PageClient from './PageClient'

export const metadata = {
  title: 'Early Retirement Calculator | FreeFinCalc',
  description: 'Free Early Retirement Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/early-retirement-calculator' },
  openGraph: {
    title: 'Early Retirement Calculator | FreeFinCalc',
    description: 'Free Early Retirement Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
    url: 'https://www.freefincalc.net/early-retirement-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
