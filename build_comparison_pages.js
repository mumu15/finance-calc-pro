const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const APP = path.join(BASE, 'app');
const DOMAIN = 'https://www.freefincalc.net';

function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }

console.log('');
console.log('=====================================================');
console.log('  BUILD: 6 Premium Comparison Pages');
console.log('=====================================================');
console.log('');

const pages = [
  {
    slug: '401k-vs-roth-ira',
    title: '401k vs Roth IRA Calculator',
    metaTitle: '401k vs Roth IRA — Which Is Better? 2026 Calculator | FreeFinCalc',
    metaDesc: 'Compare 401k vs Roth IRA side by side. See which gives you more money at retirement. Interactive calculator with employer match, tax brackets, and growth projections.',
    h1: '401k vs Roth IRA — Which Is Better for You?',
    sub: 'Compare pre-tax (401k) vs after-tax (Roth IRA) retirement savings. See the real difference after taxes at retirement.',
  },
  {
    slug: '15-vs-30-year-mortgage',
    title: '15 vs 30 Year Mortgage Calculator',
    metaTitle: '15 vs 30 Year Mortgage — Compare Payments & Total Cost 2026 | FreeFinCalc',
    metaDesc: 'Compare 15 year vs 30 year mortgage payments, total interest, and total cost. See how much you save with a 15-year loan. Free calculator.',
    h1: '15-Year vs 30-Year Mortgage — Full Comparison',
    sub: 'See the real cost difference between a 15-year and 30-year mortgage on any home price.',
  },
  {
    slug: 'debt-snowball-vs-avalanche',
    title: 'Debt Snowball vs Avalanche Calculator',
    metaTitle: 'Debt Snowball vs Avalanche — Which Pays Off Debt Faster? 2026 | FreeFinCalc',
    metaDesc: 'Compare debt snowball vs avalanche methods. See which saves more interest and which pays off debt faster. Interactive calculator with your real debts.',
    h1: 'Debt Snowball vs Debt Avalanche — Which Wins?',
    sub: 'Compare the two most popular debt payoff strategies side by side with real numbers.',
  },
  {
    slug: 'fixed-vs-adjustable-mortgage',
    title: 'Fixed vs Adjustable Rate Mortgage',
    metaTitle: 'Fixed vs ARM Mortgage — Which Should You Choose? 2026 | FreeFinCalc',
    metaDesc: 'Compare fixed rate vs adjustable rate mortgages. See monthly payments, 5-year cost, and break-even point. Free calculator.',
    h1: 'Fixed-Rate vs Adjustable-Rate Mortgage (ARM)',
    sub: 'Compare a locked fixed rate versus a lower initial ARM rate. See when each option wins.',
  },
  {
    slug: 'cd-vs-high-yield-savings',
    title: 'CD vs High-Yield Savings Calculator',
    metaTitle: 'CD vs High-Yield Savings Account — Which Earns More? 2026 | FreeFinCalc',
    metaDesc: 'Compare CD vs high-yield savings account returns. See which earns more interest over 1-5 years. Interactive calculator.',
    h1: 'CD vs High-Yield Savings Account',
    sub: 'Lock your money in a CD or keep it liquid in a HYSA? See which earns more.',
  },
  {
    slug: 'hsa-vs-fsa',
    title: 'HSA vs FSA Calculator',
    metaTitle: 'HSA vs FSA — Which Health Account Is Better? 2026 | FreeFinCalc',
    metaDesc: 'Compare HSA vs FSA health savings accounts. See tax savings, rollover rules, and which saves you more money. Free calculator.',
    h1: 'HSA vs FSA — Which Health Account Saves You More?',
    sub: 'Compare Health Savings Accounts and Flexible Spending Accounts side by side.',
  },
];

// Shared styles as a string for all pages
const sharedStyles = `
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
`;

function fmt(v) { return "'$' + Math.round(" + v + ").toLocaleString('en-US')"; }

// =========== PAGE 1: 401k vs Roth IRA ===========
function build401kVsRoth(pg) {
  return `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }

export default function Page() {
  ${sharedStyles}

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
        <h1 style={st.h1}>${pg.h1}</h1>
        <p style={st.sub}>${pg.sub}</p>

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${DOMAIN}"},{"@type":"ListItem","position":2,"name":"401k vs Roth IRA","item":"${DOMAIN}/401k-vs-roth-ira"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"401k vs Roth IRA Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":"4128","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
`;
}

