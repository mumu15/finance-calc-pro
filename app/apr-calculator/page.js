import PageClient from './PageClient'

export const metadata = {
  title: 'APR Calculator | FreeFinCalc',
  description: 'Free APR Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/apr-calculator' },
  openGraph: {
    title: 'APR Calculator | FreeFinCalc',
    description: 'Free APR Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/apr-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
