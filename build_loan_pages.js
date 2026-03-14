/**
 * Batch 3: Personal Loan by Purpose — 50 pages
 * Batch 4: Student Loan by Major — 50 pages
 * + Sitemap update for all new pages
 * node build_loan_pages.js
 */
const fs = require('fs')
const path = require('path')

fs.mkdirSync('data', { recursive: true })

// ── PERSONAL LOAN DATA ────────────────────────────────────────────────────
const personalLoanData = `const loanPurposes = [
  { slug:'debt-consolidation',    name:'Debt Consolidation',      avg:15000, rate:11.5, term:48, desc:'combining multiple debts into one lower-rate personal loan' },
  { slug:'home-improvement',      name:'Home Improvement',        avg:25000, rate:10.5, term:60, desc:'funding renovations, repairs, or upgrades to your home' },
  { slug:'medical-bills',         name:'Medical Bills',           avg:8000,  rate:12.5, term:36, desc:'covering unexpected medical or dental expenses' },
  { slug:'wedding',               name:'Wedding',                 avg:18000, rate:11.0, term:48, desc:'financing your dream wedding without emptying savings' },
  { slug:'vacation',              name:'Vacation',                avg:5000,  rate:13.0, term:24, desc:'funding a dream vacation or holiday travel' },
  { slug:'car-repair',            name:'Car Repair',              avg:3500,  rate:13.5, term:24, desc:'covering unexpected vehicle repair costs' },
  { slug:'moving-expenses',       name:'Moving Expenses',         avg:4000,  rate:13.0, term:24, desc:'financing a relocation to a new city or home' },
  { slug:'emergency-fund',        name:'Emergency Expenses',      avg:5000,  rate:14.0, term:24, desc:'covering unexpected financial emergencies' },
  { slug:'small-business',        name:'Small Business',          avg:20000, rate:10.0, term:60, desc:'starting or expanding a small business venture' },
  { slug:'solar-panels',          name:'Solar Panels',            avg:22000, rate:9.5,  term:84, desc:'financing solar panel installation for energy savings' },
  { slug:'boat',                  name:'Boat Purchase',           avg:15000, rate:10.5, term:60, desc:'buying a recreational boat or watercraft' },
  { slug:'rv',                    name:'RV Purchase',             avg:30000, rate:9.5,  term:84, desc:'purchasing a recreational vehicle for travel' },
  { slug:'adoption',              name:'Adoption Expenses',       avg:30000, rate:10.0, term:60, desc:'covering legal and agency fees for adopting a child' },
  { slug:'fertility-treatment',   name:'Fertility Treatment',     avg:20000, rate:11.0, term:48, desc:'financing IVF or other fertility treatments' },
  { slug:'funeral-expenses',      name:'Funeral Expenses',        avg:9000,  rate:13.5, term:36, desc:'covering unexpected funeral and burial costs' },
  { slug:'education',             name:'Education & Courses',     avg:10000, rate:10.5, term:36, desc:'funding education, certifications, or skill development' },
  { slug:'credit-card-payoff',    name:'Credit Card Payoff',      avg:12000, rate:10.5, term:36, desc:'paying off high-interest credit card debt' },
  { slug:'home-appliances',       name:'Home Appliances',         avg:5000,  rate:13.0, term:24, desc:'replacing or upgrading major home appliances' },
  { slug:'pool',                  name:'Swimming Pool',           avg:35000, rate:9.5,  term:84, desc:'installing a backyard swimming pool' },
  { slug:'pet-expenses',          name:'Pet Medical Expenses',    avg:4000,  rate:14.0, term:24, desc:'covering veterinary bills or pet emergency costs' },
  { slug:'taxes',                 name:'Tax Payment',             avg:8000,  rate:12.5, term:36, desc:'paying an unexpected tax bill to the IRS' },
  { slug:'computer-equipment',    name:'Computer & Electronics',  avg:3000,  rate:13.5, term:24, desc:'purchasing computers, phones, or other electronics' },
  { slug:'disability-expenses',   name:'Disability Expenses',     avg:10000, rate:12.0, term:36, desc:'covering costs related to disability or accessibility needs' },
  { slug:'legal-fees',            name:'Legal Fees',              avg:8000,  rate:12.5, term:36, desc:'covering attorney fees and legal expenses' },
  { slug:'cosmetic-surgery',      name:'Cosmetic Surgery',        avg:12000, rate:11.5, term:48, desc:'financing elective cosmetic or plastic surgery procedures' },
  { slug:'land-purchase',         name:'Land Purchase',           avg:40000, rate:9.0,  term:84, desc:'buying land for building, investment, or recreation' },
  { slug:'motorcycle',            name:'Motorcycle Purchase',     avg:10000, rate:10.0, term:48, desc:'financing a motorcycle or powersport vehicle' },
  { slug:'kitchen-remodel',       name:'Kitchen Remodel',         avg:30000, rate:9.5,  term:84, desc:'renovating your kitchen for function and resale value' },
  { slug:'bathroom-remodel',      name:'Bathroom Remodel',        avg:15000, rate:10.0, term:60, desc:'upgrading or renovating your bathroom' },
  { slug:'roof-repair',           name:'Roof Repair',             avg:12000, rate:10.5, term:60, desc:'repairing or replacing a damaged or aging roof' },
  { slug:'windows-doors',         name:'Windows & Doors',         avg:10000, rate:10.5, term:48, desc:'replacing windows and doors for energy efficiency' },
  { slug:'hvac',                  name:'HVAC System',             avg:8000,  rate:10.0, term:48, desc:'installing or replacing a heating and cooling system' },
  { slug:'floor-renovation',      name:'Floor Renovation',        avg:12000, rate:10.0, term:48, desc:'replacing or refinishing floors throughout your home' },
  { slug:'engagement-ring',       name:'Engagement Ring',         avg:6000,  rate:12.0, term:36, desc:'purchasing the perfect engagement ring for your proposal' },
  { slug:'honeymoon',             name:'Honeymoon',               avg:6500,  rate:12.5, term:36, desc:'funding your dream honeymoon trip abroad or locally' },
  { slug:'landscaping',           name:'Landscaping',             avg:8000,  rate:11.0, term:48, desc:'improving curb appeal with professional landscaping' },
  { slug:'vehicle-down-payment',  name:'Vehicle Down Payment',    avg:5000,  rate:12.5, term:36, desc:'funding the down payment on a new or used vehicle' },
  { slug:'garage-door',           name:'Garage Door',             avg:3500,  rate:13.0, term:24, desc:'replacing or installing a new garage door' },
  { slug:'basement-renovation',   name:'Basement Renovation',     avg:20000, rate:10.0, term:60, desc:'finishing or renovating a basement for extra living space' },
  { slug:'deck-patio',            name:'Deck or Patio',           avg:12000, rate:10.5, term:48, desc:'adding or improving outdoor living with a deck or patio' },
  { slug:'fence',                 name:'Fence Installation',      avg:5000,  rate:12.5, term:36, desc:'installing a new fence for privacy or security' },
  { slug:'security-system',       name:'Security System',         avg:4000,  rate:12.5, term:36, desc:'installing a home security or smart home system' },
  { slug:'music-equipment',       name:'Music Equipment',         avg:5000,  rate:13.0, term:36, desc:'purchasing instruments or audio recording equipment' },
  { slug:'travel-adventure',      name:'Adventure Travel',        avg:8000,  rate:12.5, term:36, desc:'funding once-in-a-lifetime adventure travel or safaris' },
  { slug:'nursery',               name:'Baby Nursery',            avg:5000,  rate:12.5, term:36, desc:'furnishing and equipping a nursery for a new baby' },
  { slug:'first-car',             name:'First Car',               avg:18000, rate:14.0, term:60, desc:'purchasing your first vehicle with limited credit history' },
  { slug:'horse',                 name:'Horse Purchase',          avg:15000, rate:11.0, term:60, desc:'buying a horse for equestrian sport or recreation' },
  { slug:'generator',             name:'Home Generator',          avg:6000,  rate:11.5, term:48, desc:'installing a whole-home or portable backup generator' },
  { slug:'storage-unit',          name:'Storage Facility',        avg:8000,  rate:12.5, term:48, desc:'building or purchasing a private storage structure' },
  { slug:'gym-equipment',         name:'Home Gym Equipment',      avg:5000,  rate:13.0, term:36, desc:'outfitting a home gym with quality fitness equipment' },
]
module.exports = loanPurposes
`
fs.writeFileSync('data/loanPurposes.js', personalLoanData, 'utf8')
console.log('✅ data/loanPurposes.js — 50 purposes')

