import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

export const metadata = {
  title: 'Minimum Wage by State 2026 (All 50 States + Federal) | FreeFinCalc',
  description: 'Current minimum wage rates for all 50 states and federal. Updated for 2026 with tipped wages, scheduled increases, and cost-of-living adjusted rankings.',
  alternates: { canonical: 'https://www.freefincalc.net/minimum-wage-by-state' },
  openGraph: {
    title: 'Minimum Wage by State 2026 (All 50 States + Federal)',
    description: 'Current minimum wage rates for all 50 states and federal. Updated for 2026 with tipped wages, scheduled increases, and cost-of-living adjusted rankings.',
    url: 'https://www.freefincalc.net/minimum-wage-by-state',
    siteName: 'FreeFinCalc',
    type: 'article',
  },
}

const faqs = [{"q":"What is the federal minimum wage in 2026?","a":"The federal minimum wage is $7.25/hour, unchanged since 2009. However, 30+ states have set higher minimums. The highest is Washington DC at $17.50/hour, followed by Washington state at $16.66/hour."},{"q":"Which states have the highest minimum wage?","a":"Washington DC ($17.50), Washington ($16.66), California ($16.50), New York ($16.00), and Connecticut ($16.35) have the highest minimum wages in 2026."},{"q":"Which states use the federal minimum wage?","a":"Alabama, Georgia, Idaho, Indiana, Iowa, Kansas, Kentucky, Louisiana, Mississippi, New Hampshire, North Carolina, North Dakota, Oklahoma, Pennsylvania, South Carolina, Tennessee, Texas, Utah, Wisconsin, and Wyoming all use the federal $7.25/hour rate."},{"q":"What is the tipped minimum wage?","a":"The federal tipped minimum wage is $2.13/hour. Employers must ensure total pay (tips + wages) equals at least the regular minimum wage. Seven states (Alaska, California, Minnesota, Montana, Nevada, Oregon, Washington) do not allow tip credits."}]

