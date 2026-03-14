import PageClient from './PageClient'

export const metadata = {
  title: 'Property Tax Calculator | FreeFinCalc',
  description: 'Free Property Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/property-tax-calculator' },
  openGraph: {
    title: 'Property Tax Calculator | FreeFinCalc',
    description: 'Free Property Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://freefincalc.net/property-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
