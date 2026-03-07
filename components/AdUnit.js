'use client'
import { useEffect, useRef, useState } from 'react'

export default function AdUnit({ slot, format = 'auto', style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [pushed, setPushed] = useState(false)

  // Only load ad when it enters the viewport (Intersection Observer)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { rootMargin: '200px' } // start loading 200px before visible
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Push ad unit once visible and adsbygoogle is loaded
  useEffect(() => {
    if (!visible || pushed) return
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        setPushed(true)
      } else {
        // adsbygoogle not ready yet — wait for it
        const timer = setTimeout(() => {
          try {
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
            setPushed(true)
          } catch (e) {}
        }, 1000)
        return () => clearTimeout(timer)
      }
    } catch (e) {}
  }, [visible, pushed])

  return (
    <div
      ref={ref}
      style={{
        minHeight: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '16px 0',
        ...style,
      }}
    >
      {visible && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', ...style }}
          data-ad-client="ca-pub-8934829211507329"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  )
}
