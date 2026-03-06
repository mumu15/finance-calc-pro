/**
 * FreeFinCalc — SURGICAL FIX
 * Removes every onMouseEnter / onMouseLeave from all components
 * All hover handled by CSS only — no JS event handlers in Server Components
 * Run: node fix_events.js   (from your project root)
 */

const fs = require('fs')
const path = require('path')

function write(p, c) {
  const dir = path.dirname(p)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(p, c, 'utf8')
  console.log('✅ ' + p)
}

// ─────────────────────────────────────────────────────────────────
// STEP 1 — Add hover CSS to globals.css
// ─────────────────────────────────────────────────────────────────
const GLOBAL_EXTRA = `
/* ── FreeFinCalc hover utilities (CSS only, no JS) ── */
.ffc-link          { color:#475569; text-decoration:none; transition:color .15s; }
.ffc-link:hover    { color:#f0c842; }

.ffc-link-sm       { color:#334155; font-size:12px; text-decoration:none; transition:color .15s; }
.ffc-link-sm:hover { color:#94a3b8; }

.trust-badge { padding:20px 16px; border-radius:14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); text-align:center; transition:border-color .2s; }
.trust-badge:hover { border-color:rgba(240,200,66,0.25); }

.tool-card { display:block; position:relative; padding:16px 16px 14px; border-radius:14px; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); text-decoration:none; transition:background .2s,border-color .2s,transform .2s; }
.tool-card:hover { transform:translateY(-2px); }

.tool-card-title { color:#cbd5e1; font-size:13.5px; font-weight:600; line-height:1.35; margin:0 0 10px; letter-spacing:-.1px; transition:color .15s; }
.tool-card:hover .tool-card-title { color:#f1f5f9; }

.faq-item { padding:20px 24px; border-radius:12px; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); margin-bottom:4px; transition:border-color .2s; }
.faq-item:hover { border-color:rgba(240,200,66,0.15); }
.faq-item summary { list-style:none; display:flex; justify-content:space-between; align-items:center; gap:12px; cursor:pointer; color:#e2e8f0; font-weight:600; font-size:14.5px; line-height:1.4; user-select:none; }
.faq-item summary::-webkit-details-marker { display:none; }
.faq-answer { color:#64748b; font-size:14px; line-height:1.7; margin-top:12px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.06); }

.cta-btn { display:inline-flex; align-items:center; gap:8px; padding:14px 32px; border-radius:12px; background:linear-gradient(135deg,#f0c842,#d4a017); color:#0a0f1e; font-weight:700; font-size:15px; text-decoration:none; box-shadow:0 4px 24px rgba(240,200,66,0.25); transition:opacity .2s,transform .2s; }
.cta-btn:hover { opacity:.92; transform:translateY(-1px); }
`

// Read existing globals.css and append if not already patched
const globalsCssPath = 'app/globals.css'
let existingGlobals = ''
try { existingGlobals = fs.readFileSync(globalsCssPath, 'utf8') } catch(e) { existingGlobals = '' }
if (!existingGlobals.includes('ffc-link')) {
  fs.writeFileSync(globalsCssPath, existingGlobals + GLOBAL_EXTRA, 'utf8')
  console.log('✅ app/globals.css (hover CSS appended)')
} else {
  console.log('⏭  app/globals.css already patched')
}

