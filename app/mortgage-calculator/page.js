import PageClient from './PageClient'

export const metadata = {
  title: 'Mortgage Calculator | FreeFinCalc',
  description: 'Free Mortgage Calculator — estimate monthly payments, amortization, and total cost. Compare rates and scenarios instantly.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-calculator' },
  openGraph: {
    title: 'Mortgage Calculator | FreeFinCalc',
    description: 'Free Mortgage Calculator — estimate monthly payments, amortization, and total cost. Compare rates and scenarios instantly.',
    url: 'https://www.freefincalc.net/mortgage-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
