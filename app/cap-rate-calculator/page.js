import PageClient from './PageClient'

export const metadata = {
  title: 'Cap Rate Calculator | FreeFinCalc',
  description: 'Free Cap Rate Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/cap-rate-calculator' },
  openGraph: {
    title: 'Cap Rate Calculator | FreeFinCalc',
    description: 'Free Cap Rate Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/cap-rate-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
