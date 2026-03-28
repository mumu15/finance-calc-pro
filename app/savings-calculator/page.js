import PageClient from './PageClient'

export const metadata = {
  title: 'Savings Calculator 2026 — How Much Will You Have?',
  description: 'Calculate how your savings grow over time with interest. Enter deposits, rate, and time. See monthly breakdown. Free calculator.',
  alternates: { canonical: 'https://www.freefincalc.net/savings-calculator' },
  openGraph: {
    title: 'Savings Calculator 2026 — How Much Will You Have?',
    description: 'Free Savings Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
    url: 'https://www.freefincalc.net/savings-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
