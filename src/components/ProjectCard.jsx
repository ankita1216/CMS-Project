import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Home, Layers } from 'lucide-react'

export default function ProjectCard({ project }) {
  // Gracefully handle both database schema and local dummyData schema
  const imageSrc = project.thumbnail || (project.images && project.images[0]) || 'https://picsum.photos/id/122/800/600'
  const displayPrice = project.price_label || project.price || 'Price on Request'
  const displayArea = project.area_label || (project.area_min ? `${project.area_min} - ${project.area_max} Sq.Ft.` : null)
  const displayCity = project.city || (project.location ? project.location.split(',').pop().trim() : 'Pan India')

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="relative group overflow-hidden h-[480px] border border-dark-border/50 hover:border-gold-primary/30 transition-colors bg-dark-secondary flex flex-col justify-between"
    >
      <Link to={`/projects/${project.slug}`} className="block w-full h-full flex flex-col justify-between">
        
        {/* Top Image Section (60% height) */}
        <div className="h-[60%] overflow-hidden relative w-full bg-dark-primary">
          <img 
            src={imageSrc} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110 grayscale-[0.1] group-hover:grayscale-0" 
          />
          {/* Elegant dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-secondary via-transparent to-transparent opacity-90 pointer-events-none" />
          
          {/* Status Badge */}
          <div className="absolute top-5 left-5 z-10">
            <span className={`px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold shadow-lg ${
              project.status === 'ongoing' ? 'bg-gold-primary text-dark-primary' : 
              project.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
            }`}>
              {project.status}
            </span>
          </div>

          {/* Featured Badge */}
          {project.is_featured && (
            <div className="absolute top-5 right-5 z-10">
              <span className="bg-white/10 backdrop-blur-md border border-white/10 text-gold-primary px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold">
                ★ Featured
              </span>
            </div>
          )}
        </div>

        {/* Content Box (40% height) */}
        <div className="flex-grow p-8 flex flex-col justify-between relative bg-gradient-to-b from-dark-secondary to-dark-primary group-hover:from-dark-primary group-hover:to-[#080808] transition-all duration-500">
          {/* Top border light highlight */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-dark-border group-hover:bg-gold-primary/20 transition-colors duration-500" />
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[9px] tracking-[0.3em] uppercase">
              <p className="text-gold-primary font-semibold">{project.category || 'Luxury Residence'}</p>
              <p className="text-white/40">{displayCity}</p>
            </div>
            
            <h3 className="text-2xl font-display font-bold text-white transition-colors duration-300 group-hover:text-gold-primary line-clamp-1">
              {project.title}
            </h3>
            
            <p className="text-white/40 text-xs line-clamp-1 leading-relaxed font-light">
              {project.short_description || project.description || 'Experience high luxury living at its finest.'}
            </p>
          </div>

          {/* Specifications Footer */}
          <div className="flex justify-between items-end border-t border-dark-border/40 mt-4 pt-6 group-hover:border-gold-primary/10 transition-colors duration-500">
            <div className="space-y-1">
              <p className="text-white/30 text-[8px] uppercase tracking-widest">Price starting from</p>
              <p className="text-white text-sm font-semibold tracking-wide">
                {displayPrice.startsWith('₹') || displayPrice === 'Price on Request' ? displayPrice : `₹ ${displayPrice}`}
              </p>
            </div>

            {displayArea && (
              <div className="space-y-1 text-right hidden sm:block">
                <p className="text-white/30 text-[8px] uppercase tracking-widest">Size Area</p>
                <p className="text-white/70 text-xs font-medium">{displayArea}</p>
              </div>
            )}

            <div className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center text-white/50 group-hover:bg-gold-primary group-hover:text-dark-primary group-hover:border-gold-primary transition-all duration-500 shadow-md">
              <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
          </div>

        </div>

      </Link>
    </motion.div>
  )
}