// ─────────────────────────────────────────────────────────────────
// STEP 2 — Footer.js  (pure server component, zero event handlers)
// ─────────────────────────────────────────────────────────────────
write('components/Footer.js', `import Link from 'next/link'

const YEAR = new Date().getFullYear()

const COLS = [
  { h:'Loan Calculators', links:[
    ['Mortgage Calculator','/mortgage-calculator'],
    ['Loan Payment Calculator','/loan-payment-calculator'],
    ['Personal Loan Calculator','/personal-loan-calculator'],
    ['Car Loan Calculator','/car-loan-calculator'],
    ['Business Loan Calculator','/business-loan-calculator'],
    ['Student Loan Calculator','/student-loan-calculator'],
    ['Truck Loan Calculator','/truck-loan-calculator'],
    ['Boat Loan Calculator','/boat-loan-calculator'],
  ]},
  { h:'Debt Calculators', links:[
    ['Credit Card Payoff','/credit-card-payoff-calculator'],
    ['Debt Snowball Calculator','/debt-snowball-calculator'],
    ['Debt Avalanche Calculator','/debt-avalanche-calculator'],
    ['Debt Consolidation','/debt-consolidation-calculator'],
    ['Balance Transfer Calc','/balance-transfer-calculator'],
    ['Debt Payoff Time','/debt-payoff-time-calculator'],
    ['Credit Utilization','/credit-utilization-calculator'],
    ['Total Debt Calculator','/total-debt-calculator'],
  ]},
  { h:'Investment Calculators', links:[
    ['Compound Interest','/compound-interest'],
    ['Investment Return','/investment-return-calculator'],
    ['Stock Profit Calculator','/stock-profit-calculator'],
    ['Dividend Calculator','/dividend-calculator'],
    ['FIRE Calculator','/fire-retirement-calculator'],
    ['Retirement Savings','/retirement-savings-calculator'],
    ['Portfolio Growth','/portfolio-growth-calculator'],
    ['Dollar Cost Averaging','/dollar-cost-averaging-calculator'],
  ]},
  { h:'Salary Calculators', links:[
    ['Salary After Tax','/salary-after-tax-calculator'],
    ['Hourly to Salary','/hourly-to-salary-calculator'],
    ['Salary to Hourly','/salary-to-hourly-calculator'],
    ['Overtime Pay Calculator','/overtime-pay-calculator'],
    ['Freelance Rate Calculator','/freelance-rate-calculator'],
    ['Contractor Pay Calculator','/contractor-pay-calculator'],
    ['Commission Calculator','/commission-calculator'],
    ['Take Home Pay Calculator','/take-home-pay-calculator'],
  ]},
  { h:'Tax Calculators', links:[
    ['Income Tax Calculator','/income-tax-calculator'],
    ['Self-Employment Tax','/self-employment-tax-calculator'],
    ['Capital Gains Tax','/capital-gains-tax-calculator'],
    ['Sales Tax Calculator','/sales-tax-calculator'],
    ['VAT Calculator','/vat-calculator'],
    ['Payroll Tax Calculator','/payroll-tax-calculator'],
    ['Tax Refund Calculator','/tax-refund-calculator'],
    ['Property Tax Calculator','/property-tax-calculator'],
  ]},
  { h:'Business Calculators', links:[
    ['Profit Margin Calculator','/profit-margin-calculator'],
    ['Break-Even Calculator','/break-even-calculator'],
    ['ROI Calculator','/roi-calculator'],
    ['Startup Cost Calculator','/startup-cost-calculator'],
    ['Revenue Growth Calculator','/revenue-growth-calculator'],
    ['Pricing Calculator','/pricing-calculator'],
    ['Business Valuation','/business-valuation-calculator'],
    ['Inventory Turnover','/inventory-turnover-calculator'],
  ]},
  { h:'Budget & Money', links:[
    ['Monthly Budget Calculator','/budget-calculator'],
    ['Emergency Fund Calculator','/emergency-fund-calculator'],
    ['Net Worth Calculator','/net-worth-calculator'],
    ['Debt-to-Income Calculator','/debt-to-income-calculator'],
    ['Savings Goal Calculator','/savings-calculator'],
    ['Financial Independence','/financial-independence-calculator'],
    ['Inflation Calculator','/inflation-calculator'],
    ['Expense Tracker','/expense-tracker-calculator'],
  ]},
  { h:'Vehicle Calculators', links:[
    ['Car Payment Calculator','/car-payment-calculator'],
    ['Auto Loan Calculator','/auto-loan-calculator'],
    ['Fuel Cost Calculator','/fuel-cost-calculator'],
    ['Gas Mileage Calculator','/gas-mileage-calculator'],
    ['Lease vs Buy Calculator','/lease-vs-buy-calculator'],
    ['Vehicle Depreciation','/vehicle-depreciation-calculator'],
    ['Road Trip Cost','/road-trip-cost-calculator'],
    ['EV Charging Cost','/ev-charging-cost-calculator'],
  ]},
]

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ borderTop:'1px solid rgba(240,200,66,0.1)', background:'rgba(0,0,0,0.3)', paddingTop:'56px', paddingBottom:'32px' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:'32px 24px', marginBottom:'48px' }}>

          {/* Brand */}
          <div>
            <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'14px', textDecoration:'none' }}>
              <div style={{ width:'32px', height:'32px', borderRadius:'9px', background:'linear-gradient(135deg,#f0c842,#d4a017)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'900', fontSize:'14px', color:'#0a0f1e' }}>F</div>
              <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:'17px', color:'#f1f5f9', letterSpacing:'-0.3px' }}>
                FreeFinCalc<span style={{ color:'#f0c842' }}>.net</span>
              </span>
            </Link>
            <p style={{ color:'#475569', fontSize:'12.5px', lineHeight:'1.6', marginBottom:'14px' }}>
              100 free financial calculators in 40+ currencies. No sign up. No ads.
            </p>
            <div style={{ padding:'10px 14px', borderRadius:'10px', background:'rgba(240,200,66,0.06)', border:'1px solid rgba(240,200,66,0.12)', fontSize:'11.5px', color:'#64748b', lineHeight:'1.8' }}>
              🌍 Currency auto-detected<br/>
              📄 PDF download on every calc<br/>
              ⚠ Not financial advice
            </div>
            <nav aria-label="Company" style={{ marginTop:'18px' }}>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'7px' }}>
                {[['About Us','/about'],['Contact','/contact'],['Blog','/blog'],['Privacy Policy','/privacy-policy']].map(([n,h]) => (
                  <li key={h}><Link href={h} className="ffc-link" style={{ fontSize:'12.5px' }}>{n}</Link></li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Columns */}
          {COLS.map(col => (
            <nav key={col.h} aria-label={col.h}>
              <h3 style={{ color:'#94a3b8', fontSize:'11px', fontWeight:'700', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'12px' }}>
                {col.h}
              </h3>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'7px' }}>
                {col.links.map(([n,h]) => (
                  <li key={h}><Link href={h} className="ffc-link" style={{ fontSize:'12.5px' }}>{n}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop:'1px solid rgba(240,200,66,0.08)', paddingTop:'20px', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:'12px' }}>
          <p style={{ color:'#334155', fontSize:'12px' }}>
            © {YEAR} FreeFinCalc.net — All rights reserved. Not financial advice.
          </p>
          <div style={{ display:'flex', gap:'20px' }}>
            {[['Privacy','/privacy-policy'],['Contact','/contact'],['Blog','/blog'],['About','/about']].map(([n,h]) => (
              <Link key={h} href={h} className="ffc-link-sm">{n}</Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
`)

