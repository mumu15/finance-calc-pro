import PageClient from './PageClient'

export const metadata = {
  title: 'Employee Cost Calculator | FreeFinCalc',
  description: 'Free Employee Cost Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/employee-cost-calculator' },
  openGraph: {
    title: 'Employee Cost Calculator | FreeFinCalc',
    description: 'Free Employee Cost Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/employee-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