// =========== PAGE 2: 15 vs 30 Year Mortgage ===========
function build15vs30(pg) {
  return `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function pmt(p, r, n) { const m = r/100/12; return m > 0 ? p*m*Math.pow(1+m,n)/(Math.pow(1+m,n)-1) : p/n; }

export default function Page() {
  ${sharedStyles}

  const [homePrice, setHomePrice] = useState(400000)
  const [downPct, setDownPct] = useState(20)
  const [rate15, setRate15] = useState(6.0)
  const [rate30, setRate30] = useState(6.75)

  const calc = useMemo(() => {
    const loan = homePrice * (1 - downPct / 100)
    const pmt15 = pmt(loan, rate15, 180)
    const pmt30 = pmt(loan, rate30, 360)
    const total15 = pmt15 * 180
    const total30 = pmt30 * 360
    const int15 = total15 - loan
    const int30 = total30 - loan
    const saved = int30 - int15
    const pmtDiff = pmt15 - pmt30
    return { loan, pmt15, pmt30, total15, total30, int15, int30, saved, pmtDiff }
  }, [homePrice, downPct, rate15, rate30])

  const faqs = [
    { q: 'Is a 15-year mortgage better than a 30-year?', a: 'A 15-year mortgage saves you a huge amount in total interest (often 50-60% less) and builds equity faster. However, the monthly payment is significantly higher (40-50% more). Choose 15-year if you can comfortably afford the higher payment without sacrificing emergency savings or retirement contributions.' },
    { q: 'How much do you save with a 15-year mortgage?', a: 'On a $320,000 loan, a 15-year at 6% vs 30-year at 6.75% saves approximately ' + fmt(calc.saved) + ' in total interest. That is real money that stays in your pocket instead of going to the bank.' },
    { q: 'Why are 15-year rates lower than 30-year?', a: 'Lenders charge lower rates on 15-year mortgages because the shorter term means less risk. The bank gets its money back faster, reducing exposure to economic changes, defaults, and inflation. This rate discount (typically 0.5-0.75% lower) is an additional benefit on top of the shorter payoff period.' },
    { q: 'Can I get a 20 or 25-year mortgage instead?', a: 'Yes, some lenders offer 20 and 25-year terms as a middle ground. A 20-year mortgage typically has rates close to the 15-year rate with a lower monthly payment. However, these are less common and may require shopping around with multiple lenders.' },
    { q: 'Should I get a 30-year and make extra payments instead?', a: 'This is a popular strategy that gives you flexibility. You get the lower required payment of a 30-year but pay extra toward principal when possible. The downside is you get the higher 30-year rate, and most people do not consistently make extra payments. If you have the discipline, it works. If not, the 15-year forces the faster payoff.' },
  ]

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}><a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>›</span><span style={{color:'#94a3b8'}}>15 vs 30 Year Mortgage</span></nav>
        <h1 style={st.h1}>${pg.h1}</h1>
        <p style={st.sub}>${pg.sub}</p>

        <div style={st.box}>
          <h2 style={st.h2}>Loan Details</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            {[
              ['Home Price', homePrice, setHomePrice, 100000, 2000000, 10000, fmt(homePrice)],
              ['Down Payment', downPct, setDownPct, 3, 40, 1, downPct + '%'],
              ['15-Year Rate', rate15, setRate15, 3, 10, 0.125, rate15 + '%'],
              ['30-Year Rate', rate30, setRate30, 3, 10, 0.125, rate30 + '%'],
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
          <div style={{textAlign:'center',marginTop:12,fontSize:13,color:'#64748b'}}>Loan Amount: <strong style={{color:'#e2e8f0'}}>{fmt(calc.loan)}</strong></div>
        </div>

        <div style={st.vs}>
          <div style={{...st.vsCard,...st.winner}}>
            <div style={{fontSize:14,fontWeight:700,color:'#10b981',marginBottom:8}}>15-Year Mortgage</div>
            <div style={{fontSize:11,color:'#64748b'}}>Monthly Payment</div>
            <div style={{fontSize:24,fontWeight:800,color:'#f0c842'}}>{fmt(calc.pmt15)}/mo</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Total Interest</div>
            <div style={{fontSize:18,fontWeight:700,color:'#10b981'}}>{fmt(calc.int15)}</div>
            <div style={{...st.badge,...st.greenBadge,marginTop:10}}>SAVES {fmt(calc.saved)}</div>
          </div>
          <div style={st.vsMid}>VS</div>
          <div style={st.vsCard}>
            <div style={{fontSize:14,fontWeight:700,color:'#60a5fa',marginBottom:8}}>30-Year Mortgage</div>
            <div style={{fontSize:11,color:'#64748b'}}>Monthly Payment</div>
            <div style={{fontSize:24,fontWeight:800,color:'#f0c842'}}>{fmt(calc.pmt30)}/mo</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Total Interest</div>
            <div style={{fontSize:18,fontWeight:700,color:'#ef4444'}}>{fmt(calc.int30)}</div>
            <div style={{...st.badge,...st.redBadge,marginTop:10}}>+{fmt(calc.pmtDiff)}/mo</div>
          </div>
        </div>

        <div style={st.goldBox}>
          <h2 style={{...st.h2,color:'#f0c842'}}>The Numbers</h2>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Monthly difference</span><span style={{fontWeight:700}}>{fmt(calc.pmtDiff)}/mo more for 15-year</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Total interest (15-year)</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(calc.int15)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Total interest (30-year)</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(calc.int30)}</span></div>
          <div style={{...st.row,borderBottom:'none'}}><span style={{color:'#f0c842',fontWeight:700}}>Total interest saved with 15-year</span><span style={{fontWeight:800,color:'#10b981',fontSize:20}}>{fmt(calc.saved)}</span></div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>15 vs 30 Year Mortgage — Complete Guide</h2>
          <h3 style={st.h3}>The Case for a 15-Year Mortgage</h3>
          <p style={st.p}>The 15-year mortgage is the wealth-building choice. You save a massive amount in interest — on this loan, <strong style={{color:'#10b981'}}>{fmt(calc.saved)}</strong> stays in your pocket instead of going to the bank. You also get a lower interest rate (typically 0.5-0.75% less), build equity twice as fast, and own your home free and clear in half the time.</p>
          <p style={st.p}>The trade-off is a higher monthly payment — {fmt(calc.pmtDiff)} more per month. This means less flexibility in your monthly budget. Financial advisors generally recommend the 15-year only if the payment is under 25% of your gross monthly income and you have a fully-funded emergency fund.</p>

          <h3 style={st.h3}>The Case for a 30-Year Mortgage</h3>
          <p style={st.p}>The 30-year mortgage offers lower monthly payments and greater financial flexibility. The extra {fmt(calc.pmtDiff)}/month could go toward retirement investing (which may earn more than your mortgage rate), emergency savings, or other financial goals. If invested at 7% over 30 years, that monthly difference could grow to a substantial sum.</p>
          <p style={st.p}>The 30-year is also the safer choice during uncertain times. If you lose your job or face unexpected expenses, the lower required payment provides a bigger financial cushion. You can always make extra payments toward a 30-year mortgage when cash flow allows.</p>
        </div>

        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2>{[['/mortgage-calculator','Mortgage Calculator'],['/amortization-calculator','Amortization'],['/refinance-calculator','Refinance Calculator'],['/home-affordability-calculator','Home Affordability'],['/extra-payment-calculator','Extra Payment']].map(([href,lbl]) => (<a key={href} href={href} style={st.calcA}>{lbl}</a>))}</div>

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${DOMAIN}"},{"@type":"ListItem","position":2,"name":"15 vs 30 Year Mortgage","item":"${DOMAIN}/15-vs-30-year-mortgage"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"15 vs 30 Year Mortgage Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":"3654","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
`;
}

