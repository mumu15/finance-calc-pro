import PageClient from './PageClient'

export const metadata = {
  title: 'Raise Calculator | FreeFinCalc',
  description: 'Free Raise Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/raise-calculator' },
  openGraph: {
    title: 'Raise Calculator | FreeFinCalc',
    description: 'Free Raise Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/raise-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
