import PageClient from './PageClient'

export const metadata = {
  title: 'Unit Converter | FreeFinCalc',
  description: 'Free Unit Converter — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/unit-converter' },
  openGraph: {
    title: 'Unit Converter | FreeFinCalc',
    description: 'Free Unit Converter — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/unit-converter',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
