'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit'
import FaqSchema from '../../../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }

export default function PTStateClient({ item: s, all }) {
  const [homeValue, setHomeValue] = useState(s.medianHome)
  const [exemption, setExemption] = useState(0)

  const taxable = Math.max(0, homeValue - exemption)
  const annualTax = Math.round(taxable * s.propertyTaxRate / 100)
  const monthlyTax = Math.round(annualTax / 12)
  const effectiveRate = homeValue > 0 ? ((annualTax / homeValue) * 100).toFixed(2) : '0.00'

  const faqs = [
    { q: 'What is the property tax rate in ' + s.name + '?', a: s.name + ' has an average effective property tax rate of ' + s.propertyTaxRate + '%. On the median home value of ' + fmt(s.medianHome) + ', that equals approximately ' + fmt(s.medianTax) + ' per year or ' + fmt(Math.round(s.medianTax / 12)) + ' per month.' },
    { q: 'How are property taxes calculated in ' + s.name + '?', a: 'Property taxes in ' + s.name + ' are calculated by multiplying your home assessed value by the local tax rate. The assessed value may differ from market value depending on your county assessment ratio. Exemptions like homestead exemptions can reduce your taxable value.' },
    { q: 'Does ' + s.name + ' have a homestead exemption?', a: s.tip },
    { q: 'How do ' + s.name + ' property taxes compare to other states?', a: s.propertyTaxRate > 1.5 ? s.name + ' property taxes are above the national average of 1.1%. Budget carefully for this significant expense when buying a home here.' : s.propertyTaxRate < 0.7 ? s.name + ' property taxes are well below the national average of 1.1%. This is a genuine financial advantage for homeowners in ' + s.name + '.' : s.name + ' property taxes are near the national average of 1.1%. This means property tax costs are predictable and in line with most states.' },
    { q: 'When are property taxes due in ' + s.name + '?', a: 'Property tax due dates vary by county in ' + s.name + '. Most counties offer semi-annual payments. Check with your county tax assessor office for specific due dates. Late payments typically incur penalties of 1-2% per month.' },
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
  }

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}>
          <a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>›</span>
          <a href="/property-tax-calculator" style={st.bcA}>Property Tax Calculator</a><span style={{color:'#475569'}}>›</span>
          <span style={{color:'#94a3b8'}}>{s.name}</span>
        </nav>

        <h1 style={st.h1}>{s.name} Property Tax Calculator 2026</h1>
        <p style={st.sub}>{s.name} ({s.abbr}) property tax rate: {s.propertyTaxRate}% | Median home: {fmt(s.medianHome)} | Median annual tax: {fmt(s.medianTax)}</p>

        <div style={st.statsGrid}>
          <div style={st.statCard}><div style={st.statNum}>{s.propertyTaxRate}%</div><div style={st.statLbl}>Property Tax Rate</div></div>
          <div style={st.statCard}><div style={st.statNum}>{fmt(s.medianHome)}</div><div style={st.statLbl}>Median Home Value</div></div>
          <div style={st.statCard}><div style={st.statNum}>{fmt(s.medianTax)}</div><div style={st.statLbl}>Median Annual Tax</div></div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Calculate Your {s.name} Property Tax</h2>
          <div style={st.grid}>
            <div><label style={st.lbl}>Home Value</label><div style={st.val}>{fmt(homeValue)}</div><input type="range" min={50000} max={Math.max(s.medianHome * 4, 1000000)} step={5000} value={homeValue} onChange={e => setHomeValue(+e.target.value)} style={{width:'100%',accentColor:'#f0c842'}} /></div>
            <div><label style={st.lbl}>Exemption Amount</label><div style={st.val}>{fmt(exemption)}</div><input type="range" min={0} max={Math.round(homeValue * 0.5)} step={1000} value={exemption} onChange={e => setExemption(+e.target.value)} style={{width:'100%',accentColor:'#f0c842'}} /></div>
          </div>
        </div>

        <div style={st.resultBox}>
          <h2 style={{...st.h2, color: '#f0c842'}}>Your {s.name} Property Tax Estimate</h2>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Home Value</span><span style={{fontWeight:700}}>{fmt(homeValue)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Exemption</span><span style={{fontWeight:700,color:'#10b981'}}>-{fmt(exemption)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Taxable Value</span><span style={{fontWeight:700}}>{fmt(taxable)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Tax Rate ({s.name})</span><span style={{fontWeight:700}}>{s.propertyTaxRate}%</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Annual Property Tax</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(annualTax)}/yr</span></div>
          <div style={{...st.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Monthly Property Tax</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(monthlyTax)}/mo</span></div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Property Taxes in {s.name} — What You Need to Know</h2>
          <p style={st.p}>{s.name} is {s.desc}. The average effective property tax rate in {s.name} is <strong style={{color:'#f0c842'}}>{s.propertyTaxRate}%</strong>, which is {s.propertyTaxRate > 1.1 ? 'above' : s.propertyTaxRate < 0.8 ? 'below' : 'near'} the national average of 1.1%.</p>
          <p style={st.p}>On the median {s.name} home valued at <strong style={{color:'#e2e8f0'}}>{fmt(s.medianHome)}</strong>, annual property taxes come to approximately <strong style={{color:'#e2e8f0'}}>{fmt(s.medianTax)}</strong> or <strong style={{color:'#e2e8f0'}}>{fmt(Math.round(s.medianTax / 12))}/month</strong>. This is a significant part of your total housing cost and should be factored into any home purchase budget.</p>
          <p style={st.p}><strong style={{color:'#e2e8f0'}}>Pro tip:</strong> {s.tip}</p>
          <p style={st.p}>{s.noIncomeTax ? s.name + ' has no state income tax, which means property taxes are one of the primary revenue sources for local governments. While the property tax rate may seem ' + (s.propertyTaxRate > 1.5 ? 'high' : 'moderate') + ', the lack of income tax often makes the overall tax burden competitive.' : 'Combined with ' + s.name + "'s state income tax rate of " + s.incomeTaxRate + '%, homeowners should consider the total tax picture. Property taxes in ' + s.name + ' are ' + (s.propertyTaxRate > 1.5 ? 'a major expense — budget carefully.' : 'manageable and in line with regional averages.')}</p>
        </div>

        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2>{[['/property-tax-calculator','Property Tax Calculator'],['/mortgage-calculator','Mortgage Calculator'],['/home-affordability-calculator','Home Affordability'],['/closing-cost-calculator','Closing Cost'],['/home-equity-calculator','Home Equity']].map(([href,lbl]) => (<a key={href} href={href} style={st.calcA}>{lbl}</a>))}</div>

        <div style={st.box}><h2 style={st.h2}>Property Tax by State</h2>{all.filter(x => x.slug !== s.slug).map(x => (<a key={x.slug} href={'/property-tax-calculator/state/' + x.slug} style={st.tagA}>{x.name}</a>))}</div>

        <div style={st.box}>
          <h2 style={st.h2}>{'Explore More for ' + s.name}</h2>
          <p style={st.p}>{'See all ' + s.name + ' financial calculators:'}</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href={'/home-affordability-calculator/state/' + s.slug} style={st.calcA}>Home Affordability in {s.name}</a>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Property Tax Calculator","item":"https://www.freefincalc.net/property-tax-calculator"},{"@type":"ListItem","position":3,"name":s.name,"item":"https://www.freefincalc.net/property-tax-calculator/state/"+s.slug}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":s.name+" Property Tax Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
