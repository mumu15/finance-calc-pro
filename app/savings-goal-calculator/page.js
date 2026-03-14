import PageClient from './PageClient'

export const metadata = {
  title: 'Savings Goal Calculator | FreeFinCalc',
  description: 'Free Savings Goal Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/savings-goal-calculator' },
  openGraph: {
    title: 'Savings Goal Calculator | FreeFinCalc',
    description: 'Free Savings Goal Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
    url: 'https://www.freefincalc.net/savings-goal-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
