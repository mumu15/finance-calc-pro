export default function sitemap() {
  const baseUrl = 'https://www.freefincalc.net'
  const pages = [
    '','/mortgage-calculator','/loan-calculator','/compound-interest',
    '/savings-calculator','/retirement-calculator','/tax-calculator',
    '/debt-payoff-calculator','/emergency-fund-calculator','/budget-calculator',
    '/net-worth-calculator','/rent-vs-buy-calculator','/inflation-calculator',
    '/blog',
    '/blog/how-to-calculate-mortgage-payment',
    '/blog/how-to-pay-off-debt-fast',
    '/blog/what-is-compound-interest',
    '/blog/how-much-to-save-for-retirement',
    '/blog/how-to-build-emergency-fund',
    '/blog/debt-snowball-vs-avalanche',
    '/blog/how-to-create-monthly-budget',
    '/blog/how-to-calculate-net-worth',
    '/blog/rent-vs-buy-home',
    '/blog/how-does-inflation-affect-savings',
    '/blog/how-to-calculate-loan-payment',
    '/blog/how-to-lower-tax-bill',
    '/about','/contact','/privacy-policy',
  ]
  return pages.map(page => ({
    url: baseUrl + page,
    lastModified: new Date(),
    changeFrequency: page.startsWith('/blog') ? 'weekly' : 'monthly',
    priority: page === '' ? 1 : page.startsWith('/blog') ? 0.7 : 0.8,
  }))
}
