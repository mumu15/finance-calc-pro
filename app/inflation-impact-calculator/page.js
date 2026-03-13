import PageClient from './PageClient'

export const metadata = {
  title: 'Inflation Impact Calculator | FreeFinCalc',
  description: 'Free Inflation Impact Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/inflation-impact-calculator' },
  openGraph: {
    title: 'Inflation Impact Calculator | FreeFinCalc',
    description: 'Free Inflation Impact Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/inflation-impact-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
