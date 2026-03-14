'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';

function fmtD(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calcTax(gross, fedRate, stateRate, fica) {
  const fed   = gross * fedRate / 100
  const state = gross * stateRate / 100
  const ficaT = gross * fica / 100
  const net   = gross - fed - state - ficaT
  return { fed, state, ficaT, net, effective: ((fed + state + ficaT) / gross * 100).toFixed(1) }
}

export default function SalaryJobClient({ job, allJobs }) {
  const [salary, setSalary] = useState(job.salary)
  const t = calcTax(salary, job.fedRate, job.stateRate, job.fica)

  const s = {
    page:  { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap:  { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:    { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:   { color:'#64748b', textDecoration:'none' },
    h1:    { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:   { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    card:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    lbl:   { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:   { fontSize:26, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr:  { width:'100%', accentColor:'#f0c842' },
    h2:    { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:     { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:   { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    jobA:  { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA: { display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }

  return (
    <div style={s.page}>
      <Header />
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Salary After Tax Calculator', url: 'https://www.freefincalc.net/salary-after-tax-calculator' }
  ]} />
        <AdUnit slot="7405024590" />
      <div style={s.wrap}>
        <nav style={s.bc}>
          <a href="/" style={s.bcA}>Home</a><span>›</span>
          <a href="/salary-after-tax-calculator" style={s.bcA}>Salary After Tax</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{job.name}</span>
        </nav>
        <h1 style={s.h1}>{job.name} Salary After Tax 2026</h1>
        <p style={s.sub}>Estimate your real take-home pay as a {job.name} after federal, state, and FICA taxes.</p>

        <div style={s.card}>
          <label style={s.lbl}>Annual Salary</label>
          <div style={s.val}>{fmtD(salary)}/year</div>
          <input type="range" value={salary} onChange={e => setSalary(+e.target.value)} className="calc-input" />
        </div>

        <div style={s.card}>
          <h2 style={s.h2}>Take-Home Pay Breakdown</h2>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Gross Salary</span><span style={{fontWeight:700}}>{fmtD(salary)}/yr</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Federal Tax ({job.fedRate}%)</span><span style={{fontWeight:700, color:'#ef4444'}}>- {fmtD(t.fed)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>State Tax ({job.stateRate > 0 ? job.stateRate + '%' : 'None - ' + job.state})</span><span style={{fontWeight:700, color: t.state > 0 ? '#ef4444' : '#10b981'}}>- {fmtD(t.state)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>FICA (Social Security + Medicare)</span><span style={{fontWeight:700, color:'#ef4444'}}>- {fmtD(t.ficaT)}</span></div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0 0'}}>
            <span style={{fontWeight:700, fontSize:15}}>Take-Home Pay</span>
            <span style={{fontWeight:800, fontSize:22, color:'#f0c842'}}>{fmtD(t.net)}/yr</span>
          </div>
          <div style={{marginTop:10, display:'flex', gap:20, flexWrap:'wrap', fontSize:13, color:'#64748b'}}>
            <span>Monthly: <strong style={{color:'#e2e8f0'}}>{fmtD(t.net / 12)}</strong></span>
            <span>Biweekly: <strong style={{color:'#e2e8f0'}}>{fmtD(t.net / 26)}</strong></span>
            <span>Effective Tax Rate: <strong style={{color:'#e2e8f0'}}>{t.effective}%</strong></span>
          </div>
        </div>

        <div style={s.card}>
          <h2 style={s.h2}>{job.name} Salary Guide 2026</h2>
          <p style={s.p}>A {job.name} is {job.desc}. The average {job.name} salary in the US is <strong style={{color:'#e2e8f0'}}>{fmtD(job.salary)}/year</strong> as of 2026. After taxes, the typical take-home is approximately <strong style={{color:'#f0c842'}}>{fmtD(calcTax(job.salary, job.fedRate, job.stateRate, job.fica).net)}/year</strong> or <strong style={{color:'#f0c842'}}>{fmtD(calcTax(job.salary, job.fedRate, job.stateRate, job.fica).net / 12)}/month</strong>.</p>
          <p style={s.p}>State tax varies significantly by location. States like Texas, Florida, and Washington have no state income tax — meaning a {job.name} there keeps significantly more of each paycheck than one in California or New York.</p>
        </div>

        <div style={s.card}>
          <h2 style={s.h2}>Related Calculators</h2>
          {[['/salary-after-tax-calculator','Salary After Tax'],['/paycheck-calculator','Paycheck Calculator'],['/hourly-to-salary-calculator','Hourly to Salary'],['/tax-calculator','Tax Calculator'],['/retirement-calculator','Retirement Calculator']].map(([href,lbl]) => (
            <a key={href} href={href} style={s.calcA}>{lbl}</a>
          ))}
        </div>

        <div style={s.card}>
          <h2 style={s.h2}>Salary by Profession</h2>
          {allJobs.filter(j => j.slug !== job.slug).map(j => (
            <a key={j.slug} href={'/salary-after-tax-calculator/job/' + j.slug} style={s.jobA}>{j.name}</a>
          ))}
        </div>
      </div>
      <AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Salary After Tax Calculator","item":"https://www.freefincalc.net/salary-after-tax-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Salary After Tax Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
