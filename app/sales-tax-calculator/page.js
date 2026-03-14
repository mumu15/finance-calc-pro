import PageClient from './PageClient'

export const metadata = {
  title: 'Sales Tax Calculator | FreeFinCalc',
  description: 'Free Sales Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/sales-tax-calculator' },
  openGraph: {
    title: 'Sales Tax Calculator | FreeFinCalc',
    description: 'Free Sales Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://freefincalc.net/sales-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
