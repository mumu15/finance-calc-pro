import PageClient from './PageClient'

export const metadata = {
  title: 'Gift Tax Calculator | FreeFinCalc',
  description: 'Free Gift Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/gift-tax-calculator' },
  openGraph: {
    title: 'Gift Tax Calculator | FreeFinCalc',
    description: 'Free Gift Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://www.freefincalc.net/gift-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
