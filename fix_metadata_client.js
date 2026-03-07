/**
 * node fix_metadata_client.js
 * Finds every page.js that has BOTH 'use client' AND export metadata
 * and removes the metadata export (it belongs in layout.js only)
 */
const fs = require('fs')
const path = require('path')

const appDir = 'app'
let fixed = 0

function walk(dir) {
  fs.readdirSync(dir).forEach(entry => {
    const full = path.join(dir, entry)
    if (fs.statSync(full).isDirectory()) return walk(full)
    if (entry !== 'page.js') return

    let code = fs.readFileSync(full, 'utf8')
    const isClient = code.includes("'use client'") || code.includes('"use client"')
    if (!isClient) return

    let changed = false

    // Remove: export { metadata } from './metadata'
    if (code.includes("export { metadata }")) {
      code = code.replace(/export\s*\{\s*metadata\s*\}\s*from\s*['"][^'"]+['"]\s*;?\n?/g, '')
      changed = true
    }

    // Remove: export const metadata = { ... }
    if (code.match(/export\s+const\s+metadata\s*=/)) {
      code = code.replace(/export\s+const\s+metadata\s*=\s*\{[\s\S]*?\n\}\n?/g, '')
      changed = true
    }

    if (changed) {
      fs.writeFileSync(full, code, 'utf8')
      console.log('✅ fixed: ' + full)
      fixed++
    }
  })
}

walk(appDir)

console.log(`
════════════════════════════════════════
  Fixed ${fixed} files
  Metadata removed from 'use client' pages
  Build should pass now
════════════════════════════════════════
`)
