import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Mortgage Data & Statistics 2026 | FreeFinCalc',
  description: 'Real-world mortgage data: rates, home prices, down payments, closing costs, foreclosures, and market statistics.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-data' },
}

const pages = [{"slug":"average-mortgage-rates-by-year","title":"Average Mortgage Rates by Year: Historical Data 1970-2026","desc":"Historical 30-year fixed mortgage rates from 1970 to 2026. Annual averages, trends, and how rates af..."},{"slug":"down-payment-statistics","title":"Down Payment Statistics 2026: Average Down Payment by State & Age","desc":"Real data on how much Americans put down on homes. Average down payment by state, age group, buyer t..."},{"slug":"foreclosure-rates-by-state","title":"Foreclosure Rates by State 2026 (All 50 States Ranked)","desc":"Current foreclosure rates for all 50 states. Foreclosure filings, rates per household, and year-over..."},{"slug":"housing-market-statistics","title":"Housing Market Statistics 2026: Prices, Sales, Inventory & Trends","desc":"Comprehensive 2026 housing market data. Median prices, sales volume, inventory levels, days on marke..."},{"slug":"average-closing-costs-by-state","title":"Average Closing Costs by State 2026 (All 50 States Ranked)","desc":"How much are closing costs in your state? All 50 states ranked by average closing costs with and wit..."},{"slug":"mortgage-debt-statistics","title":"Mortgage Debt Statistics 2026: How Much Americans Owe","desc":"Total US mortgage debt, average balances by age, underwater mortgages, and home equity data. Complet..."},{"slug":"average-home-price-by-year","title":"Average Home Price by Year in US (2000-2026 Historical Data)","desc":"US median home prices from 2000 to 2026. Year-over-year changes, cumulative appreciation, and inflat..."},{"slug":"rent-vs-buy-statistics","title":"Rent vs Buy Statistics 2026: Which Is Cheaper in Your State?","desc":"Real data comparing renting vs buying in all 50 states. Monthly costs, breakeven timelines, and when..."},{"slug":"mortgage-approval-rates-by-credit-score","title":"Mortgage Approval Rates by Credit Score 2026 (Real Data)","desc":"What credit score do you need for a mortgage? Approval rates, interest rates, and loan options by cr..."},{"slug":"average-home-insurance-cost-by-state","title":"Average Home Insurance Cost by State 2026 (All 50 States)","desc":"Homeowners insurance rates for all 50 states. Average annual premiums, factors that affect cost, and..."}];

export default function MortgageDataHub() {
  return (
    <>
      <Header />
      <main style={{maxWidth:1000,margin:'0 auto',padding:'48px 16px 64px'}}>
        <h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,color:'#fff',margin:'0 0 12px',textAlign:'center'}}>Mortgage Data & Statistics</h1>
        <p style={{fontSize:16,color:'#94a3b8',textAlign:'center',margin:'0 0 40px'}}>Real-world mortgage and housing data updated for 2026</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12}}>
          {pages.map(p => (
            <Link key={p.slug} href={'/mortgage-data/' + p.slug} style={{display:'block',padding:'20px 24px',borderRadius:14,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none'}}>
              <div style={{fontSize:15,fontWeight:700,color:'#e2e8f0',marginBottom:6}}>{p.title.split('(')[0].split(':')[0].trim()}</div>
              <div style={{fontSize:12,color:'#64748b'}}>{p.desc}</div>
            </Link>))}
        </div>
      </main>
      <Footer />
    </>
  )
}