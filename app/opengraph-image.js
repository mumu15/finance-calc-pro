import { ImageResponse } from 'next/og'
export const runtime = 'edge'
export const alt = 'FreeFinCalc - 470+ Free Financial Calculators'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function Image() {
  return new ImageResponse(
    (
      <div style={{fontSize:40,background:'#0f1117',width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:'60px 80px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'30px'}}>
          <div style={{width:64,height:64,borderRadius:16,background:'#f0c842',display:'flex',alignItems:'center',justifyContent:'center',color:'#0a0c14',fontSize:36,fontWeight:900}}>F</div>
          <span style={{color:'#ffffff',fontSize:40,fontWeight:900}}>FreeFinCalc</span>
        </div>
        <div style={{color:'#ffffff',fontSize:56,fontWeight:900,lineHeight:1.2}}>470+ Free Financial</div>
        <div style={{color:'#f0c842',fontSize:56,fontWeight:900,lineHeight:1.2}}>Calculators</div>
        <div style={{color:'#94a3b8',fontSize:22,marginTop:24}}>Mortgage | Tax | Retirement | Investing | Debt | Budget</div>
        <div style={{color:'#64748b',fontSize:18,marginTop:12}}>40+ Currencies | No Sign-Up | www.freefincalc.net</div>
      </div>
    ),
    { ...size }
  )
}
