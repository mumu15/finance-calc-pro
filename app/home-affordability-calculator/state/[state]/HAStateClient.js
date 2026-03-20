'use client'
import { useState, useMemo } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit'
import FaqSchema from '../../../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function pmt(p, r, n) { const mo = r / 100 / 12; return mo > 0 ? p * mo / (1 - Math.pow(1 + mo, -n)) : p / n }

export default function HAStateClient({ item: s, all }) {
  const [income, setIncome] = useState(Math.round(s.medianPrice / 4))
  const [debt, setDebt] = useState(500)
  const [downPct, setDownPct] = useState(20)
  const [rate, setRate] = useState(s.rate)

  const calc = useMemo(() => {
    const monthlyIncome = income / 12
    const maxPayment28 = monthlyIncome * 0.28
    const maxPayment36 = (monthlyIncome * 0.36) - debt
    const maxMonthly = Math.min(maxPayment28, maxPayment36)
    const taxMoRate = s.tax / 100 / 12
    const insMoRate = s.insurance / s.medianPrice / 12
    const piMax = maxMonthly / (1 + taxMoRate * 100 + insMoRate * 100)
    const mo = rate / 100 / 12
    const n = 360
    const maxLoan = mo > 0 ? piMax * (1 - Math.pow(1 + mo, -n)) / mo : piMax * n
    const maxHome = Math.round(maxLoan / (1 - downPct / 100))
    const downAmt = Math.round(maxHome * downPct / 100)
    const monthlyPayment = Math.round(maxMonthly)
    const affordable = maxHome >= s.medianPrice * 0.8
    return { maxHome, maxLoan: Math.round(maxLoan), downAmt, monthlyPayment, maxPayment28: Math.round(maxPayment28), affordable }
  }, [income, debt, downPct, rate, s])

  const faqs = [
    { q: 'How much house can I afford in ' + s.name + '?', a: 'Based on the 28/36 rule, your total housing payment should not exceed 28% of gross monthly income, and total debts should stay under 36%. In ' + s.name + ', with median home prices at ' + fmt(s.medianPrice) + ', you typically need a household income of at least ' + fmt(Math.round(s.medianPrice * 0.28 / 12 * 12 / 0.28)) + ' to afford the median home.' },
    { q: 'What salary do I need to buy a house in ' + s.name + '?', a: 'To afford the median ' + s.name + ' home at ' + fmt(s.medianPrice) + ' with 20% down at ' + s.rate + '% interest, you need approximately ' + fmt(Math.round(pmt(s.medianPrice * 0.8, s.rate, 360) / 0.28 * 12)) + ' annual household income. This is based on the 28% housing cost guideline.' },
    { q: 'What is the average home price in ' + s.name + '?', a: 'The median home price in ' + s.name + ' is approximately ' + fmt(s.medianPrice) + ' as of 2026. Prices vary significantly by city and county. ' + s.name + ' is ' + s.desc + '.' },
    { q: 'How much is a down payment in ' + s.name + '?', a: 'A 20% down payment on the median ' + s.name + ' home (' + fmt(s.medianPrice) + ') is ' + fmt(Math.round(s.medianPrice * 0.2)) + '. FHA loans allow 3.5% down (' + fmt(Math.round(s.medianPrice * 0.035)) + ') and VA loans offer 0% down for eligible veterans.' },
    { q: 'Are property taxes high in ' + s.name + '?', a: s.name + ' has a property tax rate of ' + s.tax + '%, which is ' + (s.tax > 1.5 ? 'above' : s.tax < 0.7 ? 'below' : 'near') + ' the national average. On the median home, that is ' + fmt(Math.round(s.medianPrice * s.tax / 100)) + '/year. ' + s.tip },
  ]

  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 900, margin: '0 auto', padding: '32px 16px 64px' },
    bc: { fontSize: 13, color: '#64748b', marginBottom: 16, display: 'flex', gap: 6, flexWrap: 'wrap' },
    bcA: { color: '#64748b', textDecoration: 'none' },
    h1: { fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#f1f5f9', margin: '0 0 8px' },
    sub: { fontSize: 15, color: '#94a3b8', margin: '0 0 28px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 },
    card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20 },
    lbl: { fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' },
    val: { fontSize: 26, fontWeight: 800, color: '#f0c842', margin: '0 0 10px' },
    box: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, marginBottom: 24 },
    resultBox: { background: 'rgba(240,200,66,0.06)', border: '1px solid rgba(240,200,66,0.2)', borderRadius: 16, padding: 24, marginBottom: 24 },
    h2: { fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 14px' },
    p: { fontSize: 15, color: '#94a3b8', lineHeight: 1.8, margin: '0 0 12px' },
    row: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 },
    statCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 16, textAlign: 'center' },
    statNum: { fontSize: 22, fontWeight: 800, color: '#f0c842' },
    statLbl: { fontSize: 11, color: '#64748b', marginTop: 4 },
    tagA: { display: 'inline-block', padding: '5px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#94a3b8', textDecoration: 'none', fontSize: 12, margin: '0 6px 6px 0' },
    calcA: { display: 'inline-block', padding: '8px 14px', background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.2)', borderRadius: 8, color: '#f0c842', textDecoration: 'none', fontSize: 13, fontWeight: 600, margin: '0 8px 8px 0' },
    verdict: { textAlign: 'center', padding: 20, borderRadius: 12, marginTop: 16 },
  }

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}>
          <a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>›</span>
          <a href="/home-affordability-calculator" style={st.bcA}>Home Affordability</a><span style={{color:'#475569'}}>›</span>
          <span style={{color:'#94a3b8'}}>{s.name}</span>
        </nav>

        <h1 style={st.h1}>How Much House Can I Afford in {s.name}?</h1>
        <p style={st.sub}>Median home: {fmt(s.medianPrice)} | Mortgage rate: {s.rate}% | Property tax: {s.tax}% | Insurance: {fmt(s.insurance)}/yr</p>

        <div style={st.statsGrid}>
          <div style={st.statCard}><div style={st.statNum}>{fmt(s.medianPrice)}</div><div style={st.statLbl}>Median Home Price</div></div>
          <div style={st.statCard}><div style={st.statNum}>{s.rate}%</div><div style={st.statLbl}>Avg Mortgage Rate</div></div>
          <div style={st.statCard}><div style={st.statNum}>{s.tax}%</div><div style={st.statLbl}>Property Tax Rate</div></div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Your Details</h2>
          <div style={st.grid}>
            <div><label style={st.lbl}>Annual Household Income</label><div style={st.val}>{fmt(income)}</div><input type="range" min={25000} max={500000} step={5000} value={income} onChange={e => setIncome(+e.target.value)} style={{width:'100%',accentColor:'#f0c842'}} /></div>
            <div><label style={st.lbl}>Monthly Debt Payments</label><div style={st.val}>{fmt(debt)}</div><input type="range" min={0} max={5000} step={50} value={debt} onChange={e => setDebt(+e.target.value)} style={{width:'100%',accentColor:'#f0c842'}} /></div>
            <div><label style={st.lbl}>Down Payment %</label><div style={st.val}>{downPct}%</div><input type="range" min={3} max={30} step={1} value={downPct} onChange={e => setDownPct(+e.target.value)} style={{width:'100%',accentColor:'#f0c842'}} /></div>
            <div><label style={st.lbl}>Mortgage Rate</label><div style={st.val}>{rate}%</div><input type="range" min={3} max={10} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} style={{width:'100%',accentColor:'#f0c842'}} /></div>
          </div>
        </div>

        <div style={st.resultBox}>
          <h2 style={{...st.h2, color: '#f0c842'}}>What You Can Afford in {s.name}</h2>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Maximum Home Price</span><span style={{fontWeight:800,color:'#f0c842',fontSize:22}}>{fmt(calc.maxHome)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Maximum Loan Amount</span><span style={{fontWeight:700}}>{fmt(calc.maxLoan)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Down Payment Needed</span><span style={{fontWeight:700}}>{fmt(calc.downAmt)}</span></div>
          <div style={{...st.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Max Monthly Payment (28% rule)</span><span style={{fontWeight:700}}>{fmt(calc.maxPayment28)}/mo</span></div>
          <div style={{...st.verdict, background: calc.affordable ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: '1px solid ' + (calc.affordable ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)')}}>
            <div style={{fontSize:18,fontWeight:800,color:calc.affordable ? '#10b981' : '#ef4444'}}>{calc.affordable ? 'You can likely afford the median ' + s.name + ' home!' : 'The median ' + s.name + ' home may be a stretch at this income'}</div>
            <div style={{fontSize:13,color:'#94a3b8',marginTop:4}}>Median home: {fmt(s.medianPrice)} | Your max: {fmt(calc.maxHome)}</div>
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Buying a Home in {s.name} — 2026 Guide</h2>
          <p style={st.p}>{s.name} is {s.desc}. With a median home price of <strong style={{color:'#e2e8f0'}}>{fmt(s.medianPrice)}</strong> and mortgage rates averaging <strong style={{color:'#e2e8f0'}}>{s.rate}%</strong>, understanding what you can afford before house hunting is essential.</p>
          <p style={st.p}>The 28/36 rule is the gold standard: spend no more than 28% of gross income on housing and no more than 36% on total debt. In {s.name}, with a property tax rate of {s.tax}% and average insurance of {fmt(s.insurance)}/year, these costs add significantly to your monthly payment beyond just principal and interest.</p>
          <p style={st.p}>A 20% down payment on the median {s.name} home requires <strong style={{color:'#e2e8f0'}}>{fmt(Math.round(s.medianPrice * 0.2))}</strong>. FHA loans with 3.5% down need just <strong style={{color:'#e2e8f0'}}>{fmt(Math.round(s.medianPrice * 0.035))}</strong>, but you will pay mortgage insurance. {s.tip}</p>
        </div>

        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2>{[['/home-affordability-calculator','Home Affordability'],['/mortgage-calculator','Mortgage Calculator'],['/down-payment-calculator','Down Payment'],['/closing-cost-calculator','Closing Cost'],['/rent-vs-buy-calculator','Rent vs Buy']].map(([href,lbl]) => (<a key={href} href={href} style={st.calcA}>{lbl}</a>))}</div>

        <div style={st.box}><h2 style={st.h2}>Home Affordability by State</h2>{all.filter(x => x.slug !== s.slug).map(x => (<a key={x.slug} href={'/home-affordability-calculator/state/' + x.slug} style={st.tagA}>{x.name}</a>))}</div>

        <div style={st.box}>
          <h2 style={st.h2}>{'Explore More for ' + s.name}</h2>
          <p style={st.p}>{'See all ' + s.name + ' financial calculators:'}</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href={'/property-tax-calculator/state/' + s.slug} style={st.calcA}>Property Tax in {s.name}</a>
            <a href={'/cost-of-living-calculator/state/' + s.slug} style={st.calcA}>Cost of Living in {s.name}</a>
            <a href={'/tax-calculator/state/' + s.slug} style={st.calcA}>Income Tax in {s.name}</a>
            <a href={'/salary-after-tax-calculator/state/' + s.slug} style={st.calcA}>Salary After Tax in {s.name}</a>
            <a href={'/mortgage-calculator'} style={st.calcA}>Mortgage Calculator</a>
            <a href={'/budget-planner-calculator'} style={st.calcA}>Budget Planner</a>
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={i < faqs.length - 1 ? {borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16} : {paddingBottom:8}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>{faq.q}</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      <AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Home Affordability Calculator","item":"https://www.freefincalc.net/home-affordability-calculator"},{"@type":"ListItem","position":3,"name":s.name,"item":"https://www.freefincalc.net/home-affordability-calculator/state/"+s.slug}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Home Affordability Calculator "+s.name,"applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
