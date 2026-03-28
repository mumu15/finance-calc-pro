import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Credit Card Debt by State 2026 (All 50 States Ranked) | FreeFinCalc',
  description: 'Credit card debt in every state ranked from highest to lowest. Average balances, delinquency rates, and debt-to-income ratios.',
  alternates: { canonical: 'https://www.freefincalc.net/credit-card-data/average-credit-card-debt-by-state' },
  openGraph: { title: 'Average Credit Card Debt by State 2026 (All 50 States Ranked)', description: 'Credit card debt in every state ranked from highest to lowest. Average balances, delinquency rates, and debt-to-income ratios.', url: 'https://www.freefincalc.net/credit-card-data/average-credit-card-debt-by-state', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What is the average credit card debt in America?","a":"The average American cardholder has $6,501 in credit card debt in 2026. Gen X carries the most at $8,740, while Gen Z averages $3,120."},{"q":"Which state has the most credit card debt?","a":"Alaska has the highest average credit card debt at $8,450 per cardholder. Connecticut ($7,980) and New Jersey ($7,850) follow."},{"q":"Which state has the least credit card debt?","a":"North Dakota has the lowest average at $4,320, followed by Wisconsin ($4,480) and Iowa ($4,550)."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/credit-card-data" style={{color:'#64748b',textDecoration:'none'}}>Credit Card Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Average Credit Card Debt by State 2026</span></nav>
        <h1 style={st.h1}>Average Credit Card Debt by State 2026 (All 50 States Ranked)</h1>
        <p style={st.desc}>Credit card debt in every state ranked from highest to lowest. Average balances, delinquency rates, and debt-to-income ratios.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Average Credit Card Balance by State</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Rank</th><th style={st.th}>State</th><th style={st.th}>Avg Balance</th><th style={st.th}>Delinquency Rate</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1</td><td style={{...st.td}}>Alaska</td><td style={{...st.td}}>$8,450</td><td style={{...st.td}}>4.2%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2</td><td style={{...st.td}}>Connecticut</td><td style={{...st.td}}>$7,980</td><td style={{...st.td}}>3.1%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>3</td><td style={{...st.td}}>New Jersey</td><td style={{...st.td}}>$7,850</td><td style={{...st.td}}>3.3%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>4</td><td style={{...st.td}}>Virginia</td><td style={{...st.td}}>$7,720</td><td style={{...st.td}}>2.9%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>5</td><td style={{...st.td}}>Maryland</td><td style={{...st.td}}>$7,680</td><td style={{...st.td}}>3.0%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>6</td><td style={{...st.td}}>Colorado</td><td style={{...st.td}}>$7,540</td><td style={{...st.td}}>2.8%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>7</td><td style={{...st.td}}>California</td><td style={{...st.td}}>$7,480</td><td style={{...st.td}}>3.5%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>8</td><td style={{...st.td}}>New York</td><td style={{...st.td}}>$7,350</td><td style={{...st.td}}>3.4%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>9</td><td style={{...st.td}}>Washington</td><td style={{...st.td}}>$7,280</td><td style={{...st.td}}>2.7%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>10</td><td style={{...st.td}}>Hawaii</td><td style={{...st.td}}>$7,190</td><td style={{...st.td}}>3.8%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>---</td><td style={{...st.td}}>National Average</td><td style={{...st.td}}>$6,501</td><td style={{...st.td}}>3.1%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>41</td><td style={{...st.td}}>Arkansas</td><td style={{...st.td}}>$5,120</td><td style={{...st.td}}>4.5%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>42</td><td style={{...st.td}}>West Virginia</td><td style={{...st.td}}>$5,050</td><td style={{...st.td}}>4.8%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>43</td><td style={{...st.td}}>Kentucky</td><td style={{...st.td}}>$4,980</td><td style={{...st.td}}>4.3%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>44</td><td style={{...st.td}}>Mississippi</td><td style={{...st.td}}>$4,850</td><td style={{...st.td}}>5.2%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>45</td><td style={{...st.td}}>Maine</td><td style={{...st.td}}>$4,790</td><td style={{...st.td}}>3.0%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>46</td><td style={{...st.td}}>Vermont</td><td style={{...st.td}}>$4,680</td><td style={{...st.td}}>2.5%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>47</td><td style={{...st.td}}>New Mexico</td><td style={{...st.td}}>$4,620</td><td style={{...st.td}}>4.6%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>48</td><td style={{...st.td}}>Iowa</td><td style={{...st.td}}>$4,550</td><td style={{...st.td}}>2.8%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>49</td><td style={{...st.td}}>Wisconsin</td><td style={{...st.td}}>$4,480</td><td style={{...st.td}}>2.6%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>50</td><td style={{...st.td}}>North Dakota</td><td style={{...st.td}}>$4,320</td><td style={{...st.td}}>2.4%</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Credit Card Debt by Generation</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Generation</th><th style={st.th}>Avg Balance</th><th style={st.th}>Avg Cards</th><th style={st.th}>Trend</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Gen Z (18-27)</td><td style={{...st.td}}>$3,120</td><td style={{...st.td}}>2 cards</td><td style={{...st.td}}>Rising fast</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Millennials (28-43)</td><td style={{...st.td}}>$6,520</td><td style={{...st.td}}>3.5 cards</td><td style={{...st.td}}>Highest growth rate</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Gen X (44-59)</td><td style={{...st.td}}>$8,740</td><td style={{...st.td}}>4 cards</td><td style={{...st.td}}>Highest total debt</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Baby Boomers (60-78)</td><td style={{...st.td}}>$6,130</td><td style={{...st.td}}>3.5 cards</td><td style={{...st.td}}>Declining</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Silent (79+)</td><td style={{...st.td}}>$3,820</td><td style={{...st.td}}>2.5 cards</td><td style={{...st.td}}>Low utilization</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/credit-card-payoff-calculator" style={st.calcLink}>credit card payoff calculator</a>
            <a href="/debt-payoff-calculator" style={st.calcLink}>debt payoff calculator</a>
            <a href="/debt-snowball-calculator" style={st.calcLink}>debt snowball calculator</a>
            <a href="/debt-avalanche-calculator" style={st.calcLink}>debt avalanche calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}