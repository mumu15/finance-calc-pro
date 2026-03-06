'use client'

/**
 * PdfDownload — opens a print-ready HTML page in a new tab.
 * Props:
 *   title   {string}   Calculator name shown in PDF header
 *   rows    {Array}    [{ label, value }]  — result rows
 *   inputs  {Array}    [{ label, value }]  — input rows (optional)
 */
export default function PdfDownload({ title, rows, inputs = [] }) {
  function handleDownload() {
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })

    const makeRows = (arr) =>
      arr
        .filter((r) => r.value !== undefined && r.value !== '' && r.value !== null)
        .map(
          (r) =>
            `<tr>
              <td class="label">${r.label}</td>
              <td class="value">${r.value}</td>
            </tr>`
        )
        .join('')

    const inputSection = inputs.length
      ? `<h2 class="section-title">Inputs</h2>
         <table><tbody>${makeRows(inputs)}</tbody></table>`
      : ''

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — FreeFinCalc.net</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      background: #ffffff;
      color: #111827;
      padding: 48px 56px;
      max-width: 740px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 1.6;
    }

    /* ── Header ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 16px;
      border-bottom: 3px solid #f0c842;
      margin-bottom: 28px;
    }
    .brand { font-size: 20px; font-weight: 900; letter-spacing: -0.5px; }
    .brand span { color: #d4a017; }
    .meta { font-size: 11px; color: #9ca3af; text-align: right; line-height: 1.8; }

    /* ── Title ── */
    h1 {
      font-family: Georgia, serif;
      font-size: 28px;
      font-weight: 900;
      color: #111827;
      margin-bottom: 24px;
      letter-spacing: -0.5px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin: 24px 0 10px;
    }

    /* ── Tables ── */
    table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
    tr:first-child td { border-top: 1px solid #e5e7eb; }
    td {
      padding: 11px 14px;
      border-bottom: 1px solid #f3f4f6;
      font-size: 13.5px;
    }
    td.label { color: #374151; font-weight: 500; width: 55%; }
    td.value {
      color: #111827;
      font-weight: 700;
      text-align: right;
      font-size: 14px;
    }
    tr:first-child td.value {
      color: #d4a017;
      font-size: 18px;
      font-weight: 900;
    }
    tr:nth-child(even) td { background: #fafafa; }

    /* ── Disclaimer ── */
    .disclaimer {
      margin-top: 32px;
      padding: 16px 18px;
      background: #fffbeb;
      border-left: 4px solid #f0c842;
      border-radius: 0 6px 6px 0;
      font-size: 11.5px;
      color: #6b7280;
      line-height: 1.7;
    }
    .disclaimer strong { color: #374151; }

    /* ── Footer ── */
    .footer {
      margin-top: 28px;
      padding-top: 16px;
      border-top: 1px solid #f3f4f6;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #d1d5db;
    }

    @media print {
      body { padding: 24px 32px; }
      @page { margin: 0; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">FreeFinCalc<span>.net</span></div>
    </div>
    <div class="meta">
      Generated: ${date}<br/>
      freefincalc.net — Free Financial Calculators
    </div>
  </div>

  <h1>${title}</h1>

  ${inputSection}

  <h2 class="section-title">Results</h2>
  <table><tbody>${makeRows(rows)}</tbody></table>

  <div class="disclaimer">
    <strong>⚠ Disclaimer:</strong> This calculation is provided for educational and informational
    purposes only. Results are estimates based on the inputs provided and do not constitute
    financial, tax, legal or investment advice. Actual figures may vary based on lender terms,
    local regulations, fees and individual circumstances. Always consult a qualified financial
    professional before making any financial decision. FreeFinCalc.net accepts no liability
    for decisions made based on these estimates.
  </div>

  <div class="footer">
    <span>FreeFinCalc.net — 100 Free Calculators in 40+ Currencies</span>
    <span>Not financial advice</span>
  </div>

  <script>
    window.onload = function () { window.print() }
  </script>
</body>
</html>`

    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const win = window.open(url, '_blank')
    if (!win) {
      const a = document.createElement('a')
      a.href = url
      a.download = title.replace(/\s+/g, '-').toLowerCase() + '-freefincalc.html'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
    setTimeout(() => URL.revokeObjectURL(url), 60000)
  }

  return (
    <button
      onClick={handleDownload}
      aria-label="Download results as PDF"
      className="pdf-btn"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '8px 16px',
        borderRadius: '10px',
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '0.01em',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        background: 'rgba(240,200,66,0.1)',
        border: '1px solid rgba(240,200,66,0.35)',
        color: '#f0c842',
        fontFamily: "'DM Sans', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(240,200,66,0.18)'
        e.currentTarget.style.borderColor = 'rgba(240,200,66,0.6)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(240,200,66,0.1)'
        e.currentTarget.style.borderColor = 'rgba(240,200,66,0.35)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <svg
        width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download PDF
    </button>
  )
}
