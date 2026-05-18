import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../SectionHeader'

const CategoryTile = ({ category, image, count, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}
    className="relative aspect-square overflow-hidden group cursor-pointer border border-transparent hover:border-gold-primary transition-all duration-700"
  >
    <img src={image} alt={category} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    <div className="absolute inset-0 flex flex-col justify-end p-8">
      <p className="text-gold-primary text-[10px] tracking-[0.3em] uppercase mb-2">{count} Projects</p>
      <h4 className="text-2xl font-display text-white group-hover:text-gold-primary transition-colors flex items-center justify-between">
        {category} <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
      </h4>
    </div>
  </motion.div>
)

const PropertyCategories = () => {
  const categories = [
    { name: 'Residential', image: 'https://picsum.photos/id/122/600/600', count: 18 },
    { name: 'Commercial', image: 'https://picsum.photos/id/123/600/600', count: 12 },
    { name: 'Luxury Villas', image: 'https://picsum.photos/id/124/600/600', count: 9 },
    { name: 'Plotted Land', image: 'https://picsum.photos/id/125/600/600', count: 8 }
  ]

  return (
    <section className="py-40 bg-dark-secondary">
      <div className="container mx-auto px-8 text-center mb-20">
        <SectionHeader number="03" overline="CURATED SELECTIONS" heading="Find Your Perfect Property" align="center" />
      </div>
      <div className="container mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <CategoryTile key={cat.name} {...cat} i={i} />
        ))}
      </div>
    </section>
  )
}

export default PropertyCategories
