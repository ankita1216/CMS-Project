import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '../SectionHeader'

const amenities = [
  {
    number: '01',
    title: 'Infinity Pool',
    description: 'Horizon-edge pool with panoramic skyline views & temperature-controlled waters.',
    tag: 'Rooftop',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M4 22c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 27c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="11" y="8" width="14" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 8V6M14 8V6M22 8V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Spa & Wellness',
    description: 'Hammam, sauna, cold plunge & on-demand therapist access for residents.',
    tag: 'Basement',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="13" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 25c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 20c0-1.5 1-2.5 2.5-2M29 20c0-1.5-1-2.5-2.5-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Sky Lounge',
    description: 'Members-only terrace with craft cocktails, live jazz & 360° city vistas.',
    tag: 'Floor 28',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M10 12h16l-3 8H13L10 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M18 20v8M14 28h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Concierge',
    description: '24/7 white-glove service for reservations, travel & private event curation.',
    tag: 'Ground Flr',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M18 8v2M10 18H8M28 18h-2M12.1 11.1l-1.4-1.4M25.3 11.1l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 22c0-3.866 3.134-7 7-7s7 3.134 7 7H11Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 26h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Fitness Centre',
    description: 'AI-assisted gym with Technogym rigs, training pods & biometric tracking.',
    tag: 'Level 2',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="16" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="28" y="16" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="13" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="13" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 18.5h2M26 18.5h2M14 18.5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Private Cinema',
    description: 'Dolby Atmos screening room with curated film calendar & in-seat dining.',
    tag: 'Level 1',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="10" width="20" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M26 15l4-3v8l-4-3V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 28h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 24v4M22 24v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

const AmenityCard = ({ amenity, i }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-default overflow-hidden"
      style={{ aspectRatio: '1 / 1' }}
    >
      {/* Border */}
      <div className="absolute inset-0 border border-white/10 group-hover:border-gold-primary/50 transition-colors duration-500 z-10 pointer-events-none" />

      {/* Gold corner accent top-left */}
      <div className="absolute top-0 left-0 w-5 h-[1px] bg-gold-primary/0 group-hover:bg-gold-primary transition-all duration-500 z-20" />
      <div className="absolute top-0 left-0 w-[1px] h-5 bg-gold-primary/0 group-hover:bg-gold-primary transition-all duration-500 z-20" />
      {/* bottom-right */}
      <div className="absolute bottom-0 right-0 w-5 h-[1px] bg-gold-primary/0 group-hover:bg-gold-primary transition-all duration-500 z-20" />
      <div className="absolute bottom-0 right-0 w-[1px] h-5 bg-gold-primary/0 group-hover:bg-gold-primary transition-all duration-500 z-20" />

      {/* Default face */}
      <AnimatePresence>
        {!hovered && (
          <motion.div
            key="front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5"
          >
            <div className="text-white/25">{amenity.icon}</div>
            <h4 className="font-display text-base text-white text-center leading-tight">{amenity.title}</h4>
            <span className="text-[8px] tracking-[0.3em] text-gold-primary/50 uppercase">{amenity.tag}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover face */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="back"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col justify-between p-5 bg-white/[0.03]"
          >
            <div className="flex items-start justify-between">
              <div className="text-gold-primary">{amenity.icon}</div>
              <span className="font-display text-3xl text-gold-primary/10 select-none leading-none">{amenity.number}</span>
            </div>
            <div>
              <h4 className="font-display text-sm text-gold-primary mb-2">{amenity.title}</h4>
              <p className="text-[11px] text-white/50 leading-relaxed">{amenity.description}</p>
            </div>
            <span className="text-[8px] tracking-[0.3em] text-white/25 uppercase">{amenity.tag}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const PropertyAmenities = () => (
  <section className="relative py-24 bg-dark-secondary overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold-primary/[0.025] blur-[100px] pointer-events-none" />

    <div className="container mx-auto px-8 relative z-10">
      {/* Header row — compact, left-right split */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <SectionHeader
          number="03"
          overline="WORLD-CLASS LIVING"
          heading="Amenities"
          align="left"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-xs text-white/30 tracking-wider max-w-[220px] text-right hidden sm:block leading-relaxed"
        >
          Hover each tile to explore. Six facilities exclusive to residents.
        </motion.p>
      </div>

      {/* 3 × 2 grid */}
      <div className="grid grid-cols-3 gap-[1px] bg-white/10">
        {amenities.map((amenity, i) => (
          <div key={amenity.number} className="bg-dark-secondary">
            <AmenityCard amenity={amenity} i={i} />
          </div>
        ))}
      </div>

      {/* Thin footer line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-[1px] h-[1px] bg-gradient-to-r from-gold-primary/0 via-gold-primary/30 to-gold-primary/0 origin-left"
      />
    </div>
  </section>
)

export default PropertyAmenities