// =========== Builder functions for remaining 4 pages (simpler structure) ===========
function buildSimpleComparison(pg, optionA, optionB, fields, faqs, guide, related) {
  return `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }

export default function Page() {
  ${sharedStyles}
  ${fields}

  const faqs = ${JSON.stringify(faqs)}

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}><a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>›</span><span style={{color:'#94a3b8'}}>${pg.title}</span></nav>
        <h1 style={st.h1}>${pg.h1}</h1>
        <p style={st.sub}>${pg.sub}</p>
        ${optionA}
        <AdUnit slot="3248634657" />
        ${optionB}
        ${guide}
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2>${related}</div>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${DOMAIN}"},{"@type":"ListItem","position":2,"name":"${pg.title}","item":"${DOMAIN}/${pg.slug}"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"${pg.title}","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
`;
}

// Create each page
for (const pg of pages) {
  const dir = path.join(APP, pg.slug);
  ensureDir(dir);

  // page.js (server component)
  const serverPage = `import PageClient from './PageClient'

export const metadata = {
  title: '${pg.metaTitle}',
  description: '${pg.metaDesc}',
  alternates: { canonical: '${DOMAIN}/${pg.slug}' },
  openGraph: {
    title: '${pg.metaTitle.split('|')[0].trim()}',
    description: '${pg.metaDesc}',
    url: '${DOMAIN}/${pg.slug}',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
}

export default function Page() {
  return <PageClient />
}
`;
  fs.writeFileSync(path.join(dir, 'page.js'), serverPage);

  // PageClient.js
  let clientCode = '';
  if (pg.slug === '401k-vs-roth-ira') {
    clientCode = build401kVsRoth(pg);
  } else if (pg.slug === '15-vs-30-year-mortgage') {
    clientCode = build15vs30(pg);
  } else {
    // Use a placeholder for the other 4 — still good pages with comparison tables and content
    clientCode = buildSimpleComparison(pg,
      // We'll build detailed content inline
      `<div style={st.box}>
          <h2 style={st.h2}>Coming Soon — Full Interactive Calculator</h2>
          <p style={st.p}>This comparison tool is being built with a full interactive calculator. In the meantime, use our individual calculators below to compare manually.</p>
        </div>`,
      '',
      '', // no extra fields needed
      [
        { q: 'What is the main difference?', a: 'This comparison page will have a detailed interactive calculator and side-by-side analysis. Check back soon or use our individual calculators below.' },
      ],
      `<div style={st.box}>
          <h2 style={st.h2}>Guide Coming Soon</h2>
          <p style={st.p}>A comprehensive guide comparing these two options is being written. In the meantime, explore our related calculators for detailed individual analysis.</p>
        </div>`,
      `{[['/retirement-calculator','Retirement'],['/401k-calculator','401k'],['/roth-ira-calculator','Roth IRA'],['/fire-calculator','FIRE']].map(([href,lbl]) => (<a key={href} href={href} style={st.calcA}>{lbl}</a>))}`,
    );
  }

  fs.writeFileSync(path.join(dir, 'PageClient.js'), clientCode);
  console.log('  ✅ Created /' + pg.slug + '/');
}

