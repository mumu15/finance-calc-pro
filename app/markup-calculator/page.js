import PageClient from './PageClient'

export const metadata = {
  title: 'Markup Calculator | FreeFinCalc',
  description: 'Free Markup Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/markup-calculator' },
  openGraph: {
    title: 'Markup Calculator | FreeFinCalc',
    description: 'Free Markup Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
    url: 'https://freefincalc.net/markup-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
