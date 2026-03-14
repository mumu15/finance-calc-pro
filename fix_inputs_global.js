const fs = require('fs');
const path = require('path');

// ============================================================
// GLOBAL INPUT FIX — Patches ALL number inputs from layout
// No need to modify 1438 individual inputs
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');

console.log('');
console.log('=====================================================');
console.log('  GLOBAL INPUT FIX');
console.log('=====================================================');
console.log('');

// --- STEP 1: Create the global InputFixer component ---
console.log('--- Step 1: Creating InputFixer component ---');

const inputFixerCode = `'use client'
import { useEffect } from 'react'

export default function InputFixer() {
  useEffect(() => {
    function handleFocus(e) {
      if (e.target.type !== 'number') return
      // Convert to text on focus
      const input = e.target
      const val = input.value
      input.type = 'text'
      input.inputMode = 'decimal'
      input.value = val === '0' ? '' : String(parseFloat(val) || '')
      // Select all for easy editing
      setTimeout(() => input.select(), 0)
    }

    function handleBlur(e) {
      if (e.target.inputMode !== 'decimal') return
      const input = e.target
      const raw = input.value
      const num = parseFloat(raw)
      // Convert back to number type
      input.type = 'number'
      input.inputMode = ''
      if (isNaN(num) || raw === '') {
        input.value = 0
      } else {
        input.value = num
      }
      // Trigger React onChange
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype, 'value'
      ).set
      nativeInputValueSetter.call(input, isNaN(num) ? 0 : num)
      input.dispatchEvent(new Event('input', { bubbles: true }))
    }

    function handleKeydown(e) {
      if (e.target.type !== 'text' || e.target.inputMode !== 'decimal') return
      const key = e.key
      const val = e.target.value
      // Allow: digits, backspace, delete, tab, enter, arrows, period, minus, home, end
      const allowed = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight',
                        'ArrowUp', 'ArrowDown', 'Home', 'End', '.', '-']
      if (allowed.includes(key)) {
        // Only one decimal point
        if (key === '.' && val.includes('.')) e.preventDefault()
        // Minus only at start
        if (key === '-' && (val.includes('-') || e.target.selectionStart > 0)) e.preventDefault()
        return
      }
      // Allow digits
      if (/^[0-9]$/.test(key)) return
      // Allow select all, copy, paste, cut
      if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(key.toLowerCase())) return
      // Block everything else (letters, comma, etc)
      e.preventDefault()
    }

    document.addEventListener('focus', handleFocus, true)
    document.addEventListener('blur', handleBlur, true)
    document.addEventListener('keydown', handleKeydown, true)

    return () => {
      document.removeEventListener('focus', handleFocus, true)
      document.removeEventListener('blur', handleBlur, true)
      document.removeEventListener('keydown', handleKeydown, true)
    }
  }, [])

  return null
}
`;

const compDir = path.join(BASE, 'components');
fs.writeFileSync(path.join(compDir, 'InputFixer.js'), inputFixerCode, 'utf8');
console.log('  ✅ Created components/InputFixer.js');

// --- STEP 2: Add InputFixer to layout.js ---
console.log('--- Step 2: Adding InputFixer to layout.js ---');

const layoutFile = path.join(APP, 'layout.js');
let layout = fs.readFileSync(layoutFile, 'utf8');

if (!layout.includes('InputFixer')) {
  // Add import
  layout = layout.replace(
    /import { CurrencyProvider }/,
    "import { CurrencyProvider } from '../components/CurrencyContext'\nimport InputFixer from '../components/InputFixer'"
  );
  
  // Hmm that would double the CurrencyProvider import. Let me be more careful.
  // Just add the import after the last import line
  layout = fs.readFileSync(layoutFile, 'utf8'); // re-read clean
  
  const lastImportIdx = layout.lastIndexOf('import ');
  const endOfLastImport = layout.indexOf('\n', lastImportIdx);
  
  layout = layout.slice(0, endOfLastImport + 1) +
    "import InputFixer from '../components/InputFixer'\n" +
    layout.slice(endOfLastImport + 1);
  
  // Add <InputFixer /> after <CurrencyProvider>
  layout = layout.replace(
    '<CurrencyProvider>{children}</CurrencyProvider>',
    '<CurrencyProvider><InputFixer />{children}</CurrencyProvider>'
  );
  
  fs.writeFileSync(layoutFile, layout, 'utf8');
  console.log('  ✅ Added InputFixer to layout.js');
} else {
  console.log('  ⏭️  InputFixer already in layout.js');
}

// --- STEP 3: Update CSS to style text-mode inputs too ---
console.log('--- Step 3: Updating CSS ---');

const globalsFile = path.join(APP, 'globals.css');
let css = fs.readFileSync(globalsFile, 'utf8');

if (!css.includes('input[type="text"][inputmode="decimal"]')) {
  css += `
/* Fix for text-mode calculator inputs (during editing) */
input[type="text"][inputmode="decimal"] {
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
}
input[type="text"][inputmode="decimal"]:focus {
  border-color: #f0c842 !important;
  box-shadow: 0 0 0 3px rgba(240, 200, 66, 0.15) !important;
  background: #131620 !important;
}
`;
  fs.writeFileSync(globalsFile, css, 'utf8');
  console.log('  ✅ Added text-mode input CSS');
}

console.log('');
console.log('=====================================================');
console.log('  HOW IT WORKS:');
console.log('    When you click a number input:');
console.log('      1. It switches to type="text" (no locale issues)');
console.log('      2. Leading zeros are stripped (03444 → 3444)');
console.log('      3. All text is selected (easy to replace)');
console.log('      4. Only digits and period allowed');
console.log('    When you click away:');
console.log('      5. It switches back to type="number"');
console.log('      6. React state updates with clean value');
console.log('');
console.log('  This fixes ALL 1438 inputs without modifying');
console.log('  a single calculator file!');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Global InputFixer — fixes leading zeros and decimals everywhere"');
console.log('  git push origin master');
console.log('');
