import PageClient from './PageClient'

export const metadata = {
  title: 'Biweekly Mortgage Calculator | FreeFinCalc',
  description: 'Free Biweekly Mortgage Calculator — estimate monthly payments, amortization, and total cost. Compare rates and scenarios instantly.',
  alternates: { canonical: 'https://www.freefincalc.net/biweekly-mortgage-calculator' },
  openGraph: {
    title: 'Biweekly Mortgage Calculator | FreeFinCalc',
    description: 'Free Biweekly Mortgage Calculator — estimate monthly payments, amortization, and total cost. Compare rates and scenarios instantly.',
    url: 'https://www.freefincalc.net/biweekly-mortgage-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
