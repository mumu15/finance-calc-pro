import PageClient from './PageClient'

export const metadata = {
  title: 'Wedding Budget Calculator | FreeFinCalc',
  description: 'Free Wedding Budget Calculator — create a personalized budget plan and find savings opportunities. No sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/wedding-budget-calculator' },
  openGraph: {
    title: 'Wedding Budget Calculator | FreeFinCalc',
    description: 'Free Wedding Budget Calculator — create a personalized budget plan and find savings opportunities. No sign-up required.',
    url: 'https://freefincalc.net/wedding-budget-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
