'use client'
import { useState } from 'react'
import states from '../../../../data/states'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

// Pre-render all 50 state pages at build time
export async function generateStaticParams() {
  return states.map(s => ({ state: s.slug }))
}

function fmt(n) {
  if (!n && n !== 0) return '$0'
  return '$' + Math.round(n).toLocaleString('en-US')
}

function calcMortgage(price, downPct, rate, termYears, taxRate, insurance) {
  const down    = price * downPct / 100
  const loan    = price - down
  const mo      = rate / 100 / 12
  const n       = termYears * 12
  const pi      = mo > 0 ? loan * mo / (1 - Math.pow(1 + mo, -n)) : loan / n
  const tax     = price * taxRate / 100 / 12
  const ins     = insurance / 12
  const pmi     = downPct < 20 ? loan * 0.005 / 12 : 0
  return { pi, tax, ins, pmi, total: pi + tax + ins + pmi, loan, down, totalInterest: pi * n - loan }
}

export default function StateMortgagePage({ params }) {
  const state = states.find(s => s.slug === params.state)
  if (!state) return notFound()

  const [price,    setPrice]    = useState(state.medianPrice)
  const [downPct,  setDownPct]  = useState(state.downPct)
  const [rate,     setRate]     = useState(state.rate)
  const [term,     setTerm]     = useState(30)

  const r   = calcMortgage(price, downPct, rate, term, state.tax, state.insurance)
  const pct = v => Math.round(v / r.total * 100)

  const styles = {
    page:      { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0', fontFamily:'inherit' },
    wrap:      { maxWidth:900, margin:'0 auto', padding:'32px 16px 64px' },
    hero:      { marginBottom:32 },
    breadcrumb:{ fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, alignItems:'center', flexWrap:'wrap' },
    bcLink:    { color:'#64748b', textDecoration:'none' },
    h1:        { fontSize:'clamp(22px,4vw,34px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px', lineHeight:1.2 },
    sub:       { fontSize:15, color:'#94a3b8', margin:0 },
    grid:      { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 },
    card:      { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 },
    label:     { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    value:     { fontSize:28, fontWeight:800, color:'#f0c842', margin:'0 0 12px' },
    slider:    { width:'100%', accentColor:'#f0c842', marginTop:4 },
    input:     { width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, color:'#f1f5f9', fontSize:15, padding:'8px 12px', boxSizing:'border-box' },
    breakdown: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:24 },
    bRow:      { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    bLabel:    { fontSize:14, color:'#94a3b8' },
    bVal:      { fontSize:14, fontWeight:700, color:'#e2e8f0' },
    totalRow:  { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0 0' },
    totalLabel:{ fontSize:15, fontWeight:700, color:'#f1f5f9' },
    totalVal:  { fontSize:22, fontWeight:800, color:'#f0c842' },
    bar:       { display:'flex', borderRadius:8, overflow:'hidden', height:10, marginTop:12 },
    article:   { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:28, marginBottom:24 },
    h2:        { fontSize:20, fontWeight:700, color:'#f1f5f9', margin:'0 0 16px' },
    h3:        { fontSize:16, fontWeight:700, color:'#e2e8f0', margin:'20px 0 8px' },
    p:         { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 12px' },
    badge:     { display:'inline-block', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700, background:'rgba(240,200,66,0.12)', color:'#f0c842', border:'1px solid rgba(240,200,66,0.2)', marginRight:8, marginBottom:8 },
    tip:       { background:'rgba(240,200,66,0.06)', border:'1px solid rgba(240,200,66,0.15)', borderRadius:12, padding:16, marginTop:16 },
    tipText:   { fontSize:14, color:'#d4a800', margin:0 },
    stateGrid: { display:'flex', flexWrap:'wrap', gap:8, marginTop:12 },
    stateLink: { display:'inline-block', padding:'6px 14px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:13 },
  }

  return (
    <div style={styles.page}>
      <Header />
      <div style={styles.wrap}>

        {/* Breadcrumb */}
        <nav style={styles.breadcrumb}>
          <a href="/" style={styles.bcLink}>Home</a>
          <span>›</span>
          <a href="/mortgage-calculator" style={styles.bcLink}>Mortgage Calculator</a>
          <span>›</span>
          <span style={{color:'#94a3b8'}}>{state.name}</span>
        </nav>

        {/* Hero */}
        <div style={styles.hero}>
          <h1 style={styles.h1}>{state.name} Mortgage Calculator 2026</h1>
          <p style={styles.sub}>
            Real {state.name} home prices, property tax rates, and mortgage rates — updated for 2026.
          </p>
        </div>

        {/* Inputs */}
        <div style={styles.grid}>
          <div style={styles.card}>
            <label style={styles.label}>Home Price</label>
            <div style={styles.value}>{fmt(price)}</div>
            <input type="range" min={50000} max={state.medianPrice * 3} step={5000}
              value={price} onChange={e => setPrice(+e.target.value)} style={styles.slider} />
          </div>
          <div style={styles.card}>
            <label style={styles.label}>Down Payment ({downPct}%)</label>
            <div style={styles.value}>{fmt(price * downPct / 100)}</div>
            <input type="range" min={3} max={50} step={1}
              value={downPct} onChange={e => setDownPct(+e.target.value)} style={styles.slider} />
          </div>
          <div style={styles.card}>
            <label style={styles.label}>Interest Rate</label>
            <div style={styles.value}>{rate}%</div>
            <input type="range" min={3} max={12} step={0.05}
              value={rate} onChange={e => setRate(+e.target.value)} style={styles.slider} />
          </div>
          <div style={styles.card}>
            <label style={styles.label}>Loan Term</label>
            <div style={styles.value}>{term} years</div>
            <input type="range" min={10} max={30} step={5}
              value={term} onChange={e => setTerm(+e.target.value)} style={styles.slider} />
          </div>
        </div>

        {/* Breakdown */}
        <div style={styles.breakdown}>
          <h2 style={{...styles.h2, marginBottom:12}}>Monthly Payment Breakdown</h2>
          <div style={styles.bar}>
            <div style={{width:pct(r.pi)+'%', background:'#f0c842'}} title={'P&I '+fmt(r.pi)} />
            <div style={{width:pct(r.tax)+'%', background:'#3b82f6'}} title={'Tax '+fmt(r.tax)} />
            <div style={{width:pct(r.ins)+'%', background:'#10b981'}} title={'Insurance '+fmt(r.ins)} />
            {r.pmi > 0 && <div style={{width:pct(r.pmi)+'%', background:'#f59e0b'}} title={'PMI '+fmt(r.pmi)} />}
          </div>
          <div style={{marginTop:16}}>
            <div style={styles.bRow}><span style={styles.bLabel}>Principal & Interest</span><span style={styles.bVal}>{fmt(r.pi)}/mo</span></div>
            <div style={styles.bRow}><span style={styles.bLabel}>Property Tax ({state.tax}%)</span><span style={styles.bVal}>{fmt(r.tax)}/mo</span></div>
            <div style={styles.bRow}><span style={styles.bLabel}>Homeowners Insurance</span><span style={styles.bVal}>{fmt(r.ins)}/mo</span></div>
            {r.pmi > 0 && <div style={styles.bRow}><span style={styles.bLabel}>PMI (removed at 20% equity)</span><span style={styles.bVal}>{fmt(r.pmi)}/mo</span></div>}
            <div style={styles.totalRow}><span style={styles.totalLabel}>Total Monthly Payment</span><span style={styles.totalVal}>{fmt(r.total)}/mo</span></div>
          </div>
          <div style={{marginTop:16, padding:'12px 16px', background:'rgba(255,255,255,0.03)', borderRadius:10}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:13, color:'#64748b'}}>
              <span>Loan Amount: <strong style={{color:'#e2e8f0'}}>{fmt(r.loan)}</strong></span>
              <span>Down Payment: <strong style={{color:'#e2e8f0'}}>{fmt(r.down)}</strong></span>
              <span>Total Interest: <strong style={{color:'#e2e8f0'}}>{fmt(r.totalInterest)}</strong></span>
            </div>
          </div>
        </div>

        {/* Article */}
        <div style={styles.article}>
          <div style={{marginBottom:16}}>
            <span style={styles.badge}>{state.name} Mortgage Rates 2026</span>
            <span style={styles.badge}>{state.abbr} Home Buying Guide</span>
            <span style={styles.badge}>Property Tax {state.tax}%</span>
          </div>

          <h2 style={styles.h2}>Mortgage Calculator for {state.name} — 2026 Guide</h2>

          <p style={styles.p}>
            {state.name} is {state.desc}. With a median home price of <strong style={{color:'#e2e8f0'}}>{fmt(state.medianPrice)}</strong> and
            current mortgage rates averaging around <strong style={{color:'#e2e8f0'}}>{state.rate}%</strong> in 2026,
            a buyer putting {state.downPct}% down borrows <strong style={{color:'#e2e8f0'}}>{fmt(r.loan)}</strong> and
            pays approximately <strong style={{color:'#f0c842'}}>{fmt(calcMortgage(state.medianPrice, state.downPct, state.rate, 30, state.tax, state.insurance).total)}/month</strong> including
            principal, interest, property taxes, and homeowners insurance.
          </p>

          <h3 style={styles.h3}>Property Taxes in {state.name}</h3>
          <p style={styles.p}>
            {state.name} has a statewide average effective property tax rate of <strong style={{color:'#e2e8f0'}}>{state.tax}%</strong>.
            On the median {state.name} home, that is <strong style={{color:'#e2e8f0'}}>{fmt(state.medianPrice * state.tax / 100)} per year</strong> or about <strong style={{color:'#e2e8f0'}}>{fmt(state.medianPrice * state.tax / 100 / 12)}/month</strong>.
            {state.tax > 1.5
              ? ` ${state.name} property taxes are above the national average — budget carefully for this ongoing expense.`
              : state.tax < 0.7
              ? ` ${state.name} property taxes are well below the national average of 1.1% — a real financial advantage.`
              : ` ${state.name} property taxes are near the national average of 1.1%.`}
          </p>

          <h3 style={styles.h3}>{state.name} State Tax Tip</h3>
          <div style={styles.tip}>
            <p style={styles.tipText}>💡 {state.tip}</p>
          </div>

          <h3 style={styles.h3}>How Much Income Do You Need to Buy in {state.name}?</h3>
          <p style={styles.p}>
            Using the standard 28% housing cost guideline, a buyer purchasing the median {state.name} home
            needs a gross household income of at least <strong style={{color:'#e2e8f0'}}>{fmt(calcMortgage(state.medianPrice, state.downPct, state.rate, 30, state.tax, state.insurance).total / 0.28 * 12)} per year</strong> to
            stay within recommended limits. Many buyers stretch to 32-36% of income, especially
            in higher-cost markets. Use the sliders above to find a price that fits your budget.
          </p>

          <h3 style={styles.h3}>Down Payment Options in {state.name}</h3>
          <p style={styles.p}>
            A 20% down payment on the median {state.name} home is <strong style={{color:'#e2e8f0'}}>{fmt(state.medianPrice * 0.2)}</strong>.
            If that is out of reach, FHA loans allow 3.5% down ({fmt(state.medianPrice * 0.035)}),
            conventional loans start at 3% ({fmt(state.medianPrice * 0.03)}),
            and VA loans offer 0% down for eligible veterans and service members.
            Putting less than 20% down adds PMI — typically 0.5% of the loan per year —
            which is automatically removed once you reach 20% equity.
          </p>

          <h3 style={styles.h3}>Total Cost of a {state.name} Mortgage</h3>
          <p style={styles.p}>
            On a 30-year mortgage for the median {state.name} home at {state.rate}%, you would pay
            <strong style={{color:'#e2e8f0'}}> {fmt(calcMortgage(state.medianPrice, state.downPct, state.rate, 30, state.tax, state.insurance).totalInterest)} in total interest</strong> over
            the life of the loan. That is why many buyers consider a 15-year mortgage or make
            extra principal payments. Use the sliders to see how rate and term changes affect your total cost.
          </p>
        </div>

        {/* Related calculators */}
        <div style={styles.article}>
          <h2 style={styles.h2}>Related Calculators</h2>
          <div style={{display:'flex', flexWrap:'wrap', gap:10}}>
            {[
              {href:'/mortgage-calculator',           label:'Mortgage Calculator'},
              {href:'/refinance-calculator',           label:'Refinance Calculator'},
              {href:'/down-payment-calculator',        label:'Down Payment Calculator'},
              {href:'/property-tax-calculator',        label:'Property Tax Calculator'},
              {href:'/home-affordability-calculator',  label:'Home Affordability'},
              {href:'/rent-vs-buy-calculator',         label:'Rent vs Buy'},
            ].map(({href, label}) => (
              <a key={href} href={href} style={{
                display:'inline-block', padding:'8px 16px',
                background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)',
                borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600,
              }}>{label}</a>
            ))}
          </div>
        </div>

        {/* Other states */}
        <div style={styles.article}>
          <h2 style={styles.h2}>Mortgage Calculator by State</h2>
          <div style={styles.stateGrid}>
            {states.filter(s => s.slug !== state.slug).map(s => (
              <a key={s.slug} href={'/mortgage-calculator/state/' + s.slug} style={styles.stateLink}>
                {s.name} ({s.abbr})
              </a>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
