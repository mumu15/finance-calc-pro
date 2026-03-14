import PageClient from './PageClient'

export const metadata = {
  title: 'Simple Interest Calculator | FreeFinCalc',
  description: 'Free Simple Interest Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/simple-interest-calculator' },
  openGraph: {
    title: 'Simple Interest Calculator | FreeFinCalc',
    description: 'Free Simple Interest Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/simple-interest-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
