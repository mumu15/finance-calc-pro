import PageClient from './PageClient'

export const metadata = {
  title: 'Stock Profit Calculator | FreeFinCalc',
  description: 'Free Stock Profit Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/stock-profit-calculator' },
  openGraph: {
    title: 'Stock Profit Calculator | FreeFinCalc',
    description: 'Free Stock Profit Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
    url: 'https://www.freefincalc.net/stock-profit-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