export default function Page() {
  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 1000, margin: '0 auto', padding: '32px 16px 64px' },
    h1: { fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.15 },
    desc: { fontSize: 15, color: '#94a3b8', lineHeight: 1.7, margin: '0 0 8px' },
    vol: { fontSize: 12, color: '#64748b', margin: '0 0 28px' },
    box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 24 },
    h2: { fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
    th: { padding: '10px 12px', textAlign: 'left', color: '#f0c842', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid rgba(240,200,66,0.2)' },
    td: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8' },
    calcLink: { display: 'inline-block', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', margin: '0 8px 8px 0', background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.2)', color: '#f0c842' },
    dataLink: { display: 'inline-block', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', margin: '0 6px 8px 0', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', color: '#60a5fa' },
  }

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}>
          <a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a>
          <span style={{color:'#475569'}}>\u203a</span>
          <span style={{color:'#94a3b8'}}>Minimum Wage by State</span>
        </nav>

        <h1 style={st.h1}>Minimum Wage by State 2026 (All 50 States + Federal)</h1>
        <p style={st.desc}>Current minimum wage rates for all 50 states and federal. Updated for 2026 with tipped wages, scheduled increases, and cost-of-living adjusted rankings.</p>
        <p style={st.vol}>Est. monthly search volume: 300K+/mo</p>

        <div style={st.box}>
          <h2 style={st.h2}>Minimum Wage by State 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>State</th>
            <th style={st.th}>Min Wage</th>
            <th style={st.th}>Tipped Wage</th>
            <th style={st.th}>Notes</th>
          </tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Alabama</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>Federal rate (no state minimum)</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Alaska</td><td style={{...st.td}}>$11.73</td><td style={{...st.td}}>$11.73</td><td style={{...st.td}}>No tip credit allowed</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Arizona</td><td style={{...st.td}}>$14.35</td><td style={{...st.td}}>$11.35</td><td style={{...st.td}}>Adjusted annually for inflation</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Arkansas</td><td style={{...st.td}}>$11.00</td><td style={{...st.td}}>$2.63</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>California</td><td style={{...st.td}}>$16.50</td><td style={{...st.td}}>$16.50</td><td style={{...st.td}}>No tip credit. Highest large state.</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Colorado</td><td style={{...st.td}}>$14.42</td><td style={{...st.td}}>$11.39</td><td style={{...st.td}}>Adjusted annually for inflation</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Connecticut</td><td style={{...st.td}}>$16.35</td><td style={{...st.td}}>$6.38</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Delaware</td><td style={{...st.td}}>$13.25</td><td style={{...st.td}}>$2.23</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Florida</td><td style={{...st.td}}>$13.00</td><td style={{...st.td}}>$9.98</td><td style={{...st.td}}>Increasing $1/year until $15</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Georgia</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>State rate $5.15, federal applies</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Hawaii</td><td style={{...st.td}}>$14.00</td><td style={{...st.td}}>$12.75</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Idaho</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$3.35</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Illinois</td><td style={{...st.td}}>$14.00</td><td style={{...st.td}}>$8.40</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Indiana</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Iowa</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$4.35</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Kansas</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Kentucky</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Louisiana</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>No state minimum, federal applies</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Maine</td><td style={{...st.td}}>$14.15</td><td style={{...st.td}}>$7.08</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Maryland</td><td style={{...st.td}}>$15.00</td><td style={{...st.td}}>$3.63</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Massachusetts</td><td style={{...st.td}}>$15.00</td><td style={{...st.td}}>$6.75</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Michigan</td><td style={{...st.td}}>$12.48</td><td style={{...st.td}}>$3.84</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Minnesota</td><td style={{...st.td}}>$11.13</td><td style={{...st.td}}>$11.13</td><td style={{...st.td}}>No tip credit allowed</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Mississippi</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>No state minimum, federal applies</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Missouri</td><td style={{...st.td}}>$13.75</td><td style={{...st.td}}>$6.88</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Montana</td><td style={{...st.td}}>$10.55</td><td style={{...st.td}}>$10.55</td><td style={{...st.td}}>No tip credit for large employers</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Nebraska</td><td style={{...st.td}}>$13.50</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Nevada</td><td style={{...st.td}}>$12.00</td><td style={{...st.td}}>$12.00</td><td style={{...st.td}}>No tip credit allowed</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New Hampshire</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$3.27</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New Jersey</td><td style={{...st.td}}>$15.49</td><td style={{...st.td}}>$5.62</td><td style={{...st.td}}>Adjusted annually</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New Mexico</td><td style={{...st.td}}>$12.00</td><td style={{...st.td}}>$3.00</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New York</td><td style={{...st.td}}>$16.00</td><td style={{...st.td}}>$10.65</td><td style={{...st.td}}>NYC, LI, Westchester rate</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>North Carolina</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>North Dakota</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$4.86</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Ohio</td><td style={{...st.td}}>$10.65</td><td style={{...st.td}}>$5.35</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Oklahoma</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>Federal rate applies</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Oregon</td><td style={{...st.td}}>$14.70</td><td style={{...st.td}}>$14.70</td><td style={{...st.td}}>No tip credit. Portland metro higher.</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Pennsylvania</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.83</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Rhode Island</td><td style={{...st.td}}>$14.00</td><td style={{...st.td}}>$3.89</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>South Carolina</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>No state minimum, federal applies</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>South Dakota</td><td style={{...st.td}}>$11.20</td><td style={{...st.td}}>$5.60</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Tennessee</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>No state minimum, federal applies</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Texas</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Utah</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Vermont</td><td style={{...st.td}}>$14.01</td><td style={{...st.td}}>$7.01</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Virginia</td><td style={{...st.td}}>$12.41</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Washington</td><td style={{...st.td}}>$16.66</td><td style={{...st.td}}>$16.66</td><td style={{...st.td}}>Highest state minimum. No tip credit.</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Washington DC</td><td style={{...st.td}}>$17.50</td><td style={{...st.td}}>$10.00</td><td style={{...st.td}}>Highest in the nation</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>West Virginia</td><td style={{...st.td}}>$8.75</td><td style={{...st.td}}>$2.62</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Wisconsin</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.33</td><td style={{...st.td}}>Federal rate</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Wyoming</td><td style={{...st.td}}>$7.25</td><td style={{...st.td}}>$2.13</td><td style={{...st.td}}>Federal rate</td></tr>
          </tbody></table></div>
        </div>

        <AdUnit slot="3248634657" />

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/hourly-to-salary-calculator" style={st.calcLink}>hourly to salary calculator</a>
            <a href="/salary-after-tax-calculator" style={st.calcLink}>salary after tax calculator</a>
            <a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a>
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Data</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/data/minimum-wage-livability-by-state" style={st.dataLink}>minimum wage livability by state</a>
            <a href="/data/median-household-income-by-state" style={st.dataLink}>median household income by state</a>
            <a href="/data/cost-of-living-for-singles-by-state" style={st.dataLink}>cost of living for singles by state</a>
          </div>
        </div>

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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"Minimum Wage by State 2026 (All 50 States + Federal)","description":"Current minimum wage rates for all 50 states and federal. Updated for 2026 with tipped wages, scheduled increases, and cost-of-living adjusted rankings.","author":{"@type":"Organization","name":"FreeFinCalc"},"publisher":{"@type":"Organization","name":"FreeFinCalc"},"datePublished":"2026-03-27","dateModified":"2026-03-27","mainEntityOfPage":"https://www.freefincalc.net/minimum-wage-by-state"})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Minimum Wage by State 2026","item":"https://www.freefincalc.net/minimum-wage-by-state"}]})}} />
      <Footer />
    </div>
  )
}
