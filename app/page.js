import PageClient from './PageClient'

export const metadata = {
  title: 'Calculator | FreeFinCalc',
  description: 'Free Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/' },
  openGraph: {
    title: 'Calculator | FreeFinCalc',
    description: 'Free Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
