'use client'
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
    if (raw !== '' && !/^-?[0-9]*\.?[0-9]*$/.test(raw)) return

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
