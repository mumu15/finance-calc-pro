import PageClient from './PageClient'

export const metadata = {
  title: 'Annuity Calculator | FreeFinCalc',
  description: 'Free Annuity Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/annuity-calculator' },
  openGraph: {
    title: 'Annuity Calculator | FreeFinCalc',
    description: 'Free Annuity Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/annuity-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
