'use client'
import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import cities from '../../../data/cities'

// Unsplash source URLs — free to use commercially
function cityImageUrl(unsplashId) {
  return `https://images.unsplash.com/${unsplashId}?auto=format&fit=crop&w=1200&q=80`
}

function fmt(n) {
  return Math.round(n).toLocaleString('en-US')
}

function calcMonthly(price, downPct, rate, years) {
  const loan = price * (1 - downPct / 100)
  const mo = rate / 100 / 12
  const n = years * 12
  if (mo === 0) return loan / n
  return loan * mo * Math.pow(1 + mo, n) / (Math.pow(1 + mo, n) - 1)
}

export default function CityMortgagePage() {
  const { city: citySlug } = useParams()
  const city = cities.find(c => c.slug === citySlug)

  const [homePrice, setHomePrice] = useState(city?.medianPrice || 400000)
  const [downPct, setDownPct]     = useState(city?.downPct || 20)
  const [rate, setRate]           = useState(city?.rate || 7.0)
  const [years, setYears]         = useState(30)

  const results = useMemo(() => {
    const down       = homePrice * downPct / 100
    const loan       = homePrice - down
    const pi         = calcMonthly(homePrice, downPct, rate, years)
    const taxMo      = (homePrice * (city?.tax || 1.1) / 100) / 12
    const insMo      = (city?.insurance || 1200) / 12
    const total      = pi + taxMo + insMo
    const totalPaid  = pi * years * 12
    const totalInt   = totalPaid - loan
    return { down, loan, pi, taxMo, insMo, total, totalInt, totalPaid }
  }, [homePrice, downPct, rate, years, city])

  if (!city) {
    return (
      <div style={{minHeight:'100vh',background:'#0f1117',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>
        <p>City not found.</p>
      </div>
    )
  }

  const styles = {
    page:      { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' },
    hero:      { position: 'relative', height: 340, overflow: 'hidden' },
    heroImg:   { width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' },
    heroText:  { position: 'absolute', bottom: 32, left: 0, right: 0, textAlign: 'center', padding: '0 20px' },
    heroH1:    { fontSize: 'clamp(24px,5vw,42px)', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 },
    heroSub:   { color: '#f0c842', fontSize: 16, marginTop: 8, fontWeight: 500 },
    wrap:      { maxWidth: 900, margin: '0 auto', padding: '32px 16px' },
    grid:      { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 },
    card:      { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 },
    label:     { display: 'block', fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 },
    valBig:    { fontSize: 28, fontWeight: 800, color: '#f0c842' },
    valSub:    { fontSize: 13, color: '#64748b', marginTop: 4 },
    calcCard:  { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28, marginBottom: 32 },
    h2:        { fontSize: 20, fontWeight: 700, color: '#f0c842', marginBottom: 20, marginTop: 0 },
    inputRow:  { marginBottom: 20 },
    inputLabel:{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#94a3b8', marginBottom: 8 },
    inputVal:  { color: '#f0c842', fontWeight: 700 },
    slider:    { width: '100%', accentColor: '#f0c842', cursor: 'pointer' },
    resultBox: { background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.25)', borderRadius: 16, padding: 28, marginBottom: 32 },
    resultRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    resultLbl: { color: '#94a3b8', fontSize: 14 },
    resultVal: { color: '#e2e8f0', fontWeight: 700, fontSize: 15 },
    totalRow:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0 0' },
    totalLbl:  { color: '#f0c842', fontWeight: 700, fontSize: 16 },
    totalVal:  { color: '#f0c842', fontWeight: 800, fontSize: 22 },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 },
    statCard:  { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20, textAlign: 'center' },
    statNum:   { fontSize: 22, fontWeight: 800, color: '#f0c842' },
    statLbl:   { fontSize: 12, color: '#64748b', marginTop: 4 },
    article:   { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 32, marginBottom: 32 },
    artH2:     { fontSize: 22, fontWeight: 700, color: '#f0c842', marginBottom: 16, marginTop: 0 },
    artH3:     { fontSize: 17, fontWeight: 700, color: '#e2e8f0', marginBottom: 10, marginTop: 24 },
    artP:      { color: '#94a3b8', lineHeight: 1.8, marginBottom: 16, fontSize: 15 },
    breadcrumb:{ display:'flex', gap:8, alignItems:'center', fontSize:13, color:'#475569', marginBottom:24 },
    breadLink: { color:'#f0c842', textDecoration:'none' },
    tag:       { display:'inline-block', background:'rgba(240,200,66,0.1)', border:'1px solid rgba(240,200,66,0.2)', color:'#f0c842', fontSize:12, padding:'3px 10px', borderRadius:20, marginRight:8, marginBottom:8 },
  }

  const avgRate2026    = city.rate
  const downAmt        = fmt(homePrice * downPct / 100)
  const loanAmt        = fmt(homePrice * (1 - downPct / 100))
  const totalIntFmt    = fmt(results.totalInt)
  const monthlyFmt     = fmt(results.total)
  const priceFormatted = fmt(homePrice)

  return (
    <div style={styles.page}>
      <Header />

      {/* Hero image */}
      <div style={styles.hero}>
        <img
          src={cityImageUrl(city.unsplashId)}
          alt={`${city.name} skyline — mortgage calculator`}
          style={styles.heroImg}
          loading="eager"
        />
        <div style={styles.heroText}>
          <h1 style={styles.heroH1}>Mortgage Calculator {city.name}, {city.state}</h1>
          <p style={styles.heroSub}>2026 Local Rates & Median Home Prices — Free, Instant, Accurate</p>
        </div>
      </div>

      <div style={styles.wrap}>
        {/* Breadcrumb */}
        <div style={styles.breadcrumb}>
          <a href="/" style={styles.breadLink}>Home</a>
          <span>›</span>
          <a href="/mortgage-calculator" style={styles.breadLink}>Mortgage Calculator</a>
          <span>›</span>
          <span>{city.name}</span>
        </div>

        {/* Quick stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNum}>${fmt(city.medianPrice)}</div>
            <div style={styles.statLbl}>Median Home Price</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNum}>{city.rate}%</div>
            <div style={styles.statLbl}>Avg Mortgage Rate</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNum}>{city.tax}%</div>
            <div style={styles.statLbl}>Property Tax Rate</div>
          </div>
        </div>

        {/* Calculator */}
        <div style={styles.calcCard}>
          <h2 style={styles.h2}>Adjust Your Numbers</h2>

          <div style={styles.inputRow}>
            <div style={styles.inputLabel}>
              <span>Home Price</span>
              <span style={styles.inputVal}>${fmt(homePrice)}</span>
            </div>
            <input type="range" min={50000} max={3000000} step={5000}
              value={homePrice} onChange={e => setHomePrice(+e.target.value)}
              style={styles.slider} />
          </div>

          <div style={styles.inputRow}>
            <div style={styles.inputLabel}>
              <span>Down Payment</span>
              <span style={styles.inputVal}>{downPct}% (${fmt(homePrice * downPct / 100)})</span>
            </div>
            <input type="range" min={3} max={50} step={1}
              value={downPct} onChange={e => setDownPct(+e.target.value)}
              style={styles.slider} />
          </div>

          <div style={styles.inputRow}>
            <div style={styles.inputLabel}>
              <span>Interest Rate</span>
              <span style={styles.inputVal}>{rate}%</span>
            </div>
            <input type="range" min={3} max={12} step={0.1}
              value={rate} onChange={e => setRate(+e.target.value)}
              style={styles.slider} />
          </div>

          <div style={styles.inputRow}>
            <div style={styles.inputLabel}>
              <span>Loan Term</span>
              <span style={styles.inputVal}>{years} years</span>
            </div>
            <input type="range" min={10} max={30} step={5}
              value={years} onChange={e => setYears(+e.target.value)}
              style={styles.slider} />
          </div>
        </div>

        {/* Results */}
        <div style={styles.resultBox}>
          <div style={styles.resultRow}>
            <span style={styles.resultLbl}>Principal & Interest</span>
            <span style={styles.resultVal}>${fmt(results.pi)}/mo</span>
          </div>
          <div style={styles.resultRow}>
            <span style={styles.resultLbl}>Property Tax ({city.tax}%)</span>
            <span style={styles.resultVal}>${fmt(results.taxMo)}/mo</span>
          </div>
          <div style={styles.resultRow}>
            <span style={styles.resultLbl}>Home Insurance (est.)</span>
            <span style={styles.resultVal}>${fmt(results.insMo)}/mo</span>
          </div>
          <div style={styles.totalRow}>
            <span style={styles.totalLbl}>Total Monthly Payment</span>
            <span style={styles.totalVal}>${fmt(results.total)}/mo</span>
          </div>
        </div>

        {/* Rich content article */}
        <div style={styles.article}>
          <h2 style={styles.artH2}>Buying a Home in {city.name}, {city.stateF} in 2026</h2>

          <div>
            <span style={styles.tag}>{city.name} Real Estate</span>
            <span style={styles.tag}>2026 Mortgage Rates</span>
            <span style={styles.tag}>{city.stateF} Home Buying</span>
          </div>

          <p style={styles.artP}>
            {city.name} is {city.desc}. If you are planning to buy a home here in 2026,
            understanding the true monthly cost before you make an offer is essential.
            With a median home price of <strong style={{color:'#e2e8f0'}}>${priceFormatted}</strong> and
            current {city.name} mortgage rates averaging <strong style={{color:'#e2e8f0'}}>{avgRate2026}%</strong>,
            a typical buyer putting {downPct}% down would take out a loan of
            <strong style={{color:'#e2e8f0'}}> ${loanAmt}</strong> and pay approximately
            <strong style={{color:'#f0c842'}}> ${monthlyFmt} per month</strong> including
            principal, interest, property taxes, and insurance.
          </p>

          <h3 style={styles.artH3}>Property Taxes in {city.name}</h3>
          <p style={styles.artP}>
            {city.stateF} has a property tax rate of approximately <strong style={{color:'#e2e8f0'}}>{city.tax}%</strong>.
            On a ${priceFormatted} home in {city.name}, that works out to roughly
            <strong style={{color:'#e2e8f0'}}> ${fmt(homePrice * city.tax / 100)} per year</strong> or
            <strong style={{color:'#e2e8f0'}}> ${fmt(homePrice * city.tax / 100 / 12)} per month</strong> added to
            your mortgage payment. Property taxes in {city.name} are {city.tax > 1.5 ? 'above' : city.tax < 0.8 ? 'well below' : 'near'} the
            national average of 1.1%, so {city.tax > 1.5 ? 'budget carefully for this significant expense' : city.tax < 0.8 ? 'this is a genuine financial advantage for buyers here' : 'this should not be a major surprise in your budget'}.
          </p>

          <h3 style={styles.artH3}>How Much Home Can You Afford in {city.name}?</h3>
          <p style={styles.artP}>
            The standard rule of thumb is that your total monthly housing payment should not
            exceed 28% of your gross monthly income. With a total payment of ${monthlyFmt}/mo
            on a median {city.name} home, you would need a gross household income of at least
            <strong style={{color:'#e2e8f0'}}> ${fmt(results.total / 0.28 * 12)} per year</strong> to
            stay within that guideline. Many buyers in {city.name} stretch to 30-35% of income,
            particularly first-time buyers who benefit from lower down payment programs.
          </p>

          <h3 style={styles.artH3}>Down Payment Options for {city.name} Buyers</h3>
          <p style={styles.artP}>
            A 20% down payment on the median {city.name} home requires
            <strong style={{color:'#e2e8f0'}}> ${fmt(city.medianPrice * 0.2)}</strong> upfront and
            eliminates the need for private mortgage insurance (PMI). If saving that much is
            a challenge, FHA loans allow as little as 3.5% down
            (${fmt(city.medianPrice * 0.035)} on the median {city.name} home), while
            conventional loans can go as low as 3% for qualifying first-time buyers.
            VA loans offer 0% down for eligible veterans — a significant advantage in any
            market, especially {city.name}.
          </p>

          <h3 style={styles.artH3}>Total Interest Over the Life of Your {city.name} Mortgage</h3>
          <p style={styles.artP}>
            On a 30-year mortgage for the median {city.name} home at {avgRate2026}%, you would
            pay a total of <strong style={{color:'#e2e8f0'}}>${totalIntFmt} in interest</strong> over
            the life of the loan — on top of the original loan amount of ${loanAmt}.
            That is why many {city.name} buyers consider a 15-year mortgage or make
            extra principal payments to reduce this cost significantly. Use the sliders
            above to see how a lower rate or larger down payment changes your total interest.
          </p>

          <h3 style={styles.artH3}>Tips for Getting the Best Mortgage Rate in {city.name}</h3>
          <p style={styles.artP}>
            Mortgage rates in {city.name} vary by lender — sometimes by 0.5% or more for
            the same borrower profile. Getting at least 3 quotes from different lenders
            before committing can save tens of thousands of dollars over a 30-year loan.
            Credit score matters enormously: borrowers with 760+ typically qualify for rates
            0.5-1% lower than those with scores in the 620-640 range. In {city.name}'s
            {city.medianPrice > 500000 ? ' high-value' : ' active'} market, even a small
            rate difference compounds into a very large sum over time.
          </p>
        </div>

        {/* Related calculators */}
        <div style={styles.calcCard}>
          <h2 style={styles.h2}>Related Calculators</h2>
          <div style={{display:'flex', flexWrap:'wrap', gap:12}}>
            {[
              {href:'/mortgage-calculator', label:'Mortgage Calculator'},
              {href:'/refinance-calculator', label:'Refinance Calculator'},
              {href:'/down-payment-calculator', label:'Down Payment Calculator'},
              {href:'/home-equity-calculator', label:'Home Equity Calculator'},
              {href:'/property-tax-calculator', label:'Property Tax Calculator'},
              {href:'/rent-vs-buy-calculator', label:'Rent vs Buy Calculator'},
            ].map(({href, label}) => (
              <a key={href} href={href} style={{
                display:'inline-block',
                padding:'8px 16px',
                background:'rgba(240,200,66,0.08)',
                border:'1px solid rgba(240,200,66,0.2)',
                borderRadius:8,
                color:'#f0c842',
                textDecoration:'none',
                fontSize:13,
                fontWeight:600,
              }}>{label}</a>
            ))}
          </div>
        </div>

        {/* Other cities */}
        <div style={styles.calcCard}>
          <h2 style={styles.h2}>Mortgage Calculator by City</h2>
          <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
            {cities.filter(c => c.slug !== city.slug).slice(0, 20).map(c => (
              <a key={c.slug} href={`/mortgage-calculator/${c.slug}`} style={{
                display:'inline-block',
                padding:'6px 14px',
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:8,
                color:'#94a3b8',
                textDecoration:'none',
                fontSize:13,
                transition:'all 0.15s',
              }}>
                {c.name}, {c.state}
              </a>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
