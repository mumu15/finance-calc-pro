'use client'
// components/AdUnit.js

import { useEffect } from 'react'

export default function AdUnit({ slot }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch(e) {}
  }, [])

  return (
    <div className="my-8 flex justify-center overflow-hidden rounded-xl"
      style={{minHeight:'90px',background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
      <ins
        className="adsbygoogle"
        style={{display:'block',width:'100%'}}
        data-ad-client="ca-pub-8934829211507329"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
