const fs = require('fs');

let c = fs.readFileSync('components/InternalLinks.js', 'utf8');

// Check if export default exists
if (c.includes('export default')) {
  console.log('Component already has export. No fix needed.');
  process.exit(0);
}

// The LINK_MAP data is intact but the component function is missing
// Append it after the closing }

const componentCode = `

function getCategory(path) {
  if (path.includes('/mortgage') || path.includes('/amortization') || path.includes('/refinance') || path.includes('/home-') || path.includes('/heloc') || path.includes('/property-tax') || path.includes('/down-payment') || path.includes('/rent-vs-buy') || path.includes('/closing-cost') || path.includes('/house-')) return 'mortgage'
  if (path.includes('/credit-card') || path.includes('/debt-') || path.includes('/balance-transfer')) return 'debt'
  if (path.includes('/retirement') || path.includes('/401k') || path.includes('/roth-ira') || path.includes('/fire') || path.includes('/investment') || path.includes('/dividend') || path.includes('/social-security-calc') || path.includes('/dollar-cost') || path.includes('/pension') || path.includes('/rmd')) return 'retirement'
  if (path.includes('/tax') || path.includes('/salary') || path.includes('/paycheck') || path.includes('/hourly') || path.includes('/freelance') || path.includes('/overtime') || path.includes('/capital-gains') || path.includes('/self-employment')) return 'tax'
  if (path.includes('/profit') || path.includes('/break-even') || path.includes('/roi') || path.includes('/startup') || path.includes('/cash-flow') || path.includes('/business') || path.includes('/saas') || path.includes('/burn-rate')) return 'business'
  if (path.includes('/car-') || path.includes('/auto-') || path.includes('/fuel') || path.includes('/boat') || path.includes('/rv-') || path.includes('/truck')) return 'auto'
  if (path.includes('/budget') || path.includes('/savings') || path.includes('/emergency') || path.includes('/net-worth') || path.includes('/cost-of-living') || path.includes('/inflation-calc') || path.includes('/tip-') || path.includes('/wedding') || path.includes('/vacation') || path.includes('/baby') || path.includes('/pet-cost') || path.includes('/moving')) return 'budget'
  if (path.includes('/loan') || path.includes('/personal-loan') || path.includes('/student-loan') || path.includes('/sba') || path.includes('/interest-rate') || path.includes('/simple-interest') || path.includes('/compound-interest') || path.includes('/apr-') || path.includes('/cd-calc')) return 'loans'
  if (path.includes('/mortgage-data')) return 'mortgageData'
  if (path.includes('/insurance-data')) return 'insuranceData'
  if (path.includes('/credit-card-data')) return 'creditCardData'
  if (path.includes('/salary-data')) return 'salaryData'
  if (path.includes('/financial-data')) return 'financialData'
  if (path.includes('/federal-tax') || path.includes('/minimum-wage') || path.includes('/state-income-tax') || path.includes('/property-tax-rates') || path.includes('/inflation-rate') || path.includes('/social-security-benefits') || path.includes('/401k-ira')) return 'referenceData'
  if (path.includes('/data/')) return 'financialData'
  return null
}

export default function InternalLinks() {
  const path = usePathname()
  const cat = getCategory(path)
  if (!cat || !LINK_MAP[cat]) return null

  const data = LINK_MAP[cat]
  const calcs = data.calcs || []
  const blogs = data.blogs || []
  const color = data.color || '#f0c842'

  if (calcs.length === 0 && blogs.length === 0) return null

  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:'24px 16px'}}>
      <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px 24px'}}>
        <h3 style={{fontSize:14,fontWeight:700,color:color,marginBottom:12}}>{'More ' + data.label}</h3>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {calcs.map(l => (
            <a key={l.href} href={l.href} style={{padding:'5px 12px',borderRadius:6,fontSize:12,fontWeight:600,textDecoration:'none',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:color}}>
              {l.name}
            </a>
          ))}
          {blogs.map(l => (
            <a key={l.href} href={l.href} style={{padding:'5px 12px',borderRadius:6,fontSize:12,fontWeight:600,textDecoration:'none',background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.12)',color:'#60a5fa'}}>
              {l.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
`;

c = c + componentCode;
fs.writeFileSync('components/InternalLinks.js', c, 'utf8');
console.log('Fixed! Appended component function + export default');
console.log('Now run: git add . && git commit -m "Fix InternalLinks component" && git push origin master');
