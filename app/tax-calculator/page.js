import PageClient from './PageClient'

export const metadata = {
  title: 'Tax Calculator | FreeFinCalc',
  description: 'Free Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/tax-calculator' },
  openGraph: {
    title: 'Tax Calculator | FreeFinCalc',
    description: 'Free Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://freefincalc.net/tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
