import PageClient from './PageClient'

export const metadata = {
  title: 'Life Insurance Calculator | FreeFinCalc',
  description: 'Free Life Insurance Calculator — estimate coverage needs and costs. Instant results, no sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/life-insurance-calculator' },
  openGraph: {
    title: 'Life Insurance Calculator | FreeFinCalc',
    description: 'Free Life Insurance Calculator — estimate coverage needs and costs. Instant results, no sign-up.',
    url: 'https://www.freefincalc.net/life-insurance-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
