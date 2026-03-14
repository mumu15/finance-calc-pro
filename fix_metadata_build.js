/**
 * FreeFinCalc.net — Fix Metadata Build Error
 * node fix_metadata_build.js
 *
 * Problem: add_metadata_all.js added "export { metadata } from './metadata'"
 * to 'use client' page.js files — Next.js 14 does not allow this.
 *
 * Fix: 
 *  1. Remove the bad export line from every page.js
 *  2. Move metadata into a per-route layout.js (server component)
 *     Next.js reads metadata from layout.js automatically — no 'use client'
 */

const fs   = require('fs')
const path = require('path')

const pages = [
  ['mortgage-calculator',           'Mortgage Calculator',           'Calculate monthly mortgage payments, total interest and amortization schedule. Free mortgage calculator for any loan amount and rate.'],
  ['amortization-calculator',       'Amortization Calculator',       'Generate a full amortization schedule showing every payment, interest and principal breakdown over the life of your loan.'],
  ['student-loan-calculator',       'Student Loan Calculator',       'Calculate student loan monthly payments, total interest and payoff timeline. Compare repayment plans and see how extra payments help.'],
  ['refinance-calculator',          'Refinance Calculator',          'Calculate if refinancing your mortgage saves money. See break-even point, monthly savings and total interest saved over the loan life.'],
  ['debt-to-income-calculator',     'Debt-to-Income Ratio Calculator','Calculate your debt-to-income (DTI) ratio to see if you qualify for a mortgage or loan. Know your DTI before applying.'],
  ['home-affordability-calculator', 'Home Affordability Calculator', 'Find out how much house you can afford based on income, debts and down payment. Free home affordability calculator.'],
  ['heloc-calculator',              'HELOC Calculator',              'Calculate your home equity line of credit limit, monthly payments and total borrowing capacity based on your home value.'],
  ['property-tax-calculator',       'Property Tax Calculator',       'Estimate annual property taxes for any home value and location. Calculate monthly escrow amounts and total tax burden.'],
  ['rent-vs-buy-calculator',        'Rent vs Buy Calculator',        'Compare the true cost of renting vs buying a home over time. See which option builds more wealth in your situation.'],
  ['emergency-fund-calculator',     'Emergency Fund Calculator',     'Calculate exactly how much you need in your emergency fund based on expenses and job stability. Know your target savings number.'],
  ['401k-calculator',               '401k Calculator',               'Calculate your 401k balance at retirement with employer match, contribution rates and compound growth over time.'],
  ['roth-ira-calculator',           'Roth IRA Calculator',           'Calculate tax-free Roth IRA growth and retirement income. See contribution limits and compare to traditional IRA.'],
  ['dividend-calculator',           'Dividend Calculator',           'Calculate dividend income, yield and annual earnings from your stock portfolio. Plan dividend reinvestment returns.'],
  ['stock-profit-calculator',       'Stock Profit Calculator',       'Calculate profit or loss on stock trades including commissions. See return on investment and annualized gain or loss.'],
  ['simple-interest-calculator',    'Simple Interest Calculator',    'Calculate simple interest on any loan or investment. Find principal, rate, time or interest amount instantly.'],
  ['apr-calculator',                'APR Calculator',                'Calculate the true Annual Percentage Rate (APR) on any loan including fees. Compare loan offers accurately with APR.'],
  ['interest-rate-calculator',      'Interest Rate Calculator',      'Find the interest rate on any loan given payment amount, principal and term. Reverse-calculate loan rates easily.'],
  ['paycheck-calculator',           'Paycheck Calculator',           'Calculate your take-home paycheck after federal tax, state tax, Social Security and Medicare deductions.'],
  ['raise-calculator',              'Raise Calculator',              'Calculate the dollar value of a salary raise, new annual pay and percentage increase. See how a raise affects take-home pay.'],
  ['tip-calculator',                'Tip Calculator',                'Calculate tip amount, total bill and split between multiple people for any restaurant or service. Free tip calculator.'],
  ['sales-tax-calculator',          'Sales Tax Calculator',          'Calculate sales tax amount and total price for any purchase. Look up rates by state and find the pre-tax price from total.'],
  ['vat-calculator',                'VAT Calculator',                'Calculate VAT (Value Added Tax) for any amount and rate. Add or remove VAT from prices for UK, EU and global transactions.'],
  ['currency-converter',            'Currency Converter',            'Convert between 40+ currencies with live exchange rates. Free currency converter for travel, business and international payments.'],
  ['payoff-vs-invest-calculator',   'Pay Off Debt vs Invest Calculator','Should you pay off debt or invest? Compare the financial impact of each strategy to make the optimal money decision.'],
  ['net-worth-calculator',          'Net Worth Calculator',          'Calculate your total net worth by adding assets and subtracting liabilities. Track wealth over time with our free calculator.'],
  ['payroll-tax-calculator',        'Payroll Tax Calculator',        'Calculate employer and employee payroll taxes including Social Security, Medicare, FUTA and SUTA for any wage.'],
  ['bond-yield-calculator',         'Bond Yield Calculator',         'Calculate bond yield to maturity, current yield and yield to call. Price bonds accurately with our free bond calculator.'],
  ['car-depreciation-calculator',   'Car Depreciation Calculator',   'Calculate how much your car depreciates each year and its future value. See total depreciation cost of any vehicle.'],
  ['home-equity-calculator',        'Home Equity Calculator',        'Calculate your current home equity, loan-to-value ratio and available equity for a HELOC or cash-out refinance.'],
  ['inflation-impact-calculator',   'Inflation Calculator',          'Calculate the impact of inflation on purchasing power over time. See what money will be worth in the future.'],
  ['profit-margin-calculator',      'Profit Margin Calculator',      'Calculate gross, operating and net profit margin for any business. Find markup percentage and break-even revenue.'],
  ['break-even-calculator',         'Break-Even Calculator',         'Calculate break-even point in units and revenue for your business. Find fixed costs, variable costs and contribution margin.'],
  ['roi-calculator',                'ROI Calculator',                'Calculate return on investment (ROI) for any business or personal investment. Compare investments with annualized ROI.'],
  ['freelance-rate-calculator',     'Freelance Rate Calculator',     'Calculate your minimum freelance hourly rate to meet income goals after taxes and expenses. Price your services correctly.'],
  ['business-valuation-calculator', 'Business Valuation Calculator', 'Estimate your business value using multiple methods: revenue multiple, EBITDA multiple and discounted cash flow.'],
  ['hourly-to-salary-calculator',   'Hourly to Annual Salary Calculator','Convert hourly wage to annual salary, monthly, weekly and daily pay. Calculate yearly income from any hourly rate.'],
  ['salary-after-tax-calculator',   'Salary After Tax Calculator',   'Calculate your exact take-home salary after all taxes. See federal tax, state tax, Social Security and Medicare breakdown.'],
  ['overtime-calculator',           'Overtime Calculator',           'Calculate overtime pay at 1.5x, 2x or custom rates. Find total weekly earnings and annual income with overtime hours.'],
  ['cost-of-living-calculator',     'Cost of Living Calculator',     'Compare cost of living between cities. See how much salary you need in a new city to maintain your current lifestyle.'],
  ['moving-cost-calculator',        'Moving Cost Calculator',        'Estimate total moving costs including movers, truck rental, packing and travel. Budget your relocation accurately.'],
  ['lease-vs-buy-calculator',       'Lease vs Buy Car Calculator',   'Compare the total cost of leasing vs buying a car over time. See which option saves more money for your situation.'],
  ['car-loan-calculator',           'Car Loan Calculator',           'Calculate monthly car loan payments, total interest and true cost of financing. Compare loan terms and down payments.'],
  ['fuel-cost-calculator',          'Fuel Cost Calculator',          'Calculate annual fuel costs for any vehicle based on MPG, miles driven and gas prices. Compare fuel economy savings.'],
  ['down-payment-calculator',       'Down Payment Calculator',       'Calculate how much to save for a down payment and how long it will take. See impact of different down payment amounts.'],
  ['mortgage-points-calculator',    'Mortgage Points Calculator',    'Calculate if buying mortgage discount points is worth it. Find break-even timeline and total interest savings.'],
  ['retirement-calculator',         'Retirement Calculator',         'Calculate how much you need to retire and if you are on track. Project retirement savings with contributions and growth.'],
  ['social-security-calculator',    'Social Security Calculator',    'Estimate your Social Security benefit at different retirement ages. See impact of claiming early vs waiting until 70.'],
  ['rmd-calculator',                'Required Minimum Distribution Calculator','Calculate your RMD amount for any age and account balance. Avoid IRS penalties with accurate RMD planning.'],
  ['investment-return-calculator',  'Investment Return Calculator',  'Calculate investment returns with compound growth, contributions and time. Project portfolio value over any horizon.'],
  ['portfolio-rebalancing-calculator','Portfolio Rebalancing Calculator','Calculate how to rebalance your investment portfolio to target allocations. See exact buy and sell amounts needed.'],
  ['dollar-cost-averaging-calculator','Dollar Cost Averaging Calculator','Calculate the benefits of dollar cost averaging vs lump sum investing. See average cost basis and total returns.'],
  ['personal-loan-calculator',      'Personal Loan Calculator',      'Calculate personal loan monthly payments, total interest and compare loan options. Find the best personal loan for you.'],
  ['credit-card-payoff-calculator', 'Credit Card Payoff Calculator', 'Calculate how long to pay off your credit card and total interest paid. Compare minimum payments vs fixed payments.'],
  ['savings-interest-calculator',   'Savings Interest Calculator',   'Calculate savings account interest earnings over time. Compare rates and see how compound interest grows your money.'],
  ['net-investment-fee-calculator', 'Investment Fee Calculator',     'Calculate the true cost of investment fees over time. See how expense ratios drain your retirement savings.'],
  ['budget-planner-calculator',     'Budget Planner Calculator',     'Create a monthly budget using the 50/30/20 rule. Calculate needs, wants and savings allocations for any income.'],
  ['rent-affordability-calculator', 'Rent Affordability Calculator', 'Calculate how much rent you can afford based on income. Use the 30% rule and see maximum rent for your salary.'],
  ['net-pay-calculator',            'Net Pay Calculator',            'Calculate your net pay after all deductions. See exactly what lands in your bank account each pay period.'],
  ['tax-refund-calculator',         'Tax Refund Calculator',         'Estimate your federal tax refund or amount owed. Calculate withholding adjustments to optimize your tax situation.'],
  ['child-tax-credit-calculator',   'Child Tax Credit Calculator',   'Calculate your Child Tax Credit amount for 2026. See eligibility, phase-out limits and maximum credit per child.'],
  ['estate-tax-calculator',         'Estate Tax Calculator',         'Calculate federal estate tax on inherited assets. Understand exemptions, rates and strategies to minimize estate taxes.'],
  ['gift-tax-calculator',           'Gift Tax Calculator',           'Calculate gift tax on transfers over the annual exclusion. Understand lifetime exemptions and gift tax filing requirements.'],
  ['rental-property-calculator',    'Rental Property Calculator',    'Calculate rental property cash flow, cap rate, cash-on-cash return and ROI. Analyze investment property deals accurately.'],
  ['cap-rate-calculator',           'Cap Rate Calculator',           'Calculate capitalization rate for any rental property. Use cap rate to compare and value investment properties.'],
  ['house-flipping-calculator',     'House Flipping Calculator',     'Calculate profit, ROI and costs for house flipping projects. Use the 70% rule to evaluate fix-and-flip deals.'],
  ['business-loan-calculator',      'Business Loan Calculator',      'Calculate business loan payments, total interest and true borrowing cost. Compare loan options for your small business.'],
  ['sba-loan-calculator',           'SBA Loan Calculator',           'Calculate SBA 7(a) and 504 loan payments, guarantee fees and total cost. Plan your small business SBA financing.'],
  ['accounts-receivable-calculator','Accounts Receivable Calculator','Calculate Days Sales Outstanding (DSO), AR turnover and carrying cost. Measure and improve your cash collection.'],
  ['cash-flow-calculator',          'Cash Flow Calculator',          'Calculate operating cash flow, free cash flow and cash runway for your business. Know your burn rate and financial health.'],
  ['working-capital-calculator',    'Working Capital Calculator',    'Calculate net working capital, current ratio and quick ratio. Measure your business liquidity and short-term health.'],
  ['debt-service-coverage-calculator','DSCR Calculator',             'Calculate Debt Service Coverage Ratio (DSCR) for business loans. See if your income covers loan payments for lender approval.'],
  ['employee-cost-calculator',      'Employee Cost Calculator',      'Calculate the true total cost of an employee including taxes, benefits and overhead. Know the real cost before hiring.'],
  ['startup-cost-calculator',       'Startup Cost Calculator',       'Estimate total startup costs, funding needed and months to break even. Plan your new business finances accurately.'],
  ['ecommerce-profit-calculator',   'Ecommerce Profit Calculator',   'Calculate net profit per order, ROAS and monthly store profit. Optimize your online store margins and ad spend.'],
  ['saas-metrics-calculator',       'SaaS Metrics Calculator',       'Calculate MRR, ARR, LTV, CAC ratio, churn impact and Rule of 40. Track the key metrics for SaaS business health.'],
  ['wedding-budget-calculator',     'Wedding Budget Calculator',     'Plan your wedding budget by category. Calculate cost per guest and allocate spending across venue, catering and more.'],
  ['vacation-budget-calculator',    'Vacation Budget Calculator',    'Plan your trip budget including flights, hotel, food and activities. Calculate total vacation cost per person and per day.'],
  ['baby-cost-calculator',          'Baby Cost Calculator',          'Estimate the first-year cost of having a baby including delivery, childcare and essentials. Plan your family finances.'],
  ['pet-cost-calculator',           'Pet Cost Calculator',           'Calculate annual and lifetime costs of owning a dog or cat. Estimate food, vet, grooming and insurance expenses.'],
  ['home-buying-cost-calculator',   'Home Buying Cost Calculator',   'Calculate all upfront and ongoing costs of buying a home beyond the down payment. Know the true total cost.'],
  ['debt-payoff-calculator',        'Debt Payoff Calculator',        'Calculate how long to pay off any debt and compare avalanche vs snowball strategies. See interest saved with extra payments.'],
  ['tax-calculator',                'Income Tax Calculator 2026',    'Calculate your 2026 federal income tax using current brackets. Find effective rate, marginal rate and tax owed.'],
  ['capital-gains-tax-calculator',  'Capital Gains Tax Calculator',  'Calculate short-term and long-term capital gains tax on stocks, real estate and other assets. Know your tax before selling.'],
  ['self-employment-tax-calculator','Self-Employment Tax Calculator', 'Calculate self-employment tax, quarterly estimated payments and deductions for freelancers and independent contractors.'],
  ['pension-calculator',            'Pension Calculator',            'Calculate defined benefit pension monthly payout and compare lump sum vs annuity options at retirement.'],
  ['annuity-calculator',            'Annuity Calculator',            'Calculate annuity payments, future value and present value for fixed annuities. Plan retirement income from annuities.'],
  ['life-insurance-calculator',     'Life Insurance Calculator',     'Calculate how much life insurance coverage you need to protect your family. Use the DIME method for accurate coverage.'],
  ['college-savings-calculator',    'College Savings Calculator (529)','Calculate monthly 529 plan contributions needed to cover future college costs. Plan for tuition inflation over time.'],
  ['car-affordability-calculator',  'Car Affordability Calculator',  'Calculate how much car you can afford using the 20/4/10 rule. Find maximum car price based on income and budget.'],
  ['home-improvement-loan-calculator','Home Improvement Loan Calculator','Compare home equity loan, HELOC and personal loan for renovations. Calculate payments and ROI on home improvements.'],
  ['solar-payback-calculator',      'Solar Panel Payback Calculator','Calculate solar panel payback period, ROI and lifetime savings. See federal tax credit impact and break-even timeline.'],
  ['invoice-calculator',            'Invoice Calculator',            'Calculate invoice totals with tax, discounts and late fees. Create accurate invoice amounts for any billing scenario.'],
  ['markup-calculator',             'Markup Calculator',             'Calculate selling price from cost and markup percentage. Find profit margin, monthly revenue and gross profit per unit.'],
  ['discount-calculator',           'Discount Calculator',           'Calculate sale price, savings amount and percentage off. Find final price after discount and sales tax for any purchase.'],
  ['loan-comparison-calculator',    'Loan Comparison Calculator',    'Compare two loans side by side on monthly payment, total interest and overall cost. Find the best loan offer instantly.'],
  ['biweekly-mortgage-calculator',  'Biweekly Mortgage Calculator',  'See how biweekly mortgage payments save interest and pay off your mortgage years early. Calculate total savings.'],
  ['extra-payment-calculator',      'Extra Mortgage Payment Calculator','Calculate interest savings and time saved from extra mortgage payments. See payoff date with any additional amount.'],
  ['cd-calculator',                 'CD Calculator',                 'Calculate Certificate of Deposit maturity value, interest earned and APY. Compare CD terms and find the best CD rates.'],
  ['savings-goal-calculator',       'Savings Goal Calculator',       'Calculate how long to reach any savings goal or monthly amount needed. Plan savings for any financial target.'],
  ['fire-calculator',               'FIRE Calculator',               'Calculate your Financial Independence Retire Early number and timeline. Find your FIRE number and years to freedom.'],
  ['debt-consolidation-calculator', 'Debt Consolidation Calculator', 'Calculate savings from consolidating multiple debts into one loan. See monthly savings and total interest reduction.'],
  ['balance-transfer-calculator',   'Balance Transfer Calculator',   'Calculate if a 0% balance transfer saves money vs keeping your current card. See net savings after transfer fee.'],
  ['insurance-calculator',          'Insurance Needs Calculator',    'Calculate how much life, disability and health insurance coverage you need. Know your insurance gaps and priorities.'],
  ['boat-loan-calculator',          'Boat Loan Calculator',          'Calculate monthly boat loan payments, total interest and annual ownership cost. Finance any boat with confidence.'],
  ['commission-calculator',         'Commission Calculator',         'Calculate commission earnings, gross monthly income and annual pay for any commission structure or sales quota.'],
  ['contractor-pay-calculator',     'Contractor Pay Calculator',     'Calculate contractor take-home pay after self-employment tax and expenses. Find equivalent employee salary comparison.'],
  ['credit-card-minimum-payment-calculator','Credit Card Minimum Payment Calculator','See how long minimum credit card payments take to pay off debt and total interest paid over time.'],
  ['credit-utilization-calculator', 'Credit Utilization Calculator', 'Calculate credit utilization ratio across all cards. See credit score impact and how much to pay down to reach 10%.'],
  ['debt-avalanche-calculator',     'Debt Avalanche Calculator',     'Pay debts in highest-interest order to minimize total interest. Calculate payoff timeline with the avalanche method.'],
  ['debt-payoff-time-calculator',   'Debt Payoff Time Calculator',   'Calculate exactly how long to pay off any debt at your current payment. Find minimum payment required to make progress.'],
  ['debt-snowball-calculator',      'Debt Snowball Calculator',      'Pay smallest debts first to build momentum. Calculate debt snowball payoff timeline and total interest paid.'],
  ['equipment-loan-calculator',     'Equipment Loan Calculator',     'Calculate equipment loan payments, total cost and Section 179 tax deduction. Finance business equipment accurately.'],
  ['fire-retirement-calculator',    'FIRE Retirement Age Calculator','Calculate your exact retirement age using the FIRE method. Find your Financial Independence number and target date.'],
  ['loan-interest-calculator',      'Loan Interest Calculator',      'Calculate total interest paid on any loan. Compare simple vs compound interest and see true cost of borrowing.'],
  ['loan-payment-calculator',       'Loan Payment Calculator',       'Calculate monthly loan payments for any amount, rate and term. See total interest and savings from extra payments.'],
  ['overtime-pay-calculator',       'Overtime Pay Calculator',       'Calculate overtime pay at time-and-a-half or double time. Find total weekly earnings and annual income with overtime.'],
  ['passive-income-calculator',     'Passive Income Calculator',     'Calculate how much you need invested to generate target passive income. Plan dividends, rental and investment income.'],
  ['portfolio-growth-calculator',   'Portfolio Growth Calculator',   'Project investment portfolio growth with contributions and compound returns. See nominal and inflation-adjusted value.'],
  ['retirement-savings-calculator', 'Retirement Savings Calculator', 'Calculate if you are on track for retirement. Project savings at retirement and see how much more you need to save.'],
  ['rv-loan-calculator',            'RV Loan Calculator',            'Calculate RV loan monthly payments, total interest and true ownership cost. Finance a motorhome or travel trailer.'],
  ['salary-to-hourly-calculator',   'Salary to Hourly Calculator',   'Convert annual salary to hourly rate based on hours worked. Calculate daily, weekly and monthly pay from salary.'],
  ['savings-growth-calculator',     'Savings Growth Calculator',     'See how savings grow over time with regular deposits and compound interest. Project account balance for any goal.'],
  ['total-debt-calculator',         'Total Debt Calculator',         'Add up all your debts and calculate debt-to-income ratio. See total interest burden and create a debt payoff plan.'],
  ['truck-loan-calculator',         'Truck Loan Calculator',         'Calculate truck loan payments, total interest and business tax deduction. Finance a pickup or commercial truck.'],
]

