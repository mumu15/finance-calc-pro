'use client'
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
,
  {
    label: 'Data & Research',
    tools: [
      { name: 'State Rankings (50)', href: '/data' },
      { name: 'Salary by Profession', href: '/salary-data' },
      { name: 'Financial by Age', href: '/financial-data' },
      { name: 'Mortgage Data', href: '/mortgage-data' },
      { name: 'Insurance Data', href: '/insurance-data' },
      { name: 'Credit Card Data', href: '/credit-card-data' },
      { name: 'Tax Brackets 2026', href: '/federal-tax-brackets' },
      { name: 'Min Wage by State', href: '/minimum-wage-by-state' },
    ],
  },
]

const DIRECT = [
  { label: 'Comparisons', href: '/401k-vs-roth-ira' },
  { label: 'Cost of Living', href: '/cost-of-living-calculator' },
  { label: 'Data', href: '/data' },
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
  {
    label: 'Data & Research',
    tools: [
      { name: 'All State Rankings', href: '/data' },
      { name: 'Salary by Profession', href: '/salary-data' },
      { name: 'Financial by Age', href: '/financial-data' },
      { name: 'Mortgage Data', href: '/mortgage-data' },
      { name: 'Insurance Data', href: '/insurance-data' },
      { name: 'Credit Card Data', href: '/credit-card-data' },
      { name: 'Tax Brackets 2026', href: '/federal-tax-brackets' },
      { name: 'Min Wage by State', href: '/minimum-wage-by-state' },
      { name: 'Property Tax Rates', href: '/property-tax-rates-by-state' },
      { name: 'Inflation by Year', href: '/inflation-rate-by-year' },
      { name: 'Social Security', href: '/social-security-benefits-by-age' },
      { name: '401k/IRA Limits', href: '/401k-ira-contribution-limits' },
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
      <style>{`
        .desktop-nav { display: none !important; }
        .desktop-cta { display: none !important; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
        }
      `}</style>

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
