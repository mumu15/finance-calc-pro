import PageClient from './PageClient'

export const metadata = {
  title: 'Budget Calculator | FreeFinCalc',
  description: 'Free Budget Calculator — create a personalized budget plan and find savings opportunities. No sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/budget-calculator' },
  openGraph: {
    title: 'Budget Calculator | FreeFinCalc',
    description: 'Free Budget Calculator — create a personalized budget plan and find savings opportunities. No sign-up required.',
    url: 'https://freefincalc.net/budget-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
