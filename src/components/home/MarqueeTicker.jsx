import React from 'react'

const MarqueeTicker = () => {
  return (
    <div className="bg-gold-primary py-3.5 overflow-hidden whitespace-nowrap relative z-30">
      <div className="inline-block animate-marquee">
        {[1,2,3,4].map(i => (
          <span key={i} className="text-dark-primary text-[11px] font-bold tracking-[0.25em] uppercase mx-16">
            LUXURY LIVING · RERA APPROVED · ON-TIME DELIVERY · PREMIUM QUALITY · TRUSTED SINCE 2006 · 47 PROJECTS DELIVERED · ◆
          </span>
        ))}
      </div>
    </div>
  )
}

export default MarqueeTicker
