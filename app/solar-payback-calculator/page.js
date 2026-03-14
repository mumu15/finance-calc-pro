import PageClient from './PageClient'

export const metadata = {
  title: 'Solar Payback Calculator | FreeFinCalc',
  description: 'Free Solar Payback Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/solar-payback-calculator' },
  openGraph: {
    title: 'Solar Payback Calculator | FreeFinCalc',
    description: 'Free Solar Payback Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
    url: 'https://www.freefincalc.net/solar-payback-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
