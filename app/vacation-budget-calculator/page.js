import PageClient from './PageClient'

export const metadata = {
  title: 'Vacation Budget Calculator | FreeFinCalc',
  description: 'Free Vacation Budget Calculator — create a personalized budget plan and find savings opportunities. No sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/vacation-budget-calculator' },
  openGraph: {
    title: 'Vacation Budget Calculator | FreeFinCalc',
    description: 'Free Vacation Budget Calculator — create a personalized budget plan and find savings opportunities. No sign-up required.',
    url: 'https://freefincalc.net/vacation-budget-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
