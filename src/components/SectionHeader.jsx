import React from 'react'
import { motion } from 'framer-motion'

const SectionHeader = ({ overline, heading, subtext, number, align = 'left' }) => {
  return (
    <div className={`relative mb-16 ${align === 'center' ? 'text-center mx-auto' : ''} ${align === 'center' ? 'max-w-3xl' : 'max-w-2xl'}`}>
      {number && (
        <span className="absolute -top-16 -left-8 font-display italic text-[140px] text-white opacity-[0.04] pointer-events-none select-none">
          {number}
        </span>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {overline && (
          <p className="overline-text mb-4 block">{overline}</p>
        )}
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-[1.2]">
          {heading}
        </h2>
        {subtext && (
          <p className="text-muted text-lg leading-relaxed">
            {subtext}
          </p>
        )}
        
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-[1px] bg-gold-primary mt-8 ${align === 'center' ? 'mx-auto' : ''}`} 
        />
      </motion.div>
    </div>
  )
}

export default SectionHeader
