const fs = require('fs');
const path = require('path');

const BASE = 'https://freefincalc.net';
const today = new Date().toISOString().split('T')[0];

// ─── ALL URL ARRAYS ───────────────────────────────────────────────────────────

const cities50 = ['new-york','los-angeles','chicago','houston','phoenix','philadelphia','san-antonio','san-diego','dallas','san-jose','austin','jacksonville','fort-worth','columbus','charlotte','indianapolis','san-francisco','seattle','denver','nashville','oklahoma-city','el-paso','washington-dc','las-vegas','louisville','memphis','portland','baltimore','milwaukee','albuquerque','tucson','fresno','sacramento','kansas-city','mesa','omaha','raleigh','colorado-springs','long-beach','virginia-beach','minneapolis','tampa','new-orleans','arlington','bakersfield','honolulu','anaheim','aurora','santa-ana','corpus-christi'];
const states50 = ['alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware','florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri','montana','nebraska','nevada','new-hampshire','new-jersey','new-mexico','new-york','north-carolina','north-dakota','ohio','oklahoma','oregon','pennsylvania','rhode-island','south-carolina','south-dakota','tennessee','texas','utah','vermont','virginia','washington','west-virginia','wisconsin','wyoming'];
const carBrands = ['toyota','honda','ford','chevrolet','nissan','hyundai','kia','tesla','jeep','ram','gmc','subaru','volkswagen','bmw','mercedes-benz','audi','lexus','acura','mazda','buick','cadillac','lincoln','volvo','porsche','land-rover','jaguar','mini','fiat','alfa-romeo','genesis','infiniti','chrysler','dodge','mitsubishi','rivian','polestar','bentley','rolls-royce','ferrari','lamborghini','mclaren','aston-martin','lotus','scout','fisker','lucid','honda-ridgeline','ford-bronco','chevy-silverado','toyota-tacoma'];
const salaryJobs = ['software-engineer','nurse','teacher','accountant','marketing-manager','data-scientist','doctor','lawyer','electrician','plumber','dentist','pharmacist','mechanical-engineer','civil-engineer','graphic-designer','project-manager','financial-analyst','hr-manager','sales-manager','real-estate-agent','architect','psychologist','social-worker','physical-therapist','occupational-therapist','veterinarian','chiropractor','optometrist','podiatrist','speech-therapist','police-officer','firefighter','paramedic','pilot','truck-driver','construction-manager','it-manager','cybersecurity-analyst','ux-designer','content-writer','copywriter','seo-specialist','product-manager','business-analyst','supply-chain-manager','operations-manager','customer-service-manager','restaurant-manager','hotel-manager','event-planner'];
const loanPurposes = ['debt-consolidation','home-improvement','medical-expenses','car-repair','wedding','vacation','moving-expenses','business-startup','education','emergency-fund','furniture','appliances','electronics','dental','vet-bills','taxes','rent-deposit','baby-expenses','adoption','fertility-treatment','solar-panels','roof-repair','hvac','plumbing','kitchen-remodel','bathroom-remodel','basement-finishing','garage','pool','landscaping','fence','flooring','windows','doors','siding','driveway','rv','boat','motorcycle','atv','musical-instrument','art','photography','gym-equipment','clothing','jewelry','engagement-ring','divorce','legal-fees','burial-funeral'];
const studentMajors = ['computer-science','nursing','business-administration','psychology','mechanical-engineering','biology','accounting','education','communications','criminal-justice','marketing','finance','electrical-engineering','civil-engineering','pre-med','political-science','sociology','history','english','art','music','film','architecture','pharmacy','law','social-work','public-health','economics','mathematics','statistics','data-science','information-technology','cybersecurity','graphic-design','interior-design','fashion-design','hospitality','culinary-arts','environmental-science','chemistry','physics','philosophy','theology','anthropology','linguistics','journalism','public-relations','human-resources','supply-chain','real-estate'];
const savingsGoals = ['emergency-fund','house-down-payment','car-purchase','retirement','vacation','college-fund','wedding','starting-a-business','home-renovation','dream-car','boat','rv','investment-portfolio','debt-free-goal','new-laptop','gaming-setup','musical-instrument','photography-gear','home-gym','swimming-pool','fence','solar-panels','roof','kitchen-remodel','bathroom-remodel','adoption','fertility-treatment','medical-procedure','dental-work','lasik','plastic-surgery','travel-around-world','sabbatical','early-retirement','financial-independence','rental-property','vacation-home','timeshare-payoff','life-insurance','rainy-day-fund','christmas-fund','baby-fund','pet-emergency','legal-defense','tax-savings','donation-goal','church-tithe','charity','scholarship-fund','legacy-fund'];
const compoundScenarios = ['invest-100-per-month','invest-500-per-month','invest-1000-per-month','lump-sum-10000','lump-sum-50000','lump-sum-100000','high-yield-savings-account','sp500-index-fund','real-estate-investment','rental-income','dividend-reinvestment','bonds','treasury-notes','cd-laddering','money-market-account','roth-ira','traditional-ira','401k-employer-match','college-savings-529','health-savings-account','children-savings','grandchildren-savings','20s-investing','30s-investing','40s-investing','50s-investing','60s-investing','retire-at-40','retire-at-50','retire-at-55','fire-movement','millionaire-in-10-years','millionaire-in-20-years','millionaire-in-30-years','double-money','triple-money','10x-money','invest-tax-refund','invest-bonus','invest-inheritance','recurring-deposit','biweekly-investing','weekly-investing','daily-investing','crypto-alternative','inflation-beating','passive-income','wealth-building','dollar-cost-averaging','value-averaging'];
const retirementAges = ['25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74'];
const investmentAssets = ['sp500','nasdaq','dow-jones','real-estate','gold','silver','bitcoin','ethereum','bonds','treasury-bonds','municipal-bonds','corporate-bonds','index-funds','etfs','mutual-funds','dividend-stocks','growth-stocks','value-stocks','small-cap-stocks','large-cap-stocks','international-stocks','emerging-markets','reits','commodities','oil','natural-gas','agricultural-commodities','forex','options','futures','peer-to-peer-lending','crowdfunding','angel-investing','venture-capital','private-equity','hedge-funds','annuities','life-insurance-investment','529-plan','hsa','roth-ira','traditional-ira','401k','solo-401k','sep-ira','simple-ira','defined-benefit-plan','esop','stock-options','rsus'];
const homeIncomes = ['30000','35000','40000','45000','50000','55000','60000','65000','70000','75000','80000','85000','90000','95000','100000','110000','120000','130000','140000','150000','160000','170000','180000','190000','200000','225000','250000','275000','300000','350000','400000','450000','500000','600000','700000','800000','900000','1000000','1200000','1500000','2000000','2500000','3000000','4000000','5000000','6000000','7000000','8000000','9000000','10000000'];
const debtAmounts = ['1000','2000','3000','4000','5000','6000','7000','8000','9000','10000','12000','15000','18000','20000','25000','30000','35000','40000','45000','50000','60000','70000','80000','90000','100000','120000','150000','175000','200000','250000','300000','350000','400000','500000','600000','700000','800000','900000','1000000','1200000','1500000','1750000','2000000','2500000','3000000','4000000','5000000','6000000','7000000','8000000'];
const netWorthAges = ['18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57'];
const personalLoanAmounts = ['500','1000','1500','2000','2500','3000','3500','4000','4500','5000','5500','6000','6500','7000','7500','8000','8500','9000','9500','10000','11000','12000','13000','14000','15000','16000','17000','18000','19000','20000','22000','25000','27000','30000','32000','35000','37000','40000','42000','45000','47000','50000','55000','60000','65000','70000','75000','80000','90000','100000','110000','120000','130000','140000','150000','175000','200000','250000','300000','400000'];
const mortgagePrices = ['100000','125000','150000','175000','200000','225000','250000','275000','300000','325000','350000','375000','400000','425000','450000','475000','500000','525000','550000','575000','600000','650000','700000','750000','800000','850000','900000','950000','1000000','1100000','1200000','1300000','1400000','1500000','1600000','1700000','1800000','1900000','2000000','2250000','2500000','2750000','3000000','3500000','4000000','4500000','5000000','6000000','7500000','10000000'];
const carPrices = ['10000','12000','14000','16000','18000','20000','22000','24000','26000','28000','30000','32000','35000','38000','40000','42000','45000','48000','50000','52000','55000','60000','65000','70000','75000','80000','85000','90000','95000','100000','110000','120000','130000','140000','150000','160000','175000','200000','225000','250000','275000','300000','350000','400000','450000','500000','600000','750000','1000000','1500000'];
const salaries401k = ['30000','35000','40000','45000','50000','55000','60000','65000','70000','75000','80000','85000','90000','95000','100000','110000','120000','130000','140000','150000','160000','175000','200000','225000','250000','275000','300000','325000','350000','375000','400000','425000','450000','475000','500000','550000','600000','650000','700000','750000','800000','900000','1000000','1200000','1500000','2000000','2500000','3000000','4000000','5000000'];
const ccBalances = ['500','1000','1500','2000','2500','3000','3500','4000','4500','5000','5500','6000','6500','7000','7500','8000','9000','10000','11000','12000','13000','14000','15000','17000','20000','22000','25000','27000','30000','35000','40000','45000','50000','55000','60000','65000','70000','75000','80000','85000','90000','95000','100000','110000','125000','150000','175000','200000','250000','300000'];
const studentLoanAmounts = ['5000','7500','10000','12500','15000','17500','20000','22500','25000','27500','30000','32500','35000','37500','40000','42500','45000','47500','50000','52500','55000','57500','60000','65000','70000','75000','80000','85000','90000','95000','100000','110000','120000','130000','140000','150000','160000','175000','200000','225000','250000','275000','300000','325000','350000','400000','450000','500000','600000','750000'];
const freelanceJobs = ['web-developer','graphic-designer','copywriter','seo-specialist','social-media-manager','video-editor','photographer','virtual-assistant','data-analyst','ui-ux-designer','mobile-app-developer','wordpress-developer','shopify-developer','email-marketer','content-strategist','brand-consultant','financial-consultant','hr-consultant','legal-consultant','management-consultant','business-coach','life-coach','fitness-trainer','nutritionist','therapist','tutor','translator','voiceover-artist','podcast-editor','animator','motion-graphics-designer','3d-artist','illustrator','cartoonist','music-producer','sound-engineer','proofreader','technical-writer','grant-writer','speechwriter','resume-writer','cover-letter-writer','linkedin-optimizer','cpa-accountant','bookkeeper','tax-preparer','real-estate-agent','insurance-agent','mortgage-broker','investment-advisor'];
const businessTypes = ['restaurant','cafe','food-truck','bakery','bar','nightclub','gym','yoga-studio','barbershop','salon','nail-salon','spa','dental-practice','medical-practice','law-firm','accounting-firm','real-estate-agency','insurance-agency','marketing-agency','web-design-agency','software-company','it-services','consulting-firm','cleaning-service','landscaping','plumbing','electrical','hvac','construction','roofing','painting','flooring','moving-company','storage-facility','car-wash','auto-repair','car-dealership','gas-station','convenience-store','grocery-store','clothing-boutique','jewelry-store','bookstore','toy-store','pet-store','vet-clinic','daycare','tutoring-center','music-school','art-studio'];
const inflationYears = ['1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'];
const blogSlugs = ['how-to-calculate-mortgage-payment','mortgage-rates-guide','first-time-homebuyer-guide','how-much-house-can-i-afford','fixed-vs-adjustable-rate-mortgage','fha-vs-conventional-loan','how-to-save-for-a-down-payment','what-is-pmi','home-buying-process-guide','refinancing-your-mortgage-guide','how-to-get-out-of-debt','debt-snowball-vs-avalanche','how-to-build-an-emergency-fund','how-to-start-investing','roth-ira-vs-traditional-ira','401k-contribution-limits','compound-interest-explained','how-to-calculate-net-worth','financial-independence-guide','budgeting-basics','50-30-20-rule-explained','how-to-improve-credit-score','credit-card-payoff-strategies','student-loan-repayment-guide','income-based-repayment-explained','car-loan-guide','lease-vs-buy-car','how-to-negotiate-salary','self-employment-tax-guide','how-to-file-taxes-freelancer','retirement-savings-by-age'];