// ── BUILD PERSONAL LOAN PAGES ─────────────────────────────────────────────
const plDir = path.join('app', 'personal-loan-calculator', 'purpose', '[purpose]')
fs.mkdirSync(plDir, { recursive: true })

fs.writeFileSync(path.join(plDir, 'layout.js'), `import purposes from '../../../../data/loanPurposes'
export async function generateMetadata({ params }) {
  const p = purposes.find(x => x.slug === params.purpose)
  if (!p) return { title: 'Personal Loan Calculator' }
  const mo = p.rate / 100 / 12
  const pmt = Math.round(p.avg * mo / (1 - Math.pow(1 + mo, -p.term)))
  return {
    title: \`Personal Loan for \${p.name} 2026 — Calculator & Rates\`,
    description: \`Calculate your personal loan for \${p.name.toLowerCase()}. Avg amount \$\${p.avg.toLocaleString()}, rate ~\${p.rate}%, est. \$\${pmt}/month on \${p.term}-month term.\`,
    alternates: { canonical: \`https://www.freefincalc.net/personal-loan-calculator/purpose/\${p.slug}\` },
  }
}
export default function Layout({ children }) { return children }
`)

fs.writeFileSync(path.join(plDir, 'page.js'), `import purposes from '../../../../data/loanPurposes'
import PersonalLoanClient from './PersonalLoanClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() {
  return purposes.map(p => ({ purpose: p.slug }))
}
export default function Page({ params }) {
  const purpose = purposes.find(p => p.slug === params.purpose)
  if (!purpose) return notFound()
  return <PersonalLoanClient purpose={purpose} allPurposes={purposes} />
}
`)

