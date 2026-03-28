const fs = require('fs');

let c = fs.readFileSync('app/blog/page.js', 'utf8');

// Step 1: Remove the misplaced featured section entirely
const featStart = c.indexOf('{/* Featured High-CPC Guides */}');
if (featStart > -1) {
  // Find the closing </div> of the featured section (3 levels deep)
  // The section ends with </div>\n        </div>\n
  let endMarker = 'In-depth guides on mortgages, investing, taxes, and debt</p>';
  let endIdx = c.indexOf(endMarker);
  if (endIdx > -1) {
    // Find the closing of the entire featured section - look for the 3rd </div> after the grid
    let searchFrom = endIdx;
    let divCount = 0;
    let pos = searchFrom;
    // Find closing </div> tags - we need 3 of them (grid, inner wrapper, outer wrapper)
    while (divCount < 3 && pos < c.length) {
      const nextClose = c.indexOf('</div>', pos);
      if (nextClose === -1) break;
      divCount++;
      pos = nextClose + 6;
    }
    // Remove everything from featStart to pos
    c = c.substring(0, featStart) + c.substring(pos);
    console.log('Removed misplaced featured section');
  }
}

// Clean up any double newlines left behind
c = c.replace(/\n\n\n+/g, '\n\n');

// Step 2: Now insert the featured section in the RIGHT place
// Find the return statement's main container and add before the existing blog posts grid
const featuredHTML = `        {/* Featured Financial Guides */}
        <div style={{marginBottom:48}}>
          <h2 style={{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 6px',paddingLeft:12,borderLeft:'4px solid #f0c842'}}>Featured Financial Guides</h2>
          <p style={{fontSize:13,color:'#64748b',margin:'0 0 16px',paddingLeft:16}}>In-depth guides on mortgages, investing, taxes, and debt</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:12}}>
            {[
              {s:'best-mortgage-rates-2026',t:'Best Mortgage Rates in 2026',c:'$12-18'},
              {s:'how-to-refinance-mortgage-2026',t:'How to Refinance Your Mortgage',c:'$10-15'},
              {s:'debt-consolidation-guide-2026',t:'Debt Consolidation Guide 2026',c:'$10-15'},
              {s:'how-to-pay-off-credit-card-debt-fast',t:'Pay Off Credit Card Debt Fast',c:'$8-14'},
              {s:'best-high-yield-savings-accounts-2026',t:'Best High-Yield Savings Accounts',c:'$8-12'},
              {s:'how-much-house-can-i-afford-2026',t:'How Much House Can I Afford',c:'$8-12'},
              {s:'how-to-build-credit-score-fast',t:'Build Credit Score Fast: 0 to 750+',c:'$7-12'},
              {s:'how-to-save-for-retirement-at-every-age',t:'Save for Retirement at Every Age',c:'$6-10'},
              {s:'how-to-save-money-on-taxes-2026',t:'Save Money on Taxes 2026',c:'$6-10'},
              {s:'how-to-invest-for-beginners-2026',t:'Start Investing: Beginner Guide',c:'$5-10'},
            ].map(p => (
              <a key={p.s} href={'/blog/' + p.s} style={{display:'block',padding:'18px 22px',borderRadius:14,background:'rgba(240,200,66,0.04)',border:'1px solid rgba(240,200,66,0.12)',textDecoration:'none'}}>
                <div style={{fontSize:14,fontWeight:700,color:'#e2e8f0',lineHeight:1.4,marginBottom:6}}>{p.t}</div>
                <div style={{display:'inline-block',padding:'2px 8px',borderRadius:5,background:'rgba(16,185,129,0.1)',color:'#10b981',fontSize:10,fontWeight:700}}>{'CPC: ' + p.c}</div>
              </a>
            ))}
          </div>
        </div>

`;

// Find a good insertion point - before the existing posts list
// Look for patterns like "All Posts", "Blog Posts", posts.map, or the first grid of blog posts
const patterns = [
  'posts.map',
  'POSTS.map',
  'blogPosts.map',
  'All Posts',
  'All Guides',
  'Browse',
  'Latest',
];

let inserted = false;
for (const pat of patterns) {
  const idx = c.indexOf(pat);
  if (idx > -1) {
    // Go back to find the start of this section's container div or heading
    let lineStart = c.lastIndexOf('\n', idx);
    // Go back more to find the section heading
    let sectionStart = c.lastIndexOf('<', lineStart);
    // Find the line start
    let insertAt = c.lastIndexOf('\n', sectionStart) + 1;
    c = c.substring(0, insertAt) + featuredHTML + c.substring(insertAt);
    inserted = true;
    console.log('Inserted featured section before: ' + pat);
    break;
  }
}

if (!inserted) {
  // Fallback: insert before </main> or before <Footer
  const mainEnd = c.indexOf('</main>');
  const footerIdx = c.lastIndexOf('<Footer');
  const insertAt = mainEnd > -1 ? mainEnd : footerIdx;
  if (insertAt > -1) {
    c = c.substring(0, insertAt) + featuredHTML + c.substring(insertAt);
    console.log('Inserted before closing tag (fallback)');
    inserted = true;
  }
}

if (!inserted) {
  console.log('ERROR: Could not find insertion point');
  process.exit(1);
}

fs.writeFileSync('app/blog/page.js', c);
console.log('Blog hub updated!');
console.log('Now run: git add . && git commit -m "Fix blog hub featured guides" && git push origin master');
