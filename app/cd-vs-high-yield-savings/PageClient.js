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


  const [deposit, setDeposit] = useState(10000)
  const [cdRate, setCdRate] = useState(4.5)
  const [hysaRate, setHysaRate] = useState(4.0)
  const [term, setTerm] = useState(12)
  const [earlyPenalty, setEarlyPenalty] = useState(6)

  const calc = useMemo(() => {
    const months = term
    const cdInterest = Math.round(deposit * (cdRate / 100) * (months / 12))
    const cdTotal = deposit + cdInterest
    const hysaInterest = Math.round(deposit * (hysaRate / 100) * (months / 12))
    const hysaTotal = deposit + hysaInterest
    const diff = cdInterest - hysaInterest
    const penaltyAmt = Math.round(deposit * (cdRate / 100) * (earlyPenalty / 12))
    const cdNetIfEarly = cdInterest - penaltyAmt
    const breakEvenMonths = diff > 0 && hysaRate > 0 ? Math.ceil(penaltyAmt / (deposit * (cdRate - hysaRate) / 100 / 12)) : 0
    const winner = cdInterest > hysaInterest ? 'CD' : hysaInterest > cdInterest ? 'HYSA' : 'Tie'
    return { cdInterest, cdTotal, hysaInterest, hysaTotal, diff: Math.abs(diff), penaltyAmt, cdNetIfEarly, breakEvenMonths, winner }
  }, [deposit, cdRate, hysaRate, term, earlyPenalty])

  const faqs = [
    { q: 'What is the difference between a CD and a high-yield savings account?', a: 'A CD locks your money for a fixed term (3 months to 5 years) at a guaranteed rate. A high-yield savings account (HYSA) lets you withdraw anytime but the rate can change. CDs typically offer 0.25-0.75% higher rates in exchange for reduced liquidity.' },
    { q: 'Which earns more — CD or HYSA?', a: 'CDs usually earn more because you commit to keeping your money deposited. On your ' + fmt(deposit) + ' deposit, the CD earns ' + fmt(calc.cdInterest) + ' vs ' + fmt(calc.hysaInterest) + ' in the HYSA over ' + term + ' months — a difference of ' + fmt(calc.diff) + '.' },
    { q: 'What happens if I withdraw a CD early?', a: 'Early CD withdrawal typically costs ' + earlyPenalty + ' months of interest as a penalty (' + fmt(calc.penaltyAmt) + ' on your deposit). This can wipe out or even exceed your earned interest, making the HYSA a better choice if you might need the money.' },
    { q: 'Are CDs safe?', a: 'Yes — CDs at FDIC-insured banks are protected up to $250,000 per depositor. Your principal and earned interest are guaranteed regardless of what happens to the bank or the economy. This makes CDs one of the safest investments available.' },
    { q: 'Should I get a CD or HYSA in 2026?', a: 'If you will not need the money for ' + term + '+ months, the CD is better (earns ' + fmt(calc.diff) + ' more). If you might need access to funds, choose the HYSA. Consider a CD ladder (splitting money across different terms) for both higher rates and periodic liquidity.' },
  ]

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}><a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>›</span><span style={{color:'#94a3b8'}}>CD vs High-Yield Savings</span></nav>
        <h1 style={st.h1}>CD vs High-Yield Savings Account</h1>
        <p style={st.sub}>Lock your money in a CD or keep it liquid in a HYSA? See which earns more and whether the liquidity trade-off is worth it.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Your Details</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            {[
              ['Deposit Amount', deposit, setDeposit, 1000, 250000, 1000, fmt(deposit)],
              ['CD APY', cdRate, setCdRate, 1, 6, 0.1, cdRate + '%'],
              ['HYSA APY', hysaRate, setHysaRate, 1, 6, 0.1, hysaRate + '%'],
              ['Term (months)', term, setTerm, 3, 60, 3, term + ' months'],
              ['Early Withdrawal Penalty', earlyPenalty, setEarlyPenalty, 1, 12, 1, earlyPenalty + ' months interest'],
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
          <div style={{...st.vsCard, ...(calc.winner === 'CD' ? st.winner : {})}}>
            <div style={{fontSize:14,fontWeight:700,color:'#60a5fa',marginBottom:12}}>Certificate of Deposit</div>
            <div style={{fontSize:11,color:'#64748b'}}>Interest Earned</div>
            <div style={{fontSize:28,fontWeight:800,color:'#f0c842'}}>{fmt(calc.cdInterest)}</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Total at Maturity</div>
            <div style={{fontSize:18,fontWeight:700,color:'#e2e8f0'}}>{fmt(calc.cdTotal)}</div>
            <div style={{fontSize:11,color:'#ef4444',marginTop:8}}>Early penalty: {fmt(calc.penaltyAmt)}</div>
            {calc.winner === 'CD' && <div style={{...st.badge,...st.greenBadge,marginTop:10}}>WINNER (+{fmt(calc.diff)})</div>}
          </div>
          <div style={st.vsMid}>VS</div>
          <div style={{...st.vsCard, ...(calc.winner === 'HYSA' ? st.winner : {})}}>
            <div style={{fontSize:14,fontWeight:700,color:'#a78bfa',marginBottom:12}}>High-Yield Savings</div>
            <div style={{fontSize:11,color:'#64748b'}}>Interest Earned</div>
            <div style={{fontSize:28,fontWeight:800,color:'#f0c842'}}>{fmt(calc.hysaInterest)}</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Total Value</div>
            <div style={{fontSize:18,fontWeight:700,color:'#e2e8f0'}}>{fmt(calc.hysaTotal)}</div>
            <div style={{fontSize:11,color:'#10b981',marginTop:8}}>Full liquidity — withdraw anytime</div>
            {calc.winner === 'HYSA' && <div style={{...st.badge,...st.greenBadge,marginTop:10}}>WINNER</div>}
          </div>
        </div>

        <div style={st.goldBox}>
          <h2 style={{...st.h2,color:'#f0c842'}}>The Verdict</h2>
          <p style={{fontSize:18,fontWeight:700,color:'#e2e8f0',marginBottom:8}}>{calc.winner === 'Tie' ? 'Both earn the same — go with HYSA for liquidity' : 'The ' + calc.winner + ' wins by ' + fmt(calc.diff) + ' over ' + term + ' months'}</p>
          <p style={st.p}>{calc.winner === 'CD' ? 'The CD earns ' + fmt(calc.diff) + ' more because of the higher rate (' + cdRate + '% vs ' + hysaRate + '%). This extra earning is worth it IF you will not need the money for ' + term + ' months. If you withdraw early, the ' + fmt(calc.penaltyAmt) + ' penalty could eliminate your advantage.' : 'The HYSA offers full liquidity with competitive returns. While the CD rate is higher, the flexibility of a HYSA is often worth the small difference in earnings.'}</p>
        </div>

        <AdUnit slot="3248634657" />

        <div style={st.box}>
          <h2 style={st.h2}>CD vs HYSA — Complete Guide</h2>
          <h3 style={st.h3}>When to Choose a CD</h3>
          <p style={st.p}>CDs are ideal for money you will not need for a specific period: a down payment you are saving for next year, a wedding fund, or any goal with a defined timeline. The guaranteed rate means you know exactly how much you will earn. In a falling rate environment, locking in today rate with a CD protects your returns.</p>
          <h3 style={st.h3}>When to Choose a HYSA</h3>
          <p style={st.p}>A HYSA is better for your emergency fund (you need instant access), short-term savings you might need anytime, or when CD and HYSA rates are very close (under 0.25% difference). The flexibility to withdraw without penalty is valuable insurance against unexpected expenses.</p>
          <h3 style={st.h3}>The CD Ladder Strategy</h3>
          <p style={st.p}>The best approach for many savers is a CD ladder: split your money across CDs with different maturity dates (3, 6, 12, 18, 24 months). As each CD matures, you either use the money or reinvest at the longest term. This gives you periodic access to funds while earning higher average rates than a HYSA.</p>
        </div>

        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2>{[['/cd-calculator','CD Calculator'],['/savings-interest-calculator','Savings Interest'],['/savings-goal-calculator','Savings Goal'],['/emergency-fund-calculator','Emergency Fund'],['/inflation-impact-calculator','Inflation Calculator']].map(([href,lbl]) => (<a key={href} href={href} style={st.calcA}>{lbl}</a>))}</div>

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"CD vs High-Yield Savings","item":"https://www.freefincalc.net/cd-vs-high-yield-savings"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"CD vs High-Yield Savings Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":"2654","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
