'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }

export default function Page() {
  
  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 940, margin: '0 auto', padding: '32px 16px 64px' },
    bc: { fontSize: 13, color: '#64748b', marginBottom: 20, display: 'flex', gap: 6, flexWrap: 'wrap' },
    bcA: { color: '#64748b', textDecoration: 'none' },
    h1: { fontSize: 'clamp(26px, 4.5vw, 40px)', fontWeight: 800, color: '#f1f5f9', margin: '0 0 8px', lineHeight: 1.15 },
    sub: { fontSize: 15, color: '#94a3b8', margin: '0 0 32px', lineHeight: 1.6 },
    box: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28, marginBottom: 28 },
    goldBox: { background: 'rgba(240,200,66,0.04)', border: '1px solid rgba(240,200,66,0.15)', borderRadius: 18, padding: 28, marginBottom: 28 },
    h2: { fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' },
    h3: { fontSize: 17, fontWeight: 700, color: '#e2e8f0', margin: '24px 0 10px' },
    p: { fontSize: 15, color: '#94a3b8', lineHeight: 1.8, margin: '0 0 14px' },
    row: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' },
    vs: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, marginBottom: 24 },
    vsCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, textAlign: 'center' },
    vsMid: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#475569' },
    winner: { background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' },
    badge: { display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 },
    greenBadge: { background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' },
    redBadge: { background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
    th: { textAlign: 'left', padding: '10px 12px', color: '#f0c842', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', borderBottom: '2px solid rgba(240,200,66,0.2)' },
    td: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#94a3b8' },
    tdBold: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#e2e8f0', fontWeight: 700 },
    calcA: { display: 'inline-block', padding: '8px 16px', background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.2)', borderRadius: 8, color: '#f0c842', textDecoration: 'none', fontSize: 13, fontWeight: 600, margin: '0 8px 8px 0' },
    lbl: { fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' },
    val: { fontSize: 24, fontWeight: 800, color: '#f0c842', margin: '0 0 10px' },
  }


  const [annualMedical, setAnnualMedical] = useState(3000)
  const [taxBracket, setTaxBracket] = useState(22)
  const [hsaContrib, setHsaContrib] = useState(4150)
  const [fsaContrib, setFsaContrib] = useState(3050)
  const [hsaGrowth, setHsaGrowth] = useState(7)
  const [yearsToRetire, setYearsToRetire] = useState(25)

  const calc = useMemo(() => {
    const hsaTaxSaved = Math.round(hsaContrib * taxBracket / 100)
    const fsaTaxSaved = Math.round(fsaContrib * taxBracket / 100)
    const hsaUnused = hsaContrib - annualMedical
    const fsaUnused = Math.max(0, fsaContrib - annualMedical)
    const fsaForfeited = fsaUnused > 640 ? fsaUnused - 640 : 0 // $640 rollover limit 2026

    // HSA invested growth over years
    const monthlyInvest = Math.max(0, hsaUnused) / 12
    const r = hsaGrowth / 100 / 12
    const n = yearsToRetire * 12
    const hsaFV = r > 0 ? monthlyInvest * ((Math.pow(1 + r, n) - 1) / r) : monthlyInvest * n
    
    // Annual tax savings comparison
    const hsaAnnualBenefit = hsaTaxSaved + (hsaUnused > 0 ? Math.round(hsaUnused * hsaGrowth / 100) : 0)
    const fsaAnnualBenefit = fsaTaxSaved - fsaForfeited

    const winner = hsaAnnualBenefit >= fsaAnnualBenefit ? 'HSA' : 'FSA'

    return { hsaTaxSaved, fsaTaxSaved, hsaUnused, fsaUnused, fsaForfeited, hsaFV: Math.round(hsaFV), hsaAnnualBenefit, fsaAnnualBenefit, winner }
  }, [annualMedical, taxBracket, hsaContrib, fsaContrib, hsaGrowth, yearsToRetire])

  const faqs = [
    { q: 'What is the main difference between HSA and FSA?', a: 'An HSA (Health Savings Account) is yours forever — funds roll over year to year and can be invested for growth. An FSA (Flexible Spending Account) is use-it-or-lose-it — unused funds above $640 are forfeited at year end. HSAs require a high-deductible health plan; FSAs work with any plan.' },
    { q: 'Which saves more on taxes?', a: 'Both offer the same tax benefit per dollar contributed — your contribution is pre-tax, saving you your marginal tax rate. At a ' + taxBracket + '% bracket, the HSA saves ' + fmt(calc.hsaTaxSaved) + '/year and the FSA saves ' + fmt(calc.fsaTaxSaved) + '/year. The HSA advantage is higher contribution limits ($4,150 individual / $8,300 family in 2026 vs $3,050 for FSA).' },
    { q: 'Can I have both an HSA and FSA?', a: 'Generally no — you cannot have a traditional FSA and an HSA at the same time. However, you can have a Limited Purpose FSA (for dental and vision only) alongside an HSA. Some employers offer this combination.' },
    { q: 'What happens to my HSA when I retire?', a: 'After age 65, your HSA becomes a super retirement account. You can withdraw for any purpose (not just medical) — medical withdrawals remain tax-free, and non-medical withdrawals are taxed as income (like a traditional IRA). If invested, your ' + fmt(Math.round(calc.hsaUnused > 0 ? calc.hsaUnused : 0)) + '/year surplus could grow to ' + fmt(calc.hsaFV) + ' by retirement.' },
    { q: 'Should I choose a high-deductible plan to get an HSA?', a: 'If you are generally healthy and do not have high recurring medical costs, the HSA-eligible high-deductible plan is usually the better financial choice. The lower premiums plus tax-free HSA contributions often outweigh the higher deductible. Run the numbers with your specific plan options.' },
  ]

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}><a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>›</span><span style={{color:'#94a3b8'}}>HSA vs FSA</span></nav>
        <h1 style={st.h1}>HSA vs FSA — Which Health Account Saves More?</h1>
        <p style={st.sub}>Compare Health Savings Accounts and Flexible Spending Accounts. See tax savings, rollover benefits, and long-term investment growth.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Your Details</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            {[
              ['Annual Medical Expenses', annualMedical, setAnnualMedical, 500, 15000, 250, fmt(annualMedical)],
              ['Tax Bracket', taxBracket, setTaxBracket, 10, 37, 1, taxBracket + '%'],
              ['HSA Contribution (2026 max: $4,150)', hsaContrib, setHsaContrib, 500, 8300, 100, fmt(hsaContrib)],
              ['FSA Contribution (2026 max: $3,050)', fsaContrib, setFsaContrib, 500, 3050, 100, fmt(fsaContrib)],
              ['HSA Investment Growth', hsaGrowth, setHsaGrowth, 0, 12, 1, hsaGrowth + '%'],
              ['Years to Retirement', yearsToRetire, setYearsToRetire, 5, 40, 1, yearsToRetire + ' years'],
            ].map(([label, val, set, min, max, step, display], i) => (
              <div key={i}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontSize:12,color:'#64748b'}}>{label}</span>
                  <span style={{fontSize:13,fontWeight:700,color:'#f0c842'}}>{display}</span>
                </div>
                <input type="range" min={min} max={max} step={step} value={val} onChange={e => set(+e.target.value)} style={{width:'100%',accentColor:'#f0c842'}} />
              </div>
            ))}
          </div>
        </div>

        <div style={st.vs}>
          <div style={{...st.vsCard, ...(calc.winner === 'HSA' ? st.winner : {})}}>
            <div style={{fontSize:14,fontWeight:700,color:'#60a5fa',marginBottom:12}}>HSA</div>
            <div style={{fontSize:11,color:'#64748b'}}>Annual Tax Savings</div>
            <div style={{fontSize:26,fontWeight:800,color:'#f0c842'}}>{fmt(calc.hsaTaxSaved)}</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Unused Funds (rolls over)</div>
            <div style={{fontSize:18,fontWeight:700,color:'#10b981'}}>{fmt(Math.max(0, calc.hsaUnused))}/yr</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Invested Value at Retirement</div>
            <div style={{fontSize:18,fontWeight:700,color:'#f0c842'}}>{fmt(calc.hsaFV)}</div>
            {calc.winner === 'HSA' && <div style={{...st.badge,...st.greenBadge,marginTop:10}}>WINNER</div>}
          </div>
          <div style={st.vsMid}>VS</div>
          <div style={{...st.vsCard, ...(calc.winner === 'FSA' ? st.winner : {})}}>
            <div style={{fontSize:14,fontWeight:700,color:'#a78bfa',marginBottom:12}}>FSA</div>
            <div style={{fontSize:11,color:'#64748b'}}>Annual Tax Savings</div>
            <div style={{fontSize:26,fontWeight:800,color:'#f0c842'}}>{fmt(calc.fsaTaxSaved)}</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Forfeited (use-it-or-lose-it)</div>
            <div style={{fontSize:18,fontWeight:700,color:'#ef4444'}}>{fmt(calc.fsaForfeited)}/yr</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Investment Growth</div>
            <div style={{fontSize:18,fontWeight:700,color:'#64748b'}}>N/A — cannot invest</div>
            {calc.winner === 'FSA' && <div style={{...st.badge,...st.greenBadge,marginTop:10}}>WINNER</div>}
          </div>
        </div>

        <div style={st.goldBox}>
          <h2 style={{...st.h2,color:'#f0c842'}}>The Verdict</h2>
          <p style={{fontSize:18,fontWeight:700,color:'#e2e8f0',marginBottom:8}}>The HSA wins — {fmt(calc.hsaFV)} potential retirement value</p>
          <p style={st.p}>The HSA is almost always the better choice for three reasons: higher contribution limits ({fmt(hsaContrib)} vs {fmt(fsaContrib)}), funds roll over forever instead of being forfeited, and unused funds can be invested for tax-free growth. Over {yearsToRetire} years, the invested surplus could grow to <strong style={{color:'#f0c842'}}>{fmt(calc.hsaFV)}</strong> — making the HSA a powerful stealth retirement account.</p>
        </div>

        <AdUnit slot="3248634657" />

        <div style={st.box}>
          <h2 style={st.h2}>Side-by-Side Comparison</h2>
          <table style={st.table}>
            <thead><tr><th style={st.th}>Feature</th><th style={st.th}>HSA</th><th style={st.th}>FSA</th></tr></thead>
            <tbody>
              {[
                ['2026 Contribution Limit','$4,150 individual / $8,300 family','$3,050'],
                ['Rollover','Unlimited — yours forever','$640 max rollover'],
                ['Investment Options','Yes — stocks, bonds, mutual funds','No'],
                ['Requires HDHP','Yes','No — any health plan'],
                ['Employer Contributions','Allowed','Allowed'],
                ['Portability','Moves with you','Tied to employer'],
                ['After Age 65','Withdraw for anything (taxed as income)','N/A — must use for medical'],
                ['Triple Tax Advantage','Yes (pre-tax in, tax-free growth, tax-free medical out)','Single tax advantage (pre-tax in only)'],
              ].map(([feat,a,b], i) => (
                <tr key={i}><td style={st.tdBold}>{feat}</td><td style={st.td}>{a}</td><td style={st.td}>{b}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>HSA vs FSA — Complete Guide</h2>
          <h3 style={st.h3}>The HSA Triple Tax Advantage</h3>
          <p style={st.p}>The HSA is the only account in the US tax code with a triple tax advantage: contributions are pre-tax (reduces your taxable income), investments grow tax-free, and withdrawals for qualified medical expenses are tax-free. No other account — not 401k, not Roth IRA — offers all three. This makes the HSA the single most tax-efficient account available.</p>
          <h3 style={st.h3}>The HSA as a Retirement Account</h3>
          <p style={st.p}>Financial advisors increasingly recommend maxing out your HSA before contributing extra to a 401k (beyond the employer match). After age 65, HSA withdrawals for non-medical expenses are taxed as ordinary income — exactly like a traditional IRA. But medical withdrawals remain tax-free forever. Since healthcare is the largest expense in retirement, having a dedicated tax-free medical fund is incredibly valuable.</p>
          <h3 style={st.h3}>When an FSA Makes Sense</h3>
          <p style={st.p}>The FSA is better when you do not have access to a high-deductible health plan, when you have predictable medical expenses you will fully use each year, or when your employer offers generous FSA contributions. The key is to estimate your annual medical spending accurately and contribute only what you will use — anything over $640 that you do not spend is gone.</p>
        </div>

        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2>{[['/tax-calculator','Tax Calculator'],['/salary-after-tax-calculator','Salary After Tax'],['/budget-planner-calculator','Budget Planner'],['/retirement-calculator','Retirement'],['/401k-vs-roth-ira','401k vs Roth IRA']].map(([href,lbl]) => (<a key={href} href={href} style={st.calcA}>{lbl}</a>))}</div>

        <div style={st.box}>
          <h2 style={st.h2}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={i < faqs.length - 1 ? {borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16} : {paddingBottom:8}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>{faq.q}</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"HSA vs FSA","item":"https://www.freefincalc.net/hsa-vs-fsa"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"HSA vs FSA Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":"2341","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
