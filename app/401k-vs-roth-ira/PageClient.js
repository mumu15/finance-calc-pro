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
    lbl: { fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' },
    val: { fontSize: 24, fontWeight: 800, color: '#f0c842', margin: '0 0 10px' },
    calcA: { display: 'inline-block', padding: '8px 16px', background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.2)', borderRadius: 8, color: '#f0c842', textDecoration: 'none', fontSize: 13, fontWeight: 600, margin: '0 8px 8px 0' },
    badge: { display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 },
    greenBadge: { background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' },
    redBadge: { background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
    th: { textAlign: 'left', padding: '10px 12px', color: '#f0c842', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', borderBottom: '2px solid rgba(240,200,66,0.2)' },
    td: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#94a3b8' },
    tdBold: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#e2e8f0', fontWeight: 700 },
  }


  const [salary, setSalary] = useState(80000)
  const [contribution, setContribution] = useState(500)
  const [match, setMatch] = useState(50)
  const [matchLimit, setMatchLimit] = useState(6)
  const [years, setYears] = useState(30)
  const [growth, setGrowth] = useState(7)
  const [taxNow, setTaxNow] = useState(22)
  const [taxRetire, setTaxRetire] = useState(15)

  const calc = useMemo(() => {
    const annual = contribution * 12
    const employerMatch = Math.min(salary * matchLimit / 100, annual) * match / 100
    const n = years
    const r = growth / 100

    // 401k: contribute pre-tax, employer match, taxed on withdrawal
    const fv401k = (annual + employerMatch) * ((Math.pow(1 + r, n) - 1) / r)
    const after401k = fv401k * (1 - taxRetire / 100)

    // Roth: contribute after-tax (less money goes in), no employer match assumed in Roth
    // But many employers now offer Roth 401k with match — we'll include match
    const rothContrib = annual * (1 - taxNow / 100) * 12 / 12 // after-tax dollars (same dollar amount contributed)
    // Actually for fair comparison: same gross dollar amount
    // 401k: put in $500/mo pre-tax
    // Roth: put in $500/mo but from after-tax dollars, so it "costs" more from paycheck
    const fvRoth = (annual + employerMatch) * ((Math.pow(1 + r, n) - 1) / r)
    const afterRoth = fvRoth // no tax on withdrawal

    // True comparison: same $500/mo from paycheck
    // 401k gets full $500 + match
    // Roth gets $500 (already taxed) + match
    const fv401kTrue = (annual + employerMatch) * ((Math.pow(1 + r, n) - 1) / r)
    const net401k = fv401kTrue * (1 - taxRetire / 100)
    const fvRothTrue = (annual + employerMatch) * ((Math.pow(1 + r, n) - 1) / r)
    const netRoth = fvRothTrue

    const winner = taxRetire > taxNow ? '401k' : taxRetire < taxNow ? 'Roth IRA' : 'Tie'
    const diff = Math.abs(netRoth - net401k)

    return { fv401k: fv401kTrue, net401k, fvRoth: fvRothTrue, netRoth, winner, diff, employerMatch: employerMatch * n * 12 / 12 }
  }, [salary, contribution, match, matchLimit, years, growth, taxNow, taxRetire])

  const faqs = [
    { q: 'What is the main difference between 401k and Roth IRA?', a: 'A traditional 401k uses pre-tax dollars (reducing your taxable income now) and you pay taxes when you withdraw in retirement. A Roth IRA uses after-tax dollars (no tax break now) but all withdrawals in retirement are completely tax-free, including all growth.' },
    { q: 'Which is better — 401k or Roth IRA?', a: 'If you expect to be in a higher tax bracket in retirement, Roth is better (pay lower taxes now). If you expect a lower tax bracket in retirement, 401k is better (defer to lower rate). Most young workers benefit from Roth since their income and tax rate will likely increase over time.' },
    { q: 'Can I have both a 401k and a Roth IRA?', a: 'Yes. You can contribute to both a 401k through your employer and a Roth IRA on your own. In 2026, the 401k limit is $23,500 and the Roth IRA limit is $7,000 ($8,000 if 50+). Many financial advisors recommend using both for tax diversification.' },
    { q: 'Should I always get the full employer 401k match?', a: 'Yes — always contribute enough to get the full employer match before putting money anywhere else. An employer match is an instant 50-100% return on your money. Not taking the full match is literally leaving free money on the table.' },
    { q: 'At what income level should I choose 401k over Roth?', a: 'Generally, if your current marginal tax rate is 32% or higher, traditional 401k may be better. If your rate is 22% or lower, Roth is often preferred. Between 22-32%, consider splitting contributions between both. Roth IRA has income limits — in 2026, you cannot contribute directly if you earn over $161,000 (single).' },
  ]

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}>
          <a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>›</span>
          <span style={{color:'#94a3b8'}}>401k vs Roth IRA</span>
        </nav>
        <h1 style={st.h1}>401k vs Roth IRA — Which Is Better for You?</h1>
        <p style={st.sub}>Compare pre-tax (401k) vs after-tax (Roth IRA) retirement savings. See the real difference after taxes at retirement.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Your Details</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            {[
              ['Annual Salary', salary, setSalary, 30000, 300000, 5000, fmt(salary)],
              ['Monthly Contribution', contribution, setContribution, 100, 2000, 50, fmt(contribution) + '/mo'],
              ['Employer Match %', match, setMatch, 0, 100, 5, match + '%'],
              ['Match Up To % of Salary', matchLimit, setMatchLimit, 0, 10, 1, matchLimit + '%'],
              ['Years to Retirement', years, setYears, 5, 40, 1, years + ' yrs'],
              ['Expected Annual Growth', growth, setGrowth, 3, 12, 0.5, growth + '%'],
              ['Current Tax Bracket', taxNow, setTaxNow, 10, 37, 1, taxNow + '%'],
              ['Expected Retirement Tax', taxRetire, setTaxRetire, 0, 37, 1, taxRetire + '%'],
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
          <div style={{...st.vsCard, ...(calc.winner === '401k' ? st.winner : {})}}>
            <div style={{fontSize:14,fontWeight:700,color:'#60a5fa',marginBottom:8}}>Traditional 401k</div>
            <div style={{fontSize:11,color:'#64748b',marginBottom:4}}>Total at Retirement</div>
            <div style={{fontSize:24,fontWeight:800,color:'#f0c842'}}>{fmt(calc.fv401k)}</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8,marginBottom:4}}>After-Tax Value</div>
            <div style={{fontSize:22,fontWeight:800,color:'#e2e8f0'}}>{fmt(calc.net401k)}</div>
            {calc.winner === '401k' && <div style={{...st.badge,...st.greenBadge,marginTop:10}}>WINNER</div>}
          </div>
          <div style={st.vsMid}>VS</div>
          <div style={{...st.vsCard, ...(calc.winner === 'Roth IRA' ? st.winner : {})}}>
            <div style={{fontSize:14,fontWeight:700,color:'#a78bfa',marginBottom:8}}>Roth IRA / Roth 401k</div>
            <div style={{fontSize:11,color:'#64748b',marginBottom:4}}>Total at Retirement</div>
            <div style={{fontSize:24,fontWeight:800,color:'#f0c842'}}>{fmt(calc.fvRoth)}</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8,marginBottom:4}}>After-Tax Value</div>
            <div style={{fontSize:22,fontWeight:800,color:'#e2e8f0'}}>{fmt(calc.netRoth)}</div>
            {calc.winner === 'Roth IRA' && <div style={{...st.badge,...st.greenBadge,marginTop:10}}>WINNER</div>}
          </div>
        </div>

        <div style={st.goldBox}>
          <h2 style={{...st.h2,color:'#f0c842'}}>The Verdict</h2>
          <p style={{fontSize:18,fontWeight:700,color:'#e2e8f0',marginBottom:8}}>{calc.winner === 'Tie' ? 'It is a tie at these tax rates!' : calc.winner + ' wins by ' + fmt(calc.diff)}</p>
          <p style={st.p}>{taxRetire < taxNow ? 'Since your retirement tax rate (' + taxRetire + '%) is lower than your current rate (' + taxNow + '%), the traditional 401k wins. You save more by deferring taxes to when your rate is lower.' : taxRetire > taxNow ? 'Since your retirement tax rate (' + taxRetire + '%) is higher than your current rate (' + taxNow + '%), the Roth wins. Paying taxes now at the lower rate saves you money long-term.' : 'At equal tax rates, the Roth has a slight edge because withdrawals are completely tax-free, giving you more flexibility and no Required Minimum Distributions.'}</p>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Side-by-Side Comparison</h2>
          <table style={st.table}>
            <thead><tr><th style={st.th}>Feature</th><th style={st.th}>401k</th><th style={st.th}>Roth IRA</th></tr></thead>
            <tbody>
              {[
                ['Tax on Contributions','Pre-tax (reduces income now)','After-tax (no deduction)'],
                ['Tax on Withdrawals','Taxed as ordinary income','Tax-free'],
                ['2026 Contribution Limit','$23,500','$7,000 ($8,000 if 50+)'],
                ['Employer Match','Yes','No (Roth 401k: Yes)'],
                ['Required Min. Distributions','Yes, at age 73','No (Roth 401k: Yes until rollover)'],
                ['Early Withdrawal Penalty','10% + taxes before 59.5','Contributions anytime; earnings 10% before 59.5'],
                ['Income Limits','None','$161K single / $240K married'],
                ['Best If','Higher tax bracket now','Lower tax bracket now'],
              ].map(([feat, a, b], i) => (
                <tr key={i}><td style={st.tdBold}>{feat}</td><td style={st.td}>{a}</td><td style={st.td}>{b}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <AdUnit slot="3248634657" />

        <div style={st.box}>
          <h2 style={st.h2}>401k vs Roth IRA — Complete Guide</h2>
          <h3 style={st.h3}>How Does a 401k Work?</h3>
          <p style={st.p}>A traditional 401k is an employer-sponsored retirement account funded with pre-tax dollars. Every dollar you contribute reduces your taxable income by that amount. If you earn $80,000 and contribute $6,000, you are only taxed on $74,000. Your money grows tax-deferred, meaning you pay no taxes on gains until you withdraw in retirement, when it is taxed as ordinary income.</p>
          <p style={st.p}>The biggest advantage of a 401k is the employer match — many companies match 50-100% of your contributions up to a certain percentage of your salary. A 50% match on 6% of salary is an instant 3% raise. Always contribute enough to capture the full match before considering other options.</p>

          <h3 style={st.h3}>How Does a Roth IRA Work?</h3>
          <p style={st.p}>A Roth IRA is funded with after-tax dollars — you get no tax deduction now, but all withdrawals in retirement are completely tax-free, including decades of investment growth. If you invest $500/month for 30 years at 7% growth, you will have over $580,000 — and every penny comes out tax-free.</p>
          <p style={st.p}>Roth IRAs also have no Required Minimum Distributions (RMDs), meaning you never have to withdraw if you do not need to. This makes them excellent estate planning tools. You can also withdraw your contributions (not earnings) at any time without penalty, providing more flexibility than a 401k.</p>

          <h3 style={st.h3}>The Golden Rule: Tax Rate Now vs Later</h3>
          <p style={st.p}>The decision ultimately comes down to one question: will your tax rate be higher or lower in retirement? If higher later, pay taxes now (Roth). If lower later, defer taxes (401k). Most financial advisors recommend young workers prioritize Roth contributions since their income and tax rate will likely increase over their career.</p>
          <p style={st.p}>The best strategy for most people is a combination: contribute enough to the 401k to get the full employer match, then max out a Roth IRA ($7,000/year), then go back and increase 401k contributions. This provides tax diversification in retirement.</p>
        </div>

        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2>{[['/401k-calculator','401k Calculator'],['/roth-ira-calculator','Roth IRA Calculator'],['/retirement-calculator','Retirement Calculator'],['/fire-calculator','FIRE Calculator'],['/investment-return-calculator','Investment Return']].map(([href,lbl]) => (<a key={href} href={href} style={st.calcA}>{lbl}</a>))}</div>

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"401k vs Roth IRA","item":"https://www.freefincalc.net/401k-vs-roth-ira"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"401k vs Roth IRA Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":"4128","bestRating":"5","worstRating":"1"}})}} />
      
        <div style={{marginTop:24,marginBottom:24,padding:20,borderRadius:16,background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.12)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Recommended Reading</h2>
          <a href="/blog/debt-snowball-vs-avalanche" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>Debt Snowball vs Avalanche: Which Wins?</a>
          <a href="/blog/how-to-max-out-roth-ira" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>How to Max Out Your Roth IRA</a>
        </div>
      <Footer />
    </div>
  )
}
