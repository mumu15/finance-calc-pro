import PageClient from './PageClient'

export const metadata = {
  title: 'Moving Cost Calculator | FreeFinCalc',
  description: 'Free Moving Cost Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/moving-cost-calculator' },
  openGraph: {
    title: 'Moving Cost Calculator | FreeFinCalc',
    description: 'Free Moving Cost Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/moving-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
