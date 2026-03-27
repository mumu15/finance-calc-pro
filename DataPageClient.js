'use client'
import { useState, useMemo } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit'
import FaqSchema from '../../../../components/FaqSchema'

function fmtUnit(val, unit) {
  if (unit === '$/mo' || unit === '$/yr' || unit === '$' || unit === '$/gal') return '$' + Math.round(val).toLocaleString('en-US') + (unit === '$/mo' ? '/mo' : unit === '$/yr' ? '/yr' : unit === '$/gal' ? '/gal' : '')
  if (unit === '%') return val + '%'
  if (unit === '/100') return val + '/100'
  if (unit === 'years') return val + ' years'
  if (unit === 'x') return val + 'x'
  if (unit === '% of income') return val + '%'
  return val.toLocaleString('en-US')
}

function grade(val, best, worst) {
  const range = worst - best
  if (range === 0) return { g: 'B', c: '#f0c842' }
  const pos = (val - best) / range
  if (pos <= 0.15) return { g: 'A+', c: '#10b981' }
  if (pos <= 0.3) return { g: 'A', c: '#10b981' }
  if (pos <= 0.45) return { g: 'B+', c: '#84cc16' }
  if (pos <= 0.6) return { g: 'B', c: '#f0c842' }
  if (pos <= 0.75) return { g: 'C', c: '#f97316' }
  if (pos <= 0.9) return { g: 'D', c: '#ef4444' }
  return { g: 'F', c: '#ef4444' }
}

