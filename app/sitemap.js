export default function sitemap() {
  const baseUrl = 'https://www.freefincalc.net'

  const calculators = [
    '/mortgage-calculator',
    '/loan-calculator',
    '/compound-interest',
    '/savings-calculator',
    '/retirement-calculator',
    '/tax-calculator',
  ]

  const infoPages = [
    '/about',
    '/contact',
    '/privacy-policy',
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...calculators.map(page => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    })),
    ...infoPages.map(page => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    })),
  ]
}