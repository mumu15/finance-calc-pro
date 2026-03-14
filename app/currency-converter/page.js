import PageClient from './PageClient'

export const metadata = {
  title: 'Currency Converter | FreeFinCalc',
  description: 'Free Currency Converter — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/currency-converter' },
  openGraph: {
    title: 'Currency Converter | FreeFinCalc',
    description: 'Free Currency Converter — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/currency-converter',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
