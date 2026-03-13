import PageClient from './PageClient'

export const metadata = {
  title: 'Capital Gains Tax Calculator | FreeFinCalc',
  description: 'Free Capital Gains Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/capital-gains-tax-calculator' },
  openGraph: {
    title: 'Capital Gains Tax Calculator | FreeFinCalc',
    description: 'Free Capital Gains Tax Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://freefincalc.net/capital-gains-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
