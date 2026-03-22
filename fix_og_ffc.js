const fs = require('fs');
const path = require('path');

// Create a simple SVG OG image and convert approach
// Since we can't generate PNG easily, we'll use an SVG in public folder
// But OG images need to be PNG/JPG. Best approach: use a hosted placeholder.

// Step 1: Create an HTML file that generates an OG image screenshot
// Step 2: Update layout.js with og:image

// For now, create a simple OG image as SVG (Facebook accepts some)
// Better: reference the site URL itself or use a service

const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0f1117"/>
  <rect x="0" y="0" width="1200" height="8" fill="#f0c842"/>
  <rect x="80" y="180" width="80" height="80" rx="20" fill="#f0c842"/>
  <text x="180" y="240" font-family="Arial,sans-serif" font-size="48" font-weight="bold" fill="#ffffff">FreeFinCalc</text>
  <text x="80" y="330" font-family="Arial,sans-serif" font-size="56" font-weight="bold" fill="#ffffff">470+ Free Financial</text>
  <text x="80" y="400" font-family="Arial,sans-serif" font-size="56" font-weight="bold" fill="#f0c842">Calculators</text>
  <text x="80" y="470" font-family="Arial,sans-serif" font-size="24" fill="#94a3b8">Mortgage • Tax • Retirement • Investing • Debt • Budget</text>
  <text x="80" y="510" font-family="Arial,sans-serif" font-size="20" fill="#64748b">40+ Currencies • No Sign-Up • 100% Free</text>
  <text x="80" y="570" font-family="Arial,sans-serif" font-size="18" fill="#64748b">www.freefincalc.net</text>
</svg>`;

// Write SVG to public folder
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, 'og-image.svg'), ogSvg, 'utf8');
console.log('Created public/og-image.svg');

// Update layout.js to add og:image
let layout = fs.readFileSync(path.join(__dirname, 'app', 'layout.js'), 'utf8');

// Add images to openGraph
if (!layout.includes('og-image')) {
  layout = layout.replace(
    "openGraph: {\n    title: 'Free Financial Calculators",
    "openGraph: {\n    images: [{ url: 'https://www.freefincalc.net/og-image.svg', width: 1200, height: 630, alt: 'FreeFinCalc - 470+ Free Financial Calculators' }],\n    title: 'Free Financial Calculators"
  );

  // Update twitter card to summary_large_image and add image
  layout = layout.replace(
    "twitter: {\n    card: 'summary',",
    "twitter: {\n    card: 'summary_large_image',\n    images: ['https://www.freefincalc.net/og-image.svg'],"
  );

  fs.writeFileSync(path.join(__dirname, 'app', 'layout.js'), layout, 'utf8');
  console.log('Updated app/layout.js with og:image');
} else {
  console.log('layout.js already has og:image');
}

console.log('');
console.log('Done! Now run:');
console.log('  git add . && git commit -m "Add OG image for social previews" && git push origin master');
