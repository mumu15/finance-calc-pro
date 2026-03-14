import PageClient from './PageClient'

export const metadata = {
  title: 'Retirement Savings Calculator | FreeFinCalc',
  description: 'Free Retirement Savings Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/retirement-savings-calculator' },
  openGraph: {
    title: 'Retirement Savings Calculator | FreeFinCalc',
    description: 'Free Retirement Savings Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
    url: 'https://www.freefincalc.net/retirement-savings-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
