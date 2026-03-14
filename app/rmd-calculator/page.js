import PageClient from './PageClient'

export const metadata = {
  title: 'RMD Calculator | FreeFinCalc',
  description: 'Free RMD Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/rmd-calculator' },
  openGraph: {
    title: 'RMD Calculator | FreeFinCalc',
    description: 'Free RMD Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/rmd-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
