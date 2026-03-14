import PageClient from './PageClient'

export const metadata = {
  title: 'Budget Planner Calculator | FreeFinCalc',
  description: 'Free Budget Planner Calculator — create a personalized budget plan and find savings opportunities. No sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/budget-planner-calculator' },
  openGraph: {
    title: 'Budget Planner Calculator | FreeFinCalc',
    description: 'Free Budget Planner Calculator — create a personalized budget plan and find savings opportunities. No sign-up required.',
    url: 'https://freefincalc.net/budget-planner-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
