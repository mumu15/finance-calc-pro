import PageClient from './PageClient'

export const metadata = {
  title: 'Overtime Calculator | FreeFinCalc',
  description: 'Free Overtime Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/overtime-calculator' },
  openGraph: {
    title: 'Overtime Calculator | FreeFinCalc',
    description: 'Free Overtime Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
    url: 'https://www.freefincalc.net/overtime-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
