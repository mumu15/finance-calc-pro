import PageClient from './PageClient'

export const metadata = {
  title: 'Working Capital Calculator | FreeFinCalc',
  description: 'Free Working Capital Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/working-capital-calculator' },
  openGraph: {
    title: 'Working Capital Calculator | FreeFinCalc',
    description: 'Free Working Capital Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/working-capital-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
