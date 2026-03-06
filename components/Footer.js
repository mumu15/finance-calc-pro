import Link from 'next/link'

const YEAR = new Date().getFullYear()

// All 100 calculators organised for footer columns
const FOOTER_COLS = [
  {
    heading: 'Loan Calculators',
    links: [
      ['Mortgage Calculator', '/mortgage-calculator'],
      ['Loan Payment Calculator', '/loan-payment-calculator'],
      ['Personal Loan Calculator', '/personal-loan-calculator'],
      ['Car Loan Calculator', '/car-loan-calculator'],
      ['Business Loan Calculator', '/business-loan-calculator'],
      ['Student Loan Calculator', '/student-loan-calculator'],
      ['Truck Loan Calculator', '/truck-loan-calculator'],
      ['Boat Loan Calculator', '/boat-loan-calculator'],
    ],
  },
  {
    heading: 'Debt Calculators',
    links: [
      ['Credit Card Payoff', '/credit-card-payoff-calculator'],
      ['Debt Snowball Calculator', '/debt-snowball-calculator'],
      ['Debt Avalanche Calculator', '/debt-avalanche-calculator'],
      ['Debt Consolidation', '/debt-consolidation-calculator'],
      ['Balance Transfer Calc', '/balance-transfer-calculator'],
      ['Debt Payoff Time', '/debt-payoff-time-calculator'],
      ['Credit Utilization', '/credit-utilization-calculator'],
      ['Total Debt Calculator', '/total-debt-calculator'],
    ],
  },
  {
    heading: 'Investment Calculators',
    links: [
      ['Compound Interest', '/compound-interest'],
      ['Investment Return', '/investment-return-calculator'],
      ['Stock Profit Calculator', '/stock-profit-calculator'],
      ['Dividend Calculator', '/dividend-calculator'],
      ['FIRE Calculator', '/fire-retirement-calculator'],
      ['Retirement Savings', '/retirement-savings-calculator'],
      ['Portfolio Growth', '/portfolio-growth-calculator'],
      ['Dollar Cost Averaging', '/dollar-cost-averaging-calculator'],
    ],
  },
  {
    heading: 'Salary Calculators',
    links: [
      ['Salary After Tax', '/salary-after-tax-calculator'],
      ['Hourly to Salary', '/hourly-to-salary-calculator'],
      ['Salary to Hourly', '/salary-to-hourly-calculator'],
      ['Overtime Pay Calculator', '/overtime-pay-calculator'],
      ['Freelance Rate Calculator', '/freelance-rate-calculator'],
      ['Contractor Pay Calculator', '/contractor-pay-calculator'],
      ['Commission Calculator', '/commission-calculator'],
      ['Take Home Pay Calculator', '/take-home-pay-calculator'],
    ],
  },
  {
    heading: 'Tax Calculators',
    links: [
      ['Income Tax Calculator', '/income-tax-calculator'],
      ['Self-Employment Tax', '/self-employment-tax-calculator'],
      ['Capital Gains Tax', '/capital-gains-tax-calculator'],
      ['Sales Tax Calculator', '/sales-tax-calculator'],
      ['VAT Calculator', '/vat-calculator'],
      ['Payroll Tax Calculator', '/payroll-tax-calculator'],
      ['Tax Refund Calculator', '/tax-refund-calculator'],
      ['Property Tax Calculator', '/property-tax-calculator'],
    ],
  },
  {
    heading: 'Business Calculators',
    links: [
      ['Profit Margin Calculator', '/profit-margin-calculator'],
      ['Break-Even Calculator', '/break-even-calculator'],
      ['ROI Calculator', '/roi-calculator'],
      ['Startup Cost Calculator', '/startup-cost-calculator'],
      ['Revenue Growth Calculator', '/revenue-growth-calculator'],
      ['Pricing Calculator', '/pricing-calculator'],
      ['Business Valuation', '/business-valuation-calculator'],
      ['Inventory Turnover', '/inventory-turnover-calculator'],
    ],
  },
  {
    heading: 'Budget & Money',
    links: [
      ['Monthly Budget Calculator', '/budget-calculator'],
      ['Emergency Fund Calculator', '/emergency-fund-calculator'],
      ['Net Worth Calculator', '/net-worth-calculator'],
      ['Debt-to-Income Calculator', '/debt-to-income-calculator'],
      ['Savings Goal Calculator', '/savings-calculator'],
      ['Financial Independence', '/financial-independence-calculator'],
      ['Inflation Calculator', '/inflation-calculator'],
      ['Expense Tracker', '/expense-tracker-calculator'],
    ],
  },
  {
    heading: 'Vehicle Calculators',
    links: [
      ['Car Payment Calculator', '/car-payment-calculator'],
      ['Auto Loan Calculator', '/auto-loan-calculator'],
      ['Fuel Cost Calculator', '/fuel-cost-calculator'],
      ['Gas Mileage Calculator', '/gas-mileage-calculator'],
      ['Lease vs Buy Calculator', '/lease-vs-buy-calculator'],
      ['Vehicle Depreciation', '/vehicle-depreciation-calculator'],
      ['Road Trip Cost', '/road-trip-cost-calculator'],
      ['EV Charging Cost', '/ev-charging-cost-calculator'],
    ],
  },
]

const COMPANY_LINKS = [
  ['About Us', '/about'],
  ['Contact', '/contact'],
  ['Blog', '/blog'],
  ['Privacy Policy', '/privacy-policy'],
  ['Sitemap', '/sitemap.xml'],
]

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      style={{
        borderTop: '1px solid rgba(240,200,66,0.1)',
        background: 'rgba(0,0,0,0.3)',
        paddingTop: '56px',
        paddingBottom: '32px',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Top: Brand + Nav columns ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))',
          gap: '32px 24px',
          marginBottom: '48px',
        }}>

          {/* Brand block */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link
              href="/"
              aria-label="FreeFinCalc home"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '14px',
                textDecoration: 'none',
              }}
            >
              <div style={{
                width: '32px', height: '32px',
                borderRadius: '9px',
                background: 'linear-gradient(135deg,#f0c842,#d4a017)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '900', fontSize: '14px', color: '#0a0f1e',
                flexShrink: 0,
              }}>F</div>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '17px',
                color: '#f1f5f9',
                letterSpacing: '-0.3px',
              }}>
                FreeFinCalc<span style={{ color: '#f0c842' }}>.net</span>
              </span>
            </Link>

            <p style={{ color: '#475569', fontSize: '12.5px', lineHeight: '1.6', marginBottom: '14px' }}>
              100 free professional financial calculators in 40+ currencies.
              No sign up. No ads. Just instant answers.
            </p>

            <div style={{
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(240,200,66,0.06)',
              border: '1px solid rgba(240,200,66,0.12)',
              fontSize: '11.5px',
              color: '#64748b',
              lineHeight: '1.5',
            }}>
              🌍 Currency auto-detected<br />
              📄 PDF download on every calc<br />
              ⚠ Not financial advice
            </div>

            {/* Company links */}
            <nav aria-label="Company navigation" style={{ marginTop: '18px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {COMPANY_LINKS.map(([name, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      style={{ color: '#475569', fontSize: '12.5px', textDecoration: 'none' }}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Calculator columns */}
          {FOOTER_COLS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 style={{
                color: '#94a3b8',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                {col.heading}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {col.links.map(([name, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      style={{
                        color: '#475569',
                        fontSize: '12.5px',
                        textDecoration: 'none',
                        lineHeight: '1.4',
                        display: 'block',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#f0c842')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: '1px solid rgba(240,200,66,0.08)',
          paddingTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}>
          <p style={{ color: '#334155', fontSize: '12px' }}>
            © {YEAR} FreeFinCalc.net — All rights reserved.
            Results are for informational purposes only. Not financial advice.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[['Privacy', '/privacy-policy'], ['Contact', '/contact'], ['Blog', '/blog'], ['About', '/about']].map(([n, h]) => (
              <Link key={h} href={h} style={{ color: '#334155', fontSize: '12px', textDecoration: 'none' }}>
                {n}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
