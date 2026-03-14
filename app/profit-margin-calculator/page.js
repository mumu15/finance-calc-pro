import PageClient from './PageClient'

export const metadata = {
  title: 'Profit Margin Calculator | FreeFinCalc',
  description: 'Free Profit Margin Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/profit-margin-calculator' },
  openGraph: {
    title: 'Profit Margin Calculator | FreeFinCalc',
    description: 'Free Profit Margin Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
    url: 'https://freefincalc.net/profit-margin-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
