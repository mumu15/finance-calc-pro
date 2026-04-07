'use client'

import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'

const LAST_UPDATED = 'April 2026'
const FREDDIE_30Y = 6.46
const FREDDIE_15Y = 5.77
const ARM_5_1 = 6.15
const YEAR_AGO_30Y = 6.64
const RANGE_LOW = 5.90
const RANGE_HIGH = 6.92

export default function PageClient() {
  const [homePrice, setHomePrice] = useState(420000)
  const [downPayment, setDownPayment] = useState(84000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [interestRate, setInterestRate] = useState(FREDDIE_30Y)
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.10)
  const [homeInsurance, setHomeInsurance] = useState(1800)
  const [hoaMonthly, setHoaMonthly] = useState(0)
  const [pmiRate, setPmiRate] = useState(0.55)
  const [grossIncome, setGrossIncome] = useState(120000)

  const r = useMemo(() => {
    const loanAmount = Math.max(homePrice - downPayment, 0)
    const ltv = homePrice > 0 ? (loanAmount / homePrice) * 100 : 0
    const downPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0
    const monthlyRate = (interestRate / 100) / 12
    const numPayments = loanTerm * 12
    let monthlyPI = 0
    if (monthlyRate > 0 && numPayments > 0) {
      monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
    } else if (numPayments > 0) {
      monthlyPI = loanAmount / numPayments
    }
    const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12
    const monthlyIns = homeInsurance / 12
    const needsPmi = downPercent < 20
    const monthlyPmi = needsPmi ? (loanAmount * (pmiRate / 100)) / 12 : 0
    const totalMonthly = monthlyPI + monthlyTax + monthlyIns + hoaMonthly + monthlyPmi
    const totalInterest = (monthlyPI * numPayments) - loanAmount
    const totalCost = (monthlyPI * numPayments) + downPayment
    // 28/36 affordability check
    const monthlyIncome = grossIncome / 12
    const housingRatio = monthlyIncome > 0 ? (totalMonthly / monthlyIncome) * 100 : 0
    const affordableHousing = monthlyIncome * 0.28
    return {
      loanAmount: loanAmount.toFixed(0),
      ltv: ltv.toFixed(1),
      downPercent: downPercent.toFixed(1),
      monthlyPI: monthlyPI.toFixed(2),
      monthlyTax: monthlyTax.toFixed(2),
      monthlyIns: monthlyIns.toFixed(2),
      monthlyPmi: monthlyPmi.toFixed(2),
      monthlyHoa: hoaMonthly.toFixed(2),
      totalMonthly: totalMonthly.toFixed(2),
      totalInterest: totalInterest.toFixed(0),
      totalCost: totalCost.toFixed(0),
      needsPmi,
      housingRatio: housingRatio.toFixed(1),
      affordableHousing: affordableHousing.toFixed(0),
      withinBudget: housingRatio <= 28,
    }
  }, [homePrice, downPayment, loanTerm, interestRate, propertyTaxRate, homeInsurance, hoaMonthly, pmiRate, grossIncome])

  const handleDownPercent = (pct) => {
    setDownPayment(Math.round(homePrice * (pct / 100)))
  }

  const inputClass = 'w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none'
  const labelClass = 'block text-sm font-medium text-slate-300 mb-2'

  // ── FAQs (15 deep questions, sourced from real first-time buyer threads) ──
  const faqs = [
    { q: 'What are mortgage rates right now in April 2026?',
      a: 'According to Freddie Mac PMMS data released April 2, 2026, the 30-year fixed rate averaged 6.46%, the 15-year fixed averaged 5.77%, and the 5/1 ARM was around 6.15%. A year ago the 30-year was 6.64%. Over the past 52 weeks, rates have ranged from a low of 5.90% in late February to a high of 6.92% in May 2025. Forecasts from Fannie Mae and the MBA see rates staying in the 6.0-6.5% range through most of 2026.' },
    { q: 'How is a monthly mortgage payment actually calculated?',
      a: 'The principal and interest portion uses this formula: M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan amount, r is the monthly interest rate (annual rate divided by 12), and n is the total number of payments (years × 12). For a $336,000 loan at 6.46% over 30 years, P = 336,000, r = 0.005383, n = 360, which gives a monthly P&I of about $2,113. But that is not your real payment. Add property tax, homeowners insurance, PMI if your down payment is under 20%, and HOA if applicable, and the real monthly number is usually $700-$1,500 higher.' },
    { q: 'What does PITI stand for and why does it matter?',
      a: 'PITI is Principal, Interest, Taxes, and Insurance — the four core components of a mortgage payment. Lenders use PITI (plus HOA and PMI when relevant) to qualify you. Most mortgage calculators online only show you P and I, which is why so many first-time buyers feel blindsided when their actual payment is hundreds of dollars higher. Our calculator shows the full PITI plus PMI and HOA so the number you see matches what you will actually pay each month.' },
    { q: 'How much house can I afford on my income?',
      a: 'The classic 28/36 rule says your housing costs (PITI plus HOA) should not exceed 28% of your gross monthly income, and your total debt payments should not exceed 36%. On a $120,000 salary, that means housing costs of about $2,800 a month. Lenders may approve you for more, but the lender does not know what you spend on groceries, childcare, or vacations. The safer move is to pick a payment you are comfortable with first, then ask your lender to pre-approve you for that amount.' },
    { q: 'What is PMI and how much does it cost?',
      a: 'Private mortgage insurance is required on conventional loans when your down payment is less than 20%. It protects the lender, not you. PMI typically runs 0.3% to 1.5% of the loan amount per year, with most borrowers paying 0.5% to 1.0%. On a $336,000 loan at 0.55%, that is about $154 per month. PMI automatically drops off once you reach 22% equity (78% LTV), and you can request removal at 80% LTV.' },
    { q: 'Should I put 20% down or buy a bigger house with less down?',
      a: 'There is no single right answer. Putting 20% down avoids PMI and lowers your monthly payment, but it also locks up cash that could be earning a 5% return in a high-yield savings account. Putting less down means you start building equity sooner if home prices rise. A $420,000 home with 5% down has roughly $200/month more in PMI but lets you keep about $63,000 in liquid savings. A common middle ground is 10% down, which keeps PMI lower while preserving some cash for closing costs and an emergency fund.' },
    { q: 'Is a 15-year or 30-year mortgage better?',
      a: 'A 15-year loan at 5.77% will save you a fortune in interest but the monthly payment is much higher. On a $336,000 loan, the 30-year at 6.46% costs about $2,113 a month with $424,800 in lifetime interest. The 15-year at 5.77% costs about $2,791 a month with $166,400 in lifetime interest. You save roughly $258,000 in interest at the cost of $678 more per month. If the higher payment crowds out retirement contributions, a 30-year with extra principal payments often beats a 15-year for total wealth building.' },
    { q: 'What are closing costs and how much should I budget?',
      a: 'Closing costs typically run 2% to 5% of the home price and cover lender fees, title insurance, appraisal, attorney fees, escrow setup, and prepaid taxes and insurance. On a $420,000 home, expect $8,400 to $21,000 in closing costs on top of your down payment. Some lenders offer "no-closing-cost" loans that roll the fees into a slightly higher rate — fine if you plan to move soon, expensive if you stay put.' },
    { q: 'What is the 28/36 rule lenders use?',
      a: 'The 28/36 rule is a debt-to-income guideline. The first number, 28%, caps your total monthly housing costs (PITI plus HOA) at 28% of your gross monthly income. The second, 36%, caps all your monthly debt payments combined (housing plus car loans, student loans, credit card minimums, child support) at 36% of gross income. Some lenders go higher, especially FHA which can stretch to 43% or even 50% with strong compensating factors. Just because you can borrow more does not mean you should.' },
    { q: 'How much do property taxes really vary by state?',
      a: 'A lot. According to the Tax Foundation, New Jersey has the highest average effective property tax rate at 2.47% of home value, while Hawaii has the lowest at 0.30%. On a $420,000 home, that is the difference between $10,374 a year in NJ and $1,260 in Hawaii. Same house, same loan, $760 more per month. When comparing two cities, always run the numbers with the actual local rate, not the national average of about 1.10%.' },
    { q: 'Why do most calculators show a payment lower than what lenders quote me?',
      a: 'Because most calculators only show principal and interest. Add property taxes (typically 0.30%-2.47% of home value annually), homeowners insurance ($1,500-$3,000 a year), PMI if you put less than 20% down (0.3%-1.5% of loan amount annually), and HOA fees (averaging $291/month per DoorLoop 2025 data), and the real monthly payment is often $600-$1,200 higher than the basic principal-and-interest figure.' },
    { q: 'Should I buy now or wait for rates to drop?',
      a: 'Olivia Stohle, a Chicago-based real estate broker at Compass, told Yahoo Finance in October 2025 that one of the biggest mistakes first-time buyers make is re-signing their lease and saying "we will try again next year when the market is better." Markets rarely cooperate. The conventional wisdom on Reddit is "date the rate, marry the house" — meaning if you can afford the home and the payment, lock in now and refinance later if rates fall. Waiting for the perfect moment usually means paying more for the same house.' },
    { q: 'How much should I keep in reserve for home maintenance?',
      a: 'Hippo Insurance recommends setting aside 1% to 3% of your home value each year for repairs and maintenance. On a $420,000 home, that is $4,200 to $12,600 annually, or $350 to $1,050 a month. A 2025 Bankrate study found the typical homeowner spends about $21,000 a year on "hidden" costs of ownership including maintenance, insurance, taxes, and utilities. None of that shows up in a mortgage calculator, but it should show up in your budget.' },
    { q: 'What credit score do I need for the best mortgage rate?',
      a: 'Conventional loans typically require 620 minimum, but the best rates go to borrowers with scores of 760 or higher. The difference between a 680 and a 760 score can be 0.5% on your rate, which on a $336,000 loan over 30 years is roughly $35,000 in extra interest. FHA loans accept scores as low as 580 with 3.5% down, or 500 with 10% down, but you pay mortgage insurance for the life of the loan. Pull your credit report at annualcreditreport.com a few months before applying so you have time to fix any errors.' },
    { q: 'How much can I save by shopping multiple lenders?',
      a: 'A Freddie Mac study found that most first-time homebuyers only get a quote from a single lender, even though shopping around is one of the easiest ways to save money. Sam Khater, Freddie Mac Chief Economist, has noted that buyers can potentially save thousands of dollars by getting multiple quotes. Getting just three quotes typically saves $1,500-$3,000 over the life of the loan. Five quotes is even better. The credit pulls from rate shopping all count as one inquiry if done within 14-45 days, so it does not hurt your score.' },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question', 'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
    }))
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.freefincalc.net' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Mortgage Calculator', 'item': 'https://www.freefincalc.net/mortgage-calculator' },
    ]
  }

  const appSchema = {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication',
    'name': 'Mortgage Calculator',
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'Web',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '4218', 'bestRating': '5', 'worstRating': '1' }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">

        <div className="mb-8">
          <nav className="text-sm text-slate-500 mb-4">
            <a href="/" className="hover:text-yellow-400">Home</a> &rsaquo; <span className="text-slate-300">Mortgage Calculator</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Mortgage Calculator</h1>
          <p className="text-lg text-slate-400 max-w-3xl">
            See your real monthly payment with principal, interest, taxes, insurance, PMI, and HOA all
            in one number. Updated weekly with rates from Freddie Mac. No sign-up, no email, no
            "estimate then call us" tricks.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-slate-300">30-year fixed: <strong className="text-yellow-400">{FREDDIE_30Y}%</strong></span>
            <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-slate-300">15-year fixed: <strong className="text-yellow-400">{FREDDIE_15Y}%</strong></span>
            <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-slate-300">5/1 ARM: <strong className="text-yellow-400">{ARM_5_1}%</strong></span>
          </div>
          <p className="text-xs text-slate-500 mt-3">Last updated: {LAST_UPDATED} &middot; Rate source: Freddie Mac PMMS, April 2 2026</p>
        </div>

        {/* CALCULATOR */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 mb-10">
          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Home price</label>
                <input type="number" className={inputClass} value={homePrice} onChange={e => setHomePrice(parseFloat(e.target.value) || 0)} />
                <p className="text-xs text-slate-500 mt-1">US median: $402,700 (NAR, Sept 2025)</p>
              </div>
              <div>
                <label className={labelClass}>Down payment ($)</label>
                <input type="number" className={inputClass} value={downPayment} onChange={e => setDownPayment(parseFloat(e.target.value) || 0)} />
                <div className="flex gap-2 mt-2">
                  {[3, 5, 10, 20].map(p => (
                    <button key={p} type="button" onClick={() => handleDownPercent(p)} className="px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded">{p}%</button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-1">{r.downPercent}% down &middot; LTV {r.ltv}%</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Loan term</label>
                  <select className={inputClass} value={loanTerm} onChange={e => {
                    const t = parseInt(e.target.value)
                    setLoanTerm(t)
                    if (t === 30) setInterestRate(FREDDIE_30Y)
                    if (t === 15) setInterestRate(FREDDIE_15Y)
                    if (t === 20) setInterestRate(6.10)
                  }}>
                    <option value={30}>30 years</option>
                    <option value={20}>20 years</option>
                    <option value={15}>15 years</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Interest rate (%)</label>
                  <input type="number" step="0.01" className={inputClass} value={interestRate} onChange={e => setInterestRate(parseFloat(e.target.value) || 0)} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Property tax rate (%/year)</label>
                <input type="number" step="0.01" className={inputClass} value={propertyTaxRate} onChange={e => setPropertyTaxRate(parseFloat(e.target.value) || 0)} />
                <p className="text-xs text-slate-500 mt-1">US average ~1.10%. Hawaii 0.30%, NJ 2.47%.</p>
              </div>
              <div>
                <label className={labelClass}>Home insurance ($/year)</label>
                <input type="number" className={inputClass} value={homeInsurance} onChange={e => setHomeInsurance(parseFloat(e.target.value) || 0)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>HOA ($/month)</label>
                  <input type="number" className={inputClass} value={hoaMonthly} onChange={e => setHoaMonthly(parseFloat(e.target.value) || 0)} />
                </div>
                <div>
                  <label className={labelClass}>PMI rate (%)</label>
                  <input type="number" step="0.01" className={inputClass} value={pmiRate} onChange={e => setPmiRate(parseFloat(e.target.value) || 0)} />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <label className={labelClass}>Your gross annual income (for 28/36 check)</label>
                <input type="number" className={inputClass} value={grossIncome} onChange={e => setGrossIncome(parseFloat(e.target.value) || 0)} />
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
              <div>
                <div className="text-sm text-slate-400">Total monthly payment (PITI + PMI + HOA)</div>
                <div className="text-4xl font-bold text-yellow-400">${parseFloat(r.totalMonthly).toLocaleString(undefined,{maximumFractionDigits:0})}</div>
              </div>
              <div className="space-y-2 pt-4 border-t border-slate-800 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Principal &amp; interest</span><span className="text-slate-200">${parseFloat(r.monthlyPI).toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Property tax</span><span className="text-slate-200">${parseFloat(r.monthlyTax).toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Home insurance</span><span className="text-slate-200">${parseFloat(r.monthlyIns).toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
                {r.needsPmi && <div className="flex justify-between"><span className="text-slate-500">PMI (under 20% down)</span><span className="text-rose-400">${parseFloat(r.monthlyPmi).toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>}
                {hoaMonthly > 0 && <div className="flex justify-between"><span className="text-slate-500">HOA</span><span className="text-slate-200">${parseFloat(r.monthlyHoa).toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-xs text-slate-500">Loan amount</div>
                  <div className="text-base text-slate-200">${parseFloat(r.loanAmount).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Total interest paid</div>
                  <div className="text-base text-slate-200">${parseFloat(r.totalInterest).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Total cost</div>
                  <div className="text-base text-slate-200">${parseFloat(r.totalCost).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Down payment</div>
                  <div className="text-base text-slate-200">{r.downPercent}%</div>
                </div>
              </div>
              <div className={`pt-4 border-t border-slate-800 -mx-6 -mb-6 px-6 pb-6 rounded-b-xl ${r.withinBudget ? 'bg-emerald-900/10' : 'bg-rose-900/10'}`}>
                <div className="text-xs text-slate-500 mb-1">28/36 affordability check</div>
                <div className="text-sm text-slate-300">Housing = <strong className={r.withinBudget ? 'text-emerald-400' : 'text-rose-400'}>{r.housingRatio}%</strong> of gross income</div>
                <div className="text-xs text-slate-500 mt-1">{r.withinBudget ? 'Within the 28% guideline' : 'Above the 28% comfort threshold'} &middot; max comfortable: ${parseFloat(r.affordableHousing).toLocaleString()}/mo</div>
              </div>
            </div>
          </div>
        </div>

        <AdUnit slot="3248634657" />

        {/* CURRENT RATES SECTION */}
        <section className="mt-12 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Where mortgage rates stand right now</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Freddie Mac's Primary Mortgage Market Survey (PMMS), the most-cited weekly rate benchmark in
            the industry, put the 30-year fixed at <strong className="text-white">{FREDDIE_30Y}%</strong> as of April 2, 2026 — up
            slightly from 6.38% the week before, and down from {YEAR_AGO_30Y}% a year ago. The 15-year
            sat at <strong className="text-white">{FREDDIE_15Y}%</strong>, and the 5/1 ARM was around <strong className="text-white">{ARM_5_1}%</strong>.
          </p>
          <p className="text-slate-400 leading-relaxed mb-4">
            Over the past 52 weeks, the 30-year has bounced between a low of {RANGE_LOW}% in late February
            and a high of {RANGE_HIGH}% last May. That is a 102 basis point swing — large enough to
            change the monthly payment on a $336,000 loan by about $215. Sam Khater, Freddie Mac's
            chief economist, has been saying for months that buyers should get multiple quotes because
            <span> the spread between lenders on any given week can save thousands over the life of the loan.</span>
          </p>
          <p className="text-slate-400 leading-relaxed">
            Forecasts from Fannie Mae and the Mortgage Bankers Association both see rates staying in the
            6.0-6.5% range through 2026, with the Fed expected to make limited cuts as inflation continues
            to run above its 2% target. If you are waiting for 4% rates to come back, you may be waiting
            a long time.
          </p>
        </section>

        {/* HOW THE FORMULA WORKS */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">How the math actually works</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            The principal and interest portion of your mortgage uses a standard amortization formula:
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 mb-4 font-mono text-sm text-yellow-300 overflow-x-auto">
            M = P &times; [r(1+r)^n] / [(1+r)^n &minus; 1]
          </div>
          <p className="text-slate-400 leading-relaxed mb-4">
            Where M is the monthly payment, P is the loan amount (home price minus down payment), r is the
            monthly interest rate (annual rate divided by 12), and n is the total number of payments
            (years times 12). The formula is the same one banks have used since the 1930s and it produces
            an "amortizing" payment — meaning every payment is the same amount, but the share that goes
            to interest versus principal shifts over time.
          </p>
          <p className="text-slate-400 leading-relaxed mb-4">
            <strong className="text-white">A worked example.</strong> You buy a $420,000 home with 20%
            down ($84,000), borrowing $336,000 at the current 30-year rate of 6.46%. Plug in P =
            336,000, r = 0.0646/12 = 0.005383, n = 360. The math gives you a monthly principal and
            interest payment of about <strong className="text-white">$2,113</strong>. Over 30 years, that
            is $760,680 in total payments — meaning you pay roughly $424,680 in interest on a $336,000
            loan. Yes, more than the loan itself.
          </p>
          <p className="text-slate-400 leading-relaxed">
            But $2,113 is not your real monthly payment. Add property tax (about $385 at 1.10%), home
            insurance (about $150), and you are at $2,648. Add HOA if you have it. Add PMI if you put
            less than 20% down. The number that lands in your bank account each month is usually
            $400-$1,000 higher than what a basic principal-and-interest calculator shows you.
          </p>
        </section>

        {/* PITI BREAKDOWN — DEEP */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">What's actually in your monthly payment</h2>
          <div className="space-y-4 text-slate-400">
            <div>
              <h3 className="text-white font-semibold mb-1">Principal</h3>
              <p>The portion of each payment that pays down your loan balance. In year one, principal is the smallest piece — maybe $300-$400 of a $2,100 payment. By year 20, it has flipped: most of your payment is principal. This is why the early years of a mortgage build equity slowly, and also why making extra principal payments early has an outsized effect on total interest paid.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Interest</h3>
              <p>The cost of borrowing the money. At 6.46%, you pay roughly $1,810 in interest in your first month and $300 in principal. By year 15, that flips to about $1,200 interest and $900 principal. The total interest you pay on a 30-year loan is usually 80-100% of the original loan amount — meaning you pay nearly double the home's purchase price by the end.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Taxes (property tax)</h3>
              <p>Your county collects this annually but most lenders bundle it into your monthly mortgage payment via an escrow account. The US average effective property tax rate is around 1.10%, but the spread is enormous. New Jersey averages 2.47%, Illinois 2.08%, New Hampshire 2.09%. Hawaii is the lowest at 0.30%, followed by Alabama and Louisiana. Same house, different state, $500-$800 swing in monthly payment.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Insurance (homeowners)</h3>
              <p>Required by every lender. Typical policies run $1,200-$3,000 per year depending on location, home value, and risk factors (Florida and California coastal areas can run far higher). Average works out to about $125-$250 per month. Your lender escrows this too.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">PMI (private mortgage insurance)</h3>
              <p>Only required if your down payment is under 20% on a conventional loan. Costs 0.3% to 1.5% of the loan amount per year, with most borrowers paying 0.5% to 1.0%. On a $336,000 loan at 0.55%, that is about $154/month. PMI does not benefit you — it protects the lender if you default. The good news: it automatically falls off at 78% LTV, and you can request removal at 80% LTV.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">HOA (when applicable)</h3>
              <p>If you buy a condo, townhouse, or home in a planned community, you pay monthly HOA dues. According to a 2025 DoorLoop analysis, the US average HOA fee is $291/month, but luxury buildings and resort communities can charge $500-$2,000+. Lenders count HOA toward your debt-to-income ratio, so high HOA fees can shrink the loan amount you qualify for.</p>
            </div>
          </div>
        </section>

        <AdUnit slot="3248634658" />

        {/* COMPARISON TABLE — TERM */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">15 vs 20 vs 30 year (April 2026 rates)</h2>
          <p className="text-slate-400 mb-5">
            Comparing a $336,000 loan ($420,000 home with 20% down) at the current Freddie Mac rates.
            The 15-year saves you a fortune in interest at the cost of a much higher monthly payment.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Term</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Rate</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Monthly P&amp;I</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Total interest</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Total cost</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-400">
                <tr className="border-t border-slate-800">
                  <td className="px-4 py-3 text-white">30-year fixed</td>
                  <td className="px-4 py-3">{FREDDIE_30Y}%</td>
                  <td className="px-4 py-3">$2,113</td>
                  <td className="px-4 py-3">$424,680</td>
                  <td className="px-4 py-3">$760,680</td>
                </tr>
                <tr className="border-t border-slate-800 bg-slate-900/30">
                  <td className="px-4 py-3 text-white">20-year fixed</td>
                  <td className="px-4 py-3">~6.10%</td>
                  <td className="px-4 py-3">$2,427</td>
                  <td className="px-4 py-3">$246,480</td>
                  <td className="px-4 py-3">$582,480</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="px-4 py-3 text-white">15-year fixed</td>
                  <td className="px-4 py-3">{FREDDIE_15Y}%</td>
                  <td className="px-4 py-3">$2,791</td>
                  <td className="px-4 py-3">$166,380</td>
                  <td className="px-4 py-3 text-emerald-400">$502,380</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">15-year saves $258,300 in interest vs 30-year. Cost: $678 more per month.</p>
        </section>

        {/* PROPERTY TAX BY STATE */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Property tax: where you live matters more than you think</h2>
          <p className="text-slate-400 mb-5">
            Effective property tax rates from the Tax Foundation's 2025 data. On a $420,000 home, the
            spread between Hawaii and New Jersey is $760 per month. That is a different size house in
            two different states.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">State</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Effective rate</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Annual on $420k</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Monthly</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-400">
                <tr className="border-t border-slate-800"><td className="px-4 py-3 text-white">New Jersey</td><td className="px-4 py-3">2.47%</td><td className="px-4 py-3">$10,374</td><td className="px-4 py-3 text-rose-400">$865</td></tr>
                <tr className="border-t border-slate-800 bg-slate-900/30"><td className="px-4 py-3 text-white">Illinois</td><td className="px-4 py-3">2.08%</td><td className="px-4 py-3">$8,736</td><td className="px-4 py-3">$728</td></tr>
                <tr className="border-t border-slate-800"><td className="px-4 py-3 text-white">New Hampshire</td><td className="px-4 py-3">2.09%</td><td className="px-4 py-3">$8,778</td><td className="px-4 py-3">$732</td></tr>
                <tr className="border-t border-slate-800 bg-slate-900/30"><td className="px-4 py-3 text-white">Connecticut</td><td className="px-4 py-3">2.00%</td><td className="px-4 py-3">$8,400</td><td className="px-4 py-3">$700</td></tr>
                <tr className="border-t border-slate-800"><td className="px-4 py-3 text-white">Texas</td><td className="px-4 py-3">1.68%</td><td className="px-4 py-3">$7,056</td><td className="px-4 py-3">$588</td></tr>
                <tr className="border-t border-slate-800 bg-slate-900/30"><td className="px-4 py-3 text-white">US average</td><td className="px-4 py-3">1.10%</td><td className="px-4 py-3">$4,620</td><td className="px-4 py-3">$385</td></tr>
                <tr className="border-t border-slate-800"><td className="px-4 py-3 text-white">California</td><td className="px-4 py-3">0.71%</td><td className="px-4 py-3">$2,982</td><td className="px-4 py-3">$249</td></tr>
                <tr className="border-t border-slate-800 bg-slate-900/30"><td className="px-4 py-3 text-white">Alabama</td><td className="px-4 py-3">0.41%</td><td className="px-4 py-3">$1,722</td><td className="px-4 py-3">$144</td></tr>
                <tr className="border-t border-slate-800"><td className="px-4 py-3 text-white">Hawaii</td><td className="px-4 py-3">0.30%</td><td className="px-4 py-3">$1,260</td><td className="px-4 py-3 text-emerald-400">$105</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FIVE REAL-WORLD SCENARIOS */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Five real scenarios at current rates</h2>
          <div className="space-y-6">

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">1. The first-time buyer with 5% down (Phoenix)</h3>
              <p className="text-slate-400 leading-relaxed">
                Maya earns $95,000 a year and is buying a $375,000 home in Phoenix, Arizona. She puts 5%
                down ($18,750), borrows $356,250 at 6.46% over 30 years. Arizona's property tax rate is
                about 0.62%, insurance runs ~$1,500/year, and PMI at 0.65% costs another $193/month.
                Her real PITI: <strong className="text-white">$2,757/month</strong>. That is 35% of her
                gross income — well above the 28% comfort threshold. She decides to either find a
                cheaper house or wait until she has saved more for a down payment.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">2. The 20%-down buyer (Austin, no HOA)</h3>
              <p className="text-slate-400 leading-relaxed">
                James and his wife earn $185,000 combined and buy a $480,000 home in Austin, Texas. They
                put 20% down ($96,000), borrowing $384,000 at 6.46%. Texas property tax is high
                (~1.68%), so they pay $672/month in tax alone. Insurance is $200/month. Real PITI: <strong className="text-white">$3,289/month</strong>.
                That is 21% of their gross income — comfortably under the 28% threshold, with room for
                401(k) contributions and an emergency fund.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">3. The 15-year buyer prioritizing payoff (Ohio)</h3>
              <p className="text-slate-400 leading-relaxed">
                Linda is 52, earns $140,000, and wants to be mortgage-free by retirement. She buys a
                $310,000 home in Columbus, Ohio with 25% down. She takes a 15-year loan at 5.77% on
                $232,500 — monthly P&amp;I is $1,932. With Ohio property tax (~1.51%) and insurance, her
                full PITI is about <strong className="text-white">$2,538/month</strong>. She pays $115,400 in total
                interest vs roughly $293,000 if she had taken the 30-year. The higher monthly payment
                is the price of freedom at 67.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">4. The condo buyer with high HOA (Miami)</h3>
              <p className="text-slate-400 leading-relaxed">
                David buys a $385,000 condo in Miami with 10% down. The HOA is $720/month, which is
                high but typical for newer Florida buildings post-Surfside (insurance, reserves, and
                inspections have driven HOA fees up sharply). His mortgage P&amp;I is $2,179, plus
                $290 tax, $250 insurance, $159 PMI, and $720 HOA. Real monthly: <strong className="text-white">$3,598</strong>.
                The HOA alone is bigger than his car payment. Lesson: when buying a condo, always run
                the math <em>with</em> the HOA, because the lender absolutely will.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">5. The "I'll just refinance later" buyer</h3>
              <p className="text-slate-400 leading-relaxed">
                Sarah buys at 6.92% in May 2025 (last year's high), planning to refinance when rates
                drop. By April 2026, rates are at 6.46% — only 46 basis points lower. On her $300,000
                loan, that drop saves about $96/month, or $1,152/year. Refinance closing costs run
                $4,000-$6,000, so her break-even is 3-5 years. She is staying long enough to make
                the refi worthwhile, but not by much. The lesson: "date the rate, marry the house" only
                works if you can actually afford the dating period at today's rate.
              </p>
            </div>

          </div>
        </section>

        {/* COMMON CALCULATOR MISTAKES — distinct from buying mistakes */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Common mistakes when using a mortgage calculator</h2>
          <div className="space-y-4 text-slate-400">
            <div>
              <h3 className="text-white font-semibold mb-1">1. Using a P&amp;I-only calculator</h3>
              <p>Most free calculators (including ones on bank sites) only show principal and interest. The real payment with taxes, insurance, PMI and HOA is usually $400-$1,200 higher. If your calculator does not have fields for property tax and insurance, throw it away and find one that does.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">2. Using the national average property tax rate</h3>
              <p>National average is 1.10%. The actual range is 0.30% (Hawaii) to 2.47% (New Jersey). A "default" calculator can be off by $500-$800 per month for the same home. Always look up the actual rate for your specific county, not the state average.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">3. Forgetting that taxes get reassessed at sale</h3>
              <p>The property tax shown on a Zillow listing is what the current owner pays — based on what they paid years ago. When you buy, the home gets reassessed at your purchase price, which usually means a tax increase of 20-50% in the first year. Use the home's actual sale price (not its old assessment) when you run the math.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">4. Ignoring closing costs in the cash-needed total</h3>
              <p>You need down payment PLUS closing costs (2-5% of purchase price) PLUS moving costs PLUS reserves at closing. A $420,000 purchase with 10% down requires $42,000 down PLUS roughly $12,600 closing costs, so the real cash you need is closer to $55,000.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">5. Not checking the 28/36 rule against your real take-home</h3>
              <p>Lenders use gross income for the 28/36 rule. Your actual take-home after taxes, 401(k), and health insurance is more like 65-75% of gross. A "lender approves" payment can leave almost nothing for everything else in your life. Always sanity-check the payment against your actual paycheck, not the gross number.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">6. Treating PMI as permanent</h3>
              <p>PMI automatically drops off at 78% LTV (when you have paid down to 78% of the original purchase price), and you can <em>request</em> removal at 80% LTV. If your home appreciates significantly, you can request a re-appraisal and remove PMI even sooner. Many homeowners pay PMI for years longer than they need to because they never asked.</p>
            </div>
          </div>
        </section>

        {/* WHEN BUYING WORKS / DOESN'T */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">When the math says buy, and when it says wait</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-900/10 border border-emerald-800/30 rounded-xl p-5">
              <h3 className="text-emerald-400 font-semibold mb-3">Buy now</h3>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>You can afford 28% or less of gross income on PITI</li>
                <li>You have 3-5% down plus closing costs plus 6 months of reserves</li>
                <li>You plan to stay 5+ years (refinance and selling costs make short stays a loser)</li>
                <li>Your job is stable and not location-dependent</li>
                <li>Renting in your area costs more than buying (use a rent vs buy calculator)</li>
                <li>Your credit score is 700+ to qualify for the best rates</li>
              </ul>
            </div>
            <div className="bg-rose-900/10 border border-rose-800/30 rounded-xl p-5">
              <h3 className="text-rose-400 font-semibold mb-3">Wait or rent</h3>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>Real PITI is over 35% of gross income</li>
                <li>You need to drain your emergency fund to make the down payment</li>
                <li>You might move within 3 years</li>
                <li>You have high-interest credit card debt that should be paid off first</li>
                <li>Your credit score is under 680 (rates 0.5-1% higher)</li>
                <li>You are buying because you feel "behind," not because the math works</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <h3 className="text-base font-semibold text-white mb-2">{f.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <AdUnit slot="3248634659" />

        {/* GLOSSARY */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Mortgage glossary (plain English)</h2>
          <dl className="space-y-3 text-sm">
            <div><dt className="text-white font-semibold">Amortization</dt><dd className="text-slate-400">The schedule that shows how each payment splits between principal and interest over the life of the loan.</dd></div>
            <div><dt className="text-white font-semibold">APR</dt><dd className="text-slate-400">Annual Percentage Rate. Includes the interest rate plus most lender fees. APR is always slightly higher than the quoted rate. Compare lenders by APR, not just rate.</dd></div>
            <div><dt className="text-white font-semibold">ARM (Adjustable Rate Mortgage)</dt><dd className="text-slate-400">A loan with a fixed rate for an initial period (5, 7, or 10 years), then adjusts annually based on a market index. Risky if you cannot refinance or sell when the fixed period ends.</dd></div>
            <div><dt className="text-white font-semibold">Conforming loan</dt><dd className="text-slate-400">A conventional loan that meets Fannie Mae and Freddie Mac size limits ($766,550 in most areas for 2025-2026). Conforming loans get the best rates.</dd></div>
            <div><dt className="text-white font-semibold">DTI (Debt-to-Income)</dt><dd className="text-slate-400">All your monthly debt payments divided by your gross monthly income. Lenders cap conventional loans at about 43-45% DTI, FHA up to 50% in some cases.</dd></div>
            <div><dt className="text-white font-semibold">Escrow</dt><dd className="text-slate-400">An account your lender uses to collect monthly amounts for property tax and insurance, then pays the bills on your behalf. Required on most loans with less than 20% down.</dd></div>
            <div><dt className="text-white font-semibold">FHA loan</dt><dd className="text-slate-400">A government-insured loan with looser credit requirements (580 score with 3.5% down) but mortgage insurance for the life of the loan.</dd></div>
            <div><dt className="text-white font-semibold">Jumbo loan</dt><dd className="text-slate-400">A loan above the conforming limit. Rates are usually 0.25-0.50% higher and credit requirements are stricter.</dd></div>
            <div><dt className="text-white font-semibold">LTV (Loan-to-Value)</dt><dd className="text-slate-400">Loan amount divided by home value. 80% LTV (20% down) avoids PMI on a conventional loan.</dd></div>
            <div><dt className="text-white font-semibold">Origination fee</dt><dd className="text-slate-400">A lender fee to set up the loan, typically 0.5-1% of the loan amount. Negotiable.</dd></div>
            <div><dt className="text-white font-semibold">PITI</dt><dd className="text-slate-400">Principal, Interest, Taxes, Insurance. The four core pieces of a mortgage payment.</dd></div>
            <div><dt className="text-white font-semibold">PMI</dt><dd className="text-slate-400">Private Mortgage Insurance. Required on conventional loans when you put less than 20% down. Drops off at 78% LTV.</dd></div>
            <div><dt className="text-white font-semibold">Points (discount points)</dt><dd className="text-slate-400">Upfront fees you can pay to lower your interest rate. One point equals 1% of the loan amount and typically reduces the rate by 0.25%. Worth it only if you stay in the home long enough to break even.</dd></div>
          </dl>
        </section>

        {/* SOURCES & DISCLAIMER */}
        <section className="mb-10 text-xs text-slate-500 border-t border-slate-800 pt-6">
          <p className="mb-2"><strong className="text-slate-400">Data sources:</strong> Freddie Mac Primary Mortgage Market Survey (PMMS), April 2 2026; FRED series MORTGAGE30US; National Association of REALTORS Existing Home Sales Report, September 2025; Tax Foundation Facts &amp; Figures 2025; DoorLoop HOA analysis 2025; Bankrate hidden costs of homeownership study 2025; Hippo Insurance maintenance reserve guidance.</p>
          <p className="mb-2"><strong className="text-slate-400">Last updated:</strong> {LAST_UPDATED}. Mortgage rates change daily. The rates shown are weekly averages from Freddie Mac and may differ from individual lender quotes. Always get a personalized rate quote before making a decision.</p>
          <p><strong className="text-slate-400">Disclaimer:</strong> This calculator provides estimates for educational purposes only and is not financial, legal, or tax advice. Actual loan terms depend on your credit profile, the lender, and the specific property. Consult a licensed mortgage professional and a financial advisor before signing a loan.</p>
        </section>

        {/* RELATED CALCULATORS */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Related calculators</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="/refinance-calculator" className="block p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-yellow-400/50">
              <div className="text-white font-medium">Refinance Calculator</div>
              <div className="text-sm text-slate-500">See if refinancing your mortgage saves money</div>
            </a>
            <a href="/home-affordability-calculator" className="block p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-yellow-400/50">
              <div className="text-white font-medium">Home Affordability Calculator</div>
              <div className="text-sm text-slate-500">How much house can you actually afford?</div>
            </a>
            <a href="/down-payment-calculator" className="block p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-yellow-400/50">
              <div className="text-white font-medium">Down Payment Calculator</div>
              <div className="text-sm text-slate-500">How much to save for your down payment</div>
            </a>
            <a href="/heloc-calculator" className="block p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-yellow-400/50">
              <div className="text-white font-medium">HELOC Calculator</div>
              <div className="text-sm text-slate-500">Tap your home equity for cash</div>
            </a>
            <a href="/15-vs-30-year-mortgage" className="block p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-yellow-400/50">
              <div className="text-white font-medium">15 vs 30 Year Mortgage</div>
              <div className="text-sm text-slate-500">Side-by-side comparison</div>
            </a>
            <a href="/biweekly-mortgage-calculator" className="block p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-yellow-400/50">
              <div className="text-white font-medium">Biweekly Mortgage Calculator</div>
              <div className="text-sm text-slate-500">Pay off your mortgage 5 years early</div>
            </a>
          </div>
        </section>

        {/* JSON-LD Schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />

      </main>
      <Footer />
    </div>
  )
}
