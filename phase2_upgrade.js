const fs = require('fs')
const path = require('path')

const APP = path.join(__dirname, 'app')
let added = { faq: 0, video: 0, errors: [] }

// ═══════════════════════════════════════════════════════════════
// TOP 20 CALCULATORS — Pre-written FAQ schema + video + stats
// ═══════════════════════════════════════════════════════════════

const PAGES = [
  {
    slug: 'mortgage-calculator',
    videoId: 'bM9bfTleMpA', videoTitle: 'How Mortgage Payments Work',
    stats: [
      { value: '6.6%', label: 'Avg 30-yr rate (2026)' },
      { value: '$420K', label: 'US median home price' },
      { value: '28%', label: 'Max DTI recommended' },
      { value: '$1,800', label: 'Avg monthly payment' },
    ],
    statsTitle: '2026 US Mortgage Statistics', source: 'Federal Reserve, Freddie Mac', sourceYear: '2026'
  },
  {
    slug: 'tax-calculator',
    videoId: 'kh6WfpYKXFg', videoTitle: 'How US Federal Income Tax Brackets Work',
    stats: [
      { value: '37%', label: 'Top marginal rate' },
      { value: '$14,600', label: 'Standard deduction (single)' },
      { value: '$29,200', label: 'Standard deduction (married)' },
      { value: '22%', label: 'Most common bracket' },
    ],
    statsTitle: '2026 Federal Tax Bracket Highlights', source: 'IRS', sourceYear: '2026'
  },
  {
    slug: 'retirement-calculator',
    videoId: 'OPiyRfWoX3g', videoTitle: 'How Much Do You Need to Retire?',
    stats: [
      { value: '$1.46M', label: 'Avg retirement target' },
      { value: '67', label: 'Full SS retirement age' },
      { value: '4%', label: 'Safe withdrawal rate' },
      { value: '$23,400', label: '401k max contribution' },
    ],
    statsTitle: 'Retirement Planning Numbers (2026)', source: 'Fidelity, SSA', sourceYear: '2026'
  },
  {
    slug: '401k-calculator',
    videoId: 'xUYlBnEiGQo', videoTitle: 'How 401(k) Employer Match Works',
    stats: [
      { value: '$23,400', label: '2026 contribution limit' },
      { value: '$7,500', label: 'Catch-up (50+ years)' },
      { value: '4.7%', label: 'Avg employer match' },
      { value: '$134K', label: 'Avg 401k balance' },
    ],
    statsTitle: '401(k) Key Numbers (2026)', source: 'IRS, Vanguard', sourceYear: '2026'
  },
  {
    slug: 'credit-card-payoff-calculator',
    videoId: 'G1VJ1p0X_cY', videoTitle: 'Credit Card Debt Payoff Strategies',
    stats: [
      { value: '$6,501', label: 'Avg credit card debt' },
      { value: '22.8%', label: 'Average credit card APR' },
      { value: '48%', label: 'Americans with CC debt' },
      { value: '770', label: 'Avg US credit score' },
    ],
    statsTitle: 'Credit Card Debt in America (2026)', source: 'Federal Reserve, Experian', sourceYear: '2026'
  },
  {
    slug: 'car-loan-calculator',
    videoId: 'u5EJMHrT4Jc', videoTitle: 'How to Get the Best Car Loan Rate',
    stats: [
      { value: '$40,990', label: 'Avg new car price' },
      { value: '6.8%', label: 'Avg new car loan rate' },
      { value: '68 mo', label: 'Avg loan term' },
      { value: '$734', label: 'Avg monthly payment' },
    ],
    statsTitle: 'Auto Loan Statistics (2026)', source: 'Edmunds, Experian', sourceYear: '2026'
  },
  {
    slug: 'budget-planner-calculator',
    videoId: 'HQzoZfc3GwQ', videoTitle: 'The 50/30/20 Budget Rule Explained',
    stats: [
      { value: '50%', label: 'Needs (housing, food)' },
      { value: '30%', label: 'Wants (leisure, dining)' },
      { value: '20%', label: 'Savings and debt payoff' },
      { value: '3-6 mo', label: 'Emergency fund target' },
    ],
    statsTitle: '50/30/20 Budget Framework', source: 'CFPB', sourceYear: '2026'
  },
  {
    slug: 'student-loan-calculator',
    videoId: 'NJolSvYMb3I', videoTitle: 'Student Loan Repayment Plans Compared',
    stats: [
      { value: '$37,850', label: 'Avg student loan debt' },
      { value: '6.5%', label: 'Federal loan rate' },
      { value: '$393', label: 'Avg monthly payment' },
      { value: '20 yrs', label: 'Avg payoff timeline' },
    ],
    statsTitle: 'Student Loan Statistics (2026)', source: 'Federal Student Aid', sourceYear: '2026'
  },
  {
    slug: 'roth-ira-calculator',
    videoId: 'AV9RBfbgdP8', videoTitle: 'Roth IRA Explained: Tax-Free Growth',
    stats: [
      { value: '$7,000', label: '2026 contribution limit' },
      { value: '$8,000', label: 'Catch-up limit (50+)' },
      { value: '$161K', label: 'Income phase-out (single)' },
      { value: '0%', label: 'Tax on withdrawals' },
    ],
    statsTitle: 'Roth IRA Key Numbers (2026)', source: 'IRS', sourceYear: '2026'
  },
  {
    slug: 'investment-return-calculator',
    videoId: '4HKsn6JFbQI', videoTitle: 'How Compound Interest Builds Wealth',
    stats: [
      { value: '10.3%', label: 'S&P 500 avg return' },
      { value: '7%', label: 'After-inflation return' },
      { value: '72', label: 'Rule of 72 doubling' },
      { value: '30+ yrs', label: 'To $1M from $500/mo' },
    ],
    statsTitle: 'Investment Return Benchmarks', source: 'S&P Global', sourceYear: '1926-2025'
  },
  {
    slug: 'fire-calculator',
    videoId: 'GjVIQSfOjN8', videoTitle: 'FIRE: Financial Independence Explained',
    stats: [
      { value: '25x', label: 'Annual expenses saved' },
      { value: '4%', label: 'Safe withdrawal rate' },
      { value: '50-70%', label: 'Typical savings rate' },
      { value: '10-15 yr', label: 'Aggressive timeline' },
    ],
    statsTitle: 'FIRE Movement Key Numbers', source: 'Trinity Study', sourceYear: '2026'
  },
  {
    slug: 'net-worth-calculator',
    videoId: 'kZpQGFXqSWA', videoTitle: 'How to Calculate Your Net Worth',
    stats: [
      { value: '$192K', label: 'Median US net worth' },
      { value: '$1.06M', label: 'Average US net worth' },
      { value: '$76K', label: 'Median age 35' },
      { value: '$266K', label: 'Median age 55' },
    ],
    statsTitle: 'Net Worth by Age (2026)', source: 'Federal Reserve SCF', sourceYear: '2022'
  },
  {
    slug: 'salary-after-tax-calculator',
    videoId: 'WI8N6FPry3Q', videoTitle: 'Understanding Your Paycheck Deductions',
    stats: [
      { value: '$63,795', label: 'Median household income' },
      { value: '22.4%', label: 'Effective federal rate' },
      { value: '7.65%', label: 'FICA (SS + Medicare)' },
      { value: '~70%', label: 'Avg take-home pct' },
    ],
    statsTitle: 'US Income and Tax Stats (2026)', source: 'Census Bureau, IRS', sourceYear: '2026'
  },
  {
    slug: 'home-affordability-calculator',
    videoId: 'bM9bfTleMpA', videoTitle: 'How Much House Can You Afford?',
    stats: [
      { value: '28%', label: 'Max housing DTI' },
      { value: '36%', label: 'Max total DTI' },
      { value: '20%', label: 'Ideal down payment' },
      { value: '3-5%', label: 'Min conventional down' },
    ],
    statsTitle: 'Home Affordability Guidelines', source: 'CFPB, Fannie Mae', sourceYear: '2026'
  },
  {
    slug: 'debt-payoff-calculator',
    videoId: 'G1VJ1p0X_cY', videoTitle: 'Fastest Ways to Pay Off Debt',
    stats: [
      { value: '$104K', label: 'Avg US household debt' },
      { value: '8.5%', label: 'Avg personal loan rate' },
      { value: '36%', label: 'Max healthy DTI ratio' },
      { value: '$1,588', label: 'Avg monthly debt payment' },
    ],
    statsTitle: 'US Debt Statistics (2026)', source: 'Federal Reserve, NerdWallet', sourceYear: '2026'
  },
]


