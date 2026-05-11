import React from 'react'
import { motion } from 'framer-motion'

const Loader = ({ fullScreen = false }) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
    : "flex items-center justify-center p-8"

  return (
    <div className={containerClasses}>
      <div className="relative flex flex-col items-center">
        {/* Cinematic outer ring */}
        <motion.div
          className="w-16 h-16 border-2 border-gold/20 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Spinning inner gold ring */}
        <motion.div
          className="absolute top-0 w-16 h-16 border-t-2 border-gold rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Text */}
        <motion.span
          className="mt-6 text-xs uppercase tracking-[0.3em] text-gold font-medium"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading Excellence
        </motion.span>
      </div>
    </div>
  )
}

export default Loader
