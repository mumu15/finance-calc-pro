import PageClient from './PageClient'

export const metadata = {
  title: 'HELOC Calculator | FreeFinCalc',
  description: 'Free HELOC Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/heloc-calculator' },
  openGraph: {
    title: 'HELOC Calculator | FreeFinCalc',
    description: 'Free HELOC Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/heloc-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