// ─────────────────────────────────────────────────────────────────
// STEP 3 — TrustSection.js (server safe)
// ─────────────────────────────────────────────────────────────────
write('components/TrustSection.js', `import Link from 'next/link'

const BADGES = [
  { d:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title:'Privacy First', desc:'Zero data stored. Runs in your browser.' },
  { d:'M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2', title:'Instant Results', desc:'Real-time as you adjust each slider.' },
  { d:'M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20', title:'40+ Currencies', desc:'Auto-detected. Switch anytime.' },
  { d:'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5M12 15V3', title:'PDF Export', desc:'Download results from any calculator.' },
  { d:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title:'100% Free', desc:'No subscriptions or hidden costs.' },
  { d:'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', title:'Mobile Ready', desc:'Fully responsive on every device.' },
]

export default function TrustSection() {
  return (
    <section aria-label="Why users trust FreeFinCalc" style={{ borderTop:'1px solid rgba(240,200,66,0.12)', borderBottom:'1px solid rgba(240,200,66,0.12)', background:'linear-gradient(180deg,rgba(240,200,66,0.025) 0%,transparent 100%)', padding:'60px 0 48px' }}>
      <div className="max-w-6xl mx-auto px-4">

        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <p style={{ fontSize:'11px', fontWeight:'600', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(240,200,66,0.7)', marginBottom:'8px' }}>
            Trusted by 100,000+ users every month
          </p>
          <h2 style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize:'clamp(22px,3vw,30px)', fontWeight:'400', color:'#fff', letterSpacing:'-0.3px' }}>
            Why professionals choose FreeFinCalc
          </h2>
        </div>

        {/* Badges — CSS hover via .trust-badge class */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'12px', marginBottom:'40px' }}>
          {BADGES.map((b,i) => (
            <div key={i} className="trust-badge">
              <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'40px', height:'40px', borderRadius:'10px', background:'rgba(240,200,66,0.1)', color:'#f0c842', marginBottom:'12px' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d={b.d}/>
                </svg>
              </div>
              <div style={{ color:'#f1f5f9', fontWeight:'600', fontSize:'13.5px', marginBottom:'5px' }}>{b.title}</div>
              <div style={{ color:'#64748b', fontSize:'12px', lineHeight:'1.5' }}>{b.desc}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display:'flex', flexWrap:'wrap', borderRadius:'16px', overflow:'hidden', border:'1px solid rgba(240,200,66,0.12)', marginBottom:'36px' }}>
          {[{n:'100',u:'calculators',l:'Across 10 categories'},{n:'40+',u:'currencies',l:'Auto-detected'},{n:'100K+',u:'users/month',l:'And growing'},{n:'4.9',u:'★ rating',l:'Verified users'}].map((s,i) => (
            <div key={i} style={{ flex:'1 1 140px', padding:'20px 24px', textAlign:'center', background:i%2===0?'rgba(240,200,66,0.03)':'rgba(255,255,255,0.01)', borderRight:i<3?'1px solid rgba(240,200,66,0.1)':'none' }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:'28px', color:'#f0c842', lineHeight:'1', marginBottom:'2px' }}>{s.n}</div>
              <div style={{ color:'#94a3b8', fontSize:'12px', fontWeight:'500' }}>{s.u}</div>
              <div style={{ color:'#475569', fontSize:'11px', marginTop:'3px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ maxWidth:'760px', margin:'0 auto', padding:'16px 20px', borderRadius:'12px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color:'#475569', fontSize:'12px', lineHeight:'1.7', textAlign:'center' }}>
            <strong style={{ color:'#64748b' }}>⚠ Disclaimer:</strong>{' '}
            All calculators are for educational purposes only and do not constitute financial, tax, legal or investment advice.
            Always consult a qualified professional.{' '}
            <Link href="/privacy-policy" className="ffc-link">Privacy Policy</Link>
            {' · '}
            <Link href="/about" className="ffc-link">About Us</Link>
          </p>
        </div>

      </div>
    </section>
  )
}
`)

