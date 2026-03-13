import PageClient from './PageClient'

export const metadata = {
  title: 'SaaS Metrics Calculator | FreeFinCalc',
  description: 'Free SaaS Metrics Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/saas-metrics-calculator' },
  openGraph: {
    title: 'SaaS Metrics Calculator | FreeFinCalc',
    description: 'Free SaaS Metrics Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/saas-metrics-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
