import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, RefreshCw, Building2, MapPin, Sparkles } from 'lucide-react'
import { DUMMY_PROJECTS } from '../data/dummyData'
import { fetchProjects } from '../lib/api'
import ProjectCard from '../components/ProjectCard'
import SEOHead from '../components/SEOHead'

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [cityFilter, setCityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priceFilter, setPriceFilter] = useState('All')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Fetch Projects from Express API
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true)
      try {
        const data = await fetchProjects()
        if (data && data.length > 0) {
          setProjects(data)
        } else {
          setProjects(DUMMY_PROJECTS)
        }
      } catch (err) {
        console.warn('API connection failed, falling back to mockups:', err)
        setProjects(DUMMY_PROJECTS)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  // Sync URL search parameters with filter states
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const cityParam = searchParams.get('city')
    const statusParam = searchParams.get('status')

    if (categoryParam) setCategoryFilter(categoryParam)
    if (cityParam) setCityFilter(cityParam)
    if (statusParam) setStatusFilter(statusParam)
  }, [searchParams])

  // Get distinct cities dynamically for the city filter dropdown
  const availableCities = useMemo(() => {
    const cities = projects.map(p => p.city || (p.location ? p.location.split(',').pop().trim() : '')).filter(Boolean)
    return ['All', ...new Set(cities)]
  }, [projects])

  // Reset Filters Function
  const handleResetFilters = () => {
    setSearchTerm('')
    setCategoryFilter('All')
    setCityFilter('All')
    setStatusFilter('All')
    setPriceFilter('All')
    setSearchParams({})
  }

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // 1. Text Search matching title, location, category, city
      const displayCity = project.city || (project.location ? project.location.split(',').pop().trim() : '')
      const matchText = searchTerm === '' ||
        (project.title && project.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.location && project.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.category && project.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (displayCity && displayCity.toLowerCase().includes(searchTerm.toLowerCase()))

      // 2. Category Filter
      // Handle potential minor spelling discrepancies (like "Plotted Land" in nav vs "Plots" in data)
      const isPlotMatch = (categoryFilter === 'Plots' || categoryFilter === 'Plotted Land') && 
                          (project.category === 'Plots' || project.category === 'Plotted Land')
      const matchCategory = categoryFilter === 'All' || 
                            project.category === categoryFilter || 
                            isPlotMatch

      // 3. City Filter
      const matchCity = cityFilter === 'All' || 
                        displayCity.toLowerCase() === cityFilter.toLowerCase()

      // 4. Status Filter
      const matchStatus = statusFilter === 'All' || 
                          project.status?.toLowerCase() === statusFilter.toLowerCase()

      // 5. Price Filter (numerical parsing)
      let matchPrice = true
      if (priceFilter !== 'All') {
        // Price values could be a string or number. Let's parse them.
        // e.g., price_min = 12.5 (Cr), price = 5 (Cr) or "50L - 1.2Cr"
        const priceVal = project.price_min || parseFloat(project.price) || 0
        if (priceFilter === '< 3 Cr') {
          matchPrice = priceVal < 3
        } else if (priceFilter === '3 Cr - 8 Cr') {
          matchPrice = priceVal >= 3 && priceVal <= 8
        } else if (priceFilter === '8 Cr +') {
          matchPrice = priceVal > 8
        }
      }

      return matchText && matchCategory && matchCity && matchStatus && matchPrice
    })
  }, [projects, searchTerm, categoryFilter, cityFilter, statusFilter, priceFilter])

  return (
    <div className="bg-dark-primary min-h-screen pt-20 overflow-x-hidden">
      <SEOHead 
        title="Luxury Estates Collection" 
        description="Browse the complete catalog of ultra-luxury penthouses, villas, and commercial properties by Aurum Estates." 
      />

      {/* Cinematic Hero Page Banner */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-dark-border/40">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/124/1920/1080" 
            className="w-full h-full object-cover opacity-25 scale-105 animate-kenburns grayscale" 
            alt="Aurum Estates Portfolio" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-primary/60 via-dark-primary/80 to-dark-primary" />
        </div>
        
        <div className="relative z-10 text-center space-y-4 px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 text-gold-primary text-[10px] tracking-[0.4em] uppercase font-bold"
          >
            <Sparkles size={12} /> Exquisite Living
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-display font-bold text-white tracking-wide"
          >
            The Portfolio
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted text-xs md:text-sm max-w-xl mx-auto font-light leading-relaxed uppercase tracking-wider"
          >
            A curated display of architectural marvels and generation-defining residences
          </motion.p>
        </div>
      </section>

      {/* Advanced Filter System Section */}
      <section className="py-12 bg-dark-secondary/40 border-b border-dark-border/30">
        <div className="container mx-auto px-6 space-y-8">
          
          {/* Search bar & Category select */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-gold-primary transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search by title, location, keywords..."
                className="w-full pl-12 pr-4 py-3.5 bg-dark-primary/80 border border-dark-border/60 hover:border-dark-border text-white text-sm focus:border-gold-primary outline-none transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Advanced Filters Toggle & Reset Button */}
            <div className="flex items-center gap-4 self-end lg:self-auto">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest border transition-all duration-300 ${
                  showAdvanced || cityFilter !== 'All' || statusFilter !== 'All' || priceFilter !== 'All'
                    ? 'border-gold-primary/50 text-gold-primary bg-gold-primary/5'
                    : 'border-dark-border/80 text-white/70 hover:border-white/20 hover:text-white'
                }`}
              >
                <SlidersHorizontal size={14} /> 
                <span>Advanced Filters</span>
              </button>

              {(searchTerm || categoryFilter !== 'All' || cityFilter !== 'All' || statusFilter !== 'All' || priceFilter !== 'All') && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-primary hover:text-gold-light transition-colors py-3.5 px-2"
                >
                  <RefreshCw size={12} />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>

          {/* Primary Category Quick Filter Tabs */}
          <div className="flex flex-wrap gap-3 md:gap-4 border-b border-dark-border/30 pb-6 overflow-x-auto scrollbar-none">
            {['All', 'Residential', 'Commercial', 'Luxury Villas', 'Plots'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-6 py-2.5 text-[10px] uppercase tracking-widest transition-all duration-300 font-semibold relative ${
                  categoryFilter === cat
                    ? 'bg-gold-primary text-dark-primary shadow-lg shadow-gold-primary/10'
                    : 'bg-dark-secondary border border-dark-border/50 text-white/60 hover:text-white hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Expanded Drawer for Secondary Filters (Animate Presence) */}
          <AnimatePresence>
            {(showAdvanced || cityFilter !== 'All' || statusFilter !== 'All' || priceFilter !== 'All') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 pb-6">
                  
                  {/* City Selector */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40 block">Select Address City</label>
                    <select
                      className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm focus:border-gold-primary outline-none transition-colors text-white/80"
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                    >
                      {availableCities.map(city => (
                        <option key={city} value={city} className="bg-dark-secondary text-white">{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Selector */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40 block">Project Status</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['All', 'Ongoing', 'Completed', 'Upcoming'].map(status => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`py-3 text-[9px] uppercase tracking-wider font-semibold border transition-all duration-300 ${
                            statusFilter === status
                              ? 'border-gold-primary text-gold-primary bg-gold-primary/5'
                              : 'border-dark-border/60 text-white/50 hover:border-white/10 hover:text-white bg-dark-primary/40'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Bracket Selector */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40 block">Budget Bracket</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['All', '< 3 Cr', '3 Cr - 8 Cr', '8 Cr +'].map(price => (
                        <button
                          key={price}
                          onClick={() => setPriceFilter(price)}
                          className={`py-3 text-[8px] uppercase tracking-wider font-semibold border transition-all duration-300 ${
                            priceFilter === price
                              ? 'border-gold-primary text-gold-primary bg-gold-primary/5'
                              : 'border-dark-border/60 text-white/50 hover:border-white/10 hover:text-white bg-dark-primary/40'
                          }`}
                        >
                          {price}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Grid Portfolio Section */}
      <section className="py-24 container mx-auto px-6">
        
        {/* Statistics Head */}
        <div className="flex justify-between items-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
            Portfolio catalog
          </p>
          <p className="text-gold-primary text-[10px] uppercase tracking-widest font-semibold">
            {loading ? 'Searching...' : `${filteredProjects.length} Residences found`}
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4 text-white/40">
            <RefreshCw className="animate-spin text-gold-primary" size={32} />
            <p className="text-xs uppercase tracking-widest">Gathering Exquisite Portfolio...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty / Zero Results Panel */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-24 max-w-xl mx-auto text-center space-y-6 bg-dark-secondary border border-dark-border p-12 rounded-lg"
          >
            <div className="w-16 h-16 rounded-full border border-gold-primary/20 flex items-center justify-center mx-auto text-gold-primary/60 bg-gold-primary/5">
              <Building2 size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-semibold text-white">No Matching Properties</h3>
              <p className="text-xs text-muted leading-relaxed max-w-md mx-auto">
                We couldn't find any premium properties matching your exact configuration. Try adjusting your price filters, keywords, or view our complete collection.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="premium-btn-filled mt-6 py-3.5 px-10 shadow-lg shadow-gold-primary/10"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}

      </section>
    </div>
  )
}
