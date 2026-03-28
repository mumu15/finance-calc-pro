import PageClient from './PageClient'

export const metadata = {
  title: 'Net Worth Calculator 2026 — Are You Above Average?',
  description: 'Calculate your net worth in 60 seconds. See how you compare to the average American by age. Free, instant, no sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net/net-worth-calculator' },
  openGraph: {
    title: 'Net Worth Calculator 2026 — Are You Above Average?',
    description: 'Free Net Worth Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/net-worth-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
