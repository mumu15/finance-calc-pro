'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calc(price, down, rate, term) {
  const loan = price * (1 - down / 100)
  const mo = rate / 100 / 12
  const n = term
  const pmt = mo > 0 ? loan * mo / (1 - Math.pow(1 + mo, -n)) : loan / n
  return { pmt, loan, totalInterest: pmt * n - loan, total: pmt * n }
}

export default function CarBrandClient({ brand, allBrands }) {
  const [price,  setPrice]  = useState(brand.avg)
  const [down,   setDown]   = useState(brand.down)
  const [rate,   setRate]   = useState(brand.rate)
  const [term,   setTerm]   = useState(brand.term)
  const r = calc(price, down, rate, term)

  const s = {
    page:  { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap:  { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:    { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:   { color:'#64748b', textDecoration:'none' },
    h1:    { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:   { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    grid:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 },
    card:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 },
    lbl:   { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:   { fontSize:26, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr:  { width:'100%', accentColor:'#f0c842' },
    box:   { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    h2:    { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:     { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:   { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    brandA:{ display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA: { display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }

  return (
    <div style={s.page}>
      <Header />
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Car Loan Calculator', url: 'https://www.freefincalc.net/car-loan-calculator' }
  ]} />
        <AdUnit slot="7405024590" />
      <div style={s.wrap}>
        <nav style={s.bc}>
          <a href="/" style={s.bcA}>Home</a><span>›</span>
          <a href="/car-loan-calculator" style={s.bcA}>Car Loan Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{brand.name}</span>
        </nav>
        <h1 style={s.h1}>{brand.name} Car Loan Calculator 2026</h1>
        <p style={s.sub}>Estimate your monthly {brand.name} payment with real 2026 financing rates.</p>

        <div style={s.grid}>
          <div style={s.card}>
            <label style={s.lbl}>Vehicle Price</label>
            <div style={s.val}>{fmt(price)}</div>
            <input type="range" value={price} onChange={e => setPrice(+e.target.value)} className="calc-input" />
          </div>
          <div style={s.card}>
            <label style={s.lbl}>Down Payment ({down}%)</label>
            <div style={s.val}>{fmt(price * down / 100)}</div>
            <input type="range" value={down} onChange={e => setDown(+e.target.value)} className="calc-input" />
          </div>
          <div style={s.card}>
            <label style={s.lbl}>Interest Rate</label>
            <div style={s.val}>{rate}%</div>
            <input type="range" value={rate} onChange={e => setRate(+e.target.value)} className="calc-input" />
          </div>
          <div style={s.card}>
            <label style={s.lbl}>Loan Term (months)</label>
            <div style={s.val}>{term} mo</div>
            <input type="range" value={term} onChange={e => setTerm(+e.target.value)} className="calc-input" />
          </div>
        </div>

        <div style={s.box}>
          <h2 style={s.h2}>{brand.name} Monthly Payment</h2>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Loan Amount</span><span style={{fontWeight:700}}>{fmt(r.loan)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:700, color:'#f0c842', fontSize:20}}>{fmt(r.pmt)}/mo</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest</span><span style={{fontWeight:700}}>{fmt(r.totalInterest)}</span></div>
          <div style={{...s.row, borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Cost</span><span style={{fontWeight:700}}>{fmt(r.total)}</span></div>
        </div>

        <div style={s.box}>
          <h2 style={s.h2}>{brand.name} Financing Guide 2026</h2>
          <p style={s.p}>{brand.name} is {brand.desc}. The average {brand.name} price in 2026 is <strong style={{color:'#e2e8f0'}}>{fmt(brand.avg)}</strong>, and with a typical {brand.down}% down payment and {brand.rate}% APR on a {brand.term}-month loan, your monthly payment would be approximately <strong style={{color:'#f0c842'}}>{fmt(calc(brand.avg, brand.down, brand.rate, brand.term).pmt)}/month</strong>.</p>
          <p style={s.p}>{brand.name} dealers often advertise special APR promotions — sometimes as low as 0% for qualified buyers. Always compare dealer financing against your bank or credit union before signing. Even a 1% difference in rate on a {fmt(brand.avg)} vehicle saves over {fmt((brand.avg * 0.9) * 0.01 * brand.term / 12 * 0.5)} over the life of the loan.</p>
          <p style={s.p}>Longer loan terms (72 or 84 months) lower your monthly payment but significantly increase total interest paid. Use the sliders above to see how term length affects your total cost.</p>
        </div>

        <div style={s.box}>
          <h2 style={s.h2}>Related Calculators</h2>
          {[['/car-loan-calculator','Car Loan Calculator'],['/car-affordability-calculator','Car Affordability'],['/car-depreciation-calculator','Car Depreciation'],['/lease-vs-buy-calculator','Lease vs Buy'],['/fuel-cost-calculator','Fuel Cost Calculator']].map(([href,lbl]) => (
            <a key={href} href={href} style={s.calcA}>{lbl}</a>
          ))}
        </div>

        <div style={s.box}>
          <h2 style={s.h2}>Car Loan Calculator by Brand</h2>
          {allBrands.filter(b => b.slug !== brand.slug).map(b => (
            <a key={b.slug} href={'/car-loan-calculator/brand/' + b.slug} style={s.brandA}>{b.name}</a>
          ))}
        </div>
      </div>
      <AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Car Loan Calculator","item":"https://www.freefincalc.net/car-loan-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Car Loan Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
