import PageClient from './PageClient'

export const metadata = {
  title: 'Passive Income Calculator | FreeFinCalc',
  description: 'Free Passive Income Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/passive-income-calculator' },
  openGraph: {
    title: 'Passive Income Calculator | FreeFinCalc',
    description: 'Free Passive Income Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/passive-income-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
