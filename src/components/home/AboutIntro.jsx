import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeader from '../SectionHeader'

const AboutIntro = () => {
  return (
    <section className="py-40 container mx-auto px-8 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative group">
          <motion.div initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }} className="aspect-[3/4] overflow-hidden">
            <img src="https://picsum.photos/id/123/800/1000" alt="About" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
          </motion.div>
          <motion.div initial={{ x: 20, y: 20 }} whileInView={{ x: 0, y: 0 }} transition={{ duration: 1 }} className="absolute -top-6 -left-6 w-full h-full border border-gold-primary/20 -z-10" />
          <div className="absolute bottom-12 right-12 bg-dark-card p-8 border border-dark-border shadow-2xl">
            <p className="text-gold-primary text-4xl font-display font-bold mb-1">18 Years</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/50">of architectural legacy</p>
          </div>
        </div>
        
        <div className="relative">
          <SectionHeader number="01" overline="OUR STORY" heading="Built on Trust, Delivered with Pride" 
            subtext="For nearly two decades, Aurum Estates has been crafting more than just buildings; we build landmarks. Our philosophy is rooted in architectural brilliance and uncompromising quality. Every home we build is a masterpiece of design and engineering."
          />
          <div className="grid grid-cols-3 gap-12 mt-16 pt-16 border-t border-dark-border">
            <div><p className="text-gold-primary text-4xl font-display mb-2">47+</p><p className="text-[10px] text-muted uppercase tracking-[0.2em]">Projects</p></div>
            <div><p className="text-gold-primary text-4xl font-display mb-2">3.2k+</p><p className="text-[10px] text-muted uppercase tracking-[0.2em]">Families</p></div>
            <div><p className="text-gold-primary text-4xl font-display mb-2">8</p><p className="text-[10px] text-muted uppercase tracking-[0.2em]">Cities</p></div>
          </div>
          <Link to="/about" className="mt-16 text-gold-primary flex items-center gap-4 group text-xs tracking-[0.3em] uppercase font-bold">
            Discover Our Journey <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutIntro
