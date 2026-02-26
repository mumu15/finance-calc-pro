# 💰 FinCalc Pro — Finance Calculator Website

A professional finance calculator website built with Next.js 14, optimized for SEO and Google AdSense revenue.

## 🚀 Calculators Included
- Mortgage Calculator (with amortization schedule)
- Loan Calculator (personal, auto, student, business)
- Compound Interest Calculator
- Savings Calculator
- Retirement Calculator
- Tax Calculator (2024 US brackets)

---

## 📦 STEP 1: Setup Locally

```bash
# Install dependencies
npm install

# Run locally to test
npm run dev
# Open http://localhost:3000
```

---

## 🌐 STEP 2: Deploy to Vercel (FREE)

### Option A: Deploy via GitHub (Recommended)

1. **Create a GitHub account** at github.com (if you don't have one)
2. **Create a new repository** on GitHub called `finance-calc-pro`
3. **Push this project** to GitHub:
```bash
git init
git add .
git commit -m "Initial commit - FinCalc Pro"
git remote add origin https://github.com/YOUR_USERNAME/finance-calc-pro.git
git push -u origin main
```
4. **Go to vercel.com** → Sign up/login with your GitHub account
5. Click **"Add New Project"**
6. **Import** your `finance-calc-pro` repository
7. Click **Deploy** — Vercel auto-detects Next.js!
8. Your site will be live at `https://finance-calc-pro.vercel.app` in ~2 minutes

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts
```

---

## 🌍 STEP 3: Connect a Custom Domain

1. **Buy a domain** — recommended options:
   - `fincalcpro.com` (~$12/year at Namecheap or GoDaddy)
   - `calcfinance.com`, `moneycalculator.net`, etc.

2. In Vercel dashboard → Your Project → **Settings → Domains**
3. Add your custom domain
4. Update DNS at your registrar:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21`

---

## 💰 STEP 4: Connect Google AdSense

### 4a. Apply for AdSense
1. Go to **adsense.google.com**
2. Sign in with your Google account
3. Click **"Get started"**
4. Enter your website URL (your Vercel/custom domain)
5. Submit application — Google reviews in 1-14 days

### 4b. Add Your Publisher ID to the Code

Once approved, Google gives you a Publisher ID like: `ca-pub-1234567890123456`

**Edit this file:** `components/AdUnit.js`

Find this line:
```js
const PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX'
```

Replace with your actual Publisher ID:
```js
const PUBLISHER_ID = 'ca-pub-1234567890123456'
```

### 4c. Add the AdSense Script

**Edit:** `app/layout.js`

Find the commented script tag and uncomment it, replacing the publisher ID:
```html
<script 
  async 
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456" 
  crossOrigin="anonymous">
</script>
```

### 4d. Add Ad Slot IDs

In `components/AdUnit.js`, replace the placeholder slot IDs:
```js
// Leaderboard (728x90) 
export function AdLeaderboard() {
  return <AdUnit slot="YOUR_SLOT_ID_1" format="horizontal" />
}

// Rectangle (300x250)
export function AdRectangle() {
  return <AdUnit slot="YOUR_SLOT_ID_2" format="rectangle" />
}
```

Get slot IDs from AdSense: **Ads → By ad unit → Create new ad unit**

### 4e. Redeploy
```bash
git add .
git commit -m "Add AdSense integration"
git push
# Vercel auto-deploys on push!
```

---

## 🔧 STEP 5: Update Your Domain in the Code

Once you have a domain, update these files:

**`app/layout.js`** — change `metadataBase`:
```js
metadataBase: new URL('https://YOURDOMAIN.com'),
```

**`app/sitemap.js`** — change `baseUrl`:
```js
const baseUrl = 'https://YOURDOMAIN.com'
```

---

## 📈 SEO Tips to Rank Higher

1. **Submit sitemap to Google Search Console**
   - Go to search.google.com/search-console
   - Add your property
   - Submit: `https://yourdomain.com/sitemap.xml`

2. **Get backlinks** — list on:
   - Reddit (r/personalfinance, r/financialindependence)
   - ProductHunt
   - AlternativeTo.net
   - Hacker News (Show HN)

3. **Add more content** — add blog posts targeting keywords like:
   - "how much mortgage can I afford"
   - "compound interest calculator with monthly contributions"
   - "tax calculator 2024"

4. **Page speed** — Vercel + Next.js already gives you excellent Core Web Vitals

---

## 💡 Revenue Expectations

| Monthly Visitors | Estimated AdSense Revenue |
|-----------------|--------------------------|
| 5,000 | $15–$50/mo |
| 25,000 | $75–$250/mo |
| 100,000 | $300–$1,000/mo |
| 500,000 | $1,500–$5,000/mo |

Finance niche has CPC of $2–$20+ per click. Focus on US/UK traffic for highest rates.

---

## 📂 Project Structure

```
finance-calc-pro/
├── app/
│   ├── layout.js          # Root layout + AdSense script
│   ├── page.js            # Homepage
│   ├── globals.css        # Global styles
│   ├── sitemap.js         # Auto-generated sitemap
│   ├── robots.js          # Robots.txt
│   ├── mortgage-calculator/page.js
│   ├── loan-calculator/page.js
│   ├── compound-interest/page.js
│   ├── savings-calculator/page.js
│   ├── retirement-calculator/page.js
│   └── tax-calculator/page.js
├── components/
│   ├── Header.js          # Navigation
│   ├── Footer.js          # Footer
│   └── AdUnit.js          # Google AdSense units
├── package.json
├── tailwind.config.js
└── vercel.json
```
