import PageClient from './PageClient'

export const metadata = {
  title: 'Invoice Calculator | FreeFinCalc',
  description: 'Free Invoice Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/invoice-calculator' },
  openGraph: {
    title: 'Invoice Calculator | FreeFinCalc',
    description: 'Free Invoice Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/invoice-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
