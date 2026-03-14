import PageClient from './PageClient'

export const metadata = {
  title: 'Cost of Living Calculator | FreeFinCalc',
  description: 'Free Cost of Living Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/cost-of-living-calculator' },
  openGraph: {
    title: 'Cost of Living Calculator | FreeFinCalc',
    description: 'Free Cost of Living Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/cost-of-living-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
