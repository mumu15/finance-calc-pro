const fs = require('fs');
const path = require('path');

// ============================================================
// FIX: Find ALL remaining unstyled white-background inputs
// Adds className="calc-input" to every input missing it
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let filesFixed = 0;
let inputsFixed = 0;

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
console.log('  FIX: Style ALL remaining white inputs');
console.log('=====================================================');
console.log('');

const allFiles = findAllFiles(APP);

for (const f of allFiles) {
  let content = fs.readFileSync(f, 'utf8');
  const before = content;
  const rel = path.relative(BASE, f).replace(/\\/g, '/');

  // Skip non-calculator files
  if (!content.includes('<input')) continue;

  // Pattern 1: Tailwind white-bg inputs
  // bg-white, bg-slate-100, bg-gray-100, bg-slate-50 etc
  const whiteBgPatterns = [
    /className="[^"]*(?:bg-white|bg-slate-[12]00|bg-gray-[12]00|bg-slate-50|bg-gray-50)[^"]*"/g,
  ];

  for (const pat of whiteBgPatterns) {
    content = content.replace(pat, (match) => {
      // Only replace if it's on an input line or near an input
      if (match.includes('calc-input') || match.includes('slider-upgrade')) return match;
      // Check if it's likely an input className
      if (match.includes('rounded') || match.includes('px-') || match.includes('py-') || match.includes('border')) {
        inputsFixed++;
        return 'className="calc-input"';
      }
      return match;
    });
  }

  // Pattern 2: Inputs with inline style that have no className
  // <input type="text" value={x} onChange={...} style={{...}} />
  // These need className="calc-input" added
  content = content.replace(/<input\s+type="text"\s+inputMode="decimal"([^>]*?)(?:style=\{\{[^}]*\}\})?([^>]*?)\/>/g, (match) => {
    if (match.includes('calc-input') || match.includes('slider-upgrade') || match.includes('className')) return match;
    // Add className="calc-input" before the closing />
    inputsFixed++;
    return match.replace('/>', ' className="calc-input" />');
  });

  // Pattern 3: Inputs with no className at all and basic style
  // <input type="text" inputMode="decimal" value={...} onChange={...} />
  content = content.replace(/<input\s+type="text"\s+inputMode="decimal"\s+value=\{[^}]+\}\s+onChange=\{[^}]+\}\s*\/>/g, (match) => {
    if (match.includes('calc-input') || match.includes('className')) return match;
    inputsFixed++;
    return match.replace('/>', ' className="calc-input" />');
  });

  // Pattern 4: style={styles.slider} or similar inline style objects on inputs
  // (These might still exist after text conversion)
  content = content.replace(/<input([^>]*?)style=\{styles\.\w+\}([^>]*?)\/>/g, (match, before2, after) => {
    if (match.includes('calc-input') || match.includes('className')) return match;
    inputsFixed++;
    return match.replace(/style=\{styles\.\w+\}/, 'className="calc-input"');
  });

  // Pattern 5: Catch any remaining input[type="text"] without className
  content = content.replace(/<input\b([^>]*?)type="text"([^>]*?)\/>/g, (match) => {
    if (match.includes('className=') || match.includes('hidden') || match.includes('search')) return match;
    inputsFixed++;
    return match.replace('/>', ' className="calc-input" />');
  });

  if (content !== before) {
    fs.writeFileSync(f, content, 'utf8');
    filesFixed++;
    if (filesFixed <= 20) console.log('  ✅ ' + rel);
  }
}

if (filesFixed > 20) console.log('  ... and ' + (filesFixed - 20) + ' more');

// Also upgrade the CSS to be even more aggressive
console.log('');
console.log('--- Strengthening CSS overrides ---');

const globalsFile = path.join(APP, 'globals.css');
let css = fs.readFileSync(globalsFile, 'utf8');

// Add a universal fallback that catches ANY input inside calculator containers
if (!css.includes('/* UNIVERSAL INPUT OVERRIDE */')) {
  const universalCSS = `
/* UNIVERSAL INPUT OVERRIDE */
input[type="text"][inputmode="decimal"],
input[type="text"][inputMode="decimal"] {
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
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  transition: border-color 0.2s, box-shadow 0.2s !important;
}
input[type="text"][inputmode="decimal"]:hover,
input[type="text"][inputMode="decimal"]:hover {
  border-color: rgba(240, 200, 66, 0.4) !important;
  background: #131620 !important;
}
input[type="text"][inputmode="decimal"]:focus,
input[type="text"][inputMode="decimal"]:focus {
  border-color: #f0c842 !important;
  box-shadow: 0 0 0 3px rgba(240, 200, 66, 0.15) !important;
  background: #131620 !important;
}
`;
  css += universalCSS;
  fs.writeFileSync(globalsFile, css, 'utf8');
  console.log('  ✅ Added universal input override CSS');
}

console.log('');
console.log('=====================================================');
console.log('  Fixed ' + filesFixed + ' files, ' + inputsFixed + ' inputs styled');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Fix all remaining white inputs — universal dark styling"');
console.log('  git push origin master');
console.log('');
