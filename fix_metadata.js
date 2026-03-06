/**
 * FreeFinCalc — FIX: Remove "export const metadata = undefined" from all 'use client' pages
 * Run from project root: node fix_metadata.js
 */
const fs = require('fs')
const path = require('path')

let fixed = 0
let skipped = 0

function walk(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (entry.name === 'page.js' || entry.name === 'page.jsx') {
      const content = fs.readFileSync(full, 'utf8')

      // Only fix files that have BOTH 'use client' AND metadata export
      const hasUseClient = content.includes("'use client'") || content.includes('"use client"')
      const hasMetadata = content.includes('export const metadata')

      if (hasUseClient && hasMetadata) {
        // Remove the metadata export line entirely
        const fixed_content = content
          .replace(/^export const metadata = undefined\s*\n?/m, '')
          .replace(/^export const metadata = \{[\s\S]*?\}\s*\n?/m, '')
        fs.writeFileSync(full, fixed_content, 'utf8')
        console.log('✅ Fixed: ' + full)
        fixed++
      } else {
        skipped++
      }
    }
  }
}

walk('app')

console.log(`
════════════════════════════════════════════
  ✅  FIX COMPLETE
════════════════════════════════════════════
  Fixed:   ${fixed} files
  Skipped: ${skipped} files (no issue found)

  Root cause: Next.js App Router does not
  allow "export const metadata" inside any
  file marked with 'use client'. Metadata
  must live in a Server Component or a
  separate generateMetadata() function.

  Deploy:
  git add .
  git commit -m "Fix: remove metadata export from client components"
  git push origin master:main
════════════════════════════════════════════
`)