fs.writeFileSync(path.join(plDir, 'PersonalLoanClient.js'), `'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calc(amt, rate, term) {
  const mo = rate / 100 / 12
  const pmt = mo > 0 ? amt * mo / (1 - Math.pow(1 + mo, -term)) : amt / term
  return { pmt, interest: pmt * term - amt, total: pmt * term }
}

export default function PersonalLoanClient({ purpose, allPurposes }) {
  const [amt,  setAmt]  = useState(purpose.avg)
  const [rate, setRate] = useState(purpose.rate)
  const [term, setTerm] = useState(purpose.term)
  const r = calc(amt, rate, term)
  const s = {
    page:  { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap:  { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:    { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:   { color:'#64748b', textDecoration:'none' },
    h1:    { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:   { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    grid:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 },
    card:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 },
    lbl:   { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:   { fontSize:26, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr:  { width:'100%', accentColor:'#f0c842' },
    box:   { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    h2:    { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:     { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:   { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    pA:    { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA: { display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }
  return (
    <div style={s.page}>
      <Header />
      <div style={s.wrap}>
        <nav style={s.bc}>
          <a href="/" style={s.bcA}>Home</a><span>›</span>
          <a href="/personal-loan-calculator" style={s.bcA}>Personal Loan Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{purpose.name}</span>
        </nav>
        <h1 style={s.h1}>Personal Loan for {purpose.name} 2026</h1>
        <p style={s.sub}>Calculate monthly payments for {purpose.desc}.</p>
        <div style={s.grid}>
          <div style={s.card}>
            <label style={s.lbl}>Loan Amount</label>
            <div style={s.val}>{fmt(amt)}</div>
            <input type="range" min={1000} max={purpose.avg * 4} step={500} value={amt} onChange={e => setAmt(+e.target.value)} style={s.sldr} />
          </div>
          <div style={s.card}>
            <label style={s.lbl}>Interest Rate</label>
            <div style={s.val}>{rate}%</div>
            <input type="range" min={4} max={36} step={0.5} value={rate} onChange={e => setRate(+e.target.value)} style={s.sldr} />
          </div>
          <div style={{...s.card, gridColumn:'span 2'}}>
            <label style={s.lbl}>Loan Term (months)</label>
            <div style={s.val}>{term} months</div>
            <input type="range" min={12} max={84} step={12} value={term} onChange={e => setTerm(+e.target.value)} style={s.sldr} />
          </div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Loan Summary</h2>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:800, color:'#f0c842', fontSize:20}}>{fmt(r.pmt)}/mo</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest</span><span style={{fontWeight:700}}>{fmt(r.interest)}</span></div>
          <div style={{...s.row, borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Cost</span><span style={{fontWeight:700}}>{fmt(r.total)}</span></div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Guide: Personal Loan for {purpose.name}</h2>
          <p style={s.p}>A personal loan for {purpose.desc} typically ranges from {fmt(purpose.avg * 0.5)} to {fmt(purpose.avg * 2)} with rates between {(purpose.rate - 2).toFixed(1)}% and {(purpose.rate + 5).toFixed(1)}% depending on your credit score. Borrowers with scores above 720 generally qualify for the lowest rates.</p>
          <p style={s.p}>Before borrowing, compare at least 3 lenders — rates for the same borrower can vary by 5% or more. Online lenders often offer lower rates than banks for personal loans. Check if your employer or credit union offers lower rates first.</p>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Related Calculators</h2>
          {[['/personal-loan-calculator','Personal Loan'],['/loan-comparison-calculator','Loan Comparison'],['/debt-consolidation-calculator','Debt Consolidation'],['/credit-card-payoff-calculator','Credit Card Payoff'],['/apr-calculator','APR Calculator']].map(([href,lbl]) => (
            <a key={href} href={href} style={s.calcA}>{lbl}</a>
          ))}
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Personal Loan by Purpose</h2>
          {allPurposes.filter(p => p.slug !== purpose.slug).map(p => (
            <a key={p.slug} href={'/personal-loan-calculator/purpose/' + p.slug} style={s.pA}>{p.name}</a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
`)
console.log('✅ personal-loan-calculator/purpose/[purpose] — 50 pages created')

