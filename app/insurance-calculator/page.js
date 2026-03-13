import PageClient from './PageClient'

export const metadata = {
  title: 'Insurance Calculator | FreeFinCalc',
  description: 'Free Insurance Calculator — estimate coverage needs and costs. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/insurance-calculator' },
  openGraph: {
    title: 'Insurance Calculator | FreeFinCalc',
    description: 'Free Insurance Calculator — estimate coverage needs and costs. Instant results, no sign-up.',
    url: 'https://freefincalc.net/insurance-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
