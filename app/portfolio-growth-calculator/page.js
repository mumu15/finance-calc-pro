import PageClient from './PageClient'

export const metadata = {
  title: 'Portfolio Growth Calculator | FreeFinCalc',
  description: 'Free Portfolio Growth Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/portfolio-growth-calculator' },
  openGraph: {
    title: 'Portfolio Growth Calculator | FreeFinCalc',
    description: 'Free Portfolio Growth Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/portfolio-growth-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
