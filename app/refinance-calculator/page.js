import PageClient from './PageClient'

export const metadata = {
  title: 'Refinance Calculator | FreeFinCalc',
  description: 'Free Refinance Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/refinance-calculator' },
  openGraph: {
    title: 'Refinance Calculator | FreeFinCalc',
    description: 'Free Refinance Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/refinance-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
