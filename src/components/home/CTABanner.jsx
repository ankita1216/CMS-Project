import React from 'react'
import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { DUMMY_SETTINGS } from '../../data/dummyData'

const CTABanner = () => {
  return (
    <section className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://picsum.photos/id/125/1920/1080" className="w-full h-full object-cover grayscale opacity-15" alt="CTA" />
        <div className="absolute inset-0 bg-dark-primary/90" />
        {/* Architectural SVG Pattern Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 100 L50 0 L100 100" fill="none" stroke="#C9A84C" strokeWidth="0.1" />
           <path d="M0 50 L100 50" fill="none" stroke="#C9A84C" strokeWidth="0.1" />
        </svg>
      </div>
      
      <div className="relative z-10 container mx-auto px-8 text-center flex flex-col items-center">
        <p className="overline-text mb-8">START YOUR JOURNEY</p>
        <div className="flex items-center justify-center gap-10 mb-10">
          <div className="hidden md:block h-[1px] w-24 bg-gold-primary/40" />
          <h2 className="text-5xl md:text-8xl font-display font-bold leading-[1.1] text-offWhite">Your Dream Home Is One <br/> Conversation Away</h2>
          <div className="hidden md:block h-[1px] w-24 bg-gold-primary/40" />
        </div>
        <p className="text-muted text-lg md:text-xl mb-16 max-w-2xl font-light">Connect with our luxury consultants for a private viewing of our signature estates across India.</p>
        <div className="flex flex-col sm:flex-row gap-8">
          <Link to="/contact" className="premium-btn-filled px-12 py-5 text-sm">Schedule Site Visit</Link>
          <a href={`tel:${DUMMY_SETTINGS.contact_phone}`} className="premium-btn-outline px-12 py-5 text-sm flex items-center gap-4">
            <Phone size={16} /> Call Us Now
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTABanner
