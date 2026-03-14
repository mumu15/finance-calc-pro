import PageClient from './PageClient'

export const metadata = {
  title: 'Salary to Hourly Calculator | FreeFinCalc',
  description: 'Free Salary to Hourly Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/salary-to-hourly-calculator' },
  openGraph: {
    title: 'Salary to Hourly Calculator | FreeFinCalc',
    description: 'Free Salary to Hourly Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
    url: 'https://www.freefincalc.net/salary-to-hourly-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
