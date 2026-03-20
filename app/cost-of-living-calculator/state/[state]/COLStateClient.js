'use client'
import { useState, useMemo } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit'
import FaqSchema from '../../../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function pct(idx) { return idx > 100 ? '+' + (idx - 100) + '%' : '-' + (100 - idx) + '%' }
function grade(idx) { return idx <= 85 ? 'A+' : idx <= 92 ? 'A' : idx <= 98 ? 'B+' : idx <= 105 ? 'B' : idx <= 115 ? 'C' : idx <= 130 ? 'D' : 'F' }
function gradeColor(idx) { return idx <= 92 ? '#10b981' : idx <= 105 ? '#f0c842' : idx <= 120 ? '#f97316' : '#ef4444' }

export default function COLStateClient({ item: s, all }) {
  const [salary, setSalary] = useState(s.medianIncome)
  const [compareSlug, setCompareSlug] = useState('')
  const comp = compareSlug ? all.find(x => x.slug === compareSlug) : null

  const calc = useMemo(() => {
    const mo = salary / 12
    const housing = Math.round(mo * 0.30 * s.housing / 100)
    const food = Math.round(s.groceryMonth)
    const transport = Math.round(mo * 0.12 * s.transport / 100)
    const utilities = Math.round(s.electricBill * 1.5)
    const healthcare = Math.round(mo * 0.08 * s.healthcare / 100)
    const childcare = s.childcare
    const stateTax = Math.round(mo * s.taxRate / 100)
    const fedTax = Math.round(mo * 0.22)
    const total = housing + food + transport + utilities + healthcare + stateTax + fedTax
    const savings = Math.round(mo - total)
    const savingsRate = Math.round((savings / mo) * 100)

    let compData = null
    if (comp) {
      const equivSalary = Math.round(salary * comp.colIndex / s.colIndex)
      const diff = equivSalary - salary
      const pctDiff = Math.round((diff / salary) * 100)
      const compHousing = Math.round((equivSalary / 12) * 0.30 * comp.housing / 100)
      compData = { equivSalary, diff, pctDiff, housing: compHousing, rent: comp.medianRent }
    }

    return { housing, food, transport, utilities, healthcare, childcare, stateTax, fedTax, total, savings, savingsRate, comp: compData }
  }, [salary, s, comp])

  // Rank this state by affordability
  const sorted = [...all].sort((a, b) => a.colIndex - b.colIndex)
  const rank = sorted.findIndex(x => x.slug === s.slug) + 1
  const cheapest = sorted.slice(0, 5)
  const mostExpensive = sorted.slice(-5).reverse()

  const faqs = [
    { q: 'What is the cost of living in ' + s.name + ' compared to the national average?', a: s.name + ' (' + s.abbr + ') has a cost of living index of ' + s.colIndex + ', meaning it is ' + (s.colIndex > 100 ? (s.colIndex - 100) + '% more expensive' : (100 - s.colIndex) + '% cheaper') + ' than the US average. Housing is the biggest factor with an index of ' + s.housing + '. The median rent is ' + fmt(s.medianRent) + '/month and the median home price is ' + fmt(s.medianHome) + '. ' + s.name + ' ranks #' + rank + ' out of 50 states for affordability (1 = cheapest).' },
    { q: 'What salary do I need to live comfortably in ' + s.name + '?', a: 'For a single person, a comfortable salary in ' + s.name + ' is approximately ' + fmt(Math.round(s.medianIncome * 1.3)) + '/year (' + fmt(Math.round(s.medianIncome * 1.3 / 12)) + '/month). For a family of four, aim for ' + fmt(Math.round(s.medianIncome * 2.2)) + '/year. This covers housing at 30% of income, groceries (' + fmt(s.groceryMonth) + '/mo), transportation, healthcare, and a 15% savings rate. The median household income in ' + s.name + ' is ' + fmt(s.medianIncome) + '.' },
    { q: 'How much is rent in ' + s.name + ' in 2026?', a: 'The median rent for a one-bedroom apartment in ' + s.name + ' is approximately ' + fmt(s.medianRent) + '/month. A two-bedroom averages ' + fmt(Math.round(s.medianRent * 1.35)) + '/month. Rent varies significantly by city: ' + s.topCities.slice(0, 3).join(', ') + ' are the most popular metro areas. ' + (s.housing > 100 ? 'Housing costs in ' + s.name + ' are above average — budget carefully.' : 'Housing in ' + s.name + ' is affordable compared to the national average.') },
    { q: 'Is ' + s.name + ' a good state to move to in 2026?', a: s.colIndex <= 95 ? s.name + ' is an excellent choice for affordability. With a cost of living ' + (100 - s.colIndex) + '% below the national average and median rent of just ' + fmt(s.medianRent) + '/month, your money goes significantly further here. ' + (s.noTax ? 'The lack of state income tax is an additional major benefit.' : '') + ' Top cities include ' + s.topCities.slice(0, 3).join(', ') + '.' : s.colIndex <= 105 ? s.name + ' offers a balanced lifestyle with costs near the national average. ' + (s.noTax ? 'No state income tax boosts your take-home pay. ' : '') + 'Growing job markets in ' + s.topCities.slice(0, 2).join(' and ') + ' attract new residents.' : s.name + ' is a more expensive state (COL index ' + s.colIndex + '), but offers ' + (s.noTax ? 'no state income tax, ' : '') + 'strong job markets and high median incomes (' + fmt(s.medianIncome) + '). Popular areas include ' + s.topCities.slice(0, 3).join(', ') + '.' },
    { q: 'What are the cheapest cities to live in ' + s.name + '?', a: 'The most affordable areas in ' + s.name + ' are typically smaller cities and rural areas away from the major metros. Within ' + s.name + ', costs can vary 20-40% between the most expensive city (' + s.topCities[0] + ' metro) and more affordable areas. ' + (s.topCities.length >= 4 ? s.topCities[3] + ' and ' + s.topCities[4] : s.topCities[1]) + ' tend to offer lower costs while still providing good amenities and job opportunities.' },
    { q: 'How much are groceries in ' + s.name + '?', a: 'The average monthly grocery bill in ' + s.name + ' for a single person is approximately ' + fmt(s.groceryMonth) + ' (' + fmt(Math.round(s.groceryMonth * 2.5)) + ' for a family of four). ' + s.name + ' food costs are ' + (s.food > 100 ? (s.food - 100) + '% above' : (100 - s.food) + '% below') + ' the national average. Shopping at Walmart, Aldi, and local discount stores can reduce this by 15-25%.' },
    { q: 'How much are utilities in ' + s.name + '?', a: 'The average monthly electric bill in ' + s.name + ' is approximately ' + fmt(s.electricBill) + '. Total utilities (electric, gas, water, internet) average ' + fmt(Math.round(s.electricBill * 2.2)) + '/month. ' + s.name + ' utilities are ' + (s.utilities > 100 ? (s.utilities - 100) + '% above' : (100 - s.utilities) + '% below') + ' the national average. ' + (s.utilities > 120 ? 'Extreme temperatures drive higher heating/cooling costs.' : 'Utility costs are manageable for most households.') },
    { q: 'Does ' + s.name + ' have state income tax?', a: s.noTax ? s.name + ' has NO state income tax, saving the average household ' + fmt(Math.round(s.medianIncome * 0.05)) + '-' + fmt(Math.round(s.medianIncome * 0.08)) + '/year compared to states with typical income tax rates. This is one of only 9 states with no income tax. However, ' + s.name + ' may collect more revenue through sales tax or property tax.' : s.name + ' has a state income tax rate of ' + s.taxRate + '%. On the median household income of ' + fmt(s.medianIncome) + ', that is approximately ' + fmt(Math.round(s.medianIncome * s.taxRate / 100)) + '/year in state income tax. ' + (s.taxRate > 7 ? 'This is among the highest in the nation.' : s.taxRate > 5 ? 'This is a moderate rate near the national average.' : 'This is below the national average — a tax advantage.') },
  ]

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
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 },
    statCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 16, textAlign: 'center' },
    statNum: { fontSize: 22, fontWeight: 800 },
    statLbl: { fontSize: 10, color: '#64748b', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' },
    barOuter: { height: 10, background: 'rgba(255,255,255,0.05)', borderRadius: 5, overflow: 'hidden', marginTop: 8 },
    costGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 },
    costCard: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 },
    costIcon: { fontSize: 28, marginBottom: 6 },
    costLabel: { fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
    costValue: { fontSize: 20, fontWeight: 800, color: '#f0c842', marginTop: 4 },
    costSub: { fontSize: 11, color: '#64748b', marginTop: 2 },
    tagA: { display: 'inline-block', padding: '6px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#94a3b8', textDecoration: 'none', fontSize: 12, margin: '0 6px 8px 0', transition: 'all 0.15s' },
    calcA: { display: 'inline-block', padding: '8px 16px', background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.2)', borderRadius: 8, color: '#f0c842', textDecoration: 'none', fontSize: 13, fontWeight: 600, margin: '0 8px 8px 0' },
    select: { width: '100%', padding: '12px 16px', borderRadius: 12, background: '#1a1d28', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: 14, fontFamily: 'inherit', outline: 'none', cursor: 'pointer' },
    gradeCircle: { width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, flexShrink: 0 },
    rankBadge: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 },
  }

  const barColor = (idx) => idx > 130 ? '#ef4444' : idx > 110 ? '#f97316' : idx > 100 ? '#f0c842' : '#10b981'
  const barWidth = (idx) => Math.min(100, Math.round(idx / 2.7)) + '%'

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>

        {/* Breadcrumb */}
        <nav style={st.bc}>
          <a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>›</span>
          <a href="/cost-of-living-calculator" style={st.bcA}>Cost of Living</a><span style={{color:'#475569'}}>›</span>
          <span style={{color:'#94a3b8'}}>{s.name}</span>
        </nav>

        {/* Hero with Grade */}
        <div style={{display:'flex',gap:20,alignItems:'flex-start',marginBottom:32,flexWrap:'wrap'}}>
          <div style={{flex:1,minWidth:280}}>
            <h1 style={st.h1}>Cost of Living in {s.name} ({s.abbr}) — 2026 Complete Guide</h1>
            <p style={st.sub}>{s.name}, known as the "{s.nicknames}", is {s.desc}. Here is everything you need to know about the cost of living in the {s.nicknames} — from housing and groceries to taxes, utilities, childcare, and what salary you actually need.</p>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{...st.gradeCircle, background: gradeColor(s.colIndex) + '15', border: '3px solid ' + gradeColor(s.colIndex), color: gradeColor(s.colIndex)}}>
              {grade(s.colIndex)}
            </div>
            <div style={{fontSize:11,color:'#64748b',marginTop:6}}>Affordability</div>
            <div style={{...st.rankBadge, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', marginTop: 6}}>
              #{rank} of 50
            </div>
          </div>
        </div>

        {/* Key Stats Cards */}
        <div style={st.statsGrid}>
          <div style={st.statCard}><div style={{...st.statNum, color: gradeColor(s.colIndex)}}>{s.colIndex}</div><div style={st.statLbl}>COL Index</div></div>
          <div style={st.statCard}><div style={{...st.statNum, color: '#f0c842'}}>{fmt(s.medianRent)}</div><div style={st.statLbl}>Median Rent</div></div>
          <div style={st.statCard}><div style={{...st.statNum, color: '#60a5fa'}}>{fmt(s.medianIncome)}</div><div style={st.statLbl}>Median Income</div></div>
          <div style={st.statCard}><div style={{...st.statNum, color: s.noTax ? '#10b981' : '#f97316'}}>{s.noTax ? 'NONE' : s.taxRate + '%'}</div><div style={st.statLbl}>State Tax</div></div>
        </div>

        {/* Monthly Cost Snapshot — Visual Cards */}
        <div style={st.box}>
          <h2 style={st.h2}>Monthly Cost Snapshot — {s.name}</h2>
          <p style={st.p}>Here is what a typical month costs in {s.name} for a single person earning the median income of {fmt(s.medianIncome)}/year:</p>
          <div style={st.costGrid}>
            <div style={st.costCard}><div style={st.costIcon}>🏠</div><div style={st.costLabel}>Rent (1BR)</div><div style={st.costValue}>{fmt(s.medianRent)}/mo</div><div style={st.costSub}>Housing index: {s.housing} ({pct(s.housing)})</div></div>
            <div style={st.costCard}><div style={st.costIcon}>🛒</div><div style={st.costLabel}>Groceries</div><div style={st.costValue}>{fmt(s.groceryMonth)}/mo</div><div style={st.costSub}>Food index: {s.food} ({pct(s.food)})</div></div>
            <div style={st.costCard}><div style={st.costIcon}>⚡</div><div style={st.costLabel}>Electric Bill</div><div style={st.costValue}>{fmt(s.electricBill)}/mo</div><div style={st.costSub}>Utilities index: {s.utilities} ({pct(s.utilities)})</div></div>
            <div style={st.costCard}><div style={st.costIcon}>🚗</div><div style={st.costLabel}>Gas (per gallon)</div><div style={st.costValue}>{'$'}{s.avgGas}</div><div style={st.costSub}>Transport index: {s.transport} ({pct(s.transport)})</div></div>
            <div style={st.costCard}><div style={st.costIcon}>🏥</div><div style={st.costLabel}>Healthcare</div><div style={st.costValue}>{fmt(Math.round(s.medianIncome / 12 * 0.08 * s.healthcare / 100))}/mo</div><div style={st.costSub}>Health index: {s.healthcare} ({pct(s.healthcare)})</div></div>
            <div style={st.costCard}><div style={st.costIcon}>👶</div><div style={st.costLabel}>Childcare</div><div style={st.costValue}>{fmt(s.childcare)}/mo</div><div style={st.costSub}>Avg. infant daycare</div></div>
          </div>
        </div>

        {/* Index Breakdown with Visual Bars */}
        <div style={st.box}>
          <h2 style={st.h2}>{s.name} Cost Index Breakdown (100 = National Average)</h2>
          <p style={st.p}>Each category shows how {s.name} compares to the national average. Green means cheaper, yellow means similar, orange/red means more expensive.</p>
          {[['🏠 Housing', s.housing],['🍔 Food & Groceries', s.food],['🚗 Transportation', s.transport],['⚡ Utilities', s.utilities],['🏥 Healthcare', s.healthcare]].map(([label, idx]) => (
            <div key={label} style={{marginBottom: 18}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:14,color:'#e2e8f0',marginBottom:6}}>
                <span style={{fontWeight:600}}>{label}</span>
                <span style={{fontWeight:800,color:barColor(idx)}}>{idx} <span style={{fontWeight:400,fontSize:12,color:'#64748b'}}>({pct(idx)} vs avg)</span></span>
              </div>
              <div style={st.barOuter}>
                <div style={{height:'100%',borderRadius:5,background:barColor(idx),width:barWidth(idx),transition:'width 0.6s ease'}} />
              </div>
            </div>
          ))}
        </div>

        <AdUnit slot="3248634657" />

        {/* Interactive Monthly Budget Calculator */}
        <div style={st.goldBox}>
          <h2 style={{...st.h2, color: '#f0c842'}}>Monthly Budget Calculator — {s.name}</h2>
          <p style={st.p}>Adjust your salary to see a detailed monthly budget breakdown for living in {s.name}.</p>
          <div style={{marginBottom:20}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
              <span style={{color:'#94a3b8',fontSize:14}}>Your Annual Salary</span>
              <span style={{color:'#f0c842',fontWeight:800,fontSize:18}}>{fmt(salary)}/yr</span>
            </div>
            <input type="range" min={25000} max={350000} step={5000} value={salary} onChange={e => setSalary(+e.target.value)} style={{width:'100%',accentColor:'#f0c842'}} />
          </div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>🏠 Housing (30% of income, adjusted)</span><span style={{fontWeight:700}}>{fmt(calc.housing)}/mo</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>🛒 Groceries</span><span style={{fontWeight:700}}>{fmt(calc.food)}/mo</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>🚗 Transportation</span><span style={{fontWeight:700}}>{fmt(calc.transport)}/mo</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>⚡ Utilities</span><span style={{fontWeight:700}}>{fmt(calc.utilities)}/mo</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>🏥 Healthcare</span><span style={{fontWeight:700}}>{fmt(calc.healthcare)}/mo</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>🏛️ Federal Tax (~22%)</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(calc.fedTax)}/mo</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>🏛️ {s.name} State Tax ({s.noTax ? 'none' : s.taxRate + '%'})</span><span style={{fontWeight:700,color: s.noTax ? '#10b981' : '#ef4444'}}>{s.noTax ? '$0' : fmt(calc.stateTax)}/mo</span></div>
          <div style={{...st.row,borderBottom:'none',paddingTop:14}}>
            <span style={{fontWeight:700,fontSize:16,color: calc.savings > 0 ? '#10b981' : '#ef4444'}}>💰 Estimated Monthly Savings</span>
            <span style={{fontWeight:800,fontSize:22,color: calc.savings > 0 ? '#10b981' : '#ef4444'}}>{fmt(calc.savings)}/mo</span>
          </div>
          <div style={{textAlign:'center',marginTop:12,fontSize:13,color:'#64748b'}}>Savings rate: <strong style={{color: calc.savingsRate >= 20 ? '#10b981' : calc.savingsRate >= 10 ? '#f0c842' : '#ef4444'}}>{calc.savingsRate}%</strong> {calc.savingsRate >= 20 ? '— Excellent' : calc.savingsRate >= 10 ? '— Good' : '— Needs improvement'}</div>
        </div>

        {/* State Comparison Tool */}
        <div style={st.box}>
          <h2 style={st.h2}>Compare {s.name} to Another State</h2>
          <p style={st.p}>Select a state to see how much salary you would need there to maintain the same lifestyle you have in {s.name}.</p>
          <select style={st.select} value={compareSlug} onChange={e => setCompareSlug(e.target.value)}>
            <option value="">Choose a state to compare...</option>
            {all.filter(x => x.slug !== s.slug).sort((a,b) => a.name.localeCompare(b.name)).map(x => (
              <option key={x.slug} value={x.slug}>{x.name} (COL: {x.colIndex})</option>
            ))}
          </select>
          {calc.comp && comp && (
            <div style={{marginTop:20,background:'rgba(240,200,66,0.04)',border:'1px solid rgba(240,200,66,0.12)',borderRadius:14,padding:20}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:16,textAlign:'center',marginBottom:16}}>
                <div><div style={{fontSize:13,color:'#64748b',marginBottom:4}}>{s.name}</div><div style={{fontSize:28,fontWeight:800,color:gradeColor(s.colIndex)}}>{s.colIndex}</div></div>
                <div style={{alignSelf:'center',fontSize:20,color:'#475569'}}>vs</div>
                <div><div style={{fontSize:13,color:'#64748b',marginBottom:4}}>{comp.name}</div><div style={{fontSize:28,fontWeight:800,color:gradeColor(comp.colIndex)}}>{comp.colIndex}</div></div>
              </div>
              <div style={st.row}><span style={{color:'#94a3b8'}}>Your salary in {s.name}</span><span style={{fontWeight:700}}>{fmt(salary)}</span></div>
              <div style={st.row}><span style={{color:'#94a3b8'}}>Equivalent salary in {comp.name}</span><span style={{fontWeight:800,color:'#f0c842',fontSize:18}}>{fmt(calc.comp.equivSalary)}</span></div>
              <div style={st.row}><span style={{color:'#94a3b8'}}>Salary difference</span><span style={{fontWeight:700,color: calc.comp.diff > 0 ? '#ef4444' : '#10b981'}}>{calc.comp.diff > 0 ? '+' : ''}{fmt(calc.comp.diff)}/yr ({calc.comp.pctDiff > 0 ? '+' : ''}{calc.comp.pctDiff}%)</span></div>
              <div style={st.row}><span style={{color:'#94a3b8'}}>Rent comparison</span><span style={{fontWeight:700}}>{fmt(s.medianRent)} vs {fmt(comp.medianRent)}/mo</span></div>
              <div style={{...st.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>{comp.name} income tax</span><span style={{fontWeight:700,color: comp.noTax ? '#10b981' : '#94a3b8'}}>{comp.noTax ? 'None' : comp.taxRate + '%'}</span></div>
            </div>
          )}
        </div>

        {/* Top Cities */}
        <div style={st.box}>
          <h2 style={st.h2}>Top Cities in {s.name}</h2>
          <p style={st.p}>The most popular cities for residents and newcomers in {s.name}:</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
            {s.topCities.map((city, i) => (
              <div key={city} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'10px 16px',display:'flex',alignItems:'center',gap:8}}>
                <span style={{color:'#f0c842',fontWeight:800,fontSize:16}}>{i + 1}</span>
                <span style={{color:'#e2e8f0',fontWeight:600,fontSize:14}}>{city}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Content Guide */}
        <div style={st.box}>
          <h2 style={st.h2}>Complete Guide to Living in {s.name} (2026)</h2>

          <h3 style={st.h3}>Housing Costs in {s.name}</h3>
          <p style={st.p}>Housing is the single biggest expense in {s.name}, as it is everywhere. The median home price in {s.name} is <strong style={{color:'#e2e8f0'}}>{fmt(s.medianHome)}</strong>, and the median rent for a one-bedroom apartment is <strong style={{color:'#e2e8f0'}}>{fmt(s.medianRent)}/month</strong>. With a housing cost index of {s.housing}, {s.name} housing is {s.housing > 100 ? (s.housing - 100) + '% more expensive' : (100 - s.housing) + '% cheaper'} than the national average.</p>
          <p style={st.p}>{s.housing > 130 ? 'Housing affordability is a real challenge in ' + s.name + '. Many residents spend well over 30% of their income on housing. Consider looking at suburbs or smaller cities within the state for significantly lower costs.' : s.housing > 100 ? 'Housing costs in ' + s.name + ' are above average but manageable for households earning the median income. The 30% rule (spend no more than 30% of gross income on housing) is achievable in most areas.' : 'Housing in ' + s.name + ' is a genuine advantage. The low cost of housing frees up income for savings, investments, and discretionary spending that residents of expensive states simply cannot afford.'}</p>

          <h3 style={st.h3}>Taxes in {s.name}</h3>
          <p style={st.p}>{s.noTax ? s.name + ' is one of only 9 states with no state income tax. This is a major financial benefit — a household earning ' + fmt(s.medianIncome) + ' saves approximately ' + fmt(Math.round(s.medianIncome * 0.06)) + '/year compared to a state with a 6% income tax rate. This extra take-home pay effectively reduces your cost of living and increases your purchasing power.' : s.name + ' has a state income tax rate of ' + s.taxRate + '%. On the median household income of ' + fmt(s.medianIncome) + ', you will pay approximately ' + fmt(Math.round(s.medianIncome * s.taxRate / 100)) + '/year in state income tax (' + fmt(Math.round(s.medianIncome * s.taxRate / 100 / 12)) + '/month). ' + (s.taxRate > 8 ? 'This is one of the higher rates nationally and significantly impacts disposable income.' : s.taxRate > 5 ? 'This is a moderate rate that most households can absorb.' : 'This is below the national average — a tax advantage for ' + s.name + ' residents.')}</p>

          <h3 style={st.h3}>Groceries and Everyday Expenses</h3>
          <p style={st.p}>The average single person in {s.name} spends approximately <strong style={{color:'#e2e8f0'}}>{fmt(s.groceryMonth)}/month</strong> on groceries. A family of four can expect to spend {fmt(Math.round(s.groceryMonth * 2.5))}-{fmt(Math.round(s.groceryMonth * 3))}/month. The food cost index of {s.food} means groceries in {s.name} are {s.food > 100 ? (s.food - 100) + '% above' : (100 - s.food) + '% below'} the national average.</p>
          <p style={st.p}>Gas prices in {s.name} average <strong style={{color:'#e2e8f0'}}>{'$'}{s.avgGas}/gallon</strong>. For the average commuter driving 15,000 miles/year at 25 MPG, that is roughly {fmt(Math.round(15000 / 25 * s.avgGas))}/year in fuel costs.</p>

          <h3 style={st.h3}>Healthcare Costs</h3>
          <p style={st.p}>{s.name} healthcare costs are {s.healthcare > 100 ? (s.healthcare - 100) + '% above' : (100 - s.healthcare) + '% below'} the national average (index: {s.healthcare}). The average annual healthcare cost per person in {s.name} is approximately {fmt(Math.round(6000 * s.healthcare / 100))} including premiums and out-of-pocket expenses. Employer-sponsored health insurance covers the majority of working adults.</p>

          <h3 style={st.h3}>Childcare Costs</h3>
          <p style={st.p}>Infant daycare in {s.name} averages <strong style={{color:'#e2e8f0'}}>{fmt(s.childcare)}/month</strong> ({fmt(s.childcare * 12)}/year). This is {s.childcare > 1100 ? 'a significant expense that rivals rent in many areas' : s.childcare > 850 ? 'a substantial but manageable expense for dual-income households' : 'below the national average, making ' + s.name + ' more family-friendly from a financial perspective'}. Many families in {s.name} find that one parent staying home is more cost-effective when two or more children need daycare.</p>

          <h3 style={st.h3}>Is {s.name} a Good Place to Live?</h3>
          <p style={st.p}>{s.colIndex <= 90 ? s.name + ' is an excellent choice for anyone prioritizing affordability. Your dollar stretches ' + (100 - s.colIndex) + '% further here than the national average. The trade-off may include fewer big-city amenities in some areas, but cities like ' + s.topCities[0] + ' and ' + s.topCities[1] + ' offer a good balance of affordability and quality of life.' : s.colIndex <= 105 ? s.name + ' offers a solid balance of cost, opportunity, and quality of life. With costs near the national average, you get ' + (s.noTax ? 'the added benefit of no state income tax, ' : '') + 'access to growing job markets in ' + s.topCities[0] + ' and ' + s.topCities[1] + ', and a cost of living that leaves room for saving and investing.' : s.name + ' is a higher-cost state, but the higher expenses often come with higher incomes, better infrastructure, and more job opportunities. The median household income of ' + fmt(s.medianIncome) + ' helps offset the ' + (s.colIndex - 100) + '% premium on living costs. ' + (s.noTax ? 'No state income tax is a significant advantage at higher income levels.' : '')}</p>
        </div>

        {/* Affordability Rankings */}
        <div style={st.box}>
          <h2 style={st.h2}>{s.name} vs. Cheapest and Most Expensive States</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div>
              <h3 style={{fontSize:14,fontWeight:700,color:'#10b981',marginBottom:10,marginTop:0}}>5 Most Affordable States</h3>
              {cheapest.map((x, i) => (
                <a key={x.slug} href={'/cost-of-living-calculator/state/' + x.slug} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',textDecoration:'none',color: x.slug === s.slug ? '#f0c842' : '#94a3b8',fontSize:13}}>
                  <span>#{i + 1} {x.name}</span><span style={{fontWeight:700}}>{x.colIndex}</span>
                </a>
              ))}
            </div>
            <div>
              <h3 style={{fontSize:14,fontWeight:700,color:'#ef4444',marginBottom:10,marginTop:0}}>5 Most Expensive States</h3>
              {mostExpensive.map((x, i) => (
                <a key={x.slug} href={'/cost-of-living-calculator/state/' + x.slug} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',textDecoration:'none',color: x.slug === s.slug ? '#f0c842' : '#94a3b8',fontSize:13}}>
                  <span>#{50 - i} {x.name}</span><span style={{fontWeight:700}}>{x.colIndex}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2>{[['/cost-of-living-calculator','Cost of Living'],['/salary-after-tax-calculator','Salary After Tax'],['/budget-planner-calculator','Budget Planner'],['/moving-cost-calculator','Moving Cost'],['/home-affordability-calculator','Home Affordability'],['/rent-affordability-calculator','Rent Affordability'],['/tax-calculator','Tax Calculator']].map(([href,lbl]) => (<a key={href} href={href} style={st.calcA}>{lbl}</a>))}</div>

        {/* All States Links */}
        <div style={st.box}>
          <h2 style={st.h2}>Cost of Living by State</h2>
          <div>{all.filter(x => x.slug !== s.slug).sort((a,b) => a.name.localeCompare(b.name)).map(x => (<a key={x.slug} href={'/cost-of-living-calculator/state/' + x.slug} style={st.tagA}>{x.name} ({x.colIndex})</a>))}</div>
        </div>

        {/* FAQ Section */}
        <div style={st.box}>
          <h2 style={st.h2}>Frequently Asked Questions — {s.name} Cost of Living</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={i < faqs.length - 1 ? {borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:18,marginBottom:18} : {paddingBottom:8}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>{faq.q}</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>

      </div>
      <AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Cost of Living Calculator","item":"https://www.freefincalc.net/cost-of-living-calculator"},{"@type":"ListItem","position":3,"name":s.name,"item":"https://www.freefincalc.net/cost-of-living-calculator/state/"+s.slug}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Cost of Living Calculator "+s.name,"applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":"3847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
