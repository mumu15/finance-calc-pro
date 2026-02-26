'use client'
import { useEffect } from 'react'

// Replace PUBLISHER_ID with your actual AdSense Publisher ID (e.g., ca-pub-1234567890123456)
const PUBLISHER_ID = 'ca-pub-8934829211507329'

export default function AdUnit({ slot, format = 'auto', style = {} }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  // Show placeholder in development / before AdSense is connected
  if (PUBLISHER_ID.includes('XXXXXXXX')) {
    return (
      <div className="ad-unit my-6" style={style}>
        <div className="text-center text-slate-500 text-xs py-6">
          <div className="text-gold-500 font-mono text-xs mb-1">[ AD UNIT ]</div>
          <div>Connect Google AdSense to show ads here</div>
          <div className="text-slate-600 text-xs mt-1">Slot: {slot}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6" style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Horizontal leaderboard (728x90) - for top/bottom of page
export function AdLeaderboard() {
  return <AdUnit slot="1234567890" format="horizontal" style={{ minHeight: 90 }} />
}

// Rectangle (300x250) - for sidebars
export function AdRectangle() {
  return <AdUnit slot="0987654321" format="rectangle" style={{ minHeight: 250 }} />
}

// In-article native ad
export function AdInArticle() {
  return <AdUnit slot="1122334455" format="fluid" />
}
