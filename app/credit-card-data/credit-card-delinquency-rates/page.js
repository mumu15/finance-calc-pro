import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Credit Card Delinquency Rates by State 2026 | FreeFinCalc',
  description: 'Credit card delinquency and default rates for all 50 states. 30-day, 60-day, and 90-day late payment data.',
  alternates: { canonical: 'https://www.freefincalc.net/credit-card-data/credit-card-delinquency-rates' },
  openGraph: { title: 'Credit Card Delinquency Rates by State 2026', description: 'Credit card delinquency and default rates for all 50 states. 30-day, 60-day, and 90-day late payment data.', url: 'https://www.freefincalc.net/credit-card-data/credit-card-delinquency-rates', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What is the national credit card delinquency rate?","a":"The 90+ day credit card delinquency rate is 3.1% in 2026. This has risen from historic lows of 1.4% in 2021 but remains below the 2010 peak of 6.9%."},{"q":"Which state has the highest credit card delinquency?","a":"Mississippi has the highest 90+ day delinquency rate at 5.2%, followed by Louisiana (4.9%) and West Virginia (4.8%)."},{"q":"Which age group has the most credit card delinquencies?","a":"Young adults (18-29) have the highest delinquency rate at 4.8%. Rates decrease with age, with those 70+ having the lowest rate at 1.2%."}]

export default function Page() {
  const st = {
    page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},
    wrap:{maxWidth:1000,margin:'0 auto',padding:'32px 16px 64px'},
    h1:{fontSize:'clamp(24px,4vw,38px)',fontWeight:900,color:'#f1f5f9',margin:'0 0 12px',lineHeight:1.15},
    desc:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 28px'},
    box:{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:24,marginBottom:24},
    h2:{fontSize:20,fontWeight:700,color:'#f1f5f9',margin:'0 0 16px'},
    table:{width:'100%',borderCollapse:'collapse',fontSize:13},
    th:{padding:'10px 12px',textAlign:'left',color:'#ef4444',fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:'2px solid rgba(239,68,68,0.2)'},
    td:{padding:'10px 12px',borderBottom:'1px solid rgba(255,255,255,0.05)',color:'#94a3b8'},
    calcLink:{display:'inline-block',padding:'8px 16px',borderRadius:8,fontSize:13,fontWeight:600,textDecoration:'none',margin:'0 8px 8px 0',background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',color:'#ef4444'},
  }
  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/credit-card-data" style={{color:'#64748b',textDecoration:'none'}}>Credit Card Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Credit Card Delinquency Rates by State 2026</span></nav>
        <h1 style={st.h1}>Credit Card Delinquency Rates by State 2026</h1>
        <p style={st.desc}>Credit card delinquency and default rates for all 50 states. 30-day, 60-day, and 90-day late payment data.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Credit Card Delinquency Rates by State (90+ Days)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Rank</th><th style={st.th}>State</th><th style={st.th}>90+ Day Rate</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1</td><td style={{...st.td}}>Mississippi</td><td style={{...st.td}}>5.2%</td><td style={{...st.td}}>Highest delinquency</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2</td><td style={{...st.td}}>Louisiana</td><td style={{...st.td}}>4.9%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>3</td><td style={{...st.td}}>West Virginia</td><td style={{...st.td}}>4.8%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>4</td><td style={{...st.td}}>Alabama</td><td style={{...st.td}}>4.6%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>5</td><td style={{...st.td}}>Arkansas</td><td style={{...st.td}}>4.5%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>6</td><td style={{...st.td}}>New Mexico</td><td style={{...st.td}}>4.6%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>7</td><td style={{...st.td}}>South Carolina</td><td style={{...st.td}}>4.4%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>8</td><td style={{...st.td}}>Oklahoma</td><td style={{...st.td}}>4.3%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>9</td><td style={{...st.td}}>Tennessee</td><td style={{...st.td}}>4.2%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>10</td><td style={{...st.td}}>Texas</td><td style={{...st.td}}>4.1%</td><td style={{...st.td}}>Large population impact</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>---</td><td style={{...st.td}}>National Average</td><td style={{...st.td}}>3.1%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>41</td><td style={{...st.td}}>Minnesota</td><td style={{...st.td}}>2.1%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>42</td><td style={{...st.td}}>New Hampshire</td><td style={{...st.td}}>2.0%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>43</td><td style={{...st.td}}>Massachusetts</td><td style={{...st.td}}>1.9%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>44</td><td style={{...st.td}}>Hawaii</td><td style={{...st.td}}>1.8%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>45</td><td style={{...st.td}}>Vermont</td><td style={{...st.td}}>1.8%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>46</td><td style={{...st.td}}>South Dakota</td><td style={{...st.td}}>1.7%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>47</td><td style={{...st.td}}>Wisconsin</td><td style={{...st.td}}>1.7%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>48</td><td style={{...st.td}}>Iowa</td><td style={{...st.td}}>1.6%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>49</td><td style={{...st.td}}>North Dakota</td><td style={{...st.td}}>1.5%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>50</td><td style={{...st.td}}>Utah</td><td style={{...st.td}}>1.4%</td><td style={{...st.td}}>Lowest delinquency</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Delinquency Trends (2019-2026)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Year</th><th style={st.th}>90+ Day Rate</th><th style={st.th}>Context</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2019</td><td style={{...st.td}}>2.4%</td><td style={{...st.td}}>Pre-pandemic baseline</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2020</td><td style={{...st.td}}>1.5%</td><td style={{...st.td}}>Stimulus/forbearance</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2021</td><td style={{...st.td}}>1.4%</td><td style={{...st.td}}>Historic low</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2022</td><td style={{...st.td}}>1.8%</td><td style={{...st.td}}>Rising from lows</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2023</td><td style={{...st.td}}>2.5%</td><td style={{...st.td}}>Exceeding pre-pandemic</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2024</td><td style={{...st.td}}>2.8%</td><td style={{...st.td}}>Continued increase</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2025</td><td style={{...st.td}}>3.0%</td><td style={{...st.td}}>Near 10-year high</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2026</td><td style={{...st.td}}>3.1%</td><td style={{...st.td}}>Stabilizing</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Delinquency by Age Group</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Age Group</th><th style={st.th}>90+ Day Rate</th><th style={st.th}>Assessment</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>18-29</td><td style={{...st.td}}>4.8%</td><td style={{...st.td}}>Highest delinquency rate</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>30-39</td><td style={{...st.td}}>3.5%</td><td style={{...st.td}}>Above average</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>40-49</td><td style={{...st.td}}>2.9%</td><td style={{...st.td}}>Near average</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>50-59</td><td style={{...st.td}}>2.4%</td><td style={{...st.td}}>Below average</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>60-69</td><td style={{...st.td}}>1.8%</td><td style={{...st.td}}>Lower risk</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>70+</td><td style={{...st.td}}>1.2%</td><td style={{...st.td}}>Lowest delinquency</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/credit-card-payoff-calculator" style={st.calcLink}>credit card payoff calculator</a>
            <a href="/debt-payoff-calculator" style={st.calcLink}>debt payoff calculator</a>
            <a href="/credit-utilization-calculator" style={st.calcLink}>credit utilization calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}