import PageClient from './PageClient'

export const metadata = {
  title: 'College Savings Calculator | FreeFinCalc',
  description: 'Free College Savings Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/college-savings-calculator' },
  openGraph: {
    title: 'College Savings Calculator | FreeFinCalc',
    description: 'Free College Savings Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
    url: 'https://freefincalc.net/college-savings-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
