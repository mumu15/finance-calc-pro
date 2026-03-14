import PageClient from './PageClient'

export const metadata = {
  title: 'Home Sale Proceeds Calculator | FreeFinCalc',
  description: 'Free Home Sale Proceeds Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/home-sale-proceeds-calculator' },
  openGraph: {
    title: 'Home Sale Proceeds Calculator | FreeFinCalc',
    description: 'Free Home Sale Proceeds Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
    url: 'https://www.freefincalc.net/home-sale-proceeds-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
