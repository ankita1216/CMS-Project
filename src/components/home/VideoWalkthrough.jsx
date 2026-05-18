import React from 'react'
import { Play } from 'lucide-react'

const VideoWalkthrough = ({ setIsVideoModalOpen }) => {
  return (
    <section className="py-40 relative">
      <div className="container mx-auto px-8">
        <div className="relative group overflow-hidden border border-dark-border">
          <img src="https://picsum.photos/id/126/1920/1080" className="w-full aspect-video object-cover grayscale opacity-50 group-hover:scale-105 transition-transform duration-1000" alt="" />
          <div className="absolute inset-0 bg-dark-primary/60" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <p className="overline-text text-white/40 mb-6">Experience the Space</p>
            <button onClick={() => setIsVideoModalOpen(true)} className="w-24 h-24 rounded-full border-2 border-gold-primary flex items-center justify-center group-hover:bg-gold-primary transition-all duration-500 mb-8">
              <Play className="text-gold-primary group-hover:text-dark-primary ml-2 transition-colors" size={32} fill="currentColor" />
            </button>
            <h3 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter">Virtual Tour 2024</h3>
          </div>
          
          <div className="absolute bottom-12 left-12 flex gap-12">
             <div className="flex flex-col"><span className="text-gold-primary font-bold">360°</span><span className="text-[9px] uppercase tracking-widest text-white/40">Perspective</span></div>
             <div className="flex flex-col"><span className="text-gold-primary font-bold">8K</span><span className="text-[9px] uppercase tracking-widest text-white/40">Clarity</span></div>
             <div className="flex flex-col"><span className="text-gold-primary font-bold">LIVE</span><span className="text-[9px] uppercase tracking-widest text-white/40">Support</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoWalkthrough
