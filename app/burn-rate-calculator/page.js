import PageClient from './PageClient'

export const metadata = {
  title: 'Burn Rate Calculator | FreeFinCalc',
  description: 'Free Burn Rate Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/burn-rate-calculator' },
  openGraph: {
    title: 'Burn Rate Calculator | FreeFinCalc',
    description: 'Free Burn Rate Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/burn-rate-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
