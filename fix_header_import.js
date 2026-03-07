/**
 * Remove duplicate CURRENCIES import from Header.js
 * node fix_header_import.js
 */
const fs = require('fs')

let header = fs.readFileSync('components/Header.js', 'utf8')

// Remove the duplicate standalone import line
header = header.replace(`import { CURRENCIES } from './CurrencyContext'\n\n`, '')

fs.writeFileSync('components/Header.js', header, 'utf8')
console.log('✅ Duplicate import removed from Header.js')

// Verify
const lines = header.split('\n').slice(0, 8)
console.log('\nTop of Header.js now:')
lines.forEach((l, i) => console.log(`  ${i+1}: ${l}`))
