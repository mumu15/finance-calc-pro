import PageClient from './PageClient'

export const metadata = {
  title: 'Commission Calculator | FreeFinCalc',
  description: 'Free Commission Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/commission-calculator' },
  openGraph: {
    title: 'Commission Calculator | FreeFinCalc',
    description: 'Free Commission Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/commission-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
