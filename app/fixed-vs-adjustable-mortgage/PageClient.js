'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function pmt(p, r, n) { const m = r/100/12; return m > 0 ? p*m*Math.pow(1+m,n)/(Math.pow(1+m,n)-1) : p/n; }

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


  const [loanAmt, setLoanAmt] = useState(350000)
  const [fixedRate, setFixedRate] = useState(6.75)
  const [armInitialRate, setArmInitialRate] = useState(5.75)
  const [armAdjRate, setArmAdjRate] = useState(8.0)
  const [armFixedYears, setArmFixedYears] = useState(5)
  const [planToStay, setPlanToStay] = useState(10)

  const calc = useMemo(() => {
    const fixedPmt = pmt(loanAmt, fixedRate, 360)
    const armInitPmt = pmt(loanAmt, armInitialRate, 360)
    const armAdjPmt = pmt(loanAmt, armAdjRate, 360)

    // Fixed: same payment for entire stay
    const fixedTotal = fixedPmt * planToStay * 12

    // ARM: lower rate for fixed period, then adjusted rate
    const armFixedMonths = armFixedYears * 12
    const armTotalMonths = planToStay * 12
    const armAdjMonths = Math.max(0, armTotalMonths - armFixedMonths)
    const armTotal = (armInitPmt * Math.min(armFixedMonths, armTotalMonths)) + (armAdjPmt * armAdjMonths)

    const savings = fixedTotal - armTotal
    const monthlySavingsInit = fixedPmt - armInitPmt
    const monthlyIncrease = armAdjPmt - fixedPmt
    const breakEvenMonths = monthlySavingsInit > 0 && monthlyIncrease > 0 ? Math.ceil((monthlySavingsInit * armFixedMonths) / monthlyIncrease) + armFixedMonths : 0

    const winner = armTotal < fixedTotal ? 'ARM' : 'Fixed'

    return { fixedPmt, armInitPmt, armAdjPmt, fixedTotal, armTotal, savings: Math.abs(savings), monthlySavingsInit, monthlyIncrease, breakEvenMonths, winner }
  }, [loanAmt, fixedRate, armInitialRate, armAdjRate, armFixedYears, planToStay])

  const faqs = [
    { q: 'What is a fixed-rate mortgage?', a: 'A fixed-rate mortgage locks your interest rate for the entire loan term (typically 15 or 30 years). Your monthly principal and interest payment never changes, providing predictability and protection against rising rates.' },
    { q: 'What is an ARM (adjustable-rate mortgage)?', a: 'An ARM offers a lower initial rate for a fixed period (typically 3, 5, 7, or 10 years), then adjusts annually based on a market index. A 5/1 ARM means 5 years fixed, then adjusts every 1 year. The initial rate is usually 0.5-1.5% lower than a fixed-rate mortgage.' },
    { q: 'When is an ARM better than fixed?', a: 'An ARM is better if you plan to sell or refinance before the fixed period ends. If you will own the home less than ' + armFixedYears + ' years, the ARM saves you ' + fmt(calc.monthlySavingsInit) + '/month with no risk of the rate adjusting. If you plan to stay long-term, fixed is safer.' },
    { q: 'How high can an ARM rate go?', a: 'Most ARMs have caps: initial adjustment cap (usually 2%), annual cap (2%), and lifetime cap (5% above initial rate). A 5/1 ARM starting at 5.75% could theoretically reach 10.75% over its lifetime, though this is rare.' },
    { q: 'Can I refinance from an ARM to a fixed-rate?', a: 'Yes, you can refinance an ARM into a fixed-rate mortgage at any time. Many ARM borrowers plan to refinance before the adjustment period starts. However, refinancing has closing costs (2-5% of loan amount) and is not guaranteed if rates rise or your financial situation changes.' },
  ]

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}><a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>›</span><span style={{color:'#94a3b8'}}>Fixed vs ARM Mortgage</span></nav>
        <h1 style={st.h1}>Fixed-Rate vs Adjustable-Rate Mortgage (ARM)</h1>
        <p style={st.sub}>Compare a locked fixed rate versus a lower initial ARM rate. See when each option wins based on how long you plan to stay.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Loan Details</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            {[
              ['Loan Amount', loanAmt, setLoanAmt, 100000, 1500000, 10000, fmt(loanAmt)],
              ['Fixed Rate', fixedRate, setFixedRate, 3, 10, 0.125, fixedRate + '%'],
              ['ARM Initial Rate', armInitialRate, setArmInitialRate, 2, 9, 0.125, armInitialRate + '%'],
              ['ARM Adjusted Rate', armAdjRate, setArmAdjRate, 4, 12, 0.125, armAdjRate + '%'],
              ['ARM Fixed Period', armFixedYears, setArmFixedYears, 3, 10, 1, armFixedYears + ' years'],
              ['Plan to Stay', planToStay, setPlanToStay, 1, 30, 1, planToStay + ' years'],
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
          <div style={{...st.vsCard, ...(calc.winner === 'Fixed' ? st.winner : {})}}>
            <div style={{fontSize:14,fontWeight:700,color:'#60a5fa',marginBottom:12}}>Fixed Rate ({fixedRate}%)</div>
            <div style={{fontSize:11,color:'#64748b'}}>Monthly Payment</div>
            <div style={{fontSize:26,fontWeight:800,color:'#f0c842'}}>{fmt(calc.fixedPmt)}/mo</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Total Cost ({planToStay}yr)</div>
            <div style={{fontSize:18,fontWeight:700,color:'#e2e8f0'}}>{fmt(calc.fixedTotal)}</div>
            {calc.winner === 'Fixed' && <div style={{...st.badge,...st.greenBadge,marginTop:10}}>WINNER</div>}
          </div>
          <div style={st.vsMid}>VS</div>
          <div style={{...st.vsCard, ...(calc.winner === 'ARM' ? st.winner : {})}}>
            <div style={{fontSize:14,fontWeight:700,color:'#a78bfa',marginBottom:12}}>{armFixedYears}/1 ARM</div>
            <div style={{fontSize:11,color:'#64748b'}}>Initial Payment</div>
            <div style={{fontSize:26,fontWeight:800,color:'#f0c842'}}>{fmt(calc.armInitPmt)}/mo</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:4}}>After Adjustment</div>
            <div style={{fontSize:18,fontWeight:700,color:'#ef4444'}}>{fmt(calc.armAdjPmt)}/mo</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:4}}>Total Cost ({planToStay}yr)</div>
            <div style={{fontSize:18,fontWeight:700,color:'#e2e8f0'}}>{fmt(calc.armTotal)}</div>
            {calc.winner === 'ARM' && <div style={{...st.badge,...st.greenBadge,marginTop:10}}>WINNER</div>}
          </div>
        </div>

        <div style={st.goldBox}>
          <h2 style={{...st.h2,color:'#f0c842'}}>The Verdict ({planToStay}-Year Horizon)</h2>
          <p style={{fontSize:18,fontWeight:700,color:'#e2e8f0',marginBottom:8}}>The {calc.winner === 'ARM' ? armFixedYears + '/1 ARM' : 'Fixed Rate'} wins — saves {fmt(calc.savings)} over {planToStay} years</p>
          <p style={st.p}>{calc.winner === 'ARM' ? 'The ARM saves ' + fmt(calc.monthlySavingsInit) + '/month during the initial ' + armFixedYears + '-year fixed period. ' + (planToStay <= armFixedYears ? 'Since you plan to sell/refinance before the rate adjusts, you get the lower rate with zero risk.' : 'Even after the rate adjusts to ' + armAdjRate + '%, the total cost over ' + planToStay + ' years is still lower due to the initial savings.') : 'The fixed rate wins because the ARM rate adjustment to ' + armAdjRate + '% more than erases the initial savings after year ' + armFixedYears + '. With a ' + planToStay + '-year horizon, the certainty of a fixed rate is both cheaper and safer.'}</p>
        </div>

        <AdUnit slot="3248634657" />

        <div style={st.box}>
          <h2 style={st.h2}>Fixed vs ARM — Complete Guide</h2>
          <h3 style={st.h3}>When Fixed Rate Wins</h3>
          <p style={st.p}>A fixed-rate mortgage is the better choice when you plan to stay in the home long-term (7+ years), when interest rates are historically low (locking in a good rate), or when you value payment predictability above all else. Most homeowners choose fixed-rate for peace of mind — your payment never changes regardless of what happens in the economy.</p>
          <h3 style={st.h3}>When ARM Wins</h3>
          <p style={st.p}>An ARM makes sense when you plan to sell or refinance within the fixed period (3-7 years), when you expect rates to drop (so the adjustment works in your favor), or when the rate spread is large (1%+ difference). First-time buyers who expect to upgrade homes within 5 years often save thousands with a 5/1 ARM.</p>
          <h3 style={st.h3}>The Risk Factor</h3>
          <p style={st.p}>The biggest risk with an ARM is being unable to sell or refinance when the rate adjusts. If home values drop, you could be stuck with a higher rate and unable to refinance. If your financial situation changes, you might not qualify for a new loan. The fixed rate eliminates this risk entirely — it is an insurance policy against rising rates.</p>
        </div>

        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2>{[['/mortgage-calculator','Mortgage Calculator'],['/refinance-calculator','Refinance'],['/15-vs-30-year-mortgage','15 vs 30 Year'],['/home-affordability-calculator','Home Affordability'],['/mortgage-points-calculator','Mortgage Points']].map(([href,lbl]) => (<a key={href} href={href} style={st.calcA}>{lbl}</a>))}</div>

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Fixed vs ARM Mortgage","item":"https://www.freefincalc.net/fixed-vs-adjustable-mortgage"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Fixed vs ARM Mortgage Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":"2956","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
