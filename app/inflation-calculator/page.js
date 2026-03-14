import PageClient from './PageClient'

export const metadata = {
  title: 'Inflation Calculator | FreeFinCalc',
  description: 'Free Inflation Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/inflation-calculator' },
  openGraph: {
    title: 'Inflation Calculator | FreeFinCalc',
    description: 'Free Inflation Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/inflation-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
