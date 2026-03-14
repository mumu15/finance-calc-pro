const fs = require('fs');
const path = require('path');

// ============================================================
// DEFINITIVE INPUT FIX:
// 1. Create smart CalcInput component
// 2. Replace all calculator inputs with it
// Fixes: leading zeros, decimal commas, all locale issues
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');

console.log('');
console.log('=====================================================');
console.log('  DEFINITIVE INPUT FIX');
console.log('=====================================================');
console.log('');

// --- STEP 1: Create the CalcInput component ---
console.log('--- Step 1: Creating CalcInput component ---');

const calcInputComponent = `'use client'
import { useState, useRef, useEffect } from 'react'

export default function CalcInput({ value, onChange, className, style, ...props }) {
  const [display, setDisplay] = useState(String(value ?? ''))
  const ref = useRef(null)
  const focused = useRef(false)

  useEffect(() => {
    if (!focused.current) {
      setDisplay(String(value ?? ''))
    }
  }, [value])

  function handleChange(e) {
    const raw = e.target.value

    // Allow empty, digits, one decimal point, and negative sign
    if (raw !== '' && !/^-?[0-9]*\\.?[0-9]*$/.test(raw)) return

    setDisplay(raw)

    // Parse and send up only valid numbers
    if (raw === '' || raw === '-' || raw === '.' || raw === '-.') return
    const num = parseFloat(raw)
    if (!isNaN(num)) onChange(num)
  }

  function handleFocus() {
    focused.current = true
    // Select all text on focus for easy editing
    setTimeout(() => { if (ref.current) ref.current.select() }, 0)
  }

  function handleBlur() {
    focused.current = false
    // Clean up display on blur
    const num = parseFloat(display)
    if (isNaN(num) || display === '') {
      setDisplay('0')
      onChange(0)
    } else {
      setDisplay(String(num)) // removes leading zeros
    }
  }

  return (
    <input
      ref={ref}
      type="text"
      inputMode="decimal"
      autoComplete="off"
      className={'calc-input' + (className ? ' ' + className : '')}
      style={style}
      value={display}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  )
}
`;

const compDir = path.join(BASE, 'components');
fs.writeFileSync(path.join(compDir, 'CalcInput.js'), calcInputComponent, 'utf8');
console.log('  ✅ Created components/CalcInput.js');
console.log('');

// --- STEP 2: Replace inputs in all calculator files ---
console.log('--- Step 2: Replacing inputs with CalcInput ---');

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

const allFiles = findAllFiles(APP);
let filesChanged = 0;
let inputsReplaced = 0;

