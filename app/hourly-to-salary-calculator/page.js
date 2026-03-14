import PageClient from './PageClient'

export const metadata = {
  title: 'Hourly to Salary Calculator | FreeFinCalc',
  description: 'Free Hourly to Salary Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/hourly-to-salary-calculator' },
  openGraph: {
    title: 'Hourly to Salary Calculator | FreeFinCalc',
    description: 'Free Hourly to Salary Calculator — calculate your take-home pay, hourly rate, and tax withholdings. No sign-up.',
    url: 'https://freefincalc.net/hourly-to-salary-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
