import PageClient from './PageClient'

export const metadata = {
  title: 'Profit Margin Calculator | FreeFinCalc',
  description: 'Free Profit Margin Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/profit-margin-calculator' },
  openGraph: {
    title: 'Profit Margin Calculator | FreeFinCalc',
    description: 'Free Profit Margin Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
    url: 'https://www.freefincalc.net/profit-margin-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
