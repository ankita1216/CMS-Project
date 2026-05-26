import React from 'react'
import { motion } from 'framer-motion'

const HeroBanner = () => {
  return (
    <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Desktop Video Background */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-dark-primary z-10 mix-blend-multiply" />
        {/* Architectural Pencil Sketch effect via CSS filters */}
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover grayscale-[0.8] contrast-[1.1] brightness-[0.9]"
        >
          {/* Placeholder video source for desktop */}
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Mobile Video Background */}
      <div className="absolute inset-0 z-0 md:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-dark-primary z-10 mix-blend-multiply" />
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover grayscale-[0.8] contrast-[1.1] brightness-[0.9]"
        >
          {/* Placeholder video source for mobile */}
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[9px] tracking-[0.4em] text-white/50 uppercase rotate-180 [writing-mode:vertical-lr]">SCROLL</span>
        <motion.div animate={{ height: [0, 40, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-[1px] bg-gold-primary" />
      </div>
    </section>
  )
}

export default HeroBanner
