import PageClient from './PageClient'

export const metadata = {
  title: 'Overtime Pay Calculator | FreeFinCalc',
  description: 'Free Overtime Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/overtime-pay-calculator' },
  openGraph: {
    title: 'Overtime Pay Calculator | FreeFinCalc',
    description: 'Free Overtime Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
    url: 'https://www.freefincalc.net/overtime-pay-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
