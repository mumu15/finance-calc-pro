import PageClient from './PageClient'

export const metadata = {
  title: 'Dollar Cost Averaging Calculator | FreeFinCalc',
  description: 'Free Dollar Cost Averaging Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/dollar-cost-averaging-calculator' },
  openGraph: {
    title: 'Dollar Cost Averaging Calculator | FreeFinCalc',
    description: 'Free Dollar Cost Averaging Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/dollar-cost-averaging-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
