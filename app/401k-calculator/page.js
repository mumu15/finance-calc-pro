import PageClient from './PageClient'

export const metadata = {
  title: '401(k) Calculator | FreeFinCalc',
  description: 'Free 401(k) Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/401k-calculator' },
  openGraph: {
    title: '401(k) Calculator | FreeFinCalc',
    description: 'Free 401(k) Calculator — plan your retirement savings and estimate future balances. No sign-up required.',
    url: 'https://www.freefincalc.net/401k-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
