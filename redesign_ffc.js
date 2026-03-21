const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const APP = path.join(BASE, 'app');

function writeFile(fp, content) {
  const dir = path.dirname(fp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fp, content, 'utf8');
}

console.log('');
console.log('=====================================================');
console.log('  REDESIGN: FreeFinCalc Header + Homepage');
console.log('=====================================================');
console.log('');

// ================================================================
// 1. NEW HEADER — Mega Menu (desktop) + Hamburger (mobile)
// ================================================================

const headerJS = `'use client'
import { useState, useEffect, useRef } from 'react'
import { useCurrency, CURRENCIES } from './CurrencyContext'

const MEGA = [
  {
    label: 'Mortgage & Home',
    tools: [
      { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
      { name: 'Amortization', href: '/amortization-calculator' },
      { name: 'Refinance', href: '/refinance-calculator' },
      { name: 'Home Affordability', href: '/home-affordability-calculator' },
      { name: 'HELOC', href: '/heloc-calculator' },
      { name: 'Property Tax', href: '/property-tax-calculator' },
      { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator' },
      { name: 'Down Payment', href: '/down-payment-calculator' },
    ],
  },
  {
    label: 'Debt & Credit',
    tools: [
      { name: 'Credit Card Payoff', href: '/credit-card-payoff-calculator' },
      { name: 'Debt Payoff', href: '/debt-payoff-calculator' },
      { name: 'Debt Snowball', href: '/debt-snowball-calculator' },
      { name: 'Debt Avalanche', href: '/debt-avalanche-calculator' },
      { name: 'Debt Consolidation', href: '/debt-consolidation-calculator' },
      { name: 'Balance Transfer', href: '/balance-transfer-calculator' },
      { name: 'Debt-to-Income', href: '/debt-to-income-calculator' },
      { name: 'Credit Utilization', href: '/credit-utilization-calculator' },
    ],
  },
  {
    label: 'Loans & Interest',
    tools: [
      { name: 'Personal Loan', href: '/personal-loan-calculator' },
      { name: 'Student Loan', href: '/student-loan-calculator' },
      { name: 'Car Loan', href: '/car-loan-calculator' },
      { name: 'Business Loan', href: '/business-loan-calculator' },
      { name: 'SBA Loan', href: '/sba-loan-calculator' },
      { name: 'APR Calculator', href: '/apr-calculator' },
      { name: 'Loan Comparison', href: '/loan-comparison-calculator' },
      { name: 'Simple Interest', href: '/simple-interest-calculator' },
    ],
  },
  {
    label: 'Retirement & Investing',
    tools: [
      { name: 'Retirement', href: '/retirement-calculator' },
      { name: '401k Calculator', href: '/401k-calculator' },
      { name: 'Roth IRA', href: '/roth-ira-calculator' },
      { name: 'FIRE Calculator', href: '/fire-calculator' },
      { name: 'Investment Return', href: '/investment-return-calculator' },
      { name: 'Dividend Calculator', href: '/dividend-calculator' },
      { name: 'Social Security', href: '/social-security-calculator' },
      { name: 'Dollar Cost Avg', href: '/dollar-cost-averaging-calculator' },
    ],
  },
  {
    label: 'Tax & Salary',
    tools: [
      { name: 'Income Tax', href: '/tax-calculator' },
      { name: 'Salary After Tax', href: '/salary-after-tax-calculator' },
      { name: 'Paycheck Calculator', href: '/paycheck-calculator' },
      { name: 'Capital Gains Tax', href: '/capital-gains-tax-calculator' },
      { name: 'Self-Employment Tax', href: '/self-employment-tax-calculator' },
      { name: 'Hourly to Salary', href: '/hourly-to-salary-calculator' },
      { name: 'Freelance Rate', href: '/freelance-rate-calculator' },
      { name: 'Overtime Pay', href: '/overtime-pay-calculator' },
    ],
  },
  {
    label: 'Business & Budget',
    tools: [
      { name: 'Profit Margin', href: '/profit-margin-calculator' },
      { name: 'Break-Even', href: '/break-even-calculator' },
      { name: 'ROI Calculator', href: '/roi-calculator' },
      { name: 'Budget Planner', href: '/budget-planner-calculator' },
      { name: 'Net Worth', href: '/net-worth-calculator' },
      { name: 'Cost of Living', href: '/cost-of-living-calculator' },
      { name: 'Startup Cost', href: '/startup-cost-calculator' },
      { name: 'Cash Flow', href: '/cash-flow-calculator' },
    ],
  },
]

const DIRECT = [
  { label: 'Comparisons', href: '/401k-vs-roth-ira' },
  { label: 'Cost of Living', href: '/cost-of-living-calculator' },
  { label: 'Blog', href: '/blog' },
]

// Full nav for mobile drawer
const MOBILE_NAV = [
  {
    label: 'Mortgage & Home',
    tools: [
      { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
      { name: 'Amortization', href: '/amortization-calculator' },
      { name: 'Refinance', href: '/refinance-calculator' },
      { name: 'Home Affordability', href: '/home-affordability-calculator' },
      { name: 'HELOC', href: '/heloc-calculator' },
      { name: 'Property Tax', href: '/property-tax-calculator' },
      { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator' },
      { name: 'Down Payment', href: '/down-payment-calculator' },
      { name: 'Biweekly Mortgage', href: '/biweekly-mortgage-calculator' },
      { name: 'Extra Payment', href: '/extra-payment-calculator' },
      { name: 'Home Equity', href: '/home-equity-calculator' },
      { name: 'Solar Payback', href: '/solar-payback-calculator' },
    ],
  },
  {
    label: 'Debt & Credit',
    tools: [
      { name: 'Credit Card Payoff', href: '/credit-card-payoff-calculator' },
      { name: 'Debt Payoff', href: '/debt-payoff-calculator' },
      { name: 'Debt Snowball', href: '/debt-snowball-calculator' },
      { name: 'Debt Avalanche', href: '/debt-avalanche-calculator' },
      { name: 'Debt Consolidation', href: '/debt-consolidation-calculator' },
      { name: 'Balance Transfer', href: '/balance-transfer-calculator' },
      { name: 'Debt-to-Income', href: '/debt-to-income-calculator' },
      { name: 'Credit Utilization', href: '/credit-utilization-calculator' },
      { name: 'Minimum Payment', href: '/credit-card-minimum-payment-calculator' },
      { name: 'Total Debt', href: '/total-debt-calculator' },
    ],
  },
  {
    label: 'Loans',
    tools: [
      { name: 'Personal Loan', href: '/personal-loan-calculator' },
      { name: 'Student Loan', href: '/student-loan-calculator' },
      { name: 'Car Loan', href: '/car-loan-calculator' },
      { name: 'Business Loan', href: '/business-loan-calculator' },
      { name: 'SBA Loan', href: '/sba-loan-calculator' },
      { name: 'APR Calculator', href: '/apr-calculator' },
      { name: 'Loan Comparison', href: '/loan-comparison-calculator' },
      { name: 'Equipment Loan', href: '/equipment-loan-calculator' },
    ],
  },
  {
    label: 'Retirement',
    tools: [
      { name: 'Retirement', href: '/retirement-calculator' },
      { name: '401k', href: '/401k-calculator' },
      { name: 'Roth IRA', href: '/roth-ira-calculator' },
      { name: 'FIRE', href: '/fire-calculator' },
      { name: 'Social Security', href: '/social-security-calculator' },
      { name: 'Pension', href: '/pension-calculator' },
      { name: 'Annuity', href: '/annuity-calculator' },
      { name: 'RMD', href: '/rmd-calculator' },
    ],
  },
  {
    label: 'Tax & Salary',
    tools: [
      { name: 'Income Tax', href: '/tax-calculator' },
      { name: 'Salary After Tax', href: '/salary-after-tax-calculator' },
      { name: 'Paycheck', href: '/paycheck-calculator' },
      { name: 'Capital Gains Tax', href: '/capital-gains-tax-calculator' },
      { name: 'Self-Employment Tax', href: '/self-employment-tax-calculator' },
      { name: 'Hourly to Salary', href: '/hourly-to-salary-calculator' },
      { name: 'Freelance Rate', href: '/freelance-rate-calculator' },
      { name: 'Commission', href: '/commission-calculator' },
    ],
  },
  {
    label: 'Investing',
    tools: [
      { name: 'Investment Return', href: '/investment-return-calculator' },
      { name: 'Dividend', href: '/dividend-calculator' },
      { name: 'Dollar Cost Avg', href: '/dollar-cost-averaging-calculator' },
      { name: 'Portfolio Growth', href: '/portfolio-growth-calculator' },
      { name: 'Stock Profit', href: '/stock-profit-calculator' },
      { name: 'Bond Yield', href: '/bond-yield-calculator' },
      { name: 'CD Calculator', href: '/cd-calculator' },
      { name: 'Savings Goal', href: '/savings-goal-calculator' },
    ],
  },
  {
    label: 'Business',
    tools: [
      { name: 'Profit Margin', href: '/profit-margin-calculator' },
      { name: 'Break-Even', href: '/break-even-calculator' },
      { name: 'ROI', href: '/roi-calculator' },
      { name: 'Business Valuation', href: '/business-valuation-calculator' },
      { name: 'Cash Flow', href: '/cash-flow-calculator' },
      { name: 'Startup Cost', href: '/startup-cost-calculator' },
      { name: 'Ecommerce Profit', href: '/ecommerce-profit-calculator' },
      { name: 'Markup', href: '/markup-calculator' },
    ],
  },
  {
    label: 'Budget & Life',
    tools: [
      { name: 'Budget Planner', href: '/budget-planner-calculator' },
      { name: 'Net Worth', href: '/net-worth-calculator' },
      { name: 'Cost of Living', href: '/cost-of-living-calculator' },
      { name: 'Car Affordability', href: '/car-affordability-calculator' },
      { name: 'Fuel Cost', href: '/fuel-cost-calculator' },
      { name: 'Currency Converter', href: '/currency-converter' },
      { name: 'Wedding Budget', href: '/wedding-budget-calculator' },
      { name: 'Moving Cost', href: '/moving-cost-calculator' },
    ],
  },
]

export default function Header() {
  const { currency, setCurrency, symbol } = useCurrency()
  const [megaOpen, setMegaOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [curOpen, setCurOpen] = useState(false)
  const megaRef = useRef(null)
  const megaBtnRef = useRef(null)
  const activeCur = CURRENCIES.find(c => c.code === currency.code) || CURRENCIES[0]

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) setExpanded(null)
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    function handleClick(e) {
      if (megaOpen && megaRef.current && !megaRef.current.contains(e.target) && megaBtnRef.current && !megaBtnRef.current.contains(e.target)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [megaOpen])

  const st = {
    header: { background: 'rgba(10,12,20,0.97)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 1000 },
    inner: { maxWidth: 1280, margin: '0 auto', padding: '0 16px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    logo: { display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 },
    logoIcon: { width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, background: '#f0c842', color: '#0a0c14' },
    logoText: { fontWeight: 900, color: '#fff', fontSize: 18, letterSpacing: '-0.02em' },
    nav: { display: 'flex', alignItems: 'center', gap: 4 },
    navBtn: { padding: '6px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' },
    navBtnActive: { color: '#f0c842', background: 'rgba(240,200,66,0.1)' },
    navLink: { padding: '6px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: '#94a3b8', textDecoration: 'none', transition: 'color 0.15s', whiteSpace: 'nowrap' },
    cta: { padding: '8px 18px', borderRadius: 12, fontSize: 13, fontWeight: 700, background: '#f0c842', color: '#0a0c14', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'transform 0.15s' },
    mega: { position: 'absolute', top: 56, left: 0, right: 0, background: '#0c0f19', borderBottom: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', zIndex: 999, padding: '24px 0' },
    megaInner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 },
    megaCol: { },
    megaLabel: { fontSize: 11, fontWeight: 800, color: '#f0c842', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, paddingBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.06)' },
    megaLink: { display: 'block', padding: '5px 0', fontSize: 13, color: '#94a3b8', textDecoration: 'none', transition: 'color 0.1s' },
    right: { display: 'flex', alignItems: 'center', gap: 8 },
  }

  return (
    <>
      <header style={st.header}>
        <div style={st.inner}>
          <a href="/" style={st.logo}>
            <div style={st.logoIcon}>F</div>
            <span style={st.logoText}>FreeFinCalc</span>
          </a>

          {/* Desktop nav */}
          <nav style={{...st.nav, display: 'none'}} className="desktop-nav">
            <button ref={megaBtnRef} onClick={() => setMegaOpen(v => !v)} style={{...st.navBtn, ...(megaOpen ? st.navBtnActive : {})}}>
              Calculators {megaOpen ? String.fromCharCode(9650) : String.fromCharCode(9660)}
            </button>
            {DIRECT.map(d => (
              <a key={d.href} href={d.href} style={st.navLink}>{d.label}</a>
            ))}
          </nav>

          <div style={st.right}>
            {/* CTA desktop */}
            <a href="/mortgage-calculator" style={st.cta} className="desktop-cta">Try Free</a>

            {/* Currency */}
            <div style={{position:'relative'}}>
              <button onClick={() => setCurOpen(v => !v)} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:10,fontSize:12,fontWeight:700,background:'rgba(240,200,66,0.1)',border:'1px solid rgba(240,200,66,0.3)',color:'#f0c842',cursor:'pointer'}}>
                <span>{symbol}</span><span>{activeCur.code}</span>
              </button>
              {curOpen && (
                <>
                  <div style={{position:'fixed',inset:0,zIndex:40}} onClick={() => setCurOpen(false)} />
                  <div style={{position:'absolute',right:0,top:'100%',marginTop:8,zIndex:50,borderRadius:16,overflow:'hidden',background:'#0f1220',border:'1px solid rgba(255,255,255,0.1)',boxShadow:'0 20px 60px rgba(0,0,0,0.8)',width:210,maxHeight:280,overflowY:'auto'}}>
                    <div style={{padding:'10px 16px',fontSize:11,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>Currency</div>
                    {CURRENCIES.map(cur => (
                      <button key={cur.code} onClick={() => { setCurrency(cur.code); setCurOpen(false) }} style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'8px 16px',fontSize:12,textAlign:'left',background:'transparent',border:'none',cursor:'pointer',color: currency.code === cur.code ? '#f0c842' : '#94a3b8',transition:'background 0.1s'}}>
                        <span style={{fontWeight:700,width:24,textAlign:'center'}}>{cur.symbol}</span>
                        <span>{cur.code} - {cur.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(v => !v)} aria-label="Menu" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:40,height:40,borderRadius:10,gap:5,cursor:'pointer',background: menuOpen ? 'rgba(240,200,66,0.12)' : 'rgba(255,255,255,0.06)',border: menuOpen ? '1px solid rgba(240,200,66,0.3)' : '1px solid rgba(255,255,255,0.08)'}}>
              <span style={{display:'block',width:18,height:2,borderRadius:2,background: menuOpen ? '#f0c842' : '#94a3b8',transition:'all 0.25s',transform: menuOpen ? 'translateY(3.5px) rotate(45deg)' : 'none'}} />
              <span style={{display:'block',width:18,height:2,borderRadius:2,background: menuOpen ? '#f0c842' : '#94a3b8',transition:'all 0.25s',opacity: menuOpen ? 0 : 1}} />
              <span style={{display:'block',width:18,height:2,borderRadius:2,background: menuOpen ? '#f0c842' : '#94a3b8',transition:'all 0.25s',transform: menuOpen ? 'translateY(-3.5px) rotate(-45deg)' : 'none'}} />
            </button>
          </div>
        </div>

        {/* Mega menu panel */}
        {megaOpen && (
          <div ref={megaRef} style={st.mega}>
            <div style={st.megaInner}>
              {MEGA.map(col => (
                <div key={col.label} style={st.megaCol}>
                  <div style={st.megaLabel}>{col.label}</div>
                  {col.tools.map(t => (
                    <a key={t.href} href={t.href} onClick={() => setMegaOpen(false)} style={st.megaLink} onMouseOver={e => e.currentTarget.style.color='#f0c842'} onMouseOut={e => e.currentTarget.style.color='#94a3b8'}>{t.name}</a>
                  ))}
                </div>
              ))}
            </div>
            <div style={{maxWidth:1280,margin:'16px auto 0',padding:'0 24px',display:'flex',gap:12,flexWrap:'wrap'}}>
              <a href="/blog" onClick={() => setMegaOpen(false)} style={{padding:'6px 14px',borderRadius:8,fontSize:12,fontWeight:600,background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',color:'#f0c842',textDecoration:'none'}}>Blog & Guides</a>
              <a href="/cost-of-living-calculator" onClick={() => setMegaOpen(false)} style={{padding:'6px 14px',borderRadius:8,fontSize:12,fontWeight:600,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#94a3b8',textDecoration:'none'}}>Cost of Living by State</a>
              <a href="/401k-vs-roth-ira" onClick={() => setMegaOpen(false)} style={{padding:'6px 14px',borderRadius:8,fontSize:12,fontWeight:600,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#94a3b8',textDecoration:'none'}}>Comparisons</a>
              <a href="/about" onClick={() => setMegaOpen(false)} style={{padding:'6px 14px',borderRadius:8,fontSize:12,fontWeight:600,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#94a3b8',textDecoration:'none'}}>About</a>
            </div>
          </div>
        )}
      </header>

      {/* Desktop nav CSS */}
      <style>{\`
        .desktop-nav { display: none !important; }
        .desktop-cta { display: none !important; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
        }
      \`}</style>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <div style={{position:'fixed',inset:0,zIndex:40,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(4px)'}} onClick={() => setMenuOpen(false)} />
          <div style={{position:'fixed',top:0,right:0,height:'100%',zIndex:50,display:'flex',flexDirection:'column',width:'min(380px, 100vw)',background:'#0c0f19',borderLeft:'1px solid rgba(255,255,255,0.08)',boxShadow:'-20px 0 60px rgba(0,0,0,0.6)',overflowY:'auto'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',flexShrink:0}}>
              <div>
                <div style={{color:'#fff',fontWeight:700}}>All Calculators</div>
                <div style={{color:'#64748b',fontSize:12,marginTop:2}}>470+ free financial tools</div>
              </div>
              <button onClick={() => setMenuOpen(false)} style={{width:36,height:36,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.06)',border:'none',color:'#94a3b8',fontSize:16,cursor:'pointer'}}>X</button>
            </div>
            <div style={{padding:'12px 16px 8px',display:'flex',flexWrap:'wrap',gap:8,flexShrink:0}}>
              {[{label:'Home',href:'/'},{label:'Blog',href:'/blog'},{label:'Comparisons',href:'/401k-vs-roth-ira'},{label:'Cost of Living',href:'/cost-of-living-calculator'},{label:'About',href:'/about'}].map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{padding:'6px 12px',borderRadius:8,fontSize:12,fontWeight:600,color:'#cbd5e1',textDecoration:'none',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)'}}>{l.label}</a>
              ))}
            </div>
            <div style={{padding:'8px 16px 32px',flex:1}}>
              {MOBILE_NAV.map((cat, i) => (
                <div key={cat.label} style={{marginBottom:8}}>
                  <button onClick={() => setExpanded(expanded === i ? null : i)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',borderRadius:14,cursor:'pointer',background: expanded === i ? 'rgba(240,200,66,0.09)' : 'rgba(255,255,255,0.04)',border: expanded === i ? '1px solid rgba(240,200,66,0.22)' : '1px solid rgba(255,255,255,0.06)'}}>
                    <div style={{textAlign:'left'}}>
                      <div style={{fontSize:14,fontWeight:700,color: expanded === i ? '#f0c842' : '#e2e8f0'}}>{cat.label}</div>
                      <div style={{fontSize:11,color:'#64748b'}}>{cat.tools.length} calculators</div>
                    </div>
                    <span style={{color:'#64748b',fontSize:11,transition:'transform 0.2s',display:'inline-block',transform: expanded === i ? 'rotate(180deg)' : 'none'}}>{String.fromCharCode(9660)}</span>
                  </button>
                  {expanded === i && (
                    <div style={{marginTop:6,paddingLeft:4,paddingRight:4,display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                      {cat.tools.map(tool => (
                        <a key={tool.href} href={tool.href} onClick={() => setMenuOpen(false)} style={{padding:'8px 12px',borderRadius:10,fontSize:12,fontWeight:500,color:'#cbd5e1',textDecoration:'none',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)',lineHeight:'1.4'}}>{tool.name}</a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{padding:'16px 20px',borderTop:'1px solid rgba(255,255,255,0.07)',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{color:'#475569',fontSize:12}}>2026 FreeFinCalc.net</span>
              <div style={{display:'flex',gap:16}}>
                <a href="/privacy-policy" style={{fontSize:12,color:'#64748b',textDecoration:'none'}}>Privacy</a>
                <a href="/terms" style={{fontSize:12,color:'#64748b',textDecoration:'none'}}>Terms</a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
`;

