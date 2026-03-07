/**
 * node diagnose_mortgage.js
 * Reads mortgage calculator and finds the broken .home reference
 */
const fs = require('fs')

const p = 'app/mortgage-calculator/page.js'
const content = fs.readFileSync(p, 'utf8')

console.log('════════════ FULL FILE ════════════')
console.log(content)
console.log('════════════ END ════════════')

// Find any reference to .home
const lines = content.split('\n')
lines.forEach((line, i) => {
  if (line.includes('.home') || line.includes('[home') || line.includes('"home"') || line.includes("'home'")) {
    console.log('LINE ' + (i+1) + ': ' + line)
  }
})
