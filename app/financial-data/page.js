import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AGE_TOPICS from '../../data/ageTopics'

export const metadata = {
  title: 'Financial Data by Age 2026 - Net Worth, Savings, 401k, Debt | FreeFinCalc',
  description: 'Financial benchmarks by age: average net worth, 401k balance, savings, debt, credit score, salary, and more. Are you on track?',
  alternates: { canonical: 'https://www.freefincalc.net/financial-data' },
}

export default function FinDataHub() {
  return (
    <>
      <Header />
      <main style={{maxWidth:1000,margin:'0 auto',padding:'48px 16px 64px'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,color:'#fff',margin:'0 0 12px'}}>Financial Data by Age</h1>
          <p style={{fontSize:16,color:'#94a3b8'}}>Average net worth, savings, 401k, debt, and more by age group</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12}}>
          {AGE_TOPICS.map(t => (
            <Link key={t.slug} href={'/financial-data/' + t.slug} style={{display:'block',padding:'20px 24px',borderRadius:14,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none'}}>
              <div style={{fontSize:16,fontWeight:700,color:'#e2e8f0',marginBottom:4}}>{t.title.split('2026')[0].split('(')[0].trim()}</div>
              <div style={{fontSize:12,color:'#64748b',marginTop:4}}>{t.desc.substring(0,100)}...</div>
              <div style={{fontSize:11,color:'#f0c842',marginTop:6,fontWeight:700}}>{'Est. search: ' + t.searchVol}</div>
            </Link>))}
        </div>
      </main>
      <Footer />
    </>
  )
}