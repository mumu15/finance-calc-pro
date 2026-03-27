import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PROFESSIONS from '../../data/professions'

export const metadata = {
  title: 'Salary Data by State 2026 - 15 Professions Ranked | FreeFinCalc',
  description: 'Average salary data for 15 professions across all 50 states. Teachers, nurses, engineers, and more ranked by pay.',
  alternates: { canonical: 'https://www.freefincalc.net/salary-data' },
}

export default function SalaryHub() {
  return (
    <>
      <Header />
      <main style={{maxWidth:1000,margin:'0 auto',padding:'48px 16px 64px'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,color:'#fff',margin:'0 0 12px'}}>Salary Data by State</h1>
          <p style={{fontSize:16,color:'#94a3b8'}}>Average salary for 15 professions across all 50 states</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12}}>
          {PROFESSIONS.map(p => (
            <Link key={p.slug} href={'/salary-data/' + p.slug} style={{display:'block',padding:'20px 24px',borderRadius:14,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none'}}>
              <div style={{fontSize:16,fontWeight:700,color:'#e2e8f0',marginBottom:4}}>{p.job}</div>
              <div style={{fontSize:13,color:'#f0c842',fontWeight:700}}>{'Avg: $' + p.baseSalary.toLocaleString() + '/yr'}</div>
              <div style={{fontSize:12,color:'#64748b',marginTop:4}}>{p.desc.substring(0,80)}...</div>
            </Link>))}
        </div>
      </main>
      <Footer />
    </>
  )
}