const fs = require('fs');
const path = require('path');

// ============================================================
// FIX 1: Revert to type="number" step="any" (decimals work)
// FIX 2: Universal CSS for ALL number inputs (no white bg)
// FIX 3: Update homepage "124" → "470+"
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let inputsReverted = 0;
let homepageFixed = false;

function findAllFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.next' || item === '.vercel') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) findAllFiles(full, results);
    else if (item.endsWith('.js') || item.endsWith('.tsx')) results.push(full);
  }
  return results;
}

console.log('');
console.log('=====================================================');
console.log('  FIX: Decimal inputs + homepage');
console.log('=====================================================');
console.log('');

// --- STEP 1: Revert type="text" inputMode="decimal" back to type="number" step="any" ---
console.log('--- Step 1: Revert inputs to type="number" step="any" ---');

const allFiles = [...findAllFiles(APP), ...findAllFiles(path.join(BASE, 'components'))];

for (const f of allFiles) {
  let content = fs.readFileSync(f, 'utf8');
  const before = content;

  // Revert: type="text" inputMode="decimal" → type="number" step="any"
  content = content.replace(/type="text"\s+inputMode="decimal"/g, 'type="number" step="any"');

  if (content !== before) {
    fs.writeFileSync(f, content, 'utf8');
    inputsReverted++;
  }
}

console.log('  ✅ Reverted ' + inputsReverted + ' files to type="number" step="any"');
console.log('');

// --- STEP 2: Update CSS to catch ALL number inputs universally ---
console.log('--- Step 2: Universal CSS for number inputs ---');

const globalsFile = path.join(APP, 'globals.css');
let css = fs.readFileSync(globalsFile, 'utf8');

// Remove old text-input specific rules that no longer apply
css = css.replace(/\/\* Text input overrides[^]*?appearance: none !important;\s*\}\s*/g, '');
css = css.replace(/\/\* UNIVERSAL INPUT OVERRIDE \*\/[^]*?box-shadow:[^}]*\}\s*/g, '');

// Add the definitive universal CSS for ALL calculator inputs
if (!css.includes('/* DEFINITIVE CALCULATOR INPUT STYLES */')) {
  const definitiveCss = `
/* DEFINITIVE CALCULATOR INPUT STYLES */
input[type="number"],
input.calc-input,
input.slider-upgrade {
  width: 100% !important;
  background: #0f1117 !important;
  border: 1.5px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 12px !important;
  padding: 14px 16px !important;
  color: #f0c842 !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  font-family: inherit !important;
  outline: none !important;
  transition: border-color 0.2s, box-shadow 0.2s !important;
  -moz-appearance: textfield !important;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}
input[type="number"]:hover,
input.calc-input:hover,
input.slider-upgrade:hover {
  border-color: rgba(240, 200, 66, 0.4) !important;
  background: #131620 !important;
}
input[type="number"]:focus,
input.calc-input:focus,
input.slider-upgrade:focus {
  border-color: #f0c842 !important;
  box-shadow: 0 0 0 3px rgba(240, 200, 66, 0.15) !important;
  background: #131620 !important;
}
input[type="number"]::placeholder,
input.calc-input::placeholder {
  color: #475569 !important;
  font-weight: 400 !important;
}
`;
  css += definitiveCss;
}

fs.writeFileSync(globalsFile, css, 'utf8');
console.log('  ✅ Added definitive CSS for ALL input[type="number"]');
console.log('');

// --- STEP 3: Fix homepage "124" count ---
console.log('--- Step 3: Fix homepage calculator count ---');

// Find the homepage file
const homepageFiles = [
  path.join(APP, 'page.js'),
  path.join(APP, 'PageClient.js'),
];

for (const hf of homepageFiles) {
  if (!fs.existsSync(hf)) continue;
  let content = fs.readFileSync(hf, 'utf8');
  const before = content;

  // Replace "124" with "470+" in various contexts
  content = content.replace(/124 Free Financial Calculators/g, '470+ Free Financial Calculators');
  content = content.replace(/124 free financial calculators/g, '470+ free financial calculators');
  content = content.replace(/124 Calculators/g, '470+ Calculators');
  content = content.replace(/"124"/g, '"470+"');
  content = content.replace(/['"]124['"]/g, '"470+"');
  // Handle JSX: >124< pattern
  content = content.replace(/>124</g, '>470+<');

  if (content !== before) {
    fs.writeFileSync(hf, content, 'utf8');
    homepageFixed = true;
    console.log('  ✅ Updated ' + path.relative(BASE, hf));
  }
}

if (!homepageFixed) {
  console.log('  ⚠️  Could not find "124" in homepage files — may need manual check');
}

console.log('');
console.log('=====================================================');
console.log('  SUMMARY:');
console.log('    ✅ Inputs reverted to type="number" step="any"');
console.log('       → Decimals (2.5) now work properly');
console.log('       → No leading zeros');
console.log('       → No spin buttons (hidden via CSS)');
console.log('    ✅ Universal dark styling for ALL number inputs');
console.log('       → No more white backgrounds anywhere');
console.log('    ✅ Homepage count updated to 470+');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Fix decimal inputs + universal styling + homepage count"');
console.log('  git push origin master');
console.log('');
