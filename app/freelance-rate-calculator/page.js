import PageClient from './PageClient'

export const metadata = {
  title: 'Freelance Rate Calculator — What Should You Charge?',
  description: 'Calculate your ideal freelance hourly rate based on expenses, desired salary, and billable hours. Stop undercharging.',
  alternates: { canonical: 'https://www.freefincalc.net/freelance-rate-calculator' },
  openGraph: {
    title: 'Freelance Rate Calculator — What Should You Charge?',
    description: 'Free Freelance Rate Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/freelance-rate-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
