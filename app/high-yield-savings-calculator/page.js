import PageClient from './PageClient'

export const metadata = {
  title: 'High Yield Savings Calculator | FreeFinCalc',
  description: 'Free High Yield Savings Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/high-yield-savings-calculator' },
  openGraph: {
    title: 'High Yield Savings Calculator | FreeFinCalc',
    description: 'Free High Yield Savings Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
    url: 'https://www.freefincalc.net/high-yield-savings-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
