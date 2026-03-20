/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects(){return[{source:"/investment-calculator",destination:"/investment-return-calculator",permanent:true},{source:"/personal-loan",destination:"/personal-loan-calculator",permanent:true},{source:"/income-tax-calculator",destination:"/tax-calculator",permanent:true},{source:"/inventory-turnover-calculator",destination:"/accounts-receivable-calculator",permanent:true},{source:"/revenue-growth-calculator",destination:"/roi-calculator",permanent:true},{source:"/gas-mileage-calculator",destination:"/fuel-cost-calculator",permanent:true},{source:"/pricing-calculator",destination:"/markup-calculator",permanent:true},{source:"/road-trip-cost-calculator",destination:"/fuel-cost-calculator",permanent:true},{source:"/credit-score-calculator",destination:"/credit-utilization-calculator",permanent:true}]},
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
};
module.exports = nextConfig;