export default function DataPageClient({ topic, states, allTopics }) {
  const [sortCol, setSortCol] = useState('value')
  const [sortAsc, setSortAsc] = useState(topic.sortDir === 'asc')
  const [search, setSearch] = useState('')

  const computeFn = useMemo(() => new Function('s', 'return ' + topic.metricFn), [topic.metricFn])

  const rows = useMemo(() => {
    return states.map(s => ({ ...s, value: computeFn(s) }))
  }, [states, computeFn])

  const sorted = useMemo(() => {
    let arr = [...rows]
    if (search) arr = arr.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
    arr.sort((a, b) => {
      let va = sortCol === 'value' ? a.value : sortCol === 'name' ? a.name : sortCol === 'income' ? a.medianIncome : a.colIndex
      let vb = sortCol === 'value' ? b.value : sortCol === 'name' ? b.name : sortCol === 'income' ? b.medianIncome : b.colIndex
      if (typeof va === 'string') return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va)
      return sortAsc ? va - vb : vb - va
    })
    return arr
  }, [rows, sortCol, sortAsc, search])

  const defaultSorted = useMemo(() => {
    let arr = [...rows]
    arr.sort((a, b) => topic.sortDir === 'asc' ? a.value - b.value : b.value - a.value)
    return arr
  }, [rows, topic.sortDir])

  const best = defaultSorted[0]
  const worst = defaultSorted[defaultSorted.length - 1]
  const avg = Math.round(rows.reduce((s, r) => s + r.value, 0) / rows.length)
  const median = defaultSorted[25] ? defaultSorted[25].value : avg
  const top5 = defaultSorted.slice(0, 5)
  const bottom5 = defaultSorted.slice(-5).reverse()

  function toggleSort(col) {
    if (sortCol === col) setSortAsc(!sortAsc)
    else { setSortCol(col); setSortAsc(col === 'name') }
  }

  const faqs = [
    { q: 'What state has the best ' + topic.insight + '?', a: best.name + ' ranks #1 with ' + fmtUnit(best.value, topic.unit) + '. ' + (top5[1] ? top5[1].name : '') + ' and ' + (top5[2] ? top5[2].name : '') + ' round out the top 3.' },
    { q: 'What state has the worst ' + topic.insight + '?', a: worst.name + ' ranks last (#50) with ' + fmtUnit(worst.value, topic.unit) + '. ' + (bottom5[1] ? bottom5[1].name : '') + ' and ' + (bottom5[2] ? bottom5[2].name : '') + ' are also among the worst.' },
    { q: 'What is the national average for ' + topic.insight + '?', a: 'The average across all 50 states is ' + fmtUnit(avg, topic.unit) + '. The median is ' + fmtUnit(median, topic.unit) + '.' },
    { q: 'How is this data calculated?', a: 'This data is calculated using the latest available median income, housing prices, cost of living indices, tax rates, and expense data for each state. Our methodology uses consistent formulas applied to all 50 states for fair comparison.' },
  ]

  const related = allTopics.filter(t => t.slug !== topic.slug && t.category === topic.category).slice(0, 6)
  const otherData = allTopics.filter(t => t.slug !== topic.slug && t.category !== topic.category).slice(0, 8)

  const bestVal = topic.sortDir === 'asc' ? defaultSorted[0].value : defaultSorted[defaultSorted.length - 1].value
  const worstVal = topic.sortDir === 'asc' ? defaultSorted[defaultSorted.length - 1].value : defaultSorted[0].value

  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 1000, margin: '0 auto', padding: '32px 16px 64px' },
    bc: { fontSize: 13, color: '#64748b', marginBottom: 20, display: 'flex', gap: 6, flexWrap: 'wrap' },
    bcA: { color: '#64748b', textDecoration: 'none' },
    h1: { fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.15 },
    desc: { fontSize: 15, color: '#94a3b8', lineHeight: 1.7, margin: '0 0 28px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 },
    statCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 16, textAlign: 'center' },
    statNum: { fontSize: 20, fontWeight: 800 },
    statLbl: { fontSize: 10, color: '#64748b', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' },
    box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 24 },
    h2: { fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' },
    searchInput: { width: '100%', padding: '10px 16px', borderRadius: 10, background: '#1a1d28', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none', marginBottom: 16, fontFamily: 'inherit' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
    th: { padding: '10px 12px', textAlign: 'left', color: '#64748b', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', userSelect: 'none' },
    td: { padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' },
    barOuter: { height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden', marginTop: 4, width: '100%' },
    tagLink: { display: 'inline-block', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', margin: '0 6px 8px 0', transition: 'all 0.15s' },
  }

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}>
          <a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span>
          <a href="/data" style={st.bcA}>Data & Research</a><span style={{color:'#475569'}}>{'\u203a'}</span>
          <span style={{color:'#94a3b8'}}>{topic.title.split('(')[0].trim()}</span>
        </nav>

        <h1 style={st.h1}>{topic.title}</h1>
        <p style={st.desc}>{topic.desc}</p>

        <div style={st.statsGrid}>
          <div style={st.statCard}><div style={{...st.statNum, color:'#10b981'}}>{fmtUnit(best.value, topic.unit)}</div><div style={st.statLbl}>Best ({best.name})</div></div>
          <div style={st.statCard}><div style={{...st.statNum, color:'#ef4444'}}>{fmtUnit(worst.value, topic.unit)}</div><div style={st.statLbl}>Worst ({worst.name})</div></div>
          <div style={st.statCard}><div style={{...st.statNum, color:'#f0c842'}}>{fmtUnit(avg, topic.unit)}</div><div style={st.statLbl}>Average</div></div>
          <div style={st.statCard}><div style={{...st.statNum, color:'#60a5fa'}}>{fmtUnit(median, topic.unit)}</div><div style={st.statLbl}>Median</div></div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:28}}>
          <div style={st.box}>
            <h2 style={{...st.h2,color:'#10b981',fontSize:16}}>Top 5 States</h2>
            {top5.map((s, i) => (
              <div key={s.slug} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <span style={{color:'#e2e8f0',fontSize:13}}>{'#' + (i+1) + ' '}<a href={'/cost-of-living-calculator/state/' + s.slug} style={{color:'#e2e8f0',textDecoration:'none'}}>{s.name}</a></span>
                <span style={{fontWeight:700,color:'#10b981',fontSize:13}}>{fmtUnit(s.value, topic.unit)}</span>
              </div>
            ))}
          </div>
          <div style={st.box}>
            <h2 style={{...st.h2,color:'#ef4444',fontSize:16}}>Bottom 5 States</h2>
            {bottom5.map((s, i) => (
              <div key={s.slug} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <span style={{color:'#e2e8f0',fontSize:13}}>{'#' + (50-i) + ' '}<a href={'/cost-of-living-calculator/state/' + s.slug} style={{color:'#e2e8f0',textDecoration:'none'}}>{s.name}</a></span>
                <span style={{fontWeight:700,color:'#ef4444',fontSize:13}}>{fmtUnit(s.value, topic.unit)}</span>
              </div>
            ))}
          </div>
        </div>

        <AdUnit slot="3248634657" />

        <div style={st.box}>
          <h2 style={st.h2}>{'All 50 States \u2014 ' + topic.metricLabel}</h2>
          <input type="text" placeholder="Search states..." value={search} onChange={e => setSearch(e.target.value)} style={st.searchInput} />
          <div style={{overflowX:'auto'}}>
            <table style={st.table}>
              <thead><tr>
                <th style={st.th}>#</th>
                <th style={st.th} onClick={() => toggleSort('name')}>State {sortCol==='name' ? (sortAsc ? '\u25B2' : '\u25BC') : ''}</th>
                <th style={st.th} onClick={() => toggleSort('value')}>{topic.metricLabel} {sortCol==='value' ? (sortAsc ? '\u25B2' : '\u25BC') : ''}</th>
                <th style={{...st.th, width:'20%'}}>Visual</th>
                <th style={st.th} onClick={() => toggleSort('income')}>Income {sortCol==='income' ? (sortAsc ? '\u25B2' : '\u25BC') : ''}</th>
                <th style={st.th} onClick={() => toggleSort('col')}>COL {sortCol==='col' ? (sortAsc ? '\u25B2' : '\u25BC') : ''}</th>
                <th style={st.th}>Grade</th>
              </tr></thead>
              <tbody>
                {sorted.map((s, i) => {
                  const origRank = defaultSorted.findIndex(d => d.slug === s.slug) + 1
                  const range = Math.abs(worstVal - bestVal) || 1
                  const pct = topic.sortDir === 'asc'
                    ? Math.round((s.value - bestVal) / range * 100)
                    : Math.round((worstVal - s.value) / (worstVal - bestVal || 1) * 100)
                  const barColor = pct > 70 ? '#10b981' : pct > 40 ? '#f0c842' : '#ef4444'
                  const g = grade(s.value, topic.sortDir === 'asc' ? bestVal : worstVal, topic.sortDir === 'asc' ? worstVal : bestVal)
                  return (
                    <tr key={s.slug} style={{background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)'}}>
                      <td style={{...st.td,color:'#64748b',fontSize:12,width:36}}>{'#' + origRank}</td>
                      <td style={st.td}><a href={'/cost-of-living-calculator/state/' + s.slug} style={{color:'#e2e8f0',textDecoration:'none',fontWeight:600}}>{s.name}</a></td>
                      <td style={{...st.td,fontWeight:700,color:'#f0c842'}}>{fmtUnit(s.value, topic.unit)}</td>
                      <td style={st.td}><div style={st.barOuter}><div style={{height:'100%',borderRadius:3,background:barColor,width: Math.max(5, pct) + '%',transition:'width 0.4s'}} /></div></td>
                      <td style={{...st.td,color:'#94a3b8'}}>{'$' + Math.round(s.medianIncome).toLocaleString()}</td>
                      <td style={{...st.td,color:'#94a3b8'}}>{s.colIndex}</td>
                      <td style={st.td}><span style={{fontWeight:800,color:g.c}}>{g.g}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Key Takeaways</h2>
          <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.8,margin:'0 0 12px'}}>Based on our analysis of {topic.insight} across all 50 states, <strong style={{color:'#10b981'}}>{best.name}</strong> ranks #1 with {fmtUnit(best.value, topic.unit)}, while <strong style={{color:'#ef4444'}}>{worst.name}</strong> ranks last at {fmtUnit(worst.value, topic.unit)}. The national average is {fmtUnit(avg, topic.unit)}.</p>
          <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.8,margin:'0 0 12px'}}>States with no income tax ({states.filter(s => s.noTax).map(s => s.name).join(', ')}) generally perform well on affordability metrics due to higher effective take-home pay.</p>
          <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.8,margin:0}}>The gap between the best and worst state is significant: {fmtUnit(Math.abs(best.value - worst.value), topic.unit)}. This means your choice of state can make a dramatic difference in your {topic.insight}. Use our <a href={topic.relatedCalc} style={{color:'#f0c842'}}>{topic.relatedCalc.replace(/\//g, ' ').replace(/-/g, ' ').trim()}</a> to run the numbers for your specific situation.</p>
        </div>

        {related.length > 0 && (
          <div style={st.box}>
            <h2 style={st.h2}>Related Data</h2>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {related.map(t => (
                <a key={t.slug} href={'/data/' + t.slug} style={{...st.tagLink,background:'rgba(240,200,66,0.06)',border:'1px solid rgba(240,200,66,0.15)',color:'#f0c842'}}>{t.title.split('(')[0].split('2026')[0].trim()}</a>
              ))}
            </div>
          </div>
        )}

        {otherData.length > 0 && (
          <div style={st.box}>
            <h2 style={st.h2}>Explore More Data</h2>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {otherData.map(t => (
                <a key={t.slug} href={'/data/' + t.slug} style={{...st.tagLink,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#94a3b8'}}>{t.title.split('(')[0].split('2026')[0].trim()}</a>
              ))}
            </div>
          </div>
        )}

        <div style={st.box}>
          <h2 style={st.h2}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={i < faqs.length - 1 ? {borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16} : {paddingBottom:8}}>
              <h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3>
              <p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>

      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":topic.title,"description":topic.desc,"author":{"@type":"Organization","name":"FreeFinCalc"},"publisher":{"@type":"Organization","name":"FreeFinCalc"},"datePublished":"2026-03-22","dateModified":"2026-03-22","mainEntityOfPage":"https://www.freefincalc.net/data/"+topic.slug})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Data & Research","item":"https://www.freefincalc.net/data"},{"@type":"ListItem","position":3,"name":topic.title,"item":"https://www.freefincalc.net/data/"+topic.slug}]})}} />
      <Footer />
    </div>
  )
}