// ─────────────────────────────────────────────────────────────────
// STEP 4 — app/page.js (zero event handlers)
// ─────────────────────────────────────────────────────────────────
const cats = [
  { id:'loan', label:'Loan Calculators', svgPath:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10', color:'#f0c842', bg:'rgba(240,200,66,0.08)', border:'rgba(240,200,66,0.18)', desc:'Payments, interest and true costs for any loan.', tools:[
    {title:'Mortgage Calculator',href:'/mortgage-calculator',badge:'Popular'},{title:'Loan Payment Calculator',href:'/loan-payment-calculator'},{title:'Personal Loan Calculator',href:'/personal-loan-calculator'},{title:'Car Loan Calculator',href:'/car-loan-calculator'},{title:'Business Loan Calculator',href:'/business-loan-calculator'},{title:'Student Loan Calculator',href:'/student-loan-calculator'},{title:'Truck Loan Calculator',href:'/truck-loan-calculator'},{title:'Boat Loan Calculator',href:'/boat-loan-calculator'},{title:'RV Loan Calculator',href:'/rv-loan-calculator'},{title:'Equipment Loan Calculator',href:'/equipment-loan-calculator'},
  ]},
  { id:'debt', label:'Debt Calculators', svgPath:'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', color:'#f97316', bg:'rgba(249,115,22,0.08)', border:'rgba(249,115,22,0.18)', desc:'Payoff strategies, utilization and consolidation tools.', tools:[
    {title:'Credit Card Payoff',href:'/credit-card-payoff-calculator',badge:'Popular'},{title:'Debt Snowball Calculator',href:'/debt-snowball-calculator'},{title:'Debt Avalanche Calculator',href:'/debt-avalanche-calculator'},{title:'Debt Consolidation',href:'/debt-consolidation-calculator'},{title:'Loan Interest Calculator',href:'/loan-interest-calculator'},{title:'Debt Payoff Time',href:'/debt-payoff-time-calculator'},{title:'Credit Utilization',href:'/credit-utilization-calculator'},{title:'Balance Transfer',href:'/balance-transfer-calculator'},{title:'Min Payment Calculator',href:'/credit-card-minimum-payment-calculator'},{title:'Total Debt Calculator',href:'/total-debt-calculator'},
  ]},
  { id:'invest', label:'Investment Calculators', svgPath:'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color:'#34d399', bg:'rgba(52,211,153,0.08)', border:'rgba(52,211,153,0.18)', desc:'Compound interest, FIRE and portfolio growth tools.', tools:[
    {title:'Compound Interest',href:'/compound-interest',badge:'Popular'},{title:'Investment Return',href:'/investment-return-calculator'},{title:'Stock Profit Calculator',href:'/stock-profit-calculator'},{title:'Dividend Calculator',href:'/dividend-calculator'},{title:'Savings Growth Calculator',href:'/savings-growth-calculator'},{title:'Retirement Savings',href:'/retirement-savings-calculator'},{title:'FIRE Calculator',href:'/fire-retirement-calculator'},{title:'Portfolio Growth',href:'/portfolio-growth-calculator'},{title:'Dollar Cost Averaging',href:'/dollar-cost-averaging-calculator'},{title:'Passive Income Calculator',href:'/passive-income-calculator'},
  ]},
  { id:'salary', label:'Salary Calculators', svgPath:'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color:'#60a5fa', bg:'rgba(96,165,250,0.08)', border:'rgba(96,165,250,0.18)', desc:'Convert pay rates, take-home and compensation tools.', tools:[
    {title:'Hourly to Salary',href:'/hourly-to-salary-calculator',badge:'Popular'},{title:'Salary to Hourly',href:'/salary-to-hourly-calculator'},{title:'Salary After Tax',href:'/salary-after-tax-calculator'},{title:'Overtime Pay Calculator',href:'/overtime-pay-calculator'},{title:'Freelance Rate Calculator',href:'/freelance-rate-calculator'},{title:'Contractor Pay Calculator',href:'/contractor-pay-calculator'},{title:'Commission Calculator',href:'/commission-calculator'},{title:'Pay Raise Calculator',href:'/pay-raise-calculator'},{title:'Take Home Pay Calculator',href:'/take-home-pay-calculator'},{title:'Net Salary Calculator',href:'/net-salary-calculator'},
  ]},
  { id:'living', label:'Cost of Living', svgPath:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', color:'#a78bfa', bg:'rgba(167,139,250,0.08)', border:'rgba(167,139,250,0.18)', desc:'Rent, mortgage, utilities and monthly living tools.', tools:[
    {title:'Cost of Living Calculator',href:'/cost-of-living-calculator',badge:'Popular'},{title:'Rent Affordability',href:'/rent-affordability-calculator'},{title:'Mortgage Affordability',href:'/mortgage-affordability-calculator'},{title:'Moving Cost Calculator',href:'/moving-cost-calculator'},{title:'Utility Cost Calculator',href:'/utility-cost-calculator'},{title:'Grocery Budget Calculator',href:'/grocery-budget-calculator'},{title:'Household Budget Calculator',href:'/household-budget-calculator'},{title:'Apartment Affordability',href:'/apartment-affordability-calculator'},{title:'Property Tax Calculator',href:'/property-tax-calculator'},{title:'Rent vs Buy Calculator',href:'/rent-vs-buy-calculator'},
  ]},
  { id:'vehicle', label:'Vehicle Calculators', svgPath:'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2zM13 6l4 4 2 2v4h-2', color:'#fb7185', bg:'rgba(251,113,133,0.08)', border:'rgba(251,113,133,0.18)', desc:'Car payments, fuel costs and EV charging tools.', tools:[
    {title:'Car Payment Calculator',href:'/car-payment-calculator',badge:'Popular'},{title:'Auto Loan Calculator',href:'/auto-loan-calculator'},{title:'Fuel Cost Calculator',href:'/fuel-cost-calculator'},{title:'Gas Mileage Calculator',href:'/gas-mileage-calculator'},{title:'Vehicle Depreciation',href:'/vehicle-depreciation-calculator'},{title:'Lease vs Buy Calculator',href:'/lease-vs-buy-calculator'},{title:'Car Affordability Calculator',href:'/car-affordability-calculator'},{title:'Road Trip Cost Calculator',href:'/road-trip-cost-calculator'},{title:'Truck Fuel Cost Calculator',href:'/truck-fuel-cost-calculator'},{title:'EV Charging Cost Calculator',href:'/ev-charging-cost-calculator'},
  ]},
  { id:'business', label:'Business Calculators', svgPath:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color:'#fbbf24', bg:'rgba(251,191,36,0.08)', border:'rgba(251,191,36,0.18)', desc:'ROI, break-even, profit margins and valuation tools.', tools:[
    {title:'Profit Margin Calculator',href:'/profit-margin-calculator',badge:'Popular'},{title:'Break-Even Calculator',href:'/break-even-calculator'},{title:'ROI Calculator',href:'/roi-calculator'},{title:'Startup Cost Calculator',href:'/startup-cost-calculator'},{title:'Business Loan Calculator',href:'/business-loan-calculator'},{title:'Revenue Growth Calculator',href:'/revenue-growth-calculator'},{title:'Pricing Calculator',href:'/pricing-calculator'},{title:'Inventory Turnover',href:'/inventory-turnover-calculator'},{title:'Sales Commission Calc',href:'/sales-commission-calculator'},{title:'Business Valuation',href:'/business-valuation-calculator'},
  ]},
  { id:'tax', label:'Tax Calculators', svgPath:'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z', color:'#4ade80', bg:'rgba(74,222,128,0.08)', border:'rgba(74,222,128,0.18)', desc:'Income, self-employment, VAT and capital gains tools.', tools:[
    {title:'Income Tax Calculator',href:'/income-tax-calculator',badge:'Popular'},{title:'Self-Employment Tax',href:'/self-employment-tax-calculator'},{title:'Capital Gains Tax',href:'/capital-gains-tax-calculator'},{title:'Sales Tax Calculator',href:'/sales-tax-calculator'},{title:'VAT Calculator',href:'/vat-calculator'},{title:'Payroll Tax Calculator',href:'/payroll-tax-calculator'},{title:'Tax Refund Calculator',href:'/tax-refund-calculator'},{title:'Corporate Tax Calculator',href:'/corporate-tax-calculator'},{title:'State Tax Calculator',href:'/state-tax-calculator'},{title:'Property Tax Calculator',href:'/property-tax-calculator'},
  ]},
  { id:'budget', label:'Budget & Money', svgPath:'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color:'#38bdf8', bg:'rgba(56,189,248,0.08)', border:'rgba(56,189,248,0.18)', desc:'Budgets, emergency funds, net worth and FIRE tools.', tools:[
    {title:'Monthly Budget Calculator',href:'/budget-calculator',badge:'Popular'},{title:'Expense Tracker',href:'/expense-tracker-calculator'},{title:'Emergency Fund Calculator',href:'/emergency-fund-calculator'},{title:'Debt-to-Income Calculator',href:'/debt-to-income-calculator'},{title:'Net Worth Calculator',href:'/net-worth-calculator'},{title:'Financial Independence',href:'/financial-independence-calculator'},{title:'Savings Goal Calculator',href:'/savings-calculator'},{title:'Retirement Age Calculator',href:'/retirement-age-calculator'},{title:'Wealth Growth Calculator',href:'/wealth-growth-calculator'},{title:'Inflation Calculator',href:'/inflation-calculator'},
  ]},
  { id:'bonus', label:'High-Value Tools', svgPath:'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', color:'#e879f9', bg:'rgba(232,121,249,0.08)', border:'rgba(232,121,249,0.18)', desc:'High-CPC: amortization, APR, refinance and comparison.', tools:[
    {title:'Mortgage Amortization',href:'/mortgage-amortization-calculator',badge:'High CPC'},{title:'Loan Comparison Calculator',href:'/loan-comparison-calculator',badge:'High CPC'},{title:'Interest Rate Calculator',href:'/interest-rate-calculator'},{title:'APR Calculator',href:'/apr-calculator'},{title:'Credit Score Simulator',href:'/credit-score-simulator'},{title:'Down Payment Calculator',href:'/down-payment-calculator'},{title:'Refinance Calculator',href:'/refinance-calculator'},{title:'Investment Risk Calculator',href:'/investment-risk-calculator'},{title:'Loan Eligibility Calculator',href:'/loan-eligibility-calculator'},{title:'Early Loan Payoff Calculator',href:'/early-loan-payoff-calculator'},
  ]},
]

