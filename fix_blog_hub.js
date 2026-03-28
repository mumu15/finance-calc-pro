const fs = require('fs');

let c = fs.readFileSync('app/blog/page.js', 'utf8');

const newPosts = [
  { slug: 'best-mortgage-rates-2026', title: 'Best Mortgage Rates in 2026: How to Get the Lowest Rate', cpc: '$12-18' },
  { slug: 'how-to-refinance-mortgage-2026', title: 'How to Refinance Your Mortgage in 2026: Complete Guide', cpc: '$10-15' },
  { slug: 'debt-consolidation-guide-2026', title: 'Debt Consolidation: Is It Right for You? (2026 Guide)', cpc: '$10-15' },
  { slug: 'how-to-pay-off-credit-card-debt-fast', title: 'How to Pay Off Credit Card Debt Fast: 7 Proven Strategies', cpc: '$8-14' },
  { slug: 'best-high-yield-savings-accounts-2026', title: 'Best High-Yield Savings Accounts 2026', cpc: '$8-12' },
  { slug: 'how-much-house-can-i-afford-2026', title: 'How Much House Can I Afford in 2026?', cpc: '$8-12' },
  { slug: 'how-to-build-credit-score-fast', title: 'How to Build Your Credit Score Fast: 0 to 750+', cpc: '$7-12' },
  { slug: 'how-to-save-for-retirement-at-every-age', title: 'How to Save for Retirement at Every Age', cpc: '$6-10' },
  { slug: 'how-to-save-money-on-taxes-2026', title: 'How to Save Money on Taxes in 2026: 15 Strategies', cpc: '$6-10' },
  { slug: 'how-to-invest-for-beginners-2026', title: 'How to Start Investing in 2026: Beginner Guide', cpc: '$5-10' },
];

// Check if blog hub already has these
if (c.includes('best-mortgage-rates')) {
  console.log('Blog hub already has new posts. No changes needed.');
  process.exit(0);
}

// Find where to insert - look for the existing blog posts list or a section we can add to
// Strategy: Add a "Featured Guides" section at the top of the blog page content

const featuredSection = `
        {/* Featured High-CPC Guides */}
        <div style={{marginBottom:48}}>
          <h2 style={{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 6px',paddingLeft:12,borderLeft:'4px solid #f0c842'}}>Featured Financial Guides</h2>
          <p style={{fontSize:13,color:'#64748b',margin:'0 0 16px',paddingLeft:16}}>In-depth guides on mortgages, investing, taxes, and debt</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:12}}>
${newPosts.map(p => `            <a href="/blog/${p.slug}" style={{display:'block',padding:'18px 22px',borderRadius:14,background:'rgba(240,200,66,0.04)',border:'1px solid rgba(240,200,66,0.12)',textDecoration:'none'}}>
              <div style={{fontSize:14,fontWeight:700,color:'#e2e8f0',lineHeight:1.4,marginBottom:6}}>${p.title}</div>
              <div style={{display:'inline-block',padding:'2px 8px',borderRadius:5,background:'rgba(16,185,129,0.1)',color:'#10b981',fontSize:10,fontWeight:700}}>CPC: ${p.cpc}</div>
            </a>`).join('\n')}
          </div>
        </div>
`;

// Try to insert after the page title/header area
if (c.includes('in-depth articles') || c.includes('Browse All') || c.includes('Financial Guides')) {
  // Find the first major content div after the title
  const mainIdx = c.indexOf('<main') || c.indexOf('return (');
  // Look for the first grid or list of blog posts
  const gridIdx = c.indexOf('gridTemplateColumns', mainIdx > -1 ? mainIdx : 0);
  if (gridIdx > -1) {
    // Find the div opening before this grid
    let insertPoint = c.lastIndexOf('<div', gridIdx);
    // Go back to find the section/container start
    while (insertPoint > 0 && c.charAt(insertPoint - 1) !== '\n') insertPoint--;
    c = c.substring(0, insertPoint) + featuredSection + '\n' + c.substring(insertPoint);
    console.log('Inserted featured guides section');
  } else {
    // Fallback: insert after the page heading
    const h1End = c.indexOf('</h1>');
    if (h1End > -1) {
      const nextLine = c.indexOf('\n', h1End);
      c = c.substring(0, nextLine + 1) + featuredSection + c.substring(nextLine + 1);
      console.log('Inserted after h1');
    }
  }
} else {
  // Another fallback: insert before the first Link or <a in the blog list
  const firstLink = c.indexOf('<Link') > -1 ? c.indexOf('<Link') : c.indexOf("href={'/blog/");
  if (firstLink > -1) {
    let insertPoint = c.lastIndexOf('\n', firstLink);
    c = c.substring(0, insertPoint + 1) + featuredSection + c.substring(insertPoint + 1);
    console.log('Inserted before first blog link');
  } else {
    console.log('WARNING: Could not find good insertion point');
    // Nuclear fallback: find the closing main or last </div> before Footer
    const footerIdx = c.lastIndexOf('<Footer');
    if (footerIdx > -1) {
      c = c.substring(0, footerIdx) + featuredSection + '\n      ' + c.substring(footerIdx);
      console.log('Inserted before Footer (fallback)');
    }
  }
}

fs.writeFileSync('app/blog/page.js', c, 'utf8');
console.log('');
console.log('Blog hub updated with 10 featured guides');
console.log('Now run: git add . && git commit -m "Add featured guides to blog hub" && git push origin master');
