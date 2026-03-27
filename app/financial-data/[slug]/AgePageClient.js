'use client'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

function fmt(n) { return typeof n === 'number' && n >= 100 ? '$' + Math.round(n).toLocaleString('en-US') : String(n) }

export default function AgePageClient({ topic, allTopics }) {
  const faqs = [
    { q: topic.title.includes('?') ? topic.title : 'What does the ' + topic.title.split('2026')[0].trim() + ' look like?', a: topic.desc },
    { q: 'Is this data accurate?', a: 'This data is compiled from Federal Reserve, Bureau of Labor Statistics, and other government sources. Values represent estimates based on the latest available data adjusted to 2026.' },
    { q: 'How do I compare to these averages?', a: 'Use the median (not average) to compare yourself. Averages are skewed higher by wealthy outliers. If you are above the median for your age group, you are doing better than most Americans.' },
  ]

  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 900, margin: '0 auto', padding: '32px 16px 64px' },
    h1: { fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.15 },
    desc: { fontSize: 15, color: '#94a3b8', lineHeight: 1.7, margin: '0 0 28px' },
    box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 24 },
    h2: { fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
    th: { padding: '12px 14px', textAlign: 'left', color: '#f0c842', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', borderBottom: '2px solid rgba(240,200,66,0.2)', letterSpacing: '0.05em' },
    td: { padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    tagLink: { display: 'inline-block', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', margin: '0 6px 8px 0', background: 'rgba(240,200,66,0.06)', border: '1px solid rgba(240,200,66,0.15)', color: '#f0c842' },
  }

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}>
          <a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a>
          <span style={{color:'#475569'}}>{'\u203a'}</span>
          <a href="/financial-data" style={{color:'#64748b',textDecoration:'none'}}>Financial Data</a>
          <span style={{color:'#475569'}}>{'\u203a'}</span>
          <span style={{color:'#94a3b8'}}>{topic.title.split('2026')[0].split('(')[0].trim()}</span>
        </nav>
        <h1 style={st.h1}>{topic.title}</h1>
        <p style={st.desc}>{topic.desc}</p>
        <div style={st.box}>
          <h2 style={st.h2}>{topic.title.split('2026')[0].trim() + ' Data Table'}</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            {topic.columns.map(col => <th key={col} style={st.th}>{col}</th>)}
          </tr></thead><tbody>
            {topic.ages.map((row, i) => (
              <tr key={i} style={{background: i%2===0?'transparent':'rgba(255,255,255,0.015)'}}>
                <td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>{row.age}</td>
                {topic.fields.map(f => <td key={f} style={{...st.td,color:'#f0c842',fontWeight:600}}>{fmt(row[f])}</td>)}
              </tr>))}
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Key Takeaways</h2>
          <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.8,margin:'0 0 12px'}}>The data shows significant variation across age groups. Younger Americans are often starting from a lower base, while peak earning and accumulation years are typically between ages 45-64.</p>
          <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.8,margin:'0 0 12px'}}>The gap between average and median values is important to note. Averages are pulled higher by wealthy outliers, so the median is a better benchmark for most people. If you are above the median for your age group, you are doing better than half of Americans.</p>
          <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.8,margin:0}}>Use our <a href={topic.relatedCalc} style={{color:'#f0c842'}}>{topic.relatedCalc.replace(/\//g,' ').replace(/-/g,' ').trim()}</a> to see where you stand and create a plan to improve your financial position.</p>
        </div>
        <div style={st.box}><h2 style={st.h2}>More Financial Data</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}>{allTopics.filter(t => t.slug !== topic.slug).map(t => <a key={t.slug} href={'/financial-data/'+t.slug} style={st.tagLink}>{t.title.split('2026')[0].split('(')[0].trim()}</a>)}</div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i) => <div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>)}</div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":topic.title,"description":topic.desc,"author":{"@type":"Organization","name":"FreeFinCalc"},"datePublished":"2026-03-22"})}} />
      <Footer />
    </div>
  )
}