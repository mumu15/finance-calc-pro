const fs = require('fs')
const path = require('path')

const APP = path.join(__dirname, 'app')
let added = { faq: 0, video: 0, errors: [] }

const PAGES = [
  { slug: 'mortgage-calculator', videoId: 'bM9bfTleMpA', videoTitle: 'How Mortgage Payments Work',
    stats: [{value:'6.6%',label:'Avg 30-yr rate (2026)'},{value:'$420K',label:'US median home price'},{value:'28%',label:'Max DTI recommended'},{value:'$1,800',label:'Avg monthly payment'}],
    statsTitle: '2026 US Mortgage Statistics', source: 'Federal Reserve, Freddie Mac', sourceYear: '2026' },
  { slug: 'tax-calculator', videoId: 'kh6WfpYKXFg', videoTitle: 'How US Federal Income Tax Brackets Work',
    stats: [{value:'37%',label:'Top marginal rate'},{value:'$14,600',label:'Standard deduction (single)'},{value:'$29,200',label:'Standard deduction (married)'},{value:'22%',label:'Most common bracket'}],
    statsTitle: '2026 Federal Tax Highlights', source: 'IRS', sourceYear: '2026' },
  { slug: 'retirement-calculator', videoId: 'OPiyRfWoX3g', videoTitle: 'How Much Do You Need to Retire?',
    stats: [{value:'$1.46M',label:'Avg retirement target'},{value:'67',label:'Full SS retirement age'},{value:'4%',label:'Safe withdrawal rate'},{value:'$23,400',label:'401k max contribution'}],
    statsTitle: 'Retirement Planning (2026)', source: 'Fidelity, SSA', sourceYear: '2026' },
  { slug: '401k-calculator', videoId: 'xUYlBnEiGQo', videoTitle: 'How 401(k) Employer Match Works',
    stats: [{value:'$23,400',label:'2026 contribution limit'},{value:'$7,500',label:'Catch-up (50+)'},{value:'4.7%',label:'Avg employer match'},{value:'$134K',label:'Avg 401k balance'}],
    statsTitle: '401(k) Key Numbers (2026)', source: 'IRS, Vanguard', sourceYear: '2026' },
  { slug: 'credit-card-payoff-calculator', videoId: 'G1VJ1p0X_cY', videoTitle: 'Credit Card Debt Payoff Strategies',
    stats: [{value:'$6,501',label:'Avg credit card debt'},{value:'22.8%',label:'Average APR'},{value:'48%',label:'Americans with CC debt'},{value:'770',label:'Avg credit score'}],
    statsTitle: 'Credit Card Debt (2026)', source: 'Federal Reserve, Experian', sourceYear: '2026' },
  { slug: 'car-loan-calculator', videoId: 'u5EJMHrT4Jc', videoTitle: 'How to Get the Best Car Loan Rate',
    stats: [{value:'$40,990',label:'Avg new car price'},{value:'6.8%',label:'Avg loan rate'},{value:'68 mo',label:'Avg loan term'},{value:'$734',label:'Avg monthly payment'}],
    statsTitle: 'Auto Loan Statistics (2026)', source: 'Edmunds, Experian', sourceYear: '2026' },
  { slug: 'budget-planner-calculator', videoId: 'HQzoZfc3GwQ', videoTitle: 'The 50/30/20 Budget Rule Explained',
    stats: [{value:'50%',label:'Needs (housing, food)'},{value:'30%',label:'Wants (leisure, dining)'},{value:'20%',label:'Savings and debt'},{value:'3-6 mo',label:'Emergency fund target'}],
    statsTitle: '50/30/20 Budget Framework', source: 'CFPB', sourceYear: '2026' },
  { slug: 'student-loan-calculator', videoId: 'NJolSvYMb3I', videoTitle: 'Student Loan Repayment Plans Compared',
    stats: [{value:'$37,850',label:'Avg student loan debt'},{value:'6.5%',label:'Federal loan rate'},{value:'$393',label:'Avg monthly payment'},{value:'20 yrs',label:'Avg payoff timeline'}],
    statsTitle: 'Student Loan Statistics (2026)', source: 'Federal Student Aid', sourceYear: '2026' },
  { slug: 'roth-ira-calculator', videoId: 'AV9RBfbgdP8', videoTitle: 'Roth IRA Explained: Tax-Free Growth',
    stats: [{value:'$7,000',label:'2026 contribution limit'},{value:'$8,000',label:'Catch-up (50+)'},{value:'$161K',label:'Income phase-out (single)'},{value:'0%',label:'Tax on withdrawals'}],
    statsTitle: 'Roth IRA Key Numbers (2026)', source: 'IRS', sourceYear: '2026' },
  { slug: 'investment-return-calculator', videoId: '4HKsn6JFbQI', videoTitle: 'How Compound Interest Builds Wealth',
    stats: [{value:'10.3%',label:'S&P 500 avg return'},{value:'7%',label:'After-inflation return'},{value:'72',label:'Rule of 72 doubling'},{value:'30+ yrs',label:'To $1M from $500/mo'}],
    statsTitle: 'Investment Return Benchmarks', source: 'S&P Global', sourceYear: '1926-2025' },
  { slug: 'fire-calculator', videoId: 'GjVIQSfOjN8', videoTitle: 'FIRE: Financial Independence Explained',
    stats: [{value:'25x',label:'Annual expenses saved'},{value:'4%',label:'Safe withdrawal rate'},{value:'50-70%',label:'Typical savings rate'},{value:'10-15 yr',label:'Aggressive timeline'}],
    statsTitle: 'FIRE Movement Key Numbers', source: 'Trinity Study', sourceYear: '2026' },
  { slug: 'net-worth-calculator', videoId: 'kZpQGFXqSWA', videoTitle: 'How to Calculate Your Net Worth',
    stats: [{value:'$192K',label:'Median US net worth'},{value:'$1.06M',label:'Average US net worth'},{value:'$76K',label:'Median age 35'},{value:'$266K',label:'Median age 55'}],
    statsTitle: 'Net Worth by Age (2026)', source: 'Federal Reserve SCF', sourceYear: '2022' },
  { slug: 'salary-after-tax-calculator', videoId: 'WI8N6FPry3Q', videoTitle: 'Understanding Paycheck Deductions',
    stats: [{value:'$63,795',label:'Median household income'},{value:'22.4%',label:'Effective federal rate'},{value:'7.65%',label:'FICA (SS + Medicare)'},{value:'~70%',label:'Avg take-home pct'}],
    statsTitle: 'US Income Stats (2026)', source: 'Census Bureau, IRS', sourceYear: '2026' },
  { slug: 'home-affordability-calculator', videoId: 'bM9bfTleMpA', videoTitle: 'How Much House Can You Afford?',
    stats: [{value:'28%',label:'Max housing DTI'},{value:'36%',label:'Max total DTI'},{value:'20%',label:'Ideal down payment'},{value:'3-5%',label:'Min conventional down'}],
    statsTitle: 'Home Affordability Guidelines', source: 'CFPB, Fannie Mae', sourceYear: '2026' },
  { slug: 'debt-payoff-calculator', videoId: 'G1VJ1p0X_cY', videoTitle: 'Fastest Ways to Pay Off Debt',
    stats: [{value:'$104K',label:'Avg household debt'},{value:'8.5%',label:'Avg personal loan rate'},{value:'36%',label:'Max healthy DTI'},{value:'$1,588',label:'Avg monthly debt payment'}],
    statsTitle: 'US Debt Statistics (2026)', source: 'Federal Reserve', sourceYear: '2026' },
]

