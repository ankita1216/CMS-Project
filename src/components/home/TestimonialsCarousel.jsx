import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '../SectionHeader'
import { DUMMY_TESTIMONIALS } from '../../data/dummyData'

const TestimonialsCarousel = () => {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const t = DUMMY_TESTIMONIALS

  const go = (i) => {
    setDir(i > active ? 1 : -1)
    setActive(i)
  }
  const prev = () => go(active === 0 ? t.length - 1 : active - 1)
  const next = () => go(active === t.length - 1 ? 0 : active + 1)

  return (
    <section className="relative py-28 bg-dark-secondary overflow-hidden">

      {/* Giant background index number */}
      <AnimatePresence mode="wait">
        <motion.span
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 font-display text-[20vw] leading-none text-white/[0.025] select-none pointer-events-none"
        >
          {String(active + 1).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>

      <div className="container mx-auto px-8 relative z-10">

        {/* Header — left aligned, tight */}
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
          <SectionHeader overline="CLIENT VOICES" heading="Words From Our Families" align="left" />
          <span className="hidden sm:block text-[9px] tracking-[0.35em] text-white/20 uppercase pb-1">
            {String(active + 1).padStart(2, '0')} / {String(t.length).padStart(2, '0')}
          </span>
        </div>

        {/* Main layout: quote left, person right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-20 items-start min-h-[260px]">

          {/* QUOTE block */}
          <div className="relative">
            {/* Decorative opening mark */}
            <span className="absolute -top-4 -left-2 font-display text-6xl text-gold-primary/15 leading-none select-none">"</span>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={active}
                custom={dir}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 40 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d) => ({ opacity: 0, x: d * -30 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="pl-6 pt-4"
              >
                <p className="font-display text-2xl md:text-3xl text-white/90 leading-relaxed italic">
                  {t[active].quote}
                </p>

                {/* Project tag */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-gold-primary/40" />
                  <span className="text-[9px] tracking-[0.35em] text-gold-primary/60 uppercase">{t[active].project_name}</span>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* PERSON block — right column */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + '-person'}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="flex flex-row lg:flex-col items-center lg:items-start gap-6 lg:gap-5 lg:border-l lg:border-white/10 lg:pl-10"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 border border-gold-primary/30 flex items-center justify-center bg-gold-primary/5">
                  <span className="font-display text-xl text-gold-primary">{t[active].avatar_initials}</span>
                </div>
                {/* Corner accent */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-gold-primary/50" />
              </div>

              <div>
                <h5 className="font-display text-lg text-white mb-1">{t[active].name}</h5>
                <p className="text-[9px] tracking-[0.25em] text-white/35 uppercase">{t[active].designation}</p>

                {/* Stars */}
                <div className="flex gap-[3px] mt-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="text-gold-primary">
                      <path d="M5 0l1.12 3.45H9.76L6.82 5.59l1.12 3.45L5 7.1 2.06 9.04l1.12-3.45L.24 3.45H3.88z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls row */}
        <div className="mt-14 flex items-center gap-6 border-t border-white/10 pt-8">

          {/* Prev / Next */}
          <button onClick={prev} className="group flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-white/30 hover:text-gold-primary transition-colors duration-300">
            <svg width="28" height="1" viewBox="0 0 28 1" className="overflow-visible">
              <line x1="28" y1="0.5" x2="0" y2="0.5" stroke="currentColor" strokeWidth="1" />
              <circle cx="0" cy="0.5" r="2.5" fill="currentColor" className="transition-transform duration-400 group-hover:-translate-x-2" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            </svg>
            Prev
          </button>

          {/* Dot strip */}
          <div className="flex-1 flex items-center gap-2">
            {t.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="relative h-[2px] transition-all duration-500 overflow-hidden bg-white/10"
                style={{ width: active === i ? 40 : 14 }}
              >
                {active === i && (
                  <motion.div layoutId="dot-fill" className="absolute inset-0 bg-gold-primary" />
                )}
              </button>
            ))}
          </div>

          <button onClick={next} className="group flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-white/30 hover:text-gold-primary transition-colors duration-300">
            Next
            <svg width="28" height="1" viewBox="0 0 28 1" className="overflow-visible">
              <line x1="0" y1="0.5" x2="28" y2="0.5" stroke="currentColor" strokeWidth="1" />
              <circle cx="28" cy="0.5" r="2.5" fill="currentColor" className="transition-transform duration-400 group-hover:translate-x-2" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel
