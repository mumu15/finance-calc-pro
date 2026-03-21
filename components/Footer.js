'use client'\nimport Link from 'next/link'

const YEAR = new Date().getFullYear()

const COLS = [
  { h: 'Mortgage & Home', links: [
    ['Mortgage Calculator', '/mortgage-calculator'],
    ['Amortization Calculator', '/amortization-calculator'],
    ['Refinance Calculator', '/refinance-calculator'],
    ['Home Affordability', '/home-affordability-calculator'],
    ['Property Tax Calculator', '/property-tax-calculator'],
    ['Rent vs Buy Calculator', '/rent-vs-buy-calculator'],
    ['Down Payment Calculator', '/down-payment-calculator'],
    ['HELOC Calculator', '/heloc-calculator'],
  ]},
  { h: 'Debt & Credit', links: [
    ['Credit Card Payoff', '/credit-card-payoff-calculator'],
    ['Debt Snowball Calculator', '/debt-snowball-calculator'],
    ['Debt Avalanche Calculator', '/debt-avalanche-calculator'],
    ['Debt Consolidation', '/debt-consolidation-calculator'],
    ['Balance Transfer', '/balance-transfer-calculator'],
    ['Credit Utilization', '/credit-utilization-calculator'],
    ['Debt Payoff Calculator', '/debt-payoff-calculator'],
    ['Debt-to-Income', '/debt-to-income-calculator'],
  ]},
  { h: 'Loans', links: [
    ['Personal Loan', '/personal-loan-calculator'],
    ['Student Loan', '/student-loan-calculator'],
    ['Car Loan Calculator', '/car-loan-calculator'],
    ['Business Loan', '/business-loan-calculator'],
    ['SBA Loan Calculator', '/sba-loan-calculator'],
    ['Equipment Loan', '/equipment-loan-calculator'],
    ['APR Calculator', '/apr-calculator'],
    ['Loan Comparison', '/loan-comparison-calculator'],
  ]},
  { h: 'Retirement', links: [
    ['Retirement Calculator', '/retirement-calculator'],
    ['401k Calculator', '/401k-calculator'],
    ['Roth IRA Calculator', '/roth-ira-calculator'],
    ['Social Security', '/social-security-calculator'],
    ['FIRE Calculator', '/fire-calculator'],
    ['Pension Calculator', '/pension-calculator'],
    ['Annuity Calculator', '/annuity-calculator'],
    ['RMD Calculator', '/rmd-calculator'],
  ]},
  { h: 'Tax & Salary', links: [
    ['Income Tax Calculator', '/tax-calculator'],
    ['Salary After Tax', '/salary-after-tax-calculator'],
    ['Paycheck Calculator', '/paycheck-calculator'],
    ['Capital Gains Tax', '/capital-gains-tax-calculator'],
    ['Self-Employment Tax', '/self-employment-tax-calculator'],
    ['Hourly to Salary', '/hourly-to-salary-calculator'],
    ['Freelance Rate', '/freelance-rate-calculator'],
    ['Overtime Pay', '/overtime-pay-calculator'],
  ]},
  { h: 'Investing & Savings', links: [
    ['Investment Return', '/investment-return-calculator'],
    ['Portfolio Growth', '/portfolio-growth-calculator'],
    ['Dividend Calculator', '/dividend-calculator'],
    ['Stock Profit', '/stock-profit-calculator'],
    ['CD Calculator', '/cd-calculator'],
    ['Savings Goal', '/savings-goal-calculator'],
    ['Emergency Fund', '/emergency-fund-calculator'],
    ['Dollar Cost Averaging', '/dollar-cost-averaging-calculator'],
  ]},
  { h: 'Business', links: [
    ['Profit Margin', '/profit-margin-calculator'],
    ['Break-Even Calculator', '/break-even-calculator'],
    ['ROI Calculator', '/roi-calculator'],
    ['Business Valuation', '/business-valuation-calculator'],
    ['Cash Flow Calculator', '/cash-flow-calculator'],
    ['Startup Cost', '/startup-cost-calculator'],
    ['Markup Calculator', '/markup-calculator'],
    ['Invoice Calculator', '/invoice-calculator'],
  ]},
  { h: 'Comparisons', links: [
    ['401k vs Roth IRA', '/401k-vs-roth-ira'],
    ['15 vs 30 Year Mortgage', '/15-vs-30-year-mortgage'],
    ['Snowball vs Avalanche', '/debt-snowball-vs-avalanche'],
    ['Fixed vs ARM', '/fixed-vs-adjustable-mortgage'],
    ['CD vs High-Yield Savings', '/cd-vs-high-yield-savings'],
    ['HSA vs FSA', '/hsa-vs-fsa'],
    ['Lease vs Buy', '/lease-vs-buy-calculator'],
    ['Rent vs Buy', '/rent-vs-buy-calculator'],
  ]},
]

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ borderTop: '1px solid rgba(240,200,66,0.1)', background: 'rgba(0,0,0,0.3)', paddingTop: 56, paddingBottom: 32 }}>
      <div className="max-w-7xl mx-auto px-4">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '32px 24px', marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14, textDecoration: 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, #f0c842, #d4a017)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, color: '#0a0f1e' }}>F</div>
              <span style={{ fontSize: 17, color: '#f1f5f9', fontWeight: 900, letterSpacing: '-0.3px' }}>
                FreeFinCalc<span style={{ color: '#f0c842' }}>.net</span>
              </span>
            </Link>
            <p style={{ color: '#475569', fontSize: 12.5, lineHeight: 1.6, marginBottom: 14 }}>
              470+ free financial calculators in 40+ currencies. No sign up required.
            </p>
            <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(240,200,66,0.06)', border: '1px solid rgba(240,200,66,0.12)', fontSize: 11.5, color: '#64748b', lineHeight: 1.8 }}>
              Currency auto-detected<br />
              PDF download on every calc<br />
              Not financial advice
            </div>
            <nav aria-label="Company" style={{ marginTop: 18 }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[['About Us', '/about'], ['Contact', '/contact'], ['Blog', '/blog'], ['Privacy Policy', '/privacy-policy']].map(([n, h]) => (
                  <li key={h}><Link href={h} style={{ color: '#64748b', textDecoration: 'none', fontSize: 12.5, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#f0c842'} onMouseOut={e => e.target.style.color = '#64748b'}>{n}</Link></li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Columns */}
          {COLS.map(col => (
            <nav key={col.h} aria-label={col.h}>
              <h3 style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>
                {col.h}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {col.links.map(([n, h]) => (
                  <li key={h}><Link href={h} style={{ color: '#64748b', textDecoration: 'none', fontSize: 12.5, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#f0c842'} onMouseOut={e => e.target.style.color = '#64748b'}>{n}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(240,200,66,0.08)', paddingTop: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <p style={{ color: '#334155', fontSize: 12 }}>
            &copy; {YEAR} FreeFinCalc.net. All rights reserved. Not financial advice.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Privacy', '/privacy-policy'], ['Contact', '/contact'], ['Blog', '/blog'], ['About', '/about']].map(([n, h]) => (
              <Link key={h} href={h} style={{ color: '#475569', textDecoration: 'none', fontSize: 12, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#94a3b8'} onMouseOut={e => e.target.style.color = '#475569'}>{n}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
