import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '../SectionHeader'

const FloorPlans = () => {
  const [activePlan, setActivePlan] = useState(0)

  const floorPlans = [
    { name: '2BHK Signature', carpet: '1,240 Sq.Ft', built: '1,450 Sq.Ft', image: 'https://picsum.photos/id/10/800/800', features: ['2 Master Bedrooms', 'Large Balcony', 'Open Kitchen', 'Utility Area'] },
    { name: '3BHK Grande', carpet: '1,850 Sq.Ft', built: '2,100 Sq.Ft', image: 'https://picsum.photos/id/20/800/800', features: ['3 Bedrooms', 'Worker Room', 'L-Shaped Living', 'Private Foyer'] },
    { name: '4BHK Majestic', carpet: '2,600 Sq.Ft', built: '3,200 Sq.Ft', image: 'https://picsum.photos/id/30/800/800', features: ['4 Bedrooms', 'Study Room', 'Walk-in Closets', '3 Balconies'] }
  ]

  return (
    <section className="py-40 bg-dark-primary overflow-hidden">
      <div className="container mx-auto px-8">
        <SectionHeader overline="INTERACTIVE PLANS" heading="Thoughtfully Designed Spaces" align="center" subtext="Every square inch is optimized for cinematic living and maximum functionality." />
        
        <div className="mt-20 flex justify-center gap-10 border-b border-dark-border mb-20">
          {floorPlans.map((plan, i) => (
            <button
              key={i}
              onClick={() => setActivePlan(i)}
              className={`pb-6 text-xs uppercase tracking-[0.3em] font-bold transition-all relative ${activePlan === i ? 'text-gold-primary' : 'text-white/30 hover:text-white'}`}
            >
              {plan.name.split(' ')[0]}
              {activePlan === i && (
                <motion.div layoutId="plan-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 p-12 relative"
            >
              <img src={floorPlans[activePlan].image} alt="Plan" className="w-full h-auto grayscale invert brightness-100 opacity-80" />
              <div className="absolute top-0 left-0 w-full h-full border border-gold-primary/10 pointer-events-none" />
              <div className="absolute -top-4 -left-4 text-gold-primary/20 font-display italic text-6xl">Plan.</div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode='wait'>
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-display font-bold text-white mb-8">{floorPlans[activePlan].name}</h3>
              <div className="grid grid-cols-2 gap-10 mb-12">
                <div><p className="text-[10px] text-muted uppercase tracking-widest mb-2">Carpet Area</p><p className="text-2xl font-display text-gold-primary">{floorPlans[activePlan].carpet}</p></div>
                <div><p className="text-[10px] text-muted uppercase tracking-widest mb-2">Built-up Area</p><p className="text-2xl font-display text-offWhite">{floorPlans[activePlan].built}</p></div>
              </div>
              <ul className="grid grid-cols-2 gap-6 mb-16">
                {floorPlans[activePlan].features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 bg-gold-primary" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-6">
                <button className="premium-btn-filled flex-1">Download PDF</button>
                <button className="premium-btn-outline flex-1">Enquire Now</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default FloorPlans
