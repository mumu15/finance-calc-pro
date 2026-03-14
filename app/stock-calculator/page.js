import PageClient from './PageClient'

export const metadata = {
  title: 'Stock Calculator | FreeFinCalc',
  description: 'Free Stock Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/stock-calculator' },
  openGraph: {
    title: 'Stock Calculator | FreeFinCalc',
    description: 'Free Stock Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/stock-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
