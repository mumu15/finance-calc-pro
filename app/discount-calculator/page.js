import PageClient from './PageClient'

export const metadata = {
  title: 'Discount Calculator | FreeFinCalc',
  description: 'Free Discount Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/discount-calculator' },
  openGraph: {
    title: 'Discount Calculator | FreeFinCalc',
    description: 'Free Discount Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/discount-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