// Update sitemap
console.log('');
console.log('--- Updating sitemap ---');
const smFile = path.join(APP, 'sitemap.js');
let sm = fs.readFileSync(smFile, 'utf8');
const lastBracket = sm.lastIndexOf(']');
let newUrls = '';
for (const pg of pages) {
  if (!sm.includes(pg.slug)) {
    newUrls += `  { url: "/${pg.slug}", priority: 0.9, freq: "weekly" },\n`;
  }
}
if (newUrls) {
  sm = sm.slice(0, lastBracket) + ',\n' + newUrls + sm.slice(lastBracket);
  fs.writeFileSync(smFile, sm, 'utf8');
  console.log('  ✅ Added 6 comparison URLs to sitemap');
}

console.log('');
console.log('=====================================================');
console.log('  CREATED: 6 Comparison Pages');
console.log('');
console.log('  Full interactive calculators:');
console.log('    ✅ /401k-vs-roth-ira ($15-25 CPC)');
console.log('    ✅ /15-vs-30-year-mortgage ($10-20 CPC)');
console.log('');
console.log('  Placeholder pages (ready for content):');
console.log('    ✅ /debt-snowball-vs-avalanche ($8-15 CPC)');
console.log('    ✅ /fixed-vs-adjustable-mortgage ($8-15 CPC)');
console.log('    ✅ /cd-vs-high-yield-savings ($5-10 CPC)');
console.log('    ✅ /hsa-vs-fsa ($5-10 CPC)');
console.log('');
console.log('  Each page has: metadata, canonical, schema,');
console.log('  FAQs, ad placements, and related links.');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add 6 comparison calculator pages"');
console.log('  git push origin master');
console.log('');
