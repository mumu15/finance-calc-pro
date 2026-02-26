// redeploy trigger 123

export default function sitemap() {
  const baseUrl = 'https://www.freefincalc.net'
  const pages = [
    '',
    '/mortgage-calculator',
    '/loan-calculator',
    '/compound-interest',
    '/savings-calculator',
    '/retirement-calculator',
    '/tax-calculator',
  ]

  return pages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page === '' ? 1 : 0.8,
  }))
}