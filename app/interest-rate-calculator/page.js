import PageClient from './PageClient'

export const metadata = {
  title: 'Interest Rate Calculator | FreeFinCalc',
  description: 'Free Interest Rate Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/interest-rate-calculator' },
  openGraph: {
    title: 'Interest Rate Calculator | FreeFinCalc',
    description: 'Free Interest Rate Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/interest-rate-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