writeFile(path.join(BASE, 'components', 'Header.js'), headerJS);
console.log('  Done: components/Header.js (mega menu + mobile drawer)');


// ================================================================
// 2. HOMEPAGE METADATA
// ================================================================

const pageJS = `import PageClient from './PageClient'
export const metadata = {
  title: 'Free Financial Calculators 2026 - Mortgage, Tax, Retirement, Debt | FreeFinCalc',
  description: '470+ free financial calculators: mortgage, tax, retirement, debt payoff, investing, budget planner, cost of living, and more. Instant results, 40+ currencies, no sign-up.',
  alternates: { canonical: 'https://www.freefincalc.net' },
  openGraph: {
    title: 'Free Financial Calculators 2026 | FreeFinCalc',
    description: '470+ free calculators for mortgage, tax, retirement, investing, debt, and budgeting. Instant results in 40+ currencies.',
    url: 'https://www.freefincalc.net/',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
}
export default function Page() { return <PageClient /> }
`;

writeFile(path.join(APP, 'page.js'), pageJS);
console.log('  Done: app/page.js (SEO metadata)');


// ================================================================
// 3. HOMEPAGE CLIENT — Full redesign
// ================================================================

const pageClientJS = `'use client'
import { useState, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdUnit from '../components/AdUnit'
import FaqSchema from '../components/FaqSchema'

const POPULAR = [
  { name: 'Mortgage Calculator', href: '/mortgage-calculator', desc: 'Monthly payments & amortization' },
  { name: 'Tax Calculator', href: '/tax-calculator', desc: '2026 federal tax brackets' },
  { name: 'Retirement Calculator', href: '/retirement-calculator', desc: 'Are you on track to retire?' },
  { name: '401k Calculator', href: '/401k-calculator', desc: 'Employer match & growth' },
  { name: 'Credit Card Payoff', href: '/credit-card-payoff-calculator', desc: 'Pay off cards faster' },
  { name: 'Car Loan Calculator', href: '/car-loan-calculator', desc: 'Auto loan payments' },
  { name: 'Budget Planner', href: '/budget-planner-calculator', desc: '50/30/20 budgeting' },
  { name: 'FIRE Calculator', href: '/fire-calculator', desc: 'Financial independence number' },
  { name: 'Salary After Tax', href: '/salary-after-tax-calculator', desc: 'Exact take-home pay' },
  { name: 'Net Worth Calculator', href: '/net-worth-calculator', desc: 'Assets minus liabilities' },
  { name: 'Student Loan', href: '/student-loan-calculator', desc: 'Repayment plans compared' },
  { name: 'Debt Payoff', href: '/debt-payoff-calculator', desc: 'Custom payoff plan' },
]

const SECTIONS = [
  {
    title: 'Mortgage & Home',
    desc: '15 calculators for home buyers and homeowners',
    color: '#3b82f6',
    tools: [
      { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
      { name: 'Amortization', href: '/amortization-calculator' },
      { name: 'Refinance', href: '/refinance-calculator' },
      { name: 'Home Affordability', href: '/home-affordability-calculator' },
      { name: 'HELOC', href: '/heloc-calculator' },
      { name: 'Property Tax', href: '/property-tax-calculator' },
      { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator' },
      { name: 'Down Payment', href: '/down-payment-calculator' },
    ],
  },
  {
    title: 'Debt & Credit',
    desc: '12 tools to get out of debt faster',
    color: '#ef4444',
    tools: [
      { name: 'Credit Card Payoff', href: '/credit-card-payoff-calculator' },
      { name: 'Debt Payoff', href: '/debt-payoff-calculator' },
      { name: 'Debt Snowball', href: '/debt-snowball-calculator' },
      { name: 'Debt Avalanche', href: '/debt-avalanche-calculator' },
      { name: 'Balance Transfer', href: '/balance-transfer-calculator' },
      { name: 'Debt Consolidation', href: '/debt-consolidation-calculator' },
      { name: 'Debt-to-Income', href: '/debt-to-income-calculator' },
      { name: 'Credit Utilization', href: '/credit-utilization-calculator' },
    ],
  },
  {
    title: 'Retirement & Investing',
    desc: '20 tools for long-term wealth building',
    color: '#10b981',
    tools: [
      { name: 'Retirement', href: '/retirement-calculator' },
      { name: '401k', href: '/401k-calculator' },
      { name: 'Roth IRA', href: '/roth-ira-calculator' },
      { name: 'FIRE', href: '/fire-calculator' },
      { name: 'Investment Return', href: '/investment-return-calculator' },
      { name: 'Dividend', href: '/dividend-calculator' },
      { name: 'Dollar Cost Avg', href: '/dollar-cost-averaging-calculator' },
      { name: 'Social Security', href: '/social-security-calculator' },
    ],
  },
  {
    title: 'Tax & Salary',
    desc: '12 tools for tax planning and income',
    color: '#ec4899',
    tools: [
      { name: 'Income Tax', href: '/tax-calculator' },
      { name: 'Salary After Tax', href: '/salary-after-tax-calculator' },
      { name: 'Paycheck', href: '/paycheck-calculator' },
      { name: 'Capital Gains Tax', href: '/capital-gains-tax-calculator' },
      { name: 'Self-Employment Tax', href: '/self-employment-tax-calculator' },
      { name: 'Hourly to Salary', href: '/hourly-to-salary-calculator' },
      { name: 'Freelance Rate', href: '/freelance-rate-calculator' },
      { name: 'Overtime Pay', href: '/overtime-pay-calculator' },
    ],
  },
]

const COMPARISONS = [
  { name: '401k vs Roth IRA', href: '/401k-vs-roth-ira' },
  { name: 'Roth IRA vs Traditional IRA', href: '/roth-ira-vs-traditional-ira' },
  { name: 'Debt Snowball vs Avalanche', href: '/debt-snowball-vs-avalanche' },
  { name: '15 vs 30 Year Mortgage', href: '/15-vs-30-year-mortgage' },
  { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator' },
  { name: 'Lease vs Buy Car', href: '/lease-vs-buy-calculator' },
]

const COL_STATES = [
  { name: 'California', slug: 'california' },
  { name: 'Texas', slug: 'texas' },
  { name: 'Florida', slug: 'florida' },
  { name: 'New York', slug: 'new-york' },
  { name: 'Illinois', slug: 'illinois' },
  { name: 'Georgia', slug: 'georgia' },
  { name: 'North Carolina', slug: 'north-carolina' },
  { name: 'Ohio', slug: 'ohio' },
  { name: 'Tennessee', slug: 'tennessee' },
  { name: 'Washington', slug: 'washington' },
]

const faqs = [
  { q: 'How many calculators does FreeFinCalc have?', a: 'FreeFinCalc offers over 470 free financial calculators covering mortgage, tax, retirement, investing, debt payoff, budgeting, cost of living, business, auto loans, and more. Every calculator is 100% free with no sign-up required.' },
  { q: 'Are the calculators accurate?', a: 'Yes. All calculators use industry-standard mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor.' },
  { q: 'Can I use these calculators outside the US?', a: 'Yes. Use the currency selector in the header to switch between 40+ currencies including USD, EUR, GBP, CAD, AUD, and more. The calculators adapt to your selected currency automatically.' },
  { q: 'Is my data private?', a: 'Completely. All calculations happen in your browser. Nothing you enter is sent to our servers or stored anywhere. Your financial data stays on your device.' },
  { q: 'How often are calculators updated?', a: 'We update our calculators regularly to reflect current tax brackets, interest rates, and financial regulations. Formulas and default values are reviewed quarterly.' },
]

export default function HomePage() {
  const [search, setSearch] = useState('')

  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 1200, margin: '0 auto', padding: '0 16px' },
    hero: { position: 'relative', padding: '48px 16px 40px', textAlign: 'center', overflow: 'hidden' },
    heroGlow: { position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(240,200,66,0.1) 0%, transparent 70%)' },
    badge: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 700, background: 'rgba(240,200,66,0.1)', border: '1px solid rgba(240,200,66,0.25)', color: '#f0c842', marginBottom: 16 },
    h1: { fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 16px', color: '#fff' },
    h1Gold: { color: '#f0c842' },
    sub: { fontSize: 16, color: '#94a3b8', maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.6 },
    searchWrap: { position: 'relative', maxWidth: 560, margin: '0 auto 24px' },
    searchInput: { width: '100%', padding: '14px 20px 14px 48px', borderRadius: 16, fontSize: 16, color: '#fff', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', outline: 'none', fontFamily: 'inherit' },
    searchIcon: { position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: 18, pointerEvents: 'none' },
    statsBar: { display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' },
    statItem: { textAlign: 'center' },
    statNum: { fontSize: 22, fontWeight: 900, color: '#fff' },
    statLabel: { fontSize: 12, color: '#64748b', marginTop: 2 },
    section: { marginBottom: 48 },
    sectionTitle: { fontSize: 24, fontWeight: 800, color: '#f1f5f9', margin: '0 0 4px' },
    sectionSub: { fontSize: 14, color: '#64748b', margin: '0 0 20px' },
    toolGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 10 },
    toolCard: { padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', transition: 'all 0.15s' },
    toolName: { fontSize: 13, fontWeight: 600, color: '#e2e8f0' },
    popGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 },
    popCard: { padding: '18px 20px', borderRadius: 14, background: 'rgba(240,200,66,0.04)', border: '1px solid rgba(240,200,66,0.12)', textDecoration: 'none', transition: 'all 0.15s' },
    popName: { fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 },
    popDesc: { fontSize: 12, color: '#64748b' },
    compGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 },
    compCard: { padding: '14px 18px', borderRadius: 12, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', textDecoration: 'none', color: '#a5b4fc', fontSize: 14, fontWeight: 600, transition: 'all 0.15s' },
    colGrid: { display: 'flex', flexWrap: 'wrap', gap: 8 },
    colTag: { padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', color: '#94a3b8', fontSize: 12, fontWeight: 600 },
    cta: { borderRadius: 20, padding: '40px 32px', textAlign: 'center', background: 'rgba(240,200,66,0.06)', border: '1px solid rgba(240,200,66,0.15)', marginBottom: 48 },
    ctaBtn: { display: 'inline-block', padding: '14px 32px', borderRadius: 14, background: '#f0c842', color: '#0a0c14', fontWeight: 800, fontSize: 15, textDecoration: 'none', marginTop: 16 },
    faqBox: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28, marginBottom: 48 },
    faqItem: { borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 18, marginBottom: 18 },
    trustGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 48 },
    trustCard: { padding: 24, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' },
  }

  return (
    <div style={st.page}>
      <FaqSchema faqs={faqs} />
      <Header />
      <AdUnit slot="7405024590" />

      {/* Hero */}
      <section style={st.hero}>
        <div style={st.heroGlow} />
        <div style={{position:'relative',maxWidth:700,margin:'0 auto'}}>
          <div style={st.badge}>470+ Free Financial Calculators</div>
          <h1 style={st.h1}>Calculate Smarter.<br /><span style={st.h1Gold}>Plan Better.</span></h1>
          <p style={st.sub}>Mortgage, tax, retirement, investing, debt payoff, budgeting and more. Instant results in 40+ currencies. No sign-up required.</p>

          <div style={st.searchWrap}>
            <span style={st.searchIcon}>&#128269;</span>
            <input type="text" placeholder="Search 470+ calculators..." value={search} onChange={e => setSearch(e.target.value)} style={st.searchInput} />
          </div>

          <div style={st.statsBar}>
            {[['470+','Calculators'],['1,400+','Pages'],['40+','Currencies'],['4.9/5','Rating']].map(([n,l]) => (
              <div key={l} style={st.statItem}>
                <div style={st.statNum}>{n}</div>
                <div style={st.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={st.wrap}>

        {/* Popular Calculators */}
        <div style={st.section}>
          <h2 style={st.sectionTitle}>Most Popular Calculators</h2>
          <p style={st.sectionSub}>Our most-used tools by visitors</p>
          <div style={st.popGrid}>
            {POPULAR.map(t => (
              <a key={t.href} href={t.href} style={st.popCard}>
                <div style={st.popName}>{t.name}</div>
                <div style={st.popDesc}>{t.desc}</div>
              </a>
            ))}
          </div>
        </div>

        <AdUnit slot="3248634657" />

        {/* Calculator Sections */}
        {SECTIONS.map(sec => (
          <div key={sec.title} style={st.section}>
            <h2 style={{...st.sectionTitle, borderLeft: '4px solid ' + sec.color, paddingLeft: 12}}>{sec.title}</h2>
            <p style={st.sectionSub}>{sec.desc}</p>
            <div style={st.toolGrid}>
              {sec.tools.map(t => (
                <a key={t.href} href={t.href} style={st.toolCard}>
                  <div style={st.toolName}>{t.name}</div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Comparisons */}
        <div style={st.section}>
          <h2 style={st.sectionTitle}>Head-to-Head Comparisons</h2>
          <p style={st.sectionSub}>Side-by-side financial comparisons to help you decide</p>
          <div style={st.compGrid}>
            {COMPARISONS.map(c => (
              <a key={c.href} href={c.href} style={st.compCard}>{c.name}</a>
            ))}
          </div>
        </div>

        {/* Cost of Living */}
        <div style={st.section}>
          <h2 style={st.sectionTitle}>Cost of Living by State</h2>
          <p style={st.sectionSub}>Explore living costs across all 50 states</p>
          <div style={st.colGrid}>
            {COL_STATES.map(s => (
              <a key={s.slug} href={'/cost-of-living-calculator/state/' + s.slug} style={st.colTag}>{s.name}</a>
            ))}
            <a href="/cost-of-living-calculator" style={{...st.colTag, color:'#f0c842', borderColor:'rgba(240,200,66,0.3)'}}>View All 50 States</a>
          </div>
        </div>

        {/* Trust */}
        <div style={st.trustGrid}>
          {[
            { icon: String.fromCharCode(9889), title: 'Instant Results', desc: 'All calculations happen in your browser. No waiting, no loading, no server calls.' },
            { icon: String.fromCharCode(128274), title: '100% Private', desc: 'We never store your data. Nothing you enter is sent to a server or tracked.' },
            { icon: String.fromCharCode(127758), title: '40+ Currencies', desc: 'Switch currency globally across every calculator in a single click.' },
          ].map(f => (
            <div key={f.title} style={st.trustCard}>
              <div style={{fontSize:32,marginBottom:10}}>{f.icon}</div>
              <h3 style={{fontSize:16,fontWeight:700,color:'#fff',marginBottom:6,marginTop:0}}>{f.title}</h3>
              <p style={{fontSize:13,color:'#64748b',margin:0,lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Blog CTA */}
        <div style={st.cta}>
          <h2 style={{fontSize:24,fontWeight:800,color:'#fff',margin:'0 0 8px'}}>Financial Guides & Tutorials</h2>
          <p style={{fontSize:15,color:'#94a3b8',margin:0}}>41 in-depth articles on mortgages, investing, budgeting, retirement, and more.</p>
          <a href="/blog" style={st.ctaBtn}>Browse All Guides</a>
        </div>

        {/* FAQ */}
        <div style={st.faqBox}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f1f5f9',margin:'0 0 20px'}}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={i < faqs.length - 1 ? st.faqItem : {paddingBottom:8}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>{faq.q}</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  )
}
`;

