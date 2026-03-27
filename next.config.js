/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/salary-after-tax-calculator/state/:slug', destination: '/salary-after-tax-calculator', permanent: true },
      { source: '/roth-ira-vs-traditional-ira', destination: '/401k-vs-roth-ira', permanent: true },
      { source: '/loan-payoff-calculator', destination: '/loan-payment-calculator', permanent: true },
      { source: '/auto-lease-calculator', destination: '/lease-vs-buy-calculator', permanent: true },
      { source: '/trade-in-calculator', destination: '/car-depreciation-calculator', permanent: true },
      { source: '/salary-after-tax', destination: '/salary-after-tax-calculator', permanent: true },
      { source: '/expense-tracker-calculator', destination: '/budget-planner-calculator', permanent: true },
      { source: '/car-payment-calculator', destination: '/car-loan-calculator', permanent: true },
      { source: '/vehicle-depreciation-calculator', destination: '/car-depreciation-calculator', permanent: true },
      { source: '/financial-independence-calculator', destination: '/fire-calculator', permanent: true },
      { source: '/income-tax-calculator', destination: '/tax-calculator', permanent: true },
      { source: '/investment-calculator', destination: '/investment-return-calculator', permanent: true },
      { source: '/personal-loan', destination: '/personal-loan-calculator', permanent: true },
      { source: '/inventory-turnover-calculator', destination: '/profit-margin-calculator', permanent: true },
      { source: '/revenue-growth-calculator', destination: '/roi-calculator', permanent: true },
      { source: '/gas-mileage-calculator', destination: '/fuel-cost-calculator', permanent: true },
      { source: '/pricing-calculator', destination: '/markup-calculator', permanent: true },
      { source: '/road-trip-cost-calculator', destination: '/fuel-cost-calculator', permanent: true },
      { source: '/credit-score-calculator', destination: '/credit-utilization-calculator', permanent: true },
    ]
  },
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  {source:"/personal-loan",destination:"/personal-loan-calculator",permanent:true},{source:"/income-tax-calculator",destination:"/tax-calculator",permanent:true},{source:"/inventory-turnover-calculator",destination:"/accounts-receivable-calculator",permanent:true},{source:"/revenue-growth-calculator",destination:"/roi-calculator",permanent:true},{source:"/gas-mileage-calculator",destination:"/fuel-cost-calculator",permanent:true},{source:"/pricing-calculator",destination:"/markup-calculator",permanent:true},{source:"/road-trip-cost-calculator",destination:"/fuel-cost-calculator",permanent:true},{source:"/credit-score-calculator",destination:"/credit-utilization-calculator",permanent:true}]},
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/(.*)\\.(js|css|woff2|ico|svg|png|jpg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
}

module.exports = nextConfig