// Find the actual client file for a calculator
function findClientFile(slug) {
  const dir = path.join(APP, slug)
  if (!fs.existsSync(dir)) return null
  // Try PageClient.js first, then Client.js, then page.js with useState
  for (const name of ['PageClient.js', 'Client.js', 'client.js', 'PageClient.tsx']) {
    const f = path.join(dir, name)
    if (fs.existsSync(f)) return f
  }
  // Fallback: page.js if it has useState (is a real component, not wrapper)
  const pf = path.join(dir, 'page.js')
  if (fs.existsSync(pf)) {
    const c = fs.readFileSync(pf, 'utf8')
    if (c.includes('useState')) return pf
  }
  return null
}

// ═══════════════════════════════════════════════════════════════
// STEP 1: Add FaqSchema to ALL PageClient files missing it
// ═══════════════════════════════════════════════════════════════
console.log('')
console.log('===================================================')
console.log('  PHASE 2 v3: Targeting PageClient.js files')
console.log('===================================================')
console.log('')
console.log('--- STEP 1: Adding FaqSchema structured data ---')
console.log('')

const allDirs = fs.readdirSync(APP).filter(item => {
  const full = path.join(APP, item)
  return fs.statSync(full).isDirectory() &&
    !['components', 'blog', 'about', 'contact', 'privacy-policy', 'terms', 'embed'].includes(item)
})

