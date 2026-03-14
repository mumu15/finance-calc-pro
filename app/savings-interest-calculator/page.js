import PageClient from './PageClient'

export const metadata = {
  title: 'Savings Interest Calculator | FreeFinCalc',
  description: 'Free Savings Interest Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/savings-interest-calculator' },
  openGraph: {
    title: 'Savings Interest Calculator | FreeFinCalc',
    description: 'Free Savings Interest Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
    url: 'https://www.freefincalc.net/savings-interest-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
