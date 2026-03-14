import PageClient from './PageClient'

export const metadata = {
  title: 'Tip Calculator | FreeFinCalc',
  description: 'Free Tip Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/tip-calculator' },
  openGraph: {
    title: 'Tip Calculator | FreeFinCalc',
    description: 'Free Tip Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/tip-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
