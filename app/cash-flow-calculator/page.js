import PageClient from './PageClient'

export const metadata = {
  title: 'Cash Flow Calculator | FreeFinCalc',
  description: 'Free Cash Flow Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/cash-flow-calculator' },
  openGraph: {
    title: 'Cash Flow Calculator | FreeFinCalc',
    description: 'Free Cash Flow Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/cash-flow-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