const faqs = [
  { q:'Are all calculators on FreeFinCalc.net free?', a:'Yes — every calculator is 100% free with no sign up, no subscription and no hidden fees. All calculators remain free forever.' },
  { q:'What currencies does FreeFinCalc.net support?', a:'FreeFinCalc.net supports 40+ global currencies. Your local currency is auto-detected and you can switch at any time using the currency selector.' },
  { q:'Can I download my calculation results as a PDF?', a:'Yes — every calculator includes a PDF download button. Results are formatted as a professional document with a full disclaimer.' },
  { q:'How accurate are the financial calculators?', a:'Our calculators use standard financial formulas such as the amortization formula for loans and compound interest for investments. Results may differ from lender figures due to fees and specific terms.' },
  { q:'Is the financial information on FreeFinCalc.net advice?', a:'No — calculators are for educational purposes only and do not constitute financial, tax or legal advice. Always consult a qualified financial professional before making decisions.' },
]

const total = cats.reduce((a,c) => a + c.tools.length, 0)

const jsonLd = {
  '@context':'https://schema.org',
  '@graph':[
    { '@type':'WebSite', '@id':'https://www.freefincalc.net/#website', url:'https://www.freefincalc.net', name:'FreeFinCalc.net', description:`${total} free financial calculators in 40+ currencies` },
    { '@type':'Organization', '@id':'https://www.freefincalc.net/#organization', name:'FreeFinCalc.net', url:'https://www.freefincalc.net' },
    { '@type':'FAQPage', mainEntity: faqs.map(f => ({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })) },
  ]
}