// ── STUDENT LOAN BY MAJOR ─────────────────────────────────────────────────
const majorsData = `const majors = [
  { slug:'computer-science',      name:'Computer Science',        debt:32000,  salary:108000, rate:5.5, term:120, desc:'software engineering, AI, and technology' },
  { slug:'nursing',               name:'Nursing (BSN)',            debt:30000,  salary:77600,  rate:5.5, term:120, desc:'registered nursing and patient care' },
  { slug:'business',              name:'Business Administration',  debt:35000,  salary:62000,  rate:5.5, term:120, desc:'management, finance, and business operations' },
  { slug:'engineering',           name:'Engineering',              debt:38000,  salary:90000,  rate:5.5, term:120, desc:'mechanical, civil, electrical engineering' },
  { slug:'education',             name:'Education (Teaching)',     debt:25000,  salary:55000,  rate:5.5, term:120, desc:'elementary, secondary, and special education' },
  { slug:'psychology',            name:'Psychology',               debt:32000,  salary:48000,  rate:5.5, term:120, desc:'human behavior, mental health, and counseling' },
  { slug:'biology',               name:'Biology / Life Sciences',  debt:30000,  salary:52000,  rate:5.5, term:120, desc:'life sciences, research, and pre-med studies' },
  { slug:'communications',        name:'Communications',           debt:30000,  salary:52000,  rate:5.5, term:120, desc:'journalism, public relations, and media' },
  { slug:'criminal-justice',      name:'Criminal Justice',         debt:28000,  salary:50000,  rate:5.5, term:120, desc:'law enforcement, criminology, and forensics' },
  { slug:'political-science',     name:'Political Science',        debt:30000,  salary:55000,  rate:5.5, term:120, desc:'government, policy, and international relations' },
  { slug:'accounting',            name:'Accounting',               debt:30000,  salary:72000,  rate:5.5, term:120, desc:'financial accounting, auditing, and tax' },
  { slug:'social-work',           name:'Social Work (MSW)',        debt:45000,  salary:51000,  rate:6.54,term:120, desc:'social services, counseling, and advocacy' },
  { slug:'information-technology',name:'Information Technology',   debt:28000,  salary:85000,  rate:5.5, term:120, desc:'IT support, networking, and cybersecurity' },
  { slug:'marketing',             name:'Marketing',                debt:32000,  salary:65000,  rate:5.5, term:120, desc:'digital marketing, branding, and advertising' },
  { slug:'finance',               name:'Finance',                  debt:35000,  salary:80000,  rate:5.5, term:120, desc:'investments, banking, and financial planning' },
  { slug:'graphic-design',        name:'Graphic Design',           debt:30000,  salary:52000,  rate:5.5, term:120, desc:'visual design, branding, and digital media' },
  { slug:'architecture',          name:'Architecture',             debt:45000,  salary:83000,  rate:5.5, term:120, desc:'building design, urban planning, and structures' },
  { slug:'english',               name:'English / Literature',     debt:28000,  salary:48000,  rate:5.5, term:120, desc:'writing, literature, and language studies' },
  { slug:'history',               name:'History',                  debt:28000,  salary:46000,  rate:5.5, term:120, desc:'historical research, archives, and education' },
  { slug:'economics',             name:'Economics',                debt:30000,  salary:72000,  rate:5.5, term:120, desc:'microeconomics, macroeconomics, and policy' },
  { slug:'pre-med',               name:'Pre-Med / Medicine',       debt:200000, salary:208000, rate:7.05,term:120, desc:'preparing for medical school and residency' },
  { slug:'law',                   name:'Law (JD)',                  debt:130000, salary:135000, rate:7.05,term:120, desc:'legal practice, corporate law, and litigation' },
  { slug:'mba',                   name:'MBA',                      debt:70000,  salary:105000, rate:7.05,term:120, desc:'business leadership, strategy, and entrepreneurship' },
  { slug:'pharmacy',              name:'Pharmacy (PharmD)',         debt:160000, salary:128000, rate:7.05,term:120, desc:'pharmaceutical care and medication management' },
  { slug:'dentistry',             name:'Dentistry (DDS)',           debt:280000, salary:164000, rate:7.05,term:120, desc:'dental practice and oral health care' },
  { slug:'physical-therapy',      name:'Physical Therapy (DPT)',   debt:110000, salary:95000,  rate:7.05,term:120, desc:'rehabilitation and movement therapy' },
  { slug:'veterinary',            name:'Veterinary Medicine (DVM)', debt:175000, salary:119000, rate:7.05,term:120, desc:'animal health care and veterinary practice' },
  { slug:'data-science',          name:'Data Science',             debt:35000,  salary:103000, rate:5.5, term:120, desc:'machine learning, analytics, and big data' },
  { slug:'cybersecurity',         name:'Cybersecurity',            debt:30000,  salary:103000, rate:5.5, term:120, desc:'network security, ethical hacking, and IT forensics' },
  { slug:'electrical-engineering',name:'Electrical Engineering',   debt:38000,  salary:101000, rate:5.5, term:120, desc:'circuits, power systems, and electronics' },
  { slug:'environmental-science', name:'Environmental Science',    debt:30000,  salary:55000,  rate:5.5, term:120, desc:'ecology, sustainability, and environmental policy' },
  { slug:'anthropology',          name:'Anthropology',             debt:28000,  salary:46000,  rate:5.5, term:120, desc:'human cultures, archaeology, and social evolution' },
  { slug:'art',                   name:'Fine Arts (BFA)',           debt:45000,  salary:42000,  rate:5.5, term:120, desc:'studio art, sculpture, and creative expression' },
  { slug:'music',                 name:'Music / Music Education',  debt:40000,  salary:42000,  rate:5.5, term:120, desc:'performance, composition, and music teaching' },
  { slug:'film',                  name:'Film Production',          debt:50000,  salary:48000,  rate:5.5, term:120, desc:'filmmaking, screenwriting, and video production' },
  { slug:'hospitality',           name:'Hospitality Management',   debt:28000,  salary:52000,  rate:5.5, term:120, desc:'hotel, restaurant, and event management' },
  { slug:'journalism',            name:'Journalism',               debt:28000,  salary:50000,  rate:5.5, term:120, desc:'news reporting, media production, and broadcasting' },
  { slug:'sociology',             name:'Sociology',                debt:28000,  salary:48000,  rate:5.5, term:120, desc:'social structures, demographics, and cultural studies' },
  { slug:'public-health',         name:'Public Health (MPH)',      debt:55000,  salary:62000,  rate:6.54,term:120, desc:'epidemiology, health policy, and community health' },
  { slug:'aerospace-engineering', name:'Aerospace Engineering',    debt:40000,  salary:122000, rate:5.5, term:120, desc:'aircraft, spacecraft, and propulsion systems' },
  { slug:'biomedical-engineering',name:'Biomedical Engineering',   debt:38000,  salary:97000,  rate:5.5, term:120, desc:'medical devices, prosthetics, and health technology' },
  { slug:'supply-chain',          name:'Supply Chain Management',  debt:32000,  salary:80000,  rate:5.5, term:120, desc:'logistics, operations, and procurement' },
  { slug:'real-estate',           name:'Real Estate',              debt:30000,  salary:62000,  rate:5.5, term:120, desc:'property sales, investment, and brokerage' },
  { slug:'nutrition',             name:'Nutrition & Dietetics',    debt:30000,  salary:61000,  rate:5.5, term:120, desc:'clinical nutrition, dietetics, and food science' },
  { slug:'occupational-therapy',  name:'Occupational Therapy (OT)',debt:90000,  salary:86000,  rate:7.05,term:120, desc:'rehabilitation for daily living and work tasks' },
  { slug:'speech-language',       name:'Speech-Language Pathology',debt:60000,  salary:84000,  rate:6.54,term:120, desc:'communication disorders and speech therapy' },
  { slug:'kinesiology',           name:'Kinesiology / Exercise Science',debt:28000,salary:48000,rate:5.5,term:120, desc:'human movement, sports science, and fitness' },
  { slug:'philosophy',            name:'Philosophy',               debt:28000,  salary:48000,  rate:5.5, term:120, desc:'ethics, logic, and philosophical inquiry' },
  { slug:'international-business',name:'International Business',   debt:35000,  salary:67000,  rate:5.5, term:120, desc:'global trade, international markets, and cross-cultural management' },
  { slug:'game-design',           name:'Game Design / Development',debt:40000,  salary:70000,  rate:5.5, term:120, desc:'video game development, interactive media, and UX' },
  { slug:'construction-management',name:'Construction Management', debt:32000,  salary:98000,  rate:5.5, term:120, desc:'building project oversight and construction engineering' },
]
module.exports = majors
`
fs.writeFileSync('data/majors.js', majorsData, 'utf8')
console.log('✅ data/majors.js — 50 college majors')

