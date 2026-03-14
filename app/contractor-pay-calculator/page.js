import PageClient from './PageClient'

export const metadata = {
  title: 'Contractor Pay Calculator | FreeFinCalc',
  description: 'Free Contractor Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/contractor-pay-calculator' },
  openGraph: {
    title: 'Contractor Pay Calculator | FreeFinCalc',
    description: 'Free Contractor Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
    url: 'https://www.freefincalc.net/contractor-pay-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
