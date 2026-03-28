import PageClient from './PageClient'

export const metadata = {
  title: 'Budget Planner Calculator — 50/30/20 Rule Made Easy',
  description: 'Create a personalized budget in 2 minutes using the 50/30/20 rule. See exactly where your money goes. Free budget calculator.',
  alternates: { canonical: 'https://www.freefincalc.net/budget-planner-calculator' },
  openGraph: {
    title: 'Budget Planner Calculator — 50/30/20 Rule Made Easy',
    description: 'Free Budget Planner Calculator — create a personalized budget plan and find savings opportunities. No sign-up required.',
    url: 'https://www.freefincalc.net/budget-planner-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