const slDir = path.join('app', 'student-loan-calculator', 'major', '[major]')
fs.mkdirSync(slDir, { recursive: true })

fs.writeFileSync(path.join(slDir, 'layout.js'), `import majors from '../../../../data/majors'
export async function generateMetadata({ params }) {
  const m = majors.find(x => x.slug === params.major)
  if (!m) return { title: 'Student Loan Calculator' }
  const mo = m.rate / 100 / 12
  const pmt = Math.round(m.debt * mo / (1 - Math.pow(1 + mo, -m.term)))
  const dti = Math.round(pmt / (m.salary / 12) * 100)
  return {
    title: \`Student Loan Calculator for \${m.name} 2026\`,
    description: \`Avg \${m.name} student debt: \$\${m.debt.toLocaleString()}. Est. monthly payment \$\${pmt}. Starting salary \$\${m.salary.toLocaleString()}/yr. Debt-to-income ratio ~\${dti}%.\`,
    alternates: { canonical: \`https://www.freefincalc.net/student-loan-calculator/major/\${m.slug}\` },
  }
}
export default function Layout({ children }) { return children }
`)

fs.writeFileSync(path.join(slDir, 'page.js'), `import majors from '../../../../data/majors'
import StudentLoanClient from './StudentLoanClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() {
  return majors.map(m => ({ major: m.slug }))
}
export default function Page({ params }) {
  const major = majors.find(m => m.slug === params.major)
  if (!major) return notFound()
  return <StudentLoanClient major={major} allMajors={majors} />
}
`)

