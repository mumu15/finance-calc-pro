import PageClient from './PageClient'

export const metadata = {
  title: 'Alimony Calculator | FreeFinCalc',
  description: 'Free Alimony Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/alimony-calculator' },
  openGraph: {
    title: 'Alimony Calculator | FreeFinCalc',
    description: 'Free Alimony Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/alimony-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
