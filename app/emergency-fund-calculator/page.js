import PageClient from './PageClient'

export const metadata = {
  title: 'Emergency Fund Calculator | FreeFinCalc',
  description: 'Free Emergency Fund Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/emergency-fund-calculator' },
  openGraph: {
    title: 'Emergency Fund Calculator | FreeFinCalc',
    description: 'Free Emergency Fund Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/emergency-fund-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