// ─── BUILD ALL URLS ───────────────────────────────────────────────────────────

const allUrls = [
  // Static
  { url: '/', priority: 1.0, freq: 'weekly' },
  { url: '/blog', priority: 0.8, freq: 'weekly' },
  { url: '/about', priority: 0.5, freq: 'monthly' },
  { url: '/contact', priority: 0.5, freq: 'monthly' },
  { url: '/privacy-policy', priority: 0.3, freq: 'monthly' },

  // Base calculators
  ...[ '/mortgage-calculator','/car-loan-calculator','/personal-loan-calculator','/student-loan-calculator','/savings-calculator','/compound-interest-calculator','/retirement-calculator','/investment-calculator','/budget-calculator','/tax-calculator','/net-worth-calculator','/debt-payoff-calculator','/401k-calculator','/credit-card-payoff-calculator','/rent-vs-buy-calculator','/home-affordability-calculator','/salary-calculator','/salary-after-tax-calculator','/inflation-calculator','/freelance-rate-calculator','/break-even-calculator','/savings-goal-calculator','/investment-return-calculator','/roth-ira-calculator','/traditional-ira-calculator','/hsa-calculator','/sep-ira-calculator','/solo-401k-calculator','/pension-calculator','/dividend-calculator','/roi-calculator','/amortization-calculator','/refinance-calculator','/down-payment-calculator','/closing-cost-calculator','/property-tax-calculator','/apr-calculator','/simple-interest-calculator','/rule-of-72-calculator','/cagr-calculator','/present-value-calculator','/future-value-calculator','/fire-calculator','/coast-fire-calculator','/4-percent-rule-calculator','/emergency-fund-calculator','/debt-snowball-calculator','/debt-avalanche-calculator','/take-home-pay-calculator','/paycheck-calculator','/capital-gains-calculator','/tax-bracket-calculator' ].map(u => ({ url: u, priority: 0.9, freq: 'weekly' })),

  // Blog posts
  ...blogSlugs.map(s => ({ url: '/blog/' + s, priority: 0.7, freq: 'monthly' })),

  // Programmatic batches
  ...cities50.map(c => ({ url: '/mortgage-calculator/' + c, priority: 0.8, freq: 'monthly' })),
  ...states50.map(s => ({ url: '/mortgage-calculator/state/' + s, priority: 0.8, freq: 'monthly' })),
  ...mortgagePrices.map(p => ({ url: '/mortgage-calculator/price/' + p, priority: 0.8, freq: 'monthly' })),
  ...carBrands.map(b => ({ url: '/car-loan-calculator/brand/' + b, priority: 0.8, freq: 'monthly' })),
  ...carPrices.map(p => ({ url: '/car-loan-calculator/price/' + p, priority: 0.8, freq: 'monthly' })),
  ...salaryJobs.map(j => ({ url: '/salary-after-tax-calculator/job/' + j, priority: 0.8, freq: 'monthly' })),
  ...states50.map(s => ({ url: '/salary-after-tax/state/' + s, priority: 0.8, freq: 'monthly' })),
  ...loanPurposes.map(p => ({ url: '/personal-loan/purpose/' + p, priority: 0.8, freq: 'monthly' })),
  ...personalLoanAmounts.map(a => ({ url: '/personal-loan-calculator/amount/' + a, priority: 0.8, freq: 'monthly' })),
  ...studentMajors.map(m => ({ url: '/student-loan/major/' + m, priority: 0.8, freq: 'monthly' })),
  ...studentLoanAmounts.map(a => ({ url: '/student-loan-calculator/amount/' + a, priority: 0.8, freq: 'monthly' })),
  ...states50.map(s => ({ url: '/tax-calculator/state/' + s, priority: 0.8, freq: 'monthly' })),
  ...savingsGoals.map(g => ({ url: '/savings-goal-calculator/goal/' + g, priority: 0.8, freq: 'monthly' })),
  ...compoundScenarios.map(s => ({ url: '/compound-interest/scenario/' + s, priority: 0.8, freq: 'monthly' })),
  ...retirementAges.map(a => ({ url: '/retirement-calculator/age/' + a, priority: 0.8, freq: 'monthly' })),
  ...cities50.map(c => ({ url: '/budget-calculator/city/' + c, priority: 0.8, freq: 'monthly' })),
  ...investmentAssets.map(a => ({ url: '/investment-return-calculator/asset/' + a, priority: 0.8, freq: 'monthly' })),
  ...homeIncomes.map(i => ({ url: '/home-affordability-calculator/income/' + i, priority: 0.8, freq: 'monthly' })),
  ...debtAmounts.map(a => ({ url: '/debt-payoff-calculator/amount/' + a, priority: 0.8, freq: 'monthly' })),
  ...netWorthAges.map(a => ({ url: '/net-worth-calculator/age/' + a, priority: 0.8, freq: 'monthly' })),
  ...salaries401k.map(s => ({ url: '/401k-calculator/salary/' + s, priority: 0.8, freq: 'monthly' })),
  ...ccBalances.map(b => ({ url: '/credit-card-payoff-calculator/balance/' + b, priority: 0.8, freq: 'monthly' })),
  ...cities50.map(c => ({ url: '/rent-vs-buy-calculator/city/' + c, priority: 0.8, freq: 'monthly' })),
  ...freelanceJobs.map(j => ({ url: '/freelance-rate-calculator/job/' + j, priority: 0.8, freq: 'monthly' })),
  ...businessTypes.map(b => ({ url: '/break-even-calculator/business/' + b, priority: 0.8, freq: 'monthly' })),
  ...inflationYears.map(y => ({ url: '/inflation-calculator/year/' + y, priority: 0.8, freq: 'monthly' })),
];

