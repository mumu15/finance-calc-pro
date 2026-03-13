import PageClient from './PageClient'

export const metadata = {
  title: 'Estate Tax Calculator | FreeFinCalc',
  description: 'Free Estate Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/estate-tax-calculator' },
  openGraph: {
    title: 'Estate Tax Calculator | FreeFinCalc',
    description: 'Free Estate Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://freefincalc.net/estate-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
