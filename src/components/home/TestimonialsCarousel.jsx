import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from '../SectionHeader'
import { DUMMY_TESTIMONIALS } from '../../data/dummyData'

const TestimonialsCarousel = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <section className="py-40 bg-dark-secondary overflow-hidden">
      <div className="container mx-auto px-8 relative">
        <Quote className="absolute -top-10 left-0 text-gold-primary opacity-10 w-40 h-40 -z-0" />
        <div className="relative z-10">
          <SectionHeader overline="TESTIMONIALS" heading="Words From Our Families" align="center" />
          
          <div className="max-w-4xl mx-auto mt-20 text-center">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-10"
              >
                <p className="text-3xl md:text-4xl font-display italic text-offWhite leading-relaxed">
                  "{DUMMY_TESTIMONIALS[activeTestimonial].quote}"
                </p>
                <div className="flex justify-center gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-gold-primary" fill="currentColor" />)}
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gold-primary/20 flex items-center justify-center text-gold-primary font-bold text-xl mb-6 border border-gold-primary/30">
                    {DUMMY_TESTIMONIALS[activeTestimonial].avatar_initials}
                  </div>
                  <h5 className="text-lg font-bold text-white">{DUMMY_TESTIMONIALS[activeTestimonial].name}</h5>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">{DUMMY_TESTIMONIALS[activeTestimonial].designation} · {DUMMY_TESTIMONIALS[activeTestimonial].project_name}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-8 mt-16">
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? DUMMY_TESTIMONIALS.length - 1 : prev - 1))}
                className="w-12 h-12 rounded-full border border-dark-border flex items-center justify-center text-white/40 hover:text-gold-primary hover:border-gold-primary transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-3">
                 {DUMMY_TESTIMONIALS.map((_, i) => (
                   <button key={i} onClick={() => setActiveTestimonial(i)} className={`w-2 h-2 rounded-full transition-all ${activeTestimonial === i ? 'bg-gold-primary w-8' : 'bg-dark-border'}`} />
                 ))}
              </div>
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev === DUMMY_TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 rounded-full border border-dark-border flex items-center justify-center text-white/40 hover:text-gold-primary hover:border-gold-primary transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel
