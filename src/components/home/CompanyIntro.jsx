import React from 'react'
import { Play } from 'lucide-react'
import SectionHeader from '../SectionHeader'

const CompanyIntro = ({ setIsVideoModalOpen }) => {
  return (
    <section className="py-24 md:py-40 bg-dark-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
           <SectionHeader overline="DISCOVER AURUM" heading="A Legacy of Architectural Brilliance" align="center" />
        </div>
        
        <div className="relative group overflow-hidden border border-dark-border w-full aspect-[4/3] md:aspect-[21/9]">
          <img src="https://picsum.photos/id/192/1920/1080" className="w-full h-full object-cover grayscale-[0.5] opacity-70 group-hover:scale-105 transition-transform duration-1000" alt="Company Intro" />
          <div className="absolute inset-0 bg-dark-primary/40" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <button onClick={() => setIsVideoModalOpen(true)} className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-gold-primary/50 flex items-center justify-center group-hover:bg-gold-primary transition-all duration-700 mb-6 bg-dark-primary/30 backdrop-blur-sm">
              <Play className="text-gold-primary group-hover:text-dark-primary ml-1.5 md:ml-2 transition-colors w-8 h-8 md:w-10 md:h-10" fill="currentColor" />
            </button>
            <h3 className="text-2xl md:text-5xl font-display font-bold text-white uppercase tracking-widest drop-shadow-xl">Watch Our Story</h3>
          </div>
        </div>
      </div>
      
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-primary/10 to-transparent -z-0" />
    </section>
  )
}

export default CompanyIntro
