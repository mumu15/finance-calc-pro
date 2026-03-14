import PageClient from './PageClient'

export const metadata = {
  title: 'Self Employment Tax Calculator | FreeFinCalc',
  description: 'Free Self Employment Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/self-employment-tax-calculator' },
  openGraph: {
    title: 'Self Employment Tax Calculator | FreeFinCalc',
    description: 'Free Self Employment Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://freefincalc.net/self-employment-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