let fixed   = 0
let skipped = 0

for (const [route, title, description] of pages) {
  const pageFile   = path.join('app', route, 'page.js')
  const layoutFile = path.join('app', route, 'layout.js')
  const metaFile   = path.join('app', route, 'metadata.js')

  if (!fs.existsSync(pageFile)) { skipped++; continue }

  // ── Step 1: Remove bad export line from page.js ──────────────────────────
  let pageContent = fs.readFileSync(pageFile, 'utf8')
  const badLine = "export { metadata } from './metadata'\n"
  if (pageContent.includes(badLine)) {
    pageContent = pageContent.replace(badLine, '')
    fs.writeFileSync(pageFile, pageContent, 'utf8')
  }

  // ── Step 2: Delete stale metadata.js if exists ───────────────────────────
  if (fs.existsSync(metaFile)) {
    fs.unlinkSync(metaFile)
  }

  // ── Step 3: Create layout.js (server component — no 'use client') ────────
  if (!fs.existsSync(layoutFile)) {
    const layoutContent = `// app/${route}/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: '${title}',
  description: '${description}',
  alternates: {
    canonical: 'https://www.freefincalc.net/${route}',
  },
  openGraph: {
    title: '${title}',
    description: '${description}',
    url: 'https://www.freefincalc.net/${route}',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${title}',
    description: '${description}',
  },
}

export default function Layout({ children }) {
  return children
}
`
    fs.writeFileSync(layoutFile, layoutContent, 'utf8')
    fixed++
  } else {
    skipped++
  }
}

console.log(`
════════════════════════════════════════════════════
  METADATA BUILD ERROR FIXED
════════════════════════════════════════════════════
  ✅ Fixed  : ${fixed} pages
  ⏭️  Skipped: ${skipped}

  What was done per calculator:
  1. Removed bad "export { metadata }" from page.js
  2. Deleted stale metadata.js
  3. Created layout.js (server component) with:
     - Unique <title>
     - Unique <meta description>
     - Open Graph tags
     - Twitter card tags
     - Canonical URL

  Next.js 14 reads metadata from layout.js automatically.
  No 'use client' conflict.
════════════════════════════════════════════════════
`)
