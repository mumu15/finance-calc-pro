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
    '/debt-payoff-calculator',
    '/emergency-fund-calculator',
    '/budget-calculator',
    '/net-worth-calculator',
    '/rent-vs-buy-calculator',
    '/inflation-calculator',
    '/about',
    '/contact',
    '/privacy-policy',
  ]
  return pages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page === '' ? 1 : 0.8,
  }))
}
