const fs=require('fs');let c=fs.readFileSync('components/Footer.js','utf8');let i=c.indexOf('import');c="'use client'\n"+c.substring(i);fs.writeFileSync('components/Footer.js',c);console.log('Done') 
