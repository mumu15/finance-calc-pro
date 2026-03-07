/**
 * Fix: Add CurrencyProvider to layout.js
 * Root cause: CurrencyProvider was never wrapping the app,
 * so every component used its own isolated default (USD).
 * Selecting a currency had no effect anywhere.
 * 
 * node fix_layout_provider.js
 */
const fs = require('fs')

let layout = fs.readFileSync('app/layout.js', 'utf8')

// Add CurrencyProvider import after existing imports
if (!layout.includes('CurrencyProvider')) {
  layout = layout.replace(
    `import Script from 'next/script'`,
    `import Script from 'next/script'\nimport { CurrencyProvider } from '../components/CurrencyContext'`
  )
}

// Wrap {children} with CurrencyProvider
layout = layout.replace(
  `        {children}`,
  `        <CurrencyProvider>{children}</CurrencyProvider>`
)

fs.writeFileSync('app/layout.js', layout, 'utf8')
console.log('✅ CurrencyProvider now wraps the entire app in layout.js')
console.log('')
console.log('This was the root cause of currency selection not working.')
console.log('Without CurrencyProvider, every component got isolated USD default.')
