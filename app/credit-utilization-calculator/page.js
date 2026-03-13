import PageClient from './PageClient'

export const metadata = {
  title: 'Credit Utilization Calculator | FreeFinCalc',
  description: 'Free Credit Utilization Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/credit-utilization-calculator' },
  openGraph: {
    title: 'Credit Utilization Calculator | FreeFinCalc',
    description: 'Free Credit Utilization Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/credit-utilization-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
