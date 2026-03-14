const fs = require('fs');
const path = require('path');

// ============================================================
// DEFINITIVE INPUT FIX v2
// Overrides value setter to block React during editing
// ============================================================

const BASE = __dirname;

console.log('');
console.log('=====================================================');
console.log('  DEFINITIVE INPUT FIX v2');
console.log('=====================================================');
console.log('');

const inputFixerCode = `'use client'
import { useEffect } from 'react'

export default function InputFixer() {
  useEffect(() => {
    // Save the REAL value setter before we override it
    const realDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')
    const realSet = realDescriptor.set
    const realGet = realDescriptor.get

    // Track which input is currently being edited
    const editing = new WeakSet()

    // Override the value setter globally
    // This prevents React from clobbering user input while typing
    Object.defineProperty(HTMLInputElement.prototype, 'value', {
      get() { return realGet.call(this) },
      set(v) {
        if (editing.has(this)) return // Block React updates while editing
        realSet.call(this, v)
      },
      configurable: true,
      enumerable: true,
    })

    function onFocusIn(e) {
      const input = e.target
      if (!input || input.tagName !== 'INPUT' || input.type !== 'number') return

      // Read the current numeric value
      const num = parseFloat(realGet.call(input))

      // Mark as editing BEFORE switching type
      editing.add(input)

      // Switch to text mode (bypasses locale formatting)
      input.type = 'text'
      input.setAttribute('inputmode', 'decimal')

      // Set clean value (no leading zeros, empty if zero)
      const clean = isNaN(num) || num === 0 ? '' : String(num)
      realSet.call(input, clean)

      // Select all for quick replacement
      setTimeout(function() { input.select() }, 10)
    }

    function onFocusOut(e) {
      const input = e.target
      if (!editing.has(input)) return

      // Read what user typed
      const raw = realGet.call(input)
      const num = parseFloat(raw)
      const final = isNaN(num) ? 0 : num

      // Stop blocking React
      editing.delete(input)

      // Switch back to number type
      input.type = 'number'
      input.removeAttribute('inputmode')

      // Set the clean value using the REAL setter
      realSet.call(input, final)

      // Tell React about the new value
      // Access React's onChange via internal fiber props
      var keys = Object.keys(input)
      for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf('__reactProps') === 0) {
          var props = input[keys[i]]
          if (props && typeof props.onChange === 'function') {
            props.onChange({ target: { value: final } })
          }
          break
        }
      }
    }

    function onKeyDown(e) {
      var input = e.target
      if (!editing.has(input)) return

      var key = e.key
      var val = realGet.call(input)

      // Always allow these
      if (key === 'Backspace' || key === 'Delete' || key === 'Tab' ||
          key === 'Enter' || key === 'ArrowLeft' || key === 'ArrowRight' ||
          key === 'ArrowUp' || key === 'ArrowDown' || key === 'Home' || key === 'End') return

      // Allow Ctrl/Cmd shortcuts
      if (e.ctrlKey || e.metaKey) return

      // Allow digits
      if (key >= '0' && key <= '9') return

      // Allow one period
      if (key === '.' && val.indexOf('.') === -1) return

      // Allow minus at start
      if (key === '-' && val.indexOf('-') === -1 && input.selectionStart === 0) return

      // Block everything else
      e.preventDefault()
    }

    function onPaste(e) {
      if (!editing.has(e.target)) return
      // Let paste happen, then clean up
      setTimeout(function() {
        var val = realGet.call(e.target)
        var clean = val.replace(/[^0-9.\\-]/g, '')
        // Remove extra dots
        var parts = clean.split('.')
        if (parts.length > 2) clean = parts[0] + '.' + parts.slice(1).join('')
        realSet.call(e.target, clean)
      }, 0)
    }

    document.addEventListener('focusin', onFocusIn, true)
    document.addEventListener('focusout', onFocusOut, true)
    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('paste', onPaste, true)

    return function() {
      // Restore original value descriptor
      Object.defineProperty(HTMLInputElement.prototype, 'value', realDescriptor)
      document.removeEventListener('focusin', onFocusIn, true)
      document.removeEventListener('focusout', onFocusOut, true)
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('paste', onPaste, true)
    }
  }, [])

  return null
}
`;

const compFile = path.join(BASE, 'components', 'InputFixer.js');
fs.writeFileSync(compFile, inputFixerCode, 'utf8');
console.log('  ✅ Rewrote components/InputFixer.js');
console.log('');
console.log('  How it works now:');
console.log('    1. Overrides HTMLInputElement.value setter globally');
console.log('    2. When editing, React CANNOT overwrite your typing');
console.log('    3. Period (.) works because React cant remove it');
console.log('    4. No leading zeros because we clean on focus');
console.log('    5. On blur, calls React onChange directly via fiber');
console.log('    6. Restores number type so calculations work');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "InputFixer v2 — blocks React during editing, decimals work"');
console.log('  git push origin master');
console.log('');
