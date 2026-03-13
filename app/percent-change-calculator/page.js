import PageClient from './PageClient'

export const metadata = {
  title: 'Percent Change Calculator | FreeFinCalc',
  description: 'Free Percent Change Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/percent-change-calculator' },
  openGraph: {
    title: 'Percent Change Calculator | FreeFinCalc',
    description: 'Free Percent Change Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/percent-change-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
