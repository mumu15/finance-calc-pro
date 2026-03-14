import PageClient from './PageClient'

export const metadata = {
  title: 'Startup Cost Calculator | FreeFinCalc',
  description: 'Free Startup Cost Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/startup-cost-calculator' },
  openGraph: {
    title: 'Startup Cost Calculator | FreeFinCalc',
    description: 'Free Startup Cost Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/startup-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
