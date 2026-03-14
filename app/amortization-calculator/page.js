import PageClient from './PageClient'

export const metadata = {
  title: 'Amortization Calculator | FreeFinCalc',
  description: 'Free Amortization Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/amortization-calculator' },
  openGraph: {
    title: 'Amortization Calculator | FreeFinCalc',
    description: 'Free Amortization Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/amortization-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
