// ── PASTE THIS metadata export into app/layout.js (replace existing metadata) ──

export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: {
    default: 'FreeFinCalc — 100+ Free Financial Calculators',
    template: '%s | FreeFinCalc',
  },
  description: 'Free financial calculators for mortgage, tax, retirement, investing, budgeting and more. 100+ calculators, 40+ currencies, no sign-up required.',
  keywords: ['financial calculator', 'mortgage calculator', 'tax calculator', 'retirement calculator', 'investment calculator', 'free finance tools'],
  authors: [{ name: 'FreeFinCalc' }],
  creator: 'FreeFinCalc',
  publisher: 'FreeFinCalc',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.freefincalc.net',
    siteName: 'FreeFinCalc',
    title: 'FreeFinCalc — 100+ Free Financial Calculators',
    description: 'Free financial calculators for mortgage, tax, retirement, investing and budgeting. No sign-up required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeFinCalc — 100+ Free Financial Calculators',
    description: 'Free financial calculators. 40+ currencies. No sign-up.',
  },
  alternates: {
    canonical: 'https://www.freefincalc.net',
  },
}
