const fs = require('fs');
const path = require('path');

// Fix 1: app/layout.js — add homepage canonical
const appLayout = path.join('app', 'layout.js');
if (fs.existsSync(appLayout)) {
  let c = fs.readFileSync(appLayout, 'utf8');
  console.log('app/layout.js starts with:\n' + c.slice(0, 300) + '\n');
  // Remove any existing alternates
  c = c.replace(/\s*alternates:\s*\{[^}]*\},?/g, '');
  // Inject into existing metadata object
  if (c.includes('export const metadata')) {
    c = c.replace(/export const metadata\s*=\s*\{/, "export const metadata = {\n  alternates: { canonical: 'https://www.freefincalc.net' },");
    fs.writeFileSync(appLayout, c, 'utf8');
    console.log('✅ Fixed app/layout.js — added homepage canonical');
  } else {
    console.log('⚠️  No metadata found in app/layout.js — manual check needed');
    console.log(c.slice(0, 500));
  }
}

// Fix 2: app/mortgage-calculator/page.js — check if client or server
const mcPage = path.join('app', 'mortgage-calculator', 'page.js');
if (fs.existsSync(mcPage)) {
  let c = fs.readFileSync(mcPage, 'utf8');
  console.log('\napp/mortgage-calculator/page.js starts with:\n' + c.slice(0, 200));
  const isClient = c.startsWith("'use client'") || c.startsWith('"use client"');
  if (isClient) {
    console.log('\n⚠️  mortgage-calculator/page.js is use client — need to check layout.js');
    const mcLayout = path.join('app', 'mortgage-calculator', 'layout.js');
    if (fs.existsSync(mcLayout)) {
      let lc = fs.readFileSync(mcLayout, 'utf8');
      console.log('mortgage-calculator/layout.js:\n' + lc.slice(0, 400));
    }
  } else {
    c = c.replace(/\s*alternates:\s*\{[^}]*\},?/g, '');
    if (c.includes('export const metadata')) {
      c = c.replace(/export const metadata\s*=\s*\{/, "export const metadata = {\n  alternates: { canonical: 'https://www.freefincalc.net/mortgage-calculator' },");
    } else if (c.includes('export default')) {
      c = "\nexport const metadata = {\n  alternates: { canonical: 'https://www.freefincalc.net/mortgage-calculator' },\n};\n" + c;
    }
    fs.writeFileSync(mcPage, c, 'utf8');
    console.log('✅ Fixed mortgage-calculator/page.js');
  }
}
