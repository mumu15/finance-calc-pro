import PageClient from './PageClient'

export const metadata = {
  title: 'ROI Calculator | FreeFinCalc',
  description: 'Free ROI Calculator — project investment growth, returns, and compound interest. Instant results, no sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/roi-calculator' },
  openGraph: {
    title: 'ROI Calculator | FreeFinCalc',
    description: 'Free ROI Calculator — project investment growth, returns, and compound interest. Instant results, no sign-up.',
    url: 'https://www.freefincalc.net/roi-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
