// app/pet-cost-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Pet Cost Calculator',
  description: 'Calculate annual and lifetime costs of owning a dog or cat. Estimate food, vet, grooming and insurance expenses.',
  openGraph: {
    title: 'Pet Cost Calculator',
    description: 'Calculate annual and lifetime costs of owning a dog or cat. Estimate food, vet, grooming and insurance expenses.',
    url: 'https://freefincalc.net/pet-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Cost Calculator',
    description: 'Calculate annual and lifetime costs of owning a dog or cat. Estimate food, vet, grooming and insurance expenses.',
  },
}

export default function Layout({ children }) {
  return children
}
