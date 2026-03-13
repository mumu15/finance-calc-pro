import PageClient from './PageClient'

export const metadata = {
  title: 'Take Home Pay Calculator | FreeFinCalc',
  description: 'Free Take Home Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/take-home-pay-calculator' },
  openGraph: {
    title: 'Take Home Pay Calculator | FreeFinCalc',
    description: 'Free Take Home Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
    url: 'https://freefincalc.net/take-home-pay-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
