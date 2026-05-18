import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Clock, Gem } from 'lucide-react'
import { useCountUp } from '../../hooks/useCountUp'

const StatItem = ({ label, value }) => {
  const { count, ref } = useCountUp(value)
  return (
    <div ref={ref} className="text-center group">
      <div className="h-[1px] w-10 bg-gold-primary mx-auto mb-6 opacity-40 group-hover:w-20 transition-all duration-500" />
      <h3 className="text-5xl md:text-7xl font-display text-gold-primary mb-2">{count}+</h3>
      <p className="text-muted text-xs uppercase tracking-[0.3em] font-medium">{label}</p>
    </div>
  )
}

const TrustSection = () => {
  return (
    <section className="py-32 bg-dark-secondary relative border-y border-dark-border">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">Crafting Landmarks,<br/>Building Trust.</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8">For over 18 years, Aurum Estates has been synonymous with architectural brilliance and uncompromising quality. Our legacy is built on transparency, timely delivery, and the smiles of thousands of happy families.</p>
          <div className="h-[2px] w-20 bg-gold-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
           <div className="bg-dark-primary p-8 border border-dark-border border-l-2 border-l-gold-primary">
              <StatItem label="Projects Delivered" value={47} />
           </div>
           <div className="bg-dark-primary p-8 border border-dark-border border-l-2 border-l-emerald-600">
              <StatItem label="Happy Families" value={3200} />
           </div>
           <div className="bg-dark-primary p-8 border border-dark-border border-l-2 border-l-blue-500">
              <StatItem label="Cities Present" value={8} />
           </div>
           <div className="bg-dark-primary p-8 border border-dark-border border-l-2 border-l-gold-primary">
              <StatItem label="Years of Trust" value={18} />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck className="text-gold-primary" size={32} />, title: 'RERA Certified', desc: '100% compliance and complete transparency in every square foot.' },
            { icon: <Clock className="text-gold-primary" size={32} />, title: 'On-Time Delivery', desc: 'A spotless record of project completions since 2006.' },
            { icon: <Gem className="text-gold-primary" size={32} />, title: 'Premium Quality', desc: 'Sourcing the finest materials globally for unmatched luxury.' }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="flex items-start gap-6 group p-6 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-dark-primary border border-dark-border flex items-center justify-center shrink-0 group-hover:border-gold-primary/50 transition-colors shadow-xl">
                {item.icon}
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustSection
