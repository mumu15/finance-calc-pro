/**
 * Batch 2: Salary After Tax by Profession — 60 pages
 * Route: /salary-after-tax-calculator/job/[job]
 * node build_salary_job_pages.js
 */
const fs = require('fs')
const path = require('path')

fs.mkdirSync('data', { recursive: true })

const data = `const jobs = [
  { slug:'software-engineer',      name:'Software Engineer',       salary:120000, state:'CA', fedRate:22, stateRate:9.3,  fica:7.65, desc:'one of the highest-paying careers in the US tech industry' },
  { slug:'nurse',                  name:'Registered Nurse',        salary:77600,  state:'TX', fedRate:22, stateRate:0,    fica:7.65, desc:'a highly essential healthcare professional in the United States' },
  { slug:'teacher',                name:'Teacher',                 salary:61730,  state:'NY', fedRate:22, stateRate:6.85, fica:7.65, desc:'an essential educator shaping the next generation' },
  { slug:'doctor',                 name:'Physician',               salary:208000, state:'CA', fedRate:32, stateRate:9.3,  fica:2.35, desc:'one of the most demanding and rewarding careers in healthcare' },
  { slug:'lawyer',                 name:'Lawyer',                  salary:135740, state:'NY', fedRate:24, stateRate:6.85, fica:7.65, desc:'a legal professional advising clients on complex matters' },
  { slug:'accountant',             name:'Accountant',              salary:77250,  state:'TX', fedRate:22, stateRate:0,    fica:7.65, desc:'a financial professional managing tax and accounting records' },
  { slug:'marketing-manager',      name:'Marketing Manager',       salary:135030, state:'CA', fedRate:24, stateRate:9.3,  fica:7.65, desc:'a strategic professional driving brand growth and revenue' },
  { slug:'project-manager',        name:'Project Manager',         salary:94500,  state:'WA', fedRate:22, stateRate:0,    fica:7.65, desc:'a professional overseeing projects from inception to completion' },
  { slug:'data-scientist',         name:'Data Scientist',          salary:108020, state:'CA', fedRate:22, stateRate:9.3,  fica:7.65, desc:'an analytical expert extracting insights from large datasets' },
  { slug:'electrician',            name:'Electrician',             salary:60240,  state:'TX', fedRate:22, stateRate:0,    fica:7.65, desc:'a skilled tradesperson installing and maintaining electrical systems' },
  { slug:'plumber',                name:'Plumber',                 salary:59880,  state:'IL', fedRate:22, stateRate:4.95, fica:7.65, desc:'a skilled tradesperson specializing in water and gas systems' },
  { slug:'police-officer',         name:'Police Officer',          salary:65790,  state:'NY', fedRate:22, stateRate:6.85, fica:7.65, desc:'a law enforcement professional protecting communities' },
  { slug:'firefighter',            name:'Firefighter',             salary:52500,  state:'CA', fedRate:22, stateRate:9.3,  fica:7.65, desc:'a first responder protecting lives and property from fires' },
  { slug:'pharmacist',             name:'Pharmacist',              salary:128710, state:'TX', fedRate:24, stateRate:0,    fica:7.65, desc:'a healthcare professional dispensing medications and advising patients' },
  { slug:'dentist',                name:'Dentist',                 salary:164010, state:'CA', fedRate:32, stateRate:9.3,  fica:7.65, desc:'a dental health professional treating teeth and gums' },
  { slug:'physical-therapist',     name:'Physical Therapist',      salary:95620,  state:'FL', fedRate:22, stateRate:0,    fica:7.65, desc:'a healthcare professional restoring patient movement and function' },
  { slug:'financial-analyst',      name:'Financial Analyst',       salary:95570,  state:'NY', fedRate:22, stateRate:6.85, fica:7.65, desc:'a professional evaluating investment opportunities and financial data' },
  { slug:'hr-manager',             name:'HR Manager',              salary:126230, state:'CA', fedRate:24, stateRate:9.3,  fica:7.65, desc:'a professional managing company hiring, benefits, and culture' },
  { slug:'chef',                   name:'Chef',                    salary:56520,  state:'NY', fedRate:22, stateRate:6.85, fica:7.65, desc:'a culinary professional creating dishes in professional kitchens' },
  { slug:'architect',              name:'Architect',               salary:89560,  state:'CA', fedRate:22, stateRate:9.3,  fica:7.65, desc:'a design professional creating functional and aesthetic buildings' },
  { slug:'civil-engineer',         name:'Civil Engineer',          salary:88050,  state:'TX', fedRate:22, stateRate:0,    fica:7.65, desc:'an engineering professional designing infrastructure projects' },
  { slug:'mechanical-engineer',    name:'Mechanical Engineer',     salary:95300,  state:'MI', fedRate:22, stateRate:4.25, fica:7.65, desc:'an engineer designing mechanical systems and devices' },
  { slug:'graphic-designer',       name:'Graphic Designer',        salary:57990,  state:'CA', fedRate:22, stateRate:9.3,  fica:7.65, desc:'a creative professional producing visual content and brand identity' },
  { slug:'social-worker',          name:'Social Worker',           salary:55350,  state:'NY', fedRate:22, stateRate:6.85, fica:7.65, desc:'a professional supporting vulnerable individuals and families' },
  { slug:'real-estate-agent',      name:'Real Estate Agent',       salary:49980,  state:'FL', fedRate:22, stateRate:0,    fica:7.65, desc:'a licensed professional helping clients buy and sell properties' },
  { slug:'sales-manager',          name:'Sales Manager',           salary:127490, state:'TX', fedRate:24, stateRate:0,    fica:7.65, desc:'a professional leading sales teams to meet revenue targets' },
  { slug:'ux-designer',            name:'UX Designer',             salary:99470,  state:'CA', fedRate:22, stateRate:9.3,  fica:7.65, desc:'a designer focused on creating intuitive digital experiences' },
  { slug:'product-manager',        name:'Product Manager',         salary:122680, state:'WA', fedRate:24, stateRate:0,    fica:7.65, desc:'a tech professional guiding product development and strategy' },
  { slug:'cybersecurity-analyst',  name:'Cybersecurity Analyst',   salary:103590, state:'VA', fedRate:22, stateRate:5.75, fica:7.65, desc:'an IT professional protecting organizations from cyber threats' },
  { slug:'radiologist',            name:'Radiologist',             salary:252040, state:'CA', fedRate:35, stateRate:9.3,  fica:2.35, desc:'a medical doctor interpreting diagnostic imaging studies' },
  { slug:'airline-pilot',          name:'Airline Pilot',           salary:211790, state:'TX', fedRate:32, stateRate:0,    fica:7.65, desc:'a commercial aviation professional flying passenger aircraft' },
  { slug:'veterinarian',           name:'Veterinarian',            salary:119100, state:'CA', fedRate:22, stateRate:9.3,  fica:7.65, desc:'a medical professional caring for animal health and wellness' },
  { slug:'speech-therapist',       name:'Speech Therapist',        salary:84140,  state:'TX', fedRate:22, stateRate:0,    fica:7.65, desc:'a healthcare professional treating communication disorders' },
  { slug:'paralegal',              name:'Paralegal',               salary:59200,  state:'NY', fedRate:22, stateRate:6.85, fica:7.65, desc:'a legal professional supporting lawyers with case preparation' },
  { slug:'operations-manager',     name:'Operations Manager',      salary:100780, state:'IL', fedRate:22, stateRate:4.95, fica:7.65, desc:'a business professional overseeing daily company operations' },
  { slug:'web-developer',          name:'Web Developer',           salary:85490,  state:'WA', fedRate:22, stateRate:0,    fica:7.65, desc:'a tech professional building websites and web applications' },
  { slug:'truck-driver',           name:'Truck Driver',            salary:49920,  state:'TX', fedRate:22, stateRate:0,    fica:7.65, desc:'a commercial driver transporting goods across the country' },
  { slug:'construction-manager',   name:'Construction Manager',    salary:101480, state:'TX', fedRate:22, stateRate:0,    fica:7.65, desc:'a professional overseeing building and infrastructure projects' },
  { slug:'occupational-therapist', name:'Occupational Therapist',  salary:86280,  state:'CA', fedRate:22, stateRate:9.3,  fica:7.65, desc:'a healthcare professional helping patients regain daily living skills' },
  { slug:'psychologist',           name:'Psychologist',            salary:81040,  state:'CA', fedRate:22, stateRate:9.3,  fica:7.65, desc:'a mental health professional diagnosing and treating disorders' },
  { slug:'logistics-manager',      name:'Logistics Manager',       salary:98560,  state:'OH', fedRate:22, stateRate:3.99, fica:7.65, desc:'a supply chain professional managing goods movement and distribution' },
  { slug:'insurance-agent',        name:'Insurance Agent',         salary:57860,  state:'FL', fedRate:22, stateRate:0,    fica:7.65, desc:'a sales professional selling insurance policies to clients' },
  { slug:'medical-assistant',      name:'Medical Assistant',       salary:37190,  state:'CA', fedRate:12, stateRate:9.3,  fica:7.65, desc:'a healthcare support professional assisting physicians' },
  { slug:'personal-trainer',       name:'Personal Trainer',        salary:44160,  state:'FL', fedRate:12, stateRate:0,    fica:7.65, desc:'a fitness professional designing exercise programs for clients' },
  { slug:'accountant-cpa',         name:'CPA (Certified Accountant)',salary:97000, state:'NY', fedRate:22, stateRate:6.85, fica:7.65, desc:'a licensed accounting professional with advanced tax expertise' },
  { slug:'investment-banker',      name:'Investment Banker',       salary:175000, state:'NY', fedRate:32, stateRate:6.85, fica:7.65, desc:'a finance professional advising corporations on capital markets' },
  { slug:'supply-chain-manager',   name:'Supply Chain Manager',    salary:96290,  state:'IL', fedRate:22, stateRate:4.95, fica:7.65, desc:'a professional optimizing the flow of goods from supplier to customer' },
  { slug:'nurse-practitioner',     name:'Nurse Practitioner',      salary:120680, state:'TX', fedRate:22, stateRate:0,    fica:7.65, desc:'an advanced practice nurse providing primary healthcare services' },
  { slug:'aerospace-engineer',     name:'Aerospace Engineer',      salary:122270, state:'CA', fedRate:22, stateRate:9.3,  fica:7.65, desc:'an engineer designing aircraft, spacecraft, and related systems' },
  { slug:'marine-biologist',       name:'Marine Biologist',        salary:66560,  state:'FL', fedRate:22, stateRate:0,    fica:7.65, desc:'a scientist studying ocean life and marine ecosystems' },
  { slug:'financial-advisor',      name:'Financial Advisor',       salary:94170,  state:'NY', fedRate:22, stateRate:6.85, fica:7.65, desc:'a professional helping clients plan investments and retirement' },
]
module.exports = jobs
`
fs.writeFileSync('data/jobs.js', data, 'utf8')
console.log('✅ data/jobs.js — 50 professions')

const dir = path.join('app', 'salary-after-tax-calculator', 'job', '[job]')
fs.mkdirSync(dir, { recursive: true })

const layout = `import jobs from '../../../../data/jobs'
export async function generateMetadata({ params }) {
  const j = jobs.find(x => x.slug === params.job)
  if (!j) return { title: 'Salary After Tax Calculator' }
  const gross = j.salary
  const fed = gross * j.fedRate / 100
  const state = gross * j.stateRate / 100
  const fica = gross * j.fica / 100
  const net = Math.round(gross - fed - state - fica)
  return {
    title: \`\${j.name} Salary After Tax 2026 — Take-Home Pay Calculator\`,
    description: \`How much does a \${j.name} take home? Average salary \$\${gross.toLocaleString()}/yr. After federal, state, and FICA taxes, estimated take-home is \$\${net.toLocaleString()}/yr.\`,
    alternates: { canonical: \`https://www.freefincalc.net/salary-after-tax-calculator/job/\${j.slug}\` },
  }
}
export default function Layout({ children }) { return children }
`
fs.writeFileSync(path.join(dir, 'layout.js'), layout, 'utf8')

const page = `import jobs from '../../../../data/jobs'
import SalaryJobClient from './SalaryJobClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() {
  return jobs.map(j => ({ job: j.slug }))
}
export default function Page({ params }) {
  const job = jobs.find(j => j.slug === params.job)
  if (!job) return notFound()
  return <SalaryJobClient job={job} allJobs={jobs} />
}
`
fs.writeFileSync(path.join(dir, 'page.js'), page, 'utf8')

