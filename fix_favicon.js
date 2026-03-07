const fs = require('fs')
let l = fs.readFileSync('app/layout.js', 'utf8')
if (!l.includes('favicon')) {
  l = l.replace('<head>', '<head><link rel="icon" href="/favicon.svg" type="image/svg+xml"/>')
  fs.writeFileSync('app/layout.js', l)
  console.log('✅ favicon fixed')
} else {
  console.log('ℹ️  favicon already in layout')
}
