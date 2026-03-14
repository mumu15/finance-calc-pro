const fs = require('fs');
const path = require('path');

// ============================================================
// REVERT: Back to range sliders — undo all input experiments
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let filesFixed = 0;

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

const allFiles = [...findAllFiles(APP), ...findAllFiles(path.join(BASE, 'components'))];

console.log('');
console.log('=====================================================');
console.log('  REVERT: All inputs back to range sliders');
console.log('=====================================================');
console.log('');

// Step 1: Revert all type="number" step="any" back to type="range"
for (const f of allFiles) {
  let content = fs.readFileSync(f, 'utf8');
  const before = content;

  content = content.replace(/type="number"\s+step="any"/g, 'type="range"');
  content = content.replace(/type="number"/g, 'type="range"');
  content = content.replace(/type="text"\s+inputMode="decimal"/g, 'type="range"');

  if (content !== before) {
    fs.writeFileSync(f, content, 'utf8');
    filesFixed++;
  }
}

console.log('  ✅ Reverted ' + filesFixed + ' files back to type="range"');

// Step 2: Remove InputFixer from layout.js
const layoutFile = path.join(APP, 'layout.js');
let layout = fs.readFileSync(layoutFile, 'utf8');
if (layout.includes('InputFixer')) {
  layout = layout.replace(/import InputFixer from [^\n]+\n/g, '');
  layout = layout.replace('<InputFixer />', '');
  fs.writeFileSync(layoutFile, layout, 'utf8');
  console.log('  ✅ Removed InputFixer from layout.js');
}

// Step 3: Clean up CSS — remove all the input experiment CSS, keep sliders clean
const globalsFile = path.join(APP, 'globals.css');
let css = fs.readFileSync(globalsFile, 'utf8');

// Remove all our custom input CSS experiments
css = css.replace(/\/\* =+\s*PREMIUM CALCULATOR INPUTS[\s\S]*$/g, '');

// Add clean slider CSS
css += `
/* CALCULATOR SLIDER STYLES */
input[type="range"] {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #f0c842;
  cursor: pointer;
  border: 2px solid #0f1117;
  box-shadow: 0 0 6px rgba(240, 200, 66, 0.4);
}
input[type="range"]::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #f0c842;
  cursor: pointer;
  border: 2px solid #0f1117;
  box-shadow: 0 0 6px rgba(240, 200, 66, 0.4);
}
input[type="range"]::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 3px;
}
input[type="range"]:hover::-webkit-slider-thumb {
  box-shadow: 0 0 10px rgba(240, 200, 66, 0.6);
  transform: scale(1.1);
}
`;

fs.writeFileSync(globalsFile, css, 'utf8');
console.log('  ✅ Added premium slider CSS (gold thumb, dark track)');

console.log('');
console.log('=====================================================');
console.log('  DONE — All sliders restored with premium styling');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Revert to premium sliders — clean and working"');
console.log('  git push origin master');
console.log('');
