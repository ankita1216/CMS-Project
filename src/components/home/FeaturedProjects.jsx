import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeader from '../SectionHeader'
import { DUMMY_PROJECTS } from '../../data/dummyData'

const FeaturedProjects = () => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All')
  const [activeCityFilter, setActiveCityFilter] = useState('All')

  const filteredProjects = DUMMY_PROJECTS.filter(project => {
    const matchCategory = activeCategoryFilter === 'All' || project.category === activeCategoryFilter
    const matchCity = activeCityFilter === 'All' || project.city === activeCityFilter
    return matchCategory && matchCity
  }).slice(0, 6)

  return (
    <section className="py-24 md:py-40 bg-dark-primary relative overflow-hidden">
      {/* Subtle decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-dark-secondary/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionHeader number="02" overline="SIGNATURE PROJECTS" heading="Our Finest Developments" />
          <Link to="/projects" className="text-gold-primary flex items-center gap-4 group text-[10px] tracking-[0.3em] uppercase font-bold mb-6 md:mb-10">
            View All Collection <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Segmented Filtering System */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 border-b border-dark-border pb-8">
          <div className="flex flex-wrap gap-6 md:gap-8 overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 scrollbar-hide">
            {['All', 'Residential', 'Commercial', 'Luxury Villas', 'Plots'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategoryFilter(cat)}
                className={`text-xs uppercase tracking-widest transition-colors font-medium relative pb-2 whitespace-nowrap ${activeCategoryFilter === cat ? 'text-gold-primary' : 'text-white/50 hover:text-white'}`}
              >
                {cat}
                {activeCategoryFilter === cat && <motion.div layoutId="cat-filter" className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-primary" />}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <span className="text-[10px] uppercase tracking-widest text-white/30 hidden md:block mr-2">City:</span>
            {['All', 'Mumbai', 'Indore', 'Kolkata', 'Bhopal'].map(city => (
              <button 
                key={city} 
                onClick={() => setActiveCityFilter(city)}
                className={`text-[10px] uppercase tracking-widest transition-all px-4 py-2.5 border ${activeCityFilter === city ? 'border-gold-primary text-gold-primary bg-gold-primary/5' : 'border-dark-border text-white/50 hover:border-white/20 hover:text-white bg-dark-secondary/50'}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative group overflow-hidden cursor-pointer h-[480px] border border-dark-border/50 hover:border-gold-primary/30 transition-colors bg-dark-secondary"
              >
                <Link to={`/projects/${project.slug}`} className="block w-full h-full flex flex-col">
                  <div className="h-[60%] overflow-hidden relative">
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-secondary via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute top-5 left-5">
                      <span className={`px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold shadow-lg ${
                        project.status === 'ongoing' ? 'bg-gold-primary text-dark-primary' : 
                        project.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-8 flex flex-col justify-between relative bg-gradient-to-b from-dark-secondary to-dark-primary group-hover:from-dark-primary group-hover:to-[#0a0a0a] transition-all">
                    <div className="absolute top-0 left-8 right-8 h-[1px] bg-dark-border group-hover:bg-gold-primary/20 transition-colors" />
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-gold-primary text-[9px] tracking-[0.4em] uppercase">{project.category}</p>
                        <p className="text-white/40 text-[9px] tracking-[0.2em] uppercase">{project.city}</p>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white mb-2 transition-colors group-hover:text-gold-primary line-clamp-1">{project.title}</h3>
                      <p className="text-white/40 text-xs line-clamp-1">{project.short_description}</p>
                    </div>
                    <div className="flex justify-between items-end mt-auto pt-6">
                      <div>
                        <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">Starting From</p>
                        <p className="text-white font-medium">₹ {project.price_label}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center text-white/50 group-hover:bg-gold-primary group-hover:text-dark-primary group-hover:border-gold-primary transition-all">
                        <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-white/40 font-light text-lg">No projects found matching the selected criteria.</p>
              <button onClick={() => { setActiveCategoryFilter('All'); setActiveCityFilter('All'); }} className="text-gold-primary text-sm uppercase tracking-widest mt-6 hover:underline font-bold">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
