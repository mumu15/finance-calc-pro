import PageClient from './PageClient'

export const metadata = {
  title: 'Mortgage Points Calculator | FreeFinCalc',
  description: 'Free Mortgage Points Calculator — estimate monthly payments, amortization, and total cost. Compare rates and scenarios instantly.',
  alternates: { canonical: 'https://freefincalc.net/mortgage-points-calculator' },
  openGraph: {
    title: 'Mortgage Points Calculator | FreeFinCalc',
    description: 'Free Mortgage Points Calculator — estimate monthly payments, amortization, and total cost. Compare rates and scenarios instantly.',
    url: 'https://freefincalc.net/mortgage-points-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
