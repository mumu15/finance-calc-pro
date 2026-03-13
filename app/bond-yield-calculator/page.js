import PageClient from './PageClient'

export const metadata = {
  title: 'Bond Yield Calculator | FreeFinCalc',
  description: 'Free Bond Yield Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/bond-yield-calculator' },
  openGraph: {
    title: 'Bond Yield Calculator | FreeFinCalc',
    description: 'Free Bond Yield Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/bond-yield-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