fs.writeFileSync(path.join(slDir, 'StudentLoanClient.js'), `'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calc(debt, rate, term) {
  const mo = rate / 100 / 12
  const pmt = mo > 0 ? debt * mo / (1 - Math.pow(1 + mo, -term)) : debt / term
  return { pmt, interest: pmt * term - debt, total: pmt * term }
}

export default function StudentLoanClient({ major, allMajors }) {
  const [debt, setDebt] = useState(major.debt)
  const [rate, setRate] = useState(major.rate)
  const [term, setTerm] = useState(major.term)
  const r = calc(debt, rate, term)
  const dti = Math.round(r.pmt / (major.salary / 12) * 100)
  const s = {
    page:  { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap:  { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:    { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:   { color:'#64748b', textDecoration:'none' },
    h1:    { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:   { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    grid:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 },
    card:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 },
    lbl:   { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:   { fontSize:26, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr:  { width:'100%', accentColor:'#f0c842' },
    box:   { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    h2:    { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:     { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:   { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    majA:  { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA: { display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
    dtiColor: dti > 15 ? '#ef4444' : '#10b981',
  }
  return (
    <div style={s.page}>
      <Header />
      <div style={s.wrap}>
        <nav style={s.bc}>
          <a href="/" style={s.bcA}>Home</a><span>›</span>
          <a href="/student-loan-calculator" style={s.bcA}>Student Loan Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{major.name}</span>
        </nav>
        <h1 style={s.h1}>Student Loan Calculator: {major.name} 2026</h1>
        <p style={s.sub}>Average debt, monthly payments, and salary outlook for {major.desc}.</p>
        <div style={s.grid}>
          <div style={s.card}>
            <label style={s.lbl}>Total Student Debt</label>
            <div style={s.val}>{fmt(debt)}</div>
            <input type="range" min={5000} max={major.debt * 4} step={1000} value={debt} onChange={e => setDebt(+e.target.value)} style={s.sldr} />
          </div>
          <div style={s.card}>
            <label style={s.lbl}>Interest Rate</label>
            <div style={s.val}>{rate}%</div>
            <input type="range" min={3} max={12} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} style={s.sldr} />
          </div>
          <div style={{...s.card, gridColumn:'span 2'}}>
            <label style={s.lbl}>Repayment Term (months)</label>
            <div style={s.val}>{term} months ({Math.round(term/12)} years)</div>
            <input type="range" min={60} max={300} step={12} value={term} onChange={e => setTerm(+e.target.value)} style={s.sldr} />
          </div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Repayment Summary</h2>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:800, color:'#f0c842', fontSize:20}}>{fmt(r.pmt)}/mo</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest Paid</span><span style={{fontWeight:700}}>{fmt(r.interest)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Total Repayment Cost</span><span style={{fontWeight:700}}>{fmt(r.total)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Avg {major.name} Starting Salary</span><span style={{fontWeight:700}}>{fmt(major.salary)}/yr</span></div>
          <div style={{...s.row, borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Loan-to-Salary Ratio</span><span style={{fontWeight:700, color:s.dtiColor}}>{dti}% of monthly income</span></div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>{major.name}: Debt vs Salary Analysis</h2>
          <p style={s.p}>The average {major.name} graduate carries <strong style={{color:'#e2e8f0'}}>{fmt(major.debt)}</strong> in student debt and earns approximately <strong style={{color:'#e2e8f0'}}>{fmt(major.salary)}/year</strong> starting out. At the standard 10-year repayment rate of {major.rate}%, monthly payments are <strong style={{color:'#f0c842'}}>{fmt(calc(major.debt, major.rate, 120).pmt)}/month</strong> — representing {Math.round(calc(major.debt, major.rate, 120).pmt / (major.salary / 12) * 100)}% of gross monthly income.</p>
          <p style={s.p}>Financial experts recommend keeping student loan payments below 10-15% of gross monthly income. {dti <= 10 ? major.name + ' graduates generally stay within this guideline.' : dti <= 15 ? 'This is manageable but leaves limited room for other financial goals.' : 'This is above the recommended threshold — consider income-driven repayment plans or refinancing.'}</p>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Related Calculators</h2>
          {[['/student-loan-calculator','Student Loan Calculator'],['/loan-payment-calculator','Loan Payment'],['/salary-after-tax-calculator','Salary After Tax'],['/debt-payoff-calculator','Debt Payoff'],['/refinance-calculator','Refinance Calculator']].map(([href,lbl]) => (
            <a key={href} href={href} style={s.calcA}>{lbl}</a>
          ))}
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Student Loan Calculator by Major</h2>
          {allMajors.filter(m => m.slug !== major.slug).map(m => (
            <a key={m.slug} href={'/student-loan-calculator/major/' + m.slug} style={s.majA}>{m.name}</a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
`)
console.log('✅ student-loan-calculator/major/[major] — 50 pages created')

