import PageClient from './PageClient'

export const metadata = {
  title: 'Break Even Calculator | FreeFinCalc',
  description: 'Free Break Even Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/break-even-calculator' },
  openGraph: {
    title: 'Break Even Calculator | FreeFinCalc',
    description: 'Free Break Even Calculator — analyze business finances and profit margins. Instant results, no sign-up.',
    url: 'https://freefincalc.net/break-even-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
