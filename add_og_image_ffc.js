const fs = require('fs');

// Create a premium SVG OG image (1200x630)
const ogImage = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#030712;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a1628;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f0c842;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f5a623;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Glow circles -->
  <circle cx="200" cy="200" r="300" fill="#f0c842" opacity="0.04"/>
  <circle cx="1000" cy="450" r="250" fill="#f5a623" opacity="0.04"/>

  <!-- Grid lines -->
  <line x1="0" y1="315" x2="1200" y2="315" stroke="#f0c842" stroke-opacity="0.05" stroke-width="1"/>
  <line x1="600" y1="0" x2="600" y2="630" stroke="#f0c842" stroke-opacity="0.05" stroke-width="1"/>

  <!-- Border -->
  <rect x="2" y="2" width="1196" height="626" fill="none" stroke="#f0c842" stroke-opacity="0.2" stroke-width="2" rx="16"/>

  <!-- Logo box -->
  <rect x="80" y="80" width="56" height="56" rx="14" fill="url(#gold)"/>
  <text x="108" y="118" font-family="Arial Black, sans-serif" font-size="28" font-weight="900" fill="#030712" text-anchor="middle">F</text>

  <!-- Site name -->
  <text x="152" y="104" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="white">FreeFinCalc</text>
  <text x="152" y="128" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#f0c842">.net</text>

  <!-- Main headline -->
  <text x="80" y="270" font-family="Arial Black, sans-serif" font-size="62" font-weight="900" fill="white">Free Personal Finance</text>
  <text x="80" y="350" font-family="Arial Black, sans-serif" font-size="62" font-weight="900" fill="url(#gold)">Calculators</text>

  <!-- Subtitle -->
  <text x="80" y="420" font-family="Arial, sans-serif" font-size="28" fill="#94a3b8">Mortgage · Debt · Retirement · Budget · Tax</text>

  <!-- Badges -->
  <rect x="80" y="470" width="180" height="44" rx="22" fill="#f0c842" fill-opacity="0.1" stroke="#f0c842" stroke-opacity="0.3" stroke-width="1"/>
  <text x="170" y="498" font-family="Arial, sans-serif" font-size="18" fill="#f0c842" text-anchor="middle">⚡ Instant Results</text>

  <rect x="275" y="470" width="200" height="44" rx="22" fill="#f0c842" fill-opacity="0.1" stroke="#f0c842" stroke-opacity="0.3" stroke-width="1"/>
  <text x="375" y="498" font-family="Arial, sans-serif" font-size="18" fill="#f0c842" text-anchor="middle">🔒 No Sign Up</text>

  <rect x="490" y="470" width="210" height="44" rx="22" fill="#f0c842" fill-opacity="0.1" stroke="#f0c842" stroke-opacity="0.3" stroke-width="1"/>
  <text x="595" y="498" font-family="Arial, sans-serif" font-size="18" fill="#f0c842" text-anchor="middle">💯 100% Free</text>

  <!-- Tool count badge -->
  <rect x="970" y="470" width="160" height="44" rx="22" fill="#f0c842" fill-opacity="0.15" stroke="#f0c842" stroke-opacity="0.4" stroke-width="1.5"/>
  <text x="1050" y="498" font-family="Arial Black, sans-serif" font-size="18" font-weight="900" fill="#f0c842" text-anchor="middle">12 Calculators</text>

  <!-- Decorative icons -->
  <text x="960" y="200" font-family="Arial, sans-serif" font-size="80" opacity="0.15">🏠</text>
  <text x="1060" y="280" font-family="Arial, sans-serif" font-size="60" opacity="0.12">📈</text>
  <text x="980" y="360" font-family="Arial, sans-serif" font-size="70" opacity="0.1">💰</text>
</svg>`;

fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/og-image.svg', ogImage, 'utf8');
console.log('✅ OG image created: public/og-image.svg');

// Update layout.js
let layout = fs.readFileSync('app/layout.js', 'utf8');

if (layout.includes('og-image.svg')) {
  console.log('⏭️  OG image already in layout.js');
} else {
  // Add to openGraph
  layout = layout.replace(
    /images: \[.*?\],\s*\n(\s*}\s*,\s*\n\s*twitter)/s,
    `images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'FreeFinCalc.net - Free Personal Finance Calculators' }],\n$1`
  );

  // If openGraph images not found, add it
  if (!layout.includes('og-image.svg')) {
    layout = layout.replace(
      /siteName: ['"]FreeFinCalc\.net['"]/,
      `siteName: 'FreeFinCalc.net',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'FreeFinCalc.net - Free Personal Finance Calculators' }]`
    );
  }

  fs.writeFileSync('app/layout.js', layout, 'utf8');
  console.log('✅ layout.js updated with OG image!');
}

console.log('\nRun: git add . && git commit -m "Add OG image for social sharing" && git push origin master:main');
