import PageClient from './PageClient'

export const metadata = {
  title: 'Child Tax Credit Calculator | FreeFinCalc',
  description: 'Free Child Tax Credit Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/child-tax-credit-calculator' },
  openGraph: {
    title: 'Child Tax Credit Calculator | FreeFinCalc',
    description: 'Free Child Tax Credit Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://www.freefincalc.net/child-tax-credit-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
