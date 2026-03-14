import PageClient from './PageClient'

export const metadata = {
  title: 'Index Fund Calculator | FreeFinCalc',
  description: 'Free Index Fund Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/index-fund-calculator' },
  openGraph: {
    title: 'Index Fund Calculator | FreeFinCalc',
    description: 'Free Index Fund Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/index-fund-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
