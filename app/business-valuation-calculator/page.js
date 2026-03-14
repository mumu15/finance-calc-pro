import PageClient from './PageClient'

export const metadata = {
  title: 'Business Valuation Calculator | FreeFinCalc',
  description: 'Free Business Valuation Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/business-valuation-calculator' },
  openGraph: {
    title: 'Business Valuation Calculator | FreeFinCalc',
    description: 'Free Business Valuation Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
    url: 'https://www.freefincalc.net/business-valuation-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
