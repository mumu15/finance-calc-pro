import PageClient from './PageClient'

export const metadata = {
  title: 'Options Profit Calculator | FreeFinCalc',
  description: 'Free Options Profit Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/options-profit-calculator' },
  openGraph: {
    title: 'Options Profit Calculator | FreeFinCalc',
    description: 'Free Options Profit Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
    url: 'https://freefincalc.net/options-profit-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
