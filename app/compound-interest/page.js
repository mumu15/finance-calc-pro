import PageClient from './PageClient'

export const metadata = {
  title: 'Compound Interest | FreeFinCalc',
  description: 'Free Compound Interest — project investment growth, returns, and compound interest. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/compound-interest' },
  openGraph: {
    title: 'Compound Interest | FreeFinCalc',
    description: 'Free Compound Interest — project investment growth, returns, and compound interest. Instant results, no sign-up.',
    url: 'https://freefincalc.net/compound-interest',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