writeFile(path.join(APP, 'PageClient.js'), pageClientJS);
console.log('  Done: app/PageClient.js (homepage redesign)');


console.log('');
console.log('=====================================================');
console.log('  REDESIGN COMPLETE');
console.log('');
console.log('  Header:');
console.log('    - Desktop mega menu (6 columns, 48 links)');
console.log('    - Direct nav: Comparisons, Cost of Living, Blog');
console.log('    - "Try Free" CTA button');
console.log('    - Currency picker retained');
console.log('    - Mobile hamburger drawer (8 categories)');
console.log('');
console.log('  Homepage:');
console.log('    - Hero: "Calculate Smarter. Plan Better."');
console.log('    - Stats bar: 470+, 1400+, 40+, 4.9/5');
console.log('    - 12 popular calculator cards');
console.log('    - 4 category sections (Mortgage, Debt, Retire, Tax)');
console.log('    - Comparisons section (6 links)');
console.log('    - Cost of Living by State (10 + view all)');
console.log('    - Trust section (3 cards)');
console.log('    - Blog CTA');
console.log('    - 5 FAQs with schema');
console.log('    - 2 ad placements');
console.log('');
console.log('  SEO metadata improved');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  node redesign_ffc.js');
console.log('  git add .');
console.log('  git commit -m "Redesign header mega menu + homepage"');
console.log('  git push origin master');
console.log('');
