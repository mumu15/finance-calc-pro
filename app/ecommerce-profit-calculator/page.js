import PageClient from './PageClient'

export const metadata = {
  title: 'Ecommerce Profit Calculator | FreeFinCalc',
  description: 'Free Ecommerce Profit Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/ecommerce-profit-calculator' },
  openGraph: {
    title: 'Ecommerce Profit Calculator | FreeFinCalc',
    description: 'Free Ecommerce Profit Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
    url: 'https://www.freefincalc.net/ecommerce-profit-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
