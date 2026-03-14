import PageClient from './PageClient'

export const metadata = {
  title: 'Net Worth Calculator | FreeFinCalc',
  description: 'Free Net Worth Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/net-worth-calculator' },
  openGraph: {
    title: 'Net Worth Calculator | FreeFinCalc',
    description: 'Free Net Worth Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/net-worth-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