for (const dir of allDirs) {
  const clientFile = findClientFile(dir)
  if (!clientFile) continue

  try {
    let content = fs.readFileSync(clientFile, 'utf8')

    if (content.includes('FaqSchema')) continue
    if (content.includes('router.replace') || content.includes('router.push')) continue
    if (!content.includes('Frequently Asked') && !content.includes('frequently asked')) continue

    // Determine component import path
    let compPath = '../../components'
    const pm = content.match(/from\s+['"]([^'"]*\/components)\//)
    if (pm) compPath = pm[1]

    // Add FaqSchema import
    const lines = content.split('\n')
    let lastImportIdx = -1
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) lastImportIdx = i
    }
    if (lastImportIdx === -1) continue

    lines.splice(lastImportIdx + 1, 0, "import FaqSchema from '" + compPath + "/FaqSchema'")
    content = lines.join('\n')

    // Extract FAQ pairs
    const faqPairs = []
    const faqStart = content.indexOf('Frequently Asked')
    if (faqStart === -1) continue
    const faqSection = content.substring(faqStart, faqStart + 5000)

    // Match h3 > question text, then p > answer text
    const qRegex = /font-semibold[^>]*>([^<]{10,})</g
    const aRegex = /leading-relaxed[^>]*>([^<]{20,})</g
    let qm, am
    const qs = [], as_ = []
    while ((qm = qRegex.exec(faqSection)) !== null) qs.push(qm[1].trim())
    while ((am = aRegex.exec(faqSection)) !== null) as_.push(am[1].trim())
    for (let i = 0; i < Math.min(qs.length, as_.length); i++) {
      faqPairs.push({ q: qs[i], a: as_[i] })
    }

    if (faqPairs.length === 0) continue

    // Build const
    const pairs = faqPairs.map(f => {
      return "  { q: '" + f.q.replace(/'/g, "\\'") + "', a: '" + f.a.replace(/'/g, "\\'") + "' }"
    }).join(',\n')
    const faqConst = '\nconst _schemaFaqs = [\n' + pairs + '\n]\n'

    // Insert before export default
    const expIdx = content.indexOf('export default function')
    if (expIdx === -1) continue
    content = content.slice(0, expIdx) + faqConst + '\n' + content.slice(expIdx)

    // Insert <FaqSchema> after return( opener
    // Find the first JSX after return
    const retIdx = content.indexOf('return (', expIdx)
    const retIdx2 = content.indexOf('return(', expIdx)
    const actualRet = retIdx !== -1 ? retIdx : retIdx2
    if (actualRet === -1) continue

    // Find the next line after the return (
    const afterRet = content.indexOf('\n', actualRet)
    if (afterRet === -1) continue

    // Find the first < after return
    const firstTag = content.indexOf('<', actualRet)
    if (firstTag === -1) continue

    // Insert FaqSchema right after the opening fragment or first wrapper
    const nextNewline = content.indexOf('\n', firstTag)
    if (nextNewline !== -1) {
      content = content.slice(0, nextNewline + 1) + '      <FaqSchema faqs={_schemaFaqs} />\n' + content.slice(nextNewline + 1)
    }

    fs.writeFileSync(clientFile, content, 'utf8')
    added.faq++
    if (added.faq <= 20) console.log('  + ' + dir + ' (' + faqPairs.length + ' FAQs) -> ' + path.basename(clientFile))
  } catch (e) {
    added.errors.push('FAQ ' + dir + ': ' + e.message)
  }
}
if (added.faq > 20) console.log('  ... and ' + (added.faq - 20) + ' more')
console.log('')
console.log('  Total: ' + added.faq + ' pages now have FAQ rich snippets')


// ═══════════════════════════════════════════════════════════════
// STEP 2: Add Video + Stats to Top 15 Pages
// ═══════════════════════════════════════════════════════════════
console.log('')
console.log('--- STEP 2: Adding Videos + Statistics ---')
console.log('')

