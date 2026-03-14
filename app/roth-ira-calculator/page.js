import PageClient from './PageClient'

export const metadata = {
  title: 'Roth IRA Calculator | FreeFinCalc',
  description: 'Free Roth IRA Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/roth-ira-calculator' },
  openGraph: {
    title: 'Roth IRA Calculator | FreeFinCalc',
    description: 'Free Roth IRA Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
    url: 'https://www.freefincalc.net/roth-ira-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
