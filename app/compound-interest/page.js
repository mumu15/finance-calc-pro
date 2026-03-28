import PageClient from './PageClient'

export const metadata = {
  title: 'Compound Interest Calculator — See Your Money Grow',
  description: 'Watch your investment grow with compound interest. Enter any amount, rate, and time period. See yearly breakdown. Free calculator.',
  alternates: { canonical: 'https://www.freefincalc.net/compound-interest' },
  openGraph: {
    title: 'Compound Interest Calculator — See Your Money Grow',
    description: 'Free Compound Interest — project investment growth, returns, and compound interest. Instant results, no sign-up.',
    url: 'https://www.freefincalc.net/compound-interest',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
