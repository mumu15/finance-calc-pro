'use client'
import { useState } from 'react'

export default function VideoEmbed({ videoId, title }) {
  const [loaded, setLoaded] = useState(false)
  const thumb = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg'

  if (!loaded) {
    return (
      <div
        onClick={() => setLoaded(true)}
        role="button"
        aria-label={'Play video: ' + title}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') setLoaded(true) }}
        style={{
          position: 'relative', width: '100%', paddingBottom: '56.25%',
          background: '#0d2140', borderRadius: 12, overflow: 'hidden',
          cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <img
          src={thumb}
          alt={title}
          loading="lazy"
          style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', objectFit:'cover', opacity: 0.7 }}
        />
        <div style={{
          position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          width:68, height:48, background:'rgba(0,0,0,0.75)', borderRadius:12,
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#f0c842">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div style={{
          position:'absolute', bottom:12, left:16, right:16,
          color:'#e2e8f0', fontSize:13, fontWeight:600
        }}>{title}</div>
      </div>
    )
  }

  return (
    <div style={{ position:'relative', width:'100%', paddingBottom:'56.25%', borderRadius:12, overflow:'hidden' }}>
      <iframe
        src={'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0'}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
      />
    </div>
  )
}