for (const page of PAGES) {
  const clientFile = findClientFile(page.slug)
  if (!clientFile) { console.log('  SKIP ' + page.slug + ' (no client file)'); continue }

  try {
    let content = fs.readFileSync(clientFile, 'utf8')
    if (content.includes('VideoEmbed')) { console.log('  SKIP ' + page.slug + ' (already done)'); continue }
    if (content.includes('router.replace')) continue

    // Import path
    let compPath = '../../components'
    const pm = content.match(/from\s+['"]([^'"]*\/components)\//)
    if (pm) compPath = pm[1]

    // Add imports after last import
    const lines = content.split('\n')
    let lastImp = -1
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) lastImp = i
    }
    if (lastImp === -1) continue
    lines.splice(lastImp + 1, 0,
      "import VideoEmbed from '" + compPath + "/VideoEmbed'",
      "import KeyStatistics from '" + compPath + "/KeyStatistics'"
    )
    content = lines.join('\n')

    // Build the JSX block
    const si = page.stats.map(s => "{ value: '" + s.value + "', label: '" + s.label + "' }").join(', ')
    const block =
      '        {/* Video Guide + Key Statistics */}\n' +
      '        <div style={{background:"linear-gradient(135deg, rgba(13,33,64,0.9), rgba(7,20,38,0.95))",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:"24px 20px",marginBottom:24}}>\n' +
      '          <h2 style={{color:"#fff",fontSize:16,fontWeight:700,marginBottom:14}}>Video Guide</h2>\n' +
      '          <VideoEmbed videoId="' + page.videoId + '" title="' + page.videoTitle + '" />\n' +
      '        </div>\n' +
      '        <KeyStatistics stats={[' + si + ']} title="' + page.statsTitle + '" source="' + page.source + '" sourceYear="' + page.sourceYear + '" />\n'

    // Try insertion points in order
    let inserted = false
    const targets = ['Frequently Asked', 'Recommended Reading', 'You Might Also Like', 'Related Calculators', 'TrustSection', '</main>', '<Footer']

    for (const target of targets) {
      const idx = content.indexOf(target)
      if (idx === -1) continue

      // Walk back to find a good line break to insert before
      let insertAt = idx
      // Go back to find start of the enclosing div/section
      const before = content.substring(Math.max(0, idx - 300), idx)
      const lastDiv = before.lastIndexOf('<div')
      const lastSection = before.lastIndexOf('<section')
      const lastH2 = before.lastIndexOf('<h2')

      if (lastDiv !== -1) {
        insertAt = Math.max(0, idx - 300) + lastDiv
      } else if (lastSection !== -1) {
        insertAt = Math.max(0, idx - 300) + lastSection
      } else if (lastH2 !== -1) {
        insertAt = Math.max(0, idx - 300) + lastH2
      }

      // Find the start of this line
      const lineStart = content.lastIndexOf('\n', insertAt)
      if (lineStart !== -1) insertAt = lineStart + 1

      content = content.slice(0, insertAt) + block + '\n' + content.slice(insertAt)
      inserted = true
      break
    }

    if (inserted) {
      fs.writeFileSync(clientFile, content, 'utf8')
      added.video++
      console.log('  + ' + page.slug + ' — video + ' + page.stats.length + ' stats -> ' + path.basename(clientFile))
    } else {
      console.log('  SKIP ' + page.slug + ' (no insertion point in ' + path.basename(clientFile) + ')')
    }
  } catch (e) {
    added.errors.push('Video ' + page.slug + ': ' + e.message)
  }
}


// ═══════════════════════════════════════════════════════════════
// REPORT
// ═══════════════════════════════════════════════════════════════
console.log('')
console.log('===================================================')
console.log('  PHASE 2 COMPLETE')
console.log('===================================================')
console.log('')
console.log('  FAQ Schema:    ' + added.faq + ' pages')
console.log('  Video + Stats: ' + added.video + ' pages')
if (added.errors.length > 0) {
  console.log('  Warnings:      ' + added.errors.length)
  added.errors.slice(0, 5).forEach(e => console.log('    ' + e))
}
console.log('')
console.log('  Deploy:')
console.log('    git add -A')
console.log('    git commit -m "Phase 2: FAQ schema + videos + stats on top pages"')
console.log('    npx vercel --prod')
console.log('')
