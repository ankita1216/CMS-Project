import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DUMMY_SETTINGS } from '../../data/dummyData'

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
      
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none z-0 mix-blend-overlay">
        <h1 className="text-[25vw] font-display font-bold leading-none text-white">AURUM</h1>
      </div>

      <div className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center mt-20 md:mt-0">
        <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1.2 }} className="h-[1px] bg-gold-primary mb-6 md:mb-8" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="overline-text mb-6 md:mb-8">
          EST. 2006 · LUXURY REAL ESTATE
        </motion.p>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-bold mb-6 md:mb-10 max-w-5xl leading-[1.1] tracking-tight">
          {"Crafting Homes That Define Generations".split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.3em] text-white drop-shadow-2xl"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1.8 }} className="text-white/80 text-base md:text-xl font-light mb-10 md:mb-14 max-w-2xl leading-relaxed drop-shadow-md">
          {DUMMY_SETTINGS.hero_subheadline}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 2.2 }} className="flex flex-col sm:flex-row gap-6 md:gap-8 w-full sm:w-auto">
          <Link to="/projects" className="premium-btn-filled flex items-center justify-center gap-4 group py-4 md:py-3 w-full sm:w-auto">
            Explore Projects <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[9px] tracking-[0.4em] text-white/50 uppercase rotate-180 [writing-mode:vertical-lr]">SCROLL</span>
        <motion.div animate={{ height: [0, 40, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-[1px] bg-gold-primary" />
      </div>
    </section>
  )
}

export default HeroBanner
