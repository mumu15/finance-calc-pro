import PageClient from './PageClient'

export const metadata = {
  title: 'Closing Cost Calculator | FreeFinCalc',
  description: 'Free Closing Cost Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/closing-cost-calculator' },
  openGraph: {
    title: 'Closing Cost Calculator | FreeFinCalc',
    description: 'Free Closing Cost Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/closing-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
