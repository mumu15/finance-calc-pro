import PageClient from './PageClient'

export const metadata = {
  title: 'Savings Growth Calculator | FreeFinCalc',
  description: 'Free Savings Growth Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/savings-growth-calculator' },
  openGraph: {
    title: 'Savings Growth Calculator | FreeFinCalc',
    description: 'Free Savings Growth Calculator — see how your savings grow over time with interest and deposits. No sign-up.',
    url: 'https://www.freefincalc.net/savings-growth-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
