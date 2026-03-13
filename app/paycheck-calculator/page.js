import PageClient from './PageClient'

export const metadata = {
  title: 'Paycheck Calculator | FreeFinCalc',
  description: 'Free Paycheck Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/paycheck-calculator' },
  openGraph: {
    title: 'Paycheck Calculator | FreeFinCalc',
    description: 'Free Paycheck Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
    url: 'https://freefincalc.net/paycheck-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
