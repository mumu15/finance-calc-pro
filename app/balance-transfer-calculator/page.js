import PageClient from './PageClient'

export const metadata = {
  title: 'Balance Transfer Calculator | FreeFinCalc',
  description: 'Free Balance Transfer Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/balance-transfer-calculator' },
  openGraph: {
    title: 'Balance Transfer Calculator | FreeFinCalc',
    description: 'Free Balance Transfer Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/balance-transfer-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
