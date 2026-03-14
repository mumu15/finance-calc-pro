'use client'
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
