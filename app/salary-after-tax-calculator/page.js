import PageClient from './PageClient'

export const metadata = {
  title: 'Salary After Tax Calculator | FreeFinCalc',
  description: 'Free Salary After Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/salary-after-tax-calculator' },
  openGraph: {
    title: 'Salary After Tax Calculator | FreeFinCalc',
    description: 'Free Salary After Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://freefincalc.net/salary-after-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
