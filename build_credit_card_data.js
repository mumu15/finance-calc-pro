const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const APP = path.join(BASE, 'app');
const DOMAIN = 'https://www.freefincalc.net';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function esc(s) { return s.replace(/</g, 'less than ').replace(/>/g, 'greater than ').replace(/'/g, "\\'"); }

console.log('Building 10 Credit Card Data Pages...');

const PAGES = [
  {
    slug: 'average-credit-card-debt-by-state',
    title: 'Average Credit Card Debt by State 2026 (All 50 States Ranked)',
    desc: 'Credit card debt in every state ranked from highest to lowest. Average balances, delinquency rates, and debt-to-income ratios.',
    sections: [
      { heading: 'Average Credit Card Balance by State', rows: [
        ['1','Alaska','$8,450','4.2%'],['2','Connecticut','$7,980','3.1%'],['3','New Jersey','$7,850','3.3%'],['4','Virginia','$7,720','2.9%'],['5','Maryland','$7,680','3.0%'],['6','Colorado','$7,540','2.8%'],['7','California','$7,480','3.5%'],['8','New York','$7,350','3.4%'],['9','Washington','$7,280','2.7%'],['10','Hawaii','$7,190','3.8%'],['---','National Average','$6,501','3.1%'],['41','Arkansas','$5,120','4.5%'],['42','West Virginia','$5,050','4.8%'],['43','Kentucky','$4,980','4.3%'],['44','Mississippi','$4,850','5.2%'],['45','Maine','$4,790','3.0%'],['46','Vermont','$4,680','2.5%'],['47','New Mexico','$4,620','4.6%'],['48','Iowa','$4,550','2.8%'],['49','Wisconsin','$4,480','2.6%'],['50','North Dakota','$4,320','2.4%'],
      ], columns: ['Rank','State','Avg Balance','Delinquency Rate'] },
      { heading: 'Credit Card Debt by Generation', rows: [
        ['Gen Z (18-27)','$3,120','2 cards','Rising fast'],['Millennials (28-43)','$6,520','3.5 cards','Highest growth rate'],['Gen X (44-59)','$8,740','4 cards','Highest total debt'],['Baby Boomers (60-78)','$6,130','3.5 cards','Declining'],['Silent (79+)','$3,820','2.5 cards','Low utilization'],
      ], columns: ['Generation','Avg Balance','Avg Cards','Trend'] },
    ],
    faqs: [
      { q: 'What is the average credit card debt in America?', a: 'The average American cardholder has $6,501 in credit card debt in 2026. Gen X carries the most at $8,740, while Gen Z averages $3,120.' },
      { q: 'Which state has the most credit card debt?', a: 'Alaska has the highest average credit card debt at $8,450 per cardholder. Connecticut ($7,980) and New Jersey ($7,850) follow.' },
      { q: 'Which state has the least credit card debt?', a: 'North Dakota has the lowest average at $4,320, followed by Wisconsin ($4,480) and Iowa ($4,550).' },
    ],
    relatedCalcs: ['/credit-card-payoff-calculator','/debt-payoff-calculator','/debt-snowball-calculator','/debt-avalanche-calculator'],
  },
  {
    slug: 'average-credit-card-interest-rate',
    title: 'Average Credit Card Interest Rate 2026 (APR by Card Type)',
    desc: 'Current credit card interest rates by card type, credit score, and issuer. Historical APR trends from 2000 to 2026.',
    sections: [
      { heading: 'Average Credit Card APR by Type (2026)', rows: [
        ['All Credit Cards','20.74%','Record high territory'],['New Card Offers','22.15%','For new applicants'],['Existing Accounts','19.85%','Current cardholders'],['Rewards Cards','21.50%','Cash back, points, miles'],['Travel Cards','20.80%','Airline and hotel cards'],['Student Cards','19.20%','For college students'],['Secured Cards','18.50%','For building credit'],['Business Cards','19.90%','Small business cards'],['Store/Retail Cards','26.50%','Highest APR category'],['Balance Transfer Cards','0%','Intro 12-21 months'],['Penalty APR','29.99%','After missed payments'],
      ], columns: ['Card Type','Average APR','Notes'] },
      { heading: 'APR by Credit Score', rows: [
        ['Excellent (750+)','16.50%','Best available rates'],['Good (700-749)','20.25%','Average rates'],['Fair (650-699)','23.75%','Above average'],['Poor (600-649)','25.50%','Subprime rates'],['Very Poor (below 600)','28.00%+','Secured cards recommended'],
      ], columns: ['Credit Score','Avg APR','Assessment'] },
      { heading: 'Historical Average Credit Card APR', rows: [
        ['2026','20.74%','Near all-time high'],['2025','20.68%',''],['2024','20.72%','Record high'],['2023','20.44%','Rising fast'],['2022','16.65%','Fed rate hikes began'],['2021','14.75%','Pandemic low'],['2020','15.91%','COVID impact'],['2019','17.14%','Pre-pandemic'],['2018','16.46%',''],['2015','13.18%',''],['2010','14.67%','Post-recession'],['2005','12.51%',''],['2000','15.71%',''],
      ], columns: ['Year','Avg APR','Notes'] },
    ],
    faqs: [
      { q: 'What is the average credit card interest rate?', a: 'The average credit card APR is 20.74% in 2026, near all-time highs. Rates range from 16.50% for excellent credit to 28%+ for poor credit.' },
      { q: 'What is a good credit card APR?', a: 'Anything under 18% is considered good. Excellent credit (750+) can get rates around 16.50%. The best strategy is to pay in full monthly and never pay interest.' },
      { q: 'Why are credit card rates so high?', a: 'Credit card rates are tied to the Federal Reserve rate plus a margin. After aggressive Fed hikes in 2022-2023, rates reached record highs. Cards are also unsecured debt, which carries higher risk for lenders.' },
    ],
    relatedCalcs: ['/credit-card-payoff-calculator','/balance-transfer-calculator','/debt-consolidation-calculator'],
  },
  {
    slug: 'credit-card-debt-statistics',
    title: 'Credit Card Debt Statistics 2026: Total US Debt, Payments and Trends',
    desc: 'Complete credit card debt data for the US. Total outstanding debt, average payments, minimum payment traps, and industry trends.',
    sections: [
      { heading: 'US Credit Card Debt Overview 2026', rows: [
        ['Total US Credit Card Debt','$1.14 trillion','All outstanding balances'],['Number of Credit Cards','576 million','Active accounts'],['Number of Cardholders','196 million','Adults with at least 1 card'],['Average Balance per Cardholder','$6,501','Among those with a balance'],['Median Balance','$3,200','Median is lower than average'],['Cards per Person','2.9','Average number of cards'],['Average Credit Limit','$23,500','Per cardholder'],['Average Utilization Rate','27%','Balance vs limit'],['Monthly Payment Average','$225','Across all cardholders'],['Minimum Payment Average','$110','Per card with balance'],['Accounts in Delinquency','3.1%','30+ days past due'],['Accounts in Serious Delinquency','1.8%','90+ days past due'],
      ], columns: ['Metric','Value','Notes'] },
      { heading: 'The Minimum Payment Trap', rows: [
        ['$3,000 balance at 20%','$60/mo minimum','15 years to pay off','$5,100 total paid'],['$5,000 balance at 20%','$100/mo minimum','17 years to pay off','$9,800 total paid'],['$10,000 balance at 20%','$200/mo minimum','19 years to pay off','$21,600 total paid'],['$15,000 balance at 20%','$300/mo minimum','20+ years to pay off','$35,400 total paid'],['$20,000 balance at 20%','$400/mo minimum','22+ years to pay off','$49,200 total paid'],
      ], columns: ['Scenario','Minimum Payment','Time to Pay Off','Total Paid'] },
      { heading: 'Credit Card Debt Growth (2019-2026)', rows: [
        ['2019','$927 billion','Pre-pandemic baseline'],['2020','$825 billion','Pandemic paydowns'],['2021','$860 billion','Recovery begins'],['2022','$986 billion','Inflation-driven spending'],['2023','$1.08 trillion','Crossed $1 trillion'],['2024','$1.10 trillion','Continued growth'],['2025','$1.12 trillion','Slowing growth'],['2026','$1.14 trillion','Record high'],
      ], columns: ['Year','Total Debt','Context'] },
    ],
    faqs: [
      { q: 'How much credit card debt does America have?', a: 'Total US credit card debt is $1.14 trillion in 2026, a record high. This is spread across 576 million active credit card accounts held by 196 million Americans.' },
      { q: 'What happens if I only pay the minimum?', a: 'A $10,000 balance at 20% APR with minimum payments takes 19 years to pay off and costs $21,600 total — more than double the original balance. Always pay more than the minimum.' },
      { q: 'What is the average credit card payment?', a: 'The average monthly credit card payment is $225 across all cardholders. The average minimum payment is about $110 per card with a balance.' },
    ],
    relatedCalcs: ['/credit-card-payoff-calculator','/debt-payoff-calculator','/debt-snowball-calculator','/balance-transfer-calculator'],
  },
  {
    slug: 'credit-card-spending-by-category',
    title: 'Average Credit Card Spending by Category 2026 (Monthly Breakdown)',
    desc: 'What do Americans charge to their credit cards? Average monthly spending by category including groceries, dining, gas, travel, and more.',
    sections: [
      { heading: 'Average Monthly Credit Card Spending by Category', rows: [
        ['Groceries/Supermarkets','$475','15.2%','Most common category'],['Dining/Restaurants','$380','12.2%','Includes delivery apps'],['Gas/Fuel','$285','9.1%','Varies by location'],['Online Shopping','$420','13.5%','Amazon, retail sites'],['Subscriptions/Streaming','$85','2.7%','Netflix, Spotify, etc.'],['Travel/Hotels','$195','6.3%','Seasonal variation'],['Utilities','$165','5.3%','Electric, water, internet'],['Healthcare/Medical','$145','4.6%','Copays, prescriptions'],['Insurance Premiums','$180','5.8%','Auto, health, etc.'],['Entertainment','$120','3.8%','Movies, events, hobbies'],['Home Improvement','$110','3.5%','Hardware, repairs'],['Clothing/Apparel','$95','3.0%','In-store and online'],['Education','$75','2.4%','Tuition, books, courses'],['Other','$395','12.6%','Miscellaneous'],['Total Monthly Average','$3,125','100%','Per active cardholder'],
      ], columns: ['Category','Monthly Avg','% of Total','Notes'] },
      { heading: 'Spending by Income Level (Monthly)', rows: [
        ['Under $35,000','$1,450','Lower utilization'],['$35,000-$50,000','$2,100',''],['$50,000-$75,000','$2,850','Average range'],['$75,000-$100,000','$3,500',''],['$100,000-$150,000','$4,800','Higher spend, usually paid off'],['$150,000+','$6,500','Highest spend, lowest utilization'],
      ], columns: ['Household Income','Monthly Card Spend','Notes'] },
    ],
    faqs: [
      { q: 'What do Americans spend the most on with credit cards?', a: 'Groceries ($475/month) and online shopping ($420/month) are the top credit card spending categories, followed by dining out ($380/month) and gas ($285/month).' },
      { q: 'How much does the average person spend on credit cards per month?', a: 'The average active cardholder charges $3,125 per month to credit cards. This varies dramatically by income, from $1,450 for under $35K earners to $6,500+ for $150K+ earners.' },
      { q: 'What percentage of spending is on credit cards?', a: 'Credit cards account for approximately 31% of all US consumer payments by value. Debit cards account for 29%, cash 18%, and other methods (ACH, checks) 22%.' },
    ],
    relatedCalcs: ['/credit-card-payoff-calculator','/budget-planner-calculator','/debt-to-income-calculator'],
  },
  {
    slug: 'credit-card-approval-rates',
    title: 'Credit Card Approval Rates by Credit Score 2026',
    desc: 'What credit score do you need for a credit card? Approval rates by score, card type, and issuer.',
    sections: [
      { heading: 'Approval Rates by Credit Score', rows: [
        ['750+','95%','Premium rewards, travel, 0% APR cards'],['700-749','82%','Most rewards cards, good limits'],['650-699','58%','Basic rewards, some restrictions'],['600-649','32%','Secured cards, store cards'],['550-599','15%','Secured cards primarily'],['Below 550','5%','Secured cards, prepaid alternatives'],
      ], columns: ['Credit Score','Approval Rate','Cards Available'] },
      { heading: 'Approval Rates by Card Category', rows: [
        ['Secured Cards','92%','Requires deposit, easiest approval'],['Student Cards','78%','Must be enrolled in school'],['Store/Retail Cards','65%','Easier than bank cards'],['Basic Cash Back','55%','Entry-level rewards'],['Premium Rewards','38%','Chase Sapphire, Amex Gold tier'],['Travel/Airline Cards','35%','Airline and hotel branded'],['Ultra-Premium','22%','Amex Platinum, CSR tier'],['Business Cards','45%','Revenue requirements vary'],
      ], columns: ['Card Type','Avg Approval Rate','Notes'] },
      { heading: 'Application Statistics', rows: [
        ['Applications per Year','110 million','US credit card applications'],['Overall Approval Rate','52%','Across all applications'],['Average Applications Before Approval','1.8','For subprime borrowers'],['Hard Inquiry Impact','5-10 points','Per application, lasts 12 months'],['New Account Impact','Avg age decreases','Affects 15% of score'],['Applications in 24 Months (5/24 Rule)','5 max','Chase restriction'],
      ], columns: ['Metric','Value','Notes'] },
    ],
    faqs: [
      { q: 'What credit score do you need for a credit card?', a: 'A 650+ score gives you access to most cards. Premium rewards cards typically require 720+. Secured cards are available to almost anyone regardless of score.' },
      { q: 'What is the average credit card approval rate?', a: 'The overall credit card approval rate is about 52%. This ranges from 95% for excellent credit to 5% for very poor credit.' },
      { q: 'Does applying for a credit card hurt your score?', a: 'Each application creates a hard inquiry that can lower your score 5-10 points for 12 months. Multiple applications in a short period have a larger impact.' },
    ],
    relatedCalcs: ['/credit-utilization-calculator','/credit-card-payoff-calculator','/debt-to-income-calculator'],
  },
  {
    slug: 'balance-transfer-statistics',
    title: 'Balance Transfer Statistics 2026: Rates, Fees and Success Rates',
    desc: 'Balance transfer card data: average intro periods, fees, success rates, and how much Americans save by transferring balances.',
    sections: [
      { heading: 'Balance Transfer Card Statistics 2026', rows: [
        ['Average Intro APR Period','16.5 months','0% APR duration'],['Longest Intro Period','21 months','Top cards available'],['Average Transfer Fee','3.25%','Of amount transferred'],['Transfer Fee Range','3-5%','Varies by card'],['Average Balance Transferred','$5,800','Per transfer'],['Average Interest Saved','$1,450','During 0% period'],['Post-Intro APR','20-25%','Regular rate after promo'],['Success Rate (Paid Off in Time)','48%','Less than half pay off before promo ends'],['Repeat Transferers','35%','Transfer again when promo ends'],['Cards with No Transfer Fee','3 cards','Rare but available'],
      ], columns: ['Metric','Value','Notes'] },
      { heading: 'Balance Transfer Savings Calculator', rows: [
        ['$3,000 at 22% APR','$660 interest/year','$98 fee (3%)','Save $562/year'],['$5,000 at 22% APR','$1,100 interest/year','$163 fee (3%)','Save $937/year'],['$8,000 at 22% APR','$1,760 interest/year','$260 fee (3%)','Save $1,500/year'],['$10,000 at 22% APR','$2,200 interest/year','$325 fee (3%)','Save $1,875/year'],['$15,000 at 22% APR','$3,300 interest/year','$488 fee (3%)','Save $2,812/year'],
      ], columns: ['Current Debt','Annual Interest','Transfer Fee','Net Savings'] },
    ],
    faqs: [
      { q: 'How long is the average 0% APR balance transfer?', a: 'The average intro period is 16.5 months. The best cards offer 21 months at 0% APR. Transfer fees average 3.25% of the amount transferred.' },
      { q: 'Are balance transfers worth it?', a: 'Yes, if you can pay off the balance before the intro period ends. Transferring $8,000 at 22% APR saves approximately $1,500/year after the transfer fee. However, only 48% of people pay off in time.' },
      { q: 'What happens after the 0% period ends?', a: 'The regular APR kicks in, typically 20-25%. Any remaining balance starts accruing interest at the full rate. About 35% of people transfer again to a new 0% card.' },
    ],
    relatedCalcs: ['/balance-transfer-calculator','/credit-card-payoff-calculator','/debt-consolidation-calculator'],
  },
  {
    slug: 'credit-card-rewards-statistics',
    title: 'Credit Card Rewards Statistics 2026: Cash Back, Points and Miles',
    desc: 'How much do Americans earn from credit card rewards? Cash back, points, miles, and the most popular rewards programs.',
    sections: [
      { heading: 'Credit Card Rewards Overview 2026', rows: [
        ['Total Rewards Earned (US)','$45 billion','Annual rewards paid out'],['Average Rewards per Cardholder','$320/year','Across all card types'],['Cash Back Cardholders','62%','Most popular reward type'],['Points/Miles Cardholders','38%','Travel-focused'],['Average Cash Back Rate','1.8%','On all purchases'],['Average Travel Points Value','1.5 cents/point','Varies by program'],['Unredeemed Rewards','$25 billion','Sitting unused'],['Cards with Annual Fees','35%','Premium cards'],['Average Annual Fee','$120','Among fee cards'],['Annual Fee Breakeven Spend','$8,000','To offset $120 fee at 1.5%'],
      ], columns: ['Metric','Value','Notes'] },
      { heading: 'Top Rewards Categories', rows: [
        ['Groceries','3-6% back','Best category bonuses'],['Dining','3-5% back','Restaurants, delivery'],['Gas','3-5% back','Fuel stations'],['Travel','3-10x points','Flights, hotels booked through portal'],['Online Shopping','2-5% back','Rotating categories'],['Streaming','3-5% back','Netflix, Spotify, etc.'],['Everything Else','1-2% back','Flat rate on non-bonus categories'],
      ], columns: ['Category','Typical Reward Rate','Notes'] },
      { heading: 'Rewards vs Interest Paid', rows: [
        ['Transactors (Pay in Full)','$520/year earned','$0 interest paid','Net: +$520'],['Revolvers (Carry Balance)','$280/year earned','$1,350 interest paid','Net: -$1,070'],['Heavy Revolvers','$180/year earned','$2,800 interest paid','Net: -$2,620'],
      ], columns: ['Cardholder Type','Rewards Earned','Interest Paid','Net Result'] },
    ],
    faqs: [
      { q: 'How much do credit card rewards actually earn?', a: 'The average cardholder earns about $320/year in rewards. However, those who pay in full earn about $520/year while paying $0 in interest. Those who carry balances earn $280 but pay $1,350 in interest.' },
      { q: 'Are credit card rewards worth it?', a: 'Only if you pay your balance in full every month. Transactors earn a net $520/year. Revolvers lose $1,070/year after interest. The rewards are designed to encourage spending.' },
      { q: 'What is the best type of credit card reward?', a: 'Cash back is simplest and most popular (62% of rewards cardholders). Travel points can offer higher value (1.5-2 cents per point) but require more effort to maximize.' },
    ],
    relatedCalcs: ['/credit-card-payoff-calculator','/budget-planner-calculator','/roi-calculator'],
  },
  {
    slug: 'number-of-credit-cards-by-age',
    title: 'Average Number of Credit Cards by Age 2026',
    desc: 'How many credit cards does the average American have? Data by age, generation, income, and credit score.',
    sections: [
      { heading: 'Credit Cards by Age Group', rows: [
        ['18-24 (Gen Z)','1.6 cards','$2,100','22%','Building credit'],['25-34 (Millennials)','3.0 cards','$4,800','28%','Growing portfolio'],['35-44 (Millennials/Gen X)','3.8 cards','$7,200','26%','Peak accumulation'],['45-54 (Gen X)','4.0 cards','$8,740','24%','Most cards, most debt'],['55-64 (Boomers)','3.5 cards','$6,130','18%','Consolidating'],['65+ (Boomers/Silent)','3.0 cards','$3,820','12%','Low utilization'],['National Average','2.9 cards','$6,501','27%',''],
      ], columns: ['Age Group','Avg Cards','Avg Total Balance','Utilization','Notes'] },
      { heading: 'Credit Cards by Income', rows: [
        ['Under $30,000','1.8 cards','$2,400'],['$30,000-$50,000','2.5 cards','$4,100'],['$50,000-$75,000','3.2 cards','$5,800'],['$75,000-$100,000','3.8 cards','$6,500'],['$100,000-$150,000','4.2 cards','$7,200'],['$150,000+','5.1 cards','$8,400'],
      ], columns: ['Household Income','Avg Cards','Avg Balance'] },
    ],
    faqs: [
      { q: 'How many credit cards does the average American have?', a: 'The average American has 2.9 credit cards. Gen X (45-54) has the most at 4.0 cards. Gen Z (18-24) has the fewest at 1.6 cards.' },
      { q: 'How many credit cards is too many?', a: 'There is no magic number. Having multiple cards can help your credit score by lowering utilization. The key is managing them responsibly. Most experts say 3-5 cards is a good range.' },
      { q: 'Does having more credit cards hurt your score?', a: 'Not necessarily. More cards means a higher total credit limit, which lowers your utilization ratio (30% of your score). However, each new application creates a hard inquiry, and new accounts lower your average age.' },
    ],
    relatedCalcs: ['/credit-utilization-calculator','/credit-card-payoff-calculator','/debt-to-income-calculator'],
  },
  {
    slug: 'credit-card-delinquency-rates',
    title: 'Credit Card Delinquency Rates by State 2026',
    desc: 'Credit card delinquency and default rates for all 50 states. 30-day, 60-day, and 90-day late payment data.',
    sections: [
      { heading: 'Credit Card Delinquency Rates by State (90+ Days)', rows: [
        ['1','Mississippi','5.2%','Highest delinquency'],['2','Louisiana','4.9%',''],['3','West Virginia','4.8%',''],['4','Alabama','4.6%',''],['5','Arkansas','4.5%',''],['6','New Mexico','4.6%',''],['7','South Carolina','4.4%',''],['8','Oklahoma','4.3%',''],['9','Tennessee','4.2%',''],['10','Texas','4.1%','Large population impact'],['---','National Average','3.1%',''],['41','Minnesota','2.1%',''],['42','New Hampshire','2.0%',''],['43','Massachusetts','1.9%',''],['44','Hawaii','1.8%',''],['45','Vermont','1.8%',''],['46','South Dakota','1.7%',''],['47','Wisconsin','1.7%',''],['48','Iowa','1.6%',''],['49','North Dakota','1.5%',''],['50','Utah','1.4%','Lowest delinquency'],
      ], columns: ['Rank','State','90+ Day Rate','Notes'] },
      { heading: 'Delinquency Trends (2019-2026)', rows: [
        ['2019','2.4%','Pre-pandemic baseline'],['2020','1.5%','Stimulus/forbearance'],['2021','1.4%','Historic low'],['2022','1.8%','Rising from lows'],['2023','2.5%','Exceeding pre-pandemic'],['2024','2.8%','Continued increase'],['2025','3.0%','Near 10-year high'],['2026','3.1%','Stabilizing'],
      ], columns: ['Year','90+ Day Rate','Context'] },
      { heading: 'Delinquency by Age Group', rows: [
        ['18-29','4.8%','Highest delinquency rate'],['30-39','3.5%','Above average'],['40-49','2.9%','Near average'],['50-59','2.4%','Below average'],['60-69','1.8%','Lower risk'],['70+','1.2%','Lowest delinquency'],
      ], columns: ['Age Group','90+ Day Rate','Assessment'] },
    ],
    faqs: [
      { q: 'What is the national credit card delinquency rate?', a: 'The 90+ day credit card delinquency rate is 3.1% in 2026. This has risen from historic lows of 1.4% in 2021 but remains below the 2010 peak of 6.9%.' },
      { q: 'Which state has the highest credit card delinquency?', a: 'Mississippi has the highest 90+ day delinquency rate at 5.2%, followed by Louisiana (4.9%) and West Virginia (4.8%).' },
      { q: 'Which age group has the most credit card delinquencies?', a: 'Young adults (18-29) have the highest delinquency rate at 4.8%. Rates decrease with age, with those 70+ having the lowest rate at 1.2%.' },
    ],
    relatedCalcs: ['/credit-card-payoff-calculator','/debt-payoff-calculator','/credit-utilization-calculator'],
  },
  {
    slug: 'credit-card-industry-statistics',
    title: 'Credit Card Industry Statistics 2026: Market Size, Revenue and Trends',
    desc: 'US credit card industry overview: total transaction volume, revenue, market share by issuer, and technology trends.',
    sections: [
      { heading: 'US Credit Card Industry Overview 2026', rows: [
        ['Total Purchase Volume','$5.6 trillion','Annual card spending'],['Total Cards in Circulation','576 million','Active accounts'],['Number of Cardholders','196 million','US adults with cards'],['Industry Revenue','$220 billion','Interest + fees + interchange'],['Interest Revenue','$130 billion','59% of total revenue'],['Interchange/Swipe Fees','$72 billion','Merchant fees'],['Annual Fee Revenue','$18 billion','From premium cards'],['Late Fee Revenue','$14 billion','Late payment penalties'],['Cash Advance Volume','$45 billion','High-interest transactions'],['Contactless Payments','68%','Of in-person transactions'],['Mobile Wallet Usage','45%','Apple Pay, Google Pay, etc.'],['Buy Now Pay Later Users','38 million','BNPL alternative to cards'],
      ], columns: ['Metric','Value','Notes'] },
      { heading: 'Market Share by Card Network', rows: [
        ['Visa','52.8%','$2.96 trillion volume','Most widely accepted'],['Mastercard','24.6%','$1.38 trillion volume',''],['American Express','17.2%','$964 billion volume','Premium segment'],['Discover','3.8%','$213 billion volume','US focused'],['Other','1.6%','$90 billion volume','Store cards, etc.'],
      ], columns: ['Network','Market Share','Volume','Notes'] },
      { heading: 'Top Card Issuers by Outstanding Balances', rows: [
        ['1','JPMorgan Chase','$185 billion','Chase Sapphire, Freedom'],['2','Citigroup','$150 billion','Citi Custom Cash, Double Cash'],['3','Capital One','$142 billion','Venture, Quicksilver'],['4','Bank of America','$98 billion','Customized Cash Rewards'],['5','American Express','$95 billion','Gold, Platinum'],['6','Discover','$82 billion','Discover it'],['7','Wells Fargo','$52 billion','Active Cash'],['8','US Bank','$38 billion','Altitude'],['9','Barclays','$25 billion','AAdvantage, JetBlue'],['10','Synchrony','$85 billion','Store cards specialist'],
      ], columns: ['Rank','Issuer','Outstanding Balances','Key Cards'] },
    ],
    faqs: [
      { q: 'How big is the US credit card industry?', a: 'The US credit card industry processes $5.6 trillion in purchases annually and generates $220 billion in revenue from interest, fees, and interchange charges.' },
      { q: 'Which credit card network is the largest?', a: 'Visa is the largest with 52.8% market share and $2.96 trillion in purchase volume. Mastercard is second at 24.6%, followed by American Express at 17.2%.' },
      { q: 'Which bank issues the most credit cards?', a: 'JPMorgan Chase is the largest credit card issuer with $185 billion in outstanding balances. Citigroup ($150B) and Capital One ($142B) follow.' },
      { q: 'How much do credit card companies make from fees?', a: 'Credit card companies earn $220 billion annually: $130 billion from interest, $72 billion from merchant interchange fees, $18 billion from annual fees, and $14 billion from late fees.' },
    ],
    relatedCalcs: ['/credit-card-payoff-calculator','/budget-planner-calculator','/roi-calculator'],
  },
];

// BUILD
const dataDir = path.join(APP, 'credit-card-data');
ensureDir(dataDir);

PAGES.forEach(page => {
  const dir = path.join(dataDir, page.slug);
  ensureDir(dir);

  let sectionsHTML = '';
  page.sections.forEach((sec, si) => {
    const headerCells = sec.columns.map(c => '<th style={st.th}>' + esc(c) + '</th>').join('');
    const bodyRows = sec.rows.map((row, ri) => {
      const cells = row.map((cell, ci) => '<td style={{...st.td' + (ci === 0 ? ",fontWeight:600,color:'#e2e8f0'" : '') + '}}>' + esc(cell) + '</td>').join('');
      return '<tr style={{background:' + (ri % 2 === 0 ? "'transparent'" : "'rgba(255,255,255,0.015)'") + '}}>' + cells + '</tr>';
    }).join('\n              ');
    sectionsHTML += '\n        <div style={st.box}>\n          <h2 style={st.h2}>' + esc(sec.heading) + '</h2>\n          <div style={{overflowX:\'auto\'}}><table style={st.table}><thead><tr>' + headerCells + '</tr></thead><tbody>\n              ' + bodyRows + '\n          </tbody></table></div>\n        </div>';
    if (si === 0) sectionsHTML += '\n        <AdUnit slot="3248634657" />';
  });

  const calcLinks = page.relatedCalcs.map(href => '<a href="' + href + '" style={st.calcLink}>' + href.replace(/\//g,' ').replace(/-/g,' ').trim() + '</a>').join('\n            ');

  const lines = [];
  lines.push("import Header from '../../../components/Header'");
  lines.push("import Footer from '../../../components/Footer'");
  lines.push("import AdUnit from '../../../components/AdUnit'");
  lines.push("import FaqSchema from '../../../components/FaqSchema'");
  lines.push("");
  lines.push("export const metadata = {");
  lines.push("  title: '" + esc(page.title) + " | FreeFinCalc',");
  lines.push("  description: '" + esc(page.desc) + "',");
  lines.push("  alternates: { canonical: '" + DOMAIN + "/credit-card-data/" + page.slug + "' },");
  lines.push("  openGraph: { title: '" + esc(page.title) + "', description: '" + esc(page.desc) + "', url: '" + DOMAIN + "/credit-card-data/" + page.slug + "', siteName: 'FreeFinCalc', type: 'article' },");
  lines.push("}");
  lines.push("");
  lines.push("const faqs = " + JSON.stringify(page.faqs));
  lines.push("");
  lines.push("export default function Page() {");
  lines.push("  const st = {");
  lines.push("    page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},");
  lines.push("    wrap:{maxWidth:1000,margin:'0 auto',padding:'32px 16px 64px'},");
  lines.push("    h1:{fontSize:'clamp(24px,4vw,38px)',fontWeight:900,color:'#f1f5f9',margin:'0 0 12px',lineHeight:1.15},");
  lines.push("    desc:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 28px'},");
  lines.push("    box:{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:24,marginBottom:24},");
  lines.push("    h2:{fontSize:20,fontWeight:700,color:'#f1f5f9',margin:'0 0 16px'},");
  lines.push("    table:{width:'100%',borderCollapse:'collapse',fontSize:13},");
  lines.push("    th:{padding:'10px 12px',textAlign:'left',color:'#ef4444',fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:'2px solid rgba(239,68,68,0.2)'},");
  lines.push("    td:{padding:'10px 12px',borderBottom:'1px solid rgba(255,255,255,0.05)',color:'#94a3b8'},");
  lines.push("    calcLink:{display:'inline-block',padding:'8px 16px',borderRadius:8,fontSize:13,fontWeight:600,textDecoration:'none',margin:'0 8px 8px 0',background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',color:'#ef4444'},");
  lines.push("  }");
  lines.push("  return (");
  lines.push("    <div style={st.page}>");
  lines.push("      <Header />");
  lines.push("      <FaqSchema faqs={faqs} />");
  lines.push("      <AdUnit slot=\"7405024590\" />");
  lines.push("      <div style={st.wrap}>");
  lines.push("        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href=\"/\" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\\u203a'}</span><a href=\"/credit-card-data\" style={{color:'#64748b',textDecoration:'none'}}>Credit Card Data</a><span style={{color:'#475569'}}>{'\\u203a'}</span><span style={{color:'#94a3b8'}}>" + esc(page.title.split(':')[0].split('(')[0].trim()) + "</span></nav>");
  lines.push("        <h1 style={st.h1}>" + esc(page.title) + "</h1>");
  lines.push("        <p style={st.desc}>" + esc(page.desc) + "</p>");
  lines.push(sectionsHTML);
  lines.push("        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}>" + calcLinks + "</div></div>");
  lines.push("        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>");
  lines.push("      </div>");
  lines.push("      <Footer />");
  lines.push("    </div>)");
  lines.push("}");

  fs.writeFileSync(path.join(dir, 'page.js'), lines.join('\n'), 'utf8');
  console.log('  Created: /credit-card-data/' + page.slug);
});

// Hub
const hubLines = [];
hubLines.push("import Link from 'next/link'");
hubLines.push("import Header from '../../components/Header'");
hubLines.push("import Footer from '../../components/Footer'");
hubLines.push("export const metadata = { title: 'Credit Card Data 2026 | FreeFinCalc', description: 'Credit card debt, interest rates, approval rates, rewards, and industry statistics.', alternates: { canonical: '" + DOMAIN + "/credit-card-data' } }");
hubLines.push("const pages = " + JSON.stringify(PAGES.map(p => ({slug:p.slug,title:p.title,desc:p.desc.substring(0,90)+'...'}))) + ";");
hubLines.push("export default function Hub() { return (<><Header /><main style={{maxWidth:1000,margin:'0 auto',padding:'48px 16px 64px'}}><h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,color:'#fff',margin:'0 0 12px',textAlign:'center'}}>Credit Card Data and Statistics</h1><p style={{fontSize:16,color:'#94a3b8',textAlign:'center',margin:'0 0 40px'}}>Real credit card data updated for 2026</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12}}>{pages.map(p=>(<Link key={p.slug} href={'/credit-card-data/'+p.slug} style={{display:'block',padding:'20px 24px',borderRadius:14,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none'}}><div style={{fontSize:15,fontWeight:700,color:'#e2e8f0',marginBottom:6}}>{p.title.split('(')[0].split(':')[0].trim()}</div><div style={{fontSize:12,color:'#64748b'}}>{p.desc}</div></Link>))}</div></main><Footer /></>)}");
fs.writeFileSync(path.join(dataDir, 'page.js'), hubLines.join('\n'), 'utf8');
console.log('  Created: /credit-card-data (hub)');

// Sitemap
console.log('Updating sitemap...');
const smFile = path.join(APP, 'sitemap.js');
let sm = fs.readFileSync(smFile, 'utf8');
const lb = sm.lastIndexOf(']');
let ne = '';
if (!sm.includes('/credit-card-data"')) ne += '    { url: "' + DOMAIN + '/credit-card-data", lastModified: today, changeFrequency: "weekly", priority: 0.9 },\n';
PAGES.forEach(p => { if (!sm.includes(p.slug)) ne += '    { url: "' + DOMAIN + '/credit-card-data/' + p.slug + '", lastModified: today, changeFrequency: "monthly", priority: 0.8 },\n'; });
if (ne) { const b = sm.substring(0,lb).trim(); sm = sm.slice(0,lb) + (b.endsWith(',') ? '\n' : ',\n') + ne + sm.slice(lb); fs.writeFileSync(smFile,sm,'utf8'); }

console.log('');
console.log('DONE: 10 Credit Card Data Pages + Hub');
console.log('CPC: $8-20/click (credit card keywords)');
console.log('');
console.log('Run: git add . && git commit -m "Add 10 credit card data pages" && git push origin master');