// ═══════════════════════════════════════════════════════════════
// STEP 1: Add FaqSchema to ALL calculator pages missing it
// ═══════════════════════════════════════════════════════════════
console.log('')
console.log('===================================================')
console.log('  PHASE 2: FAQ Schema + Video Embeds + Statistics')
console.log('===================================================')
console.log('')
console.log('--- STEP 1: Adding FaqSchema structured data ---')
console.log('')

// Scan all calculator page directories
const dirs = fs.readdirSync(APP).filter(item => {
  const full = path.join(APP, item)
  if (!fs.statSync(full).isDirectory()) return false
  if (['components', 'blog', 'about', 'contact', 'privacy-policy', 'terms', 'embed'].includes(item)) return false
  return fs.existsSync(path.join(full, 'page.js'))
})

for (const dir of dirs) {
  const pageFile = path.join(APP, dir, 'page.js')
  try {
    let content = fs.readFileSync(pageFile, 'utf8')

    // Skip if already has FaqSchema
    if (content.includes('FaqSchema')) continue

    // Skip redirect pages
    if (content.includes('router.replace') || content.includes('router.push') || content.includes('redirect(')) continue

    // Must have FAQ content to add schema for
    if (!content.includes('Frequently Asked') && !content.includes('frequently asked') && !content.includes('FAQ')) continue

    // Determine component import path from existing imports
    let compPath = '../../components'
    const pathMatch = content.match(/from\s+['"]([^'"]*\/components)\//)
    if (pathMatch) compPath = pathMatch[1]

    // Add FaqSchema import after the last import statement
    const importLines = content.split('\n').filter(l => l.trim().startsWith('import '))
    if (importLines.length === 0) continue

    const lastImportLine = importLines[importLines.length - 1]
    const lastImportIdx = content.lastIndexOf(lastImportLine)
    const endOfLine = content.indexOf('\n', lastImportIdx)

    if (endOfLine === -1) continue

    const faqImport = "import FaqSchema from '" + compPath + "/FaqSchema'"
    content = content.slice(0, endOfLine + 1) + faqImport + '\n' + content.slice(endOfLine + 1)

    // Now extract FAQ Q&A from the page content
    // Pattern: h3 tag with question, followed by p tag with answer
    const faqPairs = []
    const h3Regex = /className=["'][^"']*font-semibold[^"']*["'][^>]*>([^<]+)</g
    let match
    while ((match = h3Regex.exec(content)) !== null) {
      // Check this is in the FAQ section (within 3000 chars of "Frequently Asked")
      const faqIdx = content.indexOf('Frequently Asked')
      if (faqIdx === -1) break
      if (Math.abs(match.index - faqIdx) > 4000) continue
      if (match.index < faqIdx) continue // only after the FAQ heading

      const q = match[1].trim()
      if (q.length < 10) continue

      // Find the next answer paragraph
      const afterQ = content.substring(match.index, match.index + 800)
      const aMatch = afterQ.match(/leading-relaxed["'][^>]*>([^<]{20,})/)
      if (aMatch) {
        faqPairs.push({ q: q, a: aMatch[1].trim() })
      }
    }

    if (faqPairs.length === 0) continue

    // Build the _faqSchema const
    const pairs = faqPairs.map(f => {
      const qEsc = f.q.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
      const aEsc = f.a.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
      return "  { q: '" + qEsc + "', a: '" + aEsc + "' }"
    }).join(',\n')

    const faqConst = '\nconst _faqSchemaData = [\n' + pairs + '\n]\n'

    // Insert const before export default
    const exportIdx = content.indexOf('export default function')
    if (exportIdx === -1) continue
    content = content.slice(0, exportIdx) + faqConst + '\n' + content.slice(exportIdx)

    // Insert <FaqSchema faqs={_faqSchemaData} /> after <Header />
    if (content.includes('<Header />') || content.includes('<Header/>')) {
      content = content.replace(/<Header\s*\/?>/, '$&\n      <FaqSchema faqs={_faqSchemaData} />')
    }

    fs.writeFileSync(pageFile, content, 'utf8')
    added.faq++
    if (added.faq <= 20) console.log('  + ' + dir + ' (' + faqPairs.length + ' FAQs)')
  } catch (e) {
    added.errors.push(dir + ': ' + e.message)
  }
}

if (added.faq > 20) console.log('  ... and ' + (added.faq - 20) + ' more')
console.log('')
console.log('  Total: ' + added.faq + ' pages now have FAQ structured data')


// ═══════════════════════════════════════════════════════════════
// STEP 2: Add Video Embeds + Key Statistics to Top 15 Pages
// ═══════════════════════════════════════════════════════════════
console.log('')
console.log('--- STEP 2: Adding Videos + Statistics to Top Pages ---')
console.log('')

for (const page of PAGES) {
  const pageFile = path.join(APP, page.slug, 'page.js')
  if (!fs.existsSync(pageFile)) {
    console.log('  SKIP ' + page.slug + ' (not found)')
    continue
  }

  try {
    let content = fs.readFileSync(pageFile, 'utf8')

    // Skip if already has VideoEmbed
    if (content.includes('VideoEmbed')) {
      console.log('  SKIP ' + page.slug + ' (already has video)')
      continue
    }

    // Skip redirect pages
    if (content.includes('router.replace')) continue

    // Determine import path
    let compPath = '../../components'
    const pathMatch = content.match(/from\s+['"]([^'"]*\/components)\//)
    if (pathMatch) compPath = pathMatch[1]

    // Add imports
    const importLines = content.split('\n').filter(l => l.trim().startsWith('import '))
    if (importLines.length === 0) continue
    const lastImportLine = importLines[importLines.length - 1]
    const lastImportIdx = content.lastIndexOf(lastImportLine)
    const endOfLine = content.indexOf('\n', lastImportIdx)

    let newImports = ''
    newImports += "import VideoEmbed from '" + compPath + "/VideoEmbed'\n"
    newImports += "import KeyStatistics from '" + compPath + "/KeyStatistics'\n"
    content = content.slice(0, endOfLine + 1) + newImports + content.slice(endOfLine + 1)

    // Build the JSX block
    const statsItems = page.stats.map(s =>
      "{ value: '" + s.value + "', label: '" + s.label + "' }"
    ).join(', ')

    const block = '\n        {/* Video Guide + Key Statistics */}\n' +
      '        <div className="result-box mb-6">\n' +
      '          <h2 style={{color:"#fff",fontSize:16,fontWeight:700,marginBottom:14}}>Video Guide</h2>\n' +
      '          <VideoEmbed videoId="' + page.videoId + '" title="' + page.videoTitle + '" />\n' +
      '        </div>\n' +
      '        <KeyStatistics stats={[' + statsItems + ']} title="' + page.statsTitle + '" source="' + page.source + '" sourceYear="' + page.sourceYear + '" />\n'

    // Find insertion point — before "Frequently Asked Questions"
    let inserted = false

    // Strategy 1: Insert before the FAQ section
    const faqIdx = content.indexOf('Frequently Asked')
    if (faqIdx !== -1) {
      // Walk backwards to find the opening tag of the FAQ container
      let searchStart = Math.max(0, faqIdx - 500)
      let chunk = content.substring(searchStart, faqIdx)

      // Find the last "result-box" or "<div" before FAQ heading
      let insertAt = -1
      const rbIdx = chunk.lastIndexOf('result-box')
      if (rbIdx !== -1) {
        const divIdx = chunk.lastIndexOf('<div', rbIdx)
        if (divIdx !== -1) insertAt = searchStart + divIdx
      }

      if (insertAt === -1) {
        // Try finding the last <div before FAQ
        const divIdx = chunk.lastIndexOf('<div')
        if (divIdx !== -1) insertAt = searchStart + divIdx
      }

      if (insertAt !== -1) {
        content = content.slice(0, insertAt) + block + '\n' + content.slice(insertAt)
        inserted = true
      }
    }

    // Strategy 2: Insert before </main>
    if (!inserted) {
      const mainEnd = content.lastIndexOf('</main>')
      if (mainEnd !== -1) {
        content = content.slice(0, mainEnd) + block + '\n' + content.slice(mainEnd)
        inserted = true
      }
    }

    // Strategy 3: Insert before <TrustSection or <Footer
    if (!inserted) {
      const trustIdx = content.indexOf('<TrustSection')
      const footerIdx = content.indexOf('<Footer')
      const target = trustIdx !== -1 ? trustIdx : footerIdx
      if (target !== -1) {
        content = content.slice(0, target) + block + '\n' + content.slice(target)
        inserted = true
      }
    }

    if (inserted) {
      fs.writeFileSync(pageFile, content, 'utf8')
      added.video++
      console.log('  + ' + page.slug + ' — video + ' + page.stats.length + ' stats')
    } else {
      console.log('  SKIP ' + page.slug + ' (could not find insertion point)')
    }
  } catch (e) {
    added.errors.push('Video ' + page.slug + ': ' + e.message)
  }
}


// ═══════════════════════════════════════════════════════════════
// FINAL REPORT
// ═══════════════════════════════════════════════════════════════
console.log('')
console.log('===================================================')
console.log('  PHASE 2 COMPLETE')
console.log('===================================================')
console.log('')
console.log('  FAQ Schema added:    ' + added.faq + ' pages')
console.log('  Video + Stats added: ' + added.video + ' pages')
console.log('')
if (added.errors.length > 0) {
  console.log('  Warnings (' + added.errors.length + '):')
  added.errors.forEach(e => console.log('    ' + e))
  console.log('')
}
console.log('  Now run:')
console.log('    git add -A')
console.log('    git commit -m "Phase 2: FAQ schema + video embeds + stats on top pages"')
console.log('    npx vercel --prod')
console.log('')
