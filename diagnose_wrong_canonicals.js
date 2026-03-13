const fs = require('fs');
const path = require('path');

const ROUTES = [
  'app/mortgage-calculator/price/[price]',
  'app/retirement-calculator/age/[age]',
  'app/401k-calculator/salary/[salary]',
  'app/compound-interest/scenario/[scenario]',
  'app/inflation-calculator/year/[year]',
];

ROUTES.forEach(route => {
  const winRoute = route.replace(/\//g, path.sep);
  const pageFile = path.join(winRoute, 'page.js');
  const layoutFile = path.join(winRoute, 'layout.js');
  
  // Check parent dirs for layout.js files
  const parts = winRoute.split(path.sep);
  console.log('\n═══ ' + route + ' ═══');
  
  // Show page.js content
  if (fs.existsSync(pageFile)) {
    const c = fs.readFileSync(pageFile, 'utf8');
    console.log('PAGE.JS (' + c.length + ' chars):');
    console.log(c.slice(0, 500));
    console.log('...');
  } else {
    console.log('❌ NO page.js');
  }
  
  // Check for layout.js at each parent level
  for (let i = 1; i < parts.length; i++) {
    const layoutPath = path.join(...parts.slice(0, i+1), 'layout.js');
    if (fs.existsSync(layoutPath)) {
      const lc = fs.readFileSync(layoutPath, 'utf8');
      if (lc.includes('canonical') || lc.includes('metadata')) {
        console.log('\nLAYOUT.JS at ' + layoutPath + ':');
        const metaMatch = lc.match(/metadata[\s\S]{0,300}/);
        if (metaMatch) console.log(metaMatch[0].slice(0, 300));
      }
    }
  }
});