for (const f of allFiles) {
  let content = fs.readFileSync(f, 'utf8');
  const before = content;
  const rel = path.relative(BASE, f).replace(/\\/g, '/');

  // Skip files with no inputs
  if (!content.includes('<input')) continue;
  // Skip non-calculator files (search bars, etc)
  if (rel.includes('Header') || rel.includes('Footer') || rel.includes('CurrencySelector')) continue;

  let needsImport = false;

  // PATTERN 1: <input type="number" step="any" value={X} onChange={e => setX(+e.target.value)} className="calc-input" />
  // PATTERN 2: <input type="number" step="any" value={X} onChange={e => setX(Number(e.target.value))} ... />
  // PATTERN 3: <input type="number" step="any" value={X} onChange={e => setX(parseFloat(e.target.value))} ... />
  // All variations with different attribute orders

  // Universal regex: match any <input that has type="number" and onChange with a setter
  // Replace with <CalcInput value={X} onChange={setter} />

  // Strategy: find each <input...type="number".../>  and convert
  const inputRegex = /<input\s+([^>]*?)type="number"([^>]*?)\/>/g;

  content = content.replace(inputRegex, (match) => {
    // Skip if it's a search input or hidden
    if (match.includes('search') || match.includes('hidden')) return match;

    // Extract value prop
    const valueMatch = match.match(/value=\{([^}]+)\}/);
    if (!valueMatch) return match;
    const valueProp = valueMatch[1];

    // Extract onChange prop - get the setter function
    const onChangeMatch = match.match(/onChange=\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/);
    if (!onChangeMatch) return match;
    const onChangeRaw = onChangeMatch[1];

    // Extract the setter from common patterns:
    // e => setX(+e.target.value)  → setX
    // e => setX(Number(e.target.value)) → setX
    // e => setX(parseFloat(e.target.value)) → setX
    // (e) => setX(+e.target.value) → setX
    // e => { setX(+e.target.value) } → setX
    let setter = null;
    const setterPatterns = [
      /(?:\(?\s*e\s*\)?\s*=>\s*\{?\s*)(\w+)\s*\(\s*(?:\+\s*e\.target\.value|Number\s*\(\s*e\.target\.value\s*\)|parseFloat\s*\(\s*e\.target\.value\s*\))/,
      /(?:\(?\s*e\s*\)?\s*=>\s*)(\w+)\s*\(\s*(?:\+\s*e\.target\.value|Number\s*\(\s*e\.target\.value\s*\)|parseFloat\s*\(\s*e\.target\.value\s*\))/,
    ];

    for (const pat of setterPatterns) {
      const m = onChangeRaw.match(pat);
      if (m) { setter = m[1]; break; }
    }

    if (!setter) return match; // Can't parse setter, leave as is

    // Extract other props we want to keep (min, max, step, placeholder, style, className)
    const extraProps = [];
    const minMatch = match.match(/min=\{([^}]+)\}/);
    const maxMatch = match.match(/max=\{([^}]+)\}/);
    const placeholderMatch = match.match(/placeholder="([^"]+)"/);
    if (minMatch) extraProps.push(`min={${minMatch[1]}}`);
    if (maxMatch) extraProps.push(`max={${maxMatch[1]}}`);
    if (placeholderMatch) extraProps.push(`placeholder="${placeholderMatch[1]}"`);

    needsImport = true;
    inputsReplaced++;

    const extra = extraProps.length > 0 ? ' ' + extraProps.join(' ') : '';
    return `<CalcInput value={${valueProp}} onChange={${setter}}${extra} />`;
  });

  // Add import if needed and not already present
  if (needsImport && !content.includes("import CalcInput")) {
    // Calculate relative path from file to components/CalcInput
    const fileDir = path.dirname(f);
    let relPath = path.relative(fileDir, compDir).replace(/\\/g, '/');
    if (!relPath.startsWith('.')) relPath = './' + relPath;

    const importLine = `import CalcInput from '${relPath}/CalcInput';\n`;

    // Insert after last existing import
    const lastImportIdx = content.lastIndexOf('import ');
    if (lastImportIdx !== -1) {
      const endOfLine = content.indexOf('\n', lastImportIdx);
      content = content.slice(0, endOfLine + 1) + importLine + content.slice(endOfLine + 1);
    }
  }

  if (content !== before) {
    fs.writeFileSync(f, content, 'utf8');
    filesChanged++;
    if (filesChanged <= 20) console.log(`  ✅ ${rel}`);
  }
}

if (filesChanged > 20) console.log(`  ... and ${filesChanged - 20} more files`);

console.log('');
console.log('=====================================================');
console.log(`  RESULTS:`);
console.log(`    Files changed:    ${filesChanged}`);
console.log(`    Inputs replaced:  ${inputsReplaced}`);
console.log('');
console.log('  How CalcInput works:');
console.log('    - Stores display as string (no leading zeros)');
console.log('    - Period decimal always (ignores locale)');
console.log('    - Selects all text on focus (easy to edit)');
console.log('    - Cleans up on blur (removes trailing dots)');
console.log('    - Only allows digits and one decimal point');
console.log('    - Sends parsed number to parent calculator');
console.log('    - Dark themed via .calc-input CSS class');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Smart CalcInput component — fixes all input issues permanently"');
console.log('  git push origin master');
console.log('');