const client = `'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

function fmtD(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calcTax(gross, fedRate, stateRate, fica) {
  const fed   = gross * fedRate / 100
  const state = gross * stateRate / 100
  const ficaT = gross * fica / 100
  const net   = gross - fed - state - ficaT
  return { fed, state, ficaT, net, effective: ((fed + state + ficaT) / gross * 100).toFixed(1) }
}

export default function SalaryJobClient({ job, allJobs }) {
  const [salary, setSalary] = useState(job.salary)
  const t = calcTax(salary, job.fedRate, job.stateRate, job.fica)

  const s = {
    page:  { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap:  { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:    { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:   { color:'#64748b', textDecoration:'none' },
    h1:    { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:   { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    card:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    lbl:   { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:   { fontSize:26, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr:  { width:'100%', accentColor:'#f0c842' },
    h2:    { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:     { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:   { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    jobA:  { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA: { display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }

  return (
    <div style={s.page}>
      <Header />
      <div style={s.wrap}>
        <nav style={s.bc}>
          <a href="/" style={s.bcA}>Home</a><span>›</span>
          <a href="/salary-after-tax-calculator" style={s.bcA}>Salary After Tax</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{job.name}</span>
        </nav>
        <h1 style={s.h1}>{job.name} Salary After Tax 2026</h1>
        <p style={s.sub}>Estimate your real take-home pay as a {job.name} after federal, state, and FICA taxes.</p>

        <div style={s.card}>
          <label style={s.lbl}>Annual Salary</label>
          <div style={s.val}>{fmtD(salary)}/year</div>
          <input type="range" min={20000} max={job.salary * 3} step={1000} value={salary} onChange={e => setSalary(+e.target.value)} style={s.sldr} />
        </div>

        <div style={s.card}>
          <h2 style={s.h2}>Take-Home Pay Breakdown</h2>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Gross Salary</span><span style={{fontWeight:700}}>{fmtD(salary)}/yr</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Federal Tax ({job.fedRate}%)</span><span style={{fontWeight:700, color:'#ef4444'}}>- {fmtD(t.fed)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>State Tax ({job.stateRate > 0 ? job.stateRate + '%' : 'None - ' + job.state})</span><span style={{fontWeight:700, color: t.state > 0 ? '#ef4444' : '#10b981'}}>- {fmtD(t.state)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>FICA (Social Security + Medicare)</span><span style={{fontWeight:700, color:'#ef4444'}}>- {fmtD(t.ficaT)}</span></div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0 0'}}>
            <span style={{fontWeight:700, fontSize:15}}>Take-Home Pay</span>
            <span style={{fontWeight:800, fontSize:22, color:'#f0c842'}}>{fmtD(t.net)}/yr</span>
          </div>
          <div style={{marginTop:10, display:'flex', gap:20, flexWrap:'wrap', fontSize:13, color:'#64748b'}}>
            <span>Monthly: <strong style={{color:'#e2e8f0'}}>{fmtD(t.net / 12)}</strong></span>
            <span>Biweekly: <strong style={{color:'#e2e8f0'}}>{fmtD(t.net / 26)}</strong></span>
            <span>Effective Tax Rate: <strong style={{color:'#e2e8f0'}}>{t.effective}%</strong></span>
          </div>
        </div>

        <div style={s.card}>
          <h2 style={s.h2}>{job.name} Salary Guide 2026</h2>
          <p style={s.p}>A {job.name} is {job.desc}. The average {job.name} salary in the US is <strong style={{color:'#e2e8f0'}}>{fmtD(job.salary)}/year</strong> as of 2026. After taxes, the typical take-home is approximately <strong style={{color:'#f0c842'}}>{fmtD(calcTax(job.salary, job.fedRate, job.stateRate, job.fica).net)}/year</strong> or <strong style={{color:'#f0c842'}}>{fmtD(calcTax(job.salary, job.fedRate, job.stateRate, job.fica).net / 12)}/month</strong>.</p>
          <p style={s.p}>State tax varies significantly by location. States like Texas, Florida, and Washington have no state income tax — meaning a {job.name} there keeps significantly more of each paycheck than one in California or New York.</p>
        </div>

        <div style={s.card}>
          <h2 style={s.h2}>Related Calculators</h2>
          {[['/salary-after-tax-calculator','Salary After Tax'],['/paycheck-calculator','Paycheck Calculator'],['/hourly-to-salary-calculator','Hourly to Salary'],['/tax-calculator','Tax Calculator'],['/retirement-calculator','Retirement Calculator']].map(([href,lbl]) => (
            <a key={href} href={href} style={s.calcA}>{lbl}</a>
          ))}
        </div>

        <div style={s.card}>
          <h2 style={s.h2}>Salary by Profession</h2>
          {allJobs.filter(j => j.slug !== job.slug).map(j => (
            <a key={j.slug} href={'/salary-after-tax-calculator/job/' + j.slug} style={s.jobA}>{j.name}</a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
`
fs.writeFileSync(path.join(dir, 'SalaryJobClient.js'), client, 'utf8')
console.log('✅ salary-after-tax-calculator/job/[job] — 50 pages created')
