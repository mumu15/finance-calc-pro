import PageClient from './PageClient'

export const metadata = {
  title: 'Extra Payment Calculator | FreeFinCalc',
  description: 'Free Extra Payment Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/extra-payment-calculator' },
  openGraph: {
    title: 'Extra Payment Calculator | FreeFinCalc',
    description: 'Free Extra Payment Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
    url: 'https://freefincalc.net/extra-payment-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