// ── UPDATE SITEMAP ────────────────────────────────────────────────────────
const carBrands   = require('./data/carBrands')
const jobs        = require('./data/jobs')
const loanPurposes = require('./data/loanPurposes')
const majors      = require('./data/majors')

let sitemap = ''
try { sitemap = fs.readFileSync('public/sitemap.xml', 'utf8') } catch(e) {}

if (!sitemap) { console.log('⚠️  sitemap.xml not found'); process.exit(0) }

function addEntries(items, urlFn, sitemap) {
  const entries = items.map(item => `  <url>
    <loc>${urlFn(item)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')
  return sitemap.replace('</urlset>', entries + '\n</urlset>')
}

if (!sitemap.includes('/car-loan-calculator/brand/')) {
  sitemap = addEntries(carBrands, b => `https://www.freefincalc.net/car-loan-calculator/brand/${b.slug}`, sitemap)
  console.log('✅ sitemap: +50 car brand pages')
}
if (!sitemap.includes('/salary-after-tax-calculator/job/')) {
  sitemap = addEntries(jobs, j => `https://www.freefincalc.net/salary-after-tax-calculator/job/${j.slug}`, sitemap)
  console.log('✅ sitemap: +50 salary job pages')
}
if (!sitemap.includes('/personal-loan-calculator/purpose/')) {
  sitemap = addEntries(loanPurposes, p => `https://www.freefincalc.net/personal-loan-calculator/purpose/${p.slug}`, sitemap)
  console.log('✅ sitemap: +50 personal loan pages')
}
if (!sitemap.includes('/student-loan-calculator/major/')) {
  sitemap = addEntries(majors, m => `https://www.freefincalc.net/student-loan-calculator/major/${m.slug}`, sitemap)
  console.log('✅ sitemap: +50 student loan pages')
}

fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8')
console.log('✅ public/sitemap.xml updated')

const total = carBrands.length + jobs.length + loanPurposes.length + majors.length
console.log('\n╔══════════════════════════════════════════╗')
console.log('║  BUILD COMPLETE — NEW PAGES ADDED        ║')
console.log('╠══════════════════════════════════════════╣')
console.log('║  Car loan by brand:       50 pages       ║')
console.log('║  Salary by profession:    50 pages       ║')
console.log('║  Personal loan by purpose:50 pages       ║')
console.log('║  Student loan by major:   50 pages       ║')
console.log('║  ─────────────────────────────────────── ║')
console.log('║  Total new pages:        200             ║')
console.log('║  Estimated total site:  ~435 pages       ║')
console.log('╚══════════════════════════════════════════╝')
console.log('\nDeploy:')
console.log('  git add -A')
console.log('  git commit -m "feat: 200 programmatic SEO pages (car/salary/loan/student)"')
console.log('  vercel --prod')
