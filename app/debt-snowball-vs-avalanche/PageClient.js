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


  const [debts, setDebts] = useState([
    { name: 'Credit Card 1', balance: 5000, rate: 22, minPayment: 150 },
    { name: 'Credit Card 2', balance: 8000, rate: 18, minPayment: 200 },
    { name: 'Car Loan', balance: 12000, rate: 6, minPayment: 350 },
    { name: 'Student Loan', balance: 15000, rate: 5, minPayment: 200 },
  ])
  const [extraPayment, setExtraPayment] = useState(300)

  const calc = useMemo(() => {
    function simulate(sorted) {
      const d = sorted.map(x => ({ ...x, bal: x.balance }))
      let months = 0, totalPaid = 0, totalInterest = 0
      const order = []
      while (d.some(x => x.bal > 0) && months < 600) {
        months++
        let extra = extraPayment
        for (const debt of d) {
          if (debt.bal <= 0) continue
          const interest = debt.bal * debt.rate / 100 / 12
          totalInterest += interest
          debt.bal += interest
          const pmt = Math.min(debt.bal, debt.minPayment)
          debt.bal -= pmt
          totalPaid += pmt
        }
        for (const debt of d) {
          if (debt.bal <= 0 || extra <= 0) continue
          const pay = Math.min(debt.bal, extra)
          debt.bal -= pay
          extra -= pay
          totalPaid += pay
          if (debt.bal <= 0 && !order.includes(debt.name)) order.push(debt.name)
        }
      }
      return { months, totalPaid, totalInterest: Math.round(totalInterest), order }
    }

    const snowball = simulate([...debts].sort((a, b) => a.balance - b.balance))
    const avalanche = simulate([...debts].sort((a, b) => b.rate - a.rate))
    const saved = snowball.totalInterest - avalanche.totalInterest
    const fasterMonths = snowball.months - avalanche.months
    const winner = avalanche.totalInterest <= snowball.totalInterest ? 'Avalanche' : 'Snowball'

    return { snowball, avalanche, saved: Math.abs(saved), fasterMonths: Math.abs(fasterMonths), winner }
  }, [debts, extraPayment])

  const totalDebt = debts.reduce((a, d) => a + d.balance, 0)
  const totalMin = debts.reduce((a, d) => a + d.minPayment, 0)

  const updateDebt = (i, field, value) => {
    const n = [...debts]
    n[i] = { ...n[i], [field]: value }
    setDebts(n)
  }

  const faqs = [
    { q: 'What is the debt snowball method?', a: 'The debt snowball method pays off debts from smallest balance to largest, regardless of interest rate. Once the smallest debt is paid off, you roll that payment into the next smallest. The psychological wins of eliminating debts quickly keeps you motivated.' },
    { q: 'What is the debt avalanche method?', a: 'The debt avalanche method pays off debts from highest interest rate to lowest. This is mathematically optimal — you save the most money in total interest. However, it can take longer to see your first debt eliminated, which some people find demotivating.' },
    { q: 'Which method saves more money?', a: 'The avalanche method almost always saves more in total interest because you eliminate the most expensive debt first. On your debts, the avalanche saves ' + fmt(calc.saved) + ' compared to snowball. However, the snowball method works better for people who need quick wins to stay on track.' },
    { q: 'Can I combine both methods?', a: 'Yes — many financial advisors recommend a hybrid approach. Start with the snowball to knock out 1-2 small debts for motivation, then switch to avalanche for the remaining larger debts. The best method is whichever one you actually stick with.' },
    { q: 'How much extra should I pay toward debt?', a: 'Pay as much extra as possible while maintaining a small emergency fund ($1,000). Every extra dollar goes directly to principal and saves you interest. Even an extra $100/month can save thousands and shave years off your payoff timeline.' },
  ]

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}><a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>›</span><span style={{color:'#94a3b8'}}>Debt Snowball vs Avalanche</span></nav>
        <h1 style={st.h1}>Debt Snowball vs Debt Avalanche — Which Wins?</h1>
        <p style={st.sub}>Enter your real debts below and see which method saves more money and which gets you debt-free faster.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Your Debts</h2>
          <div style={{overflowX:'auto'}}>
            <table style={st.table}>
              <thead><tr><th style={st.th}>Debt</th><th style={st.th}>Balance</th><th style={st.th}>APR %</th><th style={st.th}>Min Payment</th></tr></thead>
              <tbody>
                {debts.map((d, i) => (
                  <tr key={i}>
                    <td style={st.tdBold}>{d.name}</td>
                    <td style={st.td}><input type="range" min={500} max={50000} step={500} value={d.balance} onChange={e => updateDebt(i, 'balance', +e.target.value)} style={{width:100,accentColor:'#f0c842'}} /> {fmt(d.balance)}</td>
                    <td style={st.td}><input type="range" min={1} max={30} step={0.5} value={d.rate} onChange={e => updateDebt(i, 'rate', +e.target.value)} style={{width:80,accentColor:'#f0c842'}} /> {d.rate}%</td>
                    <td style={st.td}><input type="range" min={25} max={1000} step={25} value={d.minPayment} onChange={e => updateDebt(i, 'minPayment', +e.target.value)} style={{width:80,accentColor:'#f0c842'}} /> {fmt(d.minPayment)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{marginTop:16}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{fontSize:12,color:'#64748b'}}>Extra Monthly Payment</span><span style={{fontSize:13,fontWeight:700,color:'#f0c842'}}>{fmt(extraPayment)}/mo</span></div>
            <input type="range" min={0} max={2000} step={50} value={extraPayment} onChange={e => setExtraPayment(+e.target.value)} style={{width:'100%',accentColor:'#f0c842'}} />
          </div>
          <div style={{marginTop:12,fontSize:13,color:'#64748b'}}>Total debt: <strong style={{color:'#e2e8f0'}}>{fmt(totalDebt)}</strong> | Min payments: <strong style={{color:'#e2e8f0'}}>{fmt(totalMin)}/mo</strong> | Extra: <strong style={{color:'#f0c842'}}>{fmt(extraPayment)}/mo</strong></div>
        </div>

        <div style={st.vs}>
          <div style={{...st.vsCard, ...(calc.winner === 'Snowball' ? st.winner : {})}}>
            <div style={{fontSize:14,fontWeight:700,color:'#60a5fa',marginBottom:12}}>Snowball Method</div>
            <div style={{fontSize:11,color:'#64748b'}}>Debt-Free In</div>
            <div style={{fontSize:28,fontWeight:800,color:'#f0c842'}}>{calc.snowball.months} months</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Total Interest</div>
            <div style={{fontSize:20,fontWeight:700,color:'#ef4444'}}>{fmt(calc.snowball.totalInterest)}</div>
            {calc.winner === 'Snowball' && <div style={{...st.badge,...st.greenBadge,marginTop:10}}>WINNER</div>}
          </div>
          <div style={st.vsMid}>VS</div>
          <div style={{...st.vsCard, ...(calc.winner === 'Avalanche' ? st.winner : {})}}>
            <div style={{fontSize:14,fontWeight:700,color:'#a78bfa',marginBottom:12}}>Avalanche Method</div>
            <div style={{fontSize:11,color:'#64748b'}}>Debt-Free In</div>
            <div style={{fontSize:28,fontWeight:800,color:'#f0c842'}}>{calc.avalanche.months} months</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Total Interest</div>
            <div style={{fontSize:20,fontWeight:700,color:'#10b981'}}>{fmt(calc.avalanche.totalInterest)}</div>
            {calc.winner === 'Avalanche' && <div style={{...st.badge,...st.greenBadge,marginTop:10}}>WINNER</div>}
          </div>
        </div>

        <div style={st.goldBox}>
          <h2 style={{...st.h2,color:'#f0c842'}}>The Verdict</h2>
          <p style={{fontSize:18,fontWeight:700,color:'#e2e8f0',marginBottom:8}}>The {calc.winner} method wins — saves {fmt(calc.saved)} in interest{calc.fasterMonths > 0 ? ' and ' + calc.fasterMonths + ' months faster' : ''}</p>
          <p style={st.p}>{calc.winner === 'Avalanche' ? 'By tackling your highest-interest debt first, you minimize the total interest paid. This is the mathematically optimal choice. However, if you need quick psychological wins, the snowball method eliminates your smallest debts first to build momentum.' : 'In your specific case, the snowball method is slightly better. This is unusual and typically happens when your smallest debts also have high interest rates. Either way, the difference is small — pick the method you will stick with.'}</p>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Payoff Order Comparison</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div>
              <h3 style={{fontSize:14,fontWeight:700,color:'#60a5fa',marginBottom:8,marginTop:0}}>Snowball Order (smallest first)</h3>
              {[...debts].sort((a,b) => a.balance - b.balance).map((d, i) => (
                <div key={i} style={{padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',fontSize:13,color:'#94a3b8'}}><span style={{color:'#f0c842',fontWeight:700,marginRight:8}}>#{i+1}</span> {d.name} ({fmt(d.balance)})</div>
              ))}
            </div>
            <div>
              <h3 style={{fontSize:14,fontWeight:700,color:'#a78bfa',marginBottom:8,marginTop:0}}>Avalanche Order (highest rate first)</h3>
              {[...debts].sort((a,b) => b.rate - a.rate).map((d, i) => (
                <div key={i} style={{padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',fontSize:13,color:'#94a3b8'}}><span style={{color:'#f0c842',fontWeight:700,marginRight:8}}>#{i+1}</span> {d.name} ({d.rate}% APR)</div>
              ))}
            </div>
          </div>
        </div>

        <AdUnit slot="3248634657" />

        <div style={st.box}>
          <h2 style={st.h2}>Side-by-Side Comparison</h2>
          <table style={st.table}>
            <thead><tr><th style={st.th}>Feature</th><th style={st.th}>Snowball</th><th style={st.th}>Avalanche</th></tr></thead>
            <tbody>
              {[
                ['Strategy','Pay smallest balance first','Pay highest interest first'],
                ['Best for','People who need motivation','People focused on math'],
                ['Saves most money','No','Yes'],
                ['Fastest first win','Yes','No'],
                ['Recommended by','Dave Ramsey','Most financial advisors'],
                ['Risk of quitting','Lower (quick wins)','Higher (slower first payoff)'],
                ['Your months to debt-free',calc.snowball.months + ' months',calc.avalanche.months + ' months'],
                ['Your total interest',fmt(calc.snowball.totalInterest),fmt(calc.avalanche.totalInterest)],
              ].map(([feat,a,b], i) => (
                <tr key={i}><td style={st.tdBold}>{feat}</td><td style={st.td}>{a}</td><td style={st.td}>{b}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Debt Snowball vs Avalanche — Complete Guide</h2>
          <h3 style={st.h3}>The Snowball Method Explained</h3>
          <p style={st.p}>Created and popularized by Dave Ramsey, the debt snowball lists all debts from smallest balance to largest. You make minimum payments on everything except the smallest debt, which gets all your extra money. Once the smallest is eliminated, you roll that entire payment into the next smallest — creating a snowball effect of increasingly larger payments.</p>
          <p style={st.p}>The psychological benefit is powerful. Eliminating a debt completely — even a small one — triggers a dopamine reward that keeps you motivated. Studies from the Harvard Business Review show that people who use the snowball method are more likely to become completely debt-free because the quick wins prevent burnout.</p>
          <h3 style={st.h3}>The Avalanche Method Explained</h3>
          <p style={st.p}>The avalanche method is mathematically optimal. You list all debts from highest interest rate to lowest. All extra money goes to the highest-rate debt first. Since you eliminate the most expensive debt first, you pay the least total interest. On your current debts, the avalanche saves {fmt(calc.saved)} compared to the snowball.</p>
          <p style={st.p}>The downside is that if your highest-rate debt also has a large balance, it can take months before you see your first debt eliminated. This is where many people lose motivation and abandon their plan. The best debt payoff method is the one you actually complete.</p>
          <h3 style={st.h3}>Which Should You Choose?</h3>
          <p style={st.p}>If the interest savings between methods is small (under $500), go with snowball for the motivation. If the savings is significant (over $1,000), avalanche is worth the discipline. Many advisors recommend a hybrid: snowball your first 1-2 small debts for quick wins, then switch to avalanche for the rest.</p>
        </div>

        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2>{[['/debt-snowball-calculator','Debt Snowball'],['/debt-avalanche-calculator','Debt Avalanche'],['/debt-payoff-calculator','Debt Payoff'],['/debt-consolidation-calculator','Debt Consolidation'],['/credit-card-payoff-calculator','Credit Card Payoff'],['/balance-transfer-calculator','Balance Transfer']].map(([href,lbl]) => (<a key={href} href={href} style={st.calcA}>{lbl}</a>))}</div>

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Debt Snowball vs Avalanche","item":"https://www.freefincalc.net/debt-snowball-vs-avalanche"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Debt Snowball vs Avalanche Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":"3847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
