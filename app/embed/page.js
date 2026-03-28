import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Free Embeddable Calculator Widgets | FreeFinCalc',
  description: 'Add free financial calculators to your website. Mortgage, compound interest, retirement, loan payoff, tip, and BMI widgets. One line of code. Free forever.',
  alternates: { canonical: 'https://www.freefincalc.net/embed' },
}

const widgets = [{"slug":"mortgage","title":"Mortgage Calculator","desc":"Free Mortgage Calculator Widget"},{"slug":"compound-interest","title":"Compound Interest Calculator","desc":"Free Compound Interest Calculator Widget"},{"slug":"loan-payoff","title":"Loan Payoff Calculator","desc":"Free Loan Payoff Calculator Widget"},{"slug":"retirement","title":"Retirement Calculator","desc":"Free Retirement Calculator Widget"},{"slug":"bmi","title":"BMI Calculator","desc":"Free BMI Calculator Widget"},{"slug":"tip","title":"Tip Calculator","desc":"Free Tip Calculator Widget"}];

export default function EmbedHub() {
  return (
    <>
      <Header />
      <main style={{maxWidth:900,margin:'0 auto',padding:'48px 16px 64px'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,color:'#fff',margin:'0 0 12px'}}>Free Embeddable Widgets</h1>
          <p style={{fontSize:16,color:'#94a3b8',margin:'0 0 8px'}}>Add free financial calculators to your website</p>
          <p style={{fontSize:13,color:'#64748b'}}>One line of code. Free forever. No API key needed.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:16}}>
          {widgets.map(w => (
            <div key={w.slug} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:24}}>
              <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:8}}>{w.title}</h2>
              <p style={{fontSize:13,color:'#64748b',marginBottom:16}}>{w.desc}</p>
              <a href={'/embed/' + w.slug} target="_blank" style={{display:'inline-block',padding:'8px 16px',borderRadius:8,background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',color:'#f0c842',fontSize:13,fontWeight:700,textDecoration:'none',marginBottom:12}}>Preview Widget</a>
              <div style={{marginTop:8}}>
                <p style={{fontSize:11,color:'#64748b',marginBottom:4}}>Embed code:</p>
                <code style={{display:'block',padding:12,borderRadius:8,background:'#1a1d28',border:'1px solid rgba(255,255,255,0.08)',color:'#10b981',fontSize:11,wordBreak:'break-all',lineHeight:1.6}}>{'<iframe src="https://www.freefincalc.net/embed/' + w.slug + '" width="400" height="500" frameborder="0" style="border-radius:16px"></iframe>'}</code>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:48,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:32}}>
          <h2 style={{fontSize:22,fontWeight:800,color:'#f1f5f9',marginBottom:12}}>Why Embed Our Widgets?</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:16}}>
            <div><div style={{fontSize:14,fontWeight:700,color:'#f0c842',marginBottom:4}}>100% Free</div><div style={{fontSize:13,color:'#94a3b8'}}>No API key, no account, no costs. Ever.</div></div>
            <div><div style={{fontSize:14,fontWeight:700,color:'#10b981',marginBottom:4}}>Responsive</div><div style={{fontSize:13,color:'#94a3b8'}}>Works on mobile, tablet, and desktop.</div></div>
            <div><div style={{fontSize:14,fontWeight:700,color:'#3b82f6',marginBottom:4}}>Fast</div><div style={{fontSize:13,color:'#94a3b8'}}>Loads instantly. No external scripts.</div></div>
            <div><div style={{fontSize:14,fontWeight:700,color:'#8b5cf6',marginBottom:4}}>Dark Theme</div><div style={{fontSize:13,color:'#94a3b8'}}>Sleek dark design that fits any site.</div></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}