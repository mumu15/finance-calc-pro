import PageClient from './PageClient'

export const metadata = {
  title: 'Payroll Tax Calculator | FreeFinCalc',
  description: 'Free Payroll Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/payroll-tax-calculator' },
  openGraph: {
    title: 'Payroll Tax Calculator | FreeFinCalc',
    description: 'Free Payroll Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://www.freefincalc.net/payroll-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
