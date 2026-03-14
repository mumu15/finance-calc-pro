'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';

function fmt(n) {
  if (!n && n !== 0) return '$0'
  return '$' + Math.round(n).toLocaleString('en-US')
}

function calcMortgage(price, downPct, rate, termYears, taxRate, insurance) {
  const down = price * downPct / 100
  const loan = price - down
  const mo   = rate / 100 / 12
  const n    = termYears * 12
  const pi   = mo > 0 ? loan * mo / (1 - Math.pow(1 + mo, -n)) : loan / n
  const tax  = price * taxRate / 100 / 12
  const ins  = insurance / 12
  const pmi  = downPct < 20 ? loan * 0.005 / 12 : 0
  return { pi, tax, ins, pmi, total: pi + tax + ins + pmi, loan, down, totalInterest: pi * n - loan }
}

export default function StateMortgageClient({ state, allStates }) {
  const [price,   setPrice]   = useState(state.medianPrice)
  const [downPct, setDownPct] = useState(state.downPct)
  const [rate,    setRate]    = useState(state.rate)
  const [term,    setTerm]    = useState(30)

  const r   = calcMortgage(price, downPct, rate, term, state.tax, state.insurance)
  const pct = v => Math.round(v / r.total * 100)

  const s = {
    page:     { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0', fontFamily:'inherit' },
    wrap:     { maxWidth:900, margin:'0 auto', padding:'32px 16px 64px' },
    bc:       { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:      { color:'#64748b', textDecoration:'none' },
    h1:       { fontSize:'clamp(22px,4vw,34px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px', lineHeight:1.2 },
    sub:      { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    grid:     { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 },
    card:     { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 },
    label:    { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:      { fontSize:28, fontWeight:800, color:'#f0c842', margin:'0 0 12px' },
    slider:   { width:'100%', accentColor:'#f0c842', marginTop:4 },
    box:      { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:24 },
    h2:       { fontSize:20, fontWeight:700, color:'#f1f5f9', margin:'0 0 16px' },
    h3:       { fontSize:16, fontWeight:700, color:'#e2e8f0', margin:'20px 0 8px' },
    p:        { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 12px' },
    bRow:     { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    bLbl:     { fontSize:14, color:'#94a3b8' },
    bVal:     { fontSize:14, fontWeight:700, color:'#e2e8f0' },
    total:    { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0 0' },
    bar:      { display:'flex', borderRadius:8, overflow:'hidden', height:10, marginTop:12, marginBottom:16 },
    badge:    { display:'inline-block', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700, background:'rgba(240,200,66,0.12)', color:'#f0c842', border:'1px solid rgba(240,200,66,0.2)', marginRight:8, marginBottom:8 },
    tip:      { background:'rgba(240,200,66,0.06)', border:'1px solid rgba(240,200,66,0.15)', borderRadius:12, padding:16, marginTop:12 },
    stateA:   { display:'inline-block', padding:'6px 14px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:13, margin:'0 6px 6px 0' },
    calcA:    { display:'inline-block', padding:'8px 16px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }

  const medianR = calcMortgage(state.medianPrice, state.downPct, state.rate, 30, state.tax, state.insurance)
  const taxNote = state.tax > 1.5
    ? state.name + ' property taxes are above the national average — budget carefully.'
    : state.tax < 0.7
    ? state.name + ' property taxes are well below the national average of 1.1% — a real advantage.'
    : state.name + ' property taxes are near the national average of 1.1%.'

  return (
    <div style={s.page}>
      <Header />
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Mortgage Calculator', url: 'https://www.freefincalc.net/mortgage-calculator' }
  ]} />
        <AdUnit slot="7405024590" />
      <div style={s.wrap}>

        <nav style={s.bc}>
          <a href="/" style={s.bcA}>Home</a><span>›</span>
          <a href="/mortgage-calculator" style={s.bcA}>Mortgage Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{state.name}</span>
        </nav>

        <h1 style={s.h1}>{state.name} Mortgage Calculator 2026</h1>
        <p style={s.sub}>Real {state.name} home prices, property taxes, and mortgage rates — updated for 2026.</p>

        {/* Inputs */}
        <div style={s.grid}>
          <div style={s.card}>
            <label style={s.label}>Home Price</label>
            <div style={s.val}>{fmt(price)}</div>
            <input type="number"
              value={price} onChange={e => setPrice(+e.target.value)} style={s.slider} />
          </div>
          <div style={s.card}>
            <label style={s.label}>Down Payment ({downPct}%)</label>
            <div style={s.val}>{fmt(price * downPct / 100)}</div>
            <input type="number"
              value={downPct} onChange={e => setDownPct(+e.target.value)} style={s.slider} />
          </div>
          <div style={s.card}>
            <label style={s.label}>Interest Rate</label>
            <div style={s.val}>{rate}%</div>
            <input type="number"
              value={rate} onChange={e => setRate(+e.target.value)} style={s.slider} />
          </div>
          <div style={s.card}>
            <label style={s.label}>Loan Term</label>
            <div style={s.val}>{term} years</div>
            <input type="number"
              value={term} onChange={e => setTerm(+e.target.value)} style={s.slider} />
          </div>
        </div>

        {/* Breakdown */}
        <div style={s.box}>
          <h2 style={s.h2}>Monthly Payment Breakdown</h2>
          <div style={s.bar}>
            <div style={{width:pct(r.pi)+'%',  background:'#f0c842'}} />
            <div style={{width:pct(r.tax)+'%', background:'#3b82f6'}} />
            <div style={{width:pct(r.ins)+'%', background:'#10b981'}} />
            {r.pmi > 0 && <div style={{width:pct(r.pmi)+'%', background:'#f59e0b'}} />}
          </div>
          <div style={s.bRow}><span style={s.bLbl}>Principal & Interest</span><span style={s.bVal}>{fmt(r.pi)}/mo</span></div>
          <div style={s.bRow}><span style={s.bLbl}>Property Tax ({state.tax}%)</span><span style={s.bVal}>{fmt(r.tax)}/mo</span></div>
          <div style={s.bRow}><span style={s.bLbl}>Homeowners Insurance</span><span style={s.bVal}>{fmt(r.ins)}/mo</span></div>
          {r.pmi > 0 && <div style={s.bRow}><span style={s.bLbl}>PMI</span><span style={s.bVal}>{fmt(r.pmi)}/mo</span></div>}
          <div style={s.total}>
            <span style={{fontSize:15, fontWeight:700, color:'#f1f5f9'}}>Total Monthly Payment</span>
            <span style={{fontSize:22, fontWeight:800, color:'#f0c842'}}>{fmt(r.total)}/mo</span>
          </div>
          <div style={{marginTop:14, padding:'10px 14px', background:'rgba(255,255,255,0.03)', borderRadius:10, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8, fontSize:13, color:'#64748b'}}>
            <span>Loan: <strong style={{color:'#e2e8f0'}}>{fmt(r.loan)}</strong></span>
            <span>Down: <strong style={{color:'#e2e8f0'}}>{fmt(r.down)}</strong></span>
            <span>Total Interest: <strong style={{color:'#e2e8f0'}}>{fmt(r.totalInterest)}</strong></span>
          </div>
        </div>

        {/* Article */}
        <div style={s.box}>
          <div style={{marginBottom:16}}>
            <span style={s.badge}>{state.name} Mortgage Rates 2026</span>
            <span style={s.badge}>{state.abbr} Home Buying</span>
            <span style={s.badge}>Property Tax {state.tax}%</span>
          </div>
          <h2 style={s.h2}>{state.name} Mortgage Calculator — 2026 Guide</h2>
          <p style={s.p}>
            {state.name} is {state.desc}. With a median home price of <strong style={{color:'#e2e8f0'}}>{fmt(state.medianPrice)}</strong> and
            mortgage rates around <strong style={{color:'#e2e8f0'}}>{state.rate}%</strong> in 2026,
            a buyer putting {state.downPct}% down pays approximately{' '}
            <strong style={{color:'#f0c842'}}>{fmt(medianR.total)}/month</strong> including
            principal, interest, property taxes, and homeowners insurance.
          </p>

          <h3 style={s.h3}>Property Taxes in {state.name}</h3>
          <p style={s.p}>
            {state.name} has an effective property tax rate of <strong style={{color:'#e2e8f0'}}>{state.tax}%</strong> — about{' '}
            <strong style={{color:'#e2e8f0'}}>{fmt(state.medianPrice * state.tax / 100)}/year</strong> or{' '}
            <strong style={{color:'#e2e8f0'}}>{fmt(state.medianPrice * state.tax / 100 / 12)}/month</strong> on the median home.{' '}
            {taxNote}
          </p>

          <h3 style={s.h3}>{state.name} Tax Tip</h3>
          <div style={s.tip}>
            <p style={{fontSize:14, color:'#d4a800', margin:0}}>💡 {state.tip}</p>
          </div>

          <h3 style={s.h3}>Income Needed to Buy in {state.name}</h3>
          <p style={s.p}>
            Using the 28% housing cost guideline, you need at least{' '}
            <strong style={{color:'#e2e8f0'}}>{fmt(medianR.total / 0.28 * 12)}/year</strong> gross
            household income to comfortably afford the median {state.name} home.
          </p>

          <h3 style={s.h3}>Down Payment Options in {state.name}</h3>
          <p style={s.p}>
            A 20% down payment is <strong style={{color:'#e2e8f0'}}>{fmt(state.medianPrice * 0.2)}</strong>.
            FHA loans allow 3.5% down ({fmt(state.medianPrice * 0.035)}),
            conventional loans start at 3% ({fmt(state.medianPrice * 0.03)}),
            and VA loans offer 0% down for eligible veterans.
            Putting less than 20% down adds PMI (~0.5%/year), removed at 20% equity.
          </p>

          <h3 style={s.h3}>Total Interest on a {state.name} Mortgage</h3>
          <p style={s.p}>
            On a 30-year loan at {state.rate}% you would pay{' '}
            <strong style={{color:'#e2e8f0'}}>{fmt(medianR.totalInterest)} in total interest</strong>.
            A 15-year mortgage or extra principal payments can cut this significantly.
          </p>
        </div>

        {/* Related calculators */}
        <div style={s.box}>
          <h2 style={s.h2}>Related Calculators</h2>
          {[
            ['/mortgage-calculator',          'Mortgage Calculator'],
            ['/refinance-calculator',          'Refinance Calculator'],
            ['/down-payment-calculator',       'Down Payment Calculator'],
            ['/property-tax-calculator',       'Property Tax Calculator'],
            ['/home-affordability-calculator', 'Home Affordability'],
            ['/rent-vs-buy-calculator',        'Rent vs Buy'],
          ].map(([href, label]) => (
            <a key={href} href={href} style={s.calcA}>{label}</a>
          ))}
        </div>

        {/* Other states */}
        <div style={s.box}>
          <h2 style={s.h2}>Mortgage Calculator by State</h2>
          {allStates.filter(st => st.slug !== state.slug).map(st => (
            <a key={st.slug} href={'/mortgage-calculator/state/' + st.slug} style={s.stateA}>
              {st.name} ({st.abbr})
            </a>
          ))}
        </div>

      </div>
      <AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Mortgage Calculator","item":"https://www.freefincalc.net/mortgage-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Mortgage Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