// ─── 1. Create app/sitemap.js ─────────────────────────────────────────────────
const sitemapContent = `export default function sitemap() {
  const base = '${BASE}';
  const today = '${today}';

  return ${JSON.stringify(allUrls, null, 2)}.map(entry => ({
    url: base + entry.url,
    lastModified: today,
    changeFrequency: entry.freq,
    priority: entry.priority,
  }));
}
`;

fs.mkdirSync('app', { recursive: true });
fs.writeFileSync(path.join('app', 'sitemap.js'), sitemapContent, 'utf8');
console.log('✅ Created app/sitemap.js (' + allUrls.length + ' URLs)');

// ─── 2. Remove old public/sitemap.xml if it exists ───────────────────────────
const oldSitemap = path.join('public', 'sitemap.xml');
if (fs.existsSync(oldSitemap)) {
  fs.unlinkSync(oldSitemap);
  console.log('🗑️  Deleted old public/sitemap.xml');
} else {
  console.log('ℹ️  No public/sitemap.xml found');
}

console.log('\n🎉 Done! Sitemap has ' + allUrls.length + ' URLs');
console.log('\nNext steps:');
console.log('  git add app/sitemap.js');
console.log('  git rm public/sitemap.xml   (if it existed)');
console.log('  git commit -m "Fix sitemap: switch to Next.js app/sitemap.js with all pages"');
console.log('  git push origin master');
console.log('\nThen verify live at:');
console.log('  https://freefincalc.net/sitemap.xml');
console.log('\nThen resubmit in Google Search Console → Sitemaps → Resubmit');
