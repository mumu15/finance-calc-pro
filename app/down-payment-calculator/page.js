import PageClient from './PageClient'

export const metadata = {
  title: 'Down Payment Calculator | FreeFinCalc',
  description: 'Free Down Payment Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/down-payment-calculator' },
  openGraph: {
    title: 'Down Payment Calculator | FreeFinCalc',
    description: 'Free Down Payment Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
    url: 'https://www.freefincalc.net/down-payment-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
