import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const VideoWalkthrough = ({ setIsVideoModalOpen }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden bg-dark-primary">

      {/* ── Section header above the frame ── */}
      <div className="container mx-auto px-8 mb-10">
        <div className="flex items-end justify-between border-b border-white/10 pb-7">
          <div>
            <p className="text-[9px] tracking-[0.4em] text-gold-primary/60 uppercase mb-3">05 — Experience</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-none tracking-tight">
              Step Inside,<br />
              <span className="text-gold-primary/80 italic">Before You Decide.</span>
            </h2>
          </div>
          <p className="hidden md:block text-xs text-white/25 tracking-wider max-w-[200px] text-right leading-relaxed pb-1">
            A cinematic walkthrough of every space, every detail — at your pace.
          </p>
        </div>
      </div>

      {/* ── Main cinematic frame ── */}
      <div className="container mx-auto px-8">
        <div className="relative group overflow-hidden border border-white/10 hover:border-gold-primary/30 transition-colors duration-700">

          {/* Parallax image */}
          <div className="relative overflow-hidden aspect-[16/7]">
            <motion.img
              style={{ y: imgY }}
              src="https://picsum.photos/id/126/1920/1080"
              alt="Virtual Tour"
              className="w-full h-[115%] object-cover -mt-[7.5%] grayscale-[0.55] group-hover:grayscale-[0.2] transition-all duration-1000"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark-primary/80 via-dark-primary/30 to-dark-primary/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/70 via-transparent to-transparent" />
          </div>

          {/* ── Left: giant title + play ── */}
          <motion.div
            style={{ y: textY }}
            className="absolute inset-0 flex items-center"
          >
            <div className="px-10 md:px-16 flex flex-col gap-8 max-w-xl">
              <p className="text-[9px] tracking-[0.4em] text-gold-primary/70 uppercase">Virtual Walkthrough · 2024</p>

              <h3 className="font-display text-5xl md:text-7xl text-white leading-[0.9] tracking-tighter uppercase">
                Virtual<br />
                <span className="text-stroke">Tour</span>
              </h3>

              {/* Play button — horizontal pill style */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group/btn self-start flex items-center gap-5 border border-gold-primary/40 hover:border-gold-primary bg-dark-primary/40 hover:bg-gold-primary/10 backdrop-blur-sm px-7 py-4 transition-all duration-500"
              >
                {/* Animated play icon */}
                <span className="relative w-9 h-9 flex items-center justify-center border border-gold-primary/50 group-hover/btn:border-gold-primary transition-colors duration-400">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" className="text-gold-primary ml-0.5">
                    <path d="M0 0L12 7L0 14V0Z" />
                  </svg>
                  {/* Ping ring */}
                  <span className="absolute inset-0 border border-gold-primary/30 animate-ping opacity-0 group-hover/btn:opacity-100" />
                </span>
                <span className="text-[10px] tracking-[0.35em] text-white/70 group-hover/btn:text-white uppercase transition-colors duration-300">
                  Play Walkthrough
                </span>
                <svg width="20" height="1" viewBox="0 0 20 1" className="overflow-visible opacity-40 group-hover/btn:opacity-100 transition-opacity">
                  <line x1="0" y1="0.5" x2="20" y2="0.5" stroke="currentColor" strokeWidth="1" className="text-gold-primary" />
                  <circle cx="20" cy="0.5" r="2" fill="currentColor" className="text-gold-primary" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* ── Right: spec pills ── */}
          <div className="absolute right-10 md:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {[
              { value: '360°', label: 'Perspective' },
              { value: '8K', label: 'Clarity' },
              { value: 'Live', label: 'Support' },
            ].map((spec, i) => (
              <motion.div
                key={spec.value}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="flex items-center gap-3 border border-white/10 group-hover:border-white/20 transition-colors duration-500 px-4 py-2.5 bg-dark-primary/50 backdrop-blur-sm"
              >
                <span className="font-display text-sm text-gold-primary leading-none">{spec.value}</span>
                <span className="text-[8px] tracking-[0.3em] text-white/35 uppercase">{spec.label}</span>
              </motion.div>
            ))}
          </div>

          {/* ── Bottom bar: duration + progress line ── */}
          <div className="absolute bottom-0 left-0 right-0 px-10 md:px-16 py-5 flex items-center gap-6 border-t border-white/10 bg-dark-primary/40 backdrop-blur-sm">
            <span className="text-[8px] tracking-[0.35em] text-white/25 uppercase">Duration</span>
            <span className="font-display text-xs text-gold-primary/70">4:32</span>
            {/* Faux progress bar */}
            <div className="flex-1 h-[1px] bg-white/10 relative">
              <div className="absolute left-0 top-0 bottom-0 bg-gold-primary/40 w-1/3" />
              <div className="absolute top-1/2 -translate-y-1/2 bg-gold-primary w-2 h-2 rounded-full" style={{ left: '33%' }} />
            </div>
            <span className="text-[8px] tracking-[0.35em] text-white/25 uppercase">HD · Stereo</span>
          </div>
        </div>
      </div>

      {/* Inline style for text-stroke */}
      <style>{`.text-stroke { -webkit-text-stroke: 1px rgba(212,175,55,0.4); color: transparent; }`}</style>
    </section>
  )
}

export default VideoWalkthrough
