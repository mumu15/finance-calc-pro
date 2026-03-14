import PageClient from './PageClient'

export const metadata = {
  title: 'Tax Refund Calculator | FreeFinCalc',
  description: 'Free Tax Refund Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/tax-refund-calculator' },
  openGraph: {
    title: 'Tax Refund Calculator | FreeFinCalc',
    description: 'Free Tax Refund Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://www.freefincalc.net/tax-refund-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
