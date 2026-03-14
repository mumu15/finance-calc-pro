import PageClient from './PageClient'

export const metadata = {
  title: 'Savings Calculator | FreeFinCalc',
  description: 'Free Savings Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/savings-calculator' },
  openGraph: {
    title: 'Savings Calculator | FreeFinCalc',
    description: 'Free Savings Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
    url: 'https://www.freefincalc.net/savings-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
