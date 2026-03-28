import PageClient from './PageClient'

export const metadata = {
  title: 'Savings Interest Calculator — Earn More on Your Money',
  description: 'Calculate interest earnings on savings accounts, CDs, and money market accounts. Compare rates and see how compounding works.',
  alternates: { canonical: 'https://www.freefincalc.net/savings-interest-calculator' },
  openGraph: {
    title: 'Savings Interest Calculator — Earn More on Your Money',
    description: 'Free Savings Interest Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
    url: 'https://www.freefincalc.net/savings-interest-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
