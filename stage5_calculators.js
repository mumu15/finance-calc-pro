/**
 * FreeFinCalc.net — STAGE 5: 10 Calculator Pages
 * Retirement & Investing
 * Run from project root: node stage5_calculators.js
 *
 *  1. retirement-calculator
 *  2. social-security-calculator
 *  3. rmd-calculator
 *  4. investment-return-calculator
 *  5. portfolio-rebalancing-calculator
 *  6. dollar-cost-averaging-calculator
 *  7. personal-loan-calculator
 *  8. credit-card-payoff-calculator
 *  9. savings-interest-calculator
 * 10. net-investment-fee-calculator
 *
 * CLEAN CODE RULES (no more fix scripts needed):
 * - No apostrophes anywhere in JSX text or label strings
 * - All pdfRows labels use double quotes only
 * - All string useState defaults: useState('value') with single quotes
 * - Font families: use system fonts only, no "DM Serif" strings
 * - No export const metadata in client components
 * - Template literals only inside {}, never in JSX attributes
 */

const fs = require('fs')

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1) }

function write(dir, content) {
  fs.mkdirSync('app/' + dir, { recursive: true })
  fs.writeFileSync('app/' + dir + '/page.js', content, 'utf8')
  console.log('✅ app/' + dir)
}

function page(title, desc, icon, inputs, formula, results, faqs, related) {
  const states = inputs.map(f => {
    const def = typeof f.def === 'string' ? `'${f.def}'` : f.def
    return `  const [${f.s}, set${cap(f.s)}] = useState(${def})`
  }).join('\n')

  const deps = inputs.map(f => f.s).join(', ')

  const inputsJSX = inputs.map(f => {
    if (f.type === 'range') {
      let disp
      if (f.cur)      disp = `fmt(${f.s})`
      else if (f.pct) disp = `\`\${${f.s}}%\``
      else if (f.sfx) disp = `\`\${${f.s}}${f.sfx}\``
      else            disp = f.s
      return `
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">${f.label}</label>
                  <span className="text-white font-bold text-sm">{${disp}}</span>
                </div>
                <input type="range" min={${f.min}} max={${f.max}} step={${f.step}}
                  value={${f.s}} onChange={e => set${cap(f.s)}(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>`
    }
    if (f.type === 'select') {
      return `
              <div>
                <label className="text-slate-400 text-sm block mb-2">${f.label}</label>
                <div className="flex flex-wrap gap-2">
                  {(${JSON.stringify(f.opts)}).map(o => (
                    <button key={o.v} onClick={() => set${cap(f.s)}(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: ${f.s} === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: ${f.s} === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: ${f.s} === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>`
    }
    return ''
  }).join('\n')

  const resultsJSX = results.map(r => `
                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">${r.label}</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {${r.cur ? `fmt(result.${r.k})` : `result.${r.k}`}}
                    </span>
                  </div>`).join('\n')

  // pdfRows: ALL labels in double quotes, zero apostrophes
  const pdfRows = results.map(r =>
    `    { label: "${r.label}", value: result.${r.k} !== undefined ? String(${r.cur ? `fmt(result.${r.k})` : `result.${r.k}`}) : "" },`
  ).join('\n')

  const relatedJSX = related.map(r => `
            <a href="${r.href}" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">${r.icon}</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">${r.name}</h3>
            </a>`).join('\n')

  const faqsJSX = faqs.map((f, i) => `
            <div className="${i < faqs.length - 1 ? 'border-b pb-4' : 'pb-4'}" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">${f.q}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">${f.a}</p>
            </div>`).join('\n')

  return `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
${states}

  const result = useMemo(() => {
    try {
${formula}
    } catch(e) { return null }
  }, [${deps}])

  const pdfRows = result ? [
${pdfRows}
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">${icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">${title}</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">${desc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">
${inputsJSX}
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="${title}" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">
${resultsJSX}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial advice.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
${relatedJSX}
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
${faqsJSX}
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
`
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Retirement Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('retirement-calculator', page(
  'Retirement Calculator',
  'Calculate how much you need to retire and whether you are on track to reach your goal.',
  '🌅',
  [
    { s:'currentAge',      label:'Current Age',                type:'range', min:18,   max:70,     step:1,    sfx:' yrs', def:35   },
    { s:'retireAge',       label:'Target Retirement Age',      type:'range', min:45,   max:75,     step:1,    sfx:' yrs', def:65   },
    { s:'currentSavings',  label:'Current Retirement Savings', type:'range', min:0,    max:2000000,step:5000, cur:true, def:50000  },
    { s:'monthlyContrib',  label:'Monthly Contribution',       type:'range', min:0,    max:10000,  step:50,   cur:true, def:800    },
    { s:'annualReturn',    label:'Expected Annual Return',     type:'range', min:1,    max:15,     step:0.25, pct:true, def:7      },
    { s:'desiredIncome',   label:'Desired Annual Retirement Income', type:'range', min:10000, max:300000, step:1000, cur:true, def:60000 },
    { s:'inflationRate',   label:'Inflation Rate',             type:'range', min:1,    max:8,      step:0.25, pct:true, def:3      },
  ],
  `      const years      = retireAge - currentAge
      if (years <= 0) return null
      const r          = annualReturn / 100 / 12
      const n          = years * 12
      const fvSavings  = currentSavings * Math.pow(1 + annualReturn/100, years)
      const fvContribs = monthlyContrib * (Math.pow(1+r, n) - 1) / r
      const totalAtRetire = fvSavings + fvContribs
      const neededAt4pct  = desiredIncome / 0.04
      const onTrack       = totalAtRetire >= neededAt4pct
      const monthlyIncome = totalAtRetire * 0.04 / 12
      const gap           = neededAt4pct - totalAtRetire
      const addlMonthly   = gap > 0 ? gap * r / (Math.pow(1+r,n) - 1) : 0
      const status        = onTrack ? 'On Track' : 'Behind Goal'
      return { totalAtRetire, neededAt4pct, monthlyIncome, gap: Math.max(0, gap), addlMonthly: Math.max(0, addlMonthly), status }`,
  [
    { label:'Projected Retirement Savings', k:'totalAtRetire',  cur:true  },
    { label:'Amount Needed (4% Rule)',       k:'neededAt4pct',  cur:true  },
    { label:'Monthly Income at Retirement',  k:'monthlyIncome', cur:true  },
    { label:'Savings Gap',                   k:'gap',           cur:true  },
    { label:'Extra Monthly Needed',          k:'addlMonthly',   cur:true  },
    { label:'Status',                        k:'status',        cur:false },
  ],
  [
    { q:'How much do I need to retire?', a:'The most common benchmark is 25x your desired annual expenses (the 4% rule). To spend $60,000/year in retirement you need $1,500,000 saved. For a longer retirement (40+ years) many advisors suggest 28-33x expenses (3-3.5% withdrawal rate). Social Security and pension income reduce how much you personally need to save.' },
    { q:'What is the 4% rule for retirement?', a:'The 4% rule states that withdrawing 4% of your portfolio in year one, then adjusting for inflation, has historically sustained a portfolio for 30 years in most market scenarios (based on the 1994 Trinity Study). For retirements longer than 30 years, a 3-3.5% rate is safer. The rule assumes a diversified stock/bond portfolio.' },
    { q:'How much should I save for retirement each month?', a:'Most financial advisors recommend saving 15% of gross income for retirement (including any employer match). If starting late, aim for 20-25%. At minimum, always contribute enough to get the full employer 401k match — that is an instant 50-100% return. Use this calculator to find your specific number based on your timeline and goals.' },
  ],
  [
    { href:'/401k-calculator',      icon:'📊', name:'401k Calculator'    },
    { href:'/roth-ira-calculator',  icon:'💎', name:'Roth IRA'           },
    { href:'/fire-calculator',      icon:'🔥', name:'FIRE Calculator'    },
    { href:'/pension-calculator',   icon:'🏛️', name:'Pension Calculator' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 2. Social Security Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('social-security-calculator', page(
  'Social Security Calculator',
  'Estimate your monthly Social Security benefit at different claiming ages.',
  '🛡️',
  [
    { s:'currentAge',    label:'Current Age',              type:'range', min:30, max:61,  step:1,    sfx:' yrs', def:55  },
    { s:'birthYear',     label:'Birth Year',               type:'range', min:1950, max:1994, step:1, sfx:'',    def:1970 },
    { s:'avgEarnings',   label:'Average Annual Earnings',  type:'range', min:10000, max:300000, step:1000, cur:true, def:70000 },
    { s:'claimAge',      label:'Planned Claiming Age',     type:'select', def:67, opts:[{v:62,l:'62 (early)'},{v:65,l:'65'},{v:67,l:'67 (full)'},{v:70,l:'70 (max)'}] },
    { s:'yearsWorked',   label:'Years of Work History',    type:'range', min:10, max:40,  step:1,    sfx:' yrs', def:30  },
  ],
  `      // Simplified PIA estimate based on AIME
      const aime = Math.min(avgEarnings, 160200) / 12
      // 2026 bend points approximation
      const pia = aime <= 1115 ? aime * 0.90
                : aime <= 6721 ? 1115 * 0.90 + (aime - 1115) * 0.32
                : 1115 * 0.90 + (6721 - 1115) * 0.32 + (aime - 6721) * 0.15
      const fra = birthYear >= 1960 ? 67 : birthYear >= 1955 ? 66.5 : 66
      let monthlyBenefit = pia
      const diff = claimAge - fra
      if (diff < 0) {
        const reductionPct = Math.abs(diff) <= 3 ? Math.abs(diff) * 12 * (5/9/100) : (3 * 12 * (5/9/100)) + ((Math.abs(diff)-3) * 12 * (5/12/100))
        monthlyBenefit = pia * (1 - reductionPct)
      } else if (diff > 0) {
        monthlyBenefit = pia * (1 + diff * 0.08)
      }
      const workAdj     = Math.min(1, yearsWorked / 35)
      monthlyBenefit    = monthlyBenefit * workAdj
      const annualBenefit = monthlyBenefit * 12
      const lifetimeAt62 = monthlyBenefit * (claimAge === 62 ? 1 : 1) * 12 * (85 - Number(claimAge))
      const breakEvenVs62 = claimAge > 62 ?
        Math.round((monthlyBenefit - pia * workAdj * 0.7) > 0
          ? (pia * workAdj * 0.7 * 12 * (claimAge - 62)) / ((monthlyBenefit - pia * workAdj * 0.7) * 12) + claimAge
          : 999) : 62
      return {
        monthlyBenefit: Math.round(monthlyBenefit),
        annualBenefit:  Math.round(annualBenefit),
        fra:            fra + ' years old',
        breakEven:      breakEvenVs62 < 99 ? 'Age ' + breakEvenVs62 : 'N/A'
      }`,
  [
    { label:'Estimated Monthly Benefit',       k:'monthlyBenefit', cur:true  },
    { label:'Estimated Annual Benefit',        k:'annualBenefit',  cur:true  },
    { label:'Your Full Retirement Age (FRA)',   k:'fra',            cur:false },
    { label:'Break-Even vs Claiming at 62',    k:'breakEven',      cur:false },
  ],
  [
    { q:'When should I claim Social Security?', a:'Claiming at 62 gives you more total years of payments but a permanently reduced benefit (up to 30% less than FRA). Waiting until 70 gives the maximum monthly benefit (32% more than FRA for those born after 1943). The break-even age is typically 78-82. If you are healthy and have other income sources, delaying usually pays off significantly.' },
    { q:'How is Social Security calculated?', a:'Social Security benefits are based on your highest 35 years of earnings, indexed for inflation, then converted to your Average Indexed Monthly Earnings (AIME). The Primary Insurance Amount (PIA) is calculated using a progressive bend-point formula that replaces a higher percentage of lower earners. Working more than 35 years replaces lower-earning years, boosting your benefit.' },
    { q:'Can I work while receiving Social Security?', a:'Before FRA: if under FRA for the full year, benefits are reduced $1 for every $2 earned above $22,320 (2024). In the year you reach FRA: reduced $1 for every $3 above $59,520. After FRA: no earnings limit — you can earn any amount with no benefit reduction. Withheld benefits are added back to your payment after you reach FRA.' },
  ],
  [
    { href:'/retirement-calculator',  icon:'🌅', name:'Retirement'      },
    { href:'/pension-calculator',     icon:'🏛️', name:'Pension'         },
    { href:'/rmd-calculator',         icon:'📅', name:'RMD Calculator'  },
    { href:'/annuity-calculator',     icon:'📅', name:'Annuity'         },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 3. RMD Calculator (Required Minimum Distribution)
// ─────────────────────────────────────────────────────────────────────────────
write('rmd-calculator', page(
  'RMD Calculator',
  'Calculate your Required Minimum Distribution from IRAs and 401k accounts for any year.',
  '📅',
  [
    { s:'accountBalance', label:'Retirement Account Balance (Jan 1)', type:'range', min:10000, max:5000000, step:5000, cur:true, def:500000 },
    { s:'currentAge',     label:'Your Age (as of Dec 31 this year)',   type:'range', min:73,   max:100,    step:1,    sfx:' yrs', def:75 },
    { s:'accountType',    label:'Account Type',                        type:'select', def:'trad', opts:[{v:'trad',l:'Traditional IRA'},{v:'401k',l:'401k / 403b'},{v:'roth401k',l:'Roth 401k (2024+)'}] },
  ],
  `      if (accountType === 'roth401k') {
        return { rmd: 0, distributionPeriod: 'N/A', taxNote: 'Roth 401k: No RMD required after 2024 (SECURE 2.0)' }
      }
      // IRS Uniform Lifetime Table (simplified key values)
      const table = {73:26.5,74:25.5,75:24.6,76:23.7,77:22.9,78:22.0,79:21.1,80:20.2,81:19.4,82:18.5,83:17.7,84:16.8,85:16.0,86:15.2,87:14.4,88:13.7,89:12.9,90:12.2,91:11.5,92:10.8,93:10.1,94:9.5,95:8.9,96:8.4,97:7.8,98:7.3,99:6.8,100:6.4}
      const period = table[currentAge] || 6.4
      const rmd    = Math.ceil(accountBalance / period)
      const taxNote = 'Federal ordinary income tax applies to RMD withdrawals'
      return { rmd, distributionPeriod: period + ' years', taxNote }`,
  [
    { label:'Required Minimum Distribution', k:'rmd',               cur:true  },
    { label:'IRS Distribution Period',        k:'distributionPeriod',cur:false },
    { label:'Tax Note',                        k:'taxNote',          cur:false },
  ],
  [
    { q:'What is an RMD and who must take one?', a:'A Required Minimum Distribution (RMD) is the minimum amount the IRS requires you to withdraw from tax-deferred retirement accounts each year starting at age 73 (per SECURE 2.0 Act, effective 2023). Accounts requiring RMDs: Traditional IRAs, SEP IRAs, SIMPLE IRAs, 401k, 403b, and 457b plans. Roth IRAs do NOT require RMDs during the owner lifetime.' },
    { q:'What happens if I miss my RMD?', a:'Missing an RMD triggers a 25% excise tax on the amount not withdrawn (reduced to 10% if corrected within 2 years under SECURE 2.0). For a $20,000 missed RMD, the penalty is up to $5,000. The IRS does offer a penalty waiver process if the shortfall was due to reasonable error and you take corrective action promptly.' },
    { q:'Can I take more than the RMD?', a:'Yes — the RMD is a minimum, not a maximum. You can always withdraw more, though all withdrawals from traditional accounts are taxed as ordinary income. Consider a Roth conversion strategy: convert some traditional IRA funds to a Roth IRA before RMDs begin (ages 59.5-72) to reduce future RMDs and create tax-free income.' },
  ],
  [
    { href:'/retirement-calculator', icon:'🌅', name:'Retirement'   },
    { href:'/401k-calculator',       icon:'📊', name:'401k'         },
    { href:'/roth-ira-calculator',   icon:'💎', name:'Roth IRA'     },
    { href:'/tax-calculator',        icon:'🧮', name:'Tax Calculator'},
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 4. Investment Return Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('investment-return-calculator', page(
  'Investment Return Calculator',
  'Calculate total return, CAGR and compare performance across different investment scenarios.',
  '📈',
  [
    { s:'startValue',    label:'Starting Investment Value',   type:'range', min:100,   max:1000000, step:100,  cur:true, def:10000 },
    { s:'endValue',      label:'Ending Investment Value',     type:'range', min:100,   max:5000000, step:100,  cur:true, def:18000 },
    { s:'years',         label:'Investment Period',           type:'range', min:1,     max:50,      step:0.5,  sfx:' yrs', def:5  },
    { s:'dividends',     label:'Total Dividends Received',    type:'range', min:0,     max:500000,  step:100,  cur:true, def:1200  },
    { s:'inflationRate', label:'Inflation Rate (for real return)', type:'range', min:0, max:10,    step:0.25, pct:true, def:3     },
  ],
  `      const totalGain   = endValue - startValue + dividends
      const totalReturn = (totalGain / startValue * 100).toFixed(2) + '%'
      const cagr        = ((Math.pow((endValue + dividends) / startValue, 1/years) - 1) * 100).toFixed(2)
      const realCagr    = (((1 + parseFloat(cagr)/100) / (1 + inflationRate/100) - 1) * 100).toFixed(2)
      const doublingYrs = (72 / parseFloat(cagr)).toFixed(1) + ' years'
      const inflation5yr = startValue * Math.pow(1 + inflationRate/100, years)
      const beatInflation = endValue + dividends > inflation5yr ? 'Yes' : 'No'
      return { totalGain, totalReturn, cagr: cagr + '%', realCagr: realCagr + '%', doublingYrs, beatInflation }`,
  [
    { label:'Total Gain (incl. dividends)', k:'totalGain',     cur:true  },
    { label:'Total Return',                 k:'totalReturn',   cur:false },
    { label:'CAGR (annualised return)',      k:'cagr',         cur:false },
    { label:'Real Return (after inflation)', k:'realCagr',    cur:false },
    { label:'Time to Double at This Rate',  k:'doublingYrs',  cur:false },
    { label:'Beat Inflation?',              k:'beatInflation', cur:false },
  ],
  [
    { q:'What is CAGR and why does it matter?', a:'CAGR (Compound Annual Growth Rate) is the steady annual rate that would produce the same result as the actual investment over a multi-year period. It smooths out year-to-year volatility to show the true annual return. A $10,000 investment growing to $18,000 over 5 years has a CAGR of about 12.5%, regardless of how returns varied each year.' },
    { q:'What is a good investment return?', a:'The S and P 500 has averaged about 10% annually (7% real after inflation) over long periods. For context: savings accounts earn 4-5%, bonds 3-6%, real estate 8-12% total return, individual stocks vary widely. A real return (above inflation) of 5-7% is considered solid for a diversified long-term portfolio.' },
    { q:'What is the difference between nominal and real return?', a:'Nominal return is the raw percentage gain before adjusting for inflation. Real return = ((1 + nominal) / (1 + inflation) - 1). At 8% nominal with 3% inflation, real return is about 4.85%. Real return shows actual purchasing power gained. Long-term investors should focus on real returns to understand true wealth growth.' },
  ],
  [
    { href:'/roi-calculator',           icon:'💎', name:'ROI Calculator'       },
    { href:'/compound-interest',        icon:'💹', name:'Compound Interest'    },
    { href:'/stock-profit-calculator',  icon:'📊', name:'Stock Profit'         },
    { href:'/inflation-impact-calculator',icon:'📊',name:'Inflation Impact'    },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 5. Portfolio Rebalancing Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('portfolio-rebalancing-calculator', page(
  'Portfolio Rebalancing Calculator',
  'Find out exactly how much to buy or sell to rebalance your portfolio to target allocations.',
  '⚖️',
  [
    { s:'stocks',     label:'Current Stocks Value',        type:'range', min:0,   max:1000000, step:500, cur:true, def:70000  },
    { s:'bonds',      label:'Current Bonds Value',         type:'range', min:0,   max:500000,  step:500, cur:true, def:20000  },
    { s:'cash',       label:'Current Cash / Other',        type:'range', min:0,   max:200000,  step:500, cur:true, def:10000  },
    { s:'tgtStocks',  label:'Target Stocks Allocation',    type:'range', min:0,   max:100,     step:5,   pct:true, def:70     },
    { s:'tgtBonds',   label:'Target Bonds Allocation',     type:'range', min:0,   max:100,     step:5,   pct:true, def:20     },
  ],
  `      const total      = stocks + bonds + cash
      if (total <= 0) return null
      const tgtCash    = 100 - tgtStocks - tgtBonds
      const wantStocks = total * (tgtStocks / 100)
      const wantBonds  = total * (tgtBonds  / 100)
      const wantCash   = total * (tgtCash   / 100)
      const adjStocks  = wantStocks - stocks
      const adjBonds   = wantBonds  - bonds
      const adjCash    = wantCash   - cash
      const fmt2 = v => (v >= 0 ? '+' : '') + Math.round(v).toLocaleString()
      return {
        total,
        adjStocks: fmt2(adjStocks),
        adjBonds:  fmt2(adjBonds),
        adjCash:   fmt2(adjCash),
        curStocksPct: (stocks / total * 100).toFixed(1) + '%',
        curBondsPct:  (bonds  / total * 100).toFixed(1) + '%',
      }`,
  [
    { label:'Total Portfolio Value',         k:'total',         cur:true  },
    { label:'Stocks Adjustment (+ buy / - sell)', k:'adjStocks', cur:false },
    { label:'Bonds Adjustment (+ buy / - sell)',  k:'adjBonds',  cur:false },
    { label:'Cash Adjustment (+ add / - reduce)', k:'adjCash',   cur:false },
    { label:'Current Stocks Allocation',     k:'curStocksPct',  cur:false },
    { label:'Current Bonds Allocation',      k:'curBondsPct',   cur:false },
  ],
  [
    { q:'How often should I rebalance my portfolio?', a:'Most financial advisors recommend rebalancing annually or when any asset class drifts more than 5% from target. Calendar rebalancing (once a year, same date) is simple and effective. Threshold rebalancing (triggered by drift) is more precise. Tax-advantaged accounts (IRA, 401k) are ideal for rebalancing since there are no tax consequences for selling.' },
    { q:'What is the right asset allocation?', a:'Classic rules of thumb: subtract your age from 110-120 to get your stock percentage (age 35 = 75-85% stocks). Vanguard Target Date funds use roughly 90% stocks at age 25, declining to 50% by retirement. Your allocation depends on risk tolerance, time horizon and other income sources. More stocks = higher expected return with more volatility.' },
    { q:'Does rebalancing improve returns?', a:'Rebalancing does not reliably improve raw returns, but it enforces buy low, sell high discipline and controls risk. It prevents your portfolio from becoming dangerously concentrated in one asset class after a long bull run. Studies show rebalanced portfolios have meaningfully lower volatility than drifting portfolios, which matters most near retirement.' },
  ],
  [
    { href:'/investment-return-calculator',  icon:'📈', name:'Investment Return'  },
    { href:'/retirement-calculator',         icon:'🌅', name:'Retirement'         },
    { href:'/401k-calculator',               icon:'📊', name:'401k Calculator'    },
    { href:'/roi-calculator',                icon:'💎', name:'ROI Calculator'     },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 6. Dollar Cost Averaging Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('dollar-cost-averaging-calculator', page(
  'Dollar-Cost Averaging Calculator',
  'See how investing a fixed amount regularly beats lump-sum and builds wealth over time.',
  '🔁',
  [
    { s:'monthlyInvest',  label:'Monthly Investment Amount',  type:'range', min:25,   max:10000,   step:25,   cur:true, def:500   },
    { s:'years',          label:'Investment Period',          type:'range', min:1,    max:40,      step:1,    sfx:' yrs', def:20  },
    { s:'annualReturn',   label:'Expected Annual Return',     type:'range', min:1,    max:20,      step:0.25, pct:true, def:8     },
    { s:'lumpSum',        label:'Lump Sum Comparison Amount', type:'range', min:0,    max:1000000, step:1000, cur:true, def:10000 },
  ],
  `      const r     = annualReturn / 100 / 12
      const n     = years * 12
      const dcaFV = monthlyInvest * (Math.pow(1+r, n) - 1) / r
      const totalContribs = monthlyInvest * n
      const dcaGain = dcaFV - totalContribs
      const lumpFV  = lumpSum * Math.pow(1 + annualReturn/100, years)
      const lumpGain = lumpFV - lumpSum
      const combined = dcaFV + lumpFV - lumpSum
      return { dcaFV, totalContribs, dcaGain, lumpFV, lumpGain, combined }`,
  [
    { label:'DCA Final Portfolio Value',     k:'dcaFV',        cur:true },
    { label:'Total Amount Contributed',      k:'totalContribs',cur:true },
    { label:'Total Gain from DCA',           k:'dcaGain',      cur:true },
    { label:'Lump Sum Final Value',          k:'lumpFV',       cur:true },
    { label:'Lump Sum Gain',                 k:'lumpGain',     cur:true },
    { label:'Combined Strategy Value',       k:'combined',     cur:true },
  ],
  [
    { q:'What is dollar-cost averaging?', a:'Dollar-cost averaging (DCA) means investing a fixed dollar amount at regular intervals regardless of market price. When prices are low you buy more shares; when prices are high you buy fewer. This removes the stress of trying to time the market and results in a lower average cost per share over time compared to a single purchase at a random price.' },
    { q:'Is DCA better than lump sum investing?', a:'Academic research (including Vanguard studies) shows lump-sum investing outperforms DCA about two-thirds of the time in rising markets, because more money is invested earlier. However DCA wins in falling markets and dramatically reduces the risk of investing everything at a peak. For regular income investors, DCA via payroll deductions is the natural and practical approach.' },
    { q:'How do I start dollar-cost averaging?', a:'The easiest way is to automate contributions to your 401k (every paycheck is DCA), set up automatic monthly transfers to a brokerage index fund, or use apps like Fidelity, Vanguard, Schwab or Robinhood with automatic investing features. Target low-cost index funds (expense ratio under 0.10%) for best long-term results.' },
  ],
  [
    { href:'/investment-return-calculator',  icon:'📈', name:'Investment Return'  },
    { href:'/compound-interest',             icon:'💹', name:'Compound Interest'  },
    { href:'/retirement-calculator',         icon:'🌅', name:'Retirement'         },
    { href:'/savings-goal-calculator',       icon:'🎯', name:'Savings Goal'       },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 7. Personal Loan Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('personal-loan-calculator', page(
  'Personal Loan Calculator',
  'Calculate monthly payments, total interest and amortization for any personal loan.',
  '👤',
  [
    { s:'loanAmount',  label:'Loan Amount',           type:'range', min:500,   max:200000, step:500,  cur:true, def:15000 },
    { s:'rate',        label:'Annual Interest Rate',  type:'range', min:1,     max:36,     step:0.25, pct:true, def:11    },
    { s:'termMonths',  label:'Loan Term',             type:'select', def:36, opts:[{v:12,l:'12 mo'},{v:24,l:'24 mo'},{v:36,l:'36 mo'},{v:48,l:'48 mo'},{v:60,l:'60 mo'},{v:84,l:'84 mo'}] },
    { s:'originFee',   label:'Origination Fee',       type:'range', min:0,     max:5000,   step:50,   cur:true, def:300   },
  ],
  `      const r         = rate / 100 / 12
      const n         = termMonths
      const monthly   = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = monthly * n + originFee
      const totalInterest = monthly * n - loanAmount
      const trueAPR   = (() => {
        // Newton method to find APR including fee
        const netAmount = loanAmount - originFee
        let apr = rate / 100 / 12
        for (let i = 0; i < 100; i++) {
          const pv = monthly * (1 - Math.pow(1+apr,-n)) / apr
          const dpv = monthly * (Math.pow(1+apr,-n)*n/apr - (1-Math.pow(1+apr,-n))/(apr*apr))
          apr -= (pv - netAmount) / dpv
        }
        return (apr * 12 * 100).toFixed(2) + '%'
      })()
      return { monthly, totalInterest, totalPaid, trueAPR }`,
  [
    { label:'Monthly Payment',       k:'monthly',       cur:true  },
    { label:'Total Interest Cost',   k:'totalInterest', cur:true  },
    { label:'Total Loan Cost',       k:'totalPaid',     cur:true  },
    { label:'True APR (with fees)',  k:'trueAPR',       cur:false },
  ],
  [
    { q:'What is a good personal loan rate in 2026?', a:'Personal loan rates in 2026 range from about 7-8% for excellent credit (760+) to 30-36% for poor credit. The average across all borrowers is around 12-15%. Credit unions typically offer 2-3% lower rates than banks. To get the best rate: improve your credit score above 720, reduce existing debt, and compare at least 3-5 lenders before accepting an offer.' },
    { q:'Personal loan vs credit card for debt consolidation?', a:'Personal loans typically have lower rates (8-20%) than credit cards (18-29%) and a fixed payoff date, making them better for consolidation. Credit cards with 0% balance transfer offers (12-21 months) can be cheaper for smaller balances you can pay off within the promo period. Personal loans win for larger balances or when you need more time.' },
    { q:'How does a personal loan affect my credit score?', a:'Short-term impact: the hard inquiry drops your score 5-10 points. Opening a new account reduces average account age, also slightly negative. Long-term impact: making on-time payments builds positive history and can improve your score significantly over 12-24 months. Paying off credit card debt with a personal loan also improves your credit utilization ratio.' },
  ],
  [
    { href:'/loan-comparison-calculator',   icon:'🔍', name:'Loan Comparison'   },
    { href:'/debt-consolidation-calculator',icon:'🔗', name:'Debt Consolidation' },
    { href:'/credit-card-payoff-calculator',icon:'💳', name:'Credit Card Payoff' },
    { href:'/apr-calculator',               icon:'📊', name:'APR Calculator'    },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 8. Credit Card Payoff Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('credit-card-payoff-calculator', page(
  'Credit Card Payoff Calculator',
  'See how long it takes to pay off credit card debt and how much interest you will pay.',
  '💳',
  [
    { s:'balance',      label:'Current Balance',               type:'range', min:100,  max:100000, step:100,  cur:true, def:8000  },
    { s:'apr',          label:'Credit Card APR',               type:'range', min:1,    max:36,     step:0.25, pct:true, def:24    },
    { s:'calcMode',     label:'Calculate By',                  type:'select', def:'payment', opts:[{v:'payment',l:'Fixed Monthly Payment'},{v:'months',l:'Target Payoff Date'}] },
    { s:'monthlyPmt',   label:'Monthly Payment Amount',        type:'range', min:10,   max:10000,  step:10,   cur:true, def:250   },
    { s:'targetMonths', label:'Target Months to Pay Off',      type:'range', min:1,    max:120,    step:1,    sfx:' mo', def:36   },
  ],
  `      const r = apr / 100 / 12
      let months, interest, payment
      if (calcMode === 'payment') {
        payment = monthlyPmt
        if (payment <= balance * r) return { months: 'Never (payment too low)', interest: 0, payment, minPayment: Math.ceil(balance * r * 1.01) }
        months = Math.ceil(-Math.log(1 - balance * r / payment) / Math.log(1 + r))
        interest = payment * months - balance
      } else {
        months = targetMonths
        payment = balance * r / (1 - Math.pow(1+r, -months))
        interest = payment * months - balance
      }
      const minPaymentOnly = balance * 0.02
      const minMonths = Math.ceil(-Math.log(1 - balance * r / minPaymentOnly) / Math.log(1 + r))
      const minInterest = minPaymentOnly * minMonths - balance
      return {
        months: months + ' months',
        interest: Math.round(interest),
        payment: Math.round(payment),
        minInterest: Math.round(minInterest),
        minMonths: minMonths + ' months'
      }`,
  [
    { label:'Months to Pay Off',              k:'months',     cur:false },
    { label:'Total Interest Paid',            k:'interest',   cur:true  },
    { label:'Required Monthly Payment',       k:'payment',    cur:true  },
    { label:'Minimum Payment Interest Cost',  k:'minInterest',cur:true  },
    { label:'Minimum Payment Payoff Time',    k:'minMonths',  cur:false },
  ],
  [
    { q:'How long does it take to pay off credit card debt paying minimum?', a:'Paying only the minimum (typically 2% of balance) on an $8,000 balance at 24% APR takes approximately 28 years and costs over $15,000 in interest — nearly double the original balance. Doubling your minimum payment can cut payoff time by 60-70% and save thousands in interest.' },
    { q:'What is the best strategy to pay off multiple credit cards?', a:'Two proven methods: Avalanche — pay minimums on all cards, put extra money toward the highest APR card first. Saves the most interest. Snowball — pay minimums on all, put extra toward the smallest balance first. Provides psychological wins and motivation. Both work; the best is the one you will stick with.' },
    { q:'Does paying off credit cards improve credit score?', a:'Yes, significantly. Credit utilization (balances divided by credit limits) accounts for 30% of your FICO score. Getting utilization below 30% improves scores noticeably; below 10% is ideal. Paying off a $8,000 balance on a $10,000 card takes utilization from 80% to 0% and can boost your score by 50-100+ points.' },
  ],
  [
    { href:'/debt-payoff-calculator',          icon:'🎯', name:'Debt Payoff'         },
    { href:'/debt-consolidation-calculator',   icon:'🔗', name:'Debt Consolidation'  },
    { href:'/personal-loan-calculator',        icon:'👤', name:'Personal Loan'       },
    { href:'/balance-transfer-calculator',     icon:'🔄', name:'Balance Transfer'    },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 9. Savings Interest Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('savings-interest-calculator', page(
  'Savings Interest Calculator',
  'Calculate exactly how much interest your savings account earns with compound interest.',
  '🏦',
  [
    { s:'principal',     label:'Initial Deposit',             type:'range', min:100,  max:1000000, step:100,  cur:true, def:10000 },
    { s:'monthlyAdd',    label:'Monthly Deposit',             type:'range', min:0,    max:10000,   step:50,   cur:true, def:500   },
    { s:'apy',           label:'Annual Percentage Yield (APY)', type:'range', min:0.01, max:10,    step:0.05, pct:true, def:4.75  },
    { s:'years',         label:'Time Period',                  type:'range', min:1,    max:30,      step:1,    sfx:' yrs', def:5  },
    { s:'compFreq',      label:'Compounding Frequency',        type:'select', def:12, opts:[{v:12,l:'Monthly'},{v:4,l:'Quarterly'},{v:365,l:'Daily'},{v:1,l:'Annually'}] },
  ],
  `      const r = apy / 100 / compFreq
      const n = years * compFreq
      const m = apy / 100 / 12
      const nm = years * 12
      // FV of principal
      const fvPrincipal = principal * Math.pow(1+r, n)
      // FV of monthly additions (compound at monthly rate)
      const fvMonthly   = monthlyAdd * (Math.pow(1+m, nm) - 1) / m
      const finalBalance = fvPrincipal + fvMonthly
      const totalDeposits = principal + monthlyAdd * 12 * years
      const interestEarned = finalBalance - totalDeposits
      const effectiveAPY  = (Math.pow(1 + apy/100/compFreq, compFreq) - 1) * 100
      return { finalBalance, totalDeposits, interestEarned, effectiveAPY: effectiveAPY.toFixed(3) + '%' }`,
  [
    { label:'Final Balance',          k:'finalBalance',   cur:true  },
    { label:'Total Deposited',        k:'totalDeposits',  cur:true  },
    { label:'Interest Earned',        k:'interestEarned', cur:true  },
    { label:'Effective APY',          k:'effectiveAPY',   cur:false },
  ],
  [
    { q:'What is a good savings account interest rate in 2026?', a:'In 2026 competitive high-yield savings accounts offer 4-5% APY. Traditional big-bank savings accounts average 0.01-0.5%. Online banks (Ally, Marcus, Discover, SoFi) and credit unions consistently offer 10-50x higher rates than brick-and-mortar banks. Always check current rates as they adjust with Fed policy changes.' },
    { q:'What is the difference between APY and APR for savings?', a:'APY (Annual Percentage Yield) includes the effect of compounding — it shows what you actually earn in a year. APR (Annual Percentage Rate) is the base rate without compounding. For savings, APY is always higher than APR (unless compounded annually). Always compare savings accounts using APY for an accurate apples-to-apples comparison.' },
    { q:'Is compound interest better daily or monthly?', a:'Daily compounding is slightly better than monthly, which is better than quarterly. However the difference is small at typical savings rates. At 5% APY: daily compounding earns $5,127 on $100,000 per year, monthly earns $5,116, quarterly earns $5,095, annually earns $5,000. The rate matters far more than the compounding frequency.' },
  ],
  [
    { href:'/compound-interest',      icon:'💹', name:'Compound Interest' },
    { href:'/cd-calculator',          icon:'🏦', name:'CD Calculator'     },
    { href:'/savings-goal-calculator',icon:'🎯', name:'Savings Goal'      },
    { href:'/emergency-fund-calculator',icon:'🛡️',name:'Emergency Fund'  },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 10. Investment Fee Impact Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('net-investment-fee-calculator', page(
  'Investment Fee Impact Calculator',
  'See how investment fees and expense ratios silently erode your long-term wealth.',
  '🔬',
  [
    { s:'initialInvest',  label:'Initial Investment',           type:'range', min:1000,  max:1000000, step:1000, cur:true, def:50000 },
    { s:'monthlyContrib', label:'Monthly Contribution',         type:'range', min:0,     max:10000,   step:50,   cur:true, def:500   },
    { s:'grossReturn',    label:'Gross Annual Return',          type:'range', min:1,     max:15,      step:0.25, pct:true, def:8     },
    { s:'feeRate',        label:'Annual Fee (expense ratio %)', type:'range', min:0,     max:2.5,     step:0.05, pct:true, def:0.8   },
    { s:'years',          label:'Investment Period',            type:'range', min:5,     max:50,      step:1,    sfx:' yrs', def:30  },
  ],
  `      const r1 = grossReturn / 100 / 12
      const r2 = (grossReturn - feeRate) / 100 / 12
      const n  = years * 12
      const fvGross = initialInvest * Math.pow(1+r1,n) + monthlyContrib * (Math.pow(1+r1,n)-1) / r1
      const fvNet   = initialInvest * Math.pow(1+r2,n) + monthlyContrib * (Math.pow(1+r2,n)-1) / r2
      const feeCost = fvGross - fvNet
      const feePct  = (feeCost / fvGross * 100).toFixed(1) + '%'
      const totalContribs = initialInvest + monthlyContrib * n
      return { fvGross, fvNet, feeCost, feePct, totalContribs }`,
  [
    { label:'Portfolio Without Fees',      k:'fvGross',      cur:true  },
    { label:'Portfolio With Fees',         k:'fvNet',        cur:true  },
    { label:'Total Fee Drag',              k:'feeCost',      cur:true  },
    { label:'Fees as % of Final Balance',  k:'feePct',       cur:false },
    { label:'Total Amount Contributed',    k:'totalContribs',cur:true  },
  ],
  [
    { q:'How much do investment fees really cost?', a:'Fees compound just like returns — in reverse. A 1% annual fee on a $50,000 portfolio growing at 8% over 30 years costs over $200,000 in lost wealth. That is money that would have compounded for you but instead went to the fund manager. This is why index funds with expense ratios of 0.03-0.10% are recommended over actively managed funds at 0.5-1.5%.' },
    { q:'What is an expense ratio and what is considered low?', a:'An expense ratio is the annual percentage of your invested assets charged by a mutual fund or ETF for management. Low: under 0.10% (Vanguard, Fidelity, Schwab index funds). Moderate: 0.10-0.50%. High: 0.50-1.5% (actively managed funds). Very high: over 1.5% (some annuities, actively managed niche funds). Always check the expense ratio before investing.' },
    { q:'Are higher fee funds worth it for better returns?', a:'Research consistently shows that higher fees do NOT reliably produce better returns. SPIVA data shows over 90% of actively managed funds underperform their benchmark index over 15 years, after fees. A few exceptional active managers exist but are nearly impossible to identify in advance. Most investors are best served by low-cost index funds.' },
  ],
  [
    { href:'/investment-return-calculator',      icon:'📈', name:'Investment Return'    },
    { href:'/retirement-calculator',             icon:'🌅', name:'Retirement'           },
    { href:'/dollar-cost-averaging-calculator',  icon:'🔁', name:'Dollar Cost Avg'      },
    { href:'/compound-interest',                 icon:'💹', name:'Compound Interest'    },
  ]
))

console.log(`
════════════════════════════════════════════════════
  STAGE 5 COMPLETE — 10 calculators created
════════════════════════════════════════════════════
   1.  /retirement-calculator
   2.  /social-security-calculator
   3.  /rmd-calculator
   4.  /investment-return-calculator
   5.  /portfolio-rebalancing-calculator
   6.  /dollar-cost-averaging-calculator
   7.  /personal-loan-calculator
   8.  /credit-card-payoff-calculator
   9.  /savings-interest-calculator
  10.  /net-investment-fee-calculator

  Deploy:
  git add .
  git commit -m "Stage 5: retirement and investing calculators"
  git push origin master:main
════════════════════════════════════════════════════
`)
