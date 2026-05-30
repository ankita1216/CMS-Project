import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeader from '../SectionHeader'

const stats = [
  { value: '47+', label: 'Projects' },
  { value: '3.2k+', label: 'Families' },
  { value: '8', label: 'Cities' },
]

const AboutIntro = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={sectionRef} className="relative py-32 container mx-auto px-8 overflow-hidden">

      {/* ── Decorative gold vertical rule ── */}
      <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold-primary/20 to-transparent hidden xl:block" />

      {/* ── TOP BAND: overline + giant display number ── */}
      <div className="flex items-start justify-between mb-16 border-b border-dark-border pb-8">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[9px] tracking-[0.4em] text-gold-primary/60 uppercase pt-1"
        >
          01 — Our Story
        </motion.span>

        <motion.span
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-white/[0.04] select-none tracking-tighter"
        >
          Aurum
        </motion.span>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-start">

        {/* LEFT — image with parallax + year badge */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Thin gold border offset */}
          <div className="absolute -inset-3 border border-gold-primary/10 pointer-events-none z-0" />

          <div className="relative overflow-hidden aspect-[4/5] z-10">
            <motion.img
              style={{ y: imgY }}
              src="https://picsum.photos/id/123/800/1000"
              alt="About Aurum Estates"
              className="w-full h-[115%] object-cover grayscale-[0.6] hover:grayscale-0 transition-all duration-1000 -mt-[7.5%]"
            />
            {/* Dark vignette bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-primary/60 to-transparent" />
          </div>

          {/* Year badge — overlapping bottom edge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="absolute -bottom-6 left-8 z-20 flex items-baseline gap-3"
          >
            <span className="font-display text-5xl text-gold-primary">18</span>
            <div>
              <p className="text-white text-xs font-display leading-tight">Years</p>
              <p className="text-[8px] tracking-[0.3em] text-white/40 uppercase">of legacy</p>
            </div>
          </motion.div>
        </motion.div>

        {/* CENTRE — thin gold divider line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block w-[1px] mx-16 self-stretch bg-gradient-to-b from-gold-primary/0 via-gold-primary/30 to-gold-primary/0 origin-top"
        />

        {/* RIGHT — text content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="pt-4 lg:pt-0 mt-12 lg:mt-0"
        >
          <SectionHeader
            number={null}
            overline={null}
            heading="Built on Trust, Delivered with Pride"
            subtext="For nearly two decades, Aurum Estates has been crafting more than just buildings — we build landmarks. Our philosophy is rooted in architectural brilliance and uncompromising quality. Every home we build is a masterpiece of design and engineering."
          />

          {/* Stats — horizontal compact strip */}
          <div className="mt-12 grid grid-cols-3 border border-dark-border">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="text-center py-6 px-3 border-r border-dark-border last:border-r-0 group hover:bg-white/[0.02] transition-colors duration-300"
              >
                <p className="font-display text-3xl text-gold-primary leading-none mb-1">{s.value}</p>
                <p className="text-[9px] tracking-[0.25em] text-white/35 uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA — text link with animated underline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-10"
          >
            <Link
              to="/about"
              className="group inline-flex items-center gap-4 text-[9px] tracking-[0.4em] uppercase text-gold-primary"
            >
              <span className="relative">
                Discover Our Journey
                <span className="absolute -bottom-[3px] left-0 w-0 group-hover:w-full h-[1px] bg-gold-primary/50 transition-all duration-500" />
              </span>
              <svg
                width="32" height="1" viewBox="0 0 32 1"
                className="overflow-visible"
              >
                <line x1="0" y1="0.5" x2="32" y2="0.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
                <circle cx="32" cy="0.5" r="2.5" fill="currentColor" className="transition-transform duration-500 group-hover:translate-x-2" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── BOTTOM QUOTE BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-24 pt-8 border-t border-dark-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <p className="font-display text-sm text-white/20 italic max-w-md">
          "Architecture is the art of how to waste space — we chose never to."
        </p>
        <span className="text-[8px] tracking-[0.35em] text-white/15 uppercase">— Aurum Design Philosophy</span>
      </motion.div>
    </section>
  )
}

export default AboutIntro
