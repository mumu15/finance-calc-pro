import PageClient from './PageClient'

export const metadata = {
  title: 'Net Pay Calculator | FreeFinCalc',
  description: 'Free Net Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/net-pay-calculator' },
  openGraph: {
    title: 'Net Pay Calculator | FreeFinCalc',
    description: 'Free Net Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
    url: 'https://freefincalc.net/net-pay-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
