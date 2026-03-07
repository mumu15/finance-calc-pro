const ciScenarios = [
  {
    "slug": "10000-invested-10-years",
    "name": "$10,000 Invested for 10 Years",
    "principal": 10000,
    "rate": 8,
    "years": 10,
    "monthly": 0,
    "desc": "a lump sum investment held for a decade"
  },
  {
    "slug": "100-month-30-years",
    "name": "$100/Month for 30 Years",
    "principal": 0,
    "rate": 8,
    "years": 30,
    "monthly": 100,
    "desc": "consistent small monthly investing over a career"
  },
  {
    "slug": "500-month-20-years",
    "name": "$500/Month for 20 Years",
    "principal": 0,
    "rate": 8,
    "years": 20,
    "monthly": 500,
    "desc": "building serious wealth with monthly contributions"
  },
  {
    "slug": "1000-month-25-years",
    "name": "$1,000/Month for 25 Years",
    "principal": 0,
    "rate": 8,
    "years": 25,
    "monthly": 1000,
    "desc": "an aggressive savings strategy for early retirement"
  },
  {
    "slug": "50000-retirement",
    "name": "$50,000 Retirement Investment",
    "principal": 50000,
    "rate": 7,
    "years": 25,
    "monthly": 500,
    "desc": "growing retirement savings over 25 years"
  },
  {
    "slug": "college-fund-18-years",
    "name": "College Fund — 18 Years",
    "principal": 5000,
    "rate": 6,
    "years": 18,
    "monthly": 200,
    "desc": "growing a college fund from birth to enrollment"
  },
  {
    "slug": "sp500-average-return",
    "name": "S&P 500 Average Return Simulation",
    "principal": 25000,
    "rate": 10,
    "years": 30,
    "monthly": 500,
    "desc": "simulating the historical S&P 500 average return"
  },
  {
    "slug": "401k-growth",
    "name": "401k Growth Simulation",
    "principal": 10000,
    "rate": 7,
    "years": 30,
    "monthly": 800,
    "desc": "modeling long-term 401k account growth"
  },
  {
    "slug": "roth-ira-maxed",
    "name": "Maxed Roth IRA Over 30 Years",
    "principal": 0,
    "rate": 8,
    "years": 30,
    "monthly": 583,
    "desc": "maxing out your Roth IRA contribution annually"
  },
  {
    "slug": "hysa-1-year",
    "name": "High-Yield Savings Account",
    "principal": 10000,
    "rate": 4.5,
    "years": 1,
    "monthly": 500,
    "desc": "growing emergency fund in a HYSA"
  },
  {
    "slug": "millionaire-by-65",
    "name": "Millionaire by Age 65",
    "principal": 5000,
    "rate": 8,
    "years": 35,
    "monthly": 600,
    "desc": "the classic path to becoming a millionaire"
  },
  {
    "slug": "double-money",
    "name": "How Long to Double Your Money",
    "principal": 20000,
    "rate": 7,
    "years": 10,
    "monthly": 0,
    "desc": "visualizing the Rule of 72 in action"
  },
  {
    "slug": "inflation-impact",
    "name": "Inflation Impact on Savings",
    "principal": 50000,
    "rate": 2,
    "years": 20,
    "monthly": 0,
    "desc": "how inflation erodes purchasing power of cash savings"
  },
  {
    "slug": "cd-3-year",
    "name": "Certificate of Deposit — 3 Years",
    "principal": 25000,
    "rate": 5,
    "years": 3,
    "monthly": 0,
    "desc": "a 3-year CD at current rates"
  },
  {
    "slug": "bonds-10-year",
    "name": "Bond Portfolio — 10 Years",
    "principal": 50000,
    "rate": 4.5,
    "years": 10,
    "monthly": 200,
    "desc": "a conservative bond investment strategy"
  },
  {
    "slug": "real-estate-equity",
    "name": "Real Estate Equity Growth",
    "principal": 80000,
    "rate": 5,
    "years": 20,
    "monthly": 0,
    "desc": "equity appreciation in a real estate investment"
  },
  {
    "slug": "1000-invested-20",
    "name": "$1,000 Invested for 20 Years",
    "principal": 1000,
    "rate": 8,
    "years": 20,
    "monthly": 0,
    "desc": "the power of starting with just $1,000"
  },
  {
    "slug": "weekly-coffee-savings",
    "name": "Skip Coffee — Invest Instead",
    "principal": 0,
    "rate": 8,
    "years": 30,
    "monthly": 150,
    "desc": "investing your daily coffee budget instead"
  },
  {
    "slug": "crypto-high-risk",
    "name": "High-Risk Investment Scenario",
    "principal": 10000,
    "rate": 15,
    "years": 10,
    "monthly": 0,
    "desc": "a high-risk, high-return investment scenario"
  },
  {
    "slug": "low-risk-conservative",
    "name": "Conservative Investment (4%)",
    "principal": 100000,
    "rate": 4,
    "years": 20,
    "monthly": 500,
    "desc": "a low-risk conservative portfolio strategy"
  },
  {
    "slug": "tech-stock-simulation",
    "name": "Tech Stock Growth Simulation",
    "principal": 10000,
    "rate": 15,
    "years": 10,
    "monthly": 200,
    "desc": "simulating tech stock sector performance"
  },
  {
    "slug": "5000-gift-invested",
    "name": "$5,000 Gift Invested for Child",
    "principal": 5000,
    "rate": 8,
    "years": 18,
    "monthly": 50,
    "desc": "investing a gift for a newborn until age 18"
  },
  {
    "slug": "100k-milestone",
    "name": "Reaching $100,000 Milestone",
    "principal": 10000,
    "rate": 8,
    "years": 10,
    "monthly": 400,
    "desc": "the timeline to your first $100,000"
  },
  {
    "slug": "monthly-50-30-years",
    "name": "$50/Month for 30 Years",
    "principal": 0,
    "rate": 8,
    "years": 30,
    "monthly": 50,
    "desc": "the power of starting small and staying consistent"
  },
  {
    "slug": "emergency-fund-growth",
    "name": "Emergency Fund Growth in HYSA",
    "principal": 5000,
    "rate": 4.5,
    "years": 3,
    "monthly": 200,
    "desc": "growing an emergency fund in high-yield savings"
  },
  {
    "slug": "inheritance-invested",
    "name": "$25,000 Inheritance Invested",
    "principal": 25000,
    "rate": 8,
    "years": 20,
    "monthly": 0,
    "desc": "investing an inheritance windfall for the long term"
  },
  {
    "slug": "401k-employer-match",
    "name": "401k With Employer Match",
    "principal": 0,
    "rate": 7,
    "years": 30,
    "monthly": 1200,
    "desc": "modeling 401k growth with full employer match"
  },
  {
    "slug": "529-college-plan",
    "name": "529 College Savings Plan",
    "principal": 1000,
    "rate": 6,
    "years": 18,
    "monthly": 250,
    "desc": "a 529 plan growing for 18 years to fund college"
  },
  {
    "slug": "quarterly-compound",
    "name": "Quarterly Compounding vs Monthly",
    "principal": 20000,
    "rate": 6,
    "years": 15,
    "monthly": 200,
    "desc": "comparing quarterly vs monthly compounding frequency"
  },
  {
    "slug": "dividend-reinvestment",
    "name": "Dividend Reinvestment (DRIP)",
    "principal": 20000,
    "rate": 9,
    "years": 20,
    "monthly": 200,
    "desc": "reinvesting dividends for accelerated compounding"
  },
  {
    "slug": "10-year-to-retire",
    "name": "10 Years to Retirement Sprint",
    "principal": 100000,
    "rate": 8,
    "years": 10,
    "monthly": 2000,
    "desc": "aggressive saving with 10 years until retirement"
  },
  {
    "slug": "side-hustle-investing",
    "name": "Side Hustle Investment Plan",
    "principal": 0,
    "rate": 8,
    "years": 10,
    "monthly": 500,
    "desc": "investing side income for wealth building"
  },
  {
    "slug": "house-fund-5-years",
    "name": "House Down Payment in 5 Years",
    "principal": 10000,
    "rate": 4.5,
    "years": 5,
    "monthly": 800,
    "desc": "aggressively saving for a house down payment"
  },
  {
    "slug": "1000-per-week-invested",
    "name": "$250/Week Invested for 20 Years",
    "principal": 0,
    "rate": 8,
    "years": 20,
    "monthly": 1083,
    "desc": "systematic weekly investing over a long horizon"
  },
  {
    "slug": "target-500k",
    "name": "Building to $500,000",
    "principal": 50000,
    "rate": 8,
    "years": 20,
    "monthly": 1000,
    "desc": "the roadmap to a half-million dollar portfolio"
  },
  {
    "slug": "lump-sum-vs-monthly",
    "name": "Lump Sum vs Monthly DCA",
    "principal": 50000,
    "rate": 8,
    "years": 20,
    "monthly": 0,
    "desc": "comparing lump sum investing vs dollar cost averaging"
  },
  {
    "slug": "teen-investor",
    "name": "Teen Investor Starting at 15",
    "principal": 500,
    "rate": 8,
    "years": 50,
    "monthly": 100,
    "desc": "the extraordinary impact of starting early at 15"
  },
  {
    "slug": "late-starter-50",
    "name": "Late Starter — Beginning at 50",
    "principal": 20000,
    "rate": 6,
    "years": 15,
    "monthly": 1500,
    "desc": "building wealth starting from age 50"
  },
  {
    "slug": "million-in-20-years",
    "name": "Million Dollars in 20 Years",
    "principal": 50000,
    "rate": 8,
    "years": 20,
    "monthly": 1500,
    "desc": "the aggressive plan to hit $1M in 20 years"
  },
  {
    "slug": "index-fund-etf",
    "name": "Index Fund / ETF Strategy",
    "principal": 10000,
    "rate": 9,
    "years": 25,
    "monthly": 500,
    "desc": "a total market index fund investment strategy"
  },
  {
    "slug": "biweekly-investing",
    "name": "Biweekly Paycheck Investing",
    "principal": 0,
    "rate": 8,
    "years": 30,
    "monthly": 500,
    "desc": "investing from every biweekly paycheck"
  },
  {
    "slug": "real-estate-vs-sp500",
    "name": "Real Estate vs S&P 500",
    "principal": 80000,
    "rate": 8,
    "years": 20,
    "monthly": 0,
    "desc": "comparing real estate equity vs stock market returns"
  },
  {
    "slug": "emergency-to-investing",
    "name": "Emergency Fund Overflow Strategy",
    "principal": 20000,
    "rate": 8,
    "years": 15,
    "monthly": 300,
    "desc": "investing excess cash once emergency fund is full"
  },
  {
    "slug": "savings-bond-ibond",
    "name": "I-Bond / Inflation-Linked Savings",
    "principal": 10000,
    "rate": 5,
    "years": 5,
    "monthly": 0,
    "desc": "I-Bond inflation-protected savings over 5 years"
  },
  {
    "slug": "kids-custodial-account",
    "name": "Custodial Investment Account",
    "principal": 5000,
    "rate": 8,
    "years": 18,
    "monthly": 100,
    "desc": "investing for a child in a UGMA/UTMA custodial account"
  },
  {
    "slug": "windfall-invested",
    "name": "$50,000 Windfall Investment",
    "principal": 50000,
    "rate": 8,
    "years": 20,
    "monthly": 0,
    "desc": "investing a sudden windfall like a bonus or inheritance"
  },
  {
    "slug": "pay-off-vs-invest",
    "name": "Pay Off Debt vs Invest Comparison",
    "principal": 0,
    "rate": 7,
    "years": 10,
    "monthly": 500,
    "desc": "the opportunity cost of debt payoff vs investing"
  },
  {
    "slug": "first-job-saving",
    "name": "First Job Savings Plan",
    "principal": 1000,
    "rate": 8,
    "years": 40,
    "monthly": 300,
    "desc": "starting to save and invest from your very first job"
  },
  {
    "slug": "5-year-sprint",
    "name": "5-Year Intensive Savings Sprint",
    "principal": 10000,
    "rate": 6,
    "years": 5,
    "monthly": 2000,
    "desc": "a focused 5-year push to reach a major financial goal"
  },
  {
    "slug": "fire-coastfire",
    "name": "Coast FIRE Strategy",
    "principal": 100000,
    "rate": 8,
    "years": 25,
    "monthly": 0,
    "desc": "letting compound growth do the work toward FIRE"
  }
]
module.exports = ciScenarios
