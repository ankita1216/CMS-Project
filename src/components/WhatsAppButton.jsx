import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { DUMMY_SETTINGS } from '../data/dummyData'

const WhatsAppButton = () => {
  return (
    <motion.a
      href={`https://wa.me/${DUMMY_SETTINGS.whatsapp_number}`}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-10 left-10 z-[80] w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-white/20 rounded-full"
      />
      <MessageCircle size={30} className="relative z-10" />
    </motion.a>
  )
}

export default WhatsAppButton