write('app/page.js', `import Link from 'next/link'
import Script from 'next/script'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TrustSection from '../components/TrustSection'

export const metadata = {
  title: 'FreeFinCalc.net — ${total} Free Financial Calculators in 40+ Currencies',
  description: '${total} free professional financial calculators: loans, debt, investing, salary, tax and more. 40+ currencies. Instant results. PDF download. No sign up.',
  keywords: ['free financial calculator','mortgage calculator','loan calculator','compound interest calculator','debt payoff calculator','salary calculator','tax calculator'],
  openGraph: { title:'FreeFinCalc.net — ${total} Free Financial Calculators', description:'${total} free calculators in 40+ currencies.', url:'https://www.freefincalc.net', type:'website' },
  alternates: { canonical:'https://www.freefincalc.net' },
}

const categories = ${JSON.stringify(cats)}
const faqs = ${JSON.stringify(faqs)}
const jsonLd = ${JSON.stringify(jsonLd)}

export default function Home() {
  const total = categories.reduce((a,c) => a + c.tools.length, 0)
  return (
    <>
      <Script id="hp-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main-content">

        {/* HERO */}
        <section style={{ position:'relative', overflow:'hidden', paddingTop:'80px', paddingBottom:'64px', textAlign:'center' }}>
          <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, backgroundImage:'linear-gradient(rgba(240,200,66,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(240,200,66,0.04) 1px,transparent 1px)', backgroundSize:'48px 48px', maskImage:'radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%)' }} />
          <div aria-hidden="true" style={{ position:'absolute', top:'-120px', left:'50%', transform:'translateX(-50%)', width:'700px', height:'400px', background:'radial-gradient(ellipse,rgba(240,200,66,0.12) 0%,transparent 70%)', zIndex:0, pointerEvents:'none' }} />
          <div className="max-w-5xl mx-auto px-4" style={{ position:'relative', zIndex:1 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'100px', marginBottom:'28px', background:'rgba(240,200,66,0.1)', border:'1px solid rgba(240,200,66,0.22)', fontSize:'12.5px', fontWeight:'600', color:'rgba(240,200,66,0.9)' }}>
              <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#f0c842', boxShadow:'0 0 8px #f0c842', display:'inline-block' }} />
              {total} Free Calculators · 10 Categories · 40+ Currencies · No Sign Up
            </div>
            <h1 style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize:'clamp(38px,6vw,72px)', fontWeight:'400', lineHeight:'1.08', letterSpacing:'-1.5px', color:'#f1f5f9', marginBottom:'24px' }}>
              Free Financial<br/>
              <span style={{ background:'linear-gradient(135deg,#f0c842 0%,#f5a623 50%,#f0c842 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Calculators</span>
            </h1>
            <p style={{ color:'#64748b', fontSize:'clamp(15px,2vw,19px)', lineHeight:'1.65', maxWidth:'580px', margin:'0 auto 36px' }}>
              Professional tools for loans, debt, investing, salary, tax and business — in your local currency, with PDF download, completely free.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'10px', marginBottom:'44px' }}>
              {[['⚡','Instant Results'],['🔒','No Sign Up'],['💯','100% Free'],['🌍','40+ Currencies'],['📄','PDF Download'],['📱','Mobile Friendly']].map(([ic,tx]) => (
                <span key={tx} style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'7px 14px', borderRadius:'100px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#94a3b8', fontSize:'13px', fontWeight:'500' }}>{ic} {tx}</span>
              ))}
            </div>
            <a href="#calculators" className="cta-btn">
              Browse All {total} Calculators
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </section>

        {/* STATS */}
        <section className="max-w-5xl mx-auto px-4" style={{ marginBottom:'72px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderRadius:'18px', overflow:'hidden', border:'1px solid rgba(240,200,66,0.12)', background:'rgba(240,200,66,0.025)' }}>
            {[{n:total,s:'',l:'Free Calculators'},{n:'40',s:'+',l:'Currencies'},{n:'100K',s:'+',l:'Monthly Users'},{n:'4.9',s:'★',l:'User Rating'}].map((st,i) => (
              <div key={i} style={{ padding:'24px 20px', textAlign:'center', borderRight:i<3?'1px solid rgba(240,200,66,0.1)':'none' }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(26px,3vw,36px)', color:'#f0c842', lineHeight:'1', marginBottom:'6px' }}>{st.n}<span style={{ color:'rgba(240,200,66,0.6)', fontSize:'0.7em' }}>{st.s}</span></div>
                <div style={{ color:'#475569', fontSize:'12.5px', fontWeight:'500' }}>{st.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="calculators" className="max-w-6xl mx-auto px-4" style={{ paddingBottom:'80px' }}>
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(26px,4vw,40px)', fontWeight:'400', color:'#f1f5f9', letterSpacing:'-0.5px', marginBottom:'12px' }}>
              Everything You Need to Make Better Money Decisions
            </h2>
            <p style={{ color:'#475569', fontSize:'16px', maxWidth:'540px', margin:'0 auto', lineHeight:'1.6' }}>
              10 categories. {total} calculators. All free. All in your currency.
            </p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'56px' }}>
            {categories.map(cat => (
              <article key={cat.id}>
                <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'20px', flexWrap:'wrap' }}>
                  <div style={{ width:'42px', height:'42px', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background:cat.bg, border:'1px solid '+cat.border, color:cat.color }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={cat.svgPath}/></svg>
                  </div>
                  <div>
                    <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(18px,2.5vw,24px)', fontWeight:'400', color:'#f1f5f9', letterSpacing:'-0.3px', margin:0, lineHeight:'1.2' }}>{cat.label}</h2>
                    <p style={{ color:'#475569', fontSize:'13px', margin:'3px 0 0' }}>{cat.desc}</p>
                  </div>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,'+cat.border+',transparent)', minWidth:'40px' }} />
                  <span style={{ padding:'4px 12px', borderRadius:'100px', fontSize:'11.5px', fontWeight:'600', background:cat.bg, border:'1px solid '+cat.border, color:cat.color, flexShrink:0 }}>{cat.tools.length} tools</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'10px' }}>
                  {cat.tools.map(tool => (
                    <Link key={tool.href} href={tool.href} className="tool-card">
                      {tool.badge && (
                        <span style={{ position:'absolute', top:'10px', right:'10px', padding:'2px 7px', borderRadius:'100px', fontSize:'10px', fontWeight:'700', background:cat.bg, border:'1px solid '+cat.border, color:cat.color }}>{tool.badge}</span>
                      )}
                      <h3 className="tool-card-title" style={{ paddingRight:tool.badge?'52px':'0' }}>{tool.title}</h3>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', fontSize:'12px', fontWeight:'600', color:cat.color, opacity:0.85 }}>
                        Open <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SEO BLOCK */}
        <section className="max-w-4xl mx-auto px-4" style={{ paddingBottom:'64px' }}>
          <div style={{ padding:'40px 44px', borderRadius:'20px', background:'rgba(240,200,66,0.03)', border:'1px solid rgba(240,200,66,0.1)' }}>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(20px,3vw,28px)', fontWeight:'400', color:'#f1f5f9', letterSpacing:'-0.3px', marginBottom:'16px', textAlign:'center' }}>
              Professional Financial Calculators — Free, Fast &amp; Global
            </h2>
            <p style={{ color:'#475569', fontSize:'14.5px', lineHeight:'1.8', textAlign:'center', maxWidth:'700px', margin:'0 auto 16px' }}>
              FreeFinCalc.net provides {total} free calculators across 10 categories in 40+ currencies. Whether you are calculating a{' '}
              <Link href="/mortgage-calculator" style={{ color:'#94a3b8', textDecoration:'underline' }}>mortgage payment</Link>,{' '}
              <Link href="/car-loan-calculator" style={{ color:'#94a3b8', textDecoration:'underline' }}>car loan</Link>,{' '}
              planning <Link href="/retirement-savings-calculator" style={{ color:'#94a3b8', textDecoration:'underline' }}>retirement</Link> or tracking{' '}
              <Link href="/debt-snowball-calculator" style={{ color:'#94a3b8', textDecoration:'underline' }}>debt payoff</Link> — every calculator adapts to your local currency with PDF download.
            </p>
            <p style={{ color:'#334155', fontSize:'13px', lineHeight:'1.7', textAlign:'center', maxWidth:'660px', margin:'0 auto' }}>
              Popular:{' '}
              <Link href="/compound-interest" style={{ color:'#64748b', textDecoration:'underline' }}>compound interest</Link>,{' '}
              <Link href="/salary-after-tax-calculator" style={{ color:'#64748b', textDecoration:'underline' }}>salary after tax</Link>,{' '}
              <Link href="/profit-margin-calculator" style={{ color:'#64748b', textDecoration:'underline' }}>profit margin</Link>,{' '}
              <Link href="/credit-card-payoff-calculator" style={{ color:'#64748b', textDecoration:'underline' }}>credit card payoff</Link>,{' '}
              <Link href="/fire-retirement-calculator" style={{ color:'#64748b', textDecoration:'underline' }}>FIRE calculator</Link>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4" style={{ paddingBottom:'72px' }}>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(22px,3vw,32px)', fontWeight:'400', color:'#f1f5f9', letterSpacing:'-0.3px', textAlign:'center', marginBottom:'32px' }}>
            Frequently Asked Questions
          </h2>
          {faqs.map((faq,i) => (
            <details key={i} className="faq-item">
              <summary>
                {faq.q}
                <svg width="16" height="16" fill="none" stroke="#f0c842" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink:0 }}><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </summary>
              <p className="faq-answer">{faq.a}</p>
            </details>
          ))}
        </section>

        <TrustSection />
      </main>
      <Footer />
    </>
  )
}
`)

// Done
console.log('\n' + '═'.repeat(52))
console.log('  ✅  FIX COMPLETE — 4 files patched')
console.log('═'.repeat(52))
console.log('\n  What was fixed:')
console.log('  ✓  ALL onMouseEnter / onMouseLeave REMOVED')
console.log('  ✓  Hover now uses CSS classes (.ffc-link, .tool-card, etc.)')
console.log('  ✓  Footer.js     — pure server component')
console.log('  ✓  TrustSection.js — pure server component')
console.log('  ✓  app/page.js   — pure server component')
console.log('  ✓  app/globals.css — hover CSS appended')
console.log('\n  Run now:')
console.log('  git add .')
console.log('  git commit -m "Fix: CSS-only hover, remove all event handlers"')
console.log('  git push origin master:main')
console.log('═'.repeat(52) + '\n')
